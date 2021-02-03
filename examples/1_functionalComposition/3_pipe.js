import { nums, sum, filterOutDoubleDigit } from "./1_functional.js";
import { printBefore } from "./2_compose.js";

// 5. Pipe (left to right)
const pipe = (...fns) => (args) => fns.reduce((arg, fn) => fn(arg), args);

const sumSingleDigitPiped = (collection) =>
  pipe(printBefore, filterOutDoubleDigit, sum)(collection);

const sumLessThan10 = sumSingleDigitPiped(nums);
console.log(sumLessThan10);

export { pipe };
