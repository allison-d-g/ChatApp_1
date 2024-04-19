import React from 'react'
import { TbMessageCircleSearch } from "react-icons/tb";

const SearchInput = () => {
  return (
    // <div><h1>Hello</h1></div>
    <form className='flex items-center gap-2'>
        <input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <TbMessageCircleSearch />
        </button>  
    </form>
  )
}

export default SearchInput
