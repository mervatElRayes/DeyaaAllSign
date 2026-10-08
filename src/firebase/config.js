// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfiNFsuKwvVlHlaqdbCoqmUTgqjzMDrfY",
  authDomain: "mydeyaa-97751.firebaseapp.com",
  projectId: "mydeyaa-97751",
  storageBucket: "mydeyaa-97751.firebasestorage.app",
  messagingSenderId: "140597553698",
  appId: "1:140597553698:web:5b130a71f59b29074eb87b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);




