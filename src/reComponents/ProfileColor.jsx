const ProfileColor = (props) => {

    const {profileColor,setProfileColor} = props;

    return ( 
        <div className="flex justify-center items-center space-x-4">
            <div onClick={() => setProfileColor('blue')} className={`w-4 h-4 ${(profileColor === 'blue')?'ring-2':''} bg-aBlue rounded-full border-2 cursor-pointer`}></div>
            <div onClick={() => setProfileColor('red')} className={`w-4 h-4 ${(profileColor === 'red')?'ring-2':''} bg-aRed rounded-full border-2 cursor-pointer`}></div>
            <div onClick={() => setProfileColor('yellow')} className={`w-4 h-4 ${(profileColor === 'yellow')?'ring-2':''} bg-aYellow rounded-full border-2 cursor-pointer`}></div>
            <div onClick={() => setProfileColor('mix')} className={`w-4 h-4 ${(profileColor === 'mix')?'ring-2':''} bg-gradient-to-br from-aBlue to-aRed rounded-full border-2 cursor-pointer`}></div>
            <div onClick={() => setProfileColor('white')} className={`w-4 h-4 ${(profileColor === 'white')?'ring-2':''} bg-white rounded-full border-2 cursor-pointer`}></div>
        </div>
     );
}
 
export default ProfileColor;