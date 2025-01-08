import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpSjG07zjKJ8MQiw0RpTqx8RWmW2aQFZE",
  authDomain: "tu-student.firebaseapp.com",
  projectId: "tu-student",
  storageBucket: "tu-student.firebasestorage.app",
  messagingSenderId: "1089599288081",
  appId: "1:1089599288081:web:f0244037b410c7766152b0",
  measurementId: "G-9P9BN205MK"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };