import React from 'react';
import Dot from './components/dot';
import CircleAdaptive from './components/circle-adaptive';
import Line from './components/line';
import PureComponentComponent from './components/pureComponent-component';
import FlexBox from './components/flex';

function App() {
  return (
    <div className="App">
      <Dot />
      <CircleAdaptive />
      <Line />
      <FlexBox />
      <PureComponentComponent />
    </div>
  );
}

export default App;
