import profile from '../img/profile.svg';
import {Link, Redirect} from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../reComponents/Loading';

const Sidebar = (props) => {

    const {menuStatus,toggleMenu} = props;

    const [loading,setLoading] = useState(true);
    const sideBarElm = useRef('')
    let pathName = window.location.pathname;

    const {user,authState,userData,userImage,auth} = useContext(AuthContext);

    useEffect(() => {

        authState();
      },[]);

      useEffect(() => {

        resetSideBar();
      },[pathName]);

      const handleSignOut = () => {

        auth.signOut();

        window.location.href = '/';
      }
      
      const resetSideBar = () => {

        menuStatus && toggleMenu()
    }

      return ( 
        <div ref={sideBarElm} className={`sidebar absolute top-0 ${(!menuStatus)?'left-full':'left-0 md:left-3/4'} w-full md:w-1/4 h-full text-center flex justify-center transition-all duration-700 ease-in-out z-50`}>
            <div className="mt-20 flex flex-col space-y-8">

            {(!userData || user && !user.emailVerified)
            ?<>
               <img className="w-24 h-24 mx-auto rounded-full" src={profile} alt=""/>
                <p>سجل دخولك للوصول لباقي الخدمات</p>
            <div className="relative">
            <div className="contents">
                    <Link className="w-32 mx-auto relative border-2 border-aYellow py-1 px-2.5 hover:bg-aYellow hover:text-white transition duration-200 ease-in-out" to="/Login">تسجيل الدخول</Link>
                 </div>
            </div>  
            </>
            :<>
            <img className="w-24 h-24 mx-auto rounded-full" src={(userImage !== '')?userImage:profile} alt=""/>
            <p>{userData.name}</p>
            <p>{(userData.role === 'T')?userData.talent:userData.company}</p>
            <hr className="h-0 w-full"/>
            <Link to="/Home">الرئيسية</Link>
            <Link to="/Talents">مبدعين</Link>
            <Link to="/Chats">محادثات</Link>
            <Link to="/Profile">حسابي</Link>
            <p className="cursor-pointer" onClick={handleSignOut}>تسجيل خروج</p>

            </>
            }

         </div>
        </div>
     );

}
 
export default Sidebar;