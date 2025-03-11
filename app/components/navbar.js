"use client"

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
const Navbar = () => {
    const router = useRouter();
    const {user, logOut} = useAuth();
    useEffect(() => {
        if (!user) {
            router.replace("/");
        }
    }, [user,router]);
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log("Sign out error:", error.message);
            alert("Sign out failed!");
        }
    };
    return (
        <div className='flex h-16 bg-transparent absolute top-0 left-0 '>
            <div className=' ml-16 mt-2 flex gap-x-96 justify-between ' >
                <Link className="self-center py-auto text-white" href={"/about_us"}>
                    <div className=""> About Us</div>
                </Link>
                <div className="ml-96 flex justify-center items-center mt-2 gap-8">
                <Link href={"/emergency"}>
                <button className=" relative ml-20 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 z-10">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                       Emergency Services
                    </span>
                </button>
                </Link>
                <Link href={"/my_issues"}>
                <button className=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 z-10">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        My Issues
                    </span>
                </button>
                </Link>
                
                <button className=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 z-10 " onClick={handleSignOut}>
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Sign Out
                    </span>
                </button>
                </div>
                
            </div>
        </div>
    )
}

export default Navbar
