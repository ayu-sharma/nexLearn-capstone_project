import React from 'react'
import { Input } from './ui/input'

interface SearchbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Searchbar = ({ searchTerm, setSearchTerm }: SearchbarProps) => {
  return (
    <div className='flex items-center gap-x-1'>
        <Input 
          placeholder={`Search...`} 
          className='w-[200px] dark:border-[#F2F2F2]/30 border-[#121417]/20'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
  )
}

export default Searchbar