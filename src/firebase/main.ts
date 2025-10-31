import { initializeApp } from 'firebase/app'
import { initializeFirestore, memoryLocalCache, persistentLocalCache } from 'firebase/firestore'

const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG || ''
export const app = initializeApp(JSON.parse(firebaseConfig))
export const db = initializeFirestore(app, {
  localCache: memoryLocalCache(),
  //  localCache: persistentLocalCache()
})
