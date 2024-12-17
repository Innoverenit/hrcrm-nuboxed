
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomerCategoryPieChart from "../JumpStart/CustomerCategoryPieChart"
import { getJumpFinanceDetail } from "../../DashboardAction"
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CustomerSectorPieChart from "./CustomerSectorPieChart";

function CustomerDashJumpstart(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
        "1292", // "Customers"//0
         "1293",   // "Revenue this Year",//1
          "1294",  // ""Revenue Life Time",//2
           "1295", // "Open Orders,//3
           "1594",// By sector 4 
        "1595",// By Source 5
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


  const { openPitchQualified, handlePitchQualifiedDrawer, openPitchAdded, handlePitchAddedDrawer,
    openDealAdded, handleDealAddedDrawer, openDealClosed, handleDealClosedDrawer
  } = props;

//   useEffect(() => {
//     props.getJumpFinanceDetail(props.orgId, props.timeRangeType)
//   }, [props.timeRangeType])
  return (
    <>
    <div  class="flex flex-col" >
  <div class="flex  w-full" >
      
       
        <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2 bg-green-600"><AcUnitIcon className='text-white'/></div>
                             </div>
                             <JumpStartBox
            bgColor="linear-gradient(270deg,#F15753,orange)"
            noProgress
            title={translatedMenuItems[0]}
          />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-pink-600 rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2 bg-pink-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
            noProgress
            title={translatedMenuItems[1]}
          />
                         </div>
                     </div>
                 
                 </div> 
        <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2 bg-yellow-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
            bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
            noProgress
            title={translatedMenuItems[2]}
          />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-blue-600 rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2 bg-blue-600"><DynamicFeedIcon className='text-white'/></div>
                             </div>
                             <JumpStartBox
            bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
            noProgress
            title={translatedMenuItems[3]}
          />
                         </div>
                     </div>
                 
                 </div>  
         
        
        {/* Include PieChartComponent here */}
        {/* <div>
          <CustomerPieChart />
        </div> */}
      </div>

  
      <div class=" mt-1 flex flex-row justify-between" >
        <div>
        <div class=" font-poppins font-bold text-base ">By Category</div>
        <CustomerCategoryPieChart />
        </div>
        <div>
        <div class=" font-poppins font-bold text-base "> {translatedMenuItems[5]}</div>
        <CustomerSectorPieChart/>
        </div>
      </div>
        </div>


    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  financeDetail: dashboard.financeDetail,
  orgId: auth.userDetails.organizationId,
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpFinanceDetail
      //   getJumpInvestorlist,
      //   getJumpInvestor2list,
      //   getJumpInvestor3list,
      //   getJumpInvestor4list,
      //   handlePitchQualifiedDrawer,
      //   handlePitchAddedDrawer,
      //   handleDealAddedDrawer,
      //   handleDealClosedDrawer

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDashJumpstart);
