// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7XOLUrVhkd-2AByIG_KUiBZkV_SqsUQM",
  authDomain: "bakery-bliss.firebaseapp.com",
  projectId: "bakery-bliss",
  storageBucket: "bakery-bliss.firebasestorage.app",
  messagingSenderId: "895836117778",
  appId: "1:895836117778:web:3ba16bc7995b5e06d7b1cb",
  measurementId: "G-X0LK434SW1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
