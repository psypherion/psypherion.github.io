Building a Simple Neural Network from Scratch in Python
=======================================================

[![Sayan Sarkar](https://miro.medium.com/v2/resize:fill:64:64/1*ckonRVccCJQthJrZ8fZFvw@2x.jpeg)](https://medium.com/?source=post_page---byline--8fb722882e5a---------------------------------------)

[Sayan Sarkar](https://medium.com/?source=post_page---byline--8fb722882e5a---------------------------------------)

5 min read

·

May 1, 2024

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fp%2F8fb722882e5a&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fbuilding-a-simple-neural-network-from-scratch-in-python-8fb722882e5a&user=Sayan+Sarkar&userId=33445fab81c5&source=---header_actions--8fb722882e5a---------------------clap_footer------------------)

--

[nameless link](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2F8fb722882e5a&operation=register&redirect=https%3A%2F%2Fpsypherion.medium.com%2Fbuilding-a-simple-neural-network-from-scratch-in-python-8fb722882e5a&source=---header_actions--8fb722882e5a---------------------bookmark_footer------------------)

Listen

Share

![captionless image](https://miro.medium.com/v2/resize:fit:1000/format:webp/1*Qzwvkp77i1lK8ugoFECaWg.jpeg)

In this blog, we’ll delve into the code for a basic neural network implementation in Python. We’ll explore each part of the code, understand the underlying mathematical concepts, and gain insights into how neural networks learn.

**1. Imports and Class Definition:**

```
import numpy as np
from warnings import filterwarnings
class NeuralNetwork:
    def __init__(self):
        self.weights_list = []
        self.bias_list = []p
```

*   `**import numpy as np**`: Imports the NumPy library, essential for numerical computations in Python. We'll use NumPy arrays to represent weights, biases, and activations.
*   `**from warnings import filterwarnings**`: Imports a function to optionally suppress warnings during execution.
*   `**class NeuralNetwork**`: Defines a class named `NeuralNetwork` that serves as a blueprint for creating neural network objects.
*   `**def __init__(self)**`: The constructor method that initializes an instance of the `NeuralNetwork` class.
*   `**self.weights_list = []**`: Initializes an empty list `weights_list` to store the weights for each layer in the network.
*   `**self.bias_list = []**`: Initializes an empty list `bias_list` to store the biases for each layer in the network.

**2. Activation Function:**

```
def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))
```

`**def sigmoid(self, x)**`: Defines a method named `[sigmoid](https://ky13-troj.medium.com/sigmoid-function-a-cornerstone-of-neural-networks-f74c1c4b6d1c)` that implements the sigmoid activation function. This function is commonly used in neural networks to introduce non-linearity and map input values between 0 and 1.

*   `**return 1 / (1 + np.exp(-x))**`: The mathematical formula for the sigmoid function. It takes an input `x` (usually a weighted sum of inputs) and applies the exponential function (`np.exp(-x)`) to it. The result is then inverted using division by 1 plus the exponential value. This ensures the output is within the range (0, 1).

[read : [this blog](https://ky13-troj.medium.com/sigmoid-function-a-cornerstone-of-neural-networks-f74c1c4b6d1c) to know more about sigmoid function]

**3. Dense Layer Implementation:**

```
def dense(self, ip, weights, bias):
        units = weights.shape[1]
        weight = [weights[:, i] for i in range(units)]
        g = np.empty((1, units))  # Initialize an empty array for output
        for i in range(units):
            z = np.dot(ip, weight[i]) + bias[i]
            g[0, i] = self.sigmoid(z)[0]
        return g
```

`**def dense(self, ip, weights, bias)**`: Defines a method named `dense` that represents a single dense layer (fully connected layer) in the neural network.

*   `**ip**`: Input to the layer, typically the output of the previous layer or the initial input data.
*   `**weights**`: A 2D NumPy array representing the weights for this layer. Each row represents the weights for a single neuron in this layer, and each column represents the weights for a particular input from the previous layer.
*   `**bias**`: A 1D NumPy array representing the biases for the neurons in this layer. Biases are added to the weighted sum of inputs before applying the activation function.
*   `**units = weights.shape[1]**`: Extracts the number of neurons (`units`) in this layer from the weight matrix's second dimension (`shape[1]`).
*   `**weight = [weights[:, i] for i in range(units)]**`: Creates a list of weights for each neuron in the layer. This is done by iterating through the columns of the weights matrix.
*   `**g = np.empty((1, units))**`: Initializes an empty NumPy array `g` to store the activations (outputs) of the neurons in this layer. The shape is `(1, units)` because we're processing one input sample at a time.
*   `**for i in range(units)**`: Iterates through each neuron in the layer.
*   `**z = np.dot(ip, weight[i]) + bias[i]**`: Calculates the weighted sum of inputs for the current neuron `i`. `np.dot` performs the matrix multiplication between the input (`ip`) and the weights for this neuron (`weight[i]`). The bias (`bias[i]`) is then added.

**4. Adding Layers and Forward Propagation:**

```
def add_layer(self, weights, bias):
        self.weights_list.append(weights)
        self.bias_list.append(bias)
def layers(self, n, ip):
        if n == 0:
            return ip
        else:
            output = self.dense(ip, self.weights_list[len(self.weights_list) - n], self.bias_list[len(self.bias_list) - n])
            return self.layers(n - 1, output)
```

*   `**def add_layer(self, weights, bias)**`: Defines a method named `add_layer` that allows us to add a layer (dense layer) to the neural network.
*   `**weights**`: The weight matrix for the layer to be added.
*   `**bias**`: The bias vector for the layer to be added.
*   `**self.weights_list.append(weights)**`: Appends the weights matrix to the `weights_list` for storage.
*   `**self.bias_list.append(bias)**`: Appends the bias vector to the `bias_list` for storage.
*   `**def layers(self, n, ip)**`: Defines a recursive method named `layers` that performs forward propagation through the network.
*   `**n**`: The number of layers remaining to process (starts with the total number of layers).
*   `**ip**`: The input data for the current layer (either the original input or the output of the previous layer).
*   `**if n == 0**`: Base case: If there are no more layers remaining (`n` is 0), simply return the input data (`ip`). This is the final output of the network.
*   `**else**`: Recursive case: If there are more layers (`n` is greater than 0):
*   `**output = self.dense(ip, self.weights_list[len(self.weights_list) - n], self.bias_list[len(bias_list) - n])**`: Pass the input (`ip`) to the `dense` function along with the weights and biases retrieved from the appropriate indices in the stored lists (`weights_list` and `bias_list`). This calculates the activations for the current layer using the retrieved weights and biases.
*   `**return self.layers(n - 1, output)**`: Recursively call the `layers` function again, but with one less layer to process (`n - 1`), and the calculated activations (`output`) from the current layer as the input for the next layer. This continues the forward propagation through the network.

**5. Example Usage and Theoretical Considerations:**

```
if __name__ == "__main__":
    # Create an instance of the NeuralNetwork class
    network = NeuralNetwork()
    # Define the weights and biases for each layer
    weights = [  
        np.array([[1, -3, 5], [2, 4, -6]]),   # Weights for the first layer (2x3)
        np.array([[-1, 1, 2, 7], [1, 2, 3, -3], [1, 2, 3, 4]]),  # Weights for the second layer (2x4)
        np.array([[-1, 6], [1, -2], [1, 2], [1, 3]])  # Weights for the third layer (2x2)
    ]
    biases = [        np.array([-1, 1, 2]),  # Biases for the first layer (1x3)
        np.array([1, 2, 3, 4]),  # Biases for the second layer (1x4)
        np.array([1, 2])  # Biases for the third layer (1x2)
    ]
    # Add layers to the network
    for w, b in zip(weights, biases):
        network.add_layer(w, b)
    # Example input data
    input_data = np.array([[200.0, 17.0]])
    # Call the layers method to get the final output
    final_output = network.layers(len(weights), input_data)
    print("Final Output:", final_output)
```

**Theoretical Considerations and Learning in Neural Networks**

The code we’ve explored implements a basic feed-forward neural network with a single hidden layer and the sigmoid activation function. Now, let’s delve into the underlying mathematical concepts and how neural networks learn:

*   A neural network can be modeled mathematically using linear algebra concepts. Each layer performs a matrix multiplication between the input vector (`ip`) and the weight matrix (`weights`) for that layer. The bias vector (`bias`) is then added element-wise to the resulting product.
*   The activation function (`sigmoid` in this case) is applied to the weighted sum to introduce non-linearity and transform the output values within a specific range. This non-linearity allows the network to learn complex relationships between inputs and outputs.

I haven’t yet implemented backward propagation by which a neural network learns. I would do that probably in the next blog.

code : [github](https://github.com/ky13-troj/numpyNN)

socials ->

instagram : [@sarkar.sayan01](https://www.instagram.com/sarkar.sayan01/)

twitter : [@ky13troj](https://twitter.com/ky13troj)