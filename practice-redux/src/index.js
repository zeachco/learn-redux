import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import TodoApp from './TodoApp';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { todoApp } from './todos';


// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

const store = createStore(todoApp);

const render = () => {
    ReactDOM.render(<TodoApp todos={store.getState().todos} store={ store }/>, document.getElementById('root'));
}

store.subscribe(render);
render();

