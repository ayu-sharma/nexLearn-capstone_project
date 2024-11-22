import Searchbar from '@/components/Searchbar'
import React from 'react'
import LibraryFilter from './library-filter'

interface LibraryTopbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: string;
  setFilter: (filter: string) => void;  
}

const LibraryTopbar = ({ searchTerm, setSearchTerm, filter, setFilter }: LibraryTopbarProps) => {
  return (
    <div className='flex items-center gap-x-6 mb-8'>
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <LibraryFilter filter={filter} setFilter={setFilter}/>
    </div>
  )
}

export default LibraryTopbar