// Give another example that is more use case driven: grocery -> map the price
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
  console.log(cartItem);
  return cartItem;
});
console.log("total price for each item:", totalPriceForEachItemType.cartList);
