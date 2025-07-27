import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';

function CreatePost() {
    const [title, setTitle] = useState("");
    const [hotelLocation, setHotelLocation] = useState("");
    const [description, setDescription] = useState("");
    const [facilities, setFacilities] = useState("");
    const [nearArea, setNearArea] = useState("");
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [images, setImages] = useState([]);
    const [guest, setGuest] = useState("1");
    const [isAvailable, setIsAvailable] = useState(false);
    const [price, setPrice] = useState("");

    const fetchCategory = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/get-category`);
            setCategory(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(category)

    useEffect(()=>{
        fetchCategory();
    },[])
    return (
    <div className='flex justify-between text-black mt-11'>
        <div className='ml-[4rem]'>
            <Navbar />
        </div>

        <div className='flex flex-col p-8 w-[81%]'>
            <h1 className='text-2xl font-bold mb-6 text-gray-800'>Create Post</h1>
            <form className='space-y-4'>
                <input 
                type="text" 
                
                />

            </form>

        </div>

    </div>
  )
}

export default CreatePost