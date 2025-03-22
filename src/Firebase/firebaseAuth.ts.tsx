import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const registerUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
