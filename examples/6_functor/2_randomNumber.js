// Example 2
const randomNumber = (value) => ({
  value,
  map: (transform) => randomNumber(transform(value)),
});

const randomNumber1 = randomNumber(1); // {value: 1}
const randomNUmber2 = randomNumber1.map((x) => x + 1); // {value: 2}
console.log(randomNumber1);
console.log(randomNUmber2);

export { randomNumber };
