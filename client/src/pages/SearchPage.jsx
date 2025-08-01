import React from 'react'
import Filter from '../components/Search/Filter'
import ProductList from '../components/Search/ProductList'
import { useSearch } from '../context/Search'

function SearchPage() {
    const[search, setSearch] = useSearch();
  return (
    <div className='flex justify-between ml-[9rem] mr-[9rem] mt-8'>
        <h1>SearchPage</h1>
        <Filter />
        <ProductList 
        products={
            search.keywoard ? search.keywoard.data : []
        }
        />
    </div>
  )
}

export default SearchPage