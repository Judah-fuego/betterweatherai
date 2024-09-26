'use client'
import { useEffect, useState } from "react"
import { getCountryData } from "../api/country"
import Image from "next/image"

interface Country {
    name: {
        common: string
    }
    flag: string
    cca2: string
    ccn3: string
}

export default function CountryPage() {
    const [search, setSearch] = useState<string>("")
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getCountryData()
                setCountries(data)
                // Correctly set the country data here
            } catch (error) {
                console.error("Error fetching countries:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCountries()
    }, [])

    // Filter the countries based on search term
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
    
    )

    if (loading) {
        return (<div className='w-full h-full bg-white flex items-center justify-center'>
        <Image 
        src='loader_square.svg'
        width={100}
        height={100}
        alt='loader'/>
        </div>)
    }

    return (
        <div className="">
            <div className="sticky top-0 bg-slate-300/50 backdrop-blur-md flex flex-row gap-4 items-center px-10 py-4 border-b-2 border-gray-300">
                <h1 className="text-2xl font-bold">Country Page:</h1>
                <div>
                    <input
                        className="border-2 border-gray-300 rounded-md p-2"
                        type="text"
                        placeholder="Search Country"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-5">
                {filteredCountries.map((country) => (
                    <a href={`/Country/${country.name.common}`} key={country.name.common}>
                        <div
                            className="pointer text-center w-[200px] h-20 border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center"
                        >
                            <h2 className="text-xl font-bold">{country.name.common.slice(0, 25)}</h2>
                            {country.flag}

                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}