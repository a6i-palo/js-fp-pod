export const compose = (fn1, fn2) => inputObject => fn1(fn2(inputObject))
export const pipe = (...fns) => args => fns.reduce((arg, fn) => fn(arg), args);
