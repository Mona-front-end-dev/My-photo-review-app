import { useState } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase'

const useDeleteImage = (image) => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isMutating, setIsMutating] = useState(null)

  const mutate = async () => {
    //reset internal state
    setError(null)
    setIsError(false)
    setIsMutating(true)

    try {
      //delete image from storage
      await deleteObject(ref(storage, image.path))

      //delete image from db
      await deleteDoc(doc(db, 'imagess', image._id))

      setIsMutating(false)
    } catch (e) {
      setError(e.message)
      setIsError(true)
    } finally {
      setIsMutating(false)
    }
  }

  return {
    error,
    isError,
    isMutating,
    mutate,
  }
}

export default useDeleteImage
