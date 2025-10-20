Three Body Problem
==================

[![Sayan Sarkar](https://miro.medium.com/v2/resize:fill:64:64/1*ckonRVccCJQthJrZ8fZFvw@2x.jpeg)](https://medium.com/?source=post_page---byline--b6731242116e---------------------------------------)

[Sayan Sarkar](https://medium.com/?source=post_page---byline--b6731242116e---------------------------------------)

9 min read

·

Mar 29, 2024

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Fb6731242116e&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fthree-body-problem-b6731242116e&user=Sayan+Sarkar&userId=33445fab81c5&source=---header_actions--b6731242116e---------------------clap_footer------------------)

--

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Fb6731242116e&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fthree-body-problem-b6731242116e&source=---header_actions--b6731242116e---------------------bookmark_footer------------------)

Listen

Share

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GsRpoWEPW4ke82i56YibVA.jpeg)

I just finished watching Netflix’s new show: “3 Body Problem,” based on the book series by Cixin Liu. As for season one, I think it was good enough. Being a huge Sci-fi fan, I started reading the source material, and the book is really good. I haven’t finished reading the book yet, but the point of today’s blog is just to explore the mentioned problem in the show and the book -> the Three-Body Problem.

The three-body problem refers to the mathematical challenge of predicting the motion of three bodies (typically celestial objects like stars, planets, or moons) that are interacting with each other through gravitational forces. While the interactions between two bodies can be accurately described using Newton’s laws of motion and gravitation, the addition of a third body introduces complexities that defy straightforward analytical solutions.

The origins of the three-body problem can be traced back to the work of Isaac Newton in the 17th century. Newton’s law of universal gravitation provided a framework for understanding how two objects attract each other based on their masses and the distance between them. This law revolutionized physics and astronomy, enabling scientists to accurately predict the orbits of planets and celestial bodies. However, when Newton attempted to extend his laws to systems involving three or more bodies, he encountered significant challenges. The gravitational interactions between multiple bodies create a dynamic and intricate system where each body’s motion affects and is affected by the others, leading to complex and unpredictable trajectories.

Mathematical Complexity
-----------------------

The essence of the three-body problem lies in its mathematical complexity. Unlike the two-body problem, which can be solved analytically using Kepler’s laws and Newtonian mechanics, the three-body problem defies such straightforward solutions. This complexity arises from the nonlinearity of gravitational forces and the interdependence of the bodies’ motions.

In mathematical terms, the three-body problem involves solving a set of coupled ordinary differential equations (ODEs) that describe the positions and velocities of each body over time. These equations form a system that lacks closed-form solutions, meaning there is no simple, direct formula to predict the bodies’ future positions with absolute certainty.

Newton’s Laws of Motion and Gravitation
---------------------------------------

Newton’s laws form the foundation of classical mechanics and are crucial for understanding the dynamics of the three-body problem. Let’s consider three bodies labeled as _m_1​,_m_2​, and _m_3​, with position vectors **r**1​,**r**2​, and **r**3​ respectively. The gravitational force between two bodies _i_ and _j_ is given by Newton’s law of gravitation:

