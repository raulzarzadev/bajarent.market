import {
  confirmPasswordReset,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import { getStorage } from 'firebase/storage'
import { FirebaseCRUD } from './crud'
import { app, db } from './main'

export const auth = getAuth(app)
auth.languageCode = 'es'
export const storage = getStorage(app)

// CREATE A MAIN INSTANCE FOR USERS
export const usersCRUD = new FirebaseCRUD('users', db, storage)

export const passwordReset = async (email: string) => {
  return await sendPasswordResetEmail(auth, email)
}

export const confirmThePasswordReset = async (
  oobCode: string,
  newPassword: string
) => {
  if (!oobCode && !newPassword) return
  return await confirmPasswordReset(auth, oobCode, newPassword)
}

export async function signInWithPassword({
  email,
  password
}: {
  email: string
  password: string
}) {
  return signInWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed in
  //   const user = userCredential.user
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code
  //   const errorMessage = error.message
  //   console.error({ errorCode, errorMessage })
  // })
}

export async function logout() {
  return await signOut(auth)
}

export async function getCurrentUser() {
  return auth.currentUser
}
