import Footer from "@/components/footer/footer";
import Nasa from "@/components/nasa/nasa";
import News from "@/components/news/news";
import WeatherWidget from "@/components/weatherWidget/main";


export default function SoloWeatherPage({params}: {params: {location: string}}) {
console.log(params.location)
const decodedLocation = decodeURIComponent(params.location);

// Step 2: Split the location by the comma to separate the city and country
const [city, country] = decodedLocation.split(', ');

// Result



    return(
        <>
        <div className='mt-2  flex flex-col gap-4'>
            <div className=' flex flex-row flex-wrap gap-10 justify-center mt-10'>
            <WeatherWidget city={city} region={country}/>
            <News/>
            </div>
            <div className='mt-10'>
            <Nasa/>
            </div>
      </div>
        </>
    )
}