![captionless image](https://miro.medium.com/v2/resize:fit:312/format:webp/1*Y1PJ2Zkxs8OHHmicwb5rvg.png)

here,

![captionless image](https://miro.medium.com/v2/resize:fit:196/format:webp/1*y8dRwOWzxLShu6qfAOPUkQ.png)

unit vector pointing from body _i_ to body _j_, and _G_ is the gravitational constant.

Using Newton’s second law (**F**=_m_**a**), we can express the equations of motion for each body as:

![captionless image](https://miro.medium.com/v2/resize:fit:434/format:webp/1*63sJw2cbbK5ap40i5wEFqw.png)

These equations form a system of coupled nonlinear differential equations, representing the gravitational interactions between the bodies.

Let’s delve into why Newton’s laws alone cannot be used to solve the three-body problem efficiently.

1.  **Complex Interactions:** In a two-body system governed by Newton’s laws, such as the Earth orbiting the Sun, the interactions are relatively simple because there are only two gravitational forces to consider. However, in a three-body system, each body interacts gravitationally with the other two bodies simultaneously. This leads to a complex interplay of forces that cannot be easily resolved using direct application of Newton’s laws.
2.  **Nonlinear Nature of Gravitational Forces:** Newton’s law of gravitation states that the gravitational force between two bodies is directly proportional to the product of their masses and inversely proportional to the square of the distance between them. This nonlinear relationship means that as the distances and masses vary among the three bodies in a system, the gravitational forces also change nonlinearly, complicating the dynamics of the system.
3.  **Lack of Closed-Form Solutions:** The equations of motion derived from Newton’s laws for a three-body system result in a set of coupled ordinary differential equations (ODEs). Unlike the two-body problem, where analytical solutions such as elliptical orbits can be obtained using Kepler’s laws, the three-body problem lacks closed-form solutions for general initial conditions. This means there is no simple, direct formula to predict the precise motion of the bodies over time.

Perturbation Methods and Approximations
---------------------------------------

Perturbation methods play a crucial role in tackling the complexities of the three-body problem. In situations where exact solutions are elusive, perturbation theory offers a systematic approach to approximate solutions by introducing small perturbations to an otherwise solvable system.

Let’s denote the masses of the bodies as _M_,_m_1​, and _m_2​, with positions **r**0​,**r**1​, and **r**2​ respectively. We assume that _m_2​ has a negligible mass compared to _M_ and _m_1​, allowing us to treat its motion as a perturbation to the two-body system of _M_ and _m_1​.

The Hamiltonian _H_ for the perturbed system can be written as:

![captionless image](https://miro.medium.com/v2/resize:fit:370/format:webp/1*P-hlbdsZJK76R35Ib2OQeA.png)

Where _λ_ is a small parameter representing the strength of the perturbation, and _H_0​ is the Hamiltonian for the unperturbed two-body system.

Perturbation methods and approximations are valuable tools in physics and mathematics, allowing us to simplify complex problems by introducing small corrections or perturbations to known solutions. However, when it comes to the three-body problem, these methods face several challenges and limitations:

1.  **Limited Applicability:** Perturbation methods are most effective when the perturbations are small compared to the dominant forces or dynamics of the system. In the three-body problem, especially when the masses and distances between bodies are comparable, the gravitational interactions can be strong, making perturbations significant and challenging to accurately model.
2.  **Convergence Issues:** Perturbation series often involve expanding solutions in powers of a small parameter (e.g., the strength of the perturbation). However, these series may not always converge, especially for highly nonlinear systems like the three-body problem. This can lead to unreliable results and inaccuracies in predictions.
3.  **Secular Effects:** In the context of celestial mechanics, perturbations can lead to long-term changes in orbital parameters known as secular effects. While perturbation methods can provide insights into short-term behaviors, capturing the complex interactions over extended periods can be difficult and may require higher-order corrections that are computationally intensive.
4.  **Resonances and Stability:** Three-body systems can exhibit resonant behaviors where the gravitational interactions lead to specific orbital configurations that repeat periodically. Perturbation methods may struggle to accurately capture these resonances and assess the stability of such configurations over extended periods.
5.  **Complexity of Higher Orders:** As higher-order perturbations are considered to improve accuracy, the complexity of calculations increases significantly. This complexity can make it challenging to derive and manage the numerous terms involved in higher-order perturbation expansions

Lagrange’s Equations and Reduced Mass
-------------------------------------

Lagrange’s equations provide a powerful framework for describing the motion of particles in a system, taking into account potential and kinetic energies. For the three-body problem, we can express Lagrange’s equations in terms of generalized coordinates _qi_​ and their conjugate momenta _pi_​.

The Lagrangian _L_ of a system is defined as the difference between kinetic energy _T_ and potential energy _V_:

![captionless image](https://miro.medium.com/v2/resize:fit:292/format:webp/1*oTN_YxFaOJqMZ6UmZESXaw.png)

The generalized coordinates and momenta are related through the Lagrangian by:

![captionless image](https://miro.medium.com/v2/resize:fit:286/format:webp/1*d9NKCrkupgqmk7aytIPXJQ.png)

By applying Lagrange’s equations, we can derive the equations of motion for the three-body system in terms of the generalized coordinates.

Additionally, the concept of reduced mass _μij_​ is often employed to simplify the mathematical treatment of multi-body systems. The reduced mass of two bodies _i_ and _j_ is defined as:

![captionless image](https://miro.medium.com/v2/resize:fit:278/format:webp/1*YTlJPXPoLlf4NORLwyCX6g.png)

Lagrange’s equations and the concept of reduced mass are powerful tools in classical mechanics and celestial dynamics. However, when it comes to solving the three-body problem, they face several challenges and limitations:

1.  **Complexity of the Equations:** The three-body problem involves solving a system of coupled nonlinear differential equations. While Lagrange’s equations provide a systematic approach to formulating the equations of motion in generalized coordinates, the resulting differential equations are often complex and challenging to solve analytically, especially for general initial conditions.
2.  **Non-integrability:** In many cases, the equations derived from Lagrange’s equations for the three-body problem lack closed-form solutions. This non-integrability means that there is no simple, direct formula to predict the precise motion of the bodies over time, requiring numerical methods or approximations for solutions.
3.  **Limited Applicability of Reduced Mass:** The concept of reduced mass is useful for simplifying two-body problems by treating the system as if it were a single body with a combined mass. However, in the three-body problem, the interactions between all three bodies are intricate, and reducing the system to a two-body problem using reduced mass may oversimplify the dynamics and lead to inaccurate predictions, especially for scenarios with significant gravitational interactions among all bodies.
4.  **Resonances and Stability:** Lagrange’s equations and reduced mass may not fully capture resonant behaviours and stability analysis in three-body systems. Resonances, where specific orbital configurations repeat periodically due to gravitational interactions, require more advanced techniques and simulations to analyze accurately.

Chaotic Dynamics
----------------

One of the most intriguing aspects of the three-body problem is its propensity for chaotic behavior. Chaos theory, which gained prominence in the 20th century, studies systems that are highly sensitive to initial conditions, leading to unpredictable outcomes over time. In the context of the three-body problem, even small variations in the initial positions or velocities of the bodies can result in vastly different trajectories.

This sensitivity to initial conditions is often illustrated using the famous example of the “three-body problem with equal masses,” where three identical masses interact gravitationally. Despite the symmetry of this scenario, the system exhibits chaotic behaviour, with trajectories that appear random and non-repeating over time.

### So No Solution?

The absence of a solution to the three-body problem means that scientists cannot predict what happens during a close interaction between a binary system (formed of two stars that orbit each other like Earth and the Sun) and a third star, except by simulating it on a computer, and following the evolution step-by-step. Such simulations show that when such an interaction occurs, it proceeds in two phases: first, a chaotic phase when all three bodies pull on each other violently, until one star is ejected far from the other two, which settle down to an ellipse. If the third star is on a bound orbit, it eventually comes back down towards the binary, whereupon the first phase ensues, once again. This triple dance ends when, in the second phase, one of the star escapes on an un-bound orbit, never to return.

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*h2XCHXIHUwO7afGnHFB6VQ.jpeg)

In a paper recently published in _Physical Review X_, Ph.D. student Yonadav Barry Ginat and Professor Hagai Perets of the Technion-Israel Institute of Technology used this randomness to provide a statistical solution to the entire two-phase process. Instead of predicting the actual outcome, they calculated the _probability_ of any given outcome of each phase-1 interaction.

While chaos implies that a complete solution is impossible, its random nature allows us to calculate the probability of a triple interaction ending in a specific way, rather than another. The entire series of close approaches could be modeled using a type of mathematics known as the theory of random walks, often referred to as the “drunkard’s walk.” This term originates from the concept of how a drunkard might walk, essentially assuming a random process — with each step, the drunk doesn’t realize their location and takes the next step in a random direction. Similarly, the triple system behaves in a similar fashion.

After each close encounter, one of the stars is ejected randomly (while still conserving the overall energy and momentum of the system). One can envision the series of close encounters as akin to a drunkard’s walk. Just as a drunkard takes random steps and may backtrack, a star is ejected randomly, returns, and then another (or the same) star is ejected in a different random direction (similar to another step taken by the drunk). This cycle continues until a star is completely ejected, analogous to the drunkard falling into a ditch.

Reference: “Analytical, Statistical Approximate Solution of Dissipative and Nondissipative Binary-Single Stellar Encounters” by Yonadav Barry Ginat and Hagai B. Perets, 23 July 2021, _Physical Review X_.
[DOI: 10.1103/PhysRevX.11.031020](https://doi.org/10.1103/PhysRevX.11.031020)