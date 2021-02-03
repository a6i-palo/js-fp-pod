const nums = new Array(1, 2, 3, 4, 10, 11, 12);

// 1. Object oriented approach with function chaining
let sumOfNumsLessThan10 = nums
  .filter((x) => x < 10)
  .reduce((mem, x) => mem + x);
console.log(sumOfNumsLessThan10);

// 2. Functional approach
const isLessThan10 = (x) => x < 10;
const filterOutDoubleDigit = (collection) => collection.filter(isLessThan10);

const add = (x, y) => x + y;
const sum = (collection) => collection.reduce(add);

const sumSingleDigit = (collection) => sum(filterOutDoubleDigit(collection));
sumOfNumsLessThan10 = sumSingleDigit(nums);
console.log(sumOfNumsLessThan10);
