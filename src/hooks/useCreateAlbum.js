import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'
import { useState } from 'react'

const useCreateAlbum = () => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)

  const { currentUser } = useAuthContext()

  const mutate = async (albumName) => {
    try {
      const collectionRef = collection(db, 'albums')

      await addDoc(collectionRef, {
        name: albumName,
        owner: currentUser.uid,
      })

      setIsSuccess(true)
      setIsError(false)
    } catch (e) {
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
