// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDHZgL_SOFZHZe_h353C0SFrFRWl-G_Yzo",
  authDomain: "fir-course-eea33.firebaseapp.com",
  projectId: "fir-course-eea33",
  storageBucket: "fir-course-eea33.appspot.com",
  messagingSenderId: "911534668530",
  appId: "1:911534668530:web:3b68c56dd97d3261766e6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);


