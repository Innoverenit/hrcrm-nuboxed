import React , {useEffect, useState} from "react";

function EventAllcardList (props) {

    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          setLoading(true); 
          const itemsToTranslate = [
          "71",  // "Type",//0
          "72" , // "Subject",//1
           "158", // "Start",//2
           "111", // "End",//3
          "75" , // "Include",//4
            "76",// "Assigned",//5
           "77", //  "Owner",//6
             "170",   //  Edit
             "84" ,  //  Delete
           "1259" //  Do you want to delete?
  
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);
    return(
        <>
         <div className=' flex  sticky  z-auto'>
      <div class="rounded  justify-between m-1  max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
   
         <div className=" flex  w-[100%]  max-sm:hidden p-1 bg-transparent font-bold sticky  z-10">
          <div className=" flex justify-between text-xs font-poppins w-[93%]">
        <div className="flex justify-center w-[9.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.2rem]">
        {/* Type */} {translatedMenuItems[0]}
                </div>
        <div className="flex justify-center w-[13.23rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[13.23rem]">
      {/* Subject */}  {translatedMenuItems[1]}
                </div>
        <div className="flex justify-center w-[9.25rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.25rem] ">
      {/* Start */} {translatedMenuItems[2]}
                </div>
        <div className="flex  w-[11.13rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.13rem] max-lg:w-[11.13rem] ">
       {/* End */} {translatedMenuItems[3]}
                </div>
     
        <div className="flex justify-center w-[6.32rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.32rem] max-lg:w-[4.32rem]">
       {/* Include */} {translatedMenuItems[4]}
                </div>
     
        <div className=" flex justify-center w-[8.15rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.15rem]">
       {/* Assigned */} {translatedMenuItems[5]}
                </div>
        <div className=" flex justify-center w-24 max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[22.01rem] max-lg:w-[23.01rem]">
  {/* Owner */} {translatedMenuItems[6]}
                </div>
                
                </div>
      </div>

      </div>
      </div>
        </>
    );
}

export default EventAllcardList;