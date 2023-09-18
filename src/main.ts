import { App, Plugin, PluginSettingTab, Setting, MarkdownPostProcessorContext, normalizePath, requestUrl, RequestUrlParam, RequestUrlResponse } from "obsidian";
import sha256 from 'crypto-js/sha256';
/*
	declare function require(name:string);
	import factory = require("./pick.js");
	Evade node.js
*/
import { default as wasmbin } from './pick.wasm';

declare module "obsidian" {
	interface Vault {
		setConfig: (config: string, newValue: string) => void;
		getConfig: (config: string) => string;
	}
}

export const import_env = {
    memoryBase: 0,
    tableBase: 1024*32,
    memory: new WebAssembly.Memory({
      initial: 0
    }),
    table: new WebAssembly.Table({
      initial: 0,
      element: 'anyfunc'
    })
  } 

/* Some glue meh */
export const textEncoder = new TextEncoder();
export const textDecoder = new TextDecoder('utf8');
export const createCString = (module, str) => {
		const nullTerminatedString = str + "\0";
		const encodedString = textEncoder.encode(nullTerminatedString);
		const address = module.instance.exports.malloc(encodedString.length);
		try {
			const destination = new Uint8Array(module.instance.exports.memory.buffer, address);
			destination.set(encodedString);
			
		} finally {
			return address;
		}
	};
export const readStaticCString = (module, address) => {
		const buffer = module.instance.exports.memory.buffer;
		const encodedStringLength = (new Uint8Array(buffer, address)).indexOf(0);
		const encodedStringBuffer = new Uint8Array(buffer, address, encodedStringLength);
		return textDecoder.decode(encodedStringBuffer);
	};
export const receiveCString = (module, address) => {
		try {
			return readStaticCString(module, address);
		} finally {
			module.instance.exports.free(address);
		}
	};

export interface AdamantinePickSettings {
	block_identify: string[];
	output_dom_mark: string;
	encoder_type: number;
	sample_to_render: number;
	bleach_diagram: boolean;
	output_diagram_stats: boolean;
	preserve_diagram_debug_print: boolean;
	samples_list: string[];
	samples_dir: string;
	adamantine_dir: string;
	decode_locally: boolean;
}

export const DEFAULT_SETTINGS: AdamantinePickSettings = {
	block_identify: [ 'pikchr', 'pick' ],
	output_dom_mark: 'adamantine',
	encoder_type: 1,
	sample_to_render: 4,
	bleach_diagram: false,
	output_diagram_stats: false,
	preserve_diagram_debug_print: true,
	samples_list : ["Cheatsheet", "Palindrome", "Triforce", "Dummy"],
	samples_dir: "sample-diagrams",
	adamantine_dir: "adamantine",
	decode_locally: false,
}

export interface AdamantineDiagramNote {
	filename: string;
	base64content: string;
	bytessize: number;
	sha256digest: string;
	timestamp: string;
	encoder: string;
	encoderversion: string; 
}

export interface Processor {
    svg: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => void;

}

export interface Postprocessor {
    svg: (el: HTMLElement, ctx: MarkdownPostProcessorContext) => void;

}

export class AdamantinePickProcessor implements Processor {
	plugin_ptr: AdamantinePickPlugin; 
	render_type: number;
	dark_mode: number;
	dom_mark: string;
	report: boolean;
	encodedDiagram: string;
	diagram_height: number;
	diagram_width: number;
	timestamp: number;
	preserve_diagram_debug_print: boolean;
	postprocessor: AdamantinePickPostProcessor;
	prepend: string;
	parser: DOMParser;
	pikchr: string;
	get_height: number;
	get_width: number;
	get_artifact_version: string;
	factory: WebAssemblyInstantiatedSource;
	dom_class_ptr:number;
	
