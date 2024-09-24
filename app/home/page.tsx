"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { ModeToggle } from '@/components/ModeToggle';
import Searchbar from '@/components/Searchbar';
import { Button } from '@/components/ui/button';
import { Bell, BellIcon } from 'lucide-react';
import Username from '@/components/Username';

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
      <div className='absolute top-6 right-6'>
        <div className='flex justify-evenly gap-x-8 items-center'>
          <Searchbar />
          <Button size={'icon'}>
            <svg className="w-6 h-6 text-[#F2F2F2] dark:text-[#121417]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
            </svg>
          </Button>
          <Username />
          <ModeToggle />
        </div>
      </div>
      <Sidebar />
      <div>
        Top bar
      </div>
    </div>
  )
}

export default HomePage