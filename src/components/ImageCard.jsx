import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import Card from 'react-bootstrap/Card'
import { useAuthContext } from '../contexts/AuthContext'
import useDeleteImage from '../hooks/useDeleteImage'
import Button from 'react-bootstrap/Button'

const ImageCard = ({ image, refetchQuery }) => {
  const { currentUser } = useAuthContext()
  const deleteImage = useDeleteImage(image)

  const handleDeleteImage = async () => {
	  await deleteImage.mutate()

	  //invalidate query
	  refetchQuery()
  }

  return (
    <Card
      className={`image-card ${
        deleteImage.isMutating ? 'mutating' : ''
      }`}
    >
      <Card.Header>
        <span className="image-filrname" title={image.name}>
          {image.name}
        </span>
        <div className="card-actions">
          {image.owner === currentUser.uid && (
            <Button
              variant="danger"
              size="sm"
              disabled={deleteImage.isMutating}
			  onClick={deleteImage.mutate}
			  onClick={handleDeleteImage}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          )}
        </div>
      </Card.Header>
      <Card.Img variant="top" src={image.url} title={image._id} />
      <Card.Footer>{image.owner}</Card.Footer>
    </Card>
  )
}

export default ImageCard
