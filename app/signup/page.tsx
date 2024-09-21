import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import React from 'react'
import Carousal from '@/components/Carousal'

const Signup = () => {
    const images = [ { src: '/Images/signup_1_light.svg', alt: '1' },
        { src: '/Images/signup_2_light.svg', alt: '2' },
        { src: '/Images/signup_3_light.svg', alt: '3' },]
    
  return (
    <div className='relative h-screen flex items-center justify-center w-full'>
        <div className='absolute top-10 right-10'>
            <ModeToggle />
        </div>
        <div className='h-[90vh] rounded opacity-55 bg-[#F2F2F2] text-[#121417] w-[400px] mx-10'>
            <Carousal images={images}/>
        </div>
        <div className='w-[75vw]'>
            <div className='w-full flex justify-center'>
                <div className='flex flex-col items-center gap-y-4 w-[40%]'>
                    <h1 className='text-xl mb-4'>NexLearn</h1>
                    <h2 className='text-2xl py-2'>Sign Up</h2>
                    <div className='flex flex-col w-full gap-y-2 my-1'>
                        <p className='text-sm'>Email</p>
                        <Input placeholder='✉️'/>
                    </div>
                    <div className='flex flex-col w-full gap-y-2 my-1'>
                        <p className='text-sm'>Password</p>
                        <Input type='password' placeholder='🔓'/>
                    </div>
                    <div className='flex flex-col w-full gap-y-2 my-1'>
                        <p className='text-sm'>Confirm Password</p>
                        <Input type='password' placeholder='🔓'/>
                    </div>
                    <div className='flex flex-col items-start w-full gap-y-2 my-1'>
                        <p className='text-start text-sm'>Select your role</p>
                        {/* <select name="role" id="role">
                            <option value="student">Student</option>
                            <option value="educator">Educator</option>
                        </select> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <p className='text-sm py-2 px-4 border-[0.75px] rounded'>Role</p>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Student</DropdownMenuItem>
                                <DropdownMenuItem>Educator</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='flex items-center gap-x-2 my-1'>
                        <input type="checkbox" name="agree" id="agree" />
                        <p className='text-sm'>
                            I agree to abide by Terms of Service and Privacy Policy
                        </p>
                    </div>
                    <Button variant={'custom'} className='w-full my-1 py-6'>
                        Continue
                    </Button>
                    <div className='flex items-center my-1 text-sm gap-x-2'>
                        <p>Already have an account?</p>
                        <div className='cursor-pointer underline'>Login</div>
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