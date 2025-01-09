import React from 'react'

const SolvedGrid = () => {
  return (
    <div className='flex flex-col'>
        <h1 className='text-xl font-semibold text-[#7981FF]'>NexCode 150</h1>
        <p className='text-sm font-light py-2'>The perfect list for people already familiar with basic algorithms & data structures</p>
        <div className='flex flex-col w-full justify-center my-6 p-6 bg-slate-300 dark:bg-gray-700 rounded-md'>
          <div className='flex flex-col space-y-6'>
            <div className='flex items-baseline justify-center text-black dark:text-white'>
                <p className='text-4xl font-semibold'>0</p>
                <p className='text-xl font-medium'>/ 150</p>
            </div>
            {/*  */}
            <div className='flex bg-[#121417] p-4 rounded-md w-full justify-between items-center'>
              <h1 className='text-green-500 font-medium text-lg'>Easy</h1>
              <div className='flex items-baseline justify-center text-white'>
                <p className='text-3xl font-medium'>0</p>
                <p className='text-lg font-normal '>/ 28</p>
              </div>
            </div>
            <div className='flex bg-[#121417] p-4 rounded-md w-full justify-between items-center'>
              <h1 className='text-blue-500 font-medium text-lg'>Medium</h1>
              <div className='flex items-baseline justify-center text-white'>
                <p className='text-3xl font-medium'>0</p>
                <p className='text-lg font-normal '>/ 100</p>
              </div>
            </div>
            <div className='flex bg-[#121417] p-4 rounded-md w-full justify-between items-center'>
              <h1 className='text-rose-500 font-medium text-lg'>Hard</h1>
              <div className='flex items-baseline justify-center text-white'>
                <p className='text-3xl font-medium'>0</p>
                <p className='text-lg font-normal '>/ 21</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SolvedGrid