"use client";

import ProblemPanel from '@/components/custom/code/problem-panel';
import CourseNav from '@/components/custom/course/course-nav'
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const CodingTerminal = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };
  return (
    <>
        <CourseNav />
        <div className='flex flex-col py-6 px-5'>
            <div className='flex items-center gap-x-6'>
                <Button size={'icon'} variant={'outline'} onClick={handleBack}>
                    <ChevronLeft />
                </Button>
                <h1 className="text-lg font-semibold">Code Playground</h1>
            </div>
            <div className='mt-10 grid grid-cols-5 gap-x-6'>
                <div className='col-span-2'>
                    <ProblemPanel />
                </div>
                <div className='col-span-3'>
                    Coding Window 
                </div>
            </div>
        </div>
    </>
  )
}

export default CodingTerminal