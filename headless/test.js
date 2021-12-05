const Cube = require("./cube.js")


let cube = new Cube()


let solvedState = cube.reset().getState()


console.log(cube.scramble().getState())

console.log(cube.setState(solvedState).getState())
console.log(cube.isSolved())


let interval = setInterval(()=>0, 1000)