	constructor(render_type: number, mFlags: number, dom_mark: string, report: boolean, preserve: boolean) {
		this.render_type = render_type;
		this.dark_mode = mFlags;
		this.dom_mark = dom_mark;
		this.report = report;
		this.preserve_diagram_debug_print = preserve;
		this.encodedDiagram = "";
		this.diagram_height = 0;
		this.diagram_width = 0;
		this.prepend = "";
		WebAssembly.instantiate(wasmbin, import_env).then( (factory) => {
				this.pikchr = factory.instance.exports.pick;
				this.get_height = factory.instance.exports.pick_height;
				this.get_width = factory.instance.exports.pick_width;
				this.get_artifact_version = factory.instance.exports.pick_version;
				this.factory = factory;
				this.dom_class_ptr = createCString(this.factory, this.dom_mark);
		});
	
		this.parser = new DOMParser();
	}
	
	update_dom_mark() {
		this.factory.instance.exports.free(this.dom_class_ptr);
		this.dom_class_ptr = createCString(this.factory, this.dom_mark);
	}
	
	dummy = (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
		console.log(source);
		return;
	}
	
	encoder = (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
		if (this.render_type!==3) { 
			this.timestamp = Date.now();
			this.encodedDiagram = "";
			this.svg(source,el,ctx);
		}
		else {
			this.dummy("dummy encoder",el,ctx);
		}
		return;
	}
	
    svg = (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
		const factory = this.factory;
		/* 
		   Space or newline at the end of file in reading mode in source at the end of codeblock 
		   Source are different strings in reading and editing mode lol
		*/
		const control_index = source.lastIndexOf("\n#?");
		const command = ( control_index > -1) ? source.substring(control_index).trim() : "no"; 
		const has_control_sequence = (command.substring(0, 2) === "#?");
		const hashtable = this.postprocessor.visited;
		let prepend = "";
		let skip = false;
		let encodedDiagram = "<!-- empty pikchr diagram -->\n";
		let source_final = source;
	
		if (has_control_sequence) {
			prepend = hashtable[source];
			if (!prepend) {
				if (command === "#?skip") { prepend = "skip"; skip = true; }
				if (command === "#?diag") {
					prepend = 'print ' + '"Pikchr SHA-3: ' + readStaticCString(factory,this.get_artifact_version()) + '"' + "\n";
				}
				if (command === "#?purple") {prepend = "fill=purple\n";}
				hashtable[source] = prepend;
			}
			prepend = hashtable[source];
			if (command === "#?time") {prepend = "time=" + Math.floor(Date.now() / 1000) + "\n"; }
		}
		else { prepend = ""; }
		

		skip = (prepend === "skip");
		if (prepend && !skip) { source_final = prepend + source; }
		if ( (command !== "#?skip") || (!skip))  {	
				encodedDiagram = receiveCString(factory,this.pikchr(createCString(factory, source_final),this.dom_class_ptr,this.dark_mode));						
		}
		
		this.encodedDiagram = encodedDiagram;
		this.diagram_height = this.get_height(0);
		this.diagram_width = this.get_width(0);
		this.diagram_handler (encodedDiagram, el, ctx);		
	}
	
	diagram_handler = (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext ) => {				
		
		const length = source.length;	
		if ((length <=30) && (source == "<!-- empty pikchr diagram -->\n")) {
			el.createEl("span",{ text: source});
			el.createEl("span",{ text: "[Adamantine Pick] Empty diagram returned"}); 
			return;
		}		

		const svg = this.parser.parseFromString(source, "text/html");
		
		const diagrams =  Array.from(svg.getElementsByTagName("svg"));
		
		if (!Array.isArray(diagrams) || !diagrams.length) { 
			el.insertAdjacentHTML('beforeend', svg.body.innerHTML);
			if (this.report) {
				el.createEl("div",{ text: "[Adamantine Pick] Diagram debug prints and Pikchr syntax errors dumped above" });
			}
		}
		
		diagrams.forEach( ( diagram, i ) => {	
			if (this.render_type === 1) {
				if (this.preserve_diagram_debug_print) {
					el.insertAdjacentHTML('beforeend', svg.body.innerHTML);
				}
				else {
					el.insertAdjacentHTML('beforeend', diagram.outerHTML);
				}
			}
			else if(this.render_type === 2) {
				el.createEl("div",{ text: source });
			}
			
			if (this.report) {
				el.createEl("div",{ text:  "[Adamantine Pick] height(px):" + this.diagram_height + "; width(px):" + this.diagram_width + "; length(byte):" + length + "; time(ms): " + (Date.now() - this.timestamp) });
			}
		});
		this.postprocessor.svg(el, ctx);
	}
	
}

