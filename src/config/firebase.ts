import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAViJL-AqGqr2tfjCQRqkeATE_dPYbjTTI',
  authDomain: 'karen-eaaf4.firebaseapp.com',
  projectId: 'karen-eaaf4',
  storageBucket: 'karen-eaaf4.firebasestorage.app',
  messagingSenderId: '934369528971',
  appId: '1:934369528971:web:3bb1467494455a0865d88e',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
