import React, { useEffect,useState,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import {
  getJumpOrderCount,
  getJumpOrderDetail,
handleOrderAddedModal,
handleOrderClosedModal,
getOrderAddedList,
getOrderOpenList,
getOrderClosedList,
getOrderCancelList
} from "../../DashboardAction";
import { base_url2 } from "../../../../Config/Auth";
import axios from 'axios';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { BundleLoader } from "../../../../Components/Placeholder";
const StackedClosureChart= lazy(()=>import("../../../Dashboard/StackedClosureChart"));

function DashProcureQuotaJumpstartUser(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderType, setCurrentOrderType] = useState("");
  const [error, setError] = useState(null);
  const [data1, setData1] = useState([]);
  const [loading1, setLoading1] = useState(false);

    const fetchData1 = async () => {
      const status="Created";
      try {
        const response = await axios.get(`${base_url2}/quotation/dashboard/${props.userId}/${status}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setData1(response.data);
        setLoading1(false);
      } catch (error) {
        setError(error);
        setLoading1(false);
      }
    };
    const [data2, setData2] = useState([]);
    const [loading2, setLoading2] = useState(false);
  
      const fetchData2 = async () => {
        const status="Converted";
        try {
          const response = await axios.get(`${base_url2}/quotation/dashboard/${props.userId}/${status}`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setData2(response.data);
          setLoading2(false);
        } catch (error) {
          setError(error);
          setLoading2(false);
        }
      };

      const [data3, setData3] = useState([]);
      const [loading3, setLoading3] = useState(false);
    
        const fetchData3 = async () => {
          const status="Cancelled";
          try {
            const response = await axios.get(`${base_url2}/quotation/dashboard/${props.userId}/${status}`,{
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
              },
            });
            setData3(response.data);
            setLoading3(false);
          } catch (error) {
            setError(error);
            setLoading3(false);
          }
        };

    useEffect(() => {
        fetchData1();
        fetchData2();
        fetchData3();
        fetchjumpstartCount();
    }, [props.userId,props.endDate,props.startDate]);

    const [jumpstartCount, setjumpstartCount] = useState([]);
    const [jumpstartCountloading, setjumpstartCountLoading] = useState(false);
    const [jumpstartCountError,setjumpstartCountError]= useState(null);

      const fetchjumpstartCount = async () => {
        try {
          const response = await axios.get(`${base_url2}/dashboard/quotationCount/${props.userId}/${props.timeRangeType}`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setjumpstartCount(response.data);
          setjumpstartCountLoading(false);
        } catch (error) {
          setError(error);
          setjumpstartCountLoading(false);
        }
      };

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    "1495",  //  "Quotation Created", // 0
     "1496", //  "Quotation Converted", // 1
      "1497",//   "Quotation Cancelled", // 2
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
    if (props.orderAddedList) {
      setModalData(props.orderAddedList);
    }
  }, [props.orderAddedList]);

  useEffect(() => {
    if (props.orderOpenList) {
      setModalData(props.orderOpenList);
    }
  }, [props.orderOpenList]);

  useEffect(() => {
    if (props.orderClosedList) {
      setModalData(props.orderClosedList);
    }
  }, [props.orderClosedList]);

  useEffect(() => {
    if (props.orderCancelList) {
      setModalData(props.orderCancelList);
    }
  }, [props.orderCancelList]);



  const handleClick = (type) => {
    setCurrentOrderType(type);
    setIsModalOpen(true);

    switch(type) {
      case 'Quotation Created':
        // props.getOrderAddedList(props.orgId,props.endDate,props.startDate);
        break;
      case 'Quotation Converted':
        // props.getOrderOpenList(props.orgId,props.endDate,props.startDate);
        break;
      case 'Quotation Cancelled':
        // props.getOrderClosedList(props.orgId,props.endDate,props.startDate);
        break;
      default:
        break;
    }
  };

  

  return (
    <>
    <div className=" flex flex-col">
      <div class=" flex w-full" >
       
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2 bg-green-600"><LightbulbIcon className=" text-white"/></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title= {translatedMenuItems[0]}
              jumpstartClick={()=> handleClick("Quotation Created")}
              cursorData={"pointer"}
              value={jumpstartCount.quotationCount}
            isLoading={jumpstartCountloading}
            />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-1">
                                   <div class="rounded-full p-2 bg-pink-600"><LightbulbIcon className=" text-white"/></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title= {translatedMenuItems[1]} 
            jumpstartClick={()=> handleClick("Open")}
              cursorData={"pointer"}
              value={jumpstartCount.quotationConvert}
              isLoading={jumpstartCountloading}
            />
                           </div>
                       </div>
                    
                   </div>  
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center text-xs">
                              <div class="flex-shrink pr-1">
                                  <div class="rounded-full p-2 bg-blue-600"><LightbulbIcon className=" text-white"/></div>
                              </div>
                              <JumpStartBox
                             bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                              noProgress
                              title= {translatedMenuItems[2]} 
                            
                              jumpstartClick={()=> handleClick("Cancelled")}
                              cursorData={"pointer"}
                              value={jumpstartCount.quotationCancel}
                              isLoading={jumpstartCountloading}
                            />
                          </div>
                      </div>      
                  
          </div>
    
        </div>
        <div class="mt-1">
        <Suspense fallback={<BundleLoader />}> 
      <StackedClosureChart />
      </Suspense>
      </div>
        </div>
  
      {/* <DashProcureQuotaDrawer
 selectedLanguage={props.selectedLanguage}
 translateText={props.translateText}
 isModalOpen={isModalOpen}
 setIsModalOpen={() => setIsModalOpen(false)}
 modalData={modalData}
 title={currentOrderType}
      /> */}
   
    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  orderinDashboard: dashboard.orderinDashboard,
  orgId: auth.userDetails.organizationId,
  fetchingorderDetails: dashboard.fetchingorderDetails,
  userId: auth.userDetails.employeeId,
  orderAddedModal:dashboard.orderAddedModal,
  orderClosedModal:dashboard.orderClosedModal,
  timeRangeType: dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate,
  orderAddedList:dashboard.orderAddedList,
  orderOpenList:dashboard.orderOpenList,
  orderClosedList:dashboard.orderClosedList,
  orderCancelList:dashboard.orderCancelList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpOrderCount,
      getJumpOrderDetail,
      handleOrderAddedModal,
      handleOrderClosedModal,
      getOrderAddedList,
      getOrderOpenList,
      getOrderClosedList,
      getOrderCancelList

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashProcureQuotaJumpstartUser);
