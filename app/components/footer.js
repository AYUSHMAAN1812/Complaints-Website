import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className='flex h-16 bg-transparent absolute bottom-0 left-0  w-full gap-2 pl-3.5'>
          <div className='mt-2 ml-[80vw] flex gap-8 text-white font-medium' >
            <div className='my-auto'> Copyright</div>
          <Link className="my-auto py-auto" href={"/reportissue"}>
                <div className=""> Report an Issue</div>
            </Link>
        </div>
             
    </div>
  )
}

export default Footer
