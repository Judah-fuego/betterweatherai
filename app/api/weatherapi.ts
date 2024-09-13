const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY

const BaseUrl = "http://api.weatherapi.com/v1"


const Forecast = "/forecast.json"
const Current = '/current.json'

const hour = 60 * 60 

export async function getForecast(location: string) {
    try {
      // Fetch weather data from the API
      const response = await fetch(`${BaseUrl}${Forecast}?key=${API_KEY}&q=${location}&aqi=yes&alerts=yes&days=3`, {
        next: { revalidate: hour }
      });
      
      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
  
      // Attempt to parse the response JSON data
      const data = await response.json();
  
      // Check if data is valid and complete
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Empty or incomplete JSON response from the API.');
      }
  
      return data; // Return the parsed JSON data
  
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null; // Return null or handle error as needed
    }
  }

  export async function getCurrent(location: string) {
    try {
      // Fetch weather data from the API
      const response = await fetch(`${BaseUrl}${Current}?key=${API_KEY}&q=${location}&aqi=yes`, {
        next: { revalidate: 1 }
      });
      
      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
  
      // Attempt to parse the response JSON data
      const data = await response.json();
  
      // Check if data is valid and complete
      if (!data || Object.keys(data).length === 0) {
        throw new Error('Empty or incomplete JSON response from the API.');
      }
  
      return data; // Return the parsed JSON data
  
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null; // Return null or handle error as needed
    }
  }
