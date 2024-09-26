import Auth from './elements/auth'
import Alerts from './elements/alerts'
import Menu from './elements/menu'
import Search from './elements/search'
import MenuOpen from './elements/menu-open'
import NotAuth from './elements/notAuth'


export default function Navbar(){
    return (
        <nav className=' bg-slate-50 overflow-x-clip m-auto '>
            
                <Alerts/>
                <div className='flex flex-row justify-around p-5 '>
                <Menu/>
                <Search/>
                <Auth/>
                </div>
        </nav>
    )
}