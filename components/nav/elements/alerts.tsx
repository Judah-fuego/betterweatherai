import Image from "next/image";
import Link from 'next/link';

export default function Alerts(){
    return (
   <div className=" relative  flex  animate-slide-rotate">
    <div className=" flex flex-row gap-3 text-white m-auto bg-primary-color px-2">
        <div className="hover:animate-pulse w-[600px] flex flex-row justify-center border-r-2 border-white">
            <Image 
            src='/weather_icons/animated/cloudy-day-1.svg'
            height={30}
            width={30}
            alt='cloudy-day-1'>
           </Image>
           <Link href="https://weather.com/" target="_blank" className="mt-1">
                Intense Weather Near By
           </Link>
        </div>
        <div className="hover:animate-pulse w-[500px] flex flex-row justify-center border-r-2 border-white">
            <Image 
            src='/weather_icons/animated/cloudy-day-1.svg'
            height={30}
            width={30}
            alt='cloudy-day-1'>
           
           </Image>
           <Link href="https://weather.com/" target="_blank" className="mt-1">
                Intense Weather Near By
           </Link>
        </div>
        <div className=" hover:animate-pulse w-[500px] flex flex-row justify-center border-r-2 border-white">
            <Image 
            src='/weather_icons/animated/cloudy-day-1.svg'
            height={30}
            width={30}
            alt='cloudy-day-1'>
           </Image>
           <Link href="https://weather.com/" target="_blank" className="mt-1">
                Intense Weather Near By
           </Link>
        </div>   
    </div>
   </div>     
    
    );
}