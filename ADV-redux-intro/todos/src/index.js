/*
This app is a slightly modified and commented version of the To Do example
on the Redux docs: https://redux.js.org/basics/exampletodolist
*/
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './components/App'
import rootReducer from './reducers'
import './index.css'

const store = createStore(rootReducer)
/*
The line above creates the store, where the entire state of the app will be stored.

The store has the following responsibilities:
    Holds application state;
    Allows access to state via getState();
    Allows state to be updated via dispatch(action);
    Registers listeners via subscribe(listener);
    Handles unregistering of listeners via the function returned by subscribe(listener).

It's important to note that you'll only have a single store in a Redux application.

See: https://redux.js.org/basics/store

On top of that, the react-redux package gives us the <Provider> component, which passes
the store down to app components.

See: https://redux.js.org/basics/usagewithreact#passing-the-store
*/

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
