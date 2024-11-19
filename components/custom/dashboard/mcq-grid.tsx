import React from 'react'

const MCQGrid = () => {
  return (
    <div className='p-4 bg-[#D2D6DB] text-black rounded-md flex flex-col gap-y-4'>
        <p className='text-sm text-[#495057]'>MCQs</p>
        <div className='flex items-baseline justify-center'>
            <p className='text-4xl font-semibold'>376</p>
            <p className='text-xl font-medium'>/ 450</p>
        </div>
        <div className='grid grid-cols-3 gap-x-4'>
            <div className='flex flex-col bg-[#121417] p-4 rounded-md'>
                <p className='text-white text-xs font-extralight'>Easy</p>
                <p className='text-green-500 text-2xl text-center font-medium'>206</p>
            </div>
            <div className='flex flex-col bg-[#121417] p-4 rounded-md'>
                <p className='text-white text-xs font-extralight'>Medium</p>
                <p className='text-blue-500 text-2xl text-center font-medium'>100</p>
            </div>
            <div className='flex flex-col bg-[#121417] p-4 rounded-md'>
                <p className='text-white text-xs font-extralight'>Hard</p>
                <p className='text-rose-500 text-2xl text-center font-medium'>70</p>
            </div>
        </div>
    </div>
  )
}

export default MCQGrid