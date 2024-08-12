// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8p0oCIGhhPTvviF9k1TFw9pbyDoGJ1-k",
  authDomain: "pantry-buddy-6e302.firebaseapp.com",
  projectId: "pantry-buddy-6e302",
  storageBucket: "pantry-buddy-6e302.appspot.com",
  messagingSenderId: "517046762504",
  appId: "1:517046762504:web:1ad3f300dd50d15eeaa5bd",
  measurementId: "G-8XZTMDKD4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore=getFirestore(app);
const db = getFirestore(app);
const auth = getAuth(app);

// if (typeof window !== "undefined") {
//   // Check if analytics is supported in this environment
//   isSupported().then((supported) => {
//     if (supported) {
//       const analytics = getAnalytics(app);
//     } else {
//       console.log("Analytics not supported in this environment.");
//     }
//   });}

export {firestore , db, auth, app, firebaseConfig} ;