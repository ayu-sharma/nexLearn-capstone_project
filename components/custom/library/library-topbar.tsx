import Searchbar from '@/components/Searchbar'
import React from 'react'
import LibraryFilter from './library-filter'

const LibraryTopbar = () => {
  return (
    <div className='flex items-center gap-x-6 mb-8'>
        <Searchbar />
        <LibraryFilter />
    </div>
  )
}

export default LibraryTopbar