import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import RepairValuePieChart from "../JumpStart/RepairValuePieChart"
import RepairVolumePieChart from "../JumpStart/RepairVolumePieChart"
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import {
  getFinaceOrderDetails,
  getRepairDashboardOrderAdded,getRepairDashboardOrderOpen,
    getRepairDashboardOrderClose,getRepairDashboardOrderCancelled   
} from "../../DashboardAction";
import FinaceRapairDrawer from "./FinaceRapairDrawer";
import CustomerPieChart from "./CustomerPieChart";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import axios from "axios";
import { base_url2 } from "../../../../Config/Auth";


function DashboardFinanceJumpstart(props) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderType, setCurrentOrderType] = useState("");
  const [modalData, setModalData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Order states
  const [repairOrders, setRepairOrders] = useState({
    Added: [],
    Open: [],
    Closed: [],
    Cancelled: [],
  });
  const [loadingState, setLoadingState] = useState({
    Added: false,
    Open: false,
    Closed: false,
    Cancelled: false,
  });
  const [errorState, setErrorState] = useState({
    Added: null,
    Open: null,
    Closed: null,
    Cancelled: null,
  });
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    "1229",  //  ""Orders Added" // 0
     "1230", // "Orders Open" // 1
        "1231",    // "Orders Closed"
        "1232",    // "Orders  Cancelled"
        // "",    // By Order Value
        // "",    // By Order Volume
        "1596",    // By Order Value 4
        "1597",    // By Order Volume 5

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
    props.getFinaceOrderDetails(
      props.buttonName === "My View" ? props.userId : props.orgId,
      props.timeRangeType,"repair"
    );
  }, [props.buttonName, props.orgId, props.userId, props.timeRangeType]);



