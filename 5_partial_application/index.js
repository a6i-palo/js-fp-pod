import {pipe} from '../helpers/index.js'

/**
 * Partial application is the process of applying a function to some of it's argument which get returned for later use.
 */

// Example 1
const multiply = (a) => (b) => (c) => a * b * c;
const multiplyWith2Argument = multiply(1)(2); // Returns a function
const multiplyWith3Argument = multiplyWith2Argument(3); // 6

console.log(multiplyWith3Argument)


// Example 2 - Url Builder
const curriedBuildUrl = (scheme) => (domain) => (path) =>
  scheme + "://" + domain + "/" + path;

const curriedTwitterFavicon = curriedBuildUrl("https")("www.twitter.com")("favicon.ico");
console.log(curriedTwitterFavicon);

const buildHttpsUri = curriedBuildUrl("https"); 
const twitterFavicon = buildHttpsUri("www.twitter.com")("favicon.ico");
const facebookFavicon = buildHttpsUri("www.facebook.com")("favicon.ico");

console.log(twitterFavicon);
console.log(facebookFavicon);



// Example 3 - Discount Calculator
// Before currying
let price;
let discount;

discount = (price, discount) => price * discount;

price = discount(1500, 0.1); // 150
price = discount(1500, 0.2); // 300
price = discount(2000, 0.1); // 200
price = discount(50, 0.1); // 5
price = discount(750, 0.45); // 337.5

/*
After currying the discount function, we dont always add the discount value when applying the discount
Advantage: Function reusability / constants being used once instead of multiple times
This is called a partial application:
A partial application is a function which has been applied to some, but not yet all of its arguments. 
A function with some of its parameters fixed is said to be partially applied.
All curry functions returns a partial application.
*/

discount = (discount) => (price) => price * discount;

const xmasDiscount = discount(0.1);
const cnyDiscount = discount(0.2);
const newcomerDiscount = discount(0.45);

price = xmasDiscount(1500);
console.log(price);

price = cnyDiscount(1500);
console.log(price);

price = xmasDiscount(2000);
console.log(price);

price = xmasDiscount(50);
console.log(price);

price = newcomerDiscount(750);
console.log(price);


// Example 4 - Log Trace Pipe
// Another usage of curry functions and partial application: Adding custom tracing logs to each step of the pipeline

const trace = (label) => (value) => {
  console.log(`${label}: ${value}`);
  return value;
};

const addInput = (n) => (input) => input + n;
const multiplyInput = (n) => (input) => input * n;

const transformWithoutTrace = pipe(addInput(5), multiplyInput(3));
console.log(transformWithoutTrace(20)); // 75

const transformWithTrace = pipe(
  trace("Starting value"), // trace("Starting value")(20)
  addInput(5), // add(5)(20)
  trace("After add"), // trace("After add")(25)
  multiplyInput(3), // multiply(3)(25)
  trace("After multiply") // trace("After multiply")(75)
);

transformWithTrace(20);
