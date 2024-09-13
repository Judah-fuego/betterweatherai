"use client"
import { getWeatherIcon } from "@/lib/getWeatherIcon";
import Image from "next/image";
import { useState } from "react";

export default  function MapWeatherCard( data: any ) {
    const [hourly, setHourly] = useState(true);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // New state for expanded index
    const currentTime = new Date().getHours();
    const hourlyData = [];
    const twelveHourData = [];

    const weatherIconBackground = (time:string ) => {
        if(parseInt(time) < 20 && parseInt(time) > 6){
            return "bg-blue-700/10"
        }
        else{
            return "bg-black"
        }
    }
    
    // Collect up to the next 6 hours of data
    for (let hourOffset = 0; hourOffset < 10; hourOffset++) {
        const totalHour = currentTime + hourOffset; // Current hour + the offset to get future hours
        const adjustedHour = totalHour % 24;         // Wrap around to 0 after 23
        const dayIndex = Math.floor(totalHour / 24); // Determine which day's data to use
    
        // Check if forecastday[dayIndex] exists
        if (data.data.forecast.forecastday[dayIndex]) {
            const hourData = data.data.forecast.forecastday[dayIndex].hour[adjustedHour];

            // If hourData exists, push it into our hourlyData array
            if (hourData) {
                hourlyData.push(hourData);
            } else {
                console.error(`Hour data not available for hour: ${adjustedHour} on day: ${dayIndex}`);
            }
        } else {
            console.error(`Forecast data not available for day index: ${dayIndex}`);
        }
    }
    

    for(let hourOffset = 0; hourOffset < 72; hourOffset+=12){
        const totalHour = currentTime + hourOffset; // Current hour + the offset to get future hours
        const adjustedHour = totalHour % 24;         // Wrap around to 0 after 23
        const dayIndex = Math.floor(totalHour / 24); // Determine which day's data to use

        if(data.data.forecast.forecastday[dayIndex]){
            const hourData = data.data.forecast.forecastday[dayIndex].hour[adjustedHour];
            if(hourData){
                twelveHourData.push(hourData);
            }
        }
    }

    


    if (!data) {
    return <div>No data available</div>;
  }
  
  return (
    <div className="">
        <div>
           
            <div className="flex justify-start gap-4 mt-5 mb-2 ">
                <button 
                type="button" 
                className="primary-color bg-slate-100  font-medium rounded-lg text-sm px-4 py-2 hover:bg-slate-200"
                onClick={() => setHourly(true)}>
                        Hourly
                </button>
                <button 
                type="button" 
                className="primary-color bg-slate-100  font-medium rounded-lg text-sm px-4 py-2 hover:bg-slate-200"
                onClick={() => setHourly(false)}
                >
                    Every 12 Hours
                </button>
            </div>
            </div>
        <div className="overflow-y-scroll h-[260px] scroll-smooth no-scrollbar">
        {hourly ? (
            <div className="">
            {hourlyData.map((hour: any, index: number) => (
                <div className="mb-2 bg-slate-100 rounded-lg">
                <div key={index} className=" flex flex-row  rounded-lg p-1 justify-between">
                    <div className="flex flex-row">
                    <Image src={getWeatherIcon(hour.condition.text)} 
                        alt="weather icon"
                        width={30} 
                        height={30} 
                        className={weatherIconBackground(hour.time.slice(11,16)) + " rounded-full mr-2"}/>
                        <p className="text-sm mt-[5px]">{hour.time.slice(11,16)} {hour.temp_f}°F</p>
                    </div>
                        
                        <button 
                        title="Open Weather Details"
                        className="p-2"
                        type="button"
                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)} // Toggle expanded index
                        >
                    < Image 
                     src={expandedIndex !== index ? "/arrow-open-right.svg" : "/arrow-open-down.svg"}
                     alt="arrow-right" 
                     width={12} 
                     height={12}/>
                </button> 

                </div>
                {expandedIndex === index && ( // Conditionally render additional info
                    <div className="  border-t-2 border-slate-200 p-2 mb-2">
                     <p>UV Index: {hour.uv}</p> 
                     <p>AQI: {hour.aqi}</p> 
                    </div>
                    )}
                </div>
                
            ))}
        
       </div> ):(
        <>
        {twelveHourData.map((hour: any, index: number) => (
            <div key={index} className="flex flex-row justify-between bg-slate-100 rounded-lg p-2 mb-2 ">
                <div className="flex flex-row">
                    <Image src={getWeatherIcon(hour.condition.text)} alt="weather icon" width={30} height={30} />
                    <p className="text-md mt-[5px]">{hour.time.slice(5,10).replace(/-/g, '/')} {hour.time.slice(11,16)} {hour.temp_f}°F</p>
                </div>
                <button 
                title="Open Weather Details"
                className="bg-slate-100 rounded-full p-2"
                type="button"
                >
                    <Image 
                     src="/arrow-open-right.svg"
                     alt="arrow-right" 
                     width={12} 
                     height={12}></Image>
                </button> 
                

            </div>
        ))}

       </>)}
        
    </div>
</div>

)
}