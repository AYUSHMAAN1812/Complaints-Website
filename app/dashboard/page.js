import React from 'react'
import Navbar from '../components/navbar.js'
import Footer from '../components/footer.js'
const Dashboard = () => {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] position-relative">
            <Navbar />
            <form action="submit" className='mt-2'>
                <input type="text" />
                <input type="text" />
            </form>
            <Footer />
        </div>

    )
}

export default Dashboard
