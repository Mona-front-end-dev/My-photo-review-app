import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'

const useAlbum = () => {
  const { currentUser } = useAuthContext()
  const albumRef = collection(db, 'albums')

  const queryKey = ['albums', currentUser.uid]

  const queryRef = query(albumRef, where('owner', '==', currentUser.uid), orderBy("name", "desc"))

  const albumQuery = useFirestoreQueryData(queryKey, queryRef, {
    idField: '_id',
  })

  return albumQuery
}

export default useAlbum
