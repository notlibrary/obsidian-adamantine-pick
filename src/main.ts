import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting, MarkdownPostProcessorContext } from "obsidian";
const factory = require("./pikchr.js");


interface AdamantinePickSettings {
	block_identify: string[];
	auto_render: boolean;
	show_toolbar: boolean;
	
}

const DEFAULT_SETTINGS: AdamantinePickSettings = {
	block_identify: [ 'pikchr', 'pick' ],
	auto_render: false,
	show_toolbar: true,
}

export interface Processor {
    svg: (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<void>;

}

export class AdamantinePickProcessor implements Processor {
    svg = async(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
						
			
			factory().then((instance) => {
			
				let pikchr = instance.cwrap('pikchr', 'string', ['string','string','number']);
			
	  
				
				const encodedDiagram = pikchr(source,"adamantine",2);
				
				const parser = new DOMParser();
				const svg = parser.parseFromString(encodedDiagram, "image/svg+xml");

				const links = svg.getElementsByTagName("a");
				for (let i = 0; i < links.length; i++) {
					const link = links[i];
					link.addClass("internal-link");
				}
				el.insertAdjacentHTML('beforeend', svg.documentElement.outerHTML);
			
			});
	}

}

export default class AdamantinePickPlugin extends Plugin {
	public settings: AdamantinePickSettings;

	public async onload(): Promise<void> {
		console.log('loading adamantine pick plugin')
		await this.loadSettings();
		
		const processor = new AdamantinePickProcessor();
		this.registerMarkdownCodeBlockProcessor(this.settings.block_identify[0], processor.svg);		

		this.addSettingTab(new AdamantinePickSettingsTab(this.app, this));

	}

	public onunload(): void {
		console.log('unloading adamantine pick plugin')
		
	}

	public async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	public async saveSettings() {
		await this.saveData(this.settings);
	}
}


class AdamantinePickSettingsTab extends PluginSettingTab {
	plugin: AdamantinePickPlugin;

	constructor(app: App, plugin: AdamantinePickPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Markdown Code Block Identifier')
			.setDesc('What markdown code blocks to render')
			.addText(text => text
				.setPlaceholder('pikchr pick')
				.setValue(this.plugin.settings.block_identify[0])
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.block_identify[0] = value;
					await this.plugin.saveSettings();
				}));
				
	}
}

