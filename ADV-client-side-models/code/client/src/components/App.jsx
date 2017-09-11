import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Grid} from 'react-bootstrap'

import TopNav from './TopNav'
import Clients from './Clients'
import Products from './Products'
import Dashboard from './Dashboard'

/*
This is the main app component. Notice that we're using react-router to change
*part* of the screen - the <TopNav> component stays put. The components that
whos up inside <Grid> are determined by the current browser URL. See
https://reacttraining.com/react-router/web/example/basic for more details.
*/

const App = (props) => (
  <div>
    <TopNav />
    <Grid>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/products" component={Products} />
        <Route path="/clients" component={Clients} />
      </Switch>
    </Grid>
  </div>
)

export default App
