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
  if(user && user?.email?.endsWith("@iith.ac.in"))return null;
  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      Sign in with Google
    </button>
  );
}
