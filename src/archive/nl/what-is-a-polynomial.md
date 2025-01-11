<iframe width="100%" height="300" src="https://www.youtube.com/embed/EDRItJVUrH4?si=c2LnHOf6JuFyNnLu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**Polynomen en Rekenmachines**  
Moderne rekenmachines vertrouwen op optellen en vermenigvuldigen als hun fundamentele bewerkingen. Met behulp hiervan kan een grote klasse van functies worden geconstrueerd—**polynoomfuncties**. Deze worden gevormd door een variabele \$ x \$ te combineren met constanten door middel van optellen en vermenigvuldigen.

**Definitie van een Polynoom**  
Een polynoomfunctie wordt gedefinieerd door een uitdrukking die een polynoom wordt genoemd. Bijvoorbeeld:  
$$p(x) = 2x^5 - 12x + 3 + \\frac{1}{2}x$$ 

Door uit te breiden en te vereenvoudigen, kan deze uitdrukking worden geschreven in zijn **standaardvorm**, die termen rangschikt als:  

$$a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0$$
Hierbij:

- \$ n \$ is de graad (hoogste macht van \$ x \$ in standaardvorm).
- \$ a_n, a_{n-1}, \\dots \$ zijn coëfficiënten (reële getallen, mogelijk negatief of fractioneel).  

**Stappen om een Polynoom te Vereenvoudigen**  
1. Breid producten uit door termen te distribueren.  
2. Combineer termen met dezelfde macht van \$ x \$.  
3. Orden termen van hoogste naar laagste macht van \$ x \$.  

**Belang van de Graad**  
De graad van een polynoom beïnvloedt zijn gedrag:  
- Als \$ x \\to \\infty \$ of \$ x \\to -\\infty \$, benadert de polynoom het gedrag van zijn hoogste-graadsterm \$ a_n x^n \$.  
- Bijvoorbeeld, \$ p(x) = 2x^3 + 8x^2 - 13x \$ gedraagt zich als \$ 2x^3 \$ voor grote \$ |x| \$.  

**Rekenmachines en Niet-Polynoomfuncties**  
Hoewel rekenmachines polynomen efficiënt kunnen evalueren vanwege hun afhankelijkheid van optellen en vermenigvuldigen, benaderen ze functies zoals \$ \\sin(x) \$, \$ \\cos(x) \$, of \$ \\ln(x) \$ met behulp van polynomen (via methoden zoals Taylor-reeksen). Dit toont de veelzijdigheid van polynomen in het benaderen van andere wiskundige functies.

De video eindigt met een teaser om te begrijpen hoe de graad van een polynoom gerelateerd is aan het gedrag van de functie en de benadering van complexere functies.

<iframe width="100%" height="300" src="https://www.youtube.com/embed/H5A-0uoLCMg?si=SNvzHnWcw2dVrlhn&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

1. **Graad 0 (Constante Functies):**
    - Vorm: \$ f(x) = a \\cdot x^0 \$ (of \$ f(x) = a \$).
    - Grafiek: Horizontale lijn.

2. **Graad 1 (Lineaire Functies):**
    - Vorm: \$ f(x) = ax + b \$, waarbij \$ a \\neq 0 \$.
    - Grafiek: Rechte lijn.
      - \$ a \$: Hellingshoek.
      - \$ b \$: \$ y \$-asintercept.
    - Voorbeeld: \$ f(x) = -\\frac{1}{2}x + 2 \$.

3. **Graad 2 (Kwadratische Functies):**
    - Vorm: \$ f(x) = ax^2 + bx + c \$.
    - Grafiek: Parabool met:
      - Top: \$ x = -\\frac{b}{2a} \$.
      - Symmetrie: Verticale lijn door de top.
      - \$ a \$: Bepaalt openheid en oriëntatie:
         - \$ a > 0 \$: Opent omhoog.
         - \$ a < 0 \$: Opent omlaag.
         - Kleinere \$ |a| \$: Breedere parabool.
      - \$ c \$: \$ y \$-asintercept.
    - Voorbeeld: \$ f(x) = \\frac{1}{2}x^2 - 3x + \\frac{5}{2} \$.

4. **Andere Kwadratische Vormen:**
    - **Gefactoriseerde Vorm:** \$ f(x) = a(x-p)(x-q) \$.
      - \$ p \$ en \$ q \$: \$ x \$-asintercepten.
    - **Volledig Kwadratische Vorm:** \$ f(x) = a(x-r)^2 + s \$.
      - Top: \$ (r, s) \$.

5. **Hogere Graad Polynomen:**
    - Algemene Vorm: \$ f(x) = a_nx^n + a_{n-1}x^{n-1} + \\dots + a_0 \$.
    - Complexiteit neemt toe met de graad:
      - Graad \$ n \$: Maximaal \$ n \$ \$ x \$-asintercepten.
      - Hogere graad: Meer “hobbelige” grafieken.