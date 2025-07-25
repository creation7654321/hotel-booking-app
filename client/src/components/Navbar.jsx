import React, { useState } from 'react'
import { FaUser} from 'react-icons/fa'
import logo from '../assets/logo.png'
import { useAuth } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const isSingIn = true;

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const[auth] = useAuth();
    const navigate = useNavigate();

    const handleDropDownTogle = ()=>{
        setIsDropDownOpen(prevState => !prevState);
    }

    const closeDropDown = ()=>{
        setIsDropDownOpen(false);
    }

    const handleRedirect = ()=>{

        if(auth.user.role === "admin"){
            navigate('/admin/details');
        }
        else{
            navigate('/user');
        }
    }

  return (
    <nav className='flex items-center justify-between p-4'>
        <div className='flex items-center space-x-2'>
            <img src={logo} alt="logo" className='ml-[7rem]'/>
        </div>

        <div className="hidden md:flex space-x-6">
            <a href="" className='text-gray-600 hover:text-gray-900 hover:translate-1'>Home</a>
            <a href="" className='text-gray-600 hover:text-gray-900'>Discover</a>
            <a href="" className='text-gray-600 hover:text-gray-900'>Activities</a>
            <a href="" className='text-gray-600 hover:text-gray-900'>Contact us</a>
            <a href="" className='text-gray-600 hover:text-gray-900'>About us</a>
        </div>

        <div className="flex items-center space-x-4 mr-[9rem] relative cursor-pointer">
            <FaUser 
            size={20}
            onClick={handleDropDownTogle}
            />

            {isDropDownOpen && (
                <div 
                className='absolute right-0 mt-36 bg-white border border-gray-200 rounded shadow-lg z-50'
                onMouseLeave={closeDropDown}
                >
                    <ul>
                        <li onClick={handleRedirect} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                            Profile
                        </li>

                        {isSingIn ?(
                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                <a href="/">SingOut</a>
                            </li>
                        )
                        :
                        (
                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                <a href="/">SignIn</a>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar