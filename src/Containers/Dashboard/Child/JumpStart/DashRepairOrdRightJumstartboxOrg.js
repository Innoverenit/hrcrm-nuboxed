import React, { useEffect,useState, lazy } from "react";
import { connect } from "react-redux";
import ProcureLineChart from "../ProcureLineChart"
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
import axios from 'axios';
import {base_url2} from "../../../../Config/Auth";

const StackedClosureChart= lazy(()=>import("../../StackedClosureChart"));


function DashRepairOrdRightJumstartboxOrg (props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderType, setCurrentOrderType] = useState("");
  const[dashRepairCount, setdashRepairCount] = useState("");
  const [error, setError] = useState(null);

  const [OrderPacked, setOrderPacked] = useState({});
  const [loading1, setLoading1] = useState(false);

    const fetchOrderPacked = async () => {
      try {
        const response = await axios.get(`${base_url2}/phoneOrder/orderPacked/${props.orgId}/${props.startDate}/${props.endDate}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setOrderPacked(response.data);
        setLoading1(false);
      } catch (error) {
        setError(error);
        setLoading1(false);
      }
    };

    const [OrderDispatched, setOrderDispatched] = useState({});
    const [loading2, setLoading2] = useState(false);
  
    const fetchOrderDispatched= async () => {
      try {
        const response = await axios.get(`${base_url2}/phoneOrder/orderDispatched/${props.orgId}/${props.startDate}/${props.endDate}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setOrderDispatched(response.data);
          setLoading2(false);
        } catch (error) {
          setError(error);
          setLoading2(false);
        }
      };

      const [ordFeedback, setordFeedback] = useState({});
      const [loading3, setLoading3] = useState(false);

        const fetchordFeedback = async () => {
          try {
            const response = await axios.get(`${base_url2}/order/feedback/${props.orgId}`,{
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
              },
            });
            setordFeedback(response.data);
            setLoading3(false);
          } catch (error) {
            setError(error);
            setLoading3(false);
          }
        };

        const fetchDasRepairCount = async () => {
          try {
            const response = await axios.get(`${base_url2}/dashboard/approveCount/${props.orgId}/${props.timeRangeType}`,{
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
    
    
fetchDasRepairCount();

  }, [props.timeRangeType]);
  console.log(props.timeRangeType)

  useEffect(() => {
    if (OrderPacked) {
      setModalData(OrderPacked);
    }
  }, [OrderPacked]);

  useEffect(() => {
    if (OrderDispatched) {
      setModalData(OrderDispatched);
    }
  }, [OrderDispatched]);

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
        fetchOrderPacked();
        break;
      case 'Dispatched':
        fetchOrderDispatched();
        break;
      case 'Feedback':
        props.getOrderClosedList(props.orgId,props.endDate,props.startDate);
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
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title= {translatedMenuItems[0]}
            // title="Order Packed"
              jumpstartClick={()=> handleClick("Packed")}
              cursorData={"pointer"}
              value={dashRepairCount.orderPackedCount}
            isLoading={props.fetchingorderDetails}
            />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-cente text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title= {translatedMenuItems[1]} 
              // title="Estimate Submitted"
            jumpstartClick={()=> handleClick("Dispatched")}
              cursorData={"pointer"}
              value={dashRepairCount.orderDispatchedCount}
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
          // title="Feedback"
              jumpstartClick={()=> handleClick("Feedback")}
              cursorData={"pointer"}
            //    value={dashRepairCount.orderPackedCount}
            isLoading={props.fetchingorderDetails}
            />
                           </div>
                       </div>
                     
                   </div>  
                   
               
          </div>
          
        </div>
        <div class="mt-1">
      <ProcureLineChart />
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
)(DashRepairOrdRightJumstartboxOrg );
