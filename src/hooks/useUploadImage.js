import { useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { db, storage } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

const useUploadImage = () => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isUploading, setIsUploading] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)
  const [progress, isProgress] = useState(null)

  const { currentUser } = useAuthContext()

  const mutate = async (image) => {
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

    // instead of uuid we construct filename to save image as
    const storageFilename = `${Date.now()} + '-' + ${image.name}`

    // construct full path in storage to save image as
    const storageFullpath = `images/${currentUser.uid}/${storageFilename}`

    // create a reference in storage to upload image
    const storageRef = ref(storage, storageFullpath)

    // start upload of an image
    const uploadTask = uploadBytesResumable(storageRef, image)

    // attach an upload observer
    uploadTask.on('state_changed', (uploadTaskSnapshot) => {
      // update progress
      Math.round(
        (uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes) *
          100,
      )
    })
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
