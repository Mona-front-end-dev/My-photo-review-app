import React, { useState } from 'react'
import { collection, query } from 'firebase/firestore'
import { useFirestoreQueryData} from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'

const HomePage = () => {
	const { currentUser } = useAuthContext()
	const [image, setImage] = useState(null)

	const handleFileChange = (e) => {
		if (e.target.files[0]){
			setImage(e.target.files[0])
		}
		console.log('File changed!', e.target.files[0])
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!image){
			return
		}

		// create reference to be able to upload a file
		const fileRef = ref(storage, image.name)

		try {
			//upload image to fileRef
			const uploadResult = await uploadBytes(fileRef, image)
			console.log('Success!', uploadResult)
		} catch (e) {
			console.log('not success', e)
		}
	}

	const handleReset = () => {
		setImage(null)
	}

	return (
		<Container className='py-3'>
			<h1>Welcome to my photo app</h1>
			{currentUser ? <p>You are logged in as {currentUser.email} !</p> : <p>You are not logged in yet</p>}

			<Form onSubmit={handleSubmit} onReset={handleReset}>
				<Form.Group controlId='formImage' className='mb-3'>
					<Form.Label>Choose image to upload</Form.Label>
					<Form.Control type='file' onChange={handleFileChange}/>

					<Form.Text className='text-muted'>
						{
							image ? `${image.name} (${Math.round(image.size/1024)} KB)` : 'No image selected'
						}
					</Form.Text>
				</Form.Group>

				<Button type="submit" variant="primary">Upload</Button>
				<Button type="reset" variant="danger">Reset</Button>
			</Form>


		</Container>
	)
}

export default HomePage
