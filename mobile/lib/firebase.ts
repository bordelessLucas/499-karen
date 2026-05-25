import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { initializeAuth, getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getFirebasePublicConfig } from './env'

// Firebase v12 removeu os tipos RN; a função ainda existe em runtime no bundle Metro.
// @ts-expect-error getReactNativePersistence não está exportado nos tipos do SDK web.
import { getReactNativePersistence } from 'firebase/auth'

let firebaseApp: FirebaseApp | null = null
let firebaseAuth: Auth | null = null
let firestoreDb: Firestore | null = null

export function initializeFirebase(): FirebaseApp {
  if (firebaseApp) {
    return firebaseApp
  }

  const config = getFirebasePublicConfig()

  firebaseApp = getApps().length > 0 ? getApp() : initializeApp(config)

  try {
    firebaseAuth = initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    })
  } catch {
    firebaseAuth = getAuth(firebaseApp)
  }

  firestoreDb = getFirestore(firebaseApp)

  return firebaseApp
}

export function getFirebaseApp(): FirebaseApp {
  if (!firebaseApp) {
    return initializeFirebase()
  }

  return firebaseApp
}

export function getFirebaseAuth(): Auth {
  initializeFirebase()

  if (!firebaseAuth) {
    throw new Error('Firebase Auth não foi inicializado.')
  }

  return firebaseAuth
}

export function getFirestoreDb(): Firestore {
  initializeFirebase()

  if (!firestoreDb) {
    throw new Error('Firestore não foi inicializado.')
  }

  return firestoreDb
}
