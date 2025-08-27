// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0aXJE1nrYh46_fuxmjk64bg5tPDLfwWg",
  authDomain: "ecommerce-dashboard-4d9f9.firebaseapp.com",
  projectId: "ecommerce-dashboard-4d9f9",
  storageBucket: "ecommerce-dashboard-4d9f9.firebasestorage.app",
  messagingSenderId: "514257899278",
  appId: "1:514257899278:web:916f5a98b8beab790b515f",
  measurementId: "G-VDN0PFZ150"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 Firebase connected:", app);

export { db };
