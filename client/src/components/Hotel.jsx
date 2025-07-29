import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

function Hotel() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [posts, setPosts] = useState([]);
  console.log("All post data", posts);

  const handleApi = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  const [imageIndexes, setImagesIndex] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setImagesIndex((prevImage) => {
        const newIndexes = { ...prevImage };
        posts.forEach((post) => {
          const currentIndex = newIndexes[post._id] || 0;
          newIndexes[post._id] = (currentIndex + 1) % post.images.length;
        });
        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [posts]);

  return (
    <div className='container mx-auto mt-16'>
      <h2 className='text-3xl font-semibold mb-8 ml-[8rem]'>Popular hotels</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={['tablet', 'mobile']}
      >
        {posts.map((hotel) => (
          <div
            key={hotel._id}
            className='bg-white rounded-lg overflow-hidden mx-auto w-64'
          >
            <img
              className='object-cover w-full h-64'
              src={hotel.images[imageIndexes[hotel._id] || 0]} // fallback to 0 index if undefined
              alt={hotel.name || "Hotel Image"}
            />
            <div className='p-4'>
                <Link
                to={`product/${hotel.slug}`}
                className='text-lg font-semibold cursor-pointer'
                >
                    {hotel.title}
                </Link>

            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Hotel;
