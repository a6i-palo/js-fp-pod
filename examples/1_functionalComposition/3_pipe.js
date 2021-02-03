// 5. Pipe (left to right)
const pipe = (...fns) => (args) => fns.reduce((arg, fn) => fn(arg), args);
const sumSingleDigitPiped = (collection) =>
  pipe(printBefore, filterOutDoubleDigit, sum)(collection);
sumOfNumsLessThan10 = sumSingleDigitPiped(sampleArr);
console.log(sumOfNumsLessThan10);
