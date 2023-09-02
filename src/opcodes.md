---
tag: adamantine
---
x86 instruction opcode encoding table adamantine diagram note
```pikchr
ENCODER: [
box "Prefix"  
box "OPcode" 
box "AddrMode" "mod/reg/rm"  
box "SIB byte"  
box "Displacement" 
box "Immediate" "data" 
move down from first box.n
box "0 - 4"
right
box "1 - 3"
box "1"
box "0-1"
box "0/1/2/4"
box "0/1/2/4"
move down from 7th box.n
box "BIT"
right
OPCODE: box "|OOOOOODL|" mono
box "|MMRRRRRR|" mono "|OOEEE///|" mono "|DDGGGMMM|" mono
SIB: box "|SSIIIBBB|" mono
box ""
box ""

arrow <- down from OPCODE.s
box "O - main bit" "D - direction" "L - length" fit

arrow <- down from SIB.s
box "S - scale" "I - index" "B - base" fit

]

Border: box thin width ENCODER.width+0.5in height ENCODER.height+0.5in at ENCODER.center
Caption: text "General x86 OP code structure" mono with .n at 0.1cm below ENCODER.s
Caption: text "0x7C00 0xDEADBEEF 0xCAFEBABE" mono with .s at 0.1cm above ENCODER.n

```
GDT IDT MMU MBR GPT ROM BIOS UEFI SSE MMX XOR EAX EAX 
To much acronyms to fit everything in 4KB *iret* time waits for no one I guess

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
#"Banshee" control sequence markdown postprocessor clock example
#Reverse unix shebang imitator works only in obsidian
#?time
```

#adamantine 