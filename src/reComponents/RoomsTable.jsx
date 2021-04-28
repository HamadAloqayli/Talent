import {useEffect} from 'react';
import {WiMoonAltNew} from 'react-icons/wi';
import {BsChatDots} from 'react-icons/bs';
import profile from '../img/profile.svg';
import Loading from '../reComponents/Loading';
import {Link} from 'react-router-dom';
import TablePaginate from '../reComponents/TablePaginate';

 const RoomsTable = (props) => {

    const {rooms,allUsers,allUsersImg,userData} = props;

    useEffect(() => {

        console.log('asdfasdfasdf',rooms.length);
    },[]);

    if(!allUsers)
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
                    {(userData.role === 'F')
                    ?<th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الموهبة
                    </th>
                    :<th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الجهة
                  </th>}
                  {(userData.role === 'F')
                    ?<th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الخبرة
                    </th>
                    :<th scope="col" className="px-6 hidden py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الجهة
                  </th>}
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      تاريخ آخر رسالة
                    </th>
                    <th scope="col" className={`relative px-6 py-3`}>
                      <span className="sr-only">تواصل</span>
                    </th>
                    <th scope="col" className={`relative px-6 py-3`}>
                      <span className="sr-only">الحالة</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rooms.sort((a,b) => {

                            if(a.data().updatedAt > b.data().updatedAt)
                                    return -1;
                            else
                                    return 1;
                            
                        }).map((room,index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-14 w-14">

                          { (userData.role === 'F') && <img className="h-14 w-14 rounded-full" src={(allUsersImg[room.data().talent])?allUsersImg[room.data().talent]:profile} alt="" />}
                          { (userData.role === 'T') && <img className="h-14 w-14 rounded-full" src={(allUsersImg[room.data().company])?allUsersImg[room.data().company]:profile} alt="" />}
                          </div>
                          <div className="mr-4">
                            {(userData.role === 'F')
                            ?<div className="text-sm font-medium text-gray-900 mb-1">{allUsers[room.data().talent].name}</div>
                            :<div className="text-sm font-medium text-gray-900 mb-1">{allUsers[room.data().company].name}</div>}

                            {(userData.role === 'F')
                            ?<div className="text-sm font-medium text-gray-900 mb-1">{allUsers[room.data().talent].email}</div>
                            :<div className="text-sm font-medium text-gray-900 mb-1">{allUsers[room.data().company].email}</div>}                          </div>
                        </div>
                      </td>
                      {(userData.role === 'F')
                      ?<td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{allUsers[room.data().talent].talent}</div>
                        {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                      </td>
                      :<td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{allUsers[room.data().company].company}</div>
                      {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                    </td>}
                      { (userData.role === 'F') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{allUsers[room.data().talent].exper}</td>}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                        {(room.data().updatedAt === 0)?'- - -':new Date(room.data().updatedAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium`}>
                        <span className="text-aYellow cursor-pointer">
                        <Link className="contents p-0 m-0" to={`/Chats/${room.id}`}>
                          <BsChatDots className="w-6 h-6" />
                        </Link>
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium`}>
                        <span className="text-aYellow">
                        {(userData.role === 'F')
                        ?(room.data().statusCompany === 1)?<WiMoonAltNew className="w-6 h-6 animate-bounce" />:''
                        :(room.data().statusTalent === 1)?<WiMoonAltNew className="w-6 h-6 animate-bounce" />:''
                        }
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

                        {/* <TablePaginate /> */}

            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default RoomsTable;