import React from 'react';
import {connect} from 'react-redux';

import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
    <ul>
        {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}
    </ul>
);

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL': return todos;
        case 'SHOW_COMPLETED': return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE': return todos.filter(t => !t.completed);
    }
}

const mapStateToDoListProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    };
};

const mapDispatchToDoListProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            dispatch({
                type: 'TOGGLE_TODO',
                id
            })
        }
    }
};

export default connect(mapStateToDoListProps, mapDispatchToDoListProps)(TodoList);
