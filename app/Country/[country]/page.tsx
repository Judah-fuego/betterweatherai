'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {toast, Toaster} from 'sonner'
import Finder from '@/components/country/finder';

// Define the interface for the Country API response
interface Country {
  name: string;
  iso3: string;
  iso2: string;
  states: { name: string }[]; // Adjusted to reflect the structure of the 'states' object array
}

interface State {
  name: string
}

// Main functional component
export default function CountryPage({ params }: { params: { country: string } }) {
  const [country, setCountry] = useState<Country | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("")
  const [states, setStates] = useState<State[]>([]); // Explicitly type the states array
  const [loading, setLoading] = useState<boolean>(true)

  const router = useRouter();
  const countryCode = params.country;

  useEffect(() => {
    // Fetch the data from the API
    fetch('https://countriesnow.space/api/v0.1/countries/states', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: countryCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data && data.data.states) {
          setCountry(data.data);
          setStates(data.data.states)
          toast.success('State Exist For Country');
          // Set the country information (name, iso codes, states array, etc.)
        } else {
          router.push('/Country');
          toast.error('Country not found');

        }
      })
      .catch((error) => setError(`Error: ${error.message}`));
  }, [countryCode]);

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(search.toLowerCase())
  )
  if (error) {
    return <div>{error}</div>;
  }

  if (!country) {
    return (<div className='w-full h-full bg-white flex items-center justify-center'>
    <img 
    src='../loader_square.svg'
    width={100}
    height={100}
    alt='loader'/>
    </div>);
  }

  return (
    <div className="p-2">
      <Toaster richColors />
      <h1 className="text-4xl font-bold mb-4 m-auto text-center border-b-2 border-gray-300 pb-4 w-fit">{country.name.replace("%20", " ")}</h1>
      
      { country.states.length != 0 ? (
        <>
        <div className="sticky top-0 bg-slate-300/50 backdrop-blur-md flex flex-row gap-4 items-center justify-between px-10 py-4 border-b-2 border-gray-300">
        <div className='flex flex-row gap-4 items-center'>
        <h1 className="text-2xl font-bold">States Page:</h1>
                <div>
                    <input
                        className="border-2 border-gray-300 rounded-md p-2"
                        type="text"
                        placeholder="Search States"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
        </div>
        <div>
          <button
          className='bg-primary-color text-white px-4 py-2 rounded-md'
          onClick={() => router.push(`/Country`)}>Go Back</button>
        </div>
                
      </div>
      <Finder params={{ country: country.name, region: params.country }} />

        <ul className='gap-4 flex flex-row  flex-wrap'>
                {filteredStates.map((state, index) => (
                  <a href={`/Country/${country.name}/${state.name}`} key={index} className="mb-2 border-2 border-gray-300 rounded-md p-4 m-auto text-lg font-bold mt-6 text-center w-[200px] hover:bg-slate-300/20 ">
                    <li>
                     {state.name.slice(0,15)}
                    </li>
                  </a>
              ))}
          </ul></> 
        ) : (<><a href='/Country'><div className=' border-2 border-gray-300 rounded-md p-4 w-fit m-auto text-2xl font-bold mt-6 text-red-500 text-center'>No states found: Click here to go back</div></a></>)}
    </div>
  );
}