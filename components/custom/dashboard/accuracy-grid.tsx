import { TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'

const AccuracyGrid = () => {
  return (
    <div className='px-4 pb-10 bg-[#D2D6DB] text-black rounded-md flex flex-col gap-y-4 w-full max-w-3xl mx-auto'>
        <p className='text-sm text-[#495057] pt-4'>Accuracy</p>
        <div className='grid grid-cols-3 h-full gap-x-4'>
            <div className='flex flex-col bg-[#121417] p-4 h-[10rem] rounded-md'>
                <p className='text-white font-extralight text-xs'>MCQs</p>
                <div className='flex flex-col items-center justify-center h-full'>
                    <TrendingUp className='text-green-500'/>
                    <div className='flex items-baseline'>
                        <p className='text-green-500 text-2xl font-medium'>84</p>
                        <p className='text-green-500 text-sm font-medium'>%</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col bg-[#121417] p-4 rounded-md'>
                <p className='text-white font-extralight text-xs'>Coding</p>
                <div className='flex flex-col items-center justify-center h-full'>
                    <TrendingDown className='text-rose-500'/>
                    <div className='flex items-baseline'>
                        <p className='text-rose-500 text-2xl font-medium'>90</p>
                        <p className='text-rose-500 text-sm font-medium'>%</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col bg-[#121417] p-4 rounded-md'>
                <p className='text-white font-extralight text-xs'>Overall</p>
                <div className='flex flex-col items-center justify-center h-full'>
                    <TrendingUp className='text-green-500'/>
                    <div className='flex items-baseline'>
                        <p className='text-green-500 text-2xl font-medium'>83</p>
                        <p className='text-green-500 text-sm font-medium'>%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AccuracyGrid