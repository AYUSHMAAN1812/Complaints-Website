"use client"

import React,{useState} from 'react'
import { signIn } from '../lib/auth'

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handelSignIn = async (event) => 
  {
    event.preventDefault();
    try{
      await signIn(email,password);
      alert("Log In successful!");
    }catch(error)
    {
      setError(error.message)
    }
  };
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] flex justify-center my-auto">
        <div className='flex flex-col justify-center align-center gap-8'>
            <div className='flex gap-2 text-2xl'>
                <span > Email ID:</span>
                <span className='border-1 border-white rounded-sm pl-4'> <input type="text" placeholder='Email ID' onChange={(e)=>{setEmail(e.target.value)}} required/></span>
            </div>
            <div className='flex gap-2 text-2xl'>
                <span> Password:</span>
                <span className='border-1 border-white rounded-sm pl-4'> <input type="text" placeholder='Enter your Password' onChange={(e)=>{setPassword(e.target.value)}}/></span>
            </div>
        <button onClick={handelSignIn}>Sign In</button>
        <h6>If new user, then <a href='/signup'>Register</a></h6>
        </div>
    </div>
  )
}

export default Page
