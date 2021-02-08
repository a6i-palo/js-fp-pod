/**
 * Higher order functions are functions that operate on other functions, either by taking them as arguments or by returning them.
 */
const arr1 = [1, 2, 3];
const arr2 = [];
for (let i = 0; i < arr1.length; i++) {
  arr2.push(arr1[i] * 2);
}
console.log(arr2); // [ 2, 4, 6 ]

// Applying Higher order function - array map is an Higher order function
const arr3 = arr1.map((item) => item * 2);
console.log(arr3); // [ 2, 4, 6 ]
