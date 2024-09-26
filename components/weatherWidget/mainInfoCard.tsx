
import {  getCurrent, getForecast } from "@/app/api/weatherapi";
import TextSkeleton from "../skeletons/text";
import { getWeatherIcon } from "@/lib/getWeatherIcon";


export default async function MainInfoCard({params}: {params: {city: string, region: string}}) {

  const Current = await getCurrent(`${params.city}, ${params.region}`)
  const Forecast = await getForecast(`${params.city}, ${params.region}`)

  if (!Current) {
    return <div>No data available</div>;
  }

  const weatherIcon = getWeatherIcon(Current.current.condition.text)
  const AQI = Current.current.air_quality.o3
  const UV = Current.current.uv

  const AQI_Color = () => {
    if (AQI <= 50) {
      return "bg-green-500/80 hover:bg-green-500/100 cursor-pointer";
    } else if (AQI <= 100) {
      return "bg-yellow-500/80 hover:bg-yellow-500/100 cursor-pointer";
    } else if (AQI <= 150) {
      return "bg-orange-500/80 hover:bg-orange-500/100 cursor-pointer";     
  } else if (AQI <= 200) {
    return "bg-red-500/80 hover:bg-red-500/100 cursor-pointer";
  } else if (AQI <= 300) {
    return "bg-purple-500/80 hover:bg-purple-500/100 cursor-pointer";
  } else {
    return "bg-maroon-500/80 hover:bg-maroon-500/100 cursor-pointer";
  }
}

const UV_Color = () => {
  if (UV <= 3) {
    return "bg-green-500/80 hover:bg-green-500/100 cursor-pointer";
  } else if (UV <= 6) {
    return "bg-yellow-500/80 hover:bg-yellow-500/100 cursor-pointer";
  } else if (UV < 9) {
    return "bg-orange-500/80 hover:bg-orange-500/100 cursor-pointer";
  }
  else if (UV <= 11) {
    return "bg-red-500/80 hover:bg-red-500/100 cursor-pointer";
  }
  else {
    return "bg-maroon-500/80 hover:bg-maroon-500/100 cursor-pointer";
  }
}

const selected =  "hover:bg-gray-100/50"


  return (
    <>
      
        
          { Current.location.name ? (
              <>
              <div className="flex flex-row items-center divide-x-2 divide-gray-200 divide-dashed h-20 w-[620px] ">
              <div className="flex flex-row gap-2 items-center">
                <img 
                className={(Current.current.is_day === 0 ? "bg-[#1B1212] " : " bg-blue-300/50 ") + "rounded-3xl"}
                src={weatherIcon} alt="Weather Icon" width={80} height={80} />
                <div className= " items-center h-[75px] center gap-2 px-2">
                    <h1 className="text-xl font-bold">{Current.current.temp_f}°F</h1>
                    <p className="text-[9px] text-gray-500">Feels like {Current.current.feelslike_f}°F</p>
                    <h2 className="text-sm overflow-x-scroll w-[80px]">{Current.current.condition.text}</h2>
                </div>
              </div>

              <div className=" h-[75px] flex flex-col gap-[4px] px-2">
                <div className="flex flex-row gap-2">
                <p className={UV_Color() + " rounded-lg w-fit p-1 hover:drop-shadow-sm text-center text-xs "}>UV: {Current.current.uv}</p>
                <p className={AQI_Color() + " rounded-lg w-fit p-1 text-xs text-center"}>AQI: {Current.current.air_quality.o3} </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm"><span className=" font-bold">High: </span> {Forecast.forecast.forecastday[0].day.maxtemp_f}°F</p>
                  <p className="text-sm"><span className=" font-bold">Low:  </span> {Forecast.forecast.forecastday[0].day.mintemp_f}°F</p>
                </div>
              </div>
              <div className= " h-[75px] flex flex-col gap-[4px] px-2 flex-center">
                <p className="text-sm"><span className=" font-bold">Wind:</span> {Current.current.wind_mph} mph</p>
                <p className="text-sm"><span className="font-bold">Humidity:</span> {Current.current.humidity}%</p>
                <p className="text-sm"><span className="font-bold">Cloud:</span> {Current.current.cloud}%</p>

              </div>
              <div className=" h-[75px] flex flex-col gap-[4px] px-2">
                <p className="text-sm "><span className="font-bold">Sunrise:</span> {Forecast.forecast.forecastday[0].astro.sunrise}</p>
                <p className="text-sm"><span className="font-bold">Sunset:</span> {Forecast.forecast.forecastday[0].astro.sunset}</p>
                <p className="text-sm"><span className="font-bold">Moon Shine:</span> {Forecast.forecast.forecastday[0].astro.moon_illumination}%</p>
              </div>
              </div>
              </>
             
              
              

          ) : (
            <TextSkeleton/>
          )}
    </>
  );
}
