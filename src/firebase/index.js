import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyDCaQ-oI1PylIoENdtY5CHM2KZexLemAys",
	authDomain: "my-photo-review-4163c.firebaseapp.com",
	projectId: "my-photo-review-4163c",
	storageBucket: "my-photo-review-4163c.appspot.com",
	messagingSenderId: "452475683130",
	appId: "1:452475683130:web:2a86fd87b9b72c96655003"
  };


// init firebase
const app = initializeApp(firebaseConfig)

// get firebase auth instance
const auth = getAuth()

// get firebase firestore instance
const db = getFirestore(app)

//get firebase storage instance
const storage = getStorage(app)


export {
	app as default,
	auth,
	db,
	storage
}
