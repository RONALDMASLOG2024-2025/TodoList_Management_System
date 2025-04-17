import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi419U30kJJb1kgjnGVviSvD9UjMpD7Tk",
  authDomain: "doodledo-d7c4e.firebaseapp.com",
  projectId: "doodledo-d7c4e",
  storageBucket: "doodledo-d7c4e.firebasestorage.app",
  messagingSenderId: "1040233874345",
  appId: "1:1040233874345:web:a6ba0845709e77a1d0bab8",
  measurementId: "G-T1ZMZHYJ9Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider, signInWithPopup, signOut };