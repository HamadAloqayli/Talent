const RegisterPaginate = (props) => {

    const {pageStatus} = props;

    return ( 
        <div className='rPaginate w-full max-w-15 flex justify-between items-center mx-auto mt-12'>
            <div className={`w-6 h-6 text-white ${(pageStatus >= 1)?'bg-aYellow':'bg-gray-400'} transition-all duration-1000 ease-in-out rounded-full grid place-items-center`}>1</div>

            <div className={`w-24 h-0.5 ${(pageStatus >= 2)?'bg-aYellow':'bg-gray-400'} transition-all duration-1000 ease-in-out`}></div>

            <div className={`w-6 h-6 text-white ${(pageStatus >= 2)?'bg-aYellow':'bg-gray-400'} transition-all duration-1000 ease-in-out rounded-full grid place-items-center`}>2</div>

            <div className={`w-24 h-0.5 ${(pageStatus >= 3)?'bg-aYellow':'bg-gray-400'} transition-all duration-1000 ease-in-out`}></div>

            <div className={`w-6 h-6 text-white ${(pageStatus >= 3)?'bg-aYellow':'bg-gray-400'} transition-all duration-1000 ease-in-out rounded-full grid place-items-center`}>3</div>
        </div>
     );
}
 
export default RegisterPaginate;