export class AdamantinePickPostProcessor implements Postprocessor {
	public visited:{ [index:string] : string };
	dom_mark: string;
	counter = 0;
	
	constructor( diagram_proc: AdamantinePickProcessor, dom_mark ) {
		this.visited = {};
		this.dom_mark = dom_mark;
		diagram_proc.postprocessor = this;
		this.counter = 0
	}
	
	svg = ( el: HTMLElement, ctx: MarkdownPostProcessorContext ) => {
		const selector = "svg." + this.dom_mark;
		const postsvg = el.querySelectorAll<HTMLElement>(selector);
		postsvg.forEach( ( diagram, i ) => {
			diagram.id = 'postproc-diag-' + (this.counter + i); 
			/* 
			   Optional style postprocessing if any goes here
			   hide, color invert, transform, rotate, scale, fade in/out, opacity, glow, blur, 
			   margin, mathjax, regex, animation, syntax highlighter, font, save to cloud etc...
			   
			   Notorious feature swamp random list of absurd orders like rotate 90 deg 3rd diagram 
			   then blur 12th then hide 4th then glow diagram that has cat in it then render
			   Schrodinger equation in diagram 42 
			   Note that it goes after they fixed 9000th oval in diagram source itself lol
			   
			   So I just set id to each object on file open and leave it be as is 
			   Write custom CSS snippet if you want target individual diagram
			   
			   tl,dr: YAGNI
			*/
			this.counter++;
		});		
	}
}

export default class AdamantinePickPlugin extends Plugin {
	diagram_processor: AdamantinePickProcessor;
	banshee: AdamantinePickPostProcessor;
	settings: AdamantinePickSettings;
	total_builtin_samples = 4;
	
	async onload(): Promise<void> {
		console.log('loading adamantine pick plugin');
		await this.loadSettings();
		
		const dark_mode_flag = this.get_dark_mode_flag();
		const dom_mark = this.settings.output_dom_mark;
		const report = this.settings.output_diagram_stats;
		const preserve = this.settings.preserve_diagram_debug_print;
		const render_type = this.settings.encoder_type;
		
		this.diagram_processor = new AdamantinePickProcessor(render_type, dark_mode_flag, dom_mark, report, preserve);
		this.diagram_processor.plugin_ptr = this;
		this.banshee = new AdamantinePickPostProcessor(this.diagram_processor, dom_mark);
		
		this.registerMarkdownCodeBlockProcessor(this.settings.block_identify[0], this.diagram_processor.encoder);
		this.registerMarkdownPostProcessor(this.banshee.svg);	
		this.registerEvent(this.app.workspace.on('file-open', () => { this.banshee.counter = 0; this.banshee.visited = {}; }));
		
		
		this.addSettingTab(new AdamantinePickSettingsTab(this.app, this));
		this.addCommand({
			id: 'pick-adamantine-notes',
			name: 'Adamantine Pick',
			hotkeys: [{ modifiers: ["Mod", "Shift"], key: "F5" }],
			callback: () => { this.pick_adamantine_notes(); },
		});
		
		this.note_builtin_diagram();
	}
	
	private async note_builtin_diagram() {
			if (this.settings.sample_to_render < this.total_builtin_samples) {
			
			const dir = normalizePath(this.settings.samples_dir);
			try {
				await this.app.vault.createFolder(dir);
			}
			catch (error) {
				console.log(error.toString());
			}
			
			const samples_list = this.settings.samples_list;
			const arr_in = this.settings.sample_to_render;
			const filename = normalizePath(dir + "/" + samples_list[arr_in - 1] + ".md");
			
			const sample_content = this.output_builtin_diagram(arr_in);
			try {
				await this.app.vault.create(filename, sample_content);
				this.settings.sample_to_render = 4;
				await this.saveSettings();
			}
			catch (error) {
				console.log(error.toString());
			}
		}
	}
	
