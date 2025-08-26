// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRYUPJCc36jqhZt6c4mySED75XfCwngvI",
  authDomain: "ecommerce-dashboard-b1cf0.firebaseapp.com",
  projectId: "ecommerce-dashboard-b1cf0",
  storageBucket: "ecommerce-dashboard-b1cf0.firebasestorage.app",
  messagingSenderId: "857122672266",
  appId: "1:857122672266:web:b709dc4c54cb8f2402e773",
  measurementId: "G-RGS5FNRM9T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 Firebase connected:", app);

export { db };
