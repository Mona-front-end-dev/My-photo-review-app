import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import AlbumsGrid from '../components/AlbumsGrid'
import useCreateAlbum from '../hooks/useCreateAlbum'
import useAlbum from '../hooks/useAlbum'

const AlbumsPage = () => {
  const createAlbum = useCreateAlbum()
  const albumQuery = useAlbum()
  const [name, setName] = useState('')

  const createHandler = async () => {
    await createAlbum.mutate(name)
    setName('')
    refetchQuery()
  }

  const updateInputValue = (value) => setName(value)

  const refetchQuery = () => {
    albumQuery.refetch()
  }

  return (
    <div>
      <h3>Create your album</h3>
      <div className="flex">
        <input
          type="text"
          value={name}
          placeholder="Your album name"
          onChange={(e) => updateInputValue(e.target.value)}
          className="p-1"
        />
        <Button onClick={createHandler} variant='success' disabled={!name.length} className='mx-3'>
          Create
        </Button>
        <hr />
        <AlbumsGrid query={albumQuery} />
      </div>
    </div>
  )
}

export default AlbumsPage
