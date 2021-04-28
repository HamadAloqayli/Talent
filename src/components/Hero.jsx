import { useState } from 'react';
import logo from '../img/logo.svg';
import firstHero from '../img/firstHero.svg';
import secondHero from '../img/secondHero.svg';
import thirdHero from '../img/thirdHero.svg';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Hero = () => {

    const [infoBoxStatus,setInfoBoxStatus] = useState(false);

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const toggleBoxInfo = () => {
        
        setInfoBoxStatus(!infoBoxStatus);
    }

    return ( 
        <div className="hero min-h-screen w-full relative">

            <img className="w-64 h-40 rounded-r-3xl md:w-350 md:h-350 lg:w-500 lg:h-500 md:rounded-br-50 md:rounded-tr-none md:mt-0 object-cover mt-10" src={firstHero} alt=""/>

<div className="text-center whitespace-pre font-semibold text-2xl mt-7 md:-mt-52 md:text-3xl xl:text-hero md:ml-96">
                <p className="mb-3 md:mb-5 lg:mb-8">              منصة تجمع بين المبدعين</p>
                <p>والباحث عن المبدعين                          </p>
</div>

<p className="text-center mt-10 md:ml-60 md:mt-16 md:text-xl">تسجيل دخول كـ</p>

<div className="flex justify-center space-x-12 mt-6 md:ml-60 md:mt-8">
        <div className="relative">
                    <div className="contents whiteBox1">
                        <Link to="/Login"><button className="whiteBox border-2 border-aRed py-1 px-2.5 hover:bg-aRed hover:text-white transition duration-200 ease-in-out focus:outline-none">باحث عن مبدع</button></Link>
                    </div>
        </div>
        <div className="relative">
                    <div className="contents whiteBox1">
                    <Link to="/Login"><button className="whiteBox border-2 border-aBlue py-1 px-2.5 hover:bg-aBlue hover:text-white transition duration-200 ease-in-out focus:outline-none">مبدع</button></Link>
                    </div>
        </div>
</div>


<div className={`w-full mt-10 ${(screenHeight > 715 && screenWidth > 640 && Number.isInteger(window.devicePixelRatio))?'contents':'h-48'} ${(!Number.isInteger(window.devicePixelRatio) && screenWidth > 1024)?'h-350':''}`}>
                {(screenWidth >= 768)?<img className="absolute object-cover rounded-tr-50 bottom-0 left-0 md:w-450 md:h-250 lg:w-600 lg:h-300 xl:w-800 xl:h-300" src={secondHero} alt=""/>:''}            
                
                <img className="w-full h-48 object-cover rounded-t-3xl absolute bottom-0 md:w-250 md:h-250 md:right-5 lg:h-300 lg:w-300 lg:right-12 xl:w-350 xl:h-350 xl:right-20" src={thirdHero} alt=""/>
</div>

            <div className={`infoBox overflow-hidden border-t-4 border-gray absolute bottom-0 block w-full md:w-800 md:left-1/2 transform md:-translate-x-1/2 ${(infoBoxStatus)?'h-full':'h-20'} rounded-t-full transition-all duration-700 ease-in-out z-40`}>
                <AiOutlineCloseCircle onClick={toggleBoxInfo} className={`w-10 h-10 absolute bottom-10 left-1/2 -ml-5 filter ${(infoBoxStatus)?'opacity-100':'opacity-0'} transition-all duration-700 ease-in-out cursor-pointer`} />
                <div onClick={toggleBoxInfo} className="flex justify-center items-center space-x-2 pt-3 cursor-pointer">
                    <img className="w-24 h-10 inline-block mb-5" src={logo} alt=""/>
                    <span className="font-semibold text-lg">تعرف أكثر على</span>
                </div>
                
                <p className={`text-right mt-10 w-10/12 mx-auto filter ${(infoBoxStatus)?'opacity-100':'opacity-0'} transition-all duration-700 ease-in-out`}>إذا عندك موهبه ومبدع في شيء معين وودك تشارك في مناسبات أو حفلات، سجل في منصتنا كـ مبدع عشان تكون عندك فرصه لإظهار نفسك للشركات المنظمه وتكون خيار لهم</p>
                <p className={`text-right mt-5 w-10/12 mx-auto filter ${(infoBoxStatus)?'opacity-100':'opacity-0'} transition-all duration-700 ease-in-out`}>أما إذا كنت شركة أو مؤسسة تبحث عن موهوبين سجل كـ باحث عن مبدع، عشان تقدر تطلع على المبدعين في أكثر من مجال</p>

            </div>
        </div>
     );
}
 
export default Hero;