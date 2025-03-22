import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLESiiufh8OnClS4pzehXHEqGAxjo3NNM",
  authDomain: "instagram-1c8bc.firebaseapp.com",
  projectId: "instagram-1c8bc",
  storageBucket: "instagram-1c8bc.appspot.com",
  messagingSenderId: "972401822418",
  appId: "W3i9kAPTCqT78RivRNp0Y33ue8S2",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
