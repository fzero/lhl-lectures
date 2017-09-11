import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

const TopNav = (props) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'>
          The app!
        </Link>
      </Navbar.Brand>
    </Navbar.Header>

    <Nav>
      <NavItem eventKey={1}>
        <Link to="/products">Products</Link>
      </NavItem>

      <NavItem eventKey={2}>
        <Link to="/clients">Clients</Link>
      </NavItem>
    </Nav>

  </Navbar>
)

export default TopNav
