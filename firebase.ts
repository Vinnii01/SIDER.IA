import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAqhCE_0gF2J2FlDqq3l8pDpbSRi3rWfw",
  authDomain: "sider-ia-29e9e.firebaseapp.com",
  projectId: "sider-ia-29e9e",
  storageBucket: "sider-ia-29e9e.firebasestorage.app",
  messagingSenderId: "686880980614",
  appId: "1:686880980614:web:d9bce8d333f11802d89b07",
  measurementId: "G-1XKVPERZBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);
export { deleteDoc };

// Initialize Firebase Authentication
export const auth = getAuth(app);