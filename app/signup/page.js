import React from 'react'

const Sign = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] flex justify-center my-auto">
        <div className='flex flex-col justify-center align-center gap-8'>
            <div className='flex gap-2 text-2xl'>
                <span > Email ID:</span>
                <span className='border-1 border-white rounded-sm pl-4'> <input type="text" placeholder='Email ID'/></span>
            </div>
            <div className='flex gap-2 text-2xl'>
                <span> Password:</span>
                <span className='border-1 border-white rounded-sm pl-4'> <input type="text" placeholder='Enter your Password'/></span>
            </div>
        </div>
      
    </div>
  )
}

export default Sign
