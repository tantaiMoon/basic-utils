
import React from 'react'
import './index.scss'

const Line = () => {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: '1px', background: '#666', overflow: 'hidden' }}></div>
      <hr size='1'></hr>
      <div className='box'></div>
    </div>
  )
}

export default Line
