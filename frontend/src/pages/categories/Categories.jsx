/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories/', {
                headers: {Authorization: `Bearer ${token}`}
            });
            setCategories(response.data);
        } catch (err) {
            console.error('Failed to get categories', err);
        }
    };
    const handleDelete = (category) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the ${category.name} category?`);
        if(!confirmDelete) return;

        try {
            axios.delete(`http://localhost:5000/api/categories/${category.id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            fetchCategories();
        } catch (err) {
            console.error('Failed to delete category!', err);
        }
    };
    useEffect(()=> {
        fetchCategories();
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post('http://localhost:5000/api/categories', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status == 200 || response.status == 201) {
                console.log(response)
                setMessage(response.data.message);
                setFormData({
                    name: '',
                    description: ''
                })
            } else {
                setError(response.data?.message || 'Something went wrong!');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong!');
            console.error('Post category error', err);
        } finally {
            setLoading(false);
        }
    }
    
  return (
    <div className='min-h-screen bg-black flex flex-col m-0 items-start '>
        <Navbar />
        <div className="main flex flex-col items-start px-5">
            <h2 className="text-5xl font-bold text-blue-500 pt-5">Categories</h2>
            <div className="form w-full">
                <h2 className="text-blue-500 font-bold mt-4">Add category</h2>
                {error && (
                <p className="text-red-500 ">{error}</p>
                )}
                {message && (
                    <p className="text-green-500">{message}</p>
                )}
                <form action="" className="flex items-center gap-3 w-full" onSubmit={handleSubmit}>
                    <div className="input-group ">
                        <input type="text" name='name'  value={formData.name} onInput={handleChange} className="border-b outline-none bg-none text-white border-gray-400" placeholder='Category Name'/>
                    </div>
                    <div className="input-group">
                        <input type="text" name='description' value={formData.description} onInput={handleChange} className="border-b outline-none bg-none text-white border-gray-400" placeholder='Description'/>
                    </div>
                    <button type="submit" className='w-full bg-blue-600 border-none rounded px-2 py-1 text-white hover:bg-blue-700 my-3 pointer'>{loading ? "Adding..." : "Add Category"}</button>
                </form>
                <hr />
            </div>
            </div>
            <div className="table w-full px-5 text-white">
                <table className='table-auto w-full border-collapse border-b border-gray-400 mb-4'>
                    <thead>
                        <tr className='bg-gray-900'>
                            <th className='py-3'>Name</th>
                            <th className='py-3'>Description</th>
                            <th className='py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                            {categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td className="py-2 text-center">{cat.name}</td>
                                    <td className="py-2 text-center">{cat.description}</td>
                                    <td className="py-2 flex gap-2">
                                        <button className="bg-blue-500 px-2 py-1 rounded hover:bg-blue-600 cursor-pointer" onClick={() => navigate(`/categories/${cat.id}`)}>Edit</button>
                                        <button className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 cursor-pointer" onClick={() => handleDelete(cat)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default Categories