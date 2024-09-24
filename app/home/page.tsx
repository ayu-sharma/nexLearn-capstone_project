"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { ModeToggle } from '@/components/ModeToggle';

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
    <div className='relative h-screen w-screen flex'>
      <div className='absolute top-10 right-10'>
        <ModeToggle />
      </div>
      <Sidebar />
      <div>
        <div>
          Main
        </div>
        <div>
          Progress
        </div>
      </div>
    </div>
  )
}

export default HomePage