import React from 'react'
import Masonry from 'react-masonry-css'
import Alert from 'react-bootstrap/Alert'
import { BeatLoader } from 'react-spinners'
import ImageCard from './ImageCard'


const masonryBreakpoints = {
	default: 4,
	576: 2,
	768: 3,
	992: 4,
}

const ImagesGrid = ({ query }) => {
  if (query.isError) {
    return <Alert variant="warning">{query.isError}</Alert>
  }

  if (query.isLoading) {
    return <BeatLoader color="#888" />
  }

  const refetchQuery = () => {
    query.refetch()
  }
  return (
    query.data && (
      <Masonry
        breakpointCols={masonryBreakpoints}
        className="images-masonry"
        columnClassName="images-masonry-column"
      >
        {query.data.map(image => (
			<ImageCard image={image} key={image._id} refetchQuery={refetchQuery}/>
        ))}
      </Masonry>
    )
  )
}

export default ImagesGrid
