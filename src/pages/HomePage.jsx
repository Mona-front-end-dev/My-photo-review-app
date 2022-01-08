import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import Container from 'react-bootstrap/Container'

const HomePage = () => {
  const { currentUser } = useAuthContext()

  return (
    <Container className="py-3">
      <h1>Welcome to my photo app</h1>
      {currentUser ? (
        <p>You are logged in as {currentUser.email} !</p>
      ) : (
        <p>You are not logged in yet</p>
      )}
    </Container>
  )
}

export default HomePage
