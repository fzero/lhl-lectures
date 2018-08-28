/*
This is a container component. In other words, this component would be
_stateful_ in an app that doesn't use Redux.

Container components must use either store.subscribe() to read the global state
or use the connect() function, which:
 1. creates a container component on the fly;
 2. receives a callback to receive props from the store; and
 3. receives a callback to dispatch actions to the store

See: https://redux.js.org/basics/usagewithreact#implementing-container-components
*/
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ dispatch }) => {
  let input

  const _submit = ev => {
    ev.preventDefault()
    if (!input.value.trim()) {
      return
    }
    dispatch(addTodo(input.value))
    input.value = ''
  }

  return (
    <section>
      <form className="todo-input" onSubmit={_submit}>
        <input type="text" ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </section>
  )
}

// [1] This wraps AddTodo in a container component and passes
// dispatch() down as a prop
export default connect()(AddTodo)
