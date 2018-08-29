/*
Reducers specify how the application's state changes in response to actions sent
to the store. Remember that actions only describe what happened, but don't
describe how the application's state changes.

All reducers receive the current state (in this case an Array of to do's) and an
action (defined in ../actions). Depending on the action, the state is changed
accordingly.

See: https://redux.js.org/basics/reducers

Bear in mind that the state is never directly modified! A copy is made with the
necessary changes and then returned. This is because reducers are supposed to
be pure functions.
*/
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id)
    default:
      return state
  }
}

export default todos
