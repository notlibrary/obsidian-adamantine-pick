import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting, MarkdownPostProcessorContext } from "obsidian";
const factory = require("./pick.js");

declare module "obsidian" {
	interface Vault {
		setConfig: (config: string, newValue: string) => void;
		getConfig: (config: string) => string;
	}
}

export interface AdamantinePickSettings {
	block_identify: string[];
	output_dom_mark: string;
	encoder_type: number;
	sample_to_render: number;
	bleach_diagram: boolean;
	output_diagram_stats: boolean;
	samples_list: string[];
	samples_dir: string;
}

export const DEFAULT_SETTINGS: AdamantinePickSettings = {
	block_identify: [ 'pikchr', 'pick' ],
	output_dom_mark: 'adamantine',
	encoder_type: 1,
	sample_to_render: 4,
	bleach_diagram: false,
	output_diagram_stats: false,
	samples_list : ["Cheatsheet", "Palindrome", "Triforce", "Dummy"],
	samples_dir: "sample-diagrams"
}

export interface Processor {
    svg: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<void>;

}

export class AdamantinePickProcessor implements Processor {
	render_type: number;
	dark_mode: number;
	dom_mark: string;
	report: boolean;
	encodedDiagram: string;
	diagram_height: number;
	diagram_width: number;
	timestamp: number;
	
	constructor(render_type: number, mFlags: number, dom_mark: string, report: boolean) {
		this.render_type = render_type;
		this.dark_mode = mFlags;
		this.dom_mark = dom_mark;
		this.report = report;
		this.encodedDiagram = "";
		this.diagram_height = 0;
		this.diagram_width = 0;
	}
	
    svg = async(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {	
	
		factory().then(
			async (instance) => {
				this.timestamp = Date.now();
				let pikchr = instance.cwrap('pick', 'string', ['string','string','number']);
				let get_height = instance.cwrap('pick_height', 'number', ['number']);
				let get_width = instance.cwrap('pick_width', 'number', ['number']);
				this.encodedDiagram = pikchr(source,this.dom_mark,this.dark_mode);
				this.diagram_height = get_height(0);
				this.diagram_width = get_width(0);
				await this.diagram_handler(this.encodedDiagram, el, ctx);	
			}
		);
		
	}
	
	diagram_handler = async (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext ) => {				
		let length = source.length;	
		const parser = new DOMParser();
		let svg = parser.parseFromString(source, "image/svg+xml");
		const links = svg.getElementsByTagName("a");
		for (let i = 0; i < links.length; i++) {
			const link = links[i];
			link.addClass("internal-link");
		}
		
		if (this.render_type === 1) {
			el.insertAdjacentHTML('beforeend', svg.documentElement.outerHTML);
		}
		else if(this.render_type === 2) {
			el.createEl("div",{ text: source });
		}
		else {
			console.log('dummy encoder');
		}
		
		if (this.report) {
			let deltat = Date.now() - this.timestamp;
			let status_report = "[Adamantine Pick] height(px):" + this.diagram_height + "; width(px):" + this.diagram_width + "; length(byte):" + length + "; time(ms): " + deltat; 
			el.createEl("div",{ text: status_report });
		}
	}


}

export default class AdamantinePickPlugin extends Plugin {
	settings: AdamantinePickSettings;
	total_builtin_samples: number = 4;
	
