import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Select,Checkbox } from "antd";
import dayjs from "dayjs";
import {getNewArrivalList,
  deleteNewArrival,
} from "./SuppliesAction";
import { BundleLoader } from "../../../Components/Placeholder";


const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function NewArrivalListData(props) {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [         
            "110",//0 Name
       
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
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
    props.getNewArrivalList(props.orgId);

  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }
  const {
    newArrivalDataList,
    deleteNewArrival,
  } = props;
  console.log("ee");
 
  if (loading) {
    return <div><BundleLoader/></div>;
  }
 // const packingNumbers = newArrivalDataList.map(item => item.newArrivals);

  return (
    <>

  <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  max-sm:w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex justify-between max-sm:hidden  w-[89%]  p-1 bg-transparent font-bold text-xs font-poppins sticky  z-10">
          <div className="w-2">Date</div>
        
          <div className="w-12">Item</div>
          <div className="w-20">Contact #</div>
      </div>
   <div className=" overflow-y-auto h-[74vh]">
        { newArrivalDataList.map((item,index) =>  {
       const date = dayjs(item.creationDate).format("DD/MM/YYYY");
       const customlist = item.contacts
       return (
                     
                      <div>
                          <div 
            className="flex rounded justify-between  bg-white mt-1  items-center  max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[10rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]" 
          >
                                   <div class="flex max-sm:justify-between h-8 max-sm:w-wk max-sm:items-center">
                                   <div className=" flex items-center w-[32rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                
                                 {date}
                              </div>
                              <div className=" flex items-center w-[27rem] max-xl:w-[5.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                
                                {item.itmCnt}
                             </div>
                             <div className="flex  items-center max-xl:w-[5.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between">
    
            {/* {customlist.map((contact, idx) => (
                <tr key={idx}>
                   {idx}
                </tr>
            ))} */}
        
</div>
                              </div>
                             
                          </div>
                      </div>
                    
                       )
                  
                })}
                </div>

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
  newArrivalDataList:supplies.newArrivalDataList,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNewArrivalList,
      deleteNewArrival,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(NewArrivalListData);
