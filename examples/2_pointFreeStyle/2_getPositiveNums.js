// Example 2
// Before, you usually you can do this by defining functions explicitly
const nums = [-1, 2, 3, 5, -5];
const getPositiveNums = (nums) => {
  return nums.filter((num) => num > 0);
};
console.log(getPositiveNums(nums));

// Refactoring into pointer free style by passing a function to the filter callback
// to provide more readability and reuse of small functions
const isPositive = (num) => num > 0;
const getPositiveNumsPointerFree = (nums) => nums.filter(isPositive);
console.log(getPositiveNumsPointerFree(nums));
