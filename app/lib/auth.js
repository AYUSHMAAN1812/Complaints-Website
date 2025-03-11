// import { 
//   signInWithEmailAndPassword, 
//   createUserWithEmailAndPassword,
//   signInWithPopup, 
//   signOut, 
//   onAuthStateChanged 
// } from "firebase/auth";
// import { auth, googleProvider } from "../firebaseConfig";

// // Track the authentication state
// export const listenForAuthChanges = (setUser) => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const isGoogleUser = user.providerData.some(
//         (provider) => provider.providerId === "google.com"
//       );
//       // Store only serializable properties
//       setUser({
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL,
//         isGoogleUser,
//       });
//     } else {
//       setUser(null);
//     }
//   });
// };

// // Sign Up
// export const signUp = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// };

// // Sign In
// export const signIn = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// };

// // Google Sign-In (No need to pass setUser)
// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     return result.user; // Firebase Auth automatically updates state
//   } catch (error) {
//     console.error("Google Sign-In Error:", error.message);
//     throw error;
//   }
// };

// // Logout
// export const logout = async () => {
//   try {
//     await signOut(auth);
//     window.location.href = "/"; // Redirect to home on logout
//   } catch (error) {
//     console.error("Logout Error:", error.message);
//   }
// };
