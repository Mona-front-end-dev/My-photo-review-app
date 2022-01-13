import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'

const useImages = (params = {}) => {
	const { currentUser } = useAuthContext()
	// create ref to collectin 'images'
	const colImagesRef = collection(db, 'imagess')

	const queryKey = params.fetchOnlyCurrentUser
		? ['imagess', currentUser.uid ]
		: ['imagess']
	// create query for colImagesRef , order result in reverse cronological order
	const queryRef = params.fetchOnlyCurrentUser
		? query(colImagesRef, where('owner', '==', currentUser.uid), orderBy('created', 'desc'))
		: query(colImagesRef, orderBy('created', 'desc'))

	const imagesQuery = useFirestoreQueryData(queryKey, queryRef, {
		// '_id' gives us id to every document
		idField: '_id',
	})

	return imagesQuery
}

export default useImages
