import React, { useEffect,useState, lazy } from "react";
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
const StackedClosureChart= lazy(()=>import("../../../Dashboard/StackedClosureChart"));
function DashRepairOrdRightJumstartbox (props) {

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
    "1524",  //  "Order Packed", // 0
     "1525", //  "Order Dispatched", // 1
      "1389",//   "Feedback", // 2

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
      case 'Packed':
        props.getOrderAddedList(props.userId,props.endDate,props.startDate);
        break;
      case 'Dispatched':
        props.getOrderOpenList(props.userId,props.endDate,props.startDate);
        break;
      case 'Feedback':
        props.getOrderClosedList(props.userId,props.endDate,props.startDate);
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
    <div>
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
            //   title= {translatedMenuItems[0]}
            title="Order Packed"
              jumpstartClick={()=> handleClick("Packed")}
              cursorData={"pointer"}
              value={props.orderinDashboard.totalOrder}
            isLoading={props.fetchingorderDetails}
            />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
            //   title= {translatedMenuItems[1]} 
              title="Estimate Submitted"
            jumpstartClick={()=> handleClick("Dispatched")}
              cursorData={"pointer"}
            // value={ props.orderinDashboard.pendingOrder}
            isLoading={props.fetchingorderDetails}
            />
                           </div>
                       </div>
                    
                   </div>  
                    
                <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
                bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
            //   title= {translatedMenuItems[2]}
          title="Feedback"
              jumpstartClick={()=> handleClick("Feedback")}
              cursorData={"pointer"}
            // value={props.orderinDashboard.completeOrder}
            isLoading={props.fetchingorderDetails}
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
)(DashRepairOrdRightJumstartbox );
