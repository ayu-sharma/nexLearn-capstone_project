"use client"

import React from 'react'
import { useUserContext } from '@/context/UserContext';

const Username = () => {
  const { user } = useUserContext();

  if (!user) {
    return <div>Loading</div>;
  }
  
  return (
    <div className='flex items-center gap-x-4 cursor-pointer'>
        <div className='text-end'>
            <h1 className='font-semibold'>{user.name}</h1>
            <p className='text-xs font-light'>{user.email}</p>
        </div>
        <div className='aspect-square flex items-center justify-center h-10 bg-white rounded-full text-[#121417] border border-[#121417] dark:border-[#F2F2F2]'>
            {user.name[0]}
        </div>
    </div>
  )
}

export default Username