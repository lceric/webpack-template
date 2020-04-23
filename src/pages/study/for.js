// 这段代码会怎么执行
// for (;;) {
//   console.log('1111');
//   break
// }
// for (var i = 0, m = 1; m < 3; m++) {
//   console.log(i, m)
// }

// var i = 0, m = 1
// for (; m < 3;) {
//   console.log(i, m)
//   m++
// }

// var i = 0
// for (; i < 3;) {
//   console.log(i)
//   i++
// }
// console.log(i)

// let m
// for (let m = 0; m < 3; m++) {
//   console.log(m) // 0, 1, 2
// }
// console.log(m) // undefined

// let m = 2
// for (let m = 0; m < 3; m++) {
//   console.log(m) // 0, 1, 2
// }
// console.log(m) // 2

// let a = 2
// for (let a = []; a.length < 5; a.push(a)) {
//   console.log(a) // 0, 1, 2
// }
// console.log(a) // 2
console.log(document, document.styleSheets)
console.log(document.documentElement, document.documentElement.style)