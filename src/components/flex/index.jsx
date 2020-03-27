
import React from 'react'
import './index.scss'

const FlexBox = () => {
  console.log(typeof [])
  console.log([] instanceof Object)
  console.log(Object.prototype.toString.call([])) // 更加准确的判断某个变量的类型
  /**
   * [].slice.call(arguments)
      Array.from(arguments)
      [...arguments]
   */
  function fun(n, o) {
    console.log(o);
    return {
      fun: function (m) {
        return fun(m, n);
      }
    };
  }
  var a = fun(0); a.fun(1); a.fun(2); a.fun(3);//undefined,0,0,0
  var b = fun(0).fun(1).fun(2).fun(3);//undefined,0,1,2
  console.log(b)
  var c = fun(0).fun(1); c.fun(2); c.fun(3);//undefined,0,1,1

  function unique(arr) {
    return arr.filter((v, i, a) => {
      return a.indexOf(v) === i;
    })
  }

  function unique(arr) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      throw new Error('arr is not Array')
    }
    const res = []
    let obj = {}
    // for循环
    for (let i = 0, len = arr.length; i < len; i++) {
      if (!obj[arr[i]]) {
        res.push(arr[i])
        obj[arr[i]] = true
      }
    }
    // ES6
    arr.forEach(item => {
      if (!obj[item]) {
        res.push(item)
        obj[item] = true
      }
    })
    return res
  }
  console.log(unique([1, 2, 3, 3, 4, 5, 6, 4, 3]))

  Function.prototype.myCall = function (context, ...args) {
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
  }

  Function.prototype.myApply = function (context, args) {
    context.fn = this
    const result = context.fn(args)
    delete context.fn
    return result
  }
  Function.prototype.myBind = function (context, ...args) {
    return () => {
      return this.myApply(context, args)
    }
  }

  function myNew(Ctor, ...args) {
    const obj = Object.create(Ctor, args)
    const res = Ctor.apply(obj, args)
    return res instanceof Object ? res : obj
  }

  Array.prototype.myMap = function (fn) {
    const arr = this
    const res = []
    for (let i = 0; i < arr.length; i++) {
      res.push(fn(arr[i], i, arr))
    }
    return res
  }
  Array.prototype.myFilter = function (fn) {
    const arr = this
    const res = []
    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i], i, arr)) {
        res.push(arr[i])
      }
    }
    return res
  }
  function debounce(fn, delay = 1000) {
    let timer
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay);
    }
  }
  function throttle(fn, delay = 1000) {
    let timer
    return () => {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(fn, arguments)
          timer = null
        }, delay);
      }
    }
  }

  function colneDeep(obj) {
    if (typeof obj !== 'object' || obj == null) {
      return obj
    }
    const target = Array.isArray(obj) ? [] : {}
    for (let keys in obj) {
      // 判断对象是否存在非继承的自身属性
      if (Object.prototype.hasOwnProperty.call(obj, keys)) {
        if (typeof obj[keys] === 'object' && obj[keys] !== null) {
          target[keys] = colneDeep(obj[keys])
        } else {
          target[keys] = obj[keys]
        }
      }
    }
    return target
  }

  function first() {
    console.log('first')
    second()
    console.log('again first')
  }
  function second() {
    console.log('second')
  }
  first()
  console.log('global')
  function Person() {
    this.name = 'lisi'
    this.age = 12
  }
  Person.prototype.getName = function () {
    return this.name
  }
  Person.prototype.setName = function (name) {
    this.name = name
  }
  console.log(Person.prototype)
  function Student() {
    Person.call(this)
  }
  Student.prototype = Object.create(Person.prototype)
  Student.prototype.getAge = function () {
    console.log(this, 'age')
  }
  Student.prototype.constructor = Student
  console.log(Student)
  return (
    <div className='wrapper'>
      <div className="container">
        <div className="item">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
        <div className="item">4</div>
        <div className="item">5</div>
      </div>
    </div>
  )
}

export default FlexBox
