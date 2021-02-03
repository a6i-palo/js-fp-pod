// Example 3: Applying code resuse on functors
// REUSED CODE: some complex functions that operated on numbers and returned transformed numbers
const square = (x) => x * x;
const log = (x) => {
  console.log(x);
  return x;
};

// ARRAY FUNCTOR that is a number array
const arrFunctor = [1, 2, 3];
arrFunctor.map(log);
arrFunctor.map(square).map(log);
console.log();

// CUSTOM FUNCTOR that we have defined previously
const randomNumber = (value) => ({
  value,
  map: (transform) => randomNumber(transform(value)),
});
const myFunctor = randomNumber(3);
myFunctor.map(log);
myFunctor.map(square).map(log);
