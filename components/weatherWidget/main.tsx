import Image from "next/image";
import { redirect } from 'next/navigation'
import Link from "next/link";
import MapWeatherCard from "./mapweathercard";
import MainInfoCard from "./mainInfoCard";
import { getCurrent, getForecast } from "@/app/api/weatherapi";
import { Favorites } from "./favorites";
import Home from "./home";


export default async function WeatherWidget({ 
  city = '', 
  region = '' 
}: { 
  city?: string; 
  region?: string;
}) {
  
  const Current = await getCurrent(`${city} + ${region}`);
  const Forecast = await getForecast(`${city} + ${region}`);

  if (!Current) {
    return <div>No data available</div>;
  }

  const localTime = Current.location.localtime;

// Convert the string to a Date object

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

const [datePart, timePart] = localTime.split(" ");

// Further split the date part by hyphens
var [year, month, day] = datePart.split("-");

month = monthNames[parseInt(month) - 1 ];
const formattedDate = `${month} ${day}${getOrdinalSuffix(day)}`;

// Format the time as "11:25"



if (!Current) {
    return <div>No data available</div>;
  }
    
    return (
        
        <div className=" p-3 w-[600px] h-[500px] border-2 border-gray-300 rounded-lg ">
          <div className="">
            <div className=" p-2 flex flex-row justify-between">
                <div>
                    <h1 className="text-lg font-bold">
                    {Current.location.name}, {Current.location.region === Current.location.name ? Current.location.country : Current.location.region}{Current.location.name.length + Current.location.region.length + Current.location.country.length < 50 && Current.location.region !== Current.location.name && Current.location.region.toLocaleLowerCase() != Current.location.country.toLocaleLowerCase() ? ", " + Current.location.country : ""}
                    </h1>
                    <span className="text-sm text-gray-500">{formattedDate}, {timePart}</span>
                </div>
                <div className="flex flex-row justify-between w-[90px] items-start">
                    <Home params={{city: city, region:region}}/>
                    <Favorites city={Current.location.name} region={Current.location.region} />
                    <Link href="/sign-in"><Image src='/share.svg' width={20} height={20} alt='share' className="cursor-pointer" /></Link>
                  </div>
                
            </div>
            {/* Weatherheader */}
                <MainInfoCard params={{city: city, region: region}} />
                <MapWeatherCard data={Forecast}/>
            </div>
        </div>
    )
}