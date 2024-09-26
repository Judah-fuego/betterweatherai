import Footer from '@/components/footer/footer';
import Nasa from '@/components/nasa/nasa';
import Navbar from '@/components/nav/navbar';
import News from '@/components/news/news';
import WeatherWidget from '@/components/weatherWidget/main';
import {getHome} from './actions'
import Country from '@/components/country/country';

export default async function Page() {
  const home = await getHome();
  const [homeCity, homeRegion] = home.split(',').map((part: string) => part.trim());
  
  return (
    <>
     <div>
     <Navbar/>
      <div className='mt-2  flex flex-col gap-4'>
        <div className=' flex flex-row flex-wrap gap-10 justify-center mt-10'>
        <WeatherWidget city={homeCity} region={homeRegion}/>
        <News/>
        </div>
        <div className='mt-10'>
        <Nasa/>
        </div>
        {/* <News/> */}
      </div>
      <Footer/>
     </div>
     <Country/>

    </>
  );
}
