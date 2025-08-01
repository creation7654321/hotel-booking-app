import React from 'react'

function ProductList({products}) {

  return (
    <div className='flex flex-col items-center w-[92%] relative bottom-7 ml-12'>
        <h1 className='text-2xl font-bold mb-8 mt-9'>
            {products.length < 1
            ? "NO Products found"
            : "Popular proudcts"
            }
        </h1>
       
    </div>
  )
}

export default ProductList