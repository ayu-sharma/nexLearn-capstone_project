import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const Signup = () => {
  return (
    <div className='relative h-screen flex items-center justify-center w-full'>
        <div className='absolute top-10 right-10'>
            <ModeToggle />
        </div>
        <div className='h-[90vh] rounded opacity-55 bg-[#F2F2F2] text-[#121417] w-[400px] mx-10'>
            Carousel
        </div>
        <div className='w-[75%]'>
            <div className='w-full flex justify-center'>
                <div className='flex flex-col items-center gap-y-4'>
                    <h1>NexLearn</h1>
                    <h2>Sign Up</h2>
                    <div className='flex flex-col w-full'>
                        <p>Email</p>
                        <Input />
                    </div>
                    <div className='flex flex-col w-full'>
                        <p>Password</p>
                        <Input />
                    </div>
                    <div className='flex flex-col w-full'>
                        <p>Confirm Password</p>
                        <Input type='password'/>
                    </div>
                    <div className='flex flex-col items-start w-full'>
                        <p className='text-start'>Select your role</p>
                        <select name="role" id="role">
                            <option value="student">Student</option>
                            <option value="educator">Educator</option>
                        </select>
                    </div>
                    <div className='flex items-center'>
                        <input type="checkbox" name="agree" id="agree" />
                        I agree to abide by Terms of Service and Privacy Policy
                    </div>
                    <Button variant={'custom'} className='w-full'>
                        Continue
                    </Button>
                    <div className='flex items-center'>
                        <p>Already have an account?</p>
                        <div>Login</div>
                    </div>
                    <div className='flex'>
                        <p>----</p>
                        <p>or Sign up with</p>
                        <p>----</p>
                    </div>
                    <Button className='w-full' variant={'outline'}>
                        Continue with Google
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup   