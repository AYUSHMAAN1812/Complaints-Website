import { createContext, useContext, useEffect, useState } from "react";
import { listenForAuthChanges, logout, signInWithGoogle } from "../lib/auth";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { resolve } from "styled-jsx/css";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider);
  }

  const logOut = ()=>{
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);

    });
  
    return () => {
      unsubscribe();
    }
  }, [user]);
  
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve,50));
      setLoading(false);
    }
  
    checkAuthentication();
  }, [user])
  
  return (
    <AuthContext.Provider value={{ user,googleSignIn,logOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
