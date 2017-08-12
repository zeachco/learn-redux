import React from 'react';
import {connect} from 'react-redux';

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
export default connect()(AddTodo);

