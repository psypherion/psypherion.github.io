Statistics For Data-Science/M.L-1
=================================

[![Sayan Sarkar](https://miro.medium.com/v2/resize:fill:64:64/1*ckonRVccCJQthJrZ8fZFvw@2x.jpeg)](https://medium.com/?source=post_page---byline--a12d4a32d0e9---------------------------------------)

[Sayan Sarkar](https://medium.com/?source=post_page---byline--a12d4a32d0e9---------------------------------------)

5 min read

·

Aug 13, 2021

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2Fa12d4a32d0e9&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fstatistics-for-data-science-m-l-1-a12d4a32d0e9&user=Sayan+Sarkar&userId=33445fab81c5&source=---header_actions--a12d4a32d0e9---------------------clap_footer------------------)

--

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Fa12d4a32d0e9&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fstatistics-for-data-science-m-l-1-a12d4a32d0e9&source=---header_actions--a12d4a32d0e9---------------------bookmark_footer------------------)

Listen

Share

![content](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*lLGjc6PuiIYnA8lzksiJdA.png)

(Day-1)[BASICS]
-----------------

Let’s first come to the definition of statistics. What is Statistics?

[**Statistics**](https://en.wikipedia.org/wiki/Statistics) is basically the discipline that concerns the collection, organization, analysis, interpretation & presentation of Data.

Statistics can be divided into two-part.

1**_.Descriptive Statistics_** :
--------------------------------

**a**) Analyzing data, summarizing data, organizing data in the form of **Numbers** & **Graphs.**

**b**)Bar Plot, Histogram, Pie chart, PDF, C.D.F, Normal distribution, etc.

**c**)Measure of **Central tendency —** [_Mean, Median, Mode_]

d)Measure of **Variance-**[_Standard Deviation, Variance]_

**2.Inferential Statistics:**
-----------------------------

**a)**Takes sample from the Data & draws conclusion for entire population

**b)Confidence Interval :** Uses Probability to determine how confident we can be that the drawn conclusion made out of the data are correct.(_*will discuss later_)

**c)Z Test, T test, Chi-square Test** _(*will be discussed on upcoming stories)_

Different Sampling Technique :
------------------------------

1.  **Simple Random Sampling** : _Every member of the population (N) has an equal chance of getting selected for the survey. Example — >Exit pole, general survey._
2.  **Stratified Sampling** : Strata → Layer →cluster →Groups _. Basically in this sampling method the whole population is divided into two or more groups and then members are chosen randomly for the survey. Let’s assume for the exit pole problem we’re dividing the whole population between people of age less than 18 and more than 18. Because people of age less than 18 can’t participate in vote so there’s opinion doesn’t matter for exit pole issue._
3.  **Systematic Sampling** : _It basically stands for taking sample on a certain condition/certain interval. Let’s say there are two person (who offers people credit cards) in front of a shopping mall asking incoming people to opt for credit cards. Say One of them decided to ask every 5th person for credited card and the 2nd person decied to ask every 9th person for credit card. This here can be called as systematic sampling ’cause there choosing samples out of the incoming population using a particular system or technique not randomly._
4.  **Convinience Sampling** : _Only those who’re interested int he survey will only participate . Let’s say there’s an survey going on for a new incoming say VR Technology. And ofc there’ll be many people who’re definitely interested in this but there’ll be also some people who doesn’t care about this stuffs so asking them about what else they would like in their VR headset is completely nonsense ’cause they’ll probably never buy it and also they’ll have very less knowledge about this stuffs._

Variables :
-----------

Variables can be anything that can take value.

Now from the definition variable can take values in two ways one way can be that it takes values discretely and second way can be that it takes value continuously. So, On this basis variables can be divided into two catagories

1.  Discrete Variables
2.  Continous Variables

Probablity:
-----------

Measure of the likelihood of an event.

