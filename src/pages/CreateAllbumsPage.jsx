import React from 'react'
import UploadImage from '../components/UploadImage'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import { db } from '../firebase'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection } from 'firebase/firestore'

const CreateAllbumsPage = () => {
  //create ref to collection images
  const imagesRef = collection(db, 'images')
  const { data, isLoading, isError } = useFirestoreQueryData(
    ['image'],
    imagesRef,
    {
      idField: '_id',
      subscribe: true,
    },
    {
      refetchOnMount: 'always',
    },
  )

  console.log(data)
  return (
    <>
      <h1>Images</h1>
      {isLoading && <p>Loading.. .</p>}
      <Row>
        {data &&
          data.map((image) => (
            <Col sm={6} md={4} lg={3} key={image._id}>
              <Card className="mb-3">
                <a href={image.url} target='_blank'>
                  <Card.Img variant="top" src={image.url} />
                </a>
                <Card.Body>
                  <Card.Text>
                    <>
                      {image.name} ({image.size} b)
                    </>
                    <>{image._id}</>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

      <hr className="my-3" />
      <UploadImage />
    </>
  )
}

export default CreateAllbumsPage
