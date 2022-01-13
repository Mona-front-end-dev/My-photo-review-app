import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { collection, query, where, orderBy } from 'firebase/firestore'

const useImages = () => {
	// create ref to collectin 'images'
	const colImagesRef = collection(db, 'imagess')

	// create query for colImagesRef , order result in reverse cronological order
	const queryRef = query(colImagesRef, orderBy('created', 'desc'))

	const imagesQuery = useFirestoreQueryData(['imagess'], queryRef, {
		// '_id' gives us id to every document
		idField: '_id',
	})

	return imagesQuery
}

export default useImages
