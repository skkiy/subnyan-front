import { initializeApp, getApps } from "firebase/app"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth"
import { useEffect, useState } from "react"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const apps = getApps()
if (apps.length == 0) {
  initializeApp(firebaseConfig)
}

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setUser(_user)
    })
    return () => {
      unsubscribe()
    }
  }, [auth])

  const handleSignInWithEmailAndPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log(userCred)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }
  return {
    user,
    signInWithEmailAndPassword: handleSignInWithEmailAndPassword,
  }
}
