import { getForecast } from "@/app/api/weatherapi";
import Image from "next/image";


export default async function WeatherCard() {
    const Forecast = await getForecast("Los Angeles")

if (!Forecast) {
    return <div>No data available</div>;
  }

    return (
        <div className=" border-b-2 border-gray-300 w-[500px] h-[35px] flex flex-row justify-between  divide-gray-300">
            <div className=" w-fit flex flex-row justify-between p-2 gap-2">
                <div>
                    <Image 
                    src={`/weather_icons/animated/cloudy-night-2.svg`}
                    width={20} 
                    height={20} 
                    alt='cloudy-night-2' />
                </div>
                <div>
                    {Forecast.location.name}
                    {Forecast.location.region} 
                </div>

            </div>
            
        </div>
    )
}