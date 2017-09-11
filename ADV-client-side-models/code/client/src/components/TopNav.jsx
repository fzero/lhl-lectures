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
      <NavItem eventKey={1} href="/products">
        Products
      </NavItem>

      <NavItem eventKey={2} href="/clients">
        Clients
      </NavItem>
    </Nav>

  </Navbar>
)

export default TopNav
