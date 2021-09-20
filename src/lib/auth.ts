import { initializeApp, getApps } from "firebase/app"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  TwitterAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
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
  const [loading, setLoading] = useState<boolean>(true)
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setUser(_user)
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [auth])

  return {
    user,
    loading,
  }
}

export const handleSignUpWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<{ data: User | undefined; error: any }> => {
  const auth = getAuth()
  const { data, error } = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
      return { data: userCred.user, error: undefined }
    })
    .catch((error) => {
      return { data: undefined, error: error }
    })
  return { data, error }
}

export const handleSignInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<{ data: User | undefined; error: any }> => {
  const auth = getAuth()
  const { data, error } = await signInWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
      return { data: userCred.user, error: undefined }
    })
    .catch((error) => {
      return { data: undefined, error: error }
    })
  return { data, error }
}

export const handleLoginWithGoogle = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const user = result.user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
    })
}

export const handleLoginWithTwitter = () => {
  const auth = getAuth()
  const provider = new TwitterAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const secret = credential?.secret
      const user = result.user
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.email
      // The AuthCredential type that was used.
      const credential = TwitterAuthProvider.credentialFromError(error)
    })
}

export const handleSendEmailVerification = async (user: User): Promise<{ error: any }> => {
  const res = await sendEmailVerification(user)
    .then(() => {
      return { error: undefined }
    })
    .catch((error) => {
      return { error: error }
    })
  return res
}
