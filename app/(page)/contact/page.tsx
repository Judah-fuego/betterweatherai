import Form from '@/components/form'
export default async function Contact() {

    return (
        <>
        <div className='text-center mt-10'>
            <p>SPARKS CAPITAL</p>
            <h1 className='text-[90px] primary-color'> CONTACT US</h1>
        </div>
        <div className="flex flex-row gap-10 justify-center">
            <div className=' w-[30%]'>
                <h2 className='tracking-widest pb-2 border-b-2 border-black'>Where can we improve?</h2>
                <br/>
                <Form/>
            </div>
            <div className='flex flex-col gap-4 w-[30%]'>
                <p className='tracking-widest pb-2 border-b-2 border-black'> CONTACT DETAILS</p>
                <p className=''><a href="">judahworkflow@gmail.com</a></p>
                <p className='w-fill'>12345 Miracle Street, Italy, CA, United States</p>
                <p className='w-fill'>12345 Miracle Street, Italy, CA, United States</p>
            </div>
        </div>
        </>
    )

}