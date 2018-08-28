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
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

// [1] This wraps TodoList in a container component
export default connect(
  mapStateToProps,   // [2]
  mapDispatchToProps // [3]
)(TodoList)
