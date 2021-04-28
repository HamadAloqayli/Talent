import { useEffect, useState } from 'react';
import {BsChatDots, BsChatDotsFill} from 'react-icons/bs';
import profile from '../img/profile.svg';
import Loading from '../reComponents/Loading';

 const TalentsTable = (props) => {

    const {talents,talentsImg,modTalents,experFilter,isFilterEmpty,userData,firestore,user} = props;

    const [allTalentsChat,setAllTalentsChat] = useState([]);

    useEffect(() => {

        console.log(talents.length);
        getAllUser2IDs();
    },[]);

    const handleChat = async (user2Id) => {

       await firestore.collection('Rooms').where('talent','==',user2Id).get()
       .then(async res => {
           console.log(res);

           if(res.empty)
           {
            await firestore.collection('Rooms').add({
                company: user.uid,
                talent: user2Id,
                createdAt: Date.now(),
                updatedAt: 0,
                statusTalent: 0,
                statusCompany:0
            })
            .then(res => {console.log(res); window.location.href = '/Chats/'+res.id})
            .catch(res => console.log(res));
           }
           
       })
       .catch(res => console.log(res));

    }

    const getAllUser2IDs = () => {

        if(userData.role === 'F')
        {
             firestore.collection('Rooms').where('company','==',user.uid).get()
            .then(res => {
                
                let talentsChatVar = [];
                res.docs.forEach((item,index) => {

                    talentsChatVar.push(item.data().talent);
                });
                
                setAllTalentsChat(talentsChatVar);
            })
            .catch(res => console.log(res));

        }
    }

    if(!talents)
    return <Loading />

    return (
      <div className="flex flex-col z-40 flipTable">
        <div className="-my-2 overflow-x-auto z-40 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الاسم
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الموهبة
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الخبرة
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      الحالة
                    </th>
                    <th scope="col" className={`relative px-6 py-3 ${(userData.role === 'T')?'hidden':''}`}>
                      <span className="sr-only">للتواصل</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {((!isFilterEmpty)?modTalents:talents).sort((a,b) => {
                            if(experFilter)
                            {
                                if(experFilter === 'fromLow')
                                {
                                    if(a.data().exper > b.data().exper)
                                    return 1;
                                    
                                    else
                                    return -1;
                                }
                                else
                                {
                                    if(a.data().exper > b.data().exper)
                                    return -1;

                                    else
                                    return 1;
                                }
                            }
                            else
                            {
                                if(a.data().updatedAt > b.data().updatedAt)
                                    return -1;
                                else
                                    return 1;
                            }
                        }).map((talent,index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-14 w-14">
                              {console.log(talentsImg[talent.id])}
                            <img className="h-14 w-14 rounded-full" src={(talentsImg[talent.id])?talentsImg[talent.id]:profile} alt="" />
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900 mb-1">{talent.data().name}</div>
                            <div className="text-sm text-gray-500">{talent.data().email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{talent.data().talent}</div>
                        {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{talent.data().exper}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${(talent.data().available)?'bg-green-100 text-green-800':'bg-red-100 text-red-800'}`}>
                        {(talent.data().available)?'متاح':'غير متاح'}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${(userData.role === 'T')?'hidden':''}`}>
                        <span className="text-aYellow cursor-pointer">
                            {!(allTalentsChat.includes(talent.id))?<BsChatDots onClick={() => handleChat(talent.id)} className="w-6 h-6" />:''}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default TalentsTable;