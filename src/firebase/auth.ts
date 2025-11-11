import {
  confirmPasswordReset,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut
} from 'firebase/auth'

import { getStorage } from 'firebase/storage'
import catchError from '@/libs/catchError'
import { FirebaseCRUD } from './crud'
import { app, auth, db } from './main'

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
}

export async function logout() {
  return await signOut(auth)
}

export async function getCurrentUser() {
  return auth.currentUser
}

export async function sendSignInPhone({
  phone
}: //appVerifier
{
  phone: string
  //appVerifier: any
}) {
  if (window?.recaptchaVerifier) {
    console.log('recaptchaVerifier exists')
    const appVerifier = window.recaptchaVerifier
    // console.log({ appVerifier })

    const [error, data] = await catchError(
      signInWithPhoneNumber(auth, phone, appVerifier)
    )
    if (error) {
      console.error({ error })
      return Promise.reject(error)
    }
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = data
    console.log({ confirmationResult: data })

    return Promise.resolve(data)
  } else {
    console.log('recaptchaVerifier does not exist')
    return
  }
}

export const onSendCode = ({
  code
}: // confirmationResult
{
  code: string
  //confirmationResult: any
}) => {
  if (window?.confirmationResult) {
    console.log('window.confirmationResult exists')
    window.confirmationResult
      .confirm(code)
      .then((result: any) => {
        // User signed in successfully.
        console.log({ result })
        // console.log({ user })
        // ...
      })
      .catch((error: any) => {
        console.error({ error })
      })
      .finally(() => {
        // setSending(false)
      })
  } else {
    console.log('window.confirmationResult does not exist')
  }
}

export async function authStateChanged(cb: CallableFunction) {
  onAuthStateChanged(auth, async (user) => {
    if (user?.uid) {
      const dbUser = await usersCRUD.getItem(user.uid)
      if (dbUser) return cb(dbUser)

      // Dividir displayName en firstName y lastName
      const displayName = user.displayName || ''
      const nameParts = displayName.split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      const newUser = {
        firstName,
        lastName,
        email: user.email || '',
        image: user.photoURL || '',
        phone: user.phoneNumber || '',
        canCreateStore: true
      }
      await usersCRUD.setItem(user.uid, newUser)
      const userCreated = await usersCRUD.getItem(user.uid)
      //* create a default new user when is the first login
      cb(userCreated)
    } else {
      cb(null)
    }
  })
}

export const createUser = async (userId: string, userData: any) => {
  return await usersCRUD.setItem(userId, userData)
}
