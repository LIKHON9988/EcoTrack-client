// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq_IwGaFstRc5jhzKN7mhqP0F5cYush4Y",
  authDomain: "ecotrack-client-cfc59.firebaseapp.com",
  projectId: "ecotrack-client-cfc59",
  storageBucket: "ecotrack-client-cfc59.firebasestorage.app",
  messagingSenderId: "1044336665491",
  appId: "1:1044336665491:web:08de4cb8fc7f8f46743e66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
