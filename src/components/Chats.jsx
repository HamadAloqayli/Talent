import {useRef, useState, useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {Link,Redirect} from 'react-router-dom';
import Loading from '../reComponents/Loading';
import profile from '../img/profile.svg';
import StatusToggle from '../reComponents/StatusToggle';
import TalentsTable from '../reComponents/TalentsTable';
import TalentsFilter from '../reComponents/TalentsFilter';
import RoomsTable from '../reComponents/RoomsTable';

const Chats = () => {

    const {auth,firestore,checkState,storage,user,userData,userImage,profileColor,setProfileColor} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);

    const [rooms,setRooms] = useState([]);
    const [allUsers,setAllUsers] = useState(null);
    const [allUsersImg,setAllUsersImg] = useState([]);    
    
    useEffect(() => {

        checkState(setLoading)
    },[]);

    useEffect(() => {
        
        if(userData)
        getAllRooms();
    },[userData]);

    const getAllRooms = async () => {

        let allUsersFound = [];
        let imagesHolder = [];

        if(userData.role === 'F')
        {
           await firestore.collection('Rooms').where('company','==',user.uid).get()
            .then( async res => {
                console.log(res.docs);
                setRooms(res.docs);

                for(let i = 0; i < res.docs.length; i++)
                {
                   await firestore.collection('Users').doc(res.docs[i].data().talent).get()
                    .then( async res => {
                        console.log(res);
                        allUsersFound[res.id] = res.data();

                        let storageRef = storage.ref('Profile/'+res.id);
                        await storageRef.getDownloadURL()
                         .then(url => {console.log(url); imagesHolder[res.id] = url})
                         .catch(err => {console.log(err); });
                    })
                    .catch(res => console.log(res));
                }

            })
            .catch(res => console.log(res));

            setAllUsers(allUsersFound);
            setAllUsersImg(imagesHolder);
        }
        else
        {
            await firestore.collection('Rooms').where('talent','==',user.uid).get()
            .then( async res => {
                console.log(res.docs);
                setRooms(res.docs);

                for(let i = 0; i < res.docs.length; i++)
                {
                   await firestore.collection('Users').doc(res.docs[i].data().company).get()
                    .then( async res => {
                        console.log(res);
                        allUsersFound[res.id] = res.data();

                        let storageRef = storage.ref('Profile/'+res.id);
                        await storageRef.getDownloadURL()
                         .then(url => {console.log(url); imagesHolder[res.id] = url})
                         .catch(err => {console.log(err); });
                    })
                    .catch(res => console.log(res));
                }

            })
            .catch(res => console.log(res));

            setAllUsers(allUsersFound);
            setAllUsersImg(imagesHolder);
        }
    }


    if(loading)
    return <Loading />

    if(!user || user && !user.emailVerified)
    return <Redirect to='/' />


    return ( 
        <div className={`rounded-3xl p-5 container w-full mt-24 mx-auto`}>

            <div className="homeHolder h-full w-full mx-auto bg-white rounded-3xl flex flex-col justify-center items-center space-y-4">


            </div>

                <div className="container p-0 sm:px-24 sm:py-6 ">

                        <RoomsTable rooms={rooms} allUsers={allUsers} allUsersImg={allUsersImg} userData={userData} />
                    
                </div>

        </div>
     );
}
 
export default Chats;