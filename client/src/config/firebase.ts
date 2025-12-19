import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOiWFbq4iX2YswUFYPPOLRZ47cNJ-BAgQ",
  authDomain: "back2calm-28d7a.firebaseapp.com",
  projectId: "back2calm-28d7a",
  storageBucket: "back2calm-28d7a.firebasestorage.app",
  messagingSenderId: "114297635608",
  appId: "1:114297635608:web:6bb474ac806556af5ed46d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
