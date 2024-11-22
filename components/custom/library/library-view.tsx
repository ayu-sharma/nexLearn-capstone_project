"use client";

import React, { useState } from 'react'
import LibraryTopbar from './library-topbar'
import LibraryGrid from './library-grid'

interface LibraryProps {
  onSelectCourse: (courseId: string) => void;
}

const Library = ({ onSelectCourse }:  LibraryProps) => {
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
      <LibraryGrid searchTerm={searchTerm} filter={filter} onCourseSelect={(courseId) => onSelectCourse(courseId)}/>
    </div>
  )
}

export default Library