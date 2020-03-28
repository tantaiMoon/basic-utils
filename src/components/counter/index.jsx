import React from 'react'

class Counter extends React.Component {
  render() {
    const { count, onMinus, onPlus, onChangeCount } = this.props
    return (
      <div>
        <button onClick={onMinus}>-</button>
        <input value={count || ''} onChange={onChangeCount} />
        <button onClick={onPlus}>+</button>
      </div>
    )
  }
}
export default Counter
