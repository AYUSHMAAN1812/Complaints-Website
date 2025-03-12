import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className='flex h-10 mb-4 md:mb-0  bg-transparent absolute bottom-0 left-0  w-full gap-2 pl-3.5 justify-center items-center'>
          <div className='mt-2 flex gap-8 text-white font-medium justify-center items-center' >
            <div className='my-auto '> Copyright @2025</div>
          <Link className="my-auto py-auto" href={"/reportissue"}>
                <div className=""> Report an Issue</div>
            </Link>
        </div>
             
    </div>
  )
}

export default Footer
