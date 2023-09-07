---
tag: adamantine
---
Exposes ancient Pi definition by calculating own code area in fp stack
```pikchr
FORTH: [
	box ht 0.4 "lookup" "word" 
	arrow 0.3
	box ht 0.4 "compile" "address" 
	arrow 0.3
	NO: box ht 0.4 "immediate if" "execute"
	arrow 0.3 
	box ht 0.4 "compile" "literal" 
	arrow 0.3
	box ht 0.4 "error" 

]
```
```forth
: A Fswap ; : B Fdup ; : Y Ftuck B F+ A F/ B F* ; : O 1.0e F+ ; : x A O A O ;
 
                            : PIPI 0.0e B
                          x x x x x x x x x x
                      x x x O O O O O O O O x x x
                  x x O O O O O O O O O O O O O x x
                x O O O O O O O O O O O O O O O O O x
              x O O O O O O O O O O O O O O O O O O O x
            x O O O O O O O O O O O O O O O O O O O O O x
          x O O O O O O O O O O O O O O O O O O O O O O O x
        x O O O O O O O O O O O O O O O O O O O O O O O O O x
      x x O O O O O O O O O O O O O O O O O O O O O O O O O x x
      x O O O O O O O O O O O O O O O O O O O O O O O O O O O x
    x x O O O O O O O O O O O O O O O O O O O O O O O O O O O x x
    x O O O O O O O O O O O O O O O O O O O O O O O O O O O O O x
    x O O O O O O O O O O O O O O O O O O O O O O O O O O O O O x
    x O O O O O O O O O O O O O O O O O O O O O O O O O O O O O x
    x O O O O O O O O O O O O O O O O O O O O O O O O O O O O O x
    x O O O O O O O O O O O O O O O O O O O O O O O O O O O O O x
    x O O O O O O O O O O O O O O O O O O O O O O O O O O O O O x
    x O O O O O O O O O O O O O O O O O O O O O O O O O O O O O x
    x x O O O O O O O O O O O O O O O O O O O O O O O O O O O x x
      x O O O O O O O O O O O O O O O O O O O O O O O O O O O x
      x O O O O O O O O O O O O O O O O O O O O O O O O O O O x
        x O O O O O O O O O O O O O O O O O O O O O O O O O x 
        x x O O O O O O O O O O O O O O O O O O O O O O O O x
          x O O O O O O O O O O O O O O O O O O O O O O O x
            x O O O O O O O O O O O O O O O O O O O O O x
            x x O O O O O O O O O O O O O O O O O O O x x
                x O O O O O O O O O O O O O O O O O x
                  x x O O O O O O O O O O O O O x x
                      x x x O O O O O O O x x x
                          x x x x x x x x x
                            Y F/ F. ; PIPI
```
[Buy me a coffee test run in replit](https://replit.com/@notlibrary/Pi) ...adamantine diagram note and so forth

#adamantine 
