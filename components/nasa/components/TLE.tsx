"use client"
import { getNasaTLEAPI } from "@/app/api/nasa"
import { useEffect, useState } from "react"

// Define TypeScript interface for Satellite
interface Satellite {
    name: string
    line1: string
    satelliteId: string
    // Add other relevant fields if necessary
}

export default function TLE(){
    const [search, setSearch] = useState<string>("")
    const [satellites, setSatellites] = useState<Satellite[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(null)

    useEffect(() => {
        const fetchSatellites = async () => {
            try {
                const data = await getNasaTLEAPI()
                setSatellites(data.member)
            } catch (error) {
                console.error("Error fetching satellites:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchSatellites()
    }, [])

    // Filter satellites based on search input
    const filteredSatellites = satellites.filter((satellite) =>
        satellite.name.toLowerCase().includes(search.toLowerCase())
    )


    // Handler for selecting a satellite
    const handleSelectSatellite = (satellite: Satellite) => {
        setSelectedSatellite(satellite)
        setSearch("")
       // Optionally update the search input
    }

    // Handler for selecting a random satellite
    const handleRandomSelect = () => {
        if (satellites.length === 0) return
        const randomIndex = Math.floor(Math.random() * satellites.length)
        const randomSatellite = satellites[randomIndex]
        handleSelectSatellite(randomSatellite)
    }

    const getLaunchYear = (satellite: Satellite): string => {
        const yearTwoDigits = satellite.line1.slice(9, 11);
        const yearTwoDigitsInt = parseInt(yearTwoDigits);
        const prefix = yearTwoDigitsInt > 50 ? '19' : '20';
        return `${prefix}${yearTwoDigits}`;
    };

    const getSatelliteID = (satellite: Satellite): string => {
        const satelliteID = satellite.satelliteId;
        return satelliteID;
    };

    return(
        <div className="flex flex-col gap-4 h-[500px]  overflow-y-auto">
            <h1 className="text-2xl font-bold">Search Satellite (try ISS):</h1>
            <div className="flex items-center gap-2">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={handleRandomSelect}
                >
                    Random
                </button>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter satellite name"
                    className="border px-2 py-1 rounded"
                />
            </div>
            {/* Render the list only if search length is greater than 2 */}
            {search.length > 0 && (
                loading ? (
                    <p>Loading satellites...</p>
                ) : (
                    <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                        {filteredSatellites.length > 0 ? (
                            filteredSatellites.slice(0,3).map((satellite, index) => (
                                <li key={index}>
                                    <button 
                                        className="w-full text-left bg-slate-200 hover:bg-slate-300 p-2 rounded"
                                        onClick={() => handleSelectSatellite(satellite)}
                                    >
                                        {satellite.name}
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>No satellites found.</p>
                        )}
                    </ul>
                )
            )}
            {/* Display selected satellite details */}
            {selectedSatellite && (
                <>
                <a 
                href={`https://www.google.com/search?q=${selectedSatellite.name}`}
                target="_blank"
                >
                <div className="mt-4 p-4 border rounded bg-gray-100 hover:bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30">
                    <h2 className="text-xl font-semibold">Selected Satellite:</h2>
                    <p><strong>Name:</strong> {selectedSatellite.name}</p>
                    <p><strong>Year Launched:</strong> { getLaunchYear(selectedSatellite)}</p>
                    <p><strong>Satellite ID:</strong> {getSatelliteID(selectedSatellite)}</p>
                    {/* Add more details as needed */}
                </div>
                </a>
                <div className="flex flex-row justify-center">
                <button 
                onClick={() => setSelectedSatellite(null)}
                className="hover:bg-red-500/50 w-fit p-2 rounded-lg">Clear</button>
                    
                </div>
                
                </>
                

            )}
        </div>
    )
}