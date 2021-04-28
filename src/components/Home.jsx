import {useRef, useState, useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {Link,Redirect} from 'react-router-dom';
import Loading from '../reComponents/Loading';
import profile from '../img/profile.svg';
import StatusToggle from '../reComponents/StatusToggle';

const Home = () => {

    const {auth,firestore,checkState,storage,user,userData,userImage,profileColor,setProfileColor} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    const [userAvailable,setUserAvailable] = useState(false);
    const [totalChats,setTotalChats] = useState(0);
    const [totalActiveChats,setTotalActiveChats] = useState(0);

    
    useEffect(() => {

        checkState(setLoading);
    },[]);

    useEffect(() => {

        if(userData)
        getTotalChats();
    },[userData])

    const getTotalChats = () => {

        if(userData.role === 'F')
        {
            firestore.collection('Rooms').where('company','==',user.uid).onSnapshot((res) => {
            
                setTotalChats(res.docs.length);

                let totalActive = 0;

                res.docs.forEach((doc,index) => {
                    if(doc.data().statusCompany === 1)
                    {
                        totalActive += 1;
                    }
                    setTotalActiveChats(totalActive);
                })
            })
        }
        else
        {
            firestore.collection('Rooms').where('talent','==',user.uid).onSnapshot((res) => {
            
                setTotalChats(res.docs.length);
            })
        }
    }


    if(loading)
    return <Loading />

    if(!user || user && !user.emailVerified)
    return <Redirect to='/' />


    return ( 
        <div className={`bg-gradient-to-br ${(profileColor === 'blue')?'from-aBlue':''} ${(profileColor === 'red')?'from-aRed':''} ${(profileColor === 'yellow')?'from-aYellow':''} ${(profileColor === 'white')?'':''} ${(profileColor === 'mix')?'from-aBlue to-aRed':''} rounded-3xl p-5 grid grid-cols-2 grid-rows-2 w-full max-w-600 gap-4 mt-24 mx-auto`}>

            { (userData.role === 'T') && <div className="homeHolder h-52 w-full mx-auto bg-white rounded-3xl flex flex-col justify-center items-center space-y-4">
                <p className="font-semibold text-lg">الحالة</p>
                <StatusToggle available={userData.available} firestore={firestore} user={user} setUserAvailable={setUserAvailable} />
                <p className="font-semibold text-lg">{(userAvailable)?'متاح':'غير متاح'}</p>
            </div>}

            <div className={`homeHolder h-52 w-full ${(userData.role === 'F')?'col-span-2':''} mx-auto bg-white rounded-3xl flex flex-col justify-center items-center space-y-4`}>
                <img className="w-24 h-24 mx-auto rounded-full" src={(userImage !== '')?userImage:profile} alt=""/>
                <p>{userData.name}</p>
                <p>{(userData.role === 'T')?userData.talent:userData.company}</p>
            </div>
            

            <div className="homeHolder h-52 w-full mx-auto bg-white rounded-3xl col-span-2 flex justify-around items-center text-center">
                <div>
                    <p className="mb-7 font-semibold text-xl">إجمالي المحادثات</p>
                    <p className="text-xl">{totalChats}</p>
                </div>

                <div>
                    <p className="mb-7 font-semibold text-xl">المحادثات الجديدة</p>
                    <p className="text-xl">{totalActiveChats}</p>
                </div>
            </div>
        </div>
     );
}
 
export default Home;