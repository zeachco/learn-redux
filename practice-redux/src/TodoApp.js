import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddTodo from './Components/AddTodo';
import TodoList from './Components/TodoList';
import Footer from './Components/Footer';

const TodoApp = () => {
    return (
        <div>
            <AddTodo />
            <TodoList />
            <Footer />
        </div>
    )
}

export default TodoApp;
