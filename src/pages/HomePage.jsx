import React from 'react'
import Container from 'react-bootstrap/Container'
import useImages from '../hooks/useImages'

const HomePage = () => {
	const imagesQuery = useImages()

  return (
    <Container className="py-3">
      <h1>Latest Images</h1>

	  {imagesQuery.data && imagesQuery.data.map(image => (
		  <div key={image._id}>
			 	<img src={image.url} title={image._id} />
		  </div>
	  ))}
    </Container>
  )
}

export default HomePage
