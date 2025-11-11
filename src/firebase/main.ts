import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, initializeFirestore, memoryLocalCache } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG || ''
export const app = initializeApp(JSON.parse(firebaseConfig))
export const db = initializeFirestore(app, {
  localCache: memoryLocalCache()
  //  localCache: persistentLocalCache()
})
export const functions = getFunctions(app)
export const auth = getAuth(app)
auth.languageCode = 'es'

// 🔧 Conectar al emulador solo si está habilitado
if (
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true' &&
  process.env.NODE_ENV === 'development'
) {
  let firestoreConnected = false
  let functionsConnected = false
  let authConnected = false

  try {
    // Conectar Firestore al emulador
    if (!firestoreConnected) {
      connectFirestoreEmulator(db, 'localhost', 8080)
      firestoreConnected = true
      console.log('🔧 Conectado al emulador de Firestore en localhost:9000')
    }
  } catch (error) {
    console.error('ℹ️ Firestore emulator ya conectado', { error })
  }

  try {
    // Conectar Functions al emulador
    if (!functionsConnected) {
      connectFunctionsEmulator(functions, 'localhost', 5001)
      functionsConnected = true
      console.log('🔧 Conectado al emulador de Functions en localhost:5001')
    }
  } catch (error) {
    console.error('ℹ️ Functions emulator ya conectado', { error })
  }

  try {
    // Conectar Auth al emulador
    if (!authConnected) {
      connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true
      })
      authConnected = true
      console.log('🔧 Conectado al emulador de Auth en localhost:9099')
    }
  } catch (error) {
    console.error('ℹ️ Auth emulator ya conectado', { error })
  }
}
