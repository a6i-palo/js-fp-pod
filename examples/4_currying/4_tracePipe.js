// Example 3
// Another usage of curry functions and partial application: Adding custom tracing logs to each step of the pipeline
import { pipe } from "../1_functionalComposition/3_pipe.js";

const trace = (label) => (value) => {
  console.log(`${label}: ${value}`);
  return value;
};

const add = (n) => (input) => input + n;
const multiply1 = (n) => (input) => input * n;

const transformWithoutTrace = pipe(add(5), multiply1(3));
console.log(transformWithoutTrace(20)); // 75

const transformWithTrace = pipe(
  trace("Starting value"), // trace("Starting value")(20)
  add(5), // add(5)(20)
  trace("After add"), // trace("After add")(25)
  multiply1(3), // multiply(3)(25)
  trace("After multiply") // trace("After multiply")(75)
);

transformWithTrace(20);
