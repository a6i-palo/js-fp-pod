/*
The function always returns the same result if the same arguments are passed in.
It does not depend on any state, or data, change during a program's execution.
It must only depend on its input arguments.
*/
// fn(x) => y

const max = Math.max(2, 8, 5, 10);
console.log(max);

const double = (x) => x * 2;
console.log(double(5));
