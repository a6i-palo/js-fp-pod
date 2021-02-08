/**
 * Monads type lift, flatten and map so that the types are line up for lifting functions a ⇒ M(b), making them composable.
 * Monads is a kind of functor that is both mappable and flat-mappable
 */

// A Maybe helper to validate a person
// 1. Implemented with multiple coupled null change

console.log('========= 1. Implemented with multiple coupled null change =========')

const person = {
  name: "Alvin",
  email: "alvin@palo-it.com",
  address: {
    block: "201",
    unit: "#21-123",
    street: "Canberra Street",
  },
};

if (person != null && person["address"] != null) {
  var street = person["address"]["street"];
  if (street != null) {
    console.log(street);
  } else {
    console.log("Street unknown");
  }
}

// 2. Let's create our Maybe helper

console.log('========= 2. Maybe helper =========')

let maybe = (value) => {
  const nothing = null;
  const something = (value) => () => value;

  return typeof value === "undefined" || value === null
    ? nothing
    : something(value);
};

console.log(maybe(null) == {}); // true
console.log(typeof maybe(null)); // object
console.log(maybe("foo") == {}); // false
console.log(maybe("foo")()); // foo
console.log(typeof maybe("foo")); // function

// Refactor the original null checks
if (maybe(person) != {} && maybe(person["address"]) != {}) {
  var street = maybe(person["address"]["street"]);
  if (street != {}) {
    console.log(street());
  } else {
    console.log("Street unknown");
  }
}

// 3. A more elegant solution using bind

console.log('========= 3. Using Bind =========')

maybe = (value) => {
  const nothing = null;

  const something = (value) => ({
    bind: (fn) => maybe(fn.call(this, value)),
  });

  if (typeof value === "undefined" || value === null) {
    return nothing;
  }

  return something(value);
};

const street1 = maybe(person)
  .bind((p) => p["address"])
  .bind((a) => a["street"]);

if (street1 === null) {
  console.log("Street not found");
} else {
  // Error here: state is not defined
  street1.bind((value) => console.log(value));
}

// 4. Eliminate if...else

console.log('========= 4. Eliminate if...else =========')

maybe = (value) => {
  const nothing = {
    bind: (fn) => this,
    isNothing: () => true,
    maybe: (def, fn) => def,
    emit: () => {
      throw new Error("Nothing to Emit");
    },
  };

  const something = (value) => ({
    bind: (fn) => maybe(fn.call(this, value)),
    isNothing: () => false,
    emit: () => value,
    maybe: (def, fn) => fn.call(this, value),
  });

  if (typeof value === "undefined" || value === null) {
    return nothing;
  }

  return something(value);
};

const personWithoutAddressStreet = {
  name: "Alvin",
  email: "alvin@palo-it.com",
  address: {},
};

console.log(
  maybe(personWithoutAddressStreet)
    .bind((p) => p["address"])
    .bind((a) => a["street"])
    .maybe("Street unknown", (err) => err)
);


console.log('========= The 3 Laws of Monad =========')

// Proving Left identity
console.log(
  maybe(person)
    .bind((p) => p["address"])
    .emit()
);
console.log(maybe(person["address"]).emit());

// Proving right identity
console.log(
  maybe(person)
    .bind((p) => p)
    .emit()
);
console.log(maybe(person).emit());

// Proving Associativity
console.log(
  maybe(person)
    .bind((p) => p["address"])
    .bind((a) => a["street"])
    .emit()
);

const funcP = (p) => p["address"];
const funcA = (a) => a["street"];

console.log(
  maybe(person)
    .bind((person) => {
      return funcA(funcP(person));
    })
    .emit()
);
