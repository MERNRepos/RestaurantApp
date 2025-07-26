// const x = [1, 2, 3, { "-1": 0 }];
// x[-1] = 0;

// console.log(x);
// console.log(x.length);

// function foo() {
//   setTimeout(function () {
//     console.log("Hello");
//   }, 0);
//   console.log("World");
// }
// foo();

const data = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" },
];

const result = data.some((item) => item.name.length > 4);
console.log(result);
