import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAo35JjUkoZg_9S6CihoA0aB-X48H5nZKM",
    authDomain: "todo-d710a.firebaseapp.com",
    projectId: "todo-d710a",
    storageBucket: "todo-d710a.appspot.com",
    messagingSenderId: "773009356934",
    appId: "1:773009356934:web:63cab7d981b4d120443907"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app)

export { app, db }
