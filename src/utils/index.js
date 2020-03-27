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


// 保持引用关系的克隆对象
function cloneForce(x) {
  // =============
  const uniqueList = []; // 用来去重
  // =============

  let root = {};

  // 循环数组
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    }
  ];

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    // =============
    // 数据已经存在
    let uniqueData = find(uniqueList, data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      continue; // 中断本次循环
    }

    // 数据不存在
    // 保存源数据，在拷贝数据中对应的引用
    uniqueList.push({
      source: data,
      target: res,
    });
    // =============

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

function find(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].source === item) {
      return arr[i];
    }
  }

  return null;
}



// 层级较多
function cloneLoop(x) {
  const root = {};

  // 栈
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: x,
    }
  ];

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop();
    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      res = parent[key] = {};
    }

    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (typeof data[k] === 'object') {
          // 下一次循环
          loopList.push({
            parent: res,
            key: k,
            data: data[k],
          });
        } else {
          res[k] = data[k];
        }
      }
    }
  }

  return root;
}

// 深拷贝，一般数据的拷贝
JSON.parse(JSON.stringify(source))


function isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}
function clone(source) {
  if (!isObject(source)) return source;
  var target = {};
  for (var i in source) {
    if (source.hasOwnProperty(i)) {
      if (typeof source[i] === 'object') {
        target[i] = clone(source[i]); // 注意这里
      } else {
        target[i] = source[i];
      }
    }
  }

  return target;
}


class myPromise {
  constructor(fn) {
    this.state = 'PENDING'
    this.value = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []
    const resolve = value => {
      if (this.state = 'PENDING') {
        this.state = 'RESOLVED'
        this.value = value
        this.resolvedCallbacks.map(cb => cb())
      }
    }
    const reject = value => {
      if (this.state = 'PENDING') {
        this.state = 'REJECTED'
        this.value = value
        this.rejectedCallbacks.map(cb => cb())
      }
    }

    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  static resolve(val) {
    return new myPromise(resolve => {
      resolve(value)
    })
  }
  static reject(err) {
    return new myPromise((resolve, reject) => {
      reject(err)
    })
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }
    if (this.state === 'PENDING') {
      this.resolvedCallbacks.push(() => {
        onResolved(this.value)
      })
      this.rejectedCallbacks.push(() => {
        onRejected(this.value)
      })
    }
    if (this.state === 'RESOLVED') {
      onResolved(this.value)
    }
    if (this.state === 'REJECtED') {
      onRejected(this.value)
    }
  }
  catch(fn) {
    return this.then(null, fn)
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    })
  }
  static all(promises) {
    const arr = [];
    let i = 0;
    function processData(index, data, resolve) {
      arr[index] = data;
      i++;
      if (i === promises.length) {
        resolve(arr);
      }
    }
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(data => {
          processData(i, data, resolve);
        }, reject);
      }
    })
  }
}

// 其他参数在opts内
function jsonp(url, opts) {
  // 实现Promise化
  return new Promise((resolve, reject) => {
    // 自增值初始化 
    let count = 0;
    //设置默认参数
    const {
      prefix = '__jp',
      param = 'callback',
      timeout = 60000,
      data = {}
    } = opts;
    let name = prefix + count++;
    let timer;
    //清除script标签以及注册的全局函数以及超时定时器
    function cleanup() { // 清除函数
      if (script.parentNode) {
        script.parentNode.removeChild(script);
        window[name] = null;
        if (timer) {
          clearTimeout(timer);
        }
      }
    }
    if (timeout) { // 超时
      timer = setTimeout(() => {
        cleanup();
        reject('timeout');
      }, timeout);
    }
    // 注册全局函数，等待执行中...
    window[name] = res => {
      // 只要这个函数一执行，就表示请求成功，可以使用清除函数了
      if (window[name]) {
        cleanup();
      }
      // 将请求到的数据扔给then
      resolve(res);
    }
    // 以下将data对象格式的参数拼接到url的后面
    let str = '';
    for (const key in data) {
      const value = data[key] !== undefined ? data[key] : '';
      str += `&${key}=${encodeURIComponent(value)}`;
    }
    url = url + (url.indexOf('?') > 0 ? '' : '?') + str.substr(1);
    // 最后加上与服务端协商的jsonp请求字段
    url = `${url}&${param}=${name}`;
    const script = document.createElement('script');
    script.src = url;
    // 以下这条执行且成功后，全局等待函数就会被执行
    document.head.appendChild(script);
  })
}
