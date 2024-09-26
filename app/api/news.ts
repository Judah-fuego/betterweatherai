const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

const BaseUrl = "https://api.thenewsapi.com/v1/news/";

const topStories = "top";

export async function getTopWeatherStories() {
    try {
        // Get today's date
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        
        // Calculate the date three days ago
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3);

        // Format dates to 'YYYY-MM-DD'
        const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const yesterdayStr = formatDate(yesterday);
        const threeDaysAgoStr = formatDate(threeDaysAgo);
        // Construct the API URL with dynamic date range
        const apiUrl = `${BaseUrl}${topStories}?api_token=${API_KEY}&search="Weather"&limit=3&published_after=${threeDaysAgoStr}&published_before=${yesterdayStr}`;

        const response = await fetch(apiUrl);

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
        throw error;
    }
}



