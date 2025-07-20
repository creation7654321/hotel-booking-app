import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

function Login() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
        setEmail("");
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,{
                email,
                password
            });
            toast.success("Login successful");
            navigate("/");
            
            
        } catch (error) {
            setError(error.response.data.message);
            toast.error("login failed please try again");
            console.log(error);
        }
    }
    
  return (
    <div className='flex items-center justify-center bg-gray-100 pt-10 pb-10'>
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
            <h2 className='text-2xl font-semibold text-center mb-6'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className='mb-4'>
                    <label className='black text-sm font-medium text-gray-700'>
                        Email
                    </label>
                    <input type="email" 
                    placeholder='' 
                    className='mt-2 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-500'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div className='mb-4'>
                    <label className='black text-sm font-medium text-gray-700'>
                        Password
                    </label>
                    <input type="password" 
                    placeholder='' 
                    className='mt-2 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-300 focus:border-indigo-500'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                            <input type="checkbox" className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-md" />
                            <p>Keep me signed in</p>
                    </div>
                    <a className='hover:underline text-indigo-600 text-sm cursor-pointer'>Forgot Password?</a>
                </div>

                {error && (
                    <p className='text-red-500 text-sm mt-2'>{error}</p>
                )}

                <button
                type="submit"
                className='w-full border bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-2 py-2'
                >
                    Login
                </button>
            </form>

            <p className='text-center mt-6 text-sm text-gray-700'>
                Dont have an account?
                <a href="/register" className='text-blue-500 hover:underline'>Register</a>
            </p>
        </div>
    </div>
   
  )
}

export default Login