import React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react';
interface SearchbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Searchbar = ({ searchTerm, setSearchTerm }: SearchbarProps) => {
  return (
    <div className='flex items-center gap-x-2'>
        <Input 
          placeholder={`Search...`} 
          className='dark:border-[#F2F2F2]/30 border-[#121417]/20 max-w-sm w-full'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <div onClick={{}} className='bg-gray-400 px-1 py-1 hover:bg-transparent hover:border-gray-400 hover:rounded-sm cursor-pointer hover:border border border-gray-400 rounded-sm'>
          <Search/>
        </div> */}
    </div>
  )
}

export default Searchbar