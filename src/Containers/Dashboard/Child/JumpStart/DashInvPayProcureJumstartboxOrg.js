import React, { useEffect,useState, lazy, Suspense } from "react";
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
import { BundleLoader } from "../../../../Components/Placeholder";
import axios from 'axios';
import {base_url2} from "../../../../Config/Auth";
import DynamicPieChart from "./DynamicPieChart";
const DashProcurePayDrawer= lazy(()=>import("./DashProcurePayDrawer"));
function DashInvPayProcureJumstartboxOrg(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderType, setCurrentOrderType] = useState("");
  const [error, setError] = useState(null);
  const [loading1, setLoading1] = useState(true);

  const [proInvoiceSent,setproInvoiceSent]=useState("");

  const fetchProInvoiceCount = async () => {
    try {
      const response = await axios.get(`${base_url2}/invoice/invoiceCount/${props.orgId}/${props.timeRangeType}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      });
      setproInvoiceSent(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const [proInvoiceSentList,setproInvoiceSentList]=useState("");

  const fetchProInvoiceSentList = async () => {
    try {
      const response = await axios.get(`${base_url2}/invoice/invoiceSend/${props.orgId}/${props.startDate}/${props.endDate}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      });
      setproInvoiceSent(response.data);
      setLoading1(false);
    } catch (error) {
      setError(error);
      setLoading1(false);
    }
  };


    const [proPaymentReceivedList, setproPaymentReceivedList] = useState([]);
      const [loading3, setLoading3] = useState(false);

      const fetchProPaymentReceivedList = async () => {
          try {
            const response = await axios.get(`${base_url2}/orderPayment/invoicePaymentReceived/${props.orgId}/${props.startDate}/${props.endDate}`,{
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
              },
            });
            setproPaymentReceivedList(response.data);
            setLoading3(false);
          } catch (error) {
            setError(error);
            setLoading3(false);
          }
        };
        const [proPaymentReconciledList, setproPaymentReconciledList] = useState([]);
        const [loading4, setLoading4] = useState(false);
  
        const fetchProPaymentReconciledList = async () => {
            try {
              const response = await axios.get(`${base_url2}/orderPayment/invoicePaymentReconciled/${props.orgId}/${props.startDate}/${props.endDate}`,{
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                },
              });
              setproPaymentReconciledList(response.data);
              setLoading4(false);
            } catch (error) {
              setError(error);
              setLoading4(false);
            }
          };
        
              
      

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    "1498",  //  "Invoice Sent", // 0
     "1499", //  "Payment Received", // 1
      "1500",//   "Payment Reconciled", // 2
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
    fetchProInvoiceCount();
  }, [props.orgId,props.timeRangeType]);

  useEffect(() => {
    if (proInvoiceSentList) {
      setModalData(proInvoiceSentList);
    }
  }, [proInvoiceSentList]);

  useEffect(() => {
    if (proPaymentReceivedList) {
      setModalData(proPaymentReceivedList);
    }
  }, [proPaymentReceivedList]);

  useEffect(() => {
    if (proPaymentReconciledList) {
      setModalData(proPaymentReconciledList);
    }
  }, [proPaymentReconciledList]);


  const handleClick = (type) => {
    setCurrentOrderType(type);
    setIsModalOpen(true);

    switch(type) {
      case 'Invoice Sent':
        fetchProInvoiceSentList(props.orgId,props.endDate,props.startDate);
        break;
      case 'Payment Received':
        fetchProPaymentReceivedList(props.orgId,props.endDate,props.startDate);
        break;
      case 'Payment Reconciled':
        fetchProPaymentReconciledList(props.orgId,props.endDate,props.startDate);
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
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title= {translatedMenuItems[0]}
              jumpstartClick={()=> handleClick("Invoice Sent")}
              cursorData={"pointer"}
              value={proInvoiceSent.invoiceAmount}
            isLoading={loading}
            />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-1">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title= {translatedMenuItems[1]} 
             
            jumpstartClick={()=> handleClick("Payment Received")}
              cursorData={"pointer"}
              value={proInvoiceSent.paymentReceived}
            isLoading={loading}
            />
                           </div>
                       </div>
                    
                   </div>  
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center text-xs">
                              <div class="flex-shrink pr-1">
                                  <div class="rounded-full p-2 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                              </div>
                              <JumpStartBox
                             bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                              noProgress
                              title= {translatedMenuItems[2]} 
                              jumpstartClick={()=> handleClick("Payment Reconciled")}
                              cursorData={"pointer"}
                              value={proInvoiceSent.paymentReconcile}
                              isLoading={loading}
                            />
                          </div>
                      </div>      
                  </div>
          </div>
          
        </div>
        <div>
        <div class=" font-poppins font-bold text-base mt-1">By Process</div>
        <Suspense fallback={<BundleLoader />}> 
        <DynamicPieChart userId={props.orgId} dtype={"ProcureAmount"} timeRangeType={props.timeRangeType}/>
        </Suspense>
        </div>
        </div>
        <Suspense fallback={<BundleLoader />}> 
      <DashProcurePayDrawer
 selectedLanguage={props.selectedLanguage}
 translateText={props.translateText}
 isModalOpen={isModalOpen}
 setIsModalOpen={() => setIsModalOpen(false)}
 modalData={modalData}
 title={currentOrderType}
      />
   </Suspense>
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
)(DashInvPayProcureJumstartboxOrg);
