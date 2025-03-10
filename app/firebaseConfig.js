import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC9SEGMWSUZXHgccRWZ7JozDxKXxmA5ys",
  authDomain: "complaints-website.firebaseapp.com",
  projectId: "complaints-website",
  storageBucket: "complaints-website.appspot.com", // Fixed typo: ".app" -> ".com"
  messagingSenderId: "908948376386",
  appId: "1:908948376386:web:399a036c22e6008a6b16db",
  measurementId: "G-6MK5BZ10KC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Ensure Firebase Analytics runs only in the browser
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { auth, googleProvider };
