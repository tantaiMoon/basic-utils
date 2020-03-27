import React from 'react'

class Child extends React.Component {

  render() {
    console.log('child render')
    return <div>child</div>;
  }
}
class PureChild extends React.PureComponent {

  render() {
    console.log('PureChild child render')
    return <div>Pure child</div>;
  }
}

class PureCompoentComponent extends React.Component {
  state = {
    a: 1,
  };

  render() {
    console.log('render');
    return (
      <>
        <button
          onClick={() => {
            this.setState({ a: 2 });
          }}
        >
          Click me
        </button>
        <Child color={'red'} />
        <PureChild color={'red'} />
      </>
    );
  }
}

export default PureCompoentComponent