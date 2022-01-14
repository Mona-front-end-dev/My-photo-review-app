import React from 'react'
import Button from 'react-bootstrap/Button'

const AllbumsPage = () => {

	const createHandler = () => {
		console.log('You have clicked!')
	}
  return (
    <div>
      <h1>This is allbums page</h1>
      <div className="flex">
        <input type="text" placeholder="Create an allbum" className='p-2 mx-3' />
        <Button onClick={createHandler} >Create</Button>
      </div>
    </div>
  )
}

export default AllbumsPage
