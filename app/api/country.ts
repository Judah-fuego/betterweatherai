export async function getCountryData(){
    const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,flag,region,cca2,ccn3`, {cache: 'force-cache'})
    const data = await response.json()
    const sortedData = data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common))
    return sortedData
}

export async function getCountryDataByCountryName(name: string){
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    const data = await response.json()

    return data
}
