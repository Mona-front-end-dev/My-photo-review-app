import React from 'react'
import Card from 'react-bootstrap/Card'

const ImageCard = ({ image }) => {
  return (
    <Card>
      <Card.Header>{image.name}</Card.Header>
      <Card.Img variant="top" src={image.url} title={image._id} />
      <Card.Footer>{image.owner}</Card.Footer>
    </Card>
  )
}

export default ImageCard
