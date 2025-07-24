import React from 'react'
import BannerImage from '../assets/Rectangle2.png';


function Banner() {
  return (
   <div 
    style={{backgroundImage: `url(${BannerImage})`}}
    className='relative w-full h-[500px] bg-center bg-cover'
    >
        <div className='absolute inset-0 bg-black opacity-40'></div>
        <div className='relative z-10 flex flex-col items-center justify-center text-white h-full px-4'>
            <h1 className='text-3xl sm:text-4xl font-bold text-center'>
                Enjoy your dream vacation
            </h1>
            <p className='mt-2 text-center'>
                Voluptate qui doloremque nobis velit delectus nemo quam fuga, rerum accusamus eum?
            </p>
            <div 
            className='mt-8 w-full max-w-[57rem] 
            sm:w-[80%] md:w-[60%] bg-white p-4
            rounded-lg shadow-lg flex items-center space-x-4'
            >
                <input 
                type="text" 
                className='flex-grow p-2 border-gray-300 border rounded-md
                text-black focus:outline-none focus:ring-blue-500 bg-white'
                placeholder='Search Destination......'
                />
                <button
                className='px-4 py-2 bg-blue-600 text-white 
                font-medium rounded-md hover:bg-blue-700 transiton'
                >
                    Search
                </button>

            </div>
        </div>
    </div>
  )
}

export default Banner
