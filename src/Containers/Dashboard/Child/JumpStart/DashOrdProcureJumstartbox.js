import React, { useEffect,useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
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
import { BundleLoader } from "../../../../Components/Placeholder";
const StackedClosureChart= lazy(()=>import("../../../Dashboard/StackedClosureChart"));

function DashOrdrProcureJumstartbox(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderType, setCurrentOrderType] = useState("");

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    "1493",  //  "Order Shipped", // 0
    "1494", //  "Order Reached", // 1
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
    // props.getJumpOrderDetail(props.timeRangeType, "Catalog")
  }, [props.timeRangeType]);
  console.log(props.timeRangeType)

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
      case 'Order Shipped':
        // props.getOrderAddedList(props.orgId,props.endDate,props.startDate);
        break;
      case 'Order Reached':
        // props.getOrderOpenList(props.orgId,props.endDate,props.startDate);
        break;
      case 'Payment Reconciled':
        // props.getOrderClosedList(props.orgId,props.endDate,props.startDate);
        break;
      default:
        break;
    }
  };

  
  if (loading) {
    return <div><BundleLoader/></div>;
  } 

  return (
    <>
    <div className=" flex flex-col">
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><DynamicFeedIcon className="text-white"/></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title= {translatedMenuItems[0]}
              jumpstartClick={()=> handleClick("Order Shipped")}
              cursorData={"pointer"}
              value={"0"}
            // isLoading={props.fetchingorderDetails}
            />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><DynamicFeedIcon className="text-white"/></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title= {translatedMenuItems[1]} 
            jumpstartClick={()=> handleClick("Order Reached")}
              cursorData={"pointer"}
            // value={ pendingOrder}
            // isLoading={props.fetchingorderDetails}
            />
                           </div>
                       </div>
                    
                   </div>  
                
          </div>
          
        </div>
        <div class="mt-1">
      <StackedClosureChart />
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
)(DashOrdrProcureJumstartbox);
