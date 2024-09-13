

import Image from "next/image";
import Link from "next/link";
import MapWeatherCard from "./mapweathercard";
import MainInfoCard from "./mainInfoCard";
import { getCurrent, getForecast } from "@/app/api/weatherapi";
import { Favorites } from "./favorites";


export default async function WeatherWidget() {

const Current = await getCurrent("Los Angeles")
const Forecast = await getForecast("Los Angeles")
const localTime = Date.now()


;

// Convert the string to a Date object
const dt = new Date(localTime);

// Helper function to add ordinal suffixes (st, nd, rd, th)
function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

// Format the date as "September 7th"
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const day = dt.getDate();
const month = monthNames[dt.getMonth()];
const formattedDate = `${month} ${day}${getOrdinalSuffix(day)}`;

// Format the time as "11:25"
const formattedTime = dt.toTimeString().slice(0, 5); // Extracts the time in HH:


if (!Current) {
    return <div>No data available</div>;
  }
    
    return (
        
        <div className=" p-3 w-[600px] h-[500px] border-2 border-gray-300 rounded-lg">
          <div className="">
            <div className=" p-2 flex flex-row justify-between">
                <div>
                    <h1 className="text-lg font-bold">
                    {Current.location.name}, {Current.location.region}
                    </h1>
                    <span className="text-sm text-gray-500">{formattedDate}, {formattedTime}</span>
                </div>
                <div className=" flex flex-col">
                <Favorites city={Current.location.name} region={Current.location.region} />
                <Link href="/sign-in"><Image src='/share.svg' width={20} height={20} alt='share' className="cursor-pointer" /></Link>
                </div>
                
            </div>
            {/* Weatherheader */}
                <MainInfoCard />

                <MapWeatherCard data={Forecast} />
            </div>
        </div>
    )
}