"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Restrict access to "iith.ac.in" domain only
      if (!user.email.endsWith("@iith.ac.in")) {
        alert("Access restricted to iith.ac.in users only.");
        return ;
      }

      setUser(user); // ✅ Set only authorized user
      console.log("Google Sign-In successful:", user);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      alert(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // ✅ Ensure user is fully logged out
    } catch (error) {
      console.error("Sign-Out Error:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email.endsWith("@iith.ac.in")) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
