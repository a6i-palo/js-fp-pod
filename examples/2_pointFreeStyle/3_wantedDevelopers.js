// Example 3
const developers = [
  { name: "Jane", age: 29, gender: "Female", experience: 3 },
  { name: "John", age: 26, gender: "Male", experience: 2 },
  { name: "Adam", age: 34, gender: "Male", experience: 11 },
  { name: "Bob", age: 19, gender: "Male", experience: 1 },
];

// Matcher function that filters a collection by applying the input fn -> object field
const match = (field, matcher) => (collection) =>
  collection.filter((item) => matcher(item[field]));

// Define some concrete matcher functions
const is = (target) => (value) => value === target;
const isOver = (target) => (value) => value > target;
const isUnder = (target) => (value) => value < target;

// Pipe function that was previously defined
const pipe = (...fns) => (args) => fns.reduce((arg, fn) => fn(arg), args);

const getWantedDevelopers = (developers = []) => {
  const isMale = match("gender", is("Male"));
  const isYoungAdult = match("age", isOver(20));
  const isJunior = match("experience", isUnder(3));
  const wantedDevelopers = pipe(isMale, isYoungAdult, isJunior);
  return wantedDevelopers(developers);
};
console.log(getWantedDevelopers(developers));
