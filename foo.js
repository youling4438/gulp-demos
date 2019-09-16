const foo = "hello rollup";
const bar = "hello gulp";
export default function() {
    console.log("foo.js running");
    console.log("foo", foo);
    console.log("foo", bar);
}

const ar = [1, 2, 3, 4, 5].concat([1, 2, 3, 3, 4, 5]);
const arr = [...new Set(ar)];
arr.forEach((e, i) => {
    console.log("i:", i);
    console.log("e:", e);
});
