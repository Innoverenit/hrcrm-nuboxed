import React, { useState } from "react";
function CustomerDeletecard(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchMenuTranslations = async () => {
  //     try {
  //       setLoading(true); 
  //       const itemsToTranslate = [

  //  "110", // 'Name', // 0
  //  "378",// 'Work', // 1
  //  "278",// 'Sector', // 2
  //  "279",// 'Source', // 3
  //  "213",// 'Quotation', // 4
  //  "328",// 'PipeLine', // 5
  //  "76",// 'Assigned', // 6 
  //  "248",// 'Customer', // 7
  //   "100",   // new 8
  //   "1300" , //  Change status to Customer?"9
  //   "213" ,  // "Opportunity"10
  //   "392" ,  // Pulse 11
  //   "316" ,  // "Notes"12
  //   "170" ,  // "Edit" 13
  //  "73", // Contact 14
  //  "144" ,//In Progress 15
  //  "387",//  Convert 16
  //  "389",//   Converted 17
  //  "1581" //Score 18
  //       ];

  //       const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
  //       setTranslatedMenuItems(translations);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.error('Error translating menu items:', error);
  //     }
  //   };

  //   fetchMenuTranslations();
  // }, [props.selectedLanguage]);
  return (
    <>
      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-bold sticky z-10">
            <div class=" flex justify-between font-poppins w-[89%]">
            <div className="font-poppins font-bold text-xs w-[15.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.7rem] max-lg:w-[9.31rem]">
            {/* {translatedMenuItems[0]} */}
           name
            </div>
            <div className="font-poppins  font-bold text-xs  w-[8.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.5rem] max-lg:w-[3.32rem] ">
            {/* {translatedMenuItems[1]} */}
             work
            </div>
            <div className="font-poppins font-bold text-xs  w-[9.63rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.33rem]">
            {/* {translatedMenuItems[2]} */}
              "Sector"
          
            </div>
            <div className="font-poppins font-bold text-xs  w-[12.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.12rem] max-lg:w-[2.34rem]">
            {/* {translatedMenuItems[3]} */}
             {/* "Source" */}
         
            </div>         
            <div className="font-poppins font-bold text-xs w-[6.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.1rem] max-lg:w-[3.36rem]">
            {/* {translatedMenuItems[4]} */}
              Quotation
     
            </div>
            <div className="font-poppins font-bold text-xs  w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.8rem] max-lg:w-[1.8rem]">
            {translatedMenuItems[5]}
             Pipeline
            </div>   
          
            <div className="font-poppins font-bold text-xs w-[7.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            Score
            {/* {translatedMenuItems[18]} */}
            </div>
            
            <div className="font-poppins font-bold text-xs w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
            {/* {translatedMenuItems[6]} */}
            Assigned
            </div>          
            <div className="font-poppins font-bold text-xs w-[7.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.81rem]">
            {/* {translatedMenuItems[7]} */}
              Customer        
            </div>       
            </div>
          </div>
          return (
            <div>  {/* Data Row */}
                  <div
                className="flex rounded justify-between  bg-white mt-1 items-center  w-[100%] py-ygap  max-sm:rounded-lg  max-xl:text-[0.65rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500   max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                    <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                    <div className=" flex  w-[13rem] border-l-2 border-green-500 h-8 bg-[#eef2f9] max-xl:w-[8rem] max-lg:w-[6rem]   max-sm:w-auto">
                      pipeline
                       </div>
                        </div>
                      </div>
                      </div>                
          )
        </div>     
 </div>
    </>
  );
  }
export default CustomerDeletecard;