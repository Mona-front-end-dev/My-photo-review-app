import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { useAuthContext } from '../contexts/AuthContext'
import useDeleteImage from '../hooks/useDeleteImage'
import Button from 'react-bootstrap/Button'

const ImageCard = ({ image, refetchQuery, onSelectionCallback, isSelected }) => {
	const { currentUser } = useAuthContext()
  const deleteImage = useDeleteImage(image)

  const handleDeleteImage = async () => {
    await deleteImage.mutate()

    //invalidate query
    refetchQuery()
  }

  const onSelectImage = () => {
	onSelectionCallback(image)
  }

  return (
    <Card className={`image-card ${deleteImage.isMutating ? 'mutating' : ''}`}>
      <Card.Header className={isSelected ? 'selected-bg' : null}>
        <div className="card-actions">
            <div className="d-flex justify-content-between align-item-center">
            	{currentUser && <Button
                variant="danger"
                size="sm"
                disabled={deleteImage.isMutating}
                onClick={deleteImage.mutate}
                onClick={handleDeleteImage}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>}
              <span className="form-switch f-right">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={onSelectImage}
                  id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                ></label>
              </span>
            </div>
        </div>
      </Card.Header>
      <a href={image.url}>
        <Card.Img variant="top" src={image.url} title={image._id} />
      </a>
      <Card.Footer className={isSelected ? 'selected-bg' : null}>
		  Owner:{image.owner}
		</Card.Footer>
    </Card>
  )
}

export default ImageCard
