export default function Finder({ params }: { params: { country: string, region: string } }) {
    const { country, region } = params
    if(!region) {
        return (
            <div>
                <h1 className='text-gray-500 ml-5 mt-2'><a href='/Country' className='text-gray-500 border-b-2 border-gray-500 pb-[1px]'> Weather</a> {'>'} {country.replace("%20", " ")}</h1>
            </div>
        )
    }
    return (
        <div>
            <h1 className='text-gray-500 ml-5 mt-2'><a href='/Country' className='text-gray-500 border-b-2 border-gray-500 pb-[1px]'> Weather</a> {'>'} <a href={`/Country/${country}`} className='text-gray-500 border-b-2 border-gray-500 pb-[1px]'>{decodeURIComponent(country)}</a> {'>'} {decodeURIComponent(region)} </h1>
        </div>
    )
}