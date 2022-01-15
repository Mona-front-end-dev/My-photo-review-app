import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { BeatLoader } from 'react-spinners'
import { Col } from 'react-bootstrap'

const AlbumGrid = ({ query }) => {
  if (query.isError) {
    return <Alert variant="warning">{query.isError}</Alert>
  }

  if (query.isLoading) {
    return <BeatLoader color="#888" />
  }

  return (
    query.data && (
      <Col>
          {query.data.map(album => (
            <h5 key={album._id}>{album.name}</h5>
          ))}
      </Col>
    )
  )
}

export default AlbumGrid
