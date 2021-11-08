import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN5zlyG-k_k4PcieNOR4dbvwwxQz0qOT4",
  authDomain: "whatsapp-clone-c7977.firebaseapp.com",
  projectId: "whatsapp-clone-c7977",
  storageBucket: "whatsapp-clone-c7977.appspot.com",
  messagingSenderId: "503949036651",
  appId: "1:503949036651:web:2a8ed5532badc155ae752e",
  measurementId: "G-LE54GP01C3"
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth, provider};

export default db;