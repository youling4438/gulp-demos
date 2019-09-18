const foo = "hello rollup";
const bar = "hello gulp";
const { a, b } = require("a");
export default function() {
    console.log("foo.js running");
    console.log("foo", foo);
    console.log("bar", bar);
    console.log("a", a);
    console.log("a", b);
}

const ar = [1, 2, 3, 4, 5].concat([1, 2, 3, 3, 4, 5]);
const arr = [...new Set(ar)];
arr.forEach((e, i) => {
    console.log("i:", i);
    console.log("e:", e);
});

const all = (arr, fn = Boolean) => arr.every(fn);

const allEqual = arr => arr.every(val => val === arr[0]);

const any = (arr, fn = Boolean) => arr.some(fn);

export { all, allEqual, any };
