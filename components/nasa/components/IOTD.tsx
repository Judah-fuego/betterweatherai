import { getNasaImageOfTheDay } from "@/app/api/nasa"
import Image from "next/image"
export default async function NasaImageOfTheDay(){
    
    const data =  await getNasaImageOfTheDay()
    return(
        <div className="flex flex-col gap-4  p-2 rounded-lg">
            <h1 className="text-2xl font-bold">Image of the Day:</h1>
            <div className="relative">
                <Image 
                src={data.url} 
                alt="Nasa Image of the day" 
                width={450} 
                height={600}
                className="rounded-lg border-2 border-white"
            />
             <a href={data.url} target="_blank">
             <h1 className="absolute top-2 left-4 w-fit bg-slate-700 bg-opacity-75 text-white text-sm font-bold p-2 rounded-lg">
                {data.title}
                </h1>
                </a>

            </div>
        </div>
    )
}