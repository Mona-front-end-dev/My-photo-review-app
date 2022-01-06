import React, { useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const LogoutPage = () => {
  const { logout } = useAuthContext()
  const navigate = useNavigate()

  useEffect(async () => {
    await logout()
    navigate('/login')
  }, [])

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Log out</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default LogoutPage
