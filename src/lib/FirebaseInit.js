// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEMar_iKXz7fw6dHCglNIS4YyBbSicdy0",
  authDomain: "necokumo-c21e3.firebaseapp.com",
  databaseURL:
    "https://necokumo-c21e3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "necokumo-c21e3",
  storageBucket: "necokumo-c21e3.firebasestorage.app",
  messagingSenderId: "334611024410",
  appId: "1:334611024410:web:310dca76609465cd985fa3",
  measurementId: "G-9RLWKY88SX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth;
const analytics = getAnalytics(app);
