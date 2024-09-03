import Auth from './elements/auth'
import Alerts from './elements/alerts'
import Menu from './elements/menu'
import Search from './elements/search'

export default function Navbar(){
    return (
        <nav className='m-auto fixed '>
            <Alerts/>
            <div className='flex flex-row justify-around p-5'>
                <Menu/>
                <Search/>
                <Auth/>
            </div>
        </nav>
    )
}