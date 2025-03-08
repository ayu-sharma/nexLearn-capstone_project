import Searchbar from '@/components/Searchbar';
import React from 'react';
import LibraryFilter from './library-filter';

interface LibraryTopbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filter: string;
  setFilter: (filter: string) => void;  
}

const LibraryTopbar = ({ searchTerm, setSearchTerm, filter, setFilter }: LibraryTopbarProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Course Library</h2>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="w-full md:w-2/3">
          <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="w-full md:w-1/3">
          <LibraryFilter filter={filter} setFilter={setFilter} />
        </div>
      </div>
    </div>
  );
}

export default LibraryTopbar;
