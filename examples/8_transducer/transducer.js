import { compose } from "../1_functionalComposition/2_compose.js";

// 2. Implement map and filter with reduce
// first, we will do the reducer implementation for map
const mapMultiplyReducer = (result, input) => result.concat(input * 2);

const res = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(mapMultiplyReducer, []);
// [2, 4, 6, 8, 10, 12, 14, 16, 18]
console.log(res);

// We will do the same for filter
// Error here: output is bool[]
const filterDivisibleByThree = (result, input) =>
  result.concat(input % 3 === 0);
const res2 = res.reduce(filterDivisibleByThree, []);
// [6, 12, 18]
console.log(res2);

// 3. Extract function from the reducer
// Extract multiply function from map reducer
const mapReducer = (f) => (result, input) => result.concat(f(input));
const res3 = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
  mapReducer((x) => x * 2),
  []
);
// [2, 4, 6, 8, 10, 12, 14, 16, 18]
console.log(res3);

// Extract predicate from filter reducer
const filterReducer = (predicate) => (result, input) =>
  predicate(input) ? result.concat(input) : result;
const res4 = [2, 4, 6, 8, 10, 12, 14, 16, 18].reduce(
  filterReducer((x) => x % 3 === 0),
  []
);
// [6, 12, 18]
console.log(res4);

// When you combined the reducers, you get something similar to chaining array built-in methods
const res5 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  .reduce(
    mapReducer((x) => x * 2),
    []
  )
  .reduce(
    filterReducer((x) => x % 3 === 0),
    []
  );
// [6, 12, 18]
console.log(res5);

// 4. Extract the reducing function
// Return a reducer for each value in the collection
const mapping = (f) => (reducing) => (result, input) =>
  reducing(result, f(input));
const filtering = (predicate) => (reducing) => (result, input) =>
  predicate(input) ? reducing(result, input) : result;

// Error here
const res6 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  .reduce(
    mapping((x) => x * 2)((xs, x) => xs.concat(x)),
    []
  )
  .reduce(
    filtering((x) => x % 3 === 0)((xs, x) => xs.concat(x)),
    []
  );
// [6, 12, 18]
console.log(res6);

// 5. Compose the reducer
// Compose filtering into mapping
// mapping(x => x * 1)(filtering(x => x % 3 === 0)((xs, x) => xs.concat(x)));
const res7 = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
  mapping((x) => x + 1)(filtering((x) => x % 2 === 0)((xs, x) => xs.concat(x))),
  []
);
// 2, 4, 6, 8, 10
console.log(res7);

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

transduce(composed, (xs, x) => xs.concat(x), [], [1, 2, 3, 4, 5, 6, 7, 8, 9]);
// [6, 12, 18]

// Let's change our reducing logic to yield a different output
transduce(composed, (sum, x) => sum + x, [], [1, 2, 3, 4, 5, 6, 7, 8, 9]);
// 36
