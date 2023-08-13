![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/notlibrary/obsidian-adamantine-pick?style=for-the-badge&sort=semver)
![GitHub all releases](https://img.shields.io/github/downloads/notlibrary/obsidian-adamantine-pick/total?style=for-the-badge)

# Adamantine Pick

Embeddable [Pikchr](https://pikchr.org) diagrams renderer plugin for
[Obsidian](https://obsidian.md). Outputs end-user diagram to viewable SVG inside
Obsidian note out of the box client side offline without need to compile install 
Pikchr itself

## Demo

![adamantine-pick-demo](https://user-images.githubusercontent.com/40695473/214959908-ae7b23f2-02f4-4c54-815e-7204ae318911.gif)

Use note with 3-backticks(tildes) fenced code block marked `pikchr` to get SVG in

	```pikchr
	box "What are we going to do today" "Second Brain?" fit 
	arrow
	box "The same thing we do everyday" "To take over the World!" fit
	```

> ...quick pikchr diagram in one of this text notes maybe(or not) 
> extremly useful for anyone out there

Use `adamantine` class attribute selector to manipulate it from code

> GPT-3 parrot #39402817203 pikchr random space station map adamantine diagram note
> and fix 9000 oval in it

See? "Absurd nerd value" for 3 pages free wrapper script(plugin)  

![adamantine_note_sample](https://github.com/notlibrary/obsidian-adamantine-pick/assets/40695473/82085fce-46fc-4bed-b14a-e8e7d9eb5cab)

Resistor color table calc? Sure 

![resistor_calculator_sample](https://github.com/notlibrary/obsidian-adamantine-pick/assets/40695473/28737d00-259d-42af-977c-a485ec7e812b)

## Installation

Because `pikchr.c` precompiled with emcc installing this plugin allows user to
markup diagrams directly from client without installing compiling pikchr
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
collection from github plugin release page then check it decode and generate notes in your `VaultFolder/adamantine`

Or you can pick up it manually by copying `src/*.md` files from this plugin repo to your `VaultFolder/adamantine` 
or downloading `adamantine-diagram-notes.zip` from latest [release page](https://github.com/notlibrary/obsidian-adamantine-pick/releases) 
and extracting it to your `VaultFolder/adamantine`

To push your own adamantine diagram note design into plugin collection use this checklist: 

- utf-8 encoded text file in english(preferably)
- less equal 4kb(4096 bytes) size that fits in a single hdd block
- lowercase (a-z) less equal 8 characters unique filename len with extension .md 8 + 2
- has one or more pikchr diagrams in it mathjax markdown optionally
- fits in a single screen when picked with Obsidian
- tagged with yaml `--- tag: adamantine ---` and `#adamantine`
- tight cybersecure has no malicious executable code in it(i.e. perl one-liners) 
- no ads messing with others personal data(OP self signature is ok)
- embeddable in place does not rely on cloud internet connection or dynamic linking
- decodable with stock computer hardware 
- does not repeat existing adamantine diagram notes in collection(also has unique filename)
- picking it is memorable has some reusability utility cool nerd/hacker value  
- easy human digestable readable can be shared in place has clear semantics bits of knowledge
- not necessary a STEM/EE/ME cheatsheet use your own imagination show some effort
- easy discardable and disposable you constantly want to asswipe with it purple toilet paper

then [fork this repo](https://github.com/obsidian/adamantine_pick) commit it into `src` folder 
then make pull request thread and wait for approve

Sure requirements are hard to met adamantine diagram notes are rare it's sort of CCG or sticker 
album with dinosaurs operating over the popular note-taking app open source vector graphic stack 
with hope to aid your workflow that's it basically

## Remote gripping adamantine diagram notes

This is the most hilarious usage case then you virtualize decoder desktop box 
(with obsidian and plugin installed and note collection picked in it) on the remote 
virtualization server then share hypervisor virtual machine player over the network 
or remote framebuffer keyboard protocol with your target host screen browser 
or vnc window so you fully observe notes decoded remotely locally  

I tested it with neverinstall boxes you can retry it anytime
If you are running youtube channel you can show this trick to your subscribers
"Unboxing adamantine diagram notes" lol anyway it's very hard to acheive truly 
reusable city screens

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

Install node.js dev packages
	
```
npm install
```

Build `pick.js` from `pick.c` wrap to `pikchr.c` artifact
	
```
npm run pikchr
```

The compiler one-liner is this

```
emcc src/pick.c -DPIKCHR_SHELL -Wall -Wextra -lm -O2 --memory-init-file 0 -sWASM=0 -sMODULARIZE=1 -sEXPORT_NAME=pick -sEXPORTED_FUNCTIONS=_pick,_pick_width,_pick_height -sEXPORTED_RUNTIME_METHODS=ccall,cwrap -o src/pick.js
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
[See emsdk from github actions](https://github.com/mymindstorm/setup-emsdk) 

## Pikchr Official Documentation References

- [Manual](https://pikchr.org/home/doc/trunk/doc/userman.md)
- [Examples](https://pikchr.org/home/doc/trunk/doc/examples.md)
- [Specification](https://pikchr.org/home/doc/trunk/doc/grammar.md)
- [Source Artifact](https://pikchr.org/home/artifact/018a05d1d6a3fd1b)

## Note

Experimental bloated ugly wrapper but possibility to run it entirely in 
js environment outweights security drawbacks

- Do not edit `pikchr.c` it's autogenerated from original artifact and 
intended for integrator usage 
- Do not use it for CAD/CAM drawings, marketing presentations, spreadsheet 
charts, function graphs(plots) and specialized STEM charts
- Acknowledge original Pikchr developers

Deflated binary size with wrap ~75-100KB(depends on compr algo)
So it fits in desktop L2 cache `arrow <-> from A to B chop` together 
with encoded diagram and even leaves some more free space for others
Common output mime-type `image/svg+xml` makes it easy negotiatable and 
decodable anywhere by anyone

*tl, dr:* for those who read it to the end "BanKan" diagram

	```pikchr
	box "DONE"; box "IN" ; box "DO" ; down; move from first box.n

	DONE: [ box "Shit" ] ; right 
	IN: box "Random"
	DO: box "Task 1" "Task 2" "Task 3"
	```
	
*P.S.* Although not best practice because "Digital? Every Idiot Can Count to One"(c) 
I pushed my lame memo test OPamp circuit diagram note into separate `src/opamp.md`
