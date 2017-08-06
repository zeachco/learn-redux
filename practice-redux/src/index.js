import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import TodoApp from './TodoApp';
import registerServiceWorker from './registerServiceWorker';



// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


ReactDOM.render(<TodoApp />, document.getElementById('root'));



