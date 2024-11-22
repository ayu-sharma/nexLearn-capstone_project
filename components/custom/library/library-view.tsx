"use client";

import React, { useState } from 'react'
import LibraryTopbar from './library-topbar'
import LibraryGrid from './library-grid'

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  return (
    <div>
      <LibraryTopbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />
      <LibraryGrid searchTerm={searchTerm} filter={filter}/>
    </div>
  )
}

export default Library