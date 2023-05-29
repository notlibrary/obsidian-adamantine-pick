---
tag: adamantine
--- 
Sample resistor color code calculator cheat sheet adamantine diagram note
Install [Adamantine Pick](https://github.com/notlibrary/obsidian-adamantine-pick) plugin and view this note through Obsidian

```pikchr
define resistor { [ UP: line 1.0 thick
down
move 
left 
move 1.0
right
line 1.0 thick 
B: spline thick from previous.e go right .2 then 0.2 heading 130 then right .3 
C: spline thick from UP.e go right .2 then 0.2 heading 40 then right .3
arc thick from 4th vertex of B to 4th vertex of C
D: spline thick from UP.w go left .2 then 0.2 heading -40 then left .3
E: spline thick from last line.w go left .2 then 0.2 heading -130 then left .3
arc thick from 4th vertex of D to 4th vertex of E
]
}

MANUAL: [
BODY: resistor
right 
line 0.8 from BODY.e "3.21kΩ" mono above "1% 50ppm/K" mono below
left
line 0.8 from BODY.w "6 bands" mono above

dot at 1px below BODY.c

B1: box thin width 0.15 height 0.77 fill orange at 1 left of BODY.c 
B2: box thin width 0.15 height 0.5 fill red at 0.6 left of last dot
B3: box thin width 0.15 height 0.5 fill brown at 0.3 right of last box
B4: box thin width 0.15 height 0.5 fill brown at 0.3 right of last box
B5: box thin width 0.15 height 0.5 fill brown at .6 right of last dot
GAP: text "GAP" mono at 0.3 right of last dot
B6: box thin width 0.15 height 0.77 fill red at 1 right of BODY.c

arrow <- from B1.s down 
text "Digit 1"
arrow <- from B2.s down 
text "2"
arrow <- from B3.s down 
text "3" "(5,6+ bands)"
arrow <- from B4.s down 
text "Multiply"
arrow <- from B5.s down 
text "Tolerance(%)"
arrow <- from B6.s down 
text "Temp Coeff(ppm/K)"
arrow from GAP.e to B5 
arrow from GAP.w to B4 
]
Border: box thin width MANUAL.width+0.5in height MANUAL.height+0.5in at MANUAL.center
Caption: text "GAP between Multiply and Tolerance indicates reading direction" italic with .n at 0.1cm below MANUAL.s 
Mnemonic: text "Bad Beer Rots Our Young Guts But Vodka Goes Well Get Some Now!" italic with .s at 0.1cm above MANUAL.n
right
arrow 0.3 -> from 0.3 left of Caption.e 

```

```pikchr
define v { box ht 0.2 }
box "Mnemonic"
box "Color"
box "Signifcant" "Digits"
box "Multiply"
box "Tolerance"
box "Temp Coeff" "(ppm/K)"

move down from first box.n 
v "Bad" ; right 
v "Black" 
v "0 0 0"
v "x 1"
v 
v "250 (U)"

move down 0.2 from 7th box.n 
v "Beer" ; right 
v "Brown" fill brown
v "1 1 1"
v "x 10"
v "1% (F)" 
v "100 (S)"

move down 0.2 from 13th box.n 
v "Rots" ; right 
v "Red" fill red
v "2 2 2"
v "x 100"
v "2% (G)" 
v "50 (R)"

move down 0.2 from 19th box.n 
v "Our" ; right 
v "Orange" fill orange
v "3 3 3"
v "x 1K"
v "0.05% (W)" 
v "15 (P)"

move down 0.2 from 25th box.n 
v "Young" ; right 
v "Yellow" fill yellow
v "4 4 4"
v "x 10K"
v "0.02% (P)" 
v "25 (Q)"

move down 0.2 from 31th box.n 
v "Guts" ; right 
v "Green" fill green
v "5 5 5"
v "x 100K"
v "0.5% (D)" 
v "20 (Z)"

move down 0.2 from 37th box.n 
v "But" ; right 
v "Blue" fill blue
v "6 6 6"
v "x 1M"
v "0.25% (C)" 
v "10 (Z)"

move down 0.2 from 43th box.n 
v "Vodka" ; right 
v "Vilolet" fill violet
v "7 7 7"
v "x 10M"
v "0.1% (B)" 
v "5 (M)"

move down 0.2 from 49th box.n 
v "Goes" ; right 
v "Grey" fill darkgrey
v "8 8 8"
v "x 100M"
v "0.01% (L)" 
v "1 (K)"


move down 0.2 from 55th box.n 
v "Well" ; right 
v "White" fill grey
v "9 9 9"
v "x 1G"
v  
v

move down 0.2 from 61th box.n 
v "Get" ; right 
v "Gold" fill gold
v invis "3rd digit"
v "x 0.1"
v "5% (J)" 
v

move down 0.2 from 67th box.n 
v "Some" ; right 
v "Silver" fill silver
v invis "5,6 bands"
v "x 0.01"
v "10% (K)" 
v

move down 0.2 from 73th box.n 
v "Now!" ; right 
v "None"
BORDER: v invis "only"
v
v "20% (M)" 
v
line from BORDER.sw to BORDER.se
```
#adamantine