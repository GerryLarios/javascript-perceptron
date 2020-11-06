# javascript-perceptron

Perceptron with Javascript.

The Rosenblatt Perceptron is used to see the processing that each neuron performs since it is a monolayer network that has full connectivity with the output layer and the input layer.

An artificial neural network (ANN) is a computational model consisting of processing units called neurons or nodes and connections between coefficients or weights linked to the connections. These connections constitute the neural structure, and together with this structure, training algorithms are created.

## Algorithm

To create the Rosenblatt Perceptron, we must follow an algorithm to be able to calculate, compare, and update the results. In this example, we going to work with the `AND` gate. 

| x1 | x2 | d |
|----|----|---|
| 1  | 1  | 1 |
| 1  | 0  | 0 |
| 0  | 1  | 0 |
| 0  | 0  | 0 |

1. Assign the initial values randomly to `w1`, `w2`, `learningrate`, and `threshold.` It's suggested that they have to be numbers between `-1` and `+1.`
2. Assign the initial values to the inputs `x1 = 1`, `x2 = 1` and specify the desired output `d = 1` * Calculate the total input with `a = (x1 * w1) + (x2 * w2) + threshold`
3. Calculate the output `y = f(a)` where `f()` is the activation function `f(a) = a > 0`.
4. Calculate the error `error = d - y` if the error is not equal to 0 then the weights are adjusted `w1 = w1 + (learningrate * error * x1)`, `w2 = w2 + (learningrate * error * x2)` and `threshold = threshold + (learningrate * error * 1)`.
5. Even if the error is equal to 0 or not, the algorithm is repeated from step 2, but the inputs are going to be the next row of the gate table, `x1 = 1`, `x2 = 0`, `d = 0`.
6. The algorithm will stop when the error is equal to 0 for each row in the table. This means the weights are correctly adjusted.

## Code

1. Assing the initial values.

```javascript
const trainingData = { ...data }

let threshold     = options?.threshold    || Math.random()
let learningrate  = options?.learningrate || Math.random()
let w1            = options?.w1           || Math.random()
let w2            = options?.w2           || Math.random()

let learning      = true
```

2. The function `train` will iterate until `learning === false` becase the weight must be adjusted,

```javascript
const train = () => {
  while (learning) {
    learning = false
    const { rows } = trainingData
    rows.forEach(pattern => {
      totalInput = calculateTotalInput({ ...pattern })
      y = activationFunction(totalInput)
      changeWeights(y, { ...pattern })
    })
  }
}
```

3. For each row in `trainingData`, the function simulates a neuron to calculate the `totalInput`, `y` as output, and change the weights if it's necessary.

```javascript
const { rows } = trainingData
rows.forEach(pattern => {
  totalInput = calculateTotalInput({ ...pattern })
  y = activationFunction(totalInput)
  changeWeights(y, { ...pattern })
})
```

4. The function `calculateTotalInput` calculates the total input with the following.

```javascript
const calculateTotalInput = ({ x1, x2 }) => {
  return ( x1 * w1 ) + ( x2 * w2 ) + threshold
}
```

5. The function `activationFunction` is binary and returns `y`.

```javascript
const activationFunction = (totalInput) => {
  return totalInput > 0 ? 1 : 0
}
```

6.  Finally, we check is the weights have to be change. if error is not equal to 0, then we change the weights and set `learning = true` and the code repeat the entire process, but with different values.

```javascript
const changeWeights = (y, { x1, x2, d }) => {
  const error = d - y
  if (error !== 0) {
    w1 = w1 + (learningrate * error * x1)
    w2 = w2 + (learningrate * error * x2)
    threshold = threshold + (learningrate * error * 1)

    learning = true
  }
}
```
