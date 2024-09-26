'use client'
import Finder from "@/components/country/finder";
import CardSkeleton from "@/components/skeletons/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface City {
  name: string;
}

interface ApiResponse {
  error: boolean;
  msg: string;
  data: string[]; // Assuming data is an array of city names
}

export default function RegionPage({ params }: { params: { country: string; region: string } }) {
  const { country, region } = params;
  const countryFormatted = decodeURIComponent(country);
  const regionFormatted = decodeURIComponent(region);

  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const fetchCities = async () => {
      console.log('Fetching cities for:', { country: countryFormatted, state: regionFormatted });

      const raw = JSON.stringify({
        country: countryFormatted,
        state: regionFormatted,
      });

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: raw,
        redirect: 'follow',
      };

      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", requestOptions);
        
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();
        console.log('API Response:', result);

        if (result.error) {
          throw new Error(result.msg || 'Unknown error from API');
        }

        if (result.data && result.data.length > 0) {
          // If the API returns an array of city names
          const formattedCities = result.data.map((cityName) => ({ name: cityName }));
          setCities(formattedCities);
        } else {
          setError('No cities found for the specified state.');
          router.push(`/weather/${region}, ${country}`); // Redirect to an error page if no cities are found
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [countryFormatted, regionFormatted]);


  return (
    <>
    { cities.length !== 0 && 
    <div>
      <h1 className="text-4xl font-bold mb-4 m-auto text-center border-b-2 border-gray-300 pb-4 w-fit">
        {regionFormatted}, {countryFormatted}
      </h1>
      <div className="sticky top-0 bg-slate-300/50 backdrop-blur-md flex flex-row gap-4 items-center justify-between px-10 py-4 border-b-2 border-gray-300">
        <div className='flex flex-row gap-4 items-center'>
          <h1 className="text-2xl font-bold">States Page:</h1>
          <div>
            <input
              className="border-2 border-gray-300 rounded-md p-2"
              type="text"
              placeholder="Search States"
              // Consider adding functionality to handle search if needed
            />
          </div>
        </div>
        <div>
          <Link
            href={`/Country/${countryFormatted}`}
            className='bg-primary-color text-white px-4 py-2 rounded-md'
          >
            Go Back
          </Link>
        </div>
      </div>
      <Finder params={{ country: params.country, region: params.region }} />
      {loading ? (
        <div><CardSkeleton/></div>
        
      ) : (
        <div className="pl-5">
          <h2 className="text-2xl font-semibold mt-4 mb-2">Cities</h2>
          <ul className="gap-4 flex flex-row  flex-wrap">
          {cities.map((city, index) => (
                  <a href={`/weather/${city.name}, ${region}`} key={index} className="mb-2 border-2 border-gray-300 rounded-md p-4 m-auto text-lg font-bold mt-6 text-center w-[200px] hover:bg-slate-300/20 ">
                    <li>
                     {city.name.slice(0,15)}
                    </li>
                  </a>
              ))}
          </ul>
        </div>
      )}

    </div>
      
    }
      
    </>
  );
}