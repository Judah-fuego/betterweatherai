import Link from "next/link";


export default function Country(){


    return (
        <>
        <button 
        className="  shadow-xl fixed w-fit p-2 bottom-10 right-4 bg-gradient-to-r from-[#f97234] via-[#ee2a7b] to-[#6228d7] rounded-lg text-white ">
            <Link href='/Country' className=""> Search by Country </Link>
        </button>
        </>
    )
}