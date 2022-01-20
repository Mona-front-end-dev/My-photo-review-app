import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'
import { useState } from 'react'
import { v4 as uuid } from "uuid";

const useCreateAlbum = () => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)

  const { currentUser } = useAuthContext()

  const mutate = async (albumName, ownerId = null) => {
    try {
      const collectionRef = collection(db, 'albums')

	  const albumId = uuid();
		const owner = currentUser ? currentUser.uid : ownerId;

      await addDoc(collectionRef, {
        name: albumName,
		owner,
		created: serverTimestamp(),
      	albumId
      })

      setIsSuccess(true)
	  setIsError(false)

	  return albumId
    } catch (e) {
		debugger;
      setError(e.message)
      setIsError(true)
      setIsSuccess(false)
	}
  }

  return {
    error,
    isError,
    isSuccess,
    mutate,
  }
}

export default useCreateAlbum
