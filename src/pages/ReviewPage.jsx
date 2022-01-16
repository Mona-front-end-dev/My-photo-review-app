import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ImagesGrid from '../components/ImagesGrid';
import useImages from '../hooks/useImages'

const ReviewPage = () => {
	const [selections, setSelections] = useState([])
	const {albumId} = useParams();
	const imagesQuery = useImages(albumId, true)

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

	const onSubmitReviewHandler = () => {
		
	}

    return (
		<>
			<div className="d-flex align-items-center">
				<h1 className="mb-0">
					Please select you favorite images
				</h1>
			</div>

			<hr />

			<ImagesGrid query={imagesQuery} onSelectionCallback={onSelection} selectedImages={selections}/>
	<Button className="btn-success" disabled={! selections.length} onClick={onSubmitReviewHandler}>
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
