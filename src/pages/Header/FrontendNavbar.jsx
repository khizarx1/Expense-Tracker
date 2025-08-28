import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

function Navbar() {

    const { isAuthenticated, dispatch } = useContext(AuthContext);
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({type: 'LOGOUT'});
                toast.success('Logged out');
            }) .catch ((err) => {
                console.error('Error logging out:', err);
            })

    }

    return (
        <nav className='p-4 flex justify-between items-center shadow-lg'>
            <Link to='/Dashboard'><i className="fa-solid fa-bars"></i></Link>
            {!isAuthenticated
                ? <Link to='/Authentication/Login' className='px-4 py-1 cursor-pointer bg-black text-white font-semibold rounded-full'>Login</Link>
                : <button onClick={handleLogout} className='px-4 py-1 cursor-pointer bg-red-500 text-white font-semibold rounded-full'>Logout</button>
            }

        </nav>
    )
}

export default Navbar