// const openModal = (type) => {
//     setOrderType(type);
//     setModalVisible(true);
//     // fetchOrdersData(type, 0); 
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

  // const fetchOrdersData = (type, page) => {
  //   const fetchOrders = {
  //     Added: props.getRepairDashboardOrderAdded,
  //     Open: props.getRepairDashboardOrderOpen,
  //     Closed: props.getRepairDashboardOrderClose,
  //     Cancelled: props.getRepairDashboardOrderCancelled
  //   }[type];

  //   if (typeof fetchOrders !== 'function') {
  //     console.error('Invalid fetchOrders type:', type);
  //     return; 
  //   }

  //   if(props.buttonName==="My View"){
  //   fetchOrders(props.orgId, props.endDate,props.startDate,page)
  //     .then(data => {
  //       setOrdersData(data.orders);
  //       setHasMore(data.hasMore);
  //     });}
  //     else if(props.buttonName==="Enterprise") {
  //       fetchOrders(props.orgId, props.endDate,props.startDate,page)
  //       .then(data => {
  //         setOrdersData(data.orders);
  //         setHasMore(data.hasMore);
  //       });}
  // };
  const fetchRepairOrders = async (type, url) => {
    setLoadingState((prev) => ({ ...prev, [type]: true }));
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
        },
      });
      setRepairOrders((prev) => ({ ...prev, [type]: response.data }));
      setModalData(response.data);
    } catch (error) {
      setErrorState((prev) => ({ ...prev, [type]: error }));
    } finally {
      setLoadingState((prev) => ({ ...prev, [type]: false }));
    }
  };

  const [RepairOrderAdded, setRepairOrderAdded] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [error1,setError1]=useState(null);

    const fetchRepairOrderAdded= async () => {
      try {
        const response = await axios.get(`${base_url2}/dashboard/allOrder/${props.orgId}/${props.startDate}/${props.endDate}/0`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setRepairOrderAdded(response.data);
        setLoading1(false);
      } catch (error) {
        setError1(error);
        setLoading1(false);
      }
    };

    const [RepairOrderOpen, setRepairOrderOpen] = useState([]);
    const [loading2, setLoading2] = useState(false);
    const [error2,setError2]=useState(null);
  
      const fetchRepairOrderOpen= async () => {
        try {
          const response = await axios.get(`${base_url2}/dashboard/inCompleteOrders/${props.orgId}/${props.startDate}/${props.endDate}/0`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setRepairOrderOpen(response.data);
          setLoading2(false);
        } catch (error) {
          setError2(error);
          setLoading2(false);
        }
      };

      const [RepairOrderClosed, setRepairOrderClosed] = useState([]);
      const [loading3, setLoading3] = useState(false);
      const [error3,setError3]=useState(null);
    
        const fetchRepairOrderClosed= async () => {
          try {
            const response = await axios.get(`${base_url2}/dashboard/completeOrders/${props.orgId}/${props.startDate}/${props.endDate}/0`,{
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
              },
            });
            setRepairOrderClosed(response.data);
            setLoading3(false);
          } catch (error) {
            setError3(error);
            setLoading3(false);
          }
        };
        const [RepairOrderCancelled, setRepairOrderCancelled] = useState({});
        const [loading4, setLoading4] = useState(false);
        const [error4,setError4]=useState(null);
      
          const fetchRepairOrderCancelled= async () => {
            try {
              const response = await axios.get(`${base_url2}/dashboard/allDeletelOrder/${props.orgId}/${props.startDate}/${props.endDate}/0`,{
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                },
              });
              setRepairOrderCancelled(response.data);
              setLoading4(false);
            } catch (error) {
              setError4(error);
              setLoading4(false);
            }
          };

  // useEffect(() => {
  //   if (RepairOrderAdded) {
  //     setModalData(RepairOrderAdded);
  //   }
  // }, [RepairOrderAdded]);

  // useEffect(() => {
  //   if (RepairOrderOpen) {
  //     setModalData(RepairOrderOpen);
  //   }
  // }, [RepairOrderOpen]);

  // useEffect(() => {
  //   if (RepairOrderClosed) {
  //     setModalData(RepairOrderClosed);
  //   }
  // }, [RepairOrderClosed]);

  // useEffect(() => {
  //   if (RepairOrderCancelled) {
  //     setModalData(RepairOrderCancelled);
  //   }
  // }, [RepairOrderCancelled]);

  
  const handleClick = (type) => {
    setCurrentOrderType(type);
    setIsModalOpen(true);

    const baseURL = `${base_url2}/dashboard`;
    const urlMap = {
      Added: `${baseURL}/allOrder/${props.orgId}/${props.startDate}/${props.endDate}/0`,
      Open: `${baseURL}/inCompleteOrders/${props.orgId}/${props.startDate}/${props.endDate}/0`,
      Closed: `${baseURL}/completeOrders/${props.orgId}/${props.startDate}/${props.endDate}/0`,
      Cancelled: `${baseURL}/allDeletelOrder/${props.orgId}/${props.startDate}/${props.endDate}/0`,
    };

    fetchRepairOrders(type, urlMap[type]);
  };


  return (
    <>
      <div class=" flex flex-col" >
        <div class=" flex w-full" >
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2 bg-green-600"><DynamicFeedIcon className="text-white"/></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={translatedMenuItems[0]}
              jumpstartClick={() => handleClick("Added")}
              cursorData={"pointer"}
              value={props.finaceOrderinDashboard.totalOrder}
             isLoading={props.fetchingFinaceorderDetails}
            /> 
                         </div>
                     </div>
                     </div>
                
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-1">
                                   <div class="rounded-full p-2 bg-pink-600"><DynamicFeedIcon className="text-white"/></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title={translatedMenuItems[1]}
              jumpstartClick={() => handleClick("Open")}
              cursorData={"pointer"}
            value={ props.finaceOrderinDashboard.pendingOrder}
            isLoading={props.fetchingFinaceorderDetails}
            />
                           </div>
                       </div>
                    
                   </div>  
                <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494]  rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-1">
                                   <div class="rounded-full p-2 bg-yellow-600"><DynamicFeedIcon className="text-white"/></div>
                               </div>
                               <JumpStartBox
           bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title={translatedMenuItems[2]}
             
              jumpstartClick={() => handleClick("Closed")}
              cursorData={"pointer"}
              value={props.finaceOrderinDashboard.completeOrder}
              isLoading={props.fetchingFinaceorderDetails}
            />
                           </div>
                       </div>
                     
                   </div>  
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center text-xs">
                              <div class="flex-shrink pr-1">
                                  <div class="rounded-full p-2 bg-blue-600"><DynamicFeedIcon className="text-white"/></div>
                              </div>
                              <JumpStartBox
                        bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title={translatedMenuItems[3]}
              jumpstartClick={() => handleClick("Cancelled")}
              cursorData={"pointer"}
              value={props.finaceOrderinDashboard.cancelOrder}
              isLoading={props.fetchingFinaceorderDetails}
            />
                          </div>
                      </div>
                     
                  </div>
            
        </div>

        <div class=" mt-1 flex flex-row justify-between" >
        <div>
        <div class=" font-poppins font-bold text-base ">{translatedMenuItems[4]}</div>
        <RepairValuePieChart/>
        </div>
        <div>
        <div class=" font-poppins font-bold text-base ">{translatedMenuItems[5]}</div>
        <RepairVolumePieChart/>
        </div>
      </div>
      </div>


      <FinaceRapairDrawer
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
          isModalOpen={isModalOpen}
          setIsModalOpen={() => setIsModalOpen(false)}
          modalData={modalData}
          title={currentOrderType}
          hasMore={hasMore}
          setHasMore={setHasMore}
          buttonName={props.buttonName}
        />
    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  orderinDashboard: dashboard.orderinDashboard,
  orgId: auth.userDetails.organizationId,
  fetchingJumpOrderCount: dashboard.fetchingJumpOrderCount,
  userId: auth.userDetails.userId,
  finaceOrderinDashboard: dashboard.finaceOrderinDashboard,
  fetchingFinaceorderDetails: dashboard.fetchingFinaceorderDetails,
  timeRangeType: dashboard.timeRangeType,
  repairDashboardOrderAdded:dashboard.repairDashboardOrderAdded,
  repairDashboardOrderOpen:dashboard.repairDashboardOrderOpen,
  repairDashboardOrderCancelled:dashboard.repairDashboardOrderCancelled,
  repairDashboardOrderClose:dashboard.repairDashboardOrderClose,
  startDate: dashboard.startDate,
  endDate:dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getFinaceOrderDetails,
      getRepairDashboardOrderAdded,getRepairDashboardOrderOpen,
    getRepairDashboardOrderClose,getRepairDashboardOrderCancelled
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardFinanceJumpstart);
