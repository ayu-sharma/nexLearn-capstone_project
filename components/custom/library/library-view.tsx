"use client";

import React, { useState } from 'react'
import LibraryTopbar from './library-topbar'
import LibraryGrid from './library-grid'
import axios from 'axios';

interface LibraryProps {
  onSelectCourse: (courseId: string) => void;
}

const Library = ({ onSelectCourse }:  LibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const handleCourseSelect = async (courseId: string) => {
    console.log("iscliked")
    try {
      const token = localStorage.getItem("token");
      const cId = parseInt(courseId);
      const response = await axios.put('http://localhost:3000/api/user/me', {
        courseId: cId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        onSelectCourse(courseId);
        localStorage.setItem("cId", courseId);
      }
    } catch (error) {
      console.error('Error while updating last viewed course: ' + error);
    }
  }
  return (
    <div>
      <LibraryTopbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />
      <LibraryGrid searchTerm={searchTerm} filter={filter} onCourseSelect={handleCourseSelect}/>
    </div>
  )
}

export default Library