// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "urban-homes-36293.firebaseapp.com",
  projectId: "urban-homes-36293",
  storageBucket: "urban-homes-36293.appspot.com",
  messagingSenderId: "814769921966",
  appId: "1:814769921966:web:dfe65934f89d3e4285f23f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);