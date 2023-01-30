// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyxMHWBpDdtA9pj2wqXNUdT8f0Vf8Eshs",
    authDomain: "whipped-up-app.firebaseapp.com",
    projectId: "whipped-up-app",
    storageBucket: "whipped-up-app.appspot.com",
    messagingSenderId: "828422895176",
    appId: "1:828422895176:web:6975d533a2df8bf8700a7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize firestore
const db = getFirestore()


// initialize firebase auth
const auth = getAuth()

export { app, db, auth }