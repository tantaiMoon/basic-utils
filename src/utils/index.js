import { memo } from "react"

// 对象深冻结（递归的方式）
export function deepFreeze(obj) {
  const propNames = Object.getOwnPropertyNames(obj)
  for (let name of propNames) {
    let value = obj[name]
    obj[name] = value && typeof value === 'object' ? deepFreeze(value) : value
  }
  return Object.freeze(obj)
}


// 手动实现缓存
// 缓存是一个建立函数的过程，这个函数能记住之前计算的结果或值，
// 为了避免在最后一次使用相同参数的计算中已经执行的函数的计算
export function memoize(fn) {
  const slice = Array.prototype.slice
  const cache = {}
  return (...args) => {
    const params = slice.call(args)
    console.log(params)
    if (cache[params]) {
      return cache[params]
    } else {
      let result = fn(...args)
      console.log('no cache')
      cache[params] = result
      return result
    }
  }
}


const makeFullName = (fName, lName) => `${fName} ${lName}`
const reduceAdd = (numbers, startingValue = 0) => numbers.reduce((total, cur) => total + cur, startingValue)

const memoizeMakeFullName = memoize(makeFullName)
const memoizeReduceAdd = memoize(reduceAdd)

memoizeMakeFullName('moyi', 'hello')
memoizeMakeFullName('moyi', 'hello')

memoizeReduceAdd([1, 2, 3, 4, 5], 5)
memoizeReduceAdd([1, 2, 3, 4, 5], 5)