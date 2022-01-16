import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const ReviewPage = () => {
	const {albumId} = useParams();

  return (
    <div>
      <h1>Review {albumId}</h1>

    </div>
  )
}

export default ReviewPage
