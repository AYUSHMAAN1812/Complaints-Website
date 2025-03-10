"use client"
import React, { useState } from 'react'
const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
}
const handleadd = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
}

const Sign = () => {
    const [form, setform] = useState([email="", password=""]) 
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] flex justify-center my-auto">
            <div className='flex flex-col justify-center align-center gap-8'>
                <form className='flex flex-col gap-4'>
                    <div className='flex gap-2 text-2xl'>
                        <label htmlFor="email">Email ID:</label>
                        <input className=" w-xl ml-5 border-2 border-l-white" type="email" id="email" name="email" required onChange={handlechange}/>
                    </div>
                    <div className='flex gap-2 text-2xl'>
                        <label htmlFor="password">Password:</label>
                        <input className=" w-xl ml-2 border-2 border-l-white" type="password" id="password" name="password" required onChange={handlechange} />
                    </div>
                <button type= "submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Submit
                    </span>
                </button>
            </form>
            <div className='text-2xl text-white'> Already a User? If No, then </div>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Register
                    </span>
            </button>
            
        </div>
        </div >
    )
}

export default Sign
