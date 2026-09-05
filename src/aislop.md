---
tag: adamantine
---

#adamantine

# ai and the programmer

AI does not kill programming; it moves the scarce skill upward.

The old loop was:

    think -> type -> compile -> debug

The new loop is closer to:

    intent -> prompt -> inspect -> test -> verify

```pikchr
scale = 0.8
A: box "human intent"
B: box "ai generation"
C: box "tests + review"
D: box "software"
A -> B -> C -> D
C -> B "iterate"
D -> A "feedback"
```

The durable programmer is therefore less a typist and more a
**systems editor**: someone who can state constraints, recognize
bad output, design tests, protect boundaries, and make tradeoffs.

AI makes code cheaper. It does not make **judgment** cheap.

## the leverage shift

```pikchr
scale = 0.75
H: box "human" width 1.0
J: box "judgment" width 1.2
M: box "machine" width 1.0
H -> J -> M
M -> J "evidence"
J -> H "decision"
```

Useful rule:

> delegate syntax; retain responsibility.

Good programmers will spend more time on architecture, debugging,
security, interfaces, tests, maintenance, and deciding what should
exist in the first place.

Bad output can now arrive at machine speed. That makes **verification
a programming skill**, not an optional afterthought.

The profession changes from *writing every line* to *owning the
whole loop*.

— op
