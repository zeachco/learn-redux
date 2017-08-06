import React, { Component } from 'react';
import { createStore } from 'redux';
import { todoApp } from './todos';

let nextTodoId = 0;
const store = createStore(todoApp);
const TodoApp = () => {
    return (
        <div>
            <AddTodo />

            <VisibleTodoList />

            <Footer />

        </div>
    )
}

const AddTodo = () => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }} />
            <button onClick={() => {
                store.dispatch({
                    id: ++nextTodoId,
                    text: input.value,
                    type: 'ADD_TODO'
                });
                input.value = '';
            }}>
                Add Todo
                </button>
        </div>
    )
}


class VisibleTodoList extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate() //React method that updates the state of the component.
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();
        return (
            <TodoList todos={getVisibleTodos(state.todos, state.visibilityFilter)} onTodoClick={id =>
                store.dispatch({
                    type: 'TOGGLE_TODO',
                    id
                })} />
        )
    }
}

const Footer = () => {
    return (
        <p>
            Show:
            {' '}
            <FilterLink filter='SHOW_ALL' >All</FilterLink>
            {' '}
            <FilterLink filter='SHOW_ACTIVE' > Active</FilterLink>
            {' '}
            <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
        </p>
    )
}

class FilterLink extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate() //React method that updates the state of the component.
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        const props = this.props;
        const state = store.getState();
        return (
            <Link active={props.filter === state.visibilityFilter}
                onClick={() =>
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }
            >
                {props.children}
            </Link>
        )
    }
}


const Todo = ({
    onClick,
    completed,
    text
}) => (
        <li onClick={onClick} style={{ textDecoration: completed ? 'line-through' : 'none', cursor: 'pointer' }}>
            {text}
        </li>
    );


const TodoList = ({
    todos,
    onTodoClick
}) => (
        <ul>
            {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}
        </ul>
    );



const Link = ({ active, children, onClick }) => {
    if (active) {
        return <span>{children}</span>
    }
    return (
        <a href="javascript:void(0)" onClick={(e) => {
            e.preventDefault();
            onClick();
        }}> {children} </a>
    );
}



const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
    }
}
export default TodoApp;