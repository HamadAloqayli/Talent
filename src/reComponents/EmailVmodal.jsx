import {TiWarningOutline} from 'react-icons/ti';


const EmailVmodal = (props) => {

  const {setShowEmailVmodal,handleSendEmailV} = props;

    return ( 

<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">


    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>


    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


    <div className="inline-block w-full align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex flex-row-reverse sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">

          <TiWarningOutline className="w-6 h-6 text-red-500" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg text-right mr-2 mt-2 leading-6 font-medium text-gray-900" id="modal-title">
              توثيق الحساب
            </h3>
            <div className="mt-4">
              <p className="text-sm mb-2 text-right text-gray-500">
                  يجب توثيق حسابك لتتمكن من استخدام خدماتنا
              </p>
              <p className="text-xs mb-8 text-right text-gray-400">
                  تم ارسال رسالة التوثيق على ايميلك مسبقا
              </p>
              <p className="text-xs text-right text-black">
              <button onClick={handleSendEmailV}  className="text-red-500 mr-1 focus:outline-none">اضغط هنا</button> لم تصلك رسالة التوثيق ؟
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button onClick={() => setShowEmailVmodal(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
          حسنا
        </button>
        <button onClick={() => setShowEmailVmodal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          الغاء
        </button>
      </div>
    </div>
  </div>
</div>

     );
}
 
export default EmailVmodal;