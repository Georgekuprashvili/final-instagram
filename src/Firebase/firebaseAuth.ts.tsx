// firebaseAuth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export const registerUser = async (
  email: string,
  password: string,
  fullName: string,
  username: string
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const user = result.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email,
    fullName,
    username,
    photoURL: "",
    postsCount: 0,
    followers: [],
    following: [],
  });
};

export const loginUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const loginWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email || "",
      fullName: user.displayName || "",
      username: user.displayName?.replace(/\s+/g, "").toLowerCase() || "",
      photoURL: user.photoURL || "",
      postsCount: 0,
      followers: [],
      following: [],
    });
  }
};
