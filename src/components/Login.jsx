import {useRef, useState, useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import registerBG from '../img/registerBG.svg';
import {TiWarningOutline} from 'react-icons/ti';
import {Link,Redirect} from 'react-router-dom';
import Loading from '../reComponents/Loading';
import EmailVmodal from '../reComponents/EmailVmodal';
import {BiMailSend} from 'react-icons/bi';

const Login = () => {

    const [message,setMessage] = useState('');
    const [errMessage,setErrMessage] = useState('');
    const [loading,setLoading] = useState(true);
    const [showEmailVmodal,setShowEmailVmodal] = useState(false);

    const {auth,checkState,firestore,user} = useContext(AuthContext);


    const emailInput = useRef('');
    const passwordInput = useRef('');

    useEffect(() => {

        checkState(setLoading)
    },[]);


    const handleLogin = (e) => {

        e.preventDefault();

        const emailVal = emailInput.current.value.trim();
        const passwordVal = passwordInput.current.value.trim();

        if(emailVal === '' || passwordVal === '')
        {
            console.log('fill the blanks first');
            setMessage('يوجد حقول غير مكتملة');
        }
        else
        {
           auth.signInWithEmailAndPassword(emailVal, passwordVal)
            .then((userCredential) => {

                var user = userCredential.user;

                    console.log(user);

                    if(!user.emailVerified)
                    {
                        setShowEmailVmodal(true);
                    }
                    else
                    {
                        window.location.href = '/Home';
                    }
                    
            })
            .catch((error) => {
                switch(error.code){
                    case "auth/invalid-email":
                        setMessage('خطأ في كتابة الايميل');
                        break;
                    case "auth/user-disabled":
                        setMessage('الحساب غير مفعل');
                        break;
                    case "auth/user-not-found":
                        setMessage('الايميل غير مسجل');
                        break;
                    case "auth/wrong-password":
                        setMessage('خطأ في كتابة كلمة المرور');
                        break;
                    default:
                        setMessage('يوجد خطأ في تسجيل الدخول');
                        break;  
                }
            });
        }
    }

    const handleSendEmailV = () => {

       auth.currentUser.sendEmailVerification()
        .then(res => {
            console.log(res);
            setMessage('');
            setErrMessage('تم إرسال رسالة توثيق الحساب على ايميلك');
        })
        .catch(res => {
            console.log(res);
            setMessage(''); 
            setErrMessage('حدث خطأ وقت الإرسال');
        });
    }

    if(loading)
    return <Loading />

    if(user && user.emailVerified)
    return <Redirect to='/Home' />


    return ( 
        <div className="register relative grid place-items-center w-full">
            <img className="absolute h-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={registerBG} alt=""/>

            {showEmailVmodal && <EmailVmodal setShowEmailVmodal={setShowEmailVmodal} handleSendEmailV={handleSendEmailV} /> }

            <div className="registerFrame w-full max-w-600">

            <div className="flex flex-row-reverse justify-center items-center mt-6 space-x-2 space-x-reverse">
                {message && <TiWarningOutline className="w-6 h-6 text-aRed" />}
                {message && <p>{message}</p>}
            </div>

            <div className="flex flex-row-reverse justify-center items-center mb-6 space-x-2 space-x-reverse">
                {errMessage && <BiMailSend className="w-6 h-6 text-green-400" />}
                {errMessage && <p>{errMessage}</p>}
            </div>


            <div className="formsHolder relative left-0 top-0 h-full min-h-300 overflow-x-hidden z-0">

                {/* FORM 1 */}
                <form onSubmit={(e) => handleLogin(e)} className={`flex flex-col w-full max-w-15 mx-auto space-y-6 mt-6 mb-6 absolute top-1/4 transform left-1/2 -translate-x-1/2 opacity-100 -translate-y-1/4 transition-all duration-1000 ease-in-out z-10`}>
                        <input ref={emailInput} type="email" placeholder="الايميل" className="bg-transparent border-b-2 border-gray-400 focus:border-aYellow text-right placeholder-black placeholder-opacity-50 focus:outline-none p-1"/>
                        <input ref={passwordInput} type="password" placeholder="كلمة المرور" className="bg-transparent border-b-2 border-gray-400 focus:border-aYellow text-right placeholder-black placeholder-opacity-50 focus:outline-none p-1"/>
                        
                <div className="flex flex-row-reverse w-full text-xs space-x-2 space-x-reverse">
                            <p>ليس لديك حساب ؟ اضغط هنا</p>
                            <Link className="text-aYellow" to="/Register">للتسجيل</Link>
    
                </div>
                <br/>
                        <input type="submit" value="تسجيل الدخول" className="cursor-pointer bg-aYellow text-white w-28 mx-auto py-1 rounded-xl focus:outline-none"/>
                </form>

        
            </div>

            </div>
        </div>
     );
}
 
export default Login;