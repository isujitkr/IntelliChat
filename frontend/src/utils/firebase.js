// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "intellichat-ae360.firebaseapp.com",
  projectId: "intellichat-ae360",
  storageBucket: "intellichat-ae360.firebasestorage.app",
  messagingSenderId: "927692361620",
  appId: "1:927692361620:web:46d5bf412c5850a8608981",
  measurementId: "G-T5QK1TVEEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
