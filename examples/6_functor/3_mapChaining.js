import { randomNumber } from "./2_randomNumber.js";

// Example 3: Applying code resuse on functors
// REUSED CODE: some complex functions that operated on numbers and returns transformed numbers
const square = (x) => x * x;
const add = (x) => x + x;

const log = (x) => {
  console.log(x);
  return x;
};

// Map chaining on ARRAY FUNCTOR that is a number array
const arrFunctor = [1, 2, 3];
arrFunctor.map(square).map(add).map(log); // 2 8 18
console.log();

// We can apply the same map chaining on a CUSTOM FUNCTOR that we have defined previously
const myFunctor = randomNumber(3);
myFunctor.map(log); // 3
myFunctor.map(square).map(add).map(log); // 18
