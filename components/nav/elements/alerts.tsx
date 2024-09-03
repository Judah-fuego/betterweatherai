import Image from "next/image";
import Link from 'next/link';

export default function Alerts(){
    return (
    <div className="w-screen bg-slate-600 flex justify-center flex-row gap-3 text-white m-auto ">
        <Image 
        src='/weather_icons/animated/cloudy-day-1.svg'
        height={30}
        width={30}
        alt='cloudy-day-1'/>
        <Link href="https://weather.com/" className="mt-1">Intense Weather Near By</Link>
    </div>
    );
}