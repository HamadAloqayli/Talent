const RegisterUser = (props) => {

    const {userStatus,handleUserStatus} = props;
    return ( 
            <div className="flex justify-center space-x-12 text-center mt-6">
                <div className="relative">
                            <div className="contents">
                                <button onClick={() => handleUserStatus('F')} className={`border-2 ${(userStatus === 'F')?'border-aRed':'border-none'} py-1 px-2.5 transition duration-200 ease-in-out focus:outline-none`}>باحث عن مبدع</button>
                            </div>
                </div>
                <div className="relative">
                            <div className="contents">
                                <button onClick={() => handleUserStatus('T')} className={`border-2 ${(userStatus === 'T')?'border-aBlue':'border-none'} py-1 px-2.5 transition duration-200 ease-in-out focus:outline-none`}>مبدع</button>
                            </div>
                </div>
            </div>
     );
}
 
export default RegisterUser;