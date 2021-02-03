// Example 2
// Before currying
let price;
let discount;
discount = (price, discount) => {
  return price * discount;
};
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
xmasDiscount = discount(0.1);
cnyDiscount = discount(0.2);
newcomerDiscount = discount(0.45);

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
