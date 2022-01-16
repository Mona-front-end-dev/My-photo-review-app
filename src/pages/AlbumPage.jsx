import React, { useState } from 'react'
import useImages from '../hooks/useImages'
import ImagesGrid from '../components/ImagesGrid'
import UploadImage from '../components/UploadImage'
import { useParams, Link } from 'react-router-dom'
import useSingleAlbum from '../hooks/useSingleAlbum'
import useUpdateAlbum from '../hooks/useUpdateAlbum'
import { Button, Modal } from 'react-bootstrap'
import useCreateImage from '../hooks/useCreateImage'
import useCreateAlbum from '../hooks/useCreateAlbum'

const AlbumPage = () => {
	const [onEdit, setOnEdit] = useState(false);
	const [selections, setSelections] = useState([])
	const [name, setName] = useState('');
	const [show, setShow] = useState(false);
	const [newAlbumName, setNewAlbumName] = useState(null);

	const {albumId} = useParams();
	const imagesQuery = useImages(albumId)
	const createImageQuery = useCreateImage()
	const createAlbumQuery = useCreateAlbum()
	const albums = useSingleAlbum(albumId);

	const reviewLink = `${window.location.origin}/review/${albumId}`

  const handleClose = () => setShow(false);

  const currentAlbum = albums.data?.find(a => a.albumId === albumId);

	const updateInputValue = albumName => {
		setName(albumName)
	}

	const UpdateTitle = async () => {
		await useUpdateAlbum(name, currentAlbum._id)
		albums.refetch()
		setOnEdit(false)
	}

	const onSelection = image => {
		const index = selections.findIndex(img => image._id === img._id);
		const newSelections = [...selections];

		if(index === -1){
			// Add selected item
			newSelections.push(image);
		} else {
			// remove selected item
			newSelections.splice(index, 1);
		}

		setSelections(newSelections)
	}

	const onCreateAlbumHandler = () => {
			setShow(true)
	}

	const onNewAlbumNameChangeHandler = (albumName) => {
		setNewAlbumName(albumName)
	}

	const doCreateAlbumHandler = async () => {
		const newAlbumId = await createAlbumQuery.mutate(newAlbumName)

		selections.forEach(async img => {
			await createImageQuery(img, newAlbumId)
		})

		setShow(false)
	}

  return (
    <>
		{ currentAlbum ?
		<div className="d-flex align-items-center">
			<h1 className="mb-0">
				{currentAlbum?.name}
			</h1>
			<span className="ms-4 edit-button" onClick={() => setOnEdit(true)}>Edit</span>
		</div>
			:
		<h1>Loading ...</h1>
		}

		{
			onEdit ?
			<div>
				<input type="text" onChange={(e) => updateInputValue(e.target.value)} />
				<button type="button" disabled={! name.length} onClick={UpdateTitle}>Update</button>
			</div>
			:
			null
		}

		<hr />
		<p>
	 		Review Link: <Link to={`/review/${albumId}`}>{reviewLink}</Link>
		</p>
		<UploadImage query={imagesQuery} albumId={albumId}/>
      	<ImagesGrid query={imagesQuery} onSelectionCallback={onSelection} selectedImages={selections}/>
		<Button variant="primary" className="btn-success" disabled={! selections.length} onClick={onCreateAlbumHandler}>Create New Album</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose A Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
			<p>Please choose a name for your new album</p>
			<input onChange={e => onNewAlbumNameChangeHandler(e.target.value)} type="text"/>
		</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={doCreateAlbumHandler}>
            Create Album
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AlbumPage
