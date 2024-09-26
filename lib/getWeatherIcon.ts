export function getWeatherIcon(weatherCondition: string){
        switch(weatherCondition){
            case "Fog":
                return "/weather_icons/animated/cloudy-day-1.svg"
            case "Partly cloudy":
                return "/weather_icons/animated/cloudy-day-2.svg"
            case "Overcast":
                return "/weather_icons/animated/cloudy-day-3.svg"
            case "Cloudy":
                return "/weather_icons/animated/cloudy-day-7.svg"
            case "Patchy light rain" || "Light rain":
                return "/weather_icons/animated/rainy-1.svg"
            case "Light rain shower" ||"Patchy light drizzle" :
                return "/weather_icons/animated/rainy-2.svg"
            case "Patchy rain nearby" || "Light rain shower":
                return "/weather_icons/animated/rainy-3.svg"
            case "Mist":
                return "/weather_icons/animated/day.svg"
            case "Moderate rain":
                return "/weather_icons/animated/rainy-5.svg"
            case "Heavy rain":
                return "/weather_icons/animated/rainy-6.svg"
            case "Thundery Outbreaks in nearby" || "Moderate or heavy rain in area with thunder":
                return "/weather_icons/animated/thunder.svg"
            case "Light freezing rain":
                return "/weather_icons/animated/snowy-2.svg"
            case "Patchy snow nearby" :
                return "/weather_icons/animated/snowy-3.svg"
            case "Moderate or heavy snow showers":
                return "/weather_icons/animated/snowy-6.svg"
            case "Clear " || "Clear" || "clear " || "Clear night":
                return "/weather_icons/animated/night.svg"
            case "Sunny":
                return "/weather_icons/animated/day.svg"
            default:
                return "/weather_icons/animated/night.svg"
        }
    
}