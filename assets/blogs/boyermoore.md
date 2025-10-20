Boyer-Moore Majority Vote Algorithm
===================================

[![Sayan Sarkar](https://miro.medium.com/v2/resize:fill:64:64/1*ckonRVccCJQthJrZ8fZFvw@2x.jpeg)](https://medium.com/?source=post_page---byline--2e6692dd670d---------------------------------------)

[Sayan Sarkar](https://medium.com/?source=post_page---byline--2e6692dd670d---------------------------------------)

4 min read

·

Mar 7, 2024

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F2e6692dd670d&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fboyer-moore-majority-vote-algorithm-2e6692dd670d&user=Sayan+Sarkar&userId=33445fab81c5&source=---header_actions--2e6692dd670d---------------------clap_footer------------------)

--

1

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F2e6692dd670d&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fboyer-moore-majority-vote-algorithm-2e6692dd670d&source=---header_actions--2e6692dd670d---------------------bookmark_footer------------------)

Listen

Share

![captionless image](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*LLE6C7uTFNA3NCayggSRyw.jpeg)

Introduction:
-------------

In the vast landscape of algorithms, the Boyer-Moore Majority Vote Algorithm stands out as a powerful tool for efficiently identifying the majority element in a sequence. In this blog post, we will delve into the intricacies of this algorithm, exploring its underlying principles and highlighting its exceptional performance in comparison to other majority-finding techniques.

The search for the majority element in a dataset or sequence is a common problem in computer science and data analysis. The majority element is the one that appears more than n/2 times in a sequence of length n. Traditional methods may involve sorting or using hash tables, but the Boyer-Moore Majority Vote Algorithm takes a different, more streamlined approach.

Key Steps :
-----------

The algorithm initializes two variables — a candidate and a counter. The candidate represents the current guess for the majority element, while the counter keeps track of the balance between the majority and non-majority elements encountered.

As the algorithm iterates through the sequence, it compares each element with the current candidate. If the current element matches the candidate, the counter is incremented; otherwise, it is decremented. When the counter reaches zero, the algorithm updates the candidate to the current element and resets the counter.

After completing the pass through the sequence, the algorithm performs a second pass to verify whether the candidate is indeed the majority element. This step ensures the elimination of false positives.

The algorithm returns the candidate as the majority element if it exists; otherwise, it signals that there is no majority element in the sequence.

Implementation in code :
------------------------

![Rust Implementation](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ux0VqH9WXS9sVVv6DkTsKA.png)![Python Imprementation](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*jyOt1XB_ujeqS4JrGs_wWA.png)

Explanation of code :
---------------------

### Rust code :

```
struct Solution {
    candidate: Option<i32>,
    count: i32,
}
```

Here, a `Solution` struct is defined with two fields:

*   `candidate`: An `Option<i32>` that represents the current guess for the majority element. It is an `Option` because initially, there might not be any candidate.
*   `count`: An `i32` that keeps track of the balance between the majority and non-majority elements encountered.

```
impl Solution {
    fn new() -> Solution {
        Solution {
            candidate: None,
            count: 0,
        }
    }
```

An implementation block for the `Solution` struct is provided, defining a `new` method. This method creates and returns a new instance of the `Solution` struct with an uninitialized candidate (`None`) and a count initialized to zero.

```
    fn majority_element(&mut self, nums: Vec<i32>) -> i32 {
        for num in nums {
            if self.count == 0 {
                self.candidate = Some(num);
                self.count = 1;
            } else if Some(num) == self.candidate {
                self.count += 1;
            } else {
                self.count -= 1;
            }
        }
        self.candidate.unwrap()
    }
```

The `majority_element` method is the core of the algorithm. It takes a mutable reference to `self` (the `Solution` instance) and a vector of integers (`nums`). It iterates through each element in `nums` and updates the candidate and count accordingly.

*   If `count` is zero, it means there is no current candidate. In this case, the current element becomes the candidate, and the count is set to 1.
*   If the current element matches the candidate, the count is incremented.
*   If the current element is different from the candidate, the count is decremented.

After iterating through all elements, the method returns the majority candidate using `self.candidate.unwrap()`.

```
fn main() {
    let mut sol = Solution::new();
    let nums = vec![2, 2, 1, 1, 1, 2, 2];
    println!("{}", sol.majority_element(nums));
}
```

In the `main` function, an instance of the `Solution` struct is created. A vector `nums` is defined with a sequence of integers. The `majority_element` method is then called on the `sol` instance with `nums` as an argument, and the result is printed to the console.

This Rust code demonstrates the Boyer-Moore Majority Vote Algorithm in action, efficiently finding the majority element in the given sequence.

### Python Code :

```
def majelem(arr):
    candidate = 0
    count = 0
    
    for i in arr:
        if count == 0:
            candidate = i
            count = 1
        elif i == candidate:
            count += 1
        else:
            count -= 1
    return candidate
```

This function implements the Boyer-Moore Majority Vote Algorithm in Python. It takes a list `arr` as input and iterates through each element. The key steps of the algorithm are as follows:

*   If `count` is zero, it means there is no current candidate. In this case, the current element becomes the candidate, and the count is set to 1.
*   If the current element matches the candidate, the count is incremented.
*   If the current element is different from the candidate, the count is decremented.

After iterating through all elements, the function returns the majority candidate.

Leetcode Problem: [**_click here_**](https://leetcode.com/problems/majority-element/)

My Github: [**_click here_**](https://github.com/ky13-troj)