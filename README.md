# Obsidian Adamantine Pick

Embeddable Pikchr(https://pikchr.org) diagrams renderer for
Obsidian(https://obsidian.md).  Outputs end-user diagram to viewable SVG inside
Obsidian note out of the box client side without need to compile install Pikchr
itself

## Demo

![demo](https://user-images.githubusercontent.com/%name%/.gif)

``` pikchr 
	
	box "What a we going to do today?" fit 
	arrow
	box "The same thing we do everyday" "To take over the World!" fit
	
```

## Installation

Because pikchr.c precompiled with emcc installing this plugin allows user to
markup diagrams directly from client without installing compiling pikchr
itself.  This makes plugin embeddable usable "out of the box" "client-side"

- Ensure Safe mode is **off** 
- Settings > Community plugins > Turn On Community Plugis
- Click Browse community plugins
- Search for "Adamantine Pick"
- Click Install

Manually installing
- Copy over `main.js`, `manifest.json`, `styles.css` to your vault 
    `VaultFolder/.obsidian/plugins/obsidian-adamantine-pick/`


## Pikchr Documentation

Manual(https://pikchr.org/home/doc/trunk/doc/userman.md)

## How to compile
    Install emcc
    Clone this repo

    emsdk activate
    npm install
    npm run pikchr
    npm run build 

## Note
Experimental bloated ugly wrapper but possibility run it entirely in 
js enviroment outweights security drawbacks
