import Image from 'next/image'

export default function About(){
    return (
        <>
        <div className="px-10 pt-10 flex flex-col gap-2">
            <div className='flex gap-2'>
                <div className='flex flex-row gap-10 items-start'>
                <Image src='/logo/logo.svg'
                alt="Profile Image"
                height={100}
                width={100}/>
                <p className=' min-w-[300px] text-[50px]'>About Better Weather AI</p>
                </div>
            </div>


            <div className='flex flex-row'>
                <div className='w-[200px]'>
                    <img src='/greeceboat.jpg' alt='Greece Boat'
                    className='w-fit  min-w-[50px]'
                    />
                </div>
                <div className='flex flex-col gap-2 w-[70%] p-8'>
                   <div className=' '>Mission -></div>
                   <text className='h-full  '>Provide a <span className='primary-color'>Better</span> experience to consumers <br/>looking for <span className='primary-color'>Weather</span> around the <span className='bg-green-900 p-[2px] text-white rounded-md'>world</span> </text>
                </div>
            </div>

        </div>

        </>
    )
}