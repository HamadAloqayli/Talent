import {useRef, useState, useContext, useEffect} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import {Link,Redirect} from 'react-router-dom';
import Loading from '../reComponents/Loading';
import profile from '../img/profile.svg';
import StatusToggle from '../reComponents/StatusToggle';
import TalentsTable from '../reComponents/TalentsTable';
import TalentsFilter from '../reComponents/TalentsFilter';

const Talents = () => {

    const {auth,firestore,checkState,storage,user,userData,userImage,profileColor,setProfileColor} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
    const [userAvailable,setUserAvailable] = useState(false);
    const [experFilter,setExperFilter] = useState('');

    const [talents,setTalents] = useState(null);
    const [modTalents,setModTalents] = useState([]);
    const [talentsImg,setTalentsImg] = useState([]);
    const [isFilterEmpty,setIsFilterEmpty] = useState(true);

    const nameInput = useRef('');
    const talentInput = useRef('');
    const experInput = useRef('');
    const availableInput = useRef('');

    
    useEffect(() => {

        checkState(setLoading)
        getAllTalents();
    },[]);

    useEffect(() => {

        if(nameInput.current !== '')
        if(nameInput.current.value === '' && talentInput.current.value === '' && experInput.current.value === '' && availableInput.current.value === '')
        {
            setIsFilterEmpty(true);
            console.log('empty');
        }
        else
        {
            setIsFilterEmpty(false);
            console.log('not empty');
        }
    },[nameInput.current.value,talentInput.current.value,experInput.current.value,availableInput.current.value]);

    const getAllTalents = async () => {

        let talentsVar = [];

       await firestore.collection('Users').where('role','==','T').get()
        .then(res => {
            
                console.log(res.docs);
                setTalents(res.docs);
                talentsVar = res.docs;            
        })
        .catch(res => console.log(res));

        getAllTalentsImg(talentsVar);
    }

    const getAllTalentsImg = async (talentsVar) => {

        console.log('taaaaalents',talentsVar);
        let imagesHolder = [];

        for(let i = 0; i < talentsVar.length; i++)
        {
            let talentsVarID = talentsVar[i].id;

            let storageRef = storage.ref('Profile/'+talentsVarID);

           await storageRef.getDownloadURL()
             .then(url => {console.log(url); imagesHolder[talentsVarID] = url})
             .catch(err => {console.log(err); });
        }
        setTalentsImg(imagesHolder);
    }

    const handleAvailable = (e) => {

        let neededValue = e.target.value;       
        let newTalents = [];

        talents.forEach((talent,index) => {
            
            if(talent.data().available.toString() === neededValue)
            {
                newTalents.push(talent);
            }
        })

        setModTalents(newTalents);
    }
    const handleExper = (e) => {

        let neededValue = e.target.value;       

        setExperFilter(neededValue);
    }
    const handleName = (e) => {

        let neededValue = e.target.value;       
        let newTalents = [];

        talents.forEach((talent,index) => {
            
            if(talent.data().name.includes(neededValue))
            {
                newTalents.push(talent);
            }
        })

        setModTalents(newTalents);
    }
    const handleTalent = (e) => {

        let neededValue = e.target.value;       
        let newTalents = [];

        talents.forEach((talent,index) => {
            
            if(talent.data().talent.includes(neededValue))
            {
                newTalents.push(talent);
            }
        })

        setModTalents(newTalents);
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
                        <TalentsFilter handleAvailable={handleAvailable} handleExper={handleExper} handleName={handleName} handleTalent={handleTalent} nameInput={nameInput} talentInput={talentInput} experInput={experInput} availableInput={availableInput} />
                        <TalentsTable talents={talents} talentsImg={talentsImg} modTalents={modTalents} experFilter={experFilter} isFilterEmpty={isFilterEmpty} userData={userData} firestore={firestore} user={user} />
                    
                </div>

        </div>
     );
}
 
export default Talents;