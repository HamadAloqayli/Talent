const TalentsFilter = (props) => {

    const {handleAvailable,handleExper,handleName,handleTalent,nameInput,talentInput,experInput,availableInput} = props;

    return ( 
        <>
            <div className="flex md:justify-between max-w-2xl ml-auto flex-col space-y-10 mb-12 -mt-12 md:flex-row-reverse md:space-y-0">
                        <div className="flex justify-between flex-row-reverse space-x-reverse space-x-10 relative z-40 text-sm">
                            <input ref={nameInput} onChange={(e) => handleName(e)} type="text" className="text-right w-1/2 p-1 bg-transparent border-b-2 border-gray-400 focus:border-aYellow focus:outline-none placeholder-black placeholder-opacity-50" placeholder="الاسم"/>
                            
                            <input ref={talentInput} onChange={(e) => handleTalent(e)} type="text" className="text-right w-1/2 p-1 bg-transparent border-b-2 border-gray-400 focus:border-aYellow focus:outline-none placeholder-black placeholder-opacity-50" placeholder="الموهبة"/>
                        </div>
                
                        <div className="flex justify-between flex-row-reverse space-x-reverse space-x-10 relative z-40 text-sm">
                
                                <select ref={experInput} onChange={(e) => handleExper(e)} name="" id="" className="selectItem w-1/2 flipTable bg-transparent border-b-2 p-1 border-gray-400 focus:border-aYellow focus:outline-none text-black text-opacity-50">
                                    <option value="">الخبرة</option>
                                    <option value="fromLow">من الأقل</option>
                                    <option value="fromHigh">من الأعلى</option>
                                </select>
                
                                <select ref={availableInput} onChange={(e) => handleAvailable(e)} name="" id="" className="selectItem w-1/2 flipTable bg-transparent border-b-2 p-1 border-gray-400 focus:border-aYellow focus:outline-none text-black text-opacity-50">
                                    <option value="">الحالة</option>
                                    <option value="true">متاح</option>
                                    <option value="false">غير متاح</option>
                                </select>
                        </div>
            </div>
            </>
     );
}
 
export default TalentsFilter;