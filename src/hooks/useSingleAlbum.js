import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { collection, query, where, orderBy } from 'firebase/firestore'

const useSingleAlbum = (albumId) => {
  const albumRef = collection(db, 'albums')

  const queryKey = ['albums', albumId]

  const queryRef = query(albumRef, where('albumId', '==', albumId), orderBy("name", "desc"))

  const albumQuery = useFirestoreQueryData(queryKey, queryRef, {
    // '_id' gives us id to every document
    idField: '_id',
  })

  return albumQuery
}

export default useSingleAlbum
