import React, { Component } from 'react';

import { connect } from 'react-redux';


const TodoApp = () => {
    return (
        <div>
            <AddTodo />

            <VisibleTodoList />

            <Footer />

        </div>
    )
}


let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }} />
            <button onClick={() => {
                dispatch({
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
// If we call connect method without any arguments it will pass dispatch as a prop to the component it is being called
AddTodo = connect()(AddTodo);


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
const Todo = ({ onClick, completed, text }) => (
    <li onClick={onClick} style={{ textDecoration: completed ? 'line-through' : 'none', cursor: 'pointer' }}>
        {text}
    </li>
);
const TodoList = ({ todos, onTodoClick }) => (
    <ul>
        {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}
    </ul>
);
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
const VisibleTodoList = connect(mapStateToDoListProps, mapDispatchToDoListProps)(TodoList)


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
class FilterLink extends Component {

    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate() //React method that updates the state of the component.
        );
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const { store } = this.context;
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
FilterLink.contextTypes = {
    store: React.PropTypes.object
}

const mapStateToLinkProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: ownProps.filter
            })
        }
    }
};

const ConnectedFilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(FilterLink);

const Footer = () => {
    return (
        <p>
            Show:
            {' '}
            <ConnectedFilterLink filter='SHOW_ALL'>All</ConnectedFilterLink>
            {' '}
            <ConnectedFilterLink filter='SHOW_ACTIVE'> Active</ConnectedFilterLink>
            {' '}
            <ConnectedFilterLink filter='SHOW_COMPLETED'>Completed</ConnectedFilterLink>
        </p>
    )
}

export default TodoApp;