const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY

const BaseUrl = "http://api.weatherapi.com/v1"


const Forecast = "/forecast.json"
const Current = '/current.json'

const hour = 60 * 60 

export async function getForecast(location: string) {
    try {
      const url = `${BaseUrl}${Forecast}?key=${API_KEY}&q=${location}&aqi=yes&alerts=yes&days=3`;
      console.log('Fetching forecast data from URL:', url); // Log the request URL

      const response = await fetch(url, {cache: "no-store"});
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Empty or incomplete JSON response from the API.');
      }
  
      return data;
  
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

export async function getCurrent(location: string) {
    try {
      const url = `${BaseUrl}${Current}?key=${API_KEY}&q=${location}&aqi=yes`;
      console.log('Fetching current weather data from URL:', url); // Log the request URL

      const response = await fetch(url, {cache: "no-store"});
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Empty or incomplete JSON response from the API.');
      }
  
      return data;
  
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }
