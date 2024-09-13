import styles from './menu.module.css'
  

const dataPage = ['Home', 'About', 'Services', 'Contact', 'Sign In', 'Sign Up']
const dataProfile = ['Profile', 'Settings', 'Logout']


export default function MenuOpen() {
    return(
        
              <div className='absolute  border-[1px] border-primary-color rounded-sm bg-slate-50 top-[60px] w-[200px] pb-5'>
                <div className='w-fit ml-2 pt-3 border-b-[1px] border-primary-color'>Account Settings</div>
                <div className='w-fit pl-4 mt-1 '>
                  {dataProfile.map((item) => (
                    <div className='pt-1 pl-2 hover:text-slate-600 hover:border-l-[1px] border-primary-color cursor-pointer'>{item}</div>
                  ))}
                </div >
                <div className='w-fit ml-2 pt-3 border-b-[1px] border-primary-color'>Page</div>
                <div className='w-fit pl-4 mt-1 '>
                  {dataPage.map((item) => (
                  <div className='pt-1 pl-2 hover:text-slate-600 hover:border-l-[1px] border-primary-color cursor-pointer'>{item}</div>
                  ))}
                </div>
                
              </div>
            
    
    )
}