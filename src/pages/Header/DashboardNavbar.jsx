import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='p-4 flex justify-between items-center shadow-lg sticky top-0 z-10 bg-white'>
        <Link to='/Frontend'><i className="fa-solid fa-arrow-left"></i></Link>
    </nav>
  )
}

export default Navbar