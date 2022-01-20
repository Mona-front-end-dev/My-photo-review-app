import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button, Card, Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useHistory, useNavigate } from 'react-router-dom'

const SignupPage = () => {
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { signup } = useAuthContext()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		// user has to enter the same password
		if (passwordRef.current.value !== passwordConfirmRef.current.value){
			return setError('Oops!The password does not match.Enter the correct one!')
		}

		setError(null);

		// specify credentials for user
		try{
			setLoading(true)
			await signup(emailRef.current.value, passwordRef.current.value)
			 navigate('/')

		}catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}

	return (
		<>
			<Row>
				<Col>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Sign Up</Card.Title>
							{error && (<Alert variant="danger">{error}</Alert>)}

							<Form onSubmit={handleSubmit}>
								<Form.Group id="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Form.Group id="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} required />
								</Form.Group>

								<Form.Group id="password-confirm" className="mb-3">
									<Form.Label>Password Confirmation</Form.Label>
									<Form.Control type="password" ref={passwordConfirmRef} required />
								</Form.Group>

								<Button disabled={loading} type="submit">Create Account</Button>
							</Form>
						</Card.Body>
					</Card>

					<div className="text-center mt-3">
						Already have an account? <Link to="/login">Log In</Link>
					</div>
				</Col>
			</Row>
		</>
	)
}

export default SignupPage
