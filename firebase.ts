// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKGl9ugSW8_KwhqTN_kAZnbLhfdTFZb_o",
  authDomain: "showrt-1f5ef.firebaseapp.com",
  projectId: "showrt-1f5ef",
  storageBucket: "showrt-1f5ef.appspot.com",
  messagingSenderId: "480822788358",
  appId: "1:480822788358:web:692b7a759fd3c8a34ade87",
  measurementId: "G-8LDP5EEBSC",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getFirestore(app);

