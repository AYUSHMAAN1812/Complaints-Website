"use client"
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation'
import Link from "next/link";
import React, { useState,useEffect } from 'react'
import { signInWithGoogle } from "../lib/auth";


const LogIn = () => {
  const [form, setform] = useState({});
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    router.push("/dashboard");
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("User signed in:", user);
      alert(`Welcome, ${user.displayName}!`);
      router.push("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      alert("Google Sign-In failed. Please try again.");
    }
  };
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if(form.email && form.password)
    {
      router.push("/dashboard");
    }
  }, [form])
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] flex justify-center my-auto">
      <div className='flex flex-col justify-center align-center gap-8'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='flex gap-2 text-2xl'>
            <label htmlFor="email">Email ID:</label>
            <input className=" w-xl ml-5 border-2 border-l-white" type="email" id="email" name="email" value={form.email || ""} required onChange={handlechange} />
          </div>
          <div className='flex gap-2 text-2xl'>
            <label htmlFor="password">Password:</label>
            <input className=" w-xl ml-2 border-2 border-l-white" type="password" id="password" name="password" value={form.password || ""} required onChange={handlechange} />
          </div>
          <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Submit
            </span>
          </button>
        </form>
        <div className='text-2xl text-black'> New User? </div>
        <Link href={"/register"}>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Register
            </span>
          </button>
        </Link>
        <button 
        onClick={handleGoogleLogin} 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Sign in with Google
      </button>


      </div>
    </div >
  )

}

export default LogIn
