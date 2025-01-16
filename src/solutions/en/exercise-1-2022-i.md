###### $\\text{Inverse of ln(x) from examenblad.nl (2022-I)}$

<div class="py-4 flex gap-2 font-bold">

###### **3p**
1) Prove this statement.

</div>

To prove that $f_p(x)$ and $g_p(x)$ are inverses:

- For $f_p(x) = \ln(px)$, its inverse must satisfy $y = \ln(px)$, which is equivalent to $x = e^{y/p}$. This matches the definition of $g_p(x) = e^{x/p}$.  
- Similarly, for $g_p(x) = e^{x/p}$, its inverse must satisfy $y = e^{x/p}$, which is equivalent to $x = \ln(py)$. This matches the definition of $f_p(x) = \ln(px)$.
- Therefore, $f_p(x)$ and $g_p(x)$ are inverses.

Alternatively, you can verify the inverse relationship by composing the functions:  
- $(g_p \\circ f_p)(x) = g_p(f_p(x)) = e^{(\ln(px))/p} = x$  
- $(f_p \\circ g_p)(x) = f_p(g_p(x)) = \ln(p \\cdot e^{x/p}) = x$

<div class="py-4 pt-12 flex gap-2 font-bold">

###### **5p** 
2) Calculate the area of $\\text{V}$, giving your final answer to two decimal places.

</div>

1. Determine the intersection points of $f_{-1}(x)$ and $g_{-1}(x)$:
   - Solve $\ln(-x) = -e^{x}$ for $x$ to find $x \\approx 0.567$.

2. Calculate the area using integrals:
   - $\\text{Area} = \\int_{0}^{0.567} -\ln(x) \\, dx + \\int_{0}^{0.567} e^{x} \\, dx$
   - This evaluates to $\\text{Area} \\approx 0.54$.

<div class="py-4 pt-12 flex gap-2 font-bold">

###### **4p**
3) Calculate the exact value of $p$ for which the line $y = x$ is the common tangent.

</div>

1. The derivative of $f_p(x)$ is $f_p'(x) = 1/x$. The derivative of $g_p(x)$ is $g_p'(x) = 1/p \\cdot e^{x/p}$.
2. Equate $f_p'(x)$ and $g_p'(x)$:
   - Solve $\\dfrac{1}{x} = \\dfrac{1}{p} \\cdot e^{x/p}$ and $f_p(x) = g_p(x)$ simultaneously.
   - The solution gives $p = e$.