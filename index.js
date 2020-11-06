const gates = require('./gates')
const perceptron = require('./perceptron')

gates.forEach(gate => {
  console.log(`=========> ${gate.name}`)
  const { train, net } = perceptron(gate)
  train()
  net()
})
