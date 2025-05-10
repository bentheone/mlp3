/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';


const EditCategory = () => {
    const {id} = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCategory = async(id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/categories/${id}`,{
                headers: {Authorization: `Bearer ${token}`}
            });
            setCategory(res.data);
            setLoading(false)
        } catch (err) {
            console.error('Error getting gategory', err);
        }
    }

    useEffect(() => {
        fetchCategory(id);
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCategory((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/api/categories/${id}`, category, {
                headers: {Authorization: `Bearer ${token}`}
            })
            if(!res.status == 200) {
                setError(res.data.message);
            }
            alert('Category updated!');
            navigate('/categories');
        } catch (err) {
            console.log('Error updating', err);
            setError(err?.response?.data?.message || 'Error occured! Retry!')
        }
    }
return (
    <div className='min-h-screen bg-black flex flex-col m-0 items-center'>
        <Navbar/>
        <div className="main flex flex-col items-start px-5">
            <h2 className="text-5xl font-bold text-blue-500 pt-5">Categories</h2>
            <div className="form w-full">
                <h2 className="text-blue-500 font-bold mt-4">Edit category</h2>
                {error && (
                <p className="text-red-500 ">{error}</p>
                )}
                
                <form action="" className="flex items-center gap-3 w-full" onSubmit={handleSubmit}>
                    <div className="input-group ">
                        <input type="text" name='name'  value={category.name } onInput={handleChange} className="border-b outline-none bg-none text-white border-gray-400" placeholder='Category Name'/>
                    </div>
                    <div className="input-group">
                        <input type="text" name='description' value={category.description } onInput={handleChange} className="border-b outline-none bg-none text-white border-gray-400" placeholder='Description'/>
                    </div>
                    <button type="submit" className='w-full bg-blue-600 border-none rounded px-2 py-1 text-white hover:bg-blue-700 my-3 pointer'>Update</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditCategory