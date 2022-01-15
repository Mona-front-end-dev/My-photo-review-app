import React from 'react'
import useImages from '../hooks/useImages'
import ImagesGrid from '../components/ImagesGrid'

const HomePage = () => {
  const imagesQuery = useImages()

  return (
    <>
      <h1>Latest Images</h1>

      <ImagesGrid query={imagesQuery} />
    </>
  )
}

export default HomePage
