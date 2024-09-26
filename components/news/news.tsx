import { getTopWeatherStories } from "@/app/api/news"
import Image from "next/image"

export default async function News(){
    let newsData;
    try {
        newsData = await getTopWeatherStories();
    } catch (error) {
        console.error("Failed to fetch news data:", error);
        return <div>Error loading news.</div>; // Handle error gracefully
    }

    // Validate data before accessing

    return(
        <div className="flex flex-col justify-between gap-4 w-[300px]">
            <h1 className="text-3xl font-bold border-b-2 border-slate-100  ">Weather Headlines</h1>
            {newsData.data.map((news: any) => (
                <div key={news.uuid} className=" flex flex-row w-[300px] border-b-2 border-slate-100  p-2">
                    <div className="pr-2">
                    <h1 className="text-sm font-bold">{news.source.toUpperCase()}</h1>
                    <h2 className="text-xs">{news.snippet.slice(0, 60)}...</h2>
                    <a href={news.url} target="_blank" className="text-sm text-blue-500">Read More</a>
                    </div>
                    <img 
                    src={news.image_url} 
                    alt={news.title} 
                    width={100} 
                    height={50}
                    className="object-cover" />
                </div>
            ))}
        </div>
    )
}