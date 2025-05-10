/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/register`, formData);
            if (response.status == 200 || response.status == 201) {
                navigate('/login');
            } else {
                setError(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error submitting form!');
            console.error('Login Error', err);
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className='min-h-screen flex flex-col justify-center items-center m-0 bg-black'>
        <div className="form-container flex flex-col items-center justify-center text-white rounded p-3 w-1/3">
            <h2 className="text-center py-2 text-blue-500 text-2xl font-bold">TECTONA FURNITURE INVENTORY MANAGEMENT SYSTEM</h2>
            <p className="text-center text-xl">Register to get started!</p>
            {error && (
                <p className="text-red-500 text-center">{error}</p>
            )}
            <form action="" className='w-full mx-[20px]' onSubmit={handleSubmit}>
                <div className="my-2 w-full flex flex-col">
                    <label htmlFor="user">Username</label>
                    <input type="text" name='username' value={formData.username} onInput={handleChange} id='username' className="p-2 outline-none border-b-1  border-blue" required/>
                </div>
                <div className="my-2 w-full flex flex-col">
                    <label htmlFor="user">Email</label>
                    <input type="email" name='email' value={formData.email} onInput={handleChange} id='email' className="p-2 outline-none border-b-1  border-blue" required/>
                </div>
                <div className="my-2 w-full flex flex-col">
                    <label htmlFor="user">Password</label>
                    <input type="password" value={formData.password} onInput={handleChange} name='password' id='password' className="p-2 outline-none border-b-1  border-blue" required/>
                </div>
                <button type="submit" className='w-full bg-blue-600 border-none rounded px-3 py-2 text-white hover:bg-blue-700 my-3'>{loading ? "Registering..." : "Register"}</button>
            </form>
            <p className="py-2 text-center">Already have an account? <Link to='/login' className='text-blue-800 underline pointer'>Login Here!</Link></p>
        </div>
    </div>
  )
}

export default Register