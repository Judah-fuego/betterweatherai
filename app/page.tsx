import Navbar from '@/components/nav/navbar';
import WeatherWidget from '@/components/weatherWidget/main';
import Link from 'next/link'

export default async function Index() {
  return (
    <>
     <div>
     <Navbar/>
      <div className='items-center'>
        <WeatherWidget/>
        {/* <img src="https://flagsapi.com/BE/flat/64.png"/> */}
      </div>
     </div>
    </>
  );
}
