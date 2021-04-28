import {useState,useEffect} from 'react';
import {GrMenu} from 'react-icons/gr';
import {GrClose} from 'react-icons/gr';
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg';
import Sidebar from './Sidebar';

const Navbar = () => {

    const [menuStatus,setMenuStatus] = useState(false);
    const [pageName,setPageName] = useState('');

    let pathName = window.location.pathname;

    useEffect(() => {

        if(pathName === '/Register')
        {
            setPageName('إنشاء حساب');
        }
        else if(pathName === '/Login')
        {
            setPageName('تسجيل دخول')
        }
        else if(pathName === '/')
        {
            setPageName('')
        }
        else if(pathName === '/Home')
        {
            setPageName('الرئيسية')
        }
        else if(pathName === '/Profile')
        {
            setPageName('حسابي')
        }
        else if(pathName === '/Talents')
        {
            setPageName('المبدعين')
        }
        else if(pathName === '/Chats')
        {
            setPageName('المحادثات')
        }
    },[pathName])

    const toggleMenu = () => {

        setMenuStatus(!menuStatus);
    }

    return ( 

        <>
        <nav className={`shadow-md block w-full z-40 bg-gray h-16 ${(pathName !== '/')?'':'navbar'}`}>
            <div className="flex justify-between items-center pl-4 pr-5 py-2">
                <Link to="/"><img className="w-28 h-26" src={logo} alt=""/></Link>
                <p className="mt-3 opacity-50 font-semibold hidden sm:block">
                    {pageName}
                </p>
                {(!menuStatus)?<GrMenu onClick={toggleMenu} className="w-7 h-7 mt-3 cursor-pointer" />:<GrClose onClick={toggleMenu} className="w-7 h-7 mt-2 cursor-pointer" />}
            </div>
        </nav>

        <div className={`sidebarHolder absolute top-16 left-0 w-full overflow-x-hidden`}>
            <Sidebar menuStatus={menuStatus} toggleMenu={toggleMenu} />
        </div>
        </>

     );
}
 
export default Navbar;