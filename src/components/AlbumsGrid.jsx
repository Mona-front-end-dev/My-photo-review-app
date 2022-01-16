import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { BeatLoader } from 'react-spinners'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const AlbumsGrid= ({ query }) => {
  if (query.isError) {
    return <Alert variant="warning">{query.isError}</Alert>
  }

  if (query.isLoading) {
    return <BeatLoader color="#888" />
  }

  return (
    query.data && (
      <Col>
        {query.data.map((album) => (
          <Link key={album._id} to={`/album/${album.albumId}`}>
            <h1 className="p-3">
              <FontAwesomeIcon icon={faFolder} className="display-block" />
              <div> {album.name}</div>
            </h1>
          </Link>
        ))}
      </Col>
    )
  )
}

export default AlbumsGrid
