import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.css'

const Navigation = () => {
	
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Link to="/">
          <span className="router-link">Photo Gallary 🖼️</span>
        </Link>
        <div display="flex">
          <Link to="/signup" >
            <span className="router-link">Sign up</span>
          </Link>
          <Link to="/login">
            <span className="router-link">Login</span>
          </Link>
          <Link to="/logout">
            <span className="router-link">Logout</span>
          </Link>
        </div>
      </Container>
    </Navbar>
  )
}

export default Navigation
