import React, { useState } from 'react'
import useImages from '../hooks/useImages'
import ImagesGrid from '../components/ImagesGrid'
import UploadImage from '../components/UploadImage'
import { useParams } from 'react-router-dom'
import useAlbum from '../hooks/useAlbum'
import useUpdateAlbum from '../hooks/useUpdateAlbum'

const MyImagesPage = () => {
	const [onEdit, setOnEdit] = useState(false);
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
      	<ImagesGrid query={imagesQuery} />
    </>
  )
}

export default MyImagesPage
