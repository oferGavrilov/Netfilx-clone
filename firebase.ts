// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
      apiKey: "AIzaSyDTmh1ix1_dZqMX5wlpdYvWIwoHIFq-X2s",
      authDomain: "netflix-clone-8d804.firebaseapp.com",
      projectId: "netflix-clone-8d804",
      storageBucket: "netflix-clone-8d804.appspot.com",
      messagingSenderId: "99791040965",
      appId: "1:99791040965:web:132f2079b705186ce8dbac"
    };
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }