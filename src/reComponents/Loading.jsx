import logo from '../img/logo.svg';

const Loading = () => {
    return ( 
        <div className="bg-aGray min-h-screen w-full grid place-items-center absolute top-0 left-0 transform z-40">
                <img className="w-52 h-40 animate-pulse" src={logo} alt=""/>
        </div>
);
}
 
export default Loading;