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
To much acronyms to fit everything in 4KB *iret*
#adamantine 