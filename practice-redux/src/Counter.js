import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';

const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT' : 
      return state + 1;
    case 'DECREMENT' : 
      return state - 1;
    default:
      return state;
  }
}
const store = createStore(counter);
// store.subscribe(Counter);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      counterValue : store.getState()
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);

  }

  increment(){
    store.dispatch({
      type: 'INCREMENT'
    });
    let counterValue = store.getState();
    this.setState({ counterValue });
  }

  decrement(){
    store.dispatch({
      type: 'DECREMENT'
    });
    let counterValue = store.getState();
    this.setState({ counterValue });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
          <Counter value={this.state.counterValue} increment={this.increment} decrement={this.decrement}/>
        </div>
      </div>
    );
  }
}

function Counter(props) {
  return (
    <div>
      <h1>{props.value}</h1>
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
    </div>
  );
}

export default App;
