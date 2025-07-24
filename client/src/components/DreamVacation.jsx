import React from 'react'
import image1 from "../assets/Post/Rectangle 8.png"
import image2 from "../assets/Post/Rectangle 9.png"
import image3 from "../assets/Post/Rectangle 10.png"
import image4 from "../assets/Post/Rectangle 11.png"
function DreamVacation() {

    const destinations = [
        {image: image1, name: "Australia", properties:2246},
        {image: image2, name: "Japan", properties:1278},
        {image: image3, name: "New Zealand", properties:480},
        {image: image4, name: "Greece", properties:320},
    ]
  return (
    <div className='flex flex-col mt-14'>
        <h1 className='text-3xl font-semibold mb-2 ml-[12rem]'>Enjoy you dream vacation</h1>
        <p className='text-gray-600 mb-10 max-w-xl ml-[12rem]'>Plan and book your perfect trip with expert advice, travel tips, destination information and inspiration from us</p>
        <div className='flex gap-4 justify-center'>
            {destinations.map((destination, index)=>(
                <div key={index} className='text-center'>
                    <img 
                    src={destination.image} 
                    alt={destination.name}
                    className='w-[18rem] h-48 object-cover rounded-lg'
                    />
                    <h2 className='text-lg font-semibold mt-2'>{destination.name}</h2>
                    <p className='text-gray-500'>{destination.properties}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DreamVacation