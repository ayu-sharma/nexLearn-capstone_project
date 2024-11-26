"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface User {
  id: string;
  name: string;
  email: string;
}

const Username = () => {
  const [user, setUser] = useState<User>({name: "", email: "", id: ""});
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:3000/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setUser(response.data);
        localStorage.setItem("cId", response.data.lastViewed);
      }).catch(err => {
        console.error("Error fetching user: " + err);
      })
    }
  }, []);
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