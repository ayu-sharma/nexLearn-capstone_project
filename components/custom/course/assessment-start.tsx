"use client"

import { Button } from '@/components/ui/button'
import { Notebook, NotebookPen } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

interface AssessmentProps {
    materialId: string;
    questions: number;
    title: string;
}

const AssessmentStart = ({ materialId, questions, title }: AssessmentProps) => {
    const router = useRouter();
    const handleStart = () => {
      router.push(`/assessment?materialId=${materialId}`);
    }
  return (
    <div className='relative flex p-6 rounded-xl h-[500px] border w-[750px]'>
        <div className='flex flex-col space-y-4'>
            <h1 className='dark:text-slate-400'>Knowledge Check</h1>
            <p className='font-semibold text-xl'>{title}</p>
            <div className='flex gap-x-3 items-center font-light'>
                <NotebookPen className='h-5 text-[#7981FF]'/>
                <p className='dark:text-slate-400'>{questions} questions</p>
            </div>
        </div>
        <Button variant={'outline'} className='absolute bottom-6 right-6' onClick={handleStart}>
            Start Assessment
        </Button>
    </div>
  )
}

export default AssessmentStart