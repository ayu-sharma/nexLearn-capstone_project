"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const HomePage = () => {
  
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push('/login');
                return;
            }
        } catch (error) {
            console.error('Error finding authorisation token: ', error);
        }
    }

    checkAuth();
}, []);

  return (
    <div className='flex items-center justify-center'>
      NexLearn
    </div>
  )
}

export default HomePage