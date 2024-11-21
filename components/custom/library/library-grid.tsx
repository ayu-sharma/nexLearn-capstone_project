"use client"

import axios from 'axios';
import { ArrowRight, BookA, Code, DraftingCompass } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const LibraryGrid = () => {
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/courses')
            setCourses(response.data.courses);
          } catch (error) {
            console.error('Error fetching courses:', error)
          }
        }
    
        fetchCourses()
      }, []);
  return (
    <div className='grid grid-cols-4 gap-6'>
        {courses.map((course) => (
        <CourseCard key={course.id} title={course.title} description={course.description} type={course.type} />
      ))}
    </div>
  )
}

export default LibraryGrid

interface CourseCardProps {
    title: string;
    description: string;
    type: string;
}

const CourseCard = ({ title, description, type }: CourseCardProps) => {
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
        <div className='group transition cursor-pointer relative shadow-sm p-6 border rounded-md flex flex-col justify-between gap-y-4 hover:border-neutral-400'>
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
            <div className='absolute bottom-6 right-6 hidden group-hover:flex transition'>
                <ArrowRight />
            </div>
        </div>
    )
}