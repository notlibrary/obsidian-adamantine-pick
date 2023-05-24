Sample crafted adamantine diagram note to test the theory on the toolstack affair
Install [Adamantine Pick](https://github.com/notlibrary/obsidian-adamantine-pick) plugin and view this note through Obsidian

Memo twice integrating book analog circuit "double integrator" with single operational
amplifier packed in ~4kb single HDD block text note fully graphicaly renderable interactive
portable model transferable over the internet with ~zero costs  

>Although not the best practice because "Digital? Every Idiot Can Count to One"(c) 
>I pushed my lame memo test OPamp circuit diagram note into separate `src/opamp.md`

``` pikchr
#pikchr script by notlibrary
#https://github.com/notlibrary/obsidian-adamantine-pick
define capacitor { [ 
	up
	line 0.3cm
	down
	move 0.3cm
	line 0.3cm
	right 
	move 0.2cm
	up
	line 0.6cm
	down
	move 0.3cm
	right ]
}

define capacitor_rot { [ 
	left
	line 0.3cm
	right
	move 0.3cm
	line 0.3cm
	down 
	move 0.2cm
	left
	line 0.6cm
	right
	move 0.3cm
	down ]
}

define ground { dot
left
line 0.3cm from last dot 
right
line 0.3cm from last dot 
left
line 0.2cm from 0.2cm below last dot 
right
line 0.2cm from 0.2cm below last dot 
left
line 0.1cm from 0.4cm below last dot 
right
line 0.1cm from 0.4cm below last dot
}

AMP: [

BODY: [ line thin go south then heading 60 close ] 
up
line 0.4cm from 0.31cm below BODY.n 
dot
down
line 0.4cm from 0.31cm above BODY.s  
dot

text "-" mono ljust at 0.4cm above BODY.w  
text "+" mono ljust at 0.4cm below BODY.w 

left
FB: line from 0.4cm above BODY.w  
line from 0.4cm below BODY.w

down
GND1: line  
ground 

up
FEEDBACK: line from FB.w
ANCHOR: dot
right
line

C1: capacitor

line
GND2: dot 
line

C2: capacitor

line
line 0.1cm
dot
down
line from 2nd previous line
line 0.4cm
line to BODY.e

down
line 0.2cm from GND2
R1: box width 0.2cm height 0.6cm 
line 0.2cm
ground

left
line 0.3cm from ANCHOR
R2: box height 0.2cm width 0.6cm
line 0.3cm
ANCHOR2: dot
line 0.3cm
R3: box height 0.2cm width 0.6cm
line 0.3cm
dot

down 
line from ANCHOR2
C3: capacitor_rot
line
ANCHOR3: dot
left
line 1.2cm 
INPUTE: dot
right
line from ANCHOR3 to GND1
dot
line 2.0
line 0.5cm 
dot

text "E0" at 0.5 above last dot
text "E1" at 0.5 above INPUTE
text "C1" at 0.2 above C1
text "C1" at 0.2 above C2
text "C2" at 0.2 right of C3
text "R1" at 0.15 right of R1
text "R2" at 0.2 above R2
text "R2" at 0.2 above R3
]

Border: box thin width AMP.width+0.5in height AMP.height+0.5in at AMP.center
Caption: text "Double integrator OPamp circuit by @notlibrary" mono with .n at 0.1cm below AMP.s

```
$$ C_1 = \frac{C_2}{2} \quad R_1 = \frac{R_2}{2} $$
$$ E_0 = \frac{-4}{(R_1C_1)^2} \iint{E_1}{\mathrm{d}t\mathrm{d}t} $$
Note it can be decoded entirely offline on the 100$ laptop 20$ SBC or even 5$ virtual 
server in literally any part of the world unbelievable structural efficency

The following open source toolstack contributors made it happen:  
[Emscripten](https://emscripten.org/) [Typescript](https://www.typescriptlang.org/)  [Electron](https://www.electronjs.org/) [Obsidian](https://obsidian.md/) [Markdown](https://spec.commonmark.org/) [MathJax](https://www.mathjax.org/)  [Pikchr](https://pikchr.org)  