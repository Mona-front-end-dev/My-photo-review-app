import React from 'react'
import useImages from '../hooks/useImages'
import ImagesGrid from '../components/ImagesGrid'
import UploadImage from '../components/UploadImage'
import { useParams } from 'react-router-dom'

const MyImagesPage = () => {
	const {albumId} = useParams();
	const imagesQuery = useImages(albumId)

  return (
    <>
    	<h1>Albums</h1>
		<hr />
		<UploadImage query={imagesQuery} albumId={albumId}/>
      	<ImagesGrid query={imagesQuery} />
    </>
  )
}

export default MyImagesPage
