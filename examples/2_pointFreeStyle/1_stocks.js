// Writing functions without explicitly providing the arguments in your code is called point-free style.
// To do it, you'll call a function that returns the new function, rather than declaring the function explicitly.
const getStockPriceChange = (stock) =>
  `[${stock.symbol}] ${stock.name}'s price change today is ${parseFloat(
    stock.close - stock.open
  ).toFixed(3)}`;

const stocks = [
  {
    name: "Lion-Phillip S-REIT ETF",
    symbol: "CLR.SI",
    open: 1.12,
    close: 1.11,
  },
  { name: "Ascendas REIT", symbol: "A17U.SI", open: 3.65, close: 3.76 },
  {
    name: "Frasers Centrepoint Trust",
    symbol: "J69U.SI",
    open: 2.58,
    close: 2.6,
  },
  { name: "Starhill Global REIT", symbol: "P40U.SI", open: 0.53, close: 0.535 },
  { name: "Keppel DC REIT", symbol: "KPDCF", open: 2.1, close: 2.15 },
  {
    name: "MapleTree Logistic Trust",
    symbol: "M44U.SI",
    open: 2.01,
    close: 2.01,
  },
];

const stockPrices = stocks.map((stock) => getStockPriceChange(stock));
console.log(stockPrices);

const stockPricesPointFree = stocks.map(getStockPriceChange);
console.log(stockPricesPointFree);
