import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
        <LoaderCircle className='h-12 w-12 animate-spin' />
    </div>
  )
}

export default Loader