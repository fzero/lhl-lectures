import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Grid} from 'react-bootstrap'

import TopNav from './TopNav'
import Clients from './Clients'
import Products from './Products'
import Dashboard from './Dashboard'

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
