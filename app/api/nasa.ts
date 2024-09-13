//  Wait for it 

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY

export async function getNasaImageOfTheDay() {
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`, { cache: 'force-cache' });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching NASA Image of the Day:', error);
      throw error;
    }
  }
  
  export async function getNasaGeoMagneticStorm() {
    try {
      const response = await fetch(`https://api.nasa.gov/DONKI/GST?api_key=${API_KEY}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching NASA Geomagnetic Storm data:', error);
      throw error;
    }
  }
  
  export async function getNasaSolarFlare() {
    try {
      const response = await fetch(`https://api.nasa.gov/DONKI/FLR?api_key=${API_KEY}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching NASA Solar Flare data:', error);
      throw error;
    }
  }
  
  export async function getNasaTechTransfer() {
    try {
      const response = await fetch(`https://api.nasa.gov/techtransfer/software?weatherapi_key=${API_KEY}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching NASA Tech Transfer data:', error);
      throw error;
    }
  }

  export async function getNasaTLEAPI(){
    try{
        const response = await fetch(`http://tle.ivanstanojevic.me/api/tle`)
        const data = await response.json()
        return data
    }catch(error){
        console.error('Error fetching NASA TLE API data:', error);
        throw error
    }
  }
  