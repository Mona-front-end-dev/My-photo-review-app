import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage'
import { db, storage } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Alert from 'react-bootstrap/Alert'

const UploadImage = () => {
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState()
  const [uploadProgress, setUploadProgress] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
    console.log('File changed!', e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setUploadProgress(null)

    if (!image) {
      return
    }

    // generate a uuid for the file
    const uuid = uuidv4()

    // find the file extension
    const extension = image.name.substring(image.name.lastIndexOf('.') + 1)

    // create reference to be able to upload a file
    const fileRef = ref(storage, `images/${uuid}.${extension}`)

    // Upload image to fileRef
    const uploadTask = uploadBytesResumable(fileRef, image)

    // attach upload observer
    uploadTask.on(
      'state_changed',
      (uploadTaskSnapshot) => {
        setUploadProgress(
          Math.round(
            (uploadTaskSnapshot.bytesTransferred /
              uploadTaskSnapshot.totalBytes) *
              100,
          ),
        )
      },
      (e) => {
        console.log('Fail!', e)

        setMessage({
          type: 'warning',
          msg: `Image failed to upload due to this error: ${e.message}`,
        })
      },
      async () => {
        // get download url to upload file
        const url = await getDownloadURL(fileRef)

        //get rference to collection images
        const collectionRef = collection(db, 'image')

        // create document in db for the uploaded file
        await addDoc(collectionRef, {
          name: image.name,
          path: fileRef.fullPath,
          size: image.size,
          type: image.type,
          url,
		  uuid,
		  extension
        })
        setMessage({
          type: 'success',
          msg: 'Greate! Image uploaded',
        })
      },
    )
  }
  const handleReset = () => {
    setImage(null)
    setMessage(null)
    setUploadProgress(null)
  }

  return (
    <>
	{message && <Alert variant={message.type}>{message.msg}</Alert>}
      <Form onSubmit={handleSubmit} onReset={handleReset}>
        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>Choose image to upload</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />

          <Form.Text className="text-muted">
            {image
              ? `${image.name} (${Math.round(image.size / 1024)} KB)`
              : 'No image selected'}
          </Form.Text>
        </Form.Group>

        <Button type="submit" variant="primary">
          Upload
        </Button>
        <Button type="reset" variant="danger" className="mx-3">
          Reset
        </Button>
      </Form>
      {uploadProgress && (
        <ProgressBar
          now={uploadProgress}
          label={`${uploadProgress}%`}
          className="my-3"
          animated
          striped
          variant="success"
        />
      )}
    </>
  )
}

export default UploadImage
