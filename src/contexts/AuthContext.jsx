import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase'
import { RingLoader } from 'react-spinners'
const AuthContext = createContext()

const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
	//listen for authState changes
	onAuthStateChanged(auth, (user) => {
		setCurrentUser(user)
		setLoading(false)
    })
  }, [])

  const values = {
    currentUser,
    loading,
    signup,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={values}>
		{loading && (
			<div id='spinner'>
				< RingLoader color={'#888'} size={100} />
			</div>)}
		{ !loading && children}
	</AuthContext.Provider>
  )
}

export { useAuthContext, AuthContextProvider as default }
