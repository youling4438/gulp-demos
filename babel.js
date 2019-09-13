const arr = Array.from(new Set(NaN, NaN, {}, {}, 1, 2, 3, 1, 3));
console.log("arr", arr);
const obj = { a: "a", c: "c", arr };
const { a, b } = obj;
console.log("a", a);
console.log("b", b);
