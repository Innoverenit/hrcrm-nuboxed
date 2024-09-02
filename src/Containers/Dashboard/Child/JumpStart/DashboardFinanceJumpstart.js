import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import {
  getFinaceOrderDetails,
} from "../../DashboardAction";
import FinaceRapairDrawer from "./FinaceRapairDrawer";

function DashboardFinanceJumpstart(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [orderType, setOrderType] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

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

    fetchOrders(props.userId, props.startDate, props.endDate, page)
      .then(data => {
        setOrdersData(data.orders);
        setHasMore(data.hasMore);
      });
  };
  
  return (
    <>
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
              title="Orders Added"
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
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title="Orders Open"
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
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
           bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title="Orders Closed"
             
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
                          <div class="flex flex-row items-center">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                              </div>
                              <JumpStartBox
                        bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title="Orders  Cancelled"
              jumpstartClick={() => openModal("Cancelled")}
              cursorData={"pointer"}
              value={props.finaceOrderinDashboard.cancelOrder}
              isLoading={props.fetchingFinaceorderDetails}
            />
                          </div>
                      </div>
                     
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
