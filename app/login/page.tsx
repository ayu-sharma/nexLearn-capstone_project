"use client";

import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState, useEffect } from 'react'
import { LoginInput } from '@/helpers/zod'
import { useRouter } from 'next/navigation'
import axios from "axios"
import Carousel from '@/components/Carousel';

const Login = () => {
    const router = useRouter();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formInputs, setFormInputs] = useState<LoginInput>({
        email: "",
        password: ""
    });

    useEffect(() => {
        const areInputsFilled = 
            formInputs.email.trim() !== '' &&
            formInputs.password.trim() !== '';
        
        setIsButtonDisabled(!areInputsFilled);
    }, [formInputs]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    router.push('/login');
                }

                await axios.get('http://localhost:3000/api/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                router.push('/home');
            } catch (error) {
                console.error('Error finding token: ', error);
            }
        }

        checkAuth();
    }, []);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', formInputs);
            localStorage.setItem("token", response.data.jwt);
            router.push('/home');
        } catch (error) {
            console.error("Failed to login: ", error);
        } finally {
            setIsLoading(false);
        }
    };
  return (
    <div className='relative h-screen flex items-center justify-center w-screen'>
        <div className='absolute top-10 right-10'>
            <ModeToggle />
        </div>
        <div className='h-[90vh] rounded w-[400px] mx-10'>
            <Carousel />
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
                    <Button variant={'custom'} className='w-full my-1 py-6' onClick={handleLogin} disabled={isButtonDisabled || isLoading}>
                        {
                            isLoading ? (
                                <Loader />
                            ) : (
                                'Continue'
                            )
                        }
                    </Button>
                    <div className='flex items-center my-1 text-sm gap-x-2'>
                        <p>Don't have an account?</p>
                        <div className='cursor-pointer underline' onClick={() => router.push('/signup')}>Sign Up</div>
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

const Loader = () => {
    return (
        <div className="flex items-center justify-center">
            <svg
                className="animate-spin h-5 w-5 text-[#F2F2F2] dark:text-[#121417]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
            </svg>
        </div>
    )
}