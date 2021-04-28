import {useRef, useState, useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {Link,Redirect} from 'react-router-dom';
import Loading from '../reComponents/Loading';
import profile from '../img/profile.svg';
import StatusToggle from '../reComponents/StatusToggle';
import {BiMailSend} from 'react-icons/bi';
import RegisterModal from '../reComponents/RegisterModal';
import {FiEdit} from 'react-icons/fi';
import {MdDone} from 'react-icons/md';
import {TiWarningOutline} from 'react-icons/ti';
import ProfileColor from '../reComponents/ProfileColor';

const Profile = () => {

    const {auth,firestore,checkState,storage,user,userData,userImage,profileColor,setProfileColor} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    const [userAvailable,setUserAvailable] = useState(false);

    const [message,setMessage] = useState('');
    const [errMessage,setErrMessage] = useState('');
    const [sucMessage,setSucMessage] = useState('');
    const [showResetModal,setShowResetModal] = useState(false);
    const [editProfile,setEditProfile] = useState(false);

    const nameInput = useRef('');
    const talentInput = useRef('');
    const experInput = useRef('');
    const phoneInput = useRef('');
    const companyInput = useRef('');
    const photoInput = useRef('');
    const photoHolder = useRef('');


    useEffect(() => {

        checkState(setLoading)
    },[]);

    const handleResetPassword = async () => {

       await auth.sendPasswordResetEmail(userData.email).then((res) => {
            
            console.log(res);
            setMessage('تم إرسال رسالة تعيين كلمة المرور على ايميلك');
          }).catch((error) => {
            
            console.log(error);
            setMessage('حدث خطأ وقت الإرسال');
          });

          setShowResetModal(false);
    }

    const handleEditProfile = () => {

        let nameVal = nameInput.current.value.trim();
        let talentVal = (userData.role === 'T')?talentInput.current.value.trim():'';
        let experVal = (userData.role === 'T')?experInput.current.value.trim():'';
        let phoneVal = phoneInput.current.value.trim();
        let companyVal = (userData.role === 'F')?companyInput.current.value.trim():'';
        
        if(userData.role === 'T')
        {
            if(nameVal === '' || talentVal === '' || experVal === '' || phoneVal === '')
            {
                console.log('fill the blanks first');
                setErrMessage('يوجد حقول غير مكتملة');
            }
            else
            {
                firestore.collection('Users').doc(user.uid).update({
                    name: nameVal,
                    talent: talentVal,
                    exper: experVal,
                    phone: phoneVal
                })
                .then(res => {
                    setSucMessage('تم تعديل البيانات بنجاح')
                    setMessage('');
                    setErrMessage('');
                    window.location.reload();
                })  
                .catch(res => setErrMessage('حدث خطأ وقت التعديل'))
            }   
        }
        else
        {
            if(nameVal === '' || companyVal === '' || phoneVal === '')
            {
                console.log('fill the blanks first');
                setErrMessage('يوجد حقول غير مكتملة');
            }
            else
            {
                firestore.collection('Users').doc(user.uid).update({
                    name: nameVal,
                    company: companyVal,
                    phone: phoneVal
                })
                .then(res => {
                    setSucMessage('تم تعديل البيانات بنجاح')
                    setMessage('');
                    setErrMessage('');
                    window.location.reload();
                })  
                .catch(res => setErrMessage('حدث خطأ وقت التعديل'))
            } 
        }

        if(photoInput.current.files[0])
        {
            const photoVal = photoInput.current.files[0];

            const storageRef = storage.ref('Profile/'+user.uid);

            storageRef.put(photoVal)
            .then(res => console.log(res))
            .catch(res => console.log(res))
        }
     }
     const handlePhoto = () => {

        let photoVal = photoInput.current;

        console.log(photoVal.files[0]);

        if(photoVal.files[0])
        {
            photoHolder.current.src = URL.createObjectURL(photoVal.files[0]);
        }
    }

    if(loading)
    return <Loading />

    if(!user || user && !user.emailVerified)
    return <Redirect to='/' />

    return ( 
        <div className="w-full max-w-600 gap-4 mt-0 mx-auto">
            <div className="flex flex-row-reverse justify-center items-center mb-6 space-x-2 space-x-reverse">
                {message && <BiMailSend className="w-6 h-6 text-green-400" />}
                {message && <p>{message}</p>}
            </div>

            <div className="flex flex-row-reverse justify-center items-center mb-6 space-x-2 space-x-reverse">
                {errMessage && <TiWarningOutline className="w-6 h-6 text-red-400" />}
                {errMessage && <p>{errMessage}</p>}
            </div>

            <div className="flex flex-row-reverse justify-center items-center mb-6 space-x-2 space-x-reverse">
                {sucMessage && <MdDone className="w-6 h-6 text-green-400" />}
                {sucMessage && <p>{sucMessage}</p>}
            </div>
             
            {showResetModal && <RegisterModal handleResetPassword={handleResetPassword} setShowResetModal={setShowResetModal} /> }

<div className={`bg-gradient-to-br ${(profileColor === 'blue')?'from-aBlue':''} ${(profileColor === 'red')?'from-aRed':''} ${(profileColor === 'yellow')?'from-aYellow':''} ${(profileColor === 'white')?'':''} ${(profileColor === 'mix')?'from-aBlue to-aRed':''} rounded-3xl p-5`}>

            <div className="homeHolder h-full py-6 w-full mx-auto bg-white rounded-3xl flex flex-col justify-center items-center space-y-6">
            
            <ProfileColor profileColor={profileColor} setProfileColor={setProfileColor} />

                <img ref={photoHolder} className="w-24 h-24 mx-auto rounded-full" src={(userImage !== '')?userImage:profile} alt=""/>
                {editProfile && <input onChange={handlePhoto} ref={photoInput} type="file" className="mx-auto" /> }
<div className="flex flex-row-reverse space-x-reverse space-x-2 items-center">
                    <p className="text-xs">:الاسم</p>

                    {(!editProfile)
                    ?<p className="font-medium">{userData.name}</p>
                    :<input ref={nameInput} className="font-medium bg-gray-200 text-right pr-2" defaultValue={userData.name} />}
                    
</div>       
<div className="flex flex-row-reverse space-x-reverse space-x-2 items-center">
            {(userData.role === 'T')?<p className="text-xs">:الموهبة</p>:<p className="text-xs">:الجهة</p>}
            
            {(!editProfile)
            ?<p className="font-medium">{(userData.role === 'T')?userData.talent:userData.company}</p>
            :(userData.role === 'T')
            ?<input ref={talentInput} className="font-medium bg-gray-200 text-right pr-2" defaultValue={userData.talent} />
            :<input ref={companyInput} className="font-medium bg-gray-200 text-right pr-2" defaultValue={userData.company} />}
                

</div>
{ (userData.role === 'T') && <div className="flex flex-row-reverse space-x-reverse space-x-2 items-center">
                <p className="text-xs">:الخبرة</p>

                {(!editProfile)
                ?<p className="font-medium">{(userData.role === 'T')?userData.exper:''}</p>
                :<input ref={experInput} className="font-medium bg-gray-200 text-right pr-2" defaultValue={userData.exper} />}
                
</div>}
<div className="flex flex-row-reverse space-x-reverse space-x-2 items-center">
                <p className="text-xs">:الجوال</p>

                {(!editProfile)
                ?<p className="font-medium">{userData.phone}</p>
                :<input ref={phoneInput} className="font-medium bg-gray-200 text-right pr-2" defaultValue={userData.phone} />}
</div>

<div className="flex justify-center items-center space-x-2 cursor-pointer" onClick={() => setEditProfile(!editProfile)}>
                             <p>تعديل</p> <FiEdit className={`${(editProfile)?'text-aYellow':'text-gray-400'}`} />
    
</div>            
                   {editProfile && <button onClick={handleEditProfile} className="bg-aYellow rounded py-1 px-3 text-white">حفظ</button> }

                <hr className="h-0 w-full"/>
                <p>{userData.email}</p>
                <button onClick={() => setShowResetModal(true)} className="bg-aRed rounded-lg text-white py-1 px-2 text-xs focus:outline-none">إعادة تعيين كلمة المرور</button>
            </div>

            </div>
            
        </div>
     );
}
 
export default Profile;