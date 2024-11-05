import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkoyzYB0Nw55SZHTiZFQAyC7m0eN_vxL0",
  authDomain: "kidhydra-f88a3.firebaseapp.com",
  projectId: "kidhydra-f88a3",
  storageBucket: "kidhydra-f88a3.appspot.com",
  messagingSenderId: "1062529463144",
  appId: "1:1062529463144:web:3cb74d8e9da7e973f5dcdd"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)