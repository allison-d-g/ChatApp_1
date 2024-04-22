import React, { useState } from 'react'
import { TbMessageCircleSearch } from "react-icons/tb";
import useConversation from '../../zustand/useConversation';
import useGetConversations from "../../hooks/useGetConversations";
// import setSelectedConversation from "../../zustand/useConversation"
import toast from 'react-hot-toast';

//this implements the search function, user can search name in the search bar
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const{ setSelectedConversation } = useConversation();
  const{ conversations} = useGetConversations();

  const handleSubmit =(e) => {
    e.preventDefault()
    if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user!");
  }

  return (
    // <div><h1>Hello</h1></div>
    <form onSubmit = {handleSubmit} className='flex items-center gap-2'>
        <input type='text' placeholder='Search…' className='input input-bordered rounded-full'
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <TbMessageCircleSearch />
        </button>  
    </form>
  )
}

export default SearchInput
