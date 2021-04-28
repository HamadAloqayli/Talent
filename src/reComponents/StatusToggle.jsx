import { useEffect, useRef } from "react";

const StatusToggle = (props) => {

    const {available,firestore,user,setUserAvailable} = props;

    const statusInput = useRef('')

    useEffect(() => {

        setUserAvailable(available)
    },[]);

    const handleStatus = async () => {
        
        let oldStatus = statusInput.current.checked;

        await firestore.collection('Users').doc(user.uid).update({
            available: !oldStatus,
            updatedAt: Date.now()
        })
        .then(res => {
            console.log(res); 
            statusInput.current.checked = !oldStatus;
            setUserAvailable(!oldStatus)
        })
        .catch(res => console.log(res));

    }

    return ( 
        <div onClick={handleStatus} className="switch">
            <input ref={statusInput} type="checkbox" defaultChecked={available} />
            <span className="slider round"></span>
        </div>
     );
}
 
export default StatusToggle;