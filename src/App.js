import React from 'react';
import Dot from './components/dot';
import CircleAdaptive from './components/circle-adaptive';
import Line from './components/line';
import PureComponentComponent from './components/pureComponent-component';
import FlexBox from './components/flex';
import Counter from './components/counter';

function App() {
  let [count, setCount] = React.useState(0)
  const onMinus = () => {
    if (!count) {
      return false
    }
    setCount(count - 1)
  }
  const onPlus = () => {
    if (!count) {
      return false
    }
    setCount(count++)
  }
  const onChangeCount = (e) => {
    console.log(e)
    if (/^\d+$/.test) {
      setCount(parseInt(e.target.value))
    }
  }
  return (
    <div className="App">
      <Dot />
      <CircleAdaptive />
      <Line />
      <FlexBox />
      <PureComponentComponent />
      <Counter count={count} onMinus={onMinus} onPlus={onPlus} onChangeCount={onChangeCount} />
    </div>
  );
}

export default App;
