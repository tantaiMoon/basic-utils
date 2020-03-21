
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
