import { Button } from '@/components/ui/button'
import { BookA, Code2, DraftingCompass, Edit } from 'lucide-react'
import React from 'react'

const GoalGrid = () => {
  return (
    <div className='p-4 bg-[#D2D6DB] text-black rounded-md flex flex-col gap-y-4'>
          <div className='flex justify-between items-center'>
            <p className='text-xs xl:text-sm text-[#495057]'>Current Goal</p>  
            <Button size={'icon'}>
              <Edit className='w-5 h-5'/>
            </Button>
          </div>
          <h1 className='text-xl font-medium'>Summer Internship</h1>
          <div className='flex flex-col gap-y-4'>
            <p className='text-xs xl:text-sm text-[#495057]'>Recommended courses</p>
            <div className='grid grid-cols-3 gap-x-2'>
              <div className='flex justify-center items-center px-4 py-2 bg-white rounded-md shadow-sm hover:opacity-85 transition cursor-pointer'>
                <Code2 className='h-4 w-4 mr-2 text-blue-500'/>
                <p className='font-medium text-blue-500 text-xs xl:text-sm'>Blind 75</p>
              </div>
              <div className='flex justify-center items-center px-4 py-2 bg-white rounded-md shadow-sm hover:opacity-85 transition cursor-pointer'>
                <DraftingCompass className='h-4 w-4 mr-2 text-green-500'/>
                <p className='font-medium text-green-500 text-xs xl:text-sm'>Mensuration</p>
              </div>
              <div className='flex justify-center items-center px-4 py-2 bg-white rounded-md shadow-sm hover:opacity-85 transition cursor-pointer'>
                <BookA className='h-4 w-4 mr-2 text-rose-500'/>
                <p className='font-medium text-rose-500 text-xs xl:text-sm'>Comprehension</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default GoalGrid