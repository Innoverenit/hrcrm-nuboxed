import React, { useEffect, useState, lazy, Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getJumpFinanceDetail,
  getOrderAddedList,
getOrderOpenList,
getOrderClosedList,
getOrderCancelList
} from "../../DashboardAction"
import { JumpStartBox } from "../../../../Components/UI/Elements";
import axios from 'axios';
import {base_url2} from "../../../../Config/Auth";
import { BundleLoader } from "../../../../Components/Placeholder";
const InvestorJumpstartDrawer =lazy(()=>import("./InvestorJumpstartDrawer"));

function DashboardInvestorJumpstartOrg(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderType, setCurrentOrderType] = useState("");

  const [error, setError] = useState(null);
 
  

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
        "201", //  "Investors"//0
         "1459",   // "Current Deals",//1
          "1458",  // "Open Deals",//2
           "1460", // "Deals Life Time",//3
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

  const [data1, setData1] = useState({});
  const [loading1, setLoading1] = useState(false);
    const fetchData1 = async () => {
      try {
        const response = await axios.get(`${base_url2}/FD1`,{
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


  const { openPitchQualified, handlePitchQualifiedDrawer, openPitchAdded, handlePitchAddedDrawer,
    openDealAdded, handleDealAddedDrawer, openDealClosed, handleDealClosedDrawer
  } = props;
const orderAddedList=[];
//   useEffect(() => {
//     props.getJumpFinanceDetail(props.orgId, props.timeRangeType)
//   }, [props.timeRangeType])
console.log(props.prospectChart)
// console.log(props.prospectLifeTime.customerCountByCountry)

useEffect(() => {
  if (data1) {
    setModalData(data1);
  }
}, [data1]);

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
    case 'Investor':
      fetchData1();
      break;
    case 'Current Deals':
      props.getOrderOpenList(props.orgId,props.endDate,props.startDate);
      break;
    case 'Open Deals':
      props.getOrderClosedList(props.orgId,props.endDate,props.startDate);
      break;
    case 'Deals Life Time':
      props.getOrderCancelList(props.orgId,props.endDate,props.startDate);
      break;
    default:
      break;
  }
};


  return (
    <>
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={translatedMenuItems[0]}
              jumpstartClick={()=> handleClick("Investor")}
            cursorData={"pointer"}
            //  value={props.prospectChart.customerCountByCountry}
            // isLoading={props.fetchingProspectData}
            />
                        
                     </div>
                 
                 </div> 
                 </div>
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title={translatedMenuItems[1]}
              jumpstartClick={()=> handleClick("Current Deals")}
             cursorData={"pointer"}
            //value={props.openQuotationYear.yearlyOpportunityCountByCountry}
          // isLoading={props.fetchingOpenQuotationYear}
            />
                           </div>
                       </div>
                    
                   </div>  
      
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
   bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title={translatedMenuItems[2]}
              // value={props.prospectLifeTime.opportunityCountByCountry}
              jumpstartClick={()=> handleClick("Open Deals")}
            cursorData={"pointer"}
            // value={props.financeDetail.opportunityAdded}
            // isLoading={props.fetchingProspectLifetime}
            />
                           </div>
                       </div>
                     
                   </div>  
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center text-xs">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                              </div>
                              <JumpStartBox
                         bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title={translatedMenuItems[3]}
              // value={props.prospectQuotation.openOpportunityCountByCountry}
              jumpstartClick={()=> handleClick("Deals Life Time")}
            cursorData={"pointer"}
            // value={ props.financeDetail.closedOpportunity}
          // isLoading={props.fetchingProspectQuotation}
            />
                          </div>
                      </div>
                     
                  </div>
           
          
          
        </div>
      </div>
      <Suspense fallback={<BundleLoader />}> 
<InvestorJumpstartDrawer
 selectedLanguage={props.selectedLanguage}
 translateText={props.translateText}
 isModalOpen={isModalOpen}
 setIsModalOpen={() => setIsModalOpen(false)}
 modalData={modalData}
 title={currentOrderType}
/>
</Suspense > 
    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  financeDetail: dashboard.financeDetail,
  orgId: auth.userDetails.organizationId,
  prospectDrawerModal:dashboard.prospectDrawerModal,
  showSalesDatelist: dashboard.showSalesDatelist,
  fetchingSalesDatewiseReport: dashboard.fetchingSalesDatewiseReport,
  fetchingSalesDatewiseReportError: dashboard.fetchingSalesDatewiseReportError,
  fetchingDatewiseReport: dashboard.fetchingDatewiseReport,
  fetchingDatewiseReportError: dashboard.fetchingDatewiseReportError,
  recruiterId: auth.userDetails.userId,
  userId: auth.userDetails.employeeId,
  timeRangeType: dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate,
  prospectQuotationLifeModal:dashboard.prospectQuotationLifeModal,
  prospectQuotationYearModal:dashboard.prospectQuotationYearModal,
  orderAddedList:dashboard.orderAddedList,
  orderOpenList:dashboard.orderOpenList,
  orderClosedList:dashboard.orderClosedList,
  orderCancelList:dashboard.orderCancelList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpFinanceDetail,
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
)(DashboardInvestorJumpstartOrg);
