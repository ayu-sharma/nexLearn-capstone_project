"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/ModeToggle';
import Image from 'next/image';
import logoL from "@/public/images/logol.svg"
import logoD from "@/public/images/logoD.svg"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { Span } from 'next/dist/trace';
export default function Home() {

  const router = useRouter();

  // useEffect(() => {
  //   router.push('/login');
  // }, []);


  //   const [isDarkMode, setIsDarkMode] = useState(false);
  //   useEffect(() => {
  //   const checkDarkMode = () => {
  //   setIsDarkMode(document.documentElement.classList.contains('dark'));
  //   };
  //   checkDarkMode(); 
  //   const observer = new MutationObserver(checkDarkMode); 

  //   observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  //   return () => observer.disconnect(); 
  // }, []);


  return (
    <div className="">
      <div className='flex justify-between gap-x-8 items-center py-8 px-9'>
        <div className='pb-4'>
          <Image
            src={logoD} alt='NexLearn Logo' height={44}
          />
        </div>

        {/* <ModeToggle /> */}

        <div className="">
          <Navbar />
        </div>
        <Link href="http://localhost:3000/login">
          <Button className='w-full text-lg py-6 px-7 bg-black font-monospace text-white'>
            Sign In
          </Button>
        </Link>
      </div>
      <div className='my-20'>
        <p className='text-center text-bold font-monospace text-7xl'>Unleash Your <span className='relative'> Potential <span className='absolute left-0 right-0 bottom-0 h-3 bg-[#CBE64E]'></span> </span> <br /> <div className='mt-8'> with <span className='relative'> AI-Powered Learning <span className='absolute left-0 right-0 -bottom-3 h-3 bg-[#996AFA]'></span> </span></div> </p>
      </div>
      <div className='flex flex-col items-center'>
        <p className='text-center font-extralight leading-1 font-monospace text-xl'>Step into a world of smarter learning! At NexLearn, we empower students with AI-driven insights, helping you not just <br/> learn but master any subject. Our platform doesn't just stop at teaching – it analyzes your performance and provides <br/> personalized feedback to help you grow faster.</p>
      
      <div>
        <Link href={"http://localhost:3000/signup"}>
      <Button className='bg-black font-monospace rounded-[30px] text-xl py-7 px-6 text-white mt-10'>
            Get Started
          </Button>
          </Link>
      </div>
      </div>
    </div>
  );
}
