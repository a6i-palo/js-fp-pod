// Impure function: output is different when you run with same input
// rely on other information other than what you passed in
const randomNum = Math.random();
console.log(randomNum);

const time = () => new Date().toLocaleTimeString();
console.log(time());
