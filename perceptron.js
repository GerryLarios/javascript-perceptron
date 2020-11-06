module.exports = (data, options = {}) => {
  const trainingData = {...data}

  let threshold     = options?.threshold    || Math.random()
  let learningrate  = options?.learningrate || Math.random()
  let w1            = options?.w1           || Math.random()
  let w2            = options?.w2           || Math.random()

  let learning      = true
  let iterations    = 0


  const train = () => {
    while (learning) {
      iterations++
      learning = false
      const { rows } = trainingData
      rows.forEach(pattern => {
        totalInput = calculateTotalInput({ ...pattern })
        y = activationFunction(totalInput)
        changeWeights(y, { ...pattern })
      })
    }
  }
 
  const net = () => {
    const { rows } = trainingData
    rows.forEach(pattern => {
      y = activationFunction(calculateTotalInput({ ...pattern }))
      const { x1, x2, d } = pattern
      console.log(`${x1} : ${x2} = ${d} PERCEPTRON: ${y}`)
    })
  }

  const calculateTotalInput = ({ x1, x2 }) => {
    return ( x1 * w1 ) + ( x2 * w2 ) + threshold
  }

  const activationFunction = (totalInput) => {
    return totalInput > 0 ? 1 : 0
  }

  const changeWeights = (y, { x1, x2, d }) => {
    const error = d - y
    if (error !== 0) {
      w1 = w1 + (learningrate * error * x1)
      w2 = w2 + (learningrate * error * x2)
      threshold = threshold + (learningrate * error * 1)
      learning = true
    }
  }

  return { train, net }
}
