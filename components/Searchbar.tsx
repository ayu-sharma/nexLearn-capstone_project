import React from 'react'
import { Search } from 'lucide-react'

const Searchbar = () => {
  return (
    <div className='flex items-center w-[256px] px-4 py-2 bg-transparent border border-[#121417] dark:border-[#F2F2F2]/80 rounded-md text-sm'>
        <Search className='w-5 h-5 mr-2'/>
        <input type='text' className='bg-transparent focus:outline-none' placeholder=' course, author, theme'/>
    </div>
  )
}

export default Searchbar