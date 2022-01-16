import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'

const useImages = albumId => {
	const { currentUser } = useAuthContext()
	const colImagesRef = collection(db, 'images')

	const queryKey = ['images', currentUser.uid ]

	const queryRef = query(
		 colImagesRef,
		 where('owner', '==', currentUser.uid),
		 where('albumId', '==', albumId),
		 orderBy('created', 'desc')
	)

	const imagesQuery = useFirestoreQueryData(queryKey, queryRef, {
		// '_id' gives us id to every document
		idField: '_id',
	})

	return imagesQuery
}

export default useImages
