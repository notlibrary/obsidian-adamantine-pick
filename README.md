![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/notlibrary/obsidian-adamantine-pick?style=for-the-badge&sort=semver)
![GitHub all releases](https://img.shields.io/github/downloads/notlibrary/obsidian-adamantine-pick/total?style=for-the-badge)

# Adamantine Pick

Embeddable [Pikchr](https://pikchr.org) diagrams renderer plugin for
[Obsidian](https://obsidian.md). Outputs end-user diagram to viewable SVG inside
Obsidian note out of the box client side offline without need to compile install 
Pikchr itself

## Demo

![adamantine_pick_demo](https://github.com/notlibrary/obsidian-adamantine-pick/assets/40695473/b4bab068-6666-41a6-9c82-cda570ef7497)

Use note with 3-backticks(tildes) fenced code block marked `pikchr` to get SVG in

	```pikchr
	box "What are we going to do today" "Second Brain?" fit 
	arrow
	box "The same thing we do everyday" "To take over the World!" fit
	```

> ...quick pikchr diagram in one of this text notes maybe(or not) 
> extremely useful for anyone out there

Use `adamantine` class attribute selector to manipulate it from code

> GPT-4 parrot #39402817203 pikchr random space station map adamantine diagram note
> and fix 9000 oval in it

See? "Absurd nerd value" for 3 pages free wrapper script(plugin)  

![adamantine_note_sample](https://github.com/notlibrary/obsidian-adamantine-pick/assets/40695473/82085fce-46fc-4bed-b14a-e8e7d9eb5cab)

Resistor color table calc? Sure 

![resistor_calculator_sample](https://github.com/notlibrary/obsidian-adamantine-pick/assets/40695473/e1acb1fe-f8bb-4884-8af3-3d0461c6d6de)

And my favourite sample so far recursive diagram see `src/pikchr.pikchr` file

![recursive_sample](https://github.com/notlibrary/obsidian-adamantine-pick/assets/40695473/111564d9-4f19-4bf4-8146-c346565222e3)


## Installation

Because `pikchr.c` precompiled with emcc installing this plugin allows user to
markup diagrams directly from client without installing compiling Pikchr
itself.  This makes plugin embeddable usable "out of the box" "client-side"
"offline"

With user interface

- Ensure Safe mode is **off** 
- Settings > Community plugins > Turn On Community Plugins
- Click Browse community plugins or just open install URL `obsidian://show-plugin?id=adamantine-pick`
- Search for "Adamantine Pick"
- Click Install 
- Don't forget to turn it **ON** with the purple slider
- Settings > Community Plugins > Installed Plugins > Adamantine Pick

Manually installing

- Copy over `main.js`, `manifest.json`, `styles.css` to your Vault 
`VaultFolder/.obsidian/plugins/adamantine-pick/`

Test installing

- Paste [this plugin repo link](https://github.com/notlibrary/obsidian-adamantine-pick) into plugin for [testing other plugins](https://github.com/TfTHacker/obsidian42-brat) 

## Picking up and Pushing adamantine diagram notes

To pick up adamantine diagram notes use separate "Adamantine Pick" command <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F5</kbd>
If it has internet it will try to fetch(request) JSON `adamantine-diagram-notes.json` with entire notes 
collection from GitHub plugin release page then check it decode and generate notes in your `VaultFolder/adamantine`

Or you can pick up it manually by copying `src/*.md` files from this plugin repo to your `VaultFolder/adamantine` 
or downloading `adamantine-diagram-notes.zip` from latest [release page](https://github.com/notlibrary/obsidian-adamantine-pick/releases) 
and extracting it to your `VaultFolder/adamantine`

To push your own adamantine diagram note design into plugin collection use this checklist: 

- UTF-8 encoded text file in English(preferably)
- less equal 4KB(4096 bytes) size that fits in a single HDD block
- lowercase (a-z) less equal 8 characters unique filename len with extension .md 8 + 2
- has one or more Pikchr diagrams in it MathJax Markdown optionally
- fits in a single screen when picked with Obsidian
- tagged with YAML `--- tag: adamantine ---` and `#adamantine`
- tight cybersecure has no malicious executable code in it(i.e. Perl one-liners) 
- no ads messing with others personal data(OP self signature is OK)
- embeddable in place does not rely on cloud internet connection or dynamic linking
- decodable with stock computer hardware 
- does not repeat existing adamantine diagram notes in collection(also has unique filename)
- picking it is memorable has some reusability utility cool nerd/hacker value  
- easy human digestible readable can be shared in place has clear semantics bits of knowledge
- not necessary a STEM/EE/ME cheatsheet use your own imagination show some effort
- easy discardable and disposable you constantly want to asswipe with it purple toilet paper

then [fork this repo](https://github.com/obsidian/adamantine_pick) commit it into `src` folder 
then make pull request thread and wait for approve

Sure requirements are hard to met adamantine diagram notes are rare it's sort of CCG or sticker 
album with dinosaurs operating over the popular note-taking app open source vector graphic stack 
with hope to aid your workflow that's it basically

## Remote gripping adamantine diagram notes

This is the most hilarious usage case then you virtualize decoder desktop box 
(with Obsidian and plugin installed and note collection picked in it) on the remote 
virtualization server then share hypervisor virtual machine player over the network 
or remote framebuffer keyboard protocol with your target host screen browser 
or VNC window so you fully observe notes decoded remotely locally  

I tested it with [Neverinstall](https://neverinstall.com/) boxes you can retry it anytime
If you are running YouTube channel you can show this trick to your subscribers
"Unboxing adamantine diagram notes" lol anyway it's very hard to achieve truly 
reusable city screens

Anyway you can also use native shell script to fetch decode JSON directly then 
[*preprocess* the Pikchr + Markdown input](https://github.com/zenomt/pikchr-cmd) 
then convert it to PDF or HTML with pandoc without touching note taking app 
GUI and plugin system at all

Moreover it can replace Pikchr with some ancient logo turtle interpreter or even
typographical forth dialect basically anything that output vectors in computers
General interest in computer archaeology and dinosaurs is fascinating curious 
international paperwork affair Nonetheless it provides excellent tooling for
durable lightweight computer documentation Input data inconsistency is a 
fact of life (not advocating that)

## How to build plugin

Install and activate [emcc](https://emscripten.org) using emsdk

```
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
emsdk activate
```

Clone [this plugin repo](https://github.com/notlibrary/obsidian-adamantine-pick)
to your Vault into `VaultFolder/.obsidian/plugins/adamantine-pick` folder

```
cd VaultFolder/.obsidian/plugins
git clone https://github.com/notlibrary/obsidian-adamantine-pick adamantine-pick
cd adamantine-pick
```

Install Node.js dev packages
	
```
npm install
```

Build `pick.js` from `pick.c` wrap to `pikchr.c` artifact
	
```
npm run pikchr
```

The compiler one-liner is this

```
emcc src/pick.c -Wall -Wextra -lm -O3 --memory-init-file 0 --closure 1 -sWASM=0 -sMODULARIZE=1 -sEXPORT_NAME=pick -sTOTAL_STACK=131072 -sENVIRONMENT=web -sEXPORTED_FUNCTIONS=_pick,_pick_width,_pick_height,_pick_version -sEXPORTED_RUNTIME_METHODS=ccall,cwrap -o src/pick.js
```

Or standalone `pick.wasm` it needs some glue code to pass C strings anyway

```
npm run pick
```

The compiler invocation then

```
emcc src/pick.c -Wall -Wextra -lm -O3 --no-entry -DNDEBUG --minify=0 -sMODULARIZE=0 -sWASM=1 -sSTANDALONE_WASM=1 -sTOTAL_STACK=131072 -sENVIRONMENT=web -sEXPORTED_FUNCTIONS=_pick,_pick_width,_pick_height,_pick_version,_malloc,_free -o src/pick.wasm
```

Encode `adamantine-diagram-notes.json` database

```
npm run notes
```

Bundle build(and minify) `main.js` from `main.ts` wrapper

```
npm run build
```
 	
To debug wrapper in loop

```
npm run dev
```

Build server actions workflow is also usable to automate this(and version bump)
[See emsdk from GitHub actions](https://github.com/mymindstorm/setup-emsdk)
Also [read raw action runner logs](https://github.com/notlibrary/obsidian-adamantine-pick/actions) if you find this instructions inconsistent or 
hard to understand

## Pikchr Official Documentation References

- [Manual](https://pikchr.org/home/doc/trunk/doc/userman.md)
- [Examples](https://pikchr.org/home/doc/trunk/doc/examples.md)
- [Specification](https://pikchr.org/home/doc/trunk/doc/grammar.md)
- [Source Artifact](https://pikchr.org/home/artifact/64bf5f8874)

## CSS SVG postprocessing features

Feasible to further postprocess diagram processor output
using builtin CSS rules and SVG parser
For example this autogenerated CSS snippet

```css
/* default id selector for single diagram object is #postproc-diag-42 */
svg.adamantine {
	filter: drop-shadow(0 -6mm 4mm rgb(160, 0, 210));
	border-image-slice: 41 42 42 44;
	border-image-width: 42px 42px 42px 42px;
	border-image-outset: 42px 42px 42px 42px;
	border-image-repeat: round round;
	border-image-source: url("https://mdn.github.io/css-examples/tools/border-image-generator/border-image-6.svg");
	border-style: solid; 
}
```

Makes all diagrams drop purple shadow and borders it with 
gimmick glittering fence like this:

![css_postprocessing_sample](https://github.com/notlibrary/obsidian-adamantine-pick/assets/40695473/c5cf1798-8957-4fc5-a3fc-29432b35ec8d)

I am happy to leave discussion of actual utility of 
aforementioned features to the users
As for syntax highlighter GitHub editor already has one

Another nice feature is interacting with core app plugins
Put the note with callout that embeds named clock diagram
block from another note into canvas then open canvas and 
page preview note with callout

![plugin_interaction_sample](https://github.com/notlibrary/obsidian-adamantine-pick/assets/40695473/434b943c-704f-46c9-b70f-e3c9282cb68d)

Here it is have fun


## Note

Experimental bloated ugly wrapper but possibility to run it entirely in 
js environment outweighs security drawbacks

- Do not edit `pikchr.c` it's autogenerated from original artifact and 
intended for integrator usage 
- Do not use it for CAD/CAM drawings, marketing presentations, spreadsheet 
charts, function graphs(plots) and specialized STEM charts
- Acknowledge original Pikchr developers

Deflated binary size with wrap ~75-100KB(depends on compr algo)
So it fits in desktop L2 cache `arrow <-> from A to B chop` together 
with encoded diagram and even leaves some more free space for others
Common output mime-type `image/svg+xml` makes it easy negotiable and 
decodable anywhere by anyone

*tl, dr:* for those who read it to the end "BanKan"

	```pikchr
	box "DONE"; box "IN" ; box "DO" ; down; move from first box.n

	DONE: [ box "Shit" ] ; right 
	IN: box "Random"
	DO: box "Task 1" "Task 2" "Task 3"
	```

and clock diagrams
 
	```pikchr
	gmt = 0
	hours =  time / 3600 + gmt
	mins = time / 60
	circle rad 0.5
	circle invis rad 0.6 at first circle.c
	circle rad 0.7 at first circle.c
	arrow thick from first circle go 90% heading hours*30 
	arrow from first circle go heading mins*6
	arrow dashed thin from first circle go heading time*6
	dot at first circle
	text "XII" at 0.1 above first circle.n
	text "VI" at 0.1 below first circle.s
	text "III" at 2nd circle.e
	text "IX" at 2nd circle.w
	#?time
	```

*P.S.* Although not best practice because "Digital? Every Idiot Can Count to One"(c) 
I pushed my lame memo test OPamp circuit diagram note into separate `src/opamp.md`
