import {useState,useRef,useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {Link, Redirect} from 'react-router-dom';
import registerBG from '../img/registerBG.svg';
import RegisterUser from '../reComponents/RegisterUser';
import RegisterPaginate from '../reComponents/RegisterPaginate';
import RegisterModal from '../reComponents/RegisterModal';
import profile from '../img/profile.svg'; 
import {TiWarningOutline} from 'react-icons/ti';
import Loading from '../reComponents/Loading';

const Register = () => {

    const {auth,firestore,checkState,storage,user} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);

    useEffect(() => {

        checkState(setLoading)
    },[]);

    const [pageStatus,setPageStatus] = useState(1);
    const [userStatus,setUserStatus] = useState('T');
    const [message,setMessage] = useState('');

    const nameInput = useRef('');
    const emailInput = useRef('');
    const passwordInput = useRef('');
    
    const photoInput = useRef('');
    const phoneInput = useRef('');
    const talentInput = useRef('');
    const experInput = useRef('');
    const companyInput = useRef('');

    const photoHolder = useRef('');
    const photoHolder1 = useRef('');

    const handleForm1 = () => {
        
        let nameVal = nameInput.current.value;
        let emailVal = emailInput.current.value;
        let passwordVal = passwordInput.current.value;

        if(nameVal.trim() === '' || emailVal.trim() === '' || passwordVal.trim() === '')
        {
            console.log('fill the blanks first');
            setMessage('يوجد حقول غير مكتملة');
        }
        else if(passwordVal.trim().length < 6)
        {
            console.log('6 digits in password field');
            setMessage('يجب أن تكون كلمة المرور 6 خانات أو أكثر');
        }
        else
        {
            console.log(nameVal);
            console.log(emailVal);
            console.log(passwordVal);
            setMessage('');
            setPageStatus(2);
        }
    }
    const handleForm2 = () => {
        
        let phoneVal = phoneInput.current.value;
        let talentVal = talentInput.current.value;
        let experVal = experInput.current.value;
        

        if(phoneVal.trim() === '' || talentVal.trim() === '' || experVal.trim() === '')
        {
            console.log('fill the blanks first');
            setMessage('يوجد حقول غير مكتملة');
        }
        else
        {
            setMessage('');
            setPageStatus(3);
        }
    }
    const handleForm3 = () => {
        
        auth.createUserWithEmailAndPassword(emailInput.current.value, passwordInput.current.value)
        .then((userCredential) => {
            var userID = userCredential.user.uid;

            firestore.collection('Users').doc(userID).set({
                name: nameInput.current.value.trim(),
                email: emailInput.current.value.trim(),
                phone: phoneInput.current.value.trim(),
                talent: talentInput.current.value.trim(),
                exper: parseInt(experInput.current.value.trim()),
                role: 'T',
                available: false,
                createdAt: Date.now(),
                updatedAt: 0
            })
            .then( async res => {
                
                if(photoInput.current.files[0])
                {
                    const photoVal = photoInput.current.files[0];

                    const storageRef = storage.ref('Profile/'+userID);

                   await storageRef.put(photoVal)
                    .then(res => console.log(res))
                    .catch(res => console.log(res))
                }

                await auth.currentUser.sendEmailVerification()
                .then(res => console.log(res))
                .catch(res => console.log(res));
                
                console.log(res);
                window.location.href = '/AccountCreated';

            })
            .catch(res => {console.log(res); setMessage('يوجد خطأ في التسجيل')});
        })
        .catch((error) => {
            switch(error.code){
                case "auth/email-already-in-use":
                    setMessage('الايميل مستخدم من قبل');
                    break;
                case "auth/invalid-email":
                    setMessage('خطأ في كتابة الايميل');
                    break;
                case "auth/weak-password":
                    setMessage('كلمة السر صعيفة');
                    break;
                default:
                    setMessage('يوجد خطأ في التسجيل');
                    break;
            }
        });
    }
    const handleForm2a = () => {

        let photoVal = photoInput.current;
        let phoneVal = phoneInput.current.value;
        let companyVal = companyInput.current.value;
        

        if(phoneVal.trim() === '' || companyVal.trim() === '')
        {
            console.log('fill the blanks first');
            setMessage('يوجد حقول غير مكتملة');
        }
        else
        {
            console.log(photoVal.files[0]);
            console.log(phoneVal);
            console.log(companyVal);
            setMessage('');
            setPageStatus(3);
        }
    }
    const handleForm3a = () => {
        
        auth.createUserWithEmailAndPassword(emailInput.current.value, passwordInput.current.value)
        .then((userCredential) => {
            var userID = userCredential.user.uid;

            firestore.collection('Users').doc(userID).set({
                name: nameInput.current.value.trim(),
                email: emailInput.current.value.trim(),
                phone: phoneInput.current.value.trim(),
                company: companyInput.current.value.trim(),
                role: 'F',
                available: false,
                createdAt: Date.now(),
                updatedAt: 0
            })
            .then( async res => {
                
                if(photoInput.current.files[0])
                {
                    const photoVal = photoInput.current.files[0];

                    const storageRef = storage.ref('Profile/'+userID);

                   await storageRef.put(photoVal)
                    .then(res => console.log(res))
                    .catch(res => console.log(res))
                }

                    await auth.currentUser.sendEmailVerification()
                    .then(res => console.log(res))
                    .catch(res => console.log(res));

                    console.log(res);
                    window.location.href = '/AccountCreated';
            })
            .catch(res => console.log(res));
        })
        .catch((error) => {
            switch(error.code){
                case "auth/email-already-in-use":
                    setMessage('الايميل مستخدم من قبل');
                    break;
                case "auth/invalid-email":
                    setMessage('خطأ في كتابة الايميل');
                    break;
                case "auth/weak-password":
                    setMessage('كلمة السر صعيفة');
                    break;
            }
        });
    }
    const handlePhoto = () => {

        let photoVal = photoInput.current;

        console.log(photoVal.files[0]);

        if(photoVal.files[0])
        {
            photoHolder.current.src = URL.createObjectURL(photoVal.files[0]);
            photoHolder1.current.src = URL.createObjectURL(photoVal.files[0]);
        }
    }
    const goBack = () => {
        
        setPageStatus(pageStatus - 1);
    }
    const handleUserStatus = (status) => {

        (status === 'T')?setUserStatus('T'):setUserStatus('F');

        setPageStatus(1);

        nameInput.current.value = '';
        emailInput.current.value = '';
        passwordInput.current.value = '';

        phoneInput.current.value = '';
        talentInput.current.value = '';
        experInput.current.value = '';
        companyInput.current.value = '';
    }

    if(loading)
    return <Loading />

    // if(user && !user.emailVerified)
    // return <Redirect to='/AccountCreated' />

    if(user && user.emailVerified)
    return <Redirect to='/Home' />

    return ( 
        <div className="register relative grid place-items-center w-full">
            <img className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={registerBG} alt=""/>
            <div className="registerFrame w-full max-w-600">


            <RegisterUser userStatus={userStatus} handleUserStatus={handleUserStatus} />

            <RegisterPaginate pageStatus={pageStatus} />

            <div className="flex flex-row-reverse justify-center items-center mt-6 space-x-2 space-x-reverse">
                {message && <TiWarningOutline className="w-6 h-6 text-aRed" />}
                {message && <p>{message}</p>}
            </div>

            <div className="formsHolder relative left-0 top-0 h-full min-h-600 overflow-x-hidden z-0">

                {/* FORM 1 */}
                <div className={`flex flex-col w-full max-w-15 mx-auto space-y-6 mt-12 mb-6 absolute top-1/4 transform ${(pageStatus === 1)?'left-1/2 -translate-x-1/2 opacity-100':'left-full -translate-x-0 opacity-0'} -translate-y-1/4 transition-all duration-1000 ease-in-out z-10`}>
                        <input ref={nameInput} type="text" placeholder="الاسم" className="bg-transparent border-b-2 border-gray-400 focus:border-aYellow text-right placeholder-black placeholder-opacity-50 focus:outline-none p-1"/>
                        <input ref={emailInput} type="email" placeholder="الايميل" className="bg-transparent border-b-2 border-gray-400 focus:border-aYellow text-right placeholder-black placeholder-opacity-50 focus:outline-none p-1"/>
                        <input ref={passwordInput} type="password" placeholder="كلمة المرور" className="bg-transparent border-b-2 border-gray-400 focus:border-aYellow text-right placeholder-black placeholder-opacity-50 focus:outline-none p-1"/>
                        
                <div className="flex flex-row-reverse w-full text-xs space-x-2 space-x-reverse">
                            <p>هل لديك حساب ؟ اضغط هنا</p>
                            <Link className="text-aYellow" to="/Login">لتسجيل الدخول</Link>
    
                </div>
                        <input onClick={handleForm1} type="submit" value="التالي" className="cursor-pointer bg-aYellow text-white w-20 mx-auto py-1 rounded-r-xl focus:outline-none"/>
                </div>
    
                {/* FORM 2 */}
                <div className={`flex flex-col w-full max-w-15 mx-auto space-y-8 mt-12 mb-6 absolute top-0 transform ${(pageStatus === 2)?'left-1/2 -translate-x-1/2 opacity-100':'left-full -translate-x-0 opacity-0'} -translate-y-0 transition-all duration-1000 ease-in-out z-20`}>
                        <img ref={photoHolder} className="w-24 h-24 mx-auto rounded-full" src={profile} alt=""/>
    
                        <div className="space-y-4">
                            <p className="text-black text-right text-opacity-50">الصورة الشخصية <small>&#10088;اختياري&#10089;</small></p>                
                            <input onChange={handlePhoto} ref={photoInput} type="file" placeholder="الصورة" className="bg-transparent border-none border-aYellow text-right placeholder-black placeholder-opacity-50 focus:outline-none p-1"/>
                        </div>
                        <input ref={phoneInput} type="number" placeholder="(05xxxxxxxx) الجوال" className="bg-transparent border-b-2 border-gray-400 focus:border-aYellow text-right placeholder-black placeholder-opacity-50 focus:outline-none p-1"/>
                         <input ref={talentInput} type="text" placeholder="الموهبة" className={`${(userStatus === 'F')?'hidden':''} bg-transparent border-b-2 border-gray-400 focus:border-aYellow text-right placeholder-black placeholder-opacity-50 focus:outline-none p-1`}/>
                         <input ref={experInput} type="number" placeholder="الخبرة (بالسنوات)" className={`${(userStatus === 'F')?'hidden':''} bg-transparent border-b-2 border-gray-400 focus:border-aYellow text-right placeholder-black placeholder-opacity-50 focus:outline-none p-1`}/>
                         <input ref={companyInput} type="text" placeholder="الجهة" className={`${(userStatus === 'T')?'hidden':''} bg-transparent border-b-2 border-gray-400 focus:border-aYellow text-right placeholder-black placeholder-opacity-50 focus:outline-none p-1`}/>
                        <div className="flex justify-center space-x-8">
                            <button onClick={goBack} className="cursor-pointer bg-transparent border-2 border-aYellow text-black w-20 py-1 rounded-l-xl focus:outline-none">السابق</button>
                            <input onClick={(userStatus === 'T')?handleForm2:handleForm2a} type="submit" value="التالي" className="cursor-pointer bg-aYellow text-white w-20 py-1 rounded-r-xl focus:outline-none"/>
                        </div>
                    </div>
        
                    {/* FORM 3 */}
                    <div className={`flex flex-col w-full max-w-15 mx-auto space-y-5 mt-12 mb-6 absolute top-0 transform ${(pageStatus === 3)?'left-1/2 -translate-x-1/2 opacity-100':'left-full -translate-x-0 opacity-0'} -translate-y-0 transition-all duration-1000 ease-in-out z-30`}>
                    <img ref={photoHolder1} className="w-24 h-24 mx-auto rounded-full" src={profile} alt=""/>

                        <div className="flex flex-row-reverse space-x-2 space-x-reverse">
                            <p className="text-xs pt-1 opacity-75">:الاسم</p>
                            <p>{nameInput.current.value}</p>
                        </div>
                        <div className="flex flex-row-reverse space-x-2 space-x-reverse">
                            <p className="text-xs pt-1 opacity-75">:الايميل</p>
                            <p>{emailInput.current.value}</p>
                        </div>
                        <hr/>
                        <div className="flex flex-row-reverse space-x-2 space-x-reverse">
                            <p className="text-xs pt-1 opacity-75">:الجوال</p>
                            <p>{phoneInput.current.value}</p>
                        </div>
                        <div className={`${(userStatus === 'F')?'hidden':''} flex flex-row-reverse space-x-2 space-x-reverse`}>
                            <p className="text-xs pt-1 opacity-75">:الموهبة</p>
                            <p>{talentInput.current.value}</p>
                        </div>
                        <div className={`${(userStatus === 'F')?'hidden':''} flex flex-row-reverse space-x-2 space-x-reverse`}>
                            <p className="text-xs pt-1 opacity-75">:الخبرة</p>
                            <p>{experInput.current.value}</p>
                        </div>
                        <div className={`${(userStatus === 'T')?'hidden':''} flex flex-row-reverse space-x-2 space-x-reverse`}>
                            <p className="text-xs pt-1 opacity-75">:الجهة</p>
                            <p>{companyInput.current.value}</p>
                        </div>
                        <div className="flex justify-center space-x-8">
                            <button onClick={goBack} className="cursor-pointer bg-transparent border-2 border-aYellow text-black w-20 py-1 rounded-l-xl focus:outline-none">السابق</button>
                            <input onClick={(userStatus === 'T')?handleForm3:handleForm3a} type="submit" value="تسجيل" className="cursor-pointer bg-aYellow text-white w-20 py-1 rounded-xl focus:outline-none"/>
                        </div>
                    </div>
            </div>

            </div>
        </div>
     );
}
 
export default Register;