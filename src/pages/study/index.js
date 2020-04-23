// this的指向
// console.log(this)
// function b() {
//   console.log(this)
// }
// b()
/**
 * 简单交通灯
 ********************************/
// let red = 3 // 3s
// let yellow = 1; // 1s
// let green = 1 // 1s

// function start() {
//   setInterval(() => {
//     if (red) {
//       console.log('red', red)
//       yellow = 1
//       green = 1
//       red--
//       return
//     }
//     if (red < 1 & yellow) {
//       console.log('yellow', yellow)
//       yellow--
//       return
//     }
//     if (yellow < 1 & green) {
//       console.log('green', green)
//       red = 3
//       return
//     }
//   }, 2000)
// }
/*
 * class
 ************************/
// class Base {
//   static instance() {
//     //TODO:返回绑定类的实例对象
//     const ci = new this()
//     console.log(this.name, ci.__proto__.constructor.name)
//     return ci
//   }
//   name1(){
//     //TODO:返回调用对象的类 名
//     return this.constructor.name
//   }
//   static name2() {
//     //TODO:返回绑定类的类名
//     // return this.prototype.constructor.name
//     return this.name
//   }
// }

// class A extends Base {
//   test() {
//     console.log(this)
//   }
// }
// class B extends Base {
// }
// console.log(A.instance().name1())
// console.log(B.instance().name1())
// console.log(A.name2())
// console.log(B.name2())
// console.log(new A)
// let newa = new A()
// newa.test()
// const assert = require('assert');
// assert. strictEqual (A.instance().name1(), 'A');
// assert. strictEqual(B.instance().name1(), 'B');
// assert. strictEqual(A.name2(), 'A');
// assert.strictEqual(B.name2(), 'B');
/**
 * static
 * **********/
class A {
  static getName() {
    return this.name + '——A'
  }
}
class B extends A {
  // static getName() {
  //   return this.name
  // }
}
console.log(
  A.getName(),
  B.getName()
)
// A--A, B

function MM() {}
console.log(function(){}.name)

function M() {
  // ...
}
// 相当于static
M.staticFn = function(){}
M.mc = '12'
// 原型方法，实例会继承
M.prototype.m = function() {}
let insM = new M
console.log(insM, insM.constructor.mc)
class NN {
  static m() {return '2'}
  c() {}
}
// 如果声明一个变量，则需要
NN.k = 'k'
let insNN = new NN
console.log(NN, insNN.constructor.k)