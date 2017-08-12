import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import TodoApp from './TodoApp';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { todoApp } from './todos';



// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


ReactDOM.render(
    <Provider store={createStore(todoApp)}>
        <TodoApp />
  </Provider>,
    document.getElementById('root')
);



