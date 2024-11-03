// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbi4BAqdYXy3FPMpZBfbzQc0KBjS_DhCU",
  authDomain: "noteapp-6f7a5.firebaseapp.com",
  projectId: "noteapp-6f7a5",
  storageBucket: "noteapp-6f7a5.firebasestorage.app",
  messagingSenderId: "744417527222",
  appId: "1:744417527222:web:6c6897fcb8baed024fad17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Initialize Firebase Authentication
const db = getFirestore(app);  // Initialize Cloud Firestore


export { auth, db };
