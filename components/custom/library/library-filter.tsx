
import React from 'react'

interface LibraryFilterProps {
    filter: string;
    setFilter: (filter: string) => void;
}

const LibraryFilter = ({ filter, setFilter }: LibraryFilterProps) => {
    const filters = ['All', 'Coding', 'Aptitude', 'Language'];
  return (
    <div className='flex items-center gap-x-6 w-full'>
        {filters.map((item) => (
            <ToggleButton 
                title={item} 
                key={item}
                isActive={filter === item}
                onClick={() => setFilter(item)}
            />
        ))}
    </div>
  )
}

export default LibraryFilter

interface ToggleButtonProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
}

const ToggleButton = ({ title, isActive, onClick }: ToggleButtonProps) => {
    return (
        <button 
            onClick={onClick}
            className={`px-4 py-2 dark:bg-[#F2F2F2]/5 bg-[#121417]/5 dark:hover:bg-[#F2F2F2]/15 border dark:border-[#F2F2F2]/30 border-[#121417]/20 hover:bg-[#121417]/10 rounded-md text-sm transition ${
                isActive ? 'dark:bg-[#7981FF]/20 bg-[#7981FF]/10' : ''
              }`}
        >
            {title}
        </button>
    )
}