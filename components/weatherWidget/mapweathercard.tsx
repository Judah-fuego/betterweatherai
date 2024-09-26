'use client'
import { motion } from "framer-motion";
import { getWeatherIcon } from "@/lib/getWeatherIcon";
import Image from "next/image";
import { useState, useEffect } from "react";
import {Radiation, SunSnow, Thermometer, Umbrella, View, Wind } from 'lucide-react'


interface WeatherData {
  location: {
    localtime: string;
  };
  forecast: {
    forecastday: Array<{
      hour: Array<{
        time: string;
        condition: { text: string };
        temp_f: number;
        uv: number;
        aqi: number;
        astro: {
          sunrise: string;
        }
      }>;
    }>;
  };
}


interface MapWeatherCardProps {
  data: WeatherData;
}

export default function MapWeatherCard({ data }: MapWeatherCardProps) {
  const [hourly, setHourly] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // New state for expanded index
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [twelveHourData, setTwelveHourData] = useState<any[]>([]);
  const currentTime = parseInt(data.location.localtime.slice(11, 13)) + 1;


  useEffect(() => {
    const fetchWeatherData = () => {
      const newHourlyData: any[] = [];
      const newTwelveHourData: any[] = [];

      for (let hourOffset = 0; hourOffset < 10; hourOffset++) {
        const totalHour = currentTime + hourOffset;
        const adjustedHour = totalHour % 24;
        const dayIndex = Math.floor(totalHour / 24);

        if (data.forecast.forecastday[dayIndex]) {
          const hourData = data.forecast.forecastday[dayIndex].hour[adjustedHour];
          if (hourData) {
            newHourlyData.push(hourData);
          } else {
            console.error(`Hour data not available for hour: ${adjustedHour} on day: ${dayIndex}`);
          }
        } else {
          console.error(`Forecast data not available for day index: ${dayIndex}`);
        }
      }

      for (let hourOffset = 0; hourOffset < 72; hourOffset += 12) {
        const totalHour = currentTime + hourOffset;
        const adjustedHour = totalHour % 24;
        const dayIndex = Math.floor(totalHour / 24);

        if (data.forecast.forecastday[dayIndex]) {
          const hourData = data.forecast.forecastday[dayIndex].hour[adjustedHour];
          if (hourData) {
            newTwelveHourData.push(hourData);
          }
        }
      }

      setHourlyData(newHourlyData);
      setTwelveHourData(newTwelveHourData);
    };

    fetchWeatherData();
  }, [data, currentTime]); // Re-run when `data` or `currentTime` changes



  function weatherIconBackground(isDay: number){
    if(isDay == 0){
      return"bg-black";
    } else{
      return "bg-sky-300/50";
    }
  }

  if (!data) {
    return <div>No data available</div>;
  }


  return (
    <div className="">
      <div>
        <div className="flex justify-start gap-4 mt-5 mb-2">
          <button
            type="button"
            className="primary-color bg-slate-100 font-medium rounded-lg text-sm px-4 py-2 hover:bg-slate-200"
            onClick={() => setHourly(true)}
          >
            Hourly
          </button>
          <button
            type="button"
            className="primary-color bg-slate-100 font-medium rounded-lg text-sm px-4 py-2 hover:bg-slate-200"
            onClick={() => setHourly(false)}
          >
            Every 12 Hours
          </button>
        </div>
      </div>
      <div className="overflow-y-scroll h-[260px] scroll-smooth no-scrollbar">
        {hourly ? (
          <div className="">
            {hourlyData.map((hour, index) => (
              <div key={index} className="mb-2 bg-slate-100 rounded-lg">
                <div className="bg-slate-100 flex flex-row rounded-lg p-1 justify-between sticky top-0 border-b-2 border-slate-200">
                  <div className="flex flex-row ">
                    <Image
                      src={getWeatherIcon(hour.condition.text)}
                      alt="weather icon"
                      width={30}
                      height={30}
                      className={weatherIconBackground(hour.is_day) + " rounded-full mr-2"}
                    />
                    <p className="text-sm mt-[5px]">
                      {hour.time.slice(11, 16)} {hour.temp_f}°F
                    </p>
                  </div>

                  <button
                    title="Open Weather Details"
                    className="p-2"
                    type="button"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={expandedIndex !== index ? "/arrow-open-right.svg" : "/arrow-open-down.svg"}
                        alt="arrow-right"
                        width={12}
                        height={12}
                      />
                    </motion.div>
                  </button>
                </div>
                {expandedIndex === index && (
                  <div className="flex flex-col  p-2 mb-2">
                    <div className="w-full">
                      <div className="flex gap-4 justify-around">
                        <div className="flex flex-row  text-center">
                          <Thermometer width={20}/>
                          <div className="flex flex-col">{hour.temp_f}°F
                          <span className="text-sm text-slate-400">{hour.feelslike_f}°F</span></div></div>
                          <div className="flex flex-col  items-center"><Radiation/>      <span className="text-green-500">UV: {hour.uv}</span></div>
                          <div className="flex flex-col  items-center "><Umbrella/> <span className="text-blue-800">{hour.chance_of_rain}%</span></div>
                          <div className="flex flex-col  flex-wrap items-center text-center "><SunSnow/> {hour.condition.text}</div>
                          <div className="flex flex-col   items-center"><Wind/> {hour.wind_mph} mph</div>
                          <div className="flex flex-col  items-center"><View/> {hour.vis_miles} miles</div>
                          <div className="flex flex-col   items-center"> <Image src="/humidity.svg" width={24} height={24} alt={""}/>{hour.humidity}</div>
                      </div>
                      
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            {twelveHourData.map((hour, index) => (
              <div key={index} className="mb-2 bg-slate-100 rounded-lg">
              <div className="bg-slate-100 flex flex-row rounded-lg p-1 justify-between sticky top-0 border-b-2 border-slate-200">
                <div className="flex flex-row ">
                  <Image
                    src={getWeatherIcon(hour.condition.text)}
                    alt="weather icon"
                    width={30}
                    height={30}
                    className={weatherIconBackground(hour.is_day) + " rounded-full mr-2"}
                  />
                  <p className="text-sm mt-[5px]">
                    {hour.time.slice(11, 16)} {hour.temp_f}°F
                  </p>
                </div>

                <button
                  title="Open Weather Details"
                  className="p-2"
                  type="button"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={expandedIndex !== index ? "/arrow-open-right.svg" : "/arrow-open-down.svg"}
                      alt="arrow-right"
                      width={12}
                      height={12}
                    />
                  </motion.div>
                </button>
              </div>
              {expandedIndex === index && (
                <div className="flex flex-col  p-2 mb-2">
                  <div className="w-full">
                    <div className="flex gap-4 justify-around">
                      <div className="flex flex-row  text-center">
                        <Thermometer width={20}/>
                        <div className="flex flex-col">{hour.temp_f}°F
                        <span className="text-sm text-slate-400">{hour.feelslike_f}°F</span></div></div>
                        <div className="flex flex-col  items-center"><Radiation/>      <span className="text-green-500">UV: {hour.uv}</span></div>
                        <div className="flex flex-col  items-center "><Umbrella/> <span className="text-blue-800">{hour.chance_of_rain}%</span></div>
                        <div className="flex flex-col  flex-wrap items-center text-center "><SunSnow/> {hour.condition.text}</div>
                        <div className="flex flex-col   items-center"><Wind/> {hour.wind_mph} mph</div>
                        <div className="flex flex-col  items-center"><View/> {hour.vis_miles} miles</div>
                        <div className="flex flex-col   items-center"> <Image src="/humidity.svg" width={24} height={24} alt={""}/>{hour.humidity}</div>
                    </div>
                    
                  </div>
                </div>
              )}
            </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}