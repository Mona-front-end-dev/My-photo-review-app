import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import AlbumGrid from '../components/AlbumGrid'
import useCreateAlbum from '../hooks/useCreateAlbum'
import useAlbum from '../hooks/useAlbum'

const AlbumsPage = () => {
  const createAlbum = useCreateAlbum()
  const albumQuery = useAlbum()
  const [name, setName] = useState('')

  const createHandler = () => {
    createAlbum.mutate(name)
    setName('')
    refetchQuery()
  }

  const updateInputValue = (value) => setName(value)

  const refetchQuery = () => {
    albumQuery.refetch()
  }

  return (
    <div>
      <h1>Create your allbum</h1>
      <div className="flex">
        <input
          type="text"
          value={name}
          placeholder="Create an allbum"
          onChange={(e) => updateInputValue(e.target.value)}
          className="p-2 mx-3"
        />
        <Button onClick={createHandler} disabled={!name.length}>
          Create
        </Button>
        <hr />
        <AlbumGrid query={albumQuery} />
      </div>
    </div>
  )
}

export default AlbumsPage