	async onunload(): Promise<void> {
		console.log('unloading adamantine pick plugin');
		
	}

	async loadSettings(): Promise<void>  {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	
	private get_dark_mode_flag() {
		const isLightMode = this.app.vault.getConfig("theme") !== "obsidian";
		let dark_mode_flag = 0x0002;
		if (isLightMode || this.settings.bleach_diagram) { dark_mode_flag = 0x0000; }
		return dark_mode_flag;
	}
	
	async saveSettings(): Promise<void>  {
		
		this.diagram_processor.render_type = this.settings.encoder_type;
		this.diagram_processor.dark_mode = this.get_dark_mode_flag();
		this.diagram_processor.dom_mark = this.settings.output_dom_mark;
		this.diagram_processor.update_dom_mark();
		this.diagram_processor.report = this.settings.output_diagram_stats;
		this.diagram_processor.preserve_diagram_debug_print = this.settings.preserve_diagram_debug_print;
	
		await this.saveData(this.settings);
	}
	
	private decode_base64(base64) {
		const input_text = atob(base64);
		const length = input_text.length;
		const bytes = new Uint8Array(length);
		for (let i = 0; i < length; i++) {
			bytes[i] = input_text.charCodeAt(i);
		}
		const decoder = new TextDecoder('utf8');
		return decoder.decode(bytes);
	}	
	
	private async pick_adamantine_notes(): Promise<void> {
			const json_name = "adamantine-diagram-notes.json";
			const zip_name = "adamantine-diagram-notes.zip";
			
			const github_url = "https://github.com/notlibrary/obsidian-adamantine-pick/releases/download/";
			const tag_string = this.manifest.version;
			const output_folder = normalizePath(this.settings.adamantine_dir);
	
			const url = github_url + "/" + tag_string + "/" + json_name;
			
			const options: RequestUrlParam = {
				url: url,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			};
			
			const dir = normalizePath(output_folder);
			try {
				await this.app.vault.createFolder(dir);
			}
			catch (error) {
				console.log(error.toString());
			}
			
			
			try {
				const response: RequestUrlResponse = await requestUrl(options); 			
				const adamantine_notes: AdamantineDiagramNote[] = JSON.parse(response.text);
			
				if (this.settings.decode_locally) { console.log('download ' + zip_name + ' instead'); /* Read permissions import, nah */ }
				
				adamantine_notes.forEach(async ( diagram_note, i ) => {
					try {
						
						const filename = normalizePath(output_folder + "/" + diagram_note.filename + ".md");
						if ( diagram_note.filename.length > 8) { console.log( "Warning: not adamantine diagram note file name length > 8" + " index: " + i); }
						const sha256digest = diagram_note.sha256digest; 
						const decoded = this.decode_base64(diagram_note.base64content);
						if ( decoded.length > 4096 ) { console.log("Warning: not adamantine diagram note size > 4096 bytes" + " index: " + i); }
						const sha256in = sha256(decoded).toString();
						if ( sha256digest === sha256in) {
							console.log('SHA256 check success: ' + filename);
							await this.app.vault.create(filename, decoded);
						}
						else {
							console.log('Warning: not adamantine diagram note failed SHA256 check');
						}
					}
					catch (error) {
						console.log('failed to save ' + error.toString());
					}
				});	
			}
			catch(error) {
				console.log('failed to fetch ' + JSON.stringify(error));
			}
			console.log('successfully fetched adamantine diagram notes');			
	}
	
	private output_builtin_diagram(index: number) {
		
		const samples_list = this.settings.samples_list;
		
		let src = "# " + samples_list[index - 1] + "\n";
		src += "Sample [Pikchr](https://pikchr.org) diagram in [Obsidian](https://obsidian.md) note by [Adamantine Pick](https://github.com/notlibrary/obsidian-adamantine-pick) plugin \n";
		src += "Demo sample name: " +  samples_list[index - 1] + "\n";
		
		src += "``` pikchr\n";
		switch (index) {
			case 1:
			src += this.sample_cheat_sheet();
			break;
			case 2:
			src += this.sample_palindrome();
			break;
			case 3:
			src += this.sample_triforce();
			break;
			default:
			index = 0;
			break;
		}
		src += "\n```\n";	
		return src;
	}
	
	private sample_triforce() {
		const src = 
		`
		color = black
		TRIFORCE: [
		A: [ line thin go heading 150 then west close fill black ]
		down 
		move 0.55cm
		right
		B: [ line thin go heading 150 then west close fill black ]
		left
		C: [line thin go heading 150 then west close fill black ]
		]
		Caption: text "newfags can't triforce" italic with .n at 0.1cm above TRIFORCE.s
		`;
		return src;
	}

	private sample_palindrome() {
		const palindrome = [
		"Dennis","Nell","Edna","Leon","Nedra","Anita","Rolf","Nora",
		"Alice","Carol","Leo","Jane","Reed","Dena","Dale","Basil",
		"Rae","Penny","Lana","Dave","Denny","Lena","Ida","Bernadette",
		"Ben","Ray","Lila","Nina","Jo","Ira","Mara","Sara",
		"Mario","Jan","Ina","Lily","Arne","Bette","Dan","Reba",
		"Diane","Lynn","Ed","Eva","Dana","Lynne","Pearl","Isabel",
		"Ada","Ned","Dee","Rena","Joel","Lora","Cecil","Aaron",
		"Flora","Tina","Arden","Noel","and","Ellen","sinned"
		];
		const total = 63;
		const width = 4;
		let src = "";
		let parity = 0;
		
		for (let i = 0; i < total; i++) {
			src+= "box " + '"' + palindrome[i] + '";';
			if (i % width === 3 && i!==0) { src += " down; ";}
			
			if (i % width === 0 && i!==0) { 
				if (parity === 0 ) {src+=" left; "; } else {src+=" right; "; }
				parity ^=1;
			} 
			if  (i!==total - 1) {
				src+= " arrow <->; ";
			}
		}
		return src;

	}
	
	private sample_cheat_sheet() {
		const src = 
		`
		CHEAT_SHEET: [
		A: box "box" "radius 5px" radius 5px
		dot color red at A.nw ".nw " rjust above
		dot same at A.w ".w " rjust
		dot same at A.sw ".sw " rjust below
		dot same at A.s ".s" below
		dot same at A.se " .se" ljust below
		dot same at A.e " .e" ljust
		dot same at A.ne " .ne" ljust above
		dot same at A.n ".n" above
		B: circle "circle" at 1 right of previous box
		ellipse "ellipse" at 1 right of previous
		oval "oval" at .8 below first box
		cylinder "cylinder" at 1 right of previous
		file "file" at 1 right of previous
		line "line" above from .8 below last oval.w
		arrow <-> "arrow <->" above from 1 right of previous
		spline from previous+(1.8cm,-.2cm) \
		   go right .15 then .3 heading 30 then .5 heading 160 then .4 heading 20 \
		   then right .15
        "spline" at 3rd vertex of previous
		dot color red at .6 below last line " .c" ljust
		text "dot" with .s at .2cm above previous.n
		arc from 1 right of previous dot
		text "arc" at (previous.start, previous.end)
		text "text" "mono" mono at 1.3 right of start of previous arc
		line "aligned above" aligned above "aligned below" aligned below from .8 below last dot.w
		box "bold" bold "italic" italic "bold-italic" bold italic at .6 below previous arc 
		right 
		arrow dashed "arrow" above "dashed" below
		box "bold" mono bold "italic" mono italic "bold italic" mono bold italic
		]
		Border: box thin width CHEAT_SHEET.width+0.5in height CHEAT_SHEET.height+0.5in at CHEAT_SHEET.center
		Caption: text "pikchr cheat sheet from 9001 previous oval" italic with .n at 0.1cm below CHEAT_SHEET.s
		`;
		return src;
	}	
}

export class AdamantinePickSettingsTab extends PluginSettingTab {
	plugin: AdamantinePickPlugin;

