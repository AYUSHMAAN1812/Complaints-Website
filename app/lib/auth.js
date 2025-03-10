import { signInWithEmailAndPassword, createUserWithEmailAndPassword,signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";

import LogIn from "../login/page";

// Sign Up
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
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

// Google Sign-In
export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user; // Returns user details
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      throw error;
    }
  };
  
  // Logout
  export const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };