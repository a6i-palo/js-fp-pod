// Example 2
// Using a calculator as an example
const add = (a, b) => a + b;
const minus = (a, b) => a - b;
// Use the higher number to minus the smaller number
const customMinus = (a, b) => (a > b ? a - b : b - a);

// Higher order function that takes in a function as arg and apply it to the 2 numbers
const doOperation = (operator, a, b) => {
  const result = operator(a, b);
  console.log(result);
};

doOperation(add, 10, 5); // 15
doOperation(minus, 3, 9); // -6
doOperation(customMinus, 2, 4); // 2
