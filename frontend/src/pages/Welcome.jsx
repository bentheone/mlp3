import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center m-0 bg-black">
        <div className="text-center w-1/2">
            <h1 className="font-bold text-4xl text-white py-3">TECTONA FURNITURE INVENTORY MANAGEMENT SYSTEM</h1>
            <p className="text-center text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem veritatis laborum porro?</p>
            <div className="buttons flex items-center justify-center p-2 gap-2">
                <Link to="/login" className="w-full bg-blue-600 border-none rounded px-3 py-2 text-white hover:bg-blue-700">Login</Link>
                <Link to="/register" className="w-full bg-blue-600 border-none rounded px-3 py-2 text-white hover:bg-blue-700">Register</Link>
            </div>
        </div>
    </div>
  )
}

export default Welcome