'use client'

import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
type CityResult = {
    country: string,
    state: string,
    city: string,
}

export default function  Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<CityResult[]>([]);

    useEffect(() => {
        const searchCities = async () => {
            if(searchTerm.length > 2 ){
                const {data:listOfCities , error } = await supabase
                .from('list-of-cities')
                .select('country, state, city')
                .or(`country.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,state.ilike.%${searchTerm}%`)
                .limit(10);
                if(error){
                    console.error('Error fetching cities:', error);
                } else {
                    console.log(listOfCities);
                    setResults(listOfCities);
                }
            } else {
                console.log("No Results")
                setResults([])
            }
        };

        searchCities();
    }, [searchTerm]);

    return(
        
<form className="w-[40%]">   
    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            </svg>
        </div>
        <input 
        type="search" 
        id="default-search" 
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="WHAT IS THE WEATHER IN..." 
        required
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}/>
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
    
    {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-auto">
        {results.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSearchTerm(`${item.city}, ${item.state}, ${item.country}`);
              setResults([]);
            }}
          >
            {item.city}, {item.state}, {item.country}
          </li>
        ))}
      </ul>
    )} 
    
</form> 

    )
}