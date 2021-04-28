import {useContext, useEffect, useState} from 'react';
import registerBG from '../img/registerBG.svg';
import {ImUserCheck} from 'react-icons/im';
import {Link, Redirect} from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../reComponents/Loading';

const AccountCreated = () => {


    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(true);

    const {user,userData,checkState} = useContext(AuthContext);

    useEffect(() => {

        checkState(setLoading);
      },[]);


      if(loading)
      return <Loading />

      if(user && user.emailVerified)
      return <Redirect to='/Home' />

      if(!user)
      return <Redirect to='/' />


    return ( 
        <div className="register relative grid place-items-center w-full">
            <img className="absolute h-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={registerBG} alt=""/>

            <div className="registerFrame w-full max-w-400">
                <div className="min-h-250">
                    <ImUserCheck className="mx-auto w-12 h-12 mt-6 text-aYellow" />
                    <p className="text-center text-2xl mt-6">{userData.name}</p>
                    <p className="text-center text-lg mt-8">لقد تم إنشاء حسابك بنجاح في المنصه</p>
                    <p className="text-center mt-4">وتم إرسال رسالة توثيق الحساب على ايميلك</p>
                    <p className="text-center text-xs mt-4">يجب توثيق حسابك لتتمكن من استخدام خدماتنا</p>
                </div>

            </div>
        </div>
     );
}
 
export default AccountCreated;