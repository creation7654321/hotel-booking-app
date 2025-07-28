import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


function CreateCategory() {

  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/category/delete-category/${id}`)
      fetchCategories();
    } catch (error) {
      console.log("Error deleting category");
    }
  }
  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      setCategory(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (id, name)=>{
    setEditId(id);
    setCategoryName(name);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    try {
      
    } catch (error) {
      
    }

  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.warn("You can only upload a maximum of 3 images.");
    } else {
      setImages(files);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate form fields
  //   if (
  //     !title ||
  //     !hotelLocation ||
  //     !description ||
  //     !facilities ||
  //     !nearArea ||
  //     !selectedCategory ||
  //     !guest ||
  //     !price
  //   ) {
  //     return toast.error("All fields are required.");
  //   }

  //   if (images.length !== 3) {
  //     return toast.error("Please upload exactly 3 images.");
  //   }

  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("hotelLocation", hotelLocation);
  //   formData.append("description", description);
  //   formData.append("facilities", facilities);
  //   formData.append("nearArea", nearArea);
  //   formData.append("category", selectedCategory);
  //   formData.append("guest", guest);
  //   formData.append("isAvailable", isAvailable);
  //   formData.append("price", price);

  //   images.forEach((file) => {
  //     formData.append("images", file);
  //   });

    
  // };
  return (
    <div >
     
    </div>
  )
}

export default CreateCategory