**Formula :** [_P_](https://en.wikipedia.org/wiki/Probability) _= number of ways an event can occur/number of possible outcomes_

_e.g_ : Let’s consider events of **_Tossing A Coin_**

We all know that a coin have two sides _HEAD_ & _TAIL._

So, possible outcome after tossing a coin is either it can be either Head or Tail,

S = {H, T} #possible outcomes

so, probability of head, P(H) = 1/2

Mutually Exclusive Event :
--------------------------

Mutually exclusive events are those where only one event can occur/possible.

i.e,if we consider the previous example _Coin Tossing,_ outcome can only be either head or tail.

### Venn-Diagram_(for M.E)_:

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*WbhNcqXZPiUu3Y0Lf-teWQ.png)

Non-mutually exclusive events:
------------------------------

Events that can happen at the same time.

_e.g_ :

Let’s consider We’re taking out a card from a deck & we’re trying to find out if the picked up card king , diamond.We all know that there are 4 kings and 13 diamonds in a deck of 52 cards.And also a king card of diamonds.

So,rather than 2 possibilities there exists 3 possibilities

picked up card can be 1.King, 2Diamond, 3.king of diamonds

The third option king of diamonds, when we calculate number of kings we consider this card and when we discussed about 13 diamond card it was also included there.So,basically we are considering the same card twice.

### Venn-Diagram(for N.M.E):

![captionless image](https://miro.medium.com/v2/resize:fit:790/format:webp/1*7jHzoTYxnCxf5QIav1upUA.gif)

Conclusion :
------------

For mutual exclusive events(i.e, M.E) there’s no intersection but for N.M.E there exist a common ground and hence the intersection.

**Additive Rule:**

**P(A or B) = P(A) + P(B)**_{Mutually Exclusive event}_

**P(A or B) = P(A) + P(B)-P(A∩B)**_{Non-Mutual Exclusive event}_

**_Example :_**

Let’s consider the _Tossing Coin_ problem again,

P(H or T) = P(h) + P(T) = 1/2 + 1/2 = 1 -> **_M.E_**

Let’s consider the _Card deck_ problem,

P(K or D) = P(K) + P(D)-P(K∩D) (as it is N.M.E)

P(K) = 4/52 = 1/13

P(D) = 13/52 = 1/4

P(K∩D) = 1/52

so, ultimate result will be P(K or D) = 1/13 + 1/4–1/52 = 4/13

### Multiplicative Rule :

before going into the multiplicative rule let’s just discuss what is _Independent events_ and _Dependent Events_ & difference between them.

**_Independent Event_**:

Again let’s consider the _Coin Tossing_ game

Let’s say this time we tossed the coin three times and the outcome is like this {H, T, H}

so,on the first toss P(H) = 1/2

on the second toss P(T) = 1/2

on the third toss P(H) = 1/2

So,basically it doesn’t matter how many times we toss the coin for every time probability of head or tails will always be 1/2.

Therefore we can say that outcome never changes.

**_Dependent Event:_**

Again Let’s consider the Card deck problem,

let’s say on the first take out we’re measuring the probability of getting a King

For the 1st take out P(K) = 4/52

on the second take out we’re measuring the probability of getting a queen

For the 2nd take out P(Q) = 4/51; Because we already ook out 1 card .

So,We can see by each card taken out number of total cards decreases.

Hence we can conclude that no of outcomes decreases each time and therefore the probability of a certain card to be taken out changes w.r.t to the previous card taken.So,the event gets dependent of previous measures.

P(A and B) = P(A)*P(B) {for _Independent Event_}

P(A and B) = P(A) * P(B/A) {for _Dependent Event_}

**_Example:_**

Let’s we are trying to know probability of getting 2 and 3 from a dice roll for 2 successive rolling.

P(1 and 3) = P(1) * p(3) = 1/6 * 1/6 = 1/36 {as _Independent Event_}

Let’s we are trying to know probability of getting King and Queen for 2 successive card taken out.

P(K and Q) = P(K) * P(K/Q) = 1/52 * 1/51 = 1/2652

Let’s end it here. We’ll continue this on the next story.