const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY

const BaseUrl = "https://api.thenewsapi.com/v1/news/"

const topStories = "top"

export async function getTopWeatherStories() {
    try{
        const response = await fetch(`${BaseUrl}${topStories}?api_token=${API_KEY}&search="weather alerts"&categories=science&limit=3`)
        if(!response.ok){
            throw new Error(`API error: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        if (!data || Object.keys(data).length === 0) {
            throw new Error('Empty or incomplete JSON response from the API.');
          }
        return data
    } catch (error) {
        console.error('Error fetching weather data:', error)
        throw error
    }

}



