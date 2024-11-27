import { Button } from '@/components/ui/button'
import { LibraryBig } from 'lucide-react'
import React from 'react'

interface ErrorMessageProps {
    handleFind: () => void;
}

const ErrorMessage = ({ handleFind }: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-center h-full">
        <div className='flex flex-col items-center gap-y-2'>
          <LibraryBig className='h-12 w-12 opacity-30' />
          <p className='text-sm opacity-40 mb-4 font-semibold'>You haven't started learning yet</p>
          <Button onClick={handleFind}>
            Find Course
          </Button>
        </div>
      </div>
  )
}

export default ErrorMessage