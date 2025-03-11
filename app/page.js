"use client";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, googleSignIn } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && user?.email?.endsWith("@iith.ac.in")) {
      router.push("/dashboard");
    }
  }, [user, router, isClient]);

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  if (!isClient) return null;
  if (user && user?.email?.endsWith("@iith.ac.in")) return null;
  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] flex justify-center">  
      <div className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold text-white">IITH Complaints Portal</h1>
      <h2 className="text-xl font-semibold text-white">Raising Complaints made easy!</h2>
      <span className="text-white mt-4"> Use your IITH Email ID to login</span>
      <button   onClick={handleGoogleLogin}  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
        Sign in with Google
        </span>
      </button>
      </div>
    </div>
  );
}
