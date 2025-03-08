"use client";

import React, { useState } from 'react';
import LibraryTopbar from './library-topbar';
import LibraryGrid from './library-grid';
import axios from 'axios';
import toast from 'react-hot-toast';

interface LibraryProps {
  onSelectCourse: (courseId: string) => void;
}

const Library = ({ onSelectCourse }: LibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const handleCourseSelect = async (courseId: string) => {
    try {
      const token = localStorage.getItem("token");
      const cId = courseId;
      const response = await axios.post('http://localhost:3000/api/user/courses/enrolled', {
        courseId: cId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        onSelectCourse(courseId);
        toast.success('Enrolled in course');
      }
    } catch (error) {
      console.error('Error while updating last viewed course: ' + error);
      toast.error("Already enrolled");
    } finally {
      localStorage.setItem("cId", courseId);
      // router push courses
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <LibraryTopbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      />
      <LibraryGrid 
        searchTerm={searchTerm} 
        filter={filter} 
        onCourseSelect={handleCourseSelect}
      />
    </div>
  );
}

export default Library;