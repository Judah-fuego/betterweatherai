'use client'

import { Input } from "@/components/ui/input"
import Image from "next/image";
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
        <>        
<form className="w-[40%] min-w-[300px]">   
    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Image
            src='/search.svg'
            width={20}
            height={20}
            alt='search'>
            </Image>
        </div>
        <input 
        type="search" 
        id="default-search" 
        className="block w-full p-4 ps-10 text-sm text-gray-900 border-gray-300 border-[1px] rounded-2xl bg-white " 
        placeholder="THE WEATHER IN..." 
        required
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}/>
        <button 
        type="submit" 
        className="text-white absolute end-2.5 bottom-2.5 primary-color bg-slate-100  font-medium rounded-lg text-sm px-4 py-2 "
        >
        Search
        </button>
    </div>
    
    {results.length > 0 && (
        <ul className="absolute z-10 w-fit bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-auto">
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
        </>
         

    )
}