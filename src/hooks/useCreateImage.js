import { useAuthContext } from '../contexts/AuthContext'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

const useCreateImage = () => {

	const { currentUser } = useAuthContext()

	const mutate = async (image, albumId) => {
		const storageFullpath = image.path

		// create a reference in storage to upload image
		const storageRef = ref(storage, storageFullpath)

		// get dowload url to uploaded image
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
	}

	return mutate;
}

export default useCreateImage
