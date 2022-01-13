import React from 'react'
import useImages from '../hooks/useImages'
import ImagesGrid from '../components/ImagesGrid'

const MyImagesPage = () => {
  const imagesQuery = useImages({
	  fetchOnlyCurrentUser: true,
  })

  return (
    <>
      <h1>My Images</h1>

      <ImagesGrid query={imagesQuery} />
    </>
  )
}

export default MyImagesPage
