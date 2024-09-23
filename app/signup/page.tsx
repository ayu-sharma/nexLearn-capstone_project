"use client";

import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import React, { useState, useEffect } from 'react'
import { SignupInput } from '@/helpers/zod';
import { useRouter } from 'next/navigation';
import axios from "axios"
import Signup_carousal from '@/components/ui/Signup_carousal';

const Signup = () => {
    const router = useRouter();
    
    const [formInputs, setFormInputs] = useState<SignupInput>({
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const token = localStorage.getItem("token");

    //             if (!token) {
    //                 router.push('/signup');
    //             }

    //             await axios.get('http://localhost:3000/api/user/me', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });
    //             router.push('/');
    //         } catch (error) {
    //             console.error('Error finding token: ', error);
    //         }
    //     }

    //     checkAuth();
    // }, []);

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/user/signup', formInputs);
            localStorage.setItem("token", response.data.jwt);
            router.push('/');
        } catch (error) {
            console.error("Failed to sign up: ", error);
        }
    };
    
  return (
    <div className='relative h-screen flex items-center justify-center w-full'>
        <div className='absolute top-10 right-10'>
            <ModeToggle />
        </div>
        <div>
        <Signup_carousal />
        </div>
        <div className='w-[75vw]'>
            <div className='w-full flex justify-center'>
                <div className='flex flex-col items-center gap-y-4 w-[40%]'>
                    <h1 className='text-xl mb-4'>NexLearn</h1>
                    <h2 className='text-2xl py-2'>Sign Up</h2>
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
                    <div className='flex flex-col w-full gap-y-2 my-1'>
                        <p className='text-sm'>Confirm Password</p>
                        <Input type='password' placeholder='🔓' onChange={(e) => {
                            setFormInputs(c => ({
                                ...c,
                                confirmPassword: e.target.value
                            }))
                        }}/>
                    </div>
                    <div className='flex flex-col items-start w-full gap-y-2 my-1'>
                        <p className='text-start text-sm'>Select your role</p>
                        <Select onValueChange={(value) => {
                            setFormInputs(c => ({
                                ...c,
                                role: value
                            }))
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="educator">Educator</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex items-center gap-x-2 my-1'>
                        <input type="checkbox" name="agree" id="agree" />
                        <p className='text-sm'>
                            I agree to abide by Terms of Service and Privacy Policy
                        </p>
                    </div>
                    <Button variant={'custom'} className='w-full my-1 py-6' onClick={handleSignup}>
                        Continue
                    </Button>
                    <div className='flex items-center my-1 text-sm gap-x-2'>
                        <p>Already have an account?</p>
                        <div className='cursor-pointer underline' onClick={() => router.push('/login')}>Login</div>
                    </div>
                    <div className='flex mt-4 gap-x-4'>
                        <p>----</p>
                        <p>or Sign up with</p>
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

export default Signup   