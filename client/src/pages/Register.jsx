import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {toast} from 'react-toastify';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setEmail("");
        if(!name || !email || !password){
            setError("Please fill in all fileds");
            return;
        }
        if(password.length < 6){
            setError("Password must be at least 6 charactes long");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/register`,{
                name,
                email,
                password,
            });
            toast.success("Register Successfully");
            navigate("/login");

        } catch (error) {
            setError(error.response.data.message);
            toast.error("Register failed please try again");
            console.log(error);
        }
    }
  return (
    <div className='flex items-center justify-center bg-gray-100 pt-10 pb-10'>
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
            <h2 className='text-2xl font-semibold text-center mb-6'>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='black text-sm font-medium text-gray-700'>Name</label>
                    <input 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    type="text" 
                    placeholder='' 
                    className='mt-2 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-500'
                    />
                </div>

                <div className='mb-4'>
                    <label className='black text-sm font-medium text-gray-700'>Email</label>
                    <input 
                    name={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    type="email" 
                    placeholder='' 
                    className='mt-2 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-500'
                    />
                </div>


                <div className='mb-4'>
                    <label className='black text-sm font-medium text-gray-700'>Passowrd</label>
                    <input 
                    name={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password" 
                    placeholder='' 
                    className='mt-2 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-500'
                    />
                </div>

                <button
                type="submit"
                className='w-full border bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-2 py-2'
                >
                    Register
                </button>
            </form>

            <p className='text-center mt-6 text-sm text-gray-700'>
                Already have an account?
                <a href="/login" className='text-blue-500 hover:underline'>Login</a>
            </p>
        </div>

    </div>
  )
}

export default Register