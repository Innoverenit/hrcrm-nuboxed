import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getBestBeforeContactList,
} from "./SuppliesAction";
import { BundleLoader } from "../../../Components/Placeholder";
import EmptyPage from "../EmptyPage";


function EmailContactList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [         
            "110",//0 Name
            "254",//Unit
       
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

  useEffect(() => {
    props.getBestBeforeContactList(props.RowData.bstBfrUseId);
  }, []);
 

  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }
  function handleOpen(item) {
    setOpen(item);
  }
  const {
    bestBeforeContactList,
    fetchingBestBeforeContactList
  } = props;
  console.log("ee");
 
//   if (loading) {
//     return <div><BundleLoader/></div>;
//   }
//   const packingNumbers = bestBeforeContactList.map(item => item.newArrivals);
//   console.log(packingNumbers)
  return (
    <>

  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
        <div className=" flex justify-between max-sm:hidden  w-[89%]  p-1 bg-transparent font-bold !text-lm items-end font-poppins sticky  z-10">
          <div className="w-2 truncate max-md:w-2">Name</div>
        
          <div className="w-12 truncate max-md:12">Unit</div>
         
      </div>
       
   
        {!fetchingBestBeforeContactList && bestBeforeContactList.length === 0 ?<EmptyPage />:bestBeforeContactList.map((item,index) =>  {
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
     
         return (
                       
                        <div>
                            <div 
              className="flex rounded justify-between  bg-white mt-1 py-ygap items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[10rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" 
            >
                                     <div class="flex max-sm:justify-between h-8 max-sm:w-wk max-sm:items-center">
                                     <div className=" flex items-center w-[32rem] border-l-2 border-green-500 bg-[#eef2f9] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  
                                     {item.suppliesName}
                                </div>
                                <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] justify-center w-[33rem] max-xl:w-[5.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between "
                               
                                >
                                  
                                  {item.unit}
                               </div>
                               <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] justify-center max-xl:w-[5.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  
                                 
                               </div>
                                </div>
                               
                            </div>
                        </div>
                      
                         )
                  
                })}

    
     </div>
 
 <Suspense fallback={<BundleLoader />}>
    
      </Suspense>
    </>
  );
}

const mapStateToProps = ({
  auth,
  supplies
}) => ({
  userId: auth.userDetails.userId,
  bestBeforeContactList:supplies.bestBeforeContactList,
  orgId: auth.userDetails.organizationId,
  fetchingBestBeforeContactList:supplies.fetchingBestBeforeContactList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBestBeforeContactList,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EmailContactList);
