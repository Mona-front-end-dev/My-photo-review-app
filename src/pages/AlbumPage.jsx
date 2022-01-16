import React, { useState } from 'react'
import useImages from '../hooks/useImages'
import ImagesGrid from '../components/ImagesGrid'
import UploadImage from '../components/UploadImage'
import { useParams } from 'react-router-dom'
import useAlbum from '../hooks/useAlbum'
import useUpdateAlbum from '../hooks/useUpdateAlbum'
import { Button } from 'react-bootstrap'

const AlbumPage = () => {
	const [onEdit, setOnEdit] = useState(false);
	const [selections, setSelections] = useState([])
	const [name, setName] = useState('');
	const {albumId} = useParams();
	const imagesQuery = useImages(albumId)
	const albums = useAlbum();

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

	}

  return (
    <>
		{ currentAlbum?.name ?
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
		<UploadImage query={imagesQuery} albumId={albumId}/>
      	<ImagesGrid query={imagesQuery} onSelectionCallback={onSelection} selectedImages={selections}/>
		  <Button className="btn-success" disabled={! selections.length} onClick={onCreateAlbumHandler}>Create New Album</Button>
    </>
  )
}

export default AlbumPage
