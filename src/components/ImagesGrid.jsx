import React from 'react'
import Masonry from 'react-masonry-css'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import { BeatLoader } from 'react-spinners'

const masonryBreakpoints = {
	default: 4,
	576: 2,
	768: 3,
	992: 4,
}

const ImagesGrid = ({ query }) => {
  if (query.isError) {
    return <Alert variant="warning">{query.isError}</Alert>
  }

  if (query.isLoading) {
    return <BeatLoader color="#888" />
  }
  return (
    query.data && (
      <Masonry
        breakpointCols={masonryBreakpoints}
        className="images-masonry"
        columnClassName="images-masonry-column"
      >
        {query.data.map((image) => (
          <Card key={image._id}>
            <Card.Header>{image.name}</Card.Header>
            <Card.Img variant="top" src={image.url} title={image._id} />
            <Card.Footer>{image.owner}</Card.Footer>
          </Card>
        ))}
      </Masonry>
    )
  )
}

export default ImagesGrid
