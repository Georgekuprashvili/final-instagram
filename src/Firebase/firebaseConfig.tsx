import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
const firebaseConfig = {
  apiKey: "AIzaSyDLESiiufh8OnClS4pzehXHEqGAxjo3NNM",
  authDomain: "instagram-1c8bc.firebaseapp.com",
  projectId: "instagram-1c8bc",
  storageBucket: "instagram-1c8bc.appspot.com",
  messagingSenderId: "972401822418",
  appId: "1:972401822418:web:5c676eb06c2db04e603b0b",
  measurementId: "G-3EFZ8Q8N3M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 
export { app, auth, db, storage }; 
