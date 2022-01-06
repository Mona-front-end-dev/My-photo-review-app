import React from 'react'
import { collection, query } from 'firebase/firestore'
import { useFirestoreQueryData} from '@react-query-firebase/firestore'
import { db } from '../firebase'

const HomePage = () => {
	// const ref = collection(db, '')
	return (
		<div>
			<h1>Welcome to my photo app</h1>
		</div>
	)
}

export default HomePage
