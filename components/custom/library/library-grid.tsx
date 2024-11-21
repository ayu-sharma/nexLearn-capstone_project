import { ArrowRight, Code } from 'lucide-react'
import React from 'react'

const LibraryGrid = () => {
  return (
    <div className='grid grid-cols-4 gap-6'>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
    </div>
  )
}

export default LibraryGrid

const CourseCard = () => {
    return (
        <div className='group transition cursor-pointer relative shadow-sm p-6 border rounded-md flex flex-col gap-y-4 hover:border-neutral-400'>
            <div className='flex items-center'>
                <Code className='mr-2 '/>
                <h1 className='text-2xl font-medium'>Course Title</h1>
            </div>
            <p className='font-light'>Course description</p>
            <div className='flex w-1/3'>
                <p className='text-sm font-medium bg-[#7981FF]/20 text-[#7981FF] px-4 py-1 rounded'>APTITUDE</p>
            </div>
            <div className='absolute bottom-6 right-6 hidden group-hover:flex transition'>
                <ArrowRight />
            </div>
        </div>
    )
}