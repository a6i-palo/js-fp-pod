// String in Javascript does not provide a map method
// It is therefore not a functor, what if we want to map through a string to get its character?
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
