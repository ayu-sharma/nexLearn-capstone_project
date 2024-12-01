import React from 'react'

const DSAGrid = () => {
  return (
    <div className='p-4 bg-[#D2D6DB] text-black rounded-md flex flex-col gap-y-4'>
        <p className='text-sm text-[#495057]'>Coding</p>
        <div className='flex items-center justify-around'>
            <div className='flex items-baseline justify-center'>
                <p className='text-4xl font-semibold'>27</p>
                <p className='text-xl font-medium'>/ 30</p>
            </div>
            <div className='flex flex-col gap-y-2 p-4 w-2/5 bg-[#d2d6db] shadow-lg rounded-md items-start'>
                <p className='text-xs text-normal font-light underline'>Weak Points</p>
                <div className='flex md:text-normal text-xs flex-col gap-y-1 text-[#7981FF]'>
                    <p>Arrays</p>
                    <p>Linked List</p>
                    <p>Recursion</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DSAGrid