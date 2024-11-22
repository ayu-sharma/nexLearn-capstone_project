"use client"

import axios from 'axios';
import { ArrowRight, BookA, Code, DraftingCompass } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface LibraryGridProps {
    searchTerm: string;
    filter: string;
    onCourseSelect: (courseId: string) => void;
}

const LibraryGrid = ({ searchTerm, filter, onCourseSelect }: LibraryGridProps) => {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/courses')
            setCourses(response.data.courses);
          } catch (error) {
            console.error('Error fetching courses:', error);
          } finally {
            setLoading(false);
          }
        }
    
        fetchCourses()
      }, []);

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLocaleLowerCase());
        const matchesFilter = filter === 'All' || course.type.toUpperCase() === filter.toUpperCase();
        return matchesFilter && matchesSearch;
    })
  return (
    <div className='grid grid-cols-4 gap-6'>
        {loading 
            ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
            : filteredCourses.map((course) => (
                <CourseCard key={course.id} id={course.id} title={course.title} description={course.description} type={course.type} onClick={() => onCourseSelect(course.id)}/>
              ))
        }
    </div>
  )
}

export default LibraryGrid

interface CourseCardProps {
    id: string;
    title: string;
    description: string;
    type: string;
    onClick: () => void;
}

const CourseCard = ({ id, title, description, type, onClick }: CourseCardProps) => {
    const renderLogo = () => {
        switch(type) {
            case "CODING":
                return <Code className='mr-2'/>;
            case "APTITUDE":
                return <DraftingCompass className='mr-2'/>
            case "LANGUAGE":
                return <BookA className='mr-2'/>
        }
    }
    return (
        <div onClick={onClick} className='group transition cursor-pointer relative shadow-sm p-6 border rounded-md flex flex-col justify-between gap-y-4 hover:border-neutral-400'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex items-center'>
                    {renderLogo()}
                    <h1 className='text-2xl font-medium'>{title}</h1>
                </div>
                <p className='font-light'>{description}</p>
            </div>
            <div className='flex w-1/3'>
                <p className='text-sm font-medium bg-[#7981FF]/20 text-[#7981FF] px-4 py-1 rounded'>{type}</p>
            </div>
            <div className='absolute bottom-6 right-6 hidden group-hover:flex transition ease-in-out'>
                <ArrowRight />
            </div>
        </div>
    )
}

const SkeletonCard = () => {
    return (
        <div className='animate-pulse shadow-sm p-6 border rounded-md flex flex-col justify-between gap-y-4'>
        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center gap-x-2'>
            <div className='w-8 h-8 bg-gray-300/20 rounded-full'></div>
            <div className='w-2/3 h-6 bg-gray-300/20 rounded'></div>
          </div>
          <div className='w-full h-4 bg-gray-300/20 rounded'></div>
          <div className='w-5/6 h-4 bg-gray-300/20 rounded'></div>
        </div>
        <div className='w-1/3 h-6 bg-gray-300/20 rounded'></div>
      </div>        
    )
}