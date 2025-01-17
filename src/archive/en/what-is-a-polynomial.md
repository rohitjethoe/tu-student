###### **1.3.1 Polynomials**

<iframe width="100%" height="300" src="https://www.youtube.com/embed/EDRItJVUrH4?si=c2LnHOf6JuFyNnLu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**Polynomials and Calculators**  
Modern calculators rely on addition and multiplication as their foundational operations. Using these, a large class of functions can be constructed—**polynomial functions**. These are formed by combining a variable \$ x \$ with constants using addition and multiplication.

**Definition of a Polynomial**  
A polynomial function is defined by an expression called a polynomial. For example:  
$$p(x) = 2x^5 - 12x + 3 + \\frac{1}{2}x$$ 

By expanding and simplifying, this expression can be written in its **standard form**, which arranges terms as:  

$$a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0$$
Here:

- \$ n \$ is the degree (highest power of \$ x \$ in standard form).
- \$ a_n, a_{n-1}, \\dots \$ are coefficients real numbers, possibly negative or fractional.  

**Steps to Simplify a Polynomial**  
1. Expand products by distributing terms.  
2. Combine terms with the same power of \$ x \$.  
3. Order terms from highest to lowest power of \$ x \$.  

**Importance of the Degree**  
The degree of a polynomial affects its behavior:  
- As \$ x \\to \\infty \$ or \$ x \\to -\\infty \$, the polynomial approximates the behavior of its highest-degree term \$ a_n x^n \$.  
- For example, \$ p(x) = 2x^3 + 8x^2 - 13x \$ behaves like \$ 2x^3 \$ for large \$ |x| \$.  

**Calculators and Non-Polynomial Functions**  
While calculators can efficiently evaluate polynomials due to their reliance on addition and multiplication, they approximate functions like \$ \\sin(x) \$, \$ \\cos(x) \$, or \$ \\ln(x) \$ using polynomials (via methods like Taylor series). This demonstrates the versatility of polynomials in approximating other mathematical functions.

The video concludes with a teaser for understanding how polynomial degree relates to function behavior and the approximation of more complex functions.

###### **1.3.2 Graphs of Polynomial Functions**

<iframe width="100%" height="300" src="https://www.youtube.com/embed/H5A-0uoLCMg?si=SNvzHnWcw2dVrlhn&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<span class="text-xs">Illustration: "Constant Functions" by [Lfahberg](https://commons.wikimedia.org/wiki/User:Lfahlberg), used under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/deed.en)</span>
<img class="small pl-4 pt-4 pb-4" width="150" src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Wiki_constant_function_175_200.png" />  

1. **Degree 0 (Constant Functions):**
   - Form: \$ f(x) = a \\cdot x^0 \$ (or \$ f(x) = a \$).
   - Graph: Horizontal line.

<span class="text-xs">Illustration: "Linear Functions"</span>
<img class="small pl-4 pt-4 pb-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Linear_Function_Graph.svg/1920px-Linear_Function_Graph.svg.png" />

2. **Degree 1 (Linear Functions):**
   - Form: \$ f(x) = ax + b \$, where \$ a \\neq 0 \$.
   - Graph: Straight line.
     - \$ a \$: Slope (steepness).
     - \$ b \$: \$ y \$-intercept.
   - Example: \$ f(x) = -\\frac{1}{2}x + 2 \$.

<span class="text-xs">Illustration: "Quadratic Functions"</span>
<img class="small pl-4 pt-4 pb-4" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Polynomialdeg2.svg" />

3. **Degree 2 (Quadratic Functions):**
   - Form: \$ f(x) = ax^2 + bx + c \$.
   - Graph: Parabola with:
     - Vertex: \$ x = -\\frac{b}{2a} \$.
     - Symmetry: Vertical line through the vertex.
     - \$ a \$: Determines openness and orientation:
       - \$ a > 0 \$: Opens upward.
       - \$ a < 0 \$: Opens downward.
       - Smaller \$ |a| \$: Wider parabola.
     - \$ c \$: \$ y \$-intercept.
   - Example: \$ f(x) = \\frac{1}{2}x^2 - 3x + \\frac{5}{2} \$.

4. **Other Quadratic Forms:**
   - **Factorized Form:** \$ f(x) = a(x-p)(x-q) \$.
     - \$ p \$ and \$ q \$: \$ x \$-intercepts.

<span class="text-xs">Illustration: "Factorized Form"</span>

<img class="small pl-4 pt-4 pb-4" src="/assets/factorized-form.png" />
  
   - **Complete Square Form:** \$ f(x) = a(x-r)^2 + s \$.
     - Vertex: \$ (r, s) \$.

<span class="text-xs">Illustration: "Complete Square Form"</span>

<img class="small pl-4 pt-4 pb-4" src="/assets/complete-square-form.png" />


5. **Higher-Degree Polynomials:**
   - General Form: \$ f(x) = a_nx^n + a_{n-1}x^{n-1} + \\dots + a_0 \$.
   - Complexity increases with degree:
     - Degree \$ n \$: At most \$ n \$ \$ x \$-intercepts.
     - Higher degree: More “wobbly” graphs.