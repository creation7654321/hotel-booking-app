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
  const[relatedPost, setRelatedPost] = useState([]);
  // console.log("post details",postDetails);
  console.log("REaltedpost", relatedPost);
  
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
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/related-post/${pid}/${cid}`);
      setRelatedPost(res.data.relatedPost);
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