// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvT1CuNvmKa4uEl10RIkGO59vq-dCosQo",
  authDomain: "lb-we-2023.firebaseapp.com",
  databaseURL: "https://lb-we-2023-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lb-we-2023",
  storageBucket: "lb-we-2023.appspot.com",
  messagingSenderId: "674619192578",
  appId: "1:674619192578:web:41e21e9e66fd0710fe7e1b",
  measurementId: "G-3K80HTRMWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);