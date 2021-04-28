import {useContext, useEffect, useState, useRef} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import profile from '../img/profile.svg';
import {FiLogOut, FiSend} from 'react-icons/fi';
import Loading from '../reComponents/Loading';
import {Redirect} from 'react-router-dom';

const Room = (props) => {

    const {id} = props.match.params;
    const {user,userData,firestore,storage,checkState} = useContext(AuthContext);
    const [loading,setLoading] = useState(true);

    const [roomDetails,setRoomDetails] = useState(null);
    const [userChat,setUserChat] = useState(null);
    const [userChatImg,setUserChatImg] = useState(null);
    const [messages,setMessages] = useState([]);

    const messageContent = useRef('');
    const messageFrame = useRef('');

    useEffect(() => {

        checkState(setLoading);
        resetScroll();
    },[]);

    useEffect(() => {

        if(userData)
        {
            getRoomData();
            getAllMessages();
        }

        resetScroll();
    },[userData]);

    useEffect(() => {

        resetScroll();
    },[messages])

    const getRoomData = async () => {

           await firestore.collection('Rooms').doc(id).onSnapshot((res) => {
                console.log(res.docs);
                let roomDetails = res.data();
                
                console.log(roomDetails);
                console.log(userData.role);
                if(userData.role === 'F')
                {
                    firestore.collection('Users').doc(roomDetails.talent).onSnapshot((res) => {
                        setUserChat(res.data());

                        let storageRef = storage.ref('Profile/'+res.id);
                         storageRef.getDownloadURL()
                         .then(url => {console.log(url); setUserChatImg(url)})
                         .catch(err => {console.log(err); });
                    })
                }
                else
                {
                    firestore.collection('Users').doc(roomDetails.company).onSnapshot((res) => {
                        setUserChat(res.data());

                        let storageRef = storage.ref('Profile/'+res.id);
                        storageRef.getDownloadURL()
                        .then(url => {console.log(url); setUserChatImg(url)})
                        .catch(err => {console.log(err); });
                    })
                }
           })
    }

    const getAllMessages = async () => {

       await firestore.collection('Rooms').doc(id).collection('messages').orderBy('date').onSnapshot((res) => {

            setMessages(res.docs);
            resetScroll();
        })

            if(userData.role === 'F')
            {
                firestore.collection('Rooms').doc(id).update({
    
                    statusCompany: 0
                }).then(res => console.log(res)).catch(res => console.log(res))
            }
            else
            {
                firestore.collection('Rooms').doc(id).update({
    
                    statusTalent: 0
                }).then(res => console.log(res)).catch(res => console.log(res))
            }

            resetScroll();
    }

    const sendMessage = () => {

        let message = messageContent.current.value.trim();
        let ThisRoom = firestore.collection('Rooms').doc(id);
        resetInput();
        resetScroll();

        if(message !== '')
        {
            ThisRoom.collection('messages').add({
                message: message,
                sender: user.uid,
                date: Date.now()
            })
            .then(res => {
                console.log(res);
                ThisRoom.update({
                    updatedAt: Date.now(),
                    statusCompany: ((userData.role === 'F')?0:1),
                    statusTalent: ((userData.role === 'T')?0:1)
                }).then(res => {
                    console.log(res);
                }).catch(res => console.log(res));
            })
            .catch(res => console.log(res));
        }
    }
    const resetInput = () => {

        messageContent.current.value = '';
    }
    const resetScroll = () => {

        if(messageFrame.current)
        messageFrame.current.scrollTop = messageFrame.current.scrollHeight;;
    }

    if(loading || !userChat)
    return <Loading />

    if(!user || user && !user.emailVerified)
    return <Redirect to='/' />

    return ( 
        <div className="mainRoom w-full grid place-items-center">

            <div className="roomFrame w-full max-w-500 min-h-600 rounded-3xl">
                <div className="flex flex-row-reverse justify-start items-center border-b-2 space-x-reverse space-x-6 py-4 px-12">
                    <img src={(userChatImg)?userChatImg:profile} className="w-16 h-16 rounded-full" alt=""/>
                    <div className="flex flex-col justify-center items-end space-y-1">
                        <p className="text-lg">{userChat.name}</p>
                        
                        {(userData.role === 'F')
                        ?<p className="text-sm text-gray-400">{userChat.talent}</p>
                        :<p className="text-sm text-gray-400">{userChat.company}</p>}

                    </div>
                </div>

                <div ref={messageFrame} className={`messageFrame w-full flex flex-col justify-between    rounded-b-3xl relative overflow-y-auto`}>
                    
<div>
                        {messages.map((message,index) => (
                            <div key={index} className={`flex ${(message.data().sender === user.uid)?'justify-end mr-4':'justify-start ml-4'} mt-6 space-x-2`}>
                                <p className={`${(message.data().sender === user.uid)?'bg-aBlue text-white':'bg-gray-200'} rounded-xl text-right px-2.5 py-0.5`}>{message.data().message}</p>
                                <p className="text-xs text-gray-400 my-auto">{new Date(message.data().date).toLocaleDateString()}</p>
                            </div>
                        ))}
</div>


                    <div className="flex roomFrame justify-between px-12 items-center sticky bottom-0 border-t-2 rounded-b-3xl space-x-4 mt-6 h-16 w-full">
                        <textarea ref={messageContent} type="text" className="p-1 rounded w-full text-right resize-none focus:outline-none" placeholder={`تواصل مع ${userChat.name}`}/>
                        <FiSend onClick={sendMessage} className="w-6 h-6 cursor-pointer" />
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default Room;