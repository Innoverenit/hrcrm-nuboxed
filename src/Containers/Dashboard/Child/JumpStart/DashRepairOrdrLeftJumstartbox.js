import React, { useEffect,useState } from "react";
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
import OrdersClosedModal from "./OrdersClosedModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import OrdersOpenDrawer from "./OrdersOpenDrawer";
import CustomerPieChart from "./CustomerPieChart"
import axios from 'axios';
import {base_url2} from "../../../../Config/Auth";


function DashRepairOrdrLeftJumstartbox(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderType, setCurrentOrderType] = useState("");
  const [error, setError] = useState(null);
  const[dashRepairCount, setdashRepairCount] = useState("");

  const [OrderInward, setOrderInward] = useState({});
  const [loading1, setLoading1] = useState(false);

    const fetchOrderInward = async () => {
      try {
        const response = await axios.get(`${base_url2}/phoneOrder/orderInward/${props.userId}/${props.startDate}/${props.endDate}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setOrderInward(response.data);
        setLoading1(false);
      } catch (error) {
        setError(error);
        setLoading1(false);
      }
    };

  const [QcApproved, setQcApproved] = useState({});
  const [loading3, setLoading3] = useState(false);
    const fetchQcApproved = async () => {
      try {
        const response = await axios.get(`${base_url2}/phoneOrder/qcApproved/${props.userId}/${props.startDate}/${props.endDate}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setQcApproved(response.data);
        setLoading3(false);
      } catch (error) {
        setError(error);
        setLoading3(false);
      }
    };

    const [RepairApproved, setRepairApproved] = useState([]);
    const [loading4, setLoading4] = useState(false);

    const fetchRepairApproved = async () => {
      try {
        const response = await axios.get(`${base_url2}/phoneOrder/repairApproved/${props.userId}/${props.startDate}/${props.endDate}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setRepairApproved(response.data);
        setLoading3(false);
      } catch (error) {
        setError(error);
        setLoading3(false);
      }
    };

    const fetchDasRepairCount = async () => {
      try {
        const response = await axios.get(`${base_url2}/dashboard/approveCount/${props.userId}/${props.timeRangeType}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setdashRepairCount(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    "1520",  //  "Order Inward", // 0
     "1521", //  "Estimate Submitted", // 1
      "1522",//   "Qc Approved", // 2
      "1523",//  "Repair Approved"//3
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
    props.getJumpOrderDetail(props.timeRangeType, "Catalog")
    fetchDasRepairCount();
  }, [props.timeRangeType]);
  console.log(props.timeRangeType)

  useEffect(() => {
    if (OrderInward) {
      setModalData(OrderInward);
    }
  }, [OrderInward]);

  useEffect(() => {
    if (props.orderOpenList) {
      setModalData(props.orderOpenList);
    }
  }, [props.orderOpenList]);

  useEffect(() => {
    if (QcApproved) {
      setModalData(QcApproved);
    }
  }, [QcApproved]);

  useEffect(() => {
    if (RepairApproved) {
      setModalData(RepairApproved);
    }
  }, [RepairApproved]);



  const handleClick = (type) => {
    setCurrentOrderType(type);
    setIsModalOpen(true);

    switch(type) {
      case 'Inward':
        fetchOrderInward();
        break;
      case 'Submitted':
        props.getOrderOpenList(props.userId,props.endDate,props.startDate);
        break;
      case 'QcApproved':
        fetchQcApproved();
        break;
      case 'RepairApproved':
        fetchRepairApproved();
        break;
      default:
        break;
    }
  };

  


  return (
    <>
    <div className=" flex flex-col">

      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title= {translatedMenuItems[0]}
            // title="Order Inward"
              jumpstartClick={()=> handleClick("Inward")}
              cursorData={"pointer"}
              value={dashRepairCount.inwardCount}
            isLoading={props.fetchingorderDetails}
            />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title= {translatedMenuItems[1]} 
              // title="Estimate Submitted"
            jumpstartClick={()=> handleClick("Submitted")}
              cursorData={"pointer"}
              // value={dashRepairCount.inwardCount}
            isLoading={props.fetchingorderDetails}
            />
                           </div>
                       </div>
                    
                   </div>  
                    
                <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
                bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title= {translatedMenuItems[2]}
          // title="Qc Approved"
              jumpstartClick={()=> handleClick("QcApproved")}
              cursorData={"pointer"}
              value={dashRepairCount.qcApproveCount}
            isLoading={props.fetchingorderDetails}
            />
                           </div>
                       </div>
                     
                   </div>  
                   
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center text-xs">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                              </div>
                              <JumpStartBox
                             bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                              noProgress
                              title= {translatedMenuItems[3]} 
                            // title="Repair Approved"
                              jumpstartClick={()=> handleClick("RepairApproved")}
                              cursorData={"pointer"}
                              value={dashRepairCount.repairApproveCount}
                            isLoading={props.fetchingorderDetails}
                            />
                          </div>
                      </div>      
                  </div>
          </div>
          
        </div>
        <div className=" mt-1">
        <div class=" font-poppins font-bold text-base ">By Process</div>
        <CustomerPieChart/>
        </div>
      </div>
        {/* <OrdersCancelModal
         selectedLanguage={props.selectedLanguage}
         translateText={props.translateText}
       orderCancelModal={props.orderCancelModal}
       handleOrderCancelModal={props.handleOrderCancelModal}
      /> */}
       <OrdersClosedModal
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}
       orderClosedModal={props.orderClosedModal}
       handleOrderClosedModal={props.handleOrderClosedModal}
      />

{/* <OrdersOpenModal
 selectedLanguage={props.selectedLanguage}
 translateText={props.translateText}
       orderOpenModal={props.orderOpenModal}
       handleOrderOpenModal={props.handleOrderOpenModal}
      /> */}

      <OrdersOpenDrawer
 selectedLanguage={props.selectedLanguage}
 translateText={props.translateText}
 isModalOpen={isModalOpen}
 setIsModalOpen={() => setIsModalOpen(false)}
 modalData={modalData}
 title={currentOrderType}
      />
   
    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  orderinDashboard: dashboard.orderinDashboard,
  orgId: auth.userDetails.organizationId,
  fetchingorderDetails: dashboard.fetchingorderDetails,
  userId: auth.userDetails.userId,
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
)(DashRepairOrdrLeftJumstartbox);
