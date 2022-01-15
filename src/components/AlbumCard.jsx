import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { BeatLoader } from 'react-spinners'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

const AlbumCard = ({ query }) => {
  if (query.isError) {
    return <Alert variant="warning">{query.isError}</Alert>
  }

  if (query.isLoading) {
    return <BeatLoader color="#888" />
  }

  const openAlbumHandler = () => {
	console.log('you have clicked on an album')
	
  }
  return (
    query.data && (
      <Col>
        {query.data.map((album) => (
          <div key={album._id}>
            <h1 onClick={openAlbumHandler} className="p-3">
              <FontAwesomeIcon icon={faFolder} className="display-block" />
              <div> {album.name}</div>
            </h1>
          </div>
        ))}
      </Col>
    )
  )
}

export default AlbumCard
