"use client"

import React from 'react'
import { useUserContext } from '@/context/UserContext';

const Username = () => {
  const { user } = useUserContext();

  if (!user) {
    return <div className="flex items-center justify-center h-10">Loading...</div>;
  }
  
  return (
    <div className='flex items-center gap-x-2 md:gap-x-4 cursor-pointer group transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'>
        {/* Mobile layout (text first, then avatar) */}
        <div className='flex flex-row md:flex-row-reverse w-full items-center'>
            {/* Text container - responsive width and alignment */}
            <div className='text-start md:text-end flex-1 min-w-0'>
                <h1 className='font-semibold text-sm md:text-base truncate'>{user.name}</h1>
                <p className='text-xs font-light truncate hidden sm:block'>{user.email}</p>
            </div>
            
            {/* Avatar - consistent size across breakpoints */}
            <div className='flex-shrink-0 aspect-square flex items-center justify-center h-8 md:h-10 bg-white rounded-full text-[#121417] border border-[#121417] dark:border-[#F2F2F2] dark:bg-gray-800 dark:text-white text-sm md:text-base font-medium ml-2 md:ml-0 md:mr-2'>
                {user.name[0]}
            </div>
        </div>
    </div>
  )
}

export default Username