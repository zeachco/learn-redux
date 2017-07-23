import React, { Component } from 'react';

let nextTodoId = 0;
class TodoApp extends Component {
    render() {
        return (
            <div>
                <input ref={node => { 
                    this.input = node;
                    }}/>
                <button onClick={() => {
                    this.props.store.dispatch({
                        id: ++nextTodoId,
                        text: this.input.value,
                        type: 'ADD_TODO'
                    });
                    this.input.value = '';
                }}>
                    Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo =>
                        <li key={todo.id} onClick={ () => {
                                this.props.store.dispatch({
                                    type: 'TOGGLE_TODO',
                                    id: todo.id
                                })
                            }} style={{textDecoration: todo.completed ? 'line-through' : 'none', cursor:'pointer'}}>
                            {todo.text}
                        </li>
                    )}
                </ul>
                <p> 
                    Show: {''}
                    <FilterLink filter='SHOW_ALL' >Show All</FilterLink>
                    {/*<FilterLink filter='SHOW_ALL' >Show All</FilterLink>
                    <FilterLink filter='SHOW_ACTIVE' > Active</FilterLink>
                    <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>*/}
                </p>
            </div>
        )
    }
}


const FilterLink = (filter, children) => {
    return(
        <p>Test</p>
        // <a href="#" onClick={ (e) => {
        //     e.preventDefault();
        //     {/*store.dispatch({
        //         type: 'SET_VISIBILITY_FILTER',
        //         filter
        //     })*/}
        //     }}> {children} </a>
    );
}
export default TodoApp;