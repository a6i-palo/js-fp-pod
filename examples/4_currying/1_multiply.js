/* Currying is an advanced technique of working with functions. 
It's the transformation of functions which takes in multiple argument into a function that 
takes a single argument and returns another function that accepts further argument, one by one. 

fn(a, b, c) -> fn(a)(b)(c)
*/

// An simplistic example
let multiply = (a, b, c) => a * b * c; // typo
let res = multiply(1, 2, 3); // typo
console.log(res);

multiply = (a) => (b) => (c) => a * b * c; // typo
res = multiply(1)(2)(3); // typo
console.log(res);
