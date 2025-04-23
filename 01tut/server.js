console.log("Hello world")
/*
console.log(global)
//common js import
const os = require('os')
const path = require('path')

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log(__dirname)
console.log(__filename)

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))

console.log(path.parse(__filename))
*/

const {add,subtract,multiply,divide} = require('./math')
console.log(add(3,2))
console.log(subtract(3,2))
console.log(multiply(3,2))
console.log(divide(3,2))