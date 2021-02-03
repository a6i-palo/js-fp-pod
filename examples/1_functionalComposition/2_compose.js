// 3. General expresssion of composed function:
// const composedFunction = inputObject => secondOperation(firstOperation(inputObject))
const composeTwo = (fn1, fn2) => (inputObject) => fn1(fn2(inputObject));

const sumSingleDigitComposed = (collection) =>
  composeTwo(sum, filterOutDoubleDigit)(collection);
sumOfNumsLessThan10 = sumSingleDigitComposed(nums);
console.log(sumOfNumsLessThan10);

// 4. Compose to take in 2 or more args (right to left)
const compose = (...fns) => (args) =>
  fns.reduceRight((arg, fn) => fn(arg), args);

const printBefore = (collection) => {
  console.log(collection);
  return collection;
};

const sumSingleDigitComposedMore = (collection) =>
  compose(sum, filterOutDoubleDigit, printBefore)(collection);

sumOfNumsLessThan10 = sumSingleDigitComposedMore(nums);
console.log(sumOfNumsLessThan10);
