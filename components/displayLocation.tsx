'use client'
import { useState, useEffect } from 'react';
import { getLocation } from '@/app/api/getLocation';

export default function DisplayLocation() {
    const [location, setLocation] = useState<GeolocationPosition | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const position = await getLocation();
                setLocation(position);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchLocation();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!location) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{location.coords.latitude}</h1>
            <h1>{location.coords.longitude}</h1>
        </div>
    )
}