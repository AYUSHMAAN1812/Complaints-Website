import React from 'react'
import Link from 'next/link'
const Navbar = () => {
    return (
        <div className='flex h-16 bg-purple-300 w-full'>
            <div className='mt-2 ml-[80vw] flex gap-8' >
            <Link className="my-auto py-auto" href={"/about_us"}>
                <div className=""> About Us</div>
            </Link>
            <Link href={"/my_issues"}>
            <button className=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 z-10">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    My Issues
                </span>
            </button>   
            </Link>
            </div>
        </div>
    )
}

export default Navbar
