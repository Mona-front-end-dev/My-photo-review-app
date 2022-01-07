import React from 'react'
import { collection, query } from 'firebase/firestore'
import { useFirestoreQueryData} from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const HomePage = () => {
	const { currentUser } = useAuthContext()
	return (
		<div>
			<h1>Welcome to my photo app</h1>
			{currentUser ? <p>You are logged in as {currentUser.email} !</p> : <p>You are not logged in yet</p>}
		</div>
	)
}

export default HomePage
