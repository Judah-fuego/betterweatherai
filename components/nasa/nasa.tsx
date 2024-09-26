import NasaImageOfTheDay from "./components/IOTD";
import TLE from "./components/TLE";
import Image from "next/image";

export default function Nasa(){
    return(
        <div className="bg-slate-100">
            <div className=" border-b-2 border-slate-300 flex flex-row justify-center items-center gap-3 bg-slate-200 p-2">
                <h1 className="text-4xl font-bold text-center ">Nasa API</h1>
                <Image 
                src="/nasa.svg" 
                alt="Nasa" 
                width={50}
                height={100}
                className=""/>
            </div>
            <div className="flex flex-row gap-10 justify-center mt-5  flex-wrap">
            <NasaImageOfTheDay/>
            <TLE/>
            </div>
        </div>
        
    )
}