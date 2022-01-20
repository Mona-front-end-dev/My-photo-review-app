import { useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { db, storage } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

const useUploadImage = () => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isUploading, setIsUploading] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)
  const [progress, setProgress] = useState(null)

  const { currentUser } = useAuthContext()

  const mutate = async (image, albumId) => {
    // reset internal state
    setError(null)
    setIsError(null)
    setIsSuccess(null)
    setIsUploading(true)

    if (!image instanceof File) {
      setError('That is not a file')
      setIsError(true)
      setIsUploading(false)
      return
    }

    const storageFilename = `${Date.now()}-${image.name}`

    // construct full path in storage
    const storageFullpath = `images/${currentUser.uid}/${storageFilename}`

    try {
      // create a reference in storage
      const storageRef = ref(storage, storageFullpath)

      const uploadTask = uploadBytesResumable(storageRef, image)

      // attach an upload observer
      uploadTask.on('state_changed', (uploadTaskSnapshot) => {
        setProgress(
          Math.round(
            (uploadTaskSnapshot.bytesTransferred /
              uploadTaskSnapshot.totalBytes) *
              1000,
          ) / 10,
        )
      })

      // waiting for upload to get completed
      await uploadTask.then()

      // get dowload url
      const url = await getDownloadURL(storageRef)

      // create collection to db-collection 'images'
      const collectionRef = collection(db, 'images')

      // create document in db for the uploaded image
      await addDoc(collectionRef, {
        name: image.name,
        owner: currentUser.uid,
        path: storageRef.fullPath,
        size: image.size,
        type: image.type,
		created: serverTimestamp(),
		albumId,
        url,
      })

      setProgress(null)
      setIsSuccess(true)
      setIsUploading(false)
	  setIsError(false)

    } catch (e) {
      setError(e.message)
      setIsError(true)
      setIsUploading(false)
      setIsSuccess(false)
    }
  }

  return {
    error,
    isError,
    isUploading,
    isSuccess,
    progress,
    mutate,
  }
}

export default useUploadImage
