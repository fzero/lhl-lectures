/*
This file contains all possible actions that can be performed on the app.

Actions are objects containing payloads of information that send data from your
application to your store. They are the only source of information for the store.
You send them to the store using store.dispatch().

What you're seeing below are _action creators_ - functions that return an action.

See: https://redux.js.org/basics/actions

Reducers (see ../reducers) use the return value of these functions to
modify the global state.
*/
let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

/*
This exported object defines constants containing all possible visibility
filters. Its values are used throughout the app. This isn't strictly necessary,
but it's considered a good practice.
*/
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
