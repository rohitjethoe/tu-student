###### **Arithmetic sequences and series**

<span class="gray">**Arithmetic sequence**</span> = Growth pattern that is represented by a **linear relationship**.

- Difference between two consecutive numbers is constant
- <span class="gray">Common difference</span>, denoted by $d$
- Also referred to as *arithmetic progression*.

Consider the growth of arithmetic sequence with first term $u_1$ and common difference $d$:

- First term: $u_1$
- Second term: $u_2 = u_1 + d$
- Third term: $u_3 = u_2 + d = u_1 + 2d$
- Fourth term: $u_4 = u_3 + d = u_1 + 3d$
- **Leading to the general term** $u_n = u_1 + (n - 1)d$

> An arithmetic sequence with first term $u_1$ and common difference $d$ has **general term** $u_n = u_1 + (n-1)d$.

<br />

###### **Geometric sequences and series**

<span class="gray">**Geometric sequence**</span> = Growth pattern that is represented by a **exponential relationship**.

- Ratio between two consecutive numbers is constant
- <span class="gray">Common ratio</span>, denoted by $r$
- Also referred to as *geometric progression*.

Consider the growth of a geometric sequence with first term $u_1$ and common ratio $r$

- First term: $u_1$
- Second term: $u_2 = u_1 × r$
- Third term: $u_3 = u_2 r = u_1 × r^2$
- Four term: $u_4 = u_3 r = u_1 × r^3$

> A geometric sequence with first term $u_1$ and common ratio $r$ has **general term** $u_n = u_1 * r^{n -1} \\text{ with } r \\neq 1, 0, -1 \\text{ and } u_1 \\neq 0$

> The **recursive equation** for a geometric sequence is $u_n = u_{n-1} \\cdot r$

<br />

###### **Curiosities in geometric patterns**

- What happens if you have a sequence with first term $u_1$ and common ratio $1$?
    <ul class="circle">
        <li>The sequence is just made up of constant terms $u_1$, which is called a <span class="gray">uniform sequence</span></li>
    </ul>

- What if the common ratio is 0?
    <ul class="circle">
        <li>A sequence with first term $u_1$ and all the other terms are $0$</li>
    </ul>

- What if the common ratio is -1?
    <ul class="circle">
        <li>Known as a <span class="gray">oscillating sequence</span>: $u_1, -u_1, u_1, -u_1, ...$</li>
    </ul>

<br />

###### **Grandi's series**

The series $S = 1 - 1 + 1 - 1 + 1 - 1 + ...$ is known as <span class="gray">Grandi's series</span>.

Possibly the most intuitive way of finding this sum is by grouping the terms into pairs:

$$ S = (1 - 1) + (1 - 1) + (1 - 1) + ... = 0 + 0 + 0 + ... = 0$$

Or if we pair terms starting from the second term:

$$ S = 1 + (-1 + 1) + (-1 + 1) + ... = 1 + 0 + 0 + ... = 1 $$

Yet another result is obtained from a different perspective:

$$ S = 1 - (1 - 1 + 1 - 1 + 1 - 1 + ...) $$

$$ = 1 - S $$

$$ \\Rightarrow 2S = 1 $$

$$ \\Rightarrow S = \\dfrac{1}{2} $$

This paradox arises because we <span class="gray">stumbled on the concept of infinity</span>. If the number of terms were finite, the result would be 0 for even number of terms and 1 if the number of terms were odd, but an infinite sum never ends.

<br />

###### **Sum of a geometric sequence**

The sum of a **finite geometric series** is given by:

$$ S_n = \\dfrac{u_1(1-r^n)}{1 -r} \\text{, where r} \\neq 1$$

Where $n$ is *the number of terms*, $u_1$ is *the first term* and $r$ is *the common ratio*.