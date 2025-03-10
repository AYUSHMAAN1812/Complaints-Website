import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";
import Page from "../login/page";

const auth = getAuth(app);

// Sign Up
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return <Page/>;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Sign In
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
