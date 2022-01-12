import React, { useCallback } from 'react'
import Alert from 'react-bootstrap/Alert'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useDropzone } from 'react-dropzone'
import UploadImage from '../components/UploadImage'
import useUploadImage from '../hooks/useUploadImage'

const UploadPageDropzone = () => {
  const uploadImageDrop = useUploadImage()

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return
    }

    // trigger upload of the first file
    uploadImageDrop.mutate(acceptedFiles[0])
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/gif, image/jpeg, image/png, image/webp',
    maxFiles: 1,
    onDrop,
  })

  return (
    <div>
      <h1>Upload a New image by dropzone</h1>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        id="dropzone-wrapper"
        className={`${isDragAccept ? 'drop-accept' : ''}${
          isDragReject ? 'drop-reject' : ''
        }`}
      >
        <input {...getInputProps()} />
        <div className="indicator">
          {isDragActive ? (
            isDragAccept ? (
              <p>Drop is accepted</p>
            ) : (
              <p>Drop is rejected!</p>
            )
          ) : (
            <p>Drop an acceptable file here</p>
          )}
        </div>

        {uploadImageDrop.progress !== null && (
          <ProgressBar variant="success" animated now={uploadImageDrop.progress} />
        )}

        {uploadImageDrop.isError && (
          <Alert variant="warning">{uploadImageDrop.error}</Alert>
        )}
        {uploadImageDrop.isSuccess && (
          <Alert variant="success">That was a correct file to upload 😎 </Alert>
        )}
      </div>
    </div>
  )
}

export default UploadPageDropzone
