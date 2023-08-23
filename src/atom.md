---
tag: adamantine
---
Adamantine diagram note dealing with note atomicity concepts by exposing the ancient example
Atomicity means ability to persist with it's own minimal content and provide some elementary configuration outside(not strictly in chemical physical material sense perhaps in informational sense)
  
The example of repickable absolute reliable 4000 years old atomical note is an ancient prime 
number theorem proof "Euclid's Theorem" as follows:

It shows for any finite list of $N$ primes $p_1...p_i$ at least one additional prime not in the list exists
$$ q = \prod_{i=1}^N{} p_i + 1 $$
1. If $q$ is prime, then there is at least one more next prime that is not in the list, namely, the $q$ itself 
2. If $q$ is not prime...

Then some prime factor $p_x$ divides $q$. If this factor $p_x$ were in our list
$$p_1...p_i$$
then it would divide $P$ 
$$P = \prod_{i=1}^N{} p_i$$ 
but $p_x$ also divides $P + 1= q$, as just stated
If $p_x$ divides $P$ and also $q$, then $p_x$ must also divide the difference of the two numbers which is: 
$$P-q = (P + 1) - P = 1$$ 
Since no prime divides $1$ $p_x$ cannot be in the list

This means that at least one more prime exists *beyond* those in the list
```pikchr
THEOREM: [ oval "p1"  mono
text "*" mono
oval "p2"  mono
text "*"  mono
oval "p3"  mono
text "+"  mono

box "1"  mono
]

Border: box thin width THEOREM.width+0.5in height THEOREM.height+0.5in at THEOREM.center
Caption: text "Euclid's theorem" mono with .n at 0.1cm below THEOREM.s

```

Note it's complete unsability zero utility in daily life
However large primes are useful in cryptography key exchange algorithms

#adamantine