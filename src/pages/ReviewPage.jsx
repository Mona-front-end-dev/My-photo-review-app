import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import ImagesGrid from '../components/ImagesGrid';
import useImages from '../hooks/useImages'
import useCreateAlbum from '../hooks/useCreateAlbum'
import useSingleAlbum from '../hooks/useSingleAlbum';
import useCreateImage from '../hooks/useCreateImage';

const ReviewPage = () => {
	const [selections, setSelections] = useState([])
	const {albumId} = useParams();
	const imagesQuery = useImages(albumId, true)
	const createAlbumQuery = useCreateAlbum()
	const albums = useSingleAlbum(albumId);
	const createImageQuery = useCreateImage()
	const navigate = useNavigate()

	const currentAlbum = albums.data?.find(a => a.albumId === albumId);



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

	const onSubmitReviewHandler = async () => {

		const currentDateString = new Date(Date.now()).toUTCString();
		const newAlbumName = `${currentAlbum.name}-${currentDateString}`
		const newAlbumId = await createAlbumQuery.mutate(newAlbumName, currentAlbum.owner)

		selections.forEach(async img => {
			await createImageQuery(img, newAlbumId, currentAlbum.owner)
		})

		navigate(`/confirmation`)
	}

    return (
		<>
			{ currentAlbum ?
		<div className="d-flex align-items-center">
			<h1 className="mb-0">
				{currentAlbum?.name}
			</h1>
		</div>
			:
		<h1>Loading ...</h1>
		}

			<hr />

			<ImagesGrid query={imagesQuery} onSelectionCallback={onSelection} selectedImages={selections}/>
	<Button className="btn-success" disabled={!selections.length} onClick={onSubmitReviewHandler}>
		{
			selections.length
			? `Submit ${selections.length} Images`
			: 'Choose Image to submit'
		}

	</Button>
		</>
  )
}

export default ReviewPage
