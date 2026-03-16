import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  if (!showSearch) return null;

  return (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='relative inline-flex items-center justify-center border border-gray-300 px-4 py-3 my-5 mx-3 rounded-full w-11/12 sm:w-2/3 lg:w-1/2'>
        <input
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full px-4 py-2 text-sm outline-none bg-transparent'
        />
        <img src={assets.search_icon} alt='search icon' className='w-5 h-5 absolute right-12' />
        <button onClick={() => setShowSearch(false)} className='absolute right-4'>
          <img src={assets.cross_icon} alt='close icon' className='w-4 h-4' />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
