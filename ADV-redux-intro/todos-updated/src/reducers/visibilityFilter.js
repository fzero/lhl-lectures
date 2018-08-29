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
import { VisibilityFilters } from '../actions'

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
