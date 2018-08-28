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
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

// [1] This wraps Link in a container component
export default connect(
  mapStateToProps,   // [2]
  mapDispatchToProps // [3]
)(Link)
