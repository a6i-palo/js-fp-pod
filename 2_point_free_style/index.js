import {pipe} from '../helpers/index.js'

// Example 1
// Writing functions without explicitly providing the arguments in your code is called point-free style.
// To do it, you'll call a function that returns the new function, rather than declaring the function explicitly.
console.log('========= Example 1 =========')

const getStockPriceChange = (stock) =>
  `[${stock.symbol}] ${stock.name}'s price change today is ${parseFloat(
    stock.close - stock.open
  ).toFixed(3)}`;

const stocks = [
  {
    name: 'Lion-Phillip S-REIT ETF',
    symbol: 'CLR.SI',
    open: 1.12,
    close: 1.11,
  },
  { name: 'Ascendas REIT', symbol: 'A17U.SI', open: 3.65, close: 3.76 },
  {
    name: 'Frasers Centrepoint Trust',
    symbol: 'J69U.SI',
    open: 2.58,
    close: 2.6,
  },
  { name: 'Starhill Global REIT', symbol: 'P40U.SI', open: 0.53, close: 0.535 },
  { name: 'Keppel DC REIT', symbol: 'AJBU.SI', open: 2.1, close: 2.15 },
  {
    name: 'MapleTree Logistic Trust',
    symbol: 'M44U.SI',
    open: 2.01,
    close: 2.01,
  },
];

// Defining argument explicitly
console.log(stocks.map((stock) => getStockPriceChange(stock)));

// Pointer free style
console.log(stocks.map(getStockPriceChange));


// Example 2
console.log('========= Example 2 =========')

const nums = [-1, 2, 3, 5, -5];
const getPositiveNum = (num) => num > 0;

// Defining argument explicitly
console.log(nums.filter(num => getPositiveNum(num)));

// Pointer free style
console.log(nums.filter(getPositiveNum));



// Example 3
console.log('========= Example 3 =========')

const developers = [
  { name: 'Jane', age: 29, gender: 'Female', experience: 3 },
  { name: 'John', age: 26, gender: 'Male', experience: 2 },
  { name: 'Adam', age: 34, gender: 'Male', experience: 11 },
  { name: 'Bob', age: 19, gender: 'Male', experience: 1 },
];

const match = (field, matcher) => developer => matcher(developer[field]) && developer;

// Define some concrete matcher functions
const is = (target) => (value) => value === target;
const isOver = (target) => (value) => value > target;
const isUnder = (target) => (value) => value < target;


const getWantedDeveloper = (developer) => {
  const isMale = match('gender', is('Male'));
  const isYoungAdult = match('age', isOver(20));
  const isJunior = match('experience', isUnder(3));

  return pipe(isMale, isYoungAdult, isJunior)(developer)
};

console.log(developers.filter(getWantedDeveloper))
