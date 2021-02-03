// Partially applied function
const multiply = (a) => (b) => (c) => a * b * c;
const multiplyWith2Argument = multiply(1)(2); // Returns a function
const multiplyWith3Argument = multiplyWith2Argument(3); // 6

// TODO: create a function curriedBuildUrl
const twitterFavicon = curriedBuildUrl("https")("favicon.ico")("twitter.com");

const buildHttpsUri = curriedBuildUrl("https");
const twitterFavicon1 = buildHttpsUri("twitter.com", "favicon.ico");
