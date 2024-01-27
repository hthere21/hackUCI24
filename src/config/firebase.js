import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcJoM8zAIxD4Vwb_n7QeUNzrM-uKX_bew",
  authDomain: "hackuci2024.firebaseapp.com",
  projectId: "hackuci2024",
  storageBucket: "hackuci2024.appspot.com",
  messagingSenderId: "389859786270",
  appId: "1:389859786270:web:df926aa4204a9e3033780f",
  measurementId: "G-5DNSH3R72J",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  setPersistence,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
};

// const analytics = getAnalytics(app);
