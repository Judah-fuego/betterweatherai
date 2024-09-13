export async function getCountryData(){
    const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,flag,region,`)
    const data = await response.json()
    return data
}