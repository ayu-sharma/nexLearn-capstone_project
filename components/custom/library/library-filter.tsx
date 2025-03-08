import React from 'react';

interface LibraryFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const LibraryFilter = ({ filter, setFilter }: LibraryFilterProps) => {
  const filters = ['All', 'Coding', 'Aptitude', 'Language'];
  
  return (
    <div className="flex items-center gap-2 w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
      {filters.map((item) => (
        <ToggleButton 
          title={item} 
          key={item}
          isActive={filter === item}
          onClick={() => setFilter(item)}
        />
      ))}
    </div>
  );
}

export default LibraryFilter;

interface ToggleButtonProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const ToggleButton = ({ title, isActive, onClick }: ToggleButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-[#7981FF] text-white shadow-md shadow-[#7981FF]/30' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
    >
      {title}
    </button>
  );
}