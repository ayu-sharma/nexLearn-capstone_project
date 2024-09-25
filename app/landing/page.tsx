"use client";

import React from 'react'
import Image from 'next/image';
import logoL from "@/public/images/logoL.svg"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Landing = () => {
  return (
    <div className="font-mono bg-gradient-to-bl from-[#121417] to-black h-screen text-[#F2F2F2]">
      <div className='flex justify-between gap-x-8 items-center py-8 px-9'>
        <div className='pb-4'>
          <Image
            src={logoL} alt='NexLearn Logo' height={44}
          />
        </div>
        <div className="">
          <Navbar />
        </div>
        <Link href="http://localhost:3000/login">
          <Button className='w-full text-lg py-6 px-8 text-[#F2F2F2] bg-transparent border border-[#F2F2F2] hover:bg-[#F2F2F2] hover:text-[#121417]'>
            Sign In
          </Button>
        </Link>
      </div>
      <div className='my-20'>
        <div className='text-center text-bold font-monospace text-7xl'>Unleash Your <span className='relative'> Potential <span className='absolute left-0 right-0 bottom-0 h-3 bg-[#CBE64E] animate-pulse'></span> </span> <br /> <div className='mt-8'> with <span className='relative'> AI-Powered Learning <span className='absolute left-0 right-0 -bottom-3 h-3 bg-[#996AFA] animate-pulse'></span> </span></div> </div>
      </div>
      <div className='flex flex-col items-center text-center'>
        <p className='text-balance leading-8 text-lg'>Step into a world of smarter learning! At NexLearn, we empower students with AI-driven insights, helping you not just <br/> learn but master any subject. Our platform doesn't just stop at teaching – it analyzes your performance and provides <br/> personalized feedback to help you grow faster.</p>
      
      <div>
        <Link href={"http://localhost:3000/signup"}>
            <Button className='bg-[#F2F2F2] rounded text-lg py-6 px-8 text-[#121417] mt-10 hover:bg-white/70'>
                Get Started
            </Button>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default Landing
