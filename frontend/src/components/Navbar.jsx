import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
  return (
    <div className='max--h-1/10 bg-gray-900 flex items-center justify-between w-full px-5 py-2'>
        <div className="brand">
            <h1 className="text-2xl text-blue-500 font-bold px-2">TFIMS</h1>
        </div>
        <div className="links">
            <ul className='list-style-none flex gap-3'>
                <li className="text-white hover:underline"><Link to='/dashboard'>Home</Link></li>
                <li className="text-white hover:underline"><Link to='/categories'>Categories</Link></li>
                <li className="text-white hover:underline"><Link to='/products'>Products</Link></li>
                <li className="text-white hover:underline"><Link to='/stock'>Manage stock</Link></li>
                <li className="text-white hover:underline"><Link to='/inventory'>Inventory</Link></li>
            </ul>
        </div>
        <div className="account flex rounded">
            <div className="user flex flex-col bg-black text-white py-2 rounded-l-md px-2">
                <p>bentheone@gmail.com</p>
            </div>
            <div className="logout cursor-pointer" >
                <button onClick={handleLogout} className="bg-blue-500 text-white px-3 py-2 h-full rounded-r-md cursor-pointer" name='Logout'>
                    <FiLogOut size={20}/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar