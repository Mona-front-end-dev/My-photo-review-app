import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.css'
import { useAuthContext } from '../../contexts/AuthContext'

const Navigation = () => {
  const { currentUser } = useAuthContext()
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Link to="/">
          <span className="logo">Gallary 🖼️</span>
        </Link>
        <Nav className="ms-auto">
          {currentUser ? (
            <>
              <NavLink to="/" className="nav-link">
                Albums
              </NavLink>
              <NavDropdown
                title={currentUser.displayName || currentUser.email}
                id="basic-nav-dropdown"
              >
                <NavLink to="/logout" className="dropdown-item">
                  Log Out
                </NavLink>
              </NavDropdown>
            </>
          ) : (
            <>
              <NavLink to="/signup" className="nav-link">
                Signup
              </NavLink>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation
