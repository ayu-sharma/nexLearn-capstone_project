
import React from 'react'

const LibraryFilter = () => {
  return (
    <div className='flex items-center gap-x-6 w-full'>
        <ToggleButton title='All' />
        <ToggleButton title='Coding' />
        <ToggleButton title='Aptitude' />
        <ToggleButton title='Language' />
    </div>
  )
}

export default LibraryFilter

interface FilterProps {
    title: string;
}

const ToggleButton = ({ title }: FilterProps) => {
    return (
        <button className='px-4 py-2 dark:bg-[#F2F2F2]/5 bg-[#121417]/5 dark:hover:bg-[#F2F2F2]/15 border dark:border-[#F2F2F2]/30 border-[#121417]/20 hover:bg-[#121417]/10 rounded-md text-sm transition'>
            {title}
        </button>
    )
}