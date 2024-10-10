import {
  confirmPasswordReset,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
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

export async function sendSignInPhone({
  phone
}: //appVerifier
{
  phone: string
  //appVerifier: any
}) {
  // @ts-ignore
  if (window?.recaptchaVerifier) {
    console.log('recaptchaVerifier exists')
    // @ts-ignore
    const appVerifier = window.recaptchaVerifier
    // console.log({ appVerifier })
    return signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // @ts-ignore
        window.confirmationResult = confirmationResult
        // setMsmSent(true)
        console.log({ confirmationResult })

        // * ... redirect to ConfirmCode
      })
      .catch((error) => {
        console.error({ error })
        // Error; SMS not sent
        // ...
        // setError(
        //   `¡Ups! Algo no salio bien. Codigo:  ${fbErrorToCode(error).code}`
        // )
      })
      .finally(() => {
        // setSending(false)
      })
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
  // @ts-ignore
  if (window?.confirmationResult) {
    console.log('window.confirmationResult exists')
    // @ts-ignore
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
        // setError(
        //   `¡Ups! Algo no salio bien. Codigo:  ${fbErrorToCode(error).code}`
        // )
        // User couldn't sign in (bad verification code?)
        // ...
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
      const newUser = {
        name: user.displayName || '',
        email: user.email || '',
        // rol: 'CLIENT',
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
