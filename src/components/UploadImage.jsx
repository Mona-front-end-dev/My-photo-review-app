import React, { useCallback, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useDropzone } from 'react-dropzone'
import useUploadImage from '../hooks/useUploadImage'

const UploadImage = ({ albumId, query }) => {
  const uploadImage = useUploadImage()

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) {
      return
    }

    // trigger upload of the first file
	await uploadImage.mutate(acceptedFiles[0], albumId)
	query.refetch()
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
              <p>Drop has been accepted</p>
            ) : (
              <p>Drop has been rejected!</p>
            )
          ) : (
            <p>Drop an acceptable file here</p>
          )}
        </div>

        {uploadImage.progress !== null && (
          <ProgressBar variant="success" animated now={uploadImage.progress} />
        )}

        {uploadImage.isError && (
          <Alert variant="warning">{uploadImage.error}</Alert>
        )}
      </div>
    </div>
  )
}

export default UploadImage
