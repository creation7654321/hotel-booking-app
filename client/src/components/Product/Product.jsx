import React, { useEffect, useState } from 'react'
import {FaWifi, FaBriefcase, FaSwimmingPool, FaCar, FaStar} from "react-icons/fa"
import {MdLocationOn} from 'react-icons/md'
import axios from "axios";
import Spinner from '../Routes/Spinner';
import RelatedPost from './RelatedPost';
import { useParams } from 'react-router-dom';


function Product() {
  const params = useParams();
  const[postDetails, setPostDetails] = useState(null);
  console.log("post details",postDetails);
  
  const handlePostDetails = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/get-post/${params.slug}`);
      setPostDetails(response.data.post);
    } catch (error) {
      console.log(error);
    }
    
  }
  useEffect(()=>{
    handlePostDetails();
  },[])
  return (
    <div>
      Product
      
    </div>
  )
}

export default Product