// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, Timestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUGLSUy5AWiVJRejLNgoV5Js5yVVTu7eo",
  authDomain: "rn-tamagui-news-app.firebaseapp.com",
  projectId: "rn-tamagui-news-app",
  storageBucket: "rn-tamagui-news-app.appspot.com",
  messagingSenderId: "1099196754341",
  appId: "1:1099196754341:web:5d64a3b6006f78801e204c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc, getDocs, getDoc, doc, Timestamp }