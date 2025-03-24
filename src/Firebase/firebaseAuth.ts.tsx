import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

const facebookProvider = new FacebookAuthProvider();

export const loginWithFacebook = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
  } catch (error: unknown) {
    throw error;
  }
};
