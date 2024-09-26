'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function WeatherSearch() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const router = useRouter();

  // Function to handle search submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // If searchTerm is not empty, redirect to the weather search page
    if (searchTerm.trim()) {
      router.push(`/weather/${searchTerm}`);
    }
  };

  return (
    <div className="relative w-[40%] mt-[1px]">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Image
            src='/search.svg'
            width={20}
            height={20}
            alt='search'
          />
        </div>
        
        <input 
          type="search" 
          id="default-search" 
          className="block w-full p-4 ps-10 text-sm text-gray-900 border-gray-300 border-[1px] rounded-2xl bg-white" 
          placeholder="THE WEATHER IN..." 
          required
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <button 
          type="submit" 
          className="text-white absolute right-2.5 bottom-2.5 primary-color bg-slate-100 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </form>
    </div>
  );
}