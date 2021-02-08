import {compose, pipe} from '../helpers/index.js'

// Setup
const isLessThan10 = x => x < 10
const filterOutDoubleDigit = collection => collection.filter(isLessThan10)

const add = (x, y) => x + y
const sum = collection => collection.reduce(add)


// Passing a function as an argument to a function
const sumSingleDigit = collection => sum(filterOutDoubleDigit(collection))

console.log("Result: ", sumSingleDigit([1, 2, 3, 4, 10, 11, 12]))



// Using functional composition to compose your functions with compose (R to L)
const composeSumSingleDigit = collection => compose(sum, filterOutDoubleDigit)(collection)

console.log("Result: ", composeSumSingleDigit([1, 2, 3, 4, 10, 11, 12]))


// Using functional composition to compose your functions with pipe (L to R)
const pipeSumSingleDigit = collection => pipe(filterOutDoubleDigit, sum)(collection)

console.log("Result: ", pipeSumSingleDigit([1, 2, 3, 4, 10, 11, 12]))