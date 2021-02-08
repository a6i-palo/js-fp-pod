import { compose } from  '../helpers/index.js';

// 1. Combining map and filter

// Multiples of 2
const collection1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
collection1.map(x => x * 2) // [2, 4, 6, 8, 10, 12, 14, 16, 18]

// Divisible by 3
const collection2 = [2, 4, 6, 8, 10, 12, 14, 16, 18]
collection2.filter(x => x % 3 === 0) // [6, 12, 18]

console.log([1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => x * 2).filter(x => x % 3 === 0)) 


// 2. Implement map and filter with reduce
// first, we will do the reducer implementation for map
const mapMultiplyReducer = (result, input) => result.concat(input * 2);

const res1 = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(mapMultiplyReducer, []); // [2, 4, 6, 8, 10, 12, 14, 16, 18]
console.log('Result 1:', res1);

// We will do the same for filter
const filterDivisibleByThree = (result, input) => input % 3 === 0 ? result.concat(input) : result
const res2 = res1.reduce(filterDivisibleByThree, []); // [6, 12, 18]
console.log('Result 2:', res2);

// 3. Extract function from the reducer
// Extract multiply function from map reducer
const mapReducer = (f) => (result, input) => result.concat(f(input));
const res3 = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
  mapReducer((x) => x * 2),
  []
); // [2, 4, 6, 8, 10, 12, 14, 16, 18]

console.log('Result 3:', res3);

// Extract predicate from filter reducer
const filterReducer = (predicate) => (result, input) =>
  predicate(input) ? result.concat(input) : result;

const res4 = [2, 4, 6, 8, 10, 12, 14, 16, 18].reduce(
  filterReducer((x) => x % 3 === 0),
  []
); // [6, 12, 18]
console.log('Result 4:', res4);

// When you combined the reducers, you get something similar to chaining array built-in methods
const res5 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  .reduce(
    mapReducer((x) => x * 2),
    []
  )
  .reduce(
    filterReducer((x) => x % 3 === 0),
    []
  ); // [6, 12, 18]
console.log('Result 5:', res5);


// 4. Extract the reducing function
// Return a reducer for each value in the collection
const mapping = (f) => (reducing) => (result, input) =>
  reducing(result, f(input));
const filtering = (predicate) => (reducing) => (result, input) =>
  predicate(input) ? reducing(result, input) : result;

const res6 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  .reduce(
    mapping((x) => x * 2)((xs, x) => xs.concat(x)),
    []
  )
  .reduce(
    filtering((x) => x % 3 === 0)((xs, x) => xs.concat(x)),
    []
  ); // [6, 12, 18]
console.log('Result 6:', res6);

// 5. Compose the reducer
// Compose filtering into mapping
// mapping(x => x * 2)(filtering(x => x % 3 === 0)((xs, x) => xs.concat(x)));
const res7 = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
  mapping((x) => x * 2)(filtering((x) => x % 3 === 0)((xs, x) => xs.concat(x))),
  []
); // [6, 12, 18]
console.log('Result 7:', res7);

// 6. Let's compose our functions
const composed = compose(
  mapping((x) => x * 2),
  filtering((x) => x % 3 === 0)
);

[1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
  composed((xs, x) => xs.concat(x)),
  []
);
// [6, 12, 18]

// 7. Deriving our transducer
// The transducer
const transduce = (composed, reducing, initial, input) =>
  input.reduce(composed(reducing), initial);

console.log(transduce(composed, (xs, x) => xs.concat(x), [], [1, 2, 3, 4, 5, 6, 7, 8, 9]));
// [6, 12, 18]

// Let's change our reducing logic to yield a different output
console.log(transduce(composed, (sum, x) => parseInt(sum + x), [], [1, 2, 3, 4, 5, 6, 7, 8, 9]));
// 36
