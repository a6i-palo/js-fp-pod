/**
 * A functor is something that is Mappable or something that can be mapped between objects in a Category.
 * A category is simply a collection of objects which can be any type, while a map is a function to transform something from one object to another
 */

// You can map a function(map) over an array(category) which makes an array mappable. So an array is a kind of functor
console.log('Array Map:', [0, 1, 2, 3, 4, 5, 6].map(x => x + 1))


// Example 1 - Creating our own Functor
console.log('========= Example 1 - Creating our own Functor =========')

const randomNumber = (value) => ({
  value,
  map: (transform) => randomNumber(transform(value)),
});

const randomNumber1 = randomNumber(1); // {value: 1}
const randomNUmber2 = randomNumber1.map((x) => x + 1); // {value: 2}
console.log('Random Number 1:', randomNumber1.value);
console.log('Random Number 2:', randomNUmber2.value);


// Example 2: Applying code resuse on functors
// REUSED CODE: some complex functions that operated on numbers and returns transformed numbers
console.log('========= Example 2 - Cart List =========')

const square = (x) => x * x;
const add = (x) => x + x;

const log = (x) => {
  console.log('trace:', x);
  return x;
};

// Map chaining on ARRAY FUNCTOR that is a number array
const arrFunctor = [1, 2, 3];
arrFunctor.map(square).map(add).map(log); // 2 8 18

// We can apply the same map chaining on a CUSTOM FUNCTOR that we have defined previously
const myFunctor = randomNumber(3);
myFunctor.map(log); // 3
myFunctor.map(square).map(add).map(log); // 18



// Example 3 - Cart List
console.log('========= Example 3 - Cart List =========')

const cartList = [
  {
    category: "fruit",
    item: "apples",
    qty: 10,
    price: 0.4,
  },
  {
    category: "beverage",
    item: "milk",
    qty: 1,
    price: 3.55,
  },
  {
    category: "pasta",
    item: "Pasta",
    qty: 3,
    price: 2,
  },
  {
    category: "dessert",
    item: "Gelatin dessert",
    qty: 3,
    price: 5.5,
  },
];

const cartFunctor = (cartList) => ({
  cartList,
  map: (fn) => cartFunctor(cartList.map((item) => fn(item.qty * item.price))),
});

const totalPriceForEachItemType = cartFunctor(cartList).map((cartItem) => {
  return cartItem;
});
console.log("Total price for each item:", totalPriceForEachItemType.cartList);


// Example 4 - String Functor
// Strings in Javascript does not provide a map method
// It is therefore not a functor, what if we want to map through a string to get its character?
console.log('========= Example 4 - String Functor =========')

const stringFunctor = (string) => ({
  string,
  map: (fn) => {
    let result = "";
    for (let i = 0; i < string.length; i++) {
      result += String.fromCharCode(fn(string.charCodeAt(i))); // apply fn() to each char code of the string when map is called
    }
    return stringFunctor(result);
  },
});

const stringToCharCode = (string) => String.charCode(string);

const mappableString = stringFunctor("some secret string");
console.log(mappableString, typeof mappableString); // { string: 'some string', map: [Function: map] } object
mappableString.map((char) => {
  console.log(char);
});

// Creating some pluggable map functions to be used by my mappable string
// Caesar cipher example (Disclaimer: caesar cipher is the first cipher ever created, not secure by any means)
const secretKey = 12;
const caesarEncrypt = (key) => (charCode) => charCode + key;
const caesarDecrypt = (key) => (charCode) => charCode - key;

const encrypted = mappableString.map(caesarEncrypt(secretKey));
console.log("encrypted", encrypted.string);

const decrypted = encrypted.map(caesarDecrypt(secretKey));
console.log("decrypted", decrypted.string);

// Validation example
const censoredChar = 42;
const isNumber = (charCode) => charCode > 47 && charCode < 58; //0-9
const isLetter = (charCode) =>
  (charCode > 64 && charCode < 91) || (charCode > 97 && charCode < 123); //a-z or A-Z
const censor = (fn) => (charCode) => (fn(charCode) ? censoredChar : charCode);

const mappableUid = stringFunctor("S1234567D");
const censoredNumbers = mappableUid.map(censor(isNumber));
console.log(censoredNumbers.string);

const censoredLetters = mappableUid.map(censor(isLetter));
console.log(censoredLetters.string);