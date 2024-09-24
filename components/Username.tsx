import React from 'react'

const Username = () => {
  return (
    <div className='flex items-center gap-x-4 cursor-pointer'>
        <div className='text-end'>
            <h1 className='font-semibold'>User Name</h1>
            <p className='text-xs font-light'>Role</p>
        </div>
        <div className='bg-white rounded-full p-2 text-[#121417] border border-[#121417] dark:border-[#F2F2F2]'>
            UN
        </div>
    </div>
  )
}

export default Username