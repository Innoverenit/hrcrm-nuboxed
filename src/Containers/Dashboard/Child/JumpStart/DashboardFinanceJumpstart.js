import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import {
  getFinaceOrderDetails,
} from "../../DashboardAction";
import FinaceRapairDrawer from "./FinaceRapairDrawer";
import CustomerPieChart from "./CustomerPieChart";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';


function DashboardFinanceJumpstart(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [orderType, setOrderType] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
     props.getFinaceOrderDetails(props.userId,props.timeRangeType)
  }, [props.timeRangeType]);
  console.log(props.timeRangeType)


  useEffect(() => {
    if(props.buttonName==="My View"){
      props.getFinaceOrderDetails(props.userId,props.timeRangeType)

    } else if(props.buttonName==="Enterprise"){
    props.getFinaceOrderDetails(props.orgId,props.timeRangeType)
    }
 }, [props.buttonName,props.orgId,props.userId,props.timeRangeType]);

const openModal = (type) => {
    setOrderType(type);
    setModalVisible(true);
    fetchOrdersData(type, 0); 
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const fetchOrdersData = (type, page) => {
    const fetchOrders = {
      Added: props.getOrdersAddedData,
      Open: props.getOrdersOpenData,
      Closed: props.getRepairDashboardOrderClose,
      Cancelled: props.getRepairDashboardOrderCancelled
    }[type];

    if(props.buttonName==="My View"){
    fetchOrders(props.userId, props.startDate, props.endDate, page)
      .then(data => {
        setOrdersData(data.orders);
        setHasMore(data.hasMore);
      });}
      else if(props.buttonName==="Enterprise") {
        fetchOrders(props.orgId, props.startDate, props.endDate, page)
        .then(data => {
          setOrdersData(data.orders);
          setHasMore(data.hasMore);
        });}
  };


  return (
    <>
      <div class=" flex flex-col" >
        <div class=" flex w-full" >
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><DynamicFeedIcon className="text-white"/></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={translatedMenuItems[0]}
              jumpstartClick={() => openModal("Added")}
              cursorData={"pointer"}
              value={props.finaceOrderinDashboard.totalOrder}
             isLoading={props.fetchingFinaceorderDetails}
            /> 
                         </div>
                     </div>
                     </div>
                
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><DynamicFeedIcon className="text-white"/></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title={translatedMenuItems[1]}
              jumpstartClick={() => openModal("Open")}
              cursorData={"pointer"}
            value={ props.finaceOrderinDashboard.pendingOrder}
            isLoading={props.fetchingFinaceorderDetails}
            />
                           </div>
                       </div>
                    
                   </div>  
                <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494]  rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><DynamicFeedIcon className="text-white"/></div>
                               </div>
                               <JumpStartBox
           bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title={translatedMenuItems[2]}
             
              jumpstartClick={() => openModal("Closed")}
              cursorData={"pointer"}
              value={props.finaceOrderinDashboard.completeOrder}
              isLoading={props.fetchingFinaceorderDetails}
            />
                           </div>
                       </div>
                     
                   </div>  
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center text-xs">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><DynamicFeedIcon className="text-white"/></div>
                              </div>
                              <JumpStartBox
                        bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title={translatedMenuItems[3]}
              jumpstartClick={() => openModal("Cancelled")}
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
        <div class=" font-poppins font-bold text-base ">By Order Value</div>
        <CustomerPieChart/>
        </div>
        <div>
        <div class=" font-poppins font-bold text-base ">By Order Volume</div>
        <CustomerPieChart/>
        </div>
      </div>
      </div>


<FinaceRapairDrawer
        isVisible={modalVisible}
        closeModal={closeModal}
        type={orderType}
        ordersData={ordersData}
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getFinaceOrderDetails,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardFinanceJumpstart);