	constructor(app: App, plugin: AdamantinePickPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();
		
		new Setting(containerEl)
			.setName('Encoder')
			.setDesc('Render type')
			.addDropdown(dropDown => {
				dropDown.addOption('1', 'SVG');
				dropDown.addOption('2', 'Text');
				dropDown.addOption('3', 'Dummy');
				dropDown.setValue(this.plugin.settings.encoder_type.toString());
				dropDown.onChange(async (value) =>	{
					console.log('render type: ' + value);
					this.plugin.settings.encoder_type = parseInt(value);
					await this.plugin.saveSettings();
				});
			});
		
		new Setting(containerEl)
			.setName('Sample')
			.setDesc('Create once one builtin sample diagram note(requires plugin reload)')
			.addDropdown(dropDown => {
				dropDown.addOption('1', 'Cheat Sheet');
				dropDown.addOption('2', 'Palindrome');
				dropDown.addOption('3', 'Triforce');
				dropDown.addOption('4', 'None');
				dropDown.setValue(this.plugin.settings.sample_to_render.toString());
				dropDown.onChange(async (value) =>	{
					console.log('render builtin sample: ' + value);
					this.plugin.settings.sample_to_render = parseInt(value);
					await this.plugin.saveSettings();
				});
			});
			
		new Setting(containerEl)
			.setName('Theme')
			.setDesc('Bleach background for PDF export(printing)')
			.addToggle(cb => {
				cb.setValue(this.plugin.settings.bleach_diagram);
				cb.onChange(async (value: boolean) => {
					console.log('bleach diagram: ' + value);
					this.plugin.settings.bleach_diagram = value;
					await this.plugin.saveSettings();
				});
			});
			
		new Setting(containerEl)
			.setName('Markdown Code Block Identifier')
			.setDesc('What markdown code blocks to render(requires plugin reload)')
			.addText(text => text
				.setPlaceholder('pikchr pick')
				.setValue(this.plugin.settings.block_identify[0])
				.onChange(async (value) => {
					let valid = value.split(" ")[0];
					if (valid.length > 1024) {valid = "pikchr"; }
					console.log('md block id:' + valid);
					this.plugin.settings.block_identify[0] = valid; 
					await this.plugin.saveSettings();
				}));
		
		new Setting(containerEl)
			.setName('DOM class of output')
			.setDesc('Mark DOM class of pikchr output')
			.addText(text => text
				.setPlaceholder('adamantine')
				.setValue(this.plugin.settings.output_dom_mark)
				.onChange(async (value) => {
					let valid = value.split(" ")[0];
					if (valid.length > 1024) {valid = "adamantine"; }
					console.log('pikchr output dom class: ' + valid);
					this.plugin.settings.output_dom_mark = valid;
					await this.plugin.saveSettings();
				}));
				
		new Setting(containerEl)
			.setName('Preserve diagram debug print')
			.setDesc('Preserve inner diagram print calls that outputs lines before DOM SVG element')
			.addToggle(cb => {
				cb.setValue(this.plugin.settings.preserve_diagram_debug_print);
				cb.onChange(async (value: boolean) => {
					console.log('preserve pikchr debug print: ' + value);
					this.plugin.settings.preserve_diagram_debug_print = value;
					await this.plugin.saveSettings();
				});
			});
			
		new Setting(containerEl)
			.setName('Report status message after diagram into note')
			.setDesc('height(px) width(px) size(byte) time(ms)')
			.addToggle(cb => {
				cb.setValue(this.plugin.settings.output_diagram_stats);
				cb.onChange(async (value: boolean) => {
					console.log('report diagram stats: ' + value);
					this.plugin.settings.output_diagram_stats = value;
					await this.plugin.saveSettings();
				});
			});
		new Setting(containerEl)
			.setName('Use local adamantine diagram notes JSON')
			.setDesc('admantine-diagram-notes.json from plugin folder(for debug testing)')
			.addToggle(cb => {
				cb.setValue(this.plugin.settings.decode_locally);
				cb.onChange(async (value: boolean) => {
					console.log('decode adamantine json locally: ' + value);
					this.plugin.settings.decode_locally = value;
					await this.plugin.saveSettings();
				});
			});
	}
}
