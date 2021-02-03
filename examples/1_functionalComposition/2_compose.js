import { nums, sum, filterOutDoubleDigit } from "./1_functional.js";

// 3. General expresssion of composed function:
// const composedFunction = inputObject => secondOperation(firstOperation(inputObject))
const composeTwo = (fn1, fn2) => (inputObject) => fn1(fn2(inputObject));

const sumSingleDigitComposedTwo = (collection) =>
  composeTwo(sum, filterOutDoubleDigit)(collection);

let sumLessThan10 = sumSingleDigitComposedTwo(nums);
console.log(sumLessThan10);

// 4. Compose to take in 2 or more args (right to left)
const compose = (...fns) => (args) =>
  fns.reduceRight((arg, fn) => fn(arg), args);

const printBefore = (collection) => {
  console.log(collection);
  return collection;
};

const sumSingleDigitComposed = (collection) =>
  compose(sum, filterOutDoubleDigit, printBefore)(collection);

sumLessThan10 = sumSingleDigitComposed(nums);
console.log(sumLessThan10);

export { compose, printBefore };
