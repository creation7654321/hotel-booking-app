import React, { useEffect, useState } from 'react'
import {FaWifi, FaBriefcase, FaSwimmingPool, FaCar, FaStar} from "react-icons/fa"
import {MdLocationOn} from 'react-icons/md'
import axios from "axios";
// import Spinner from '../Routes/Spinner';

import { useParams } from 'react-router-dom';
import RelatedProduct from './RelatedProduct';
import { useCart } from '../../context/Cart';
import Spinner from '../Routes/Spinner';
import { toast } from 'react-toastify';

function Product() {
  const params = useParams();
  const[postDetails, setPostDetails] = useState(null);
  const[relatedPost, setRelatedPost] = useState([]);
  const{cart, setCart} = useCart();
  console.log("post details",postDetails);
  console.log("Relatedpost", relatedPost);
  
  const handlePostDetails = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/get-post/${params.slug}`);
      const post = response.data.post;
      setPostDetails(response.data.post);
      getRealtedPost(post?._id, post?.category._id);
    } catch (error) {
      console.log(error);
    }
    
  }


  const getRealtedPost = async(pid, cid)=>{
    try {
      console.log("hi")
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/related-post/${pid}/${cid}`);
      setRelatedPost(res.data?.relatedPost);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    handlePostDetails();
  },[])

const handleAddToCart = ()=>{
  if(postDetails?.isAvailable){
    setCart([...cart, postDetails]);
    localStorage.setItem("cart",JSON.stringify([...cart,postDetails]));
    toast.success("product added to cart successfully!");
  }
}

  if(!postDetails) return <Spinner />

  return (
    <div className='p-8 min-h-screen'>
      <div className='flex flex-col md:flex-row md:space-x-8 overflow-hidden'>
        {/* image section */}
        <div className='flex flex-col space-x-4 p-4 md:w-1/2'>
          {postDetails?.images?.length > 0 && (
            <>
              <img 
              src={postDetails?.images[0]}
              alt="Main Image" 
              className='w-full h-[25rem] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105'
              />
              <div className='grid grid-cols-2 gap-6'>
                {postDetails?.images.slice(1).map((img,idx)=>{
                  return(
                    <img 
                    key={idx}
                    src={img}
                    alt={`Additional image ${idx+1}`}
                    className='h-[100%] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105'
                    />
                  )
                })}
              </div>
            </>
          )}
        </div>
        {/* Details Section */}
        <div className='flex-1 p-8 md:w-1/2'>
          <h1 className='text-3xl font-bold text-gray-800'>{postDetails?.title}</h1>
          <div className='flex items-center space-x-2 text-yellow-500 mb-4'>
            <FaStar />
            <span className='text-xl font-semibold'>4.5</span>
            <span className='text-gray-500 '>(1200 Reviews)</span>
          </div>
          <p className='flex items-center text-gray-600 mb-4'>
            <MdLocationOn className='text-xl' />
            {postDetails?.hotelLocation || "Location unavailable"}
          </p>
          <div className="flex space-x-4 mb-6">
            <button className='px-6 py-3 font-semibold rounded-lg shadow-transparent bg-blue-500 text-white hover:bg-blue-700 cursor-pointer'>Check-in</button>
            <button 
            className={`px-6 py-3 font-semibold rounded-lg shadow-transparent 
              ${postDetails?.isAvailable
                ? "bg-gray-200 text-gray-700 hover:bg-gray-600"
                :"bg-gray-300 text-white cursor-not-allowed"} `}
            >
              Add to Wishlist</button>
            {/* <button className={`px-6 py-3 font-semibold rounded-lg shadow-transparent ${
              postDetails.isAvailable
              ? "bg-gray-200 text-gray-700 hover:bg-gray-600"
              : "bg-gray-300 text-gray-300 cursor-not-allowed"
            }`}
            onClick={handleAddToCart}
            >
              Add to Wishlist</button> */}
          </div>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-800'>Overview</h2>
            <p className='text-gray-600'>{postDetails?.description}</p>
          </div>
          <div className='mt-3'>
            <p className='text-base font-bold text-orange-600'>
              Price Per Day :{""}
              <span className='text-xl text-gray-500'>
                {postDetails?.price.toLocaleString("en-Us", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </p>
          </div>
          <div className='flex justify-between'>
            {/* NearBy Area */}
            {/* <div div className='mt-8'>
              <h2 className='text-xl font-semibold text-gray-700'>Near Area</h2>
              <ul className='space-y-2 mt-2 text-gray-700 list-disc pl-5'>
                {postDetails.nearArea?.flatMap((area,idx)=>(
                  area.split(",")
                  .map((subArea,subIdx)=>(
                    <li key={`${idx} - ${subIdx}`}>{subArea.trim()}</li>
                  ))
                ))}
              </ul>
            </div> */}

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800">Near Area</h2>
              <ul className="space-y-2 mt-2 text-gray-700 list-disc pl-5">
                {postDetails?.nearArea?.flatMap((area, idx) =>
                  area
                    .split(",")
                    .map((subArea, subIdx) => (
                      <li key={`${idx}-${subIdx}`}>{subArea.trim()}</li>
                    ))
                )}
              </ul>
            </div>
            <div className='mt-8 mr-32'>
              <h2 className='text-xl font-semibold text-gray-700'>Facilities</h2>
              <ul className="space-y-2 mt-2 text-gray-700 list-disc pl-5">
                {postDetails?.facilities?.flatMap((area, idx) =>
                  area
                    .split(",")
                    .map((subArea, subIdx) => (
                      <li key={`${idx}-${subIdx}`}>{subArea.trim()}</li>
                    ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <h1>
        You may like this:
      </h1>
      <RelatedProduct relatedProducts={relatedPost}/>
    </div>
  )
}

export default Product

