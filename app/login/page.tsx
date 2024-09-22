"use client";

import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState, useEffect } from 'react'
import { LoginInput } from '@/helpers/zod'
import { useRouter } from 'next/navigation'
import axios from "axios"

const Login = () => {
    const router = useRouter();
    const [formInputs, setFormInputs] = useState<LoginInput>({
        email: "",
        password: ""
    });

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', formInputs);
            localStorage.setItem("token", response.data.jwt);
            router.push('/');
        } catch (error) {
            console.error("Failed to login: ", error);
        }
    };
  return (
    <div className='relative h-screen flex items-center justify-center w-screen'>
        <div className='absolute top-10 right-10'>
            <ModeToggle />
        </div>
        <div className='h-[90vh] rounded opacity-55 bg-[#F2F2F2] text-[#121417] w-[400px] mx-10'>
            Carousel
        </div>
        <div className='w-[75vw]'>
            <div className='w-full flex justify-center'>
                <div className='flex flex-col items-center gap-y-4 w-[40%]'>
                    <h1 className='text-xl mb-4'>NexLearn</h1>
                    <h2 className='text-2xl py-2'>Welcome Back!</h2>
                    <div className='flex flex-col w-full gap-y-2 my-1'>
                        <p className='text-sm'>Email</p>
                        <Input placeholder='✉️' onChange={(e) => {
                            setFormInputs(c => ({
                                ...c,
                                email: e.target.value
                            }))
                        }}/>
                    </div>
                    <div className='flex flex-col w-full gap-y-2 my-1'>
                        <p className='text-sm'>Password</p>
                        <Input type='password' placeholder='🔓' onChange={(e) => {
                            setFormInputs(c => ({
                                ...c,
                                password: e.target.value
                            }))
                        }}/>
                    </div>
                    <Button variant={'custom'} className='w-full my-1 py-6' onClick={handleLogin}>
                        Continue
                    </Button>
                    <div className='flex items-center my-1 text-sm gap-x-2'>
                        <p>Don't have an account?</p>
                        <div className='cursor-pointer underline'>Sign Up</div>
                    </div>
                    <div className='flex mt-4 gap-x-4'>
                        <p>----</p>
                        <p>or Login with</p>
                        <p>----</p>
                    </div>
                    <Button className='w-full my-1 py-6' variant={'outline'}>
                        Google
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login   