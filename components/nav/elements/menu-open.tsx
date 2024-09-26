import Link from "next/link"

  

const dataPage = [['Home', '/'], ['About', '/about'], ['Country', '/Country'], ['Services','/services'], ['Contact', '/contact'], ['Sign Out', '/sign-in'] ]


export default function MenuOpen() {
    return(
        
              <div className=' z-50 absolute  border-[1px] border-primary-color rounded-sm bg-slate-50 top-[60px] w-[200px] pb-5'>
                
                <div className='w-fit ml-2 pt-3 border-b-[1px] border-primary-color'>Page</div>
                <div className='w-fit pl-4 mt-1 flex flex-col'>
                  {dataPage.map((item) => (
                  <Link key={item[0]} className='pt-1 pl-2 hover:text-slate-600 hover:border-l-[1px] border-primary-color cursor-pointer' href={item[1]}>{item[0]}</Link>
                  ))}
                </div>

                
              </div>
            
    
    )
}