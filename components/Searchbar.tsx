import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const Searchbar = () => {
  return (
    <div className='flex items-center gap-x-1'>
        <Input placeholder={`Search...`} className='w-[200px] dark:border-[#F2F2F2]/30 border-[#121417]/20'/>
        <Button size={'icon'} className='aspect-square'>
          <Search className='h-5 w-5'/>
        </Button>
    </div>
  )
}

export default Searchbar