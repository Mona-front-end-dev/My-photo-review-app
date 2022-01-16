import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase'

const useUpdateAlbum = async (newName, albumId) => {
//   const { currentUser } = useAuthContext()
  const albumNameRef = doc(db, "albums", albumId);

  await updateDoc(albumNameRef, {
	name: newName,
  });
}

export default useUpdateAlbum







