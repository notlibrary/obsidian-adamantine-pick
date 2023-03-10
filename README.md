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

## Installation

Because `pikchr.c` precompiled with emcc installing this plugin allows user to
markup diagrams directly from client without installing compiling pikchr
itself.  This makes plugin embeddable usable "out of the box" "client-side"
"offline"

With user interface
- Ensure Safe mode is **off** 
- Settings > Community plugins > Turn On Community Plugis
- Click Browse community plugins
- Search for "Adamantine Pick"
- Click Install

Manually installing
- Copy over `main.js`, `manifest.json`, `styles.css` to your Vault 
`VaultFolder/.obsidian/plugins/adamantine-pick/`

Test installing
- Paste this plugin repo link into plugin for [testing other plugins](https://github.com/TfTHacker/obsidian42-brat) 

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
emcc src/pick.c -DPIKCHR_SHELL -Wall -Wextra -lm -O1 -sWASM=0 -sMODULARIZE=1 -sEXPORT_NAME=pick -sEXPORTED_FUNCTIONS=_pick,_pick_width,_pick_height -sEXPORTED_RUNTIME_METHODS=ccall,cwrap -o src/pick.js
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
- [Source Artifact](https://pikchr.org/home/artifact/02f23c6c39)

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