	async onload(): Promise<void> {
		console.log('loading adamantine pick plugin')
		await this.loadSettings();
		
		const isLightMode = this.app.vault.getConfig("theme") !== "obsidian";
		let dark_mode_flag = 0x0002;
		let dom_mark = this.settings.output_dom_mark;
		if (isLightMode || this.settings.bleach_diagram) { dark_mode_flag = 0x0000; }
		let report = this.settings.output_diagram_stats;
		let render_type = this.settings.encoder_type;
		const processor = new AdamantinePickProcessor(render_type, dark_mode_flag, dom_mark, report);
		this.registerMarkdownCodeBlockProcessor(this.settings.block_identify[0], processor.svg);		

		this.addSettingTab(new AdamantinePickSettingsTab(this.app, this));
		
		

		if (this.settings.sample_to_render < this.total_builtin_samples) {
			
			const dir = this.settings.samples_dir;
			try {
				await this.app.vault.createFolder(dir)
			}
			catch (error) {
				console.log(error.toString());
			}
			
			let samples_list = ["Cheatsheet", "Palindrome", "Triforce", "Dummy"];
			let arr_in = 0;
			arr_in = this.settings.sample_to_render;
			let filename = dir + "/" + samples_list[arr_in - 1] + ".md";
			
			let sample_content = this.output_builtin_diagram(arr_in);
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

	async saveSettings(): Promise<void>  {
		
		await this.saveData(this.settings);
	}
	
	private output_builtin_diagram(index: number)
	{
		
		let samples_list = ["Cheatsheet", "Palindrome", "Triforce", "Dummy"];
		
		var src = "# " + samples_list[index - 1] + "\n";
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
	
	private sample_triforce()
	{
		var src = 
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
		`
		return src;
	}
	 
	private sample_palindrome() 
	{
		const palindrome = [
		"Dennis","Nell","Edna","Leon","Nedra","Anita","Rolf","Nora",
		"Alice","Carol","Leo","Jane","Reed","Dena","Dale","Basil",
		"Rae","Penny","Lana","Dave","Denny","Lena","Ida","Bernadette",
		"Ben","Ray","Lila","Nina","Jo","Ira","Mara","Sara",
		"Mario","Jan","Ina","Lily","Arne","Bette","Dan","Reba",
		"Diane","Lynn","Ed","Eva","Dana","Lynne","Pearl","Isabel",
		"Ada","Ned","Dee","Rena","Joel","Lora","Cecil","Aaron",
		"Flora","Tina","Arden","Noel","and","Ellen","sinned"
		]
		let total = 63;
		let width = 4;
		var src = "";
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
	
	private sample_cheat_sheet()
	{
		var src = 
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
		arrow "arrow" above from 1 right of previous
		spline from previous+(1.8cm,-.2cm) \
		   go right .15 then .3 heading 30 then .5 heading 160 then .4 heading 20 \
		   then right .15
		"spline" at 3rd vertex of previous
		dot color red at .6 below last line " .c" ljust
		text "dot" with .s at .2cm above previous.n
		arc from 1 right of previous dot
		text "arc" at (previous.start, previous.end)
		text "text" at 1.3 right of start of previous arc
		line "aligned above" aligned above "aligned below" aligned below from .8 below last dot.w
		box "bold" bold "italic" italic "bold-italic" bold italic at .6 below previous arc 
		right 
		arrow <->
		box "arrow <->"
		]
		Border: box thin width CHEAT_SHEET.width+0.5in height CHEAT_SHEET.height+0.5in at CHEAT_SHEET.center
		Caption: text "pikchr cheat sheet from 9001 previous oval" italic with .n at 0.1cm below CHEAT_SHEET.s
		`	
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
				dropDown.onChange(async (value) =>	{
					console.log('render type: ' + value);
					this.plugin.settings.encoder_type = parseInt(value);
					await this.plugin.saveSettings();
				});
			});
		
		new Setting(containerEl)
			.setName('Sample')
			.setDesc('Create once one builtin sample diagram note on next load')
			.addDropdown(dropDown => {
				dropDown.addOption('1', 'Cheat Sheet');
				dropDown.addOption('2', 'Palindrome');
				dropDown.addOption('3', 'Triforce');
				dropDown.addOption('4', 'None');
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
			})
			
		new Setting(containerEl)
			.setName('Markdown Code Block Identifier')
			.setDesc('What markdown code blocks to render')
			.addText(text => text
				.setPlaceholder('pikchr pick')
				.setValue(this.plugin.settings.block_identify[0])
				.onChange(async (value) => {
					console.log('md block id:' + value);
					this.plugin.settings.block_identify[0] = value;
					await this.plugin.saveSettings();
				}));
		
		new Setting(containerEl)
			.setName('DOM class of output')
			.setDesc('Mark DOM class of pikchr output')
			.addText(text => text
				.setPlaceholder('adamantine')
				.setValue(this.plugin.settings.output_dom_mark)
				.onChange(async (value) => {
					console.log('pikchr output dom class: ' + value);
					this.plugin.settings.output_dom_mark = value;
					await this.plugin.saveSettings();
				}));
				
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
			})
	}
}
