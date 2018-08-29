/*
This file returns a combined reducer, which is exactly what it sounds like.
Reducer functions can get large, so it's a good idea to split them into separate
files. The problem is you don't want to complicate your life remember which
reducer does what, so Redux provides the combineReducers utility to make your
life easier.

See: https://redux.js.org/basics/reducers#splitting-reducers
*/
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  todos,
  visibilityFilter
})
