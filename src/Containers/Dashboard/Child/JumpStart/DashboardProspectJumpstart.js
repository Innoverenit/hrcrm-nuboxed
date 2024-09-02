import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddProspectQuotationLifeTime from "../JumpStart/AddProspectQuotationLifeTime"
import AddProspectQuotationYear from "../JumpStart/AddProspectQuotationYear"
import AddProspectDrawerModal from "../JumpStart/AddProspectDrawerModal"
import { getJumpFinanceDetail ,handleQuotationLife,handleQuotationYear,handleProspectDrawer} from "../../DashboardAction"
import { JumpStartBox,  } from "../../../../Components/UI/Elements";

function DashboardProspectJumpstart(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
   
        "1288", //  "Prospects"//0
         "1290",   // "Quotations this Year",//1
          "1289",  // "Quotations Life Time",//2
           "1291", // "Open Quotations",//3
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
console.log(props.prospectChart)
console.log(props.prospectLifeTime.customerCountByCountry)
  return (
    <>
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={translatedMenuItems[0]}
            jumpstartClick={()=>props.handleProspectDrawer(true)}
            cursorData={"pointer"}
             value={props.prospectChart.customerCountByCountry}
            isLoading={props.fetchingProspectData}
            />
                        
                     </div>
                 
                 </div> 
                 </div>
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title={translatedMenuItems[1]}
            jumpstartClick={()=>props.handleQuotationYear(true)}
             cursorData={"pointer"}
            value={props.openQuotationYear.yearlyOpportunityCountByCountry}
          isLoading={props.fetchingOpenQuotationYear}
            />
                           </div>
                       </div>
                    
                   </div>  
           

           
        
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
   bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title={translatedMenuItems[2]}
              value={props.prospectLifeTime.opportunityCountByCountry}
            jumpstartClick={()=>props.handleQuotationLife(true)}
            cursorData={"pointer"}
            // value={props.financeDetail.opportunityAdded}
            isLoading={props.fetchingProspectLifetime}
            />
                           </div>
                       </div>
                     
                   </div>  
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                              </div>
                              <JumpStartBox
                         bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title={translatedMenuItems[3]}
              value={props.prospectQuotation.openOpportunityCountByCountry}
            // jumpstartClick={()=>handleDealClosedDrawer(true)}
            // cursorData={"pointer"}
            // value={ props.financeDetail.closedOpportunity}
          isLoading={props.fetchingProspectQuotation}
            />
                          </div>
                      </div>
                     
                  </div>
           
          
          
        </div>
      </div>
<AddProspectDrawerModal
selectedCountry={props.selectedCountry}
prospectDrawerModal={props.prospectDrawerModal}
handleProspectDrawer={props.handleProspectDrawer}
/>


<AddProspectQuotationYear
handleQuotationYear={props.handleQuotationYear}
selectedCountry={props.selectedCountry}
prospectQuotationYearModal={props.prospectQuotationYearModal}
// prospectDrawerModal={props.prospectDrawerModal}
// handleProspectDrawer={props.handleProspectDrawer}
/>


<AddProspectQuotationLifeTime
handleQuotationLife={props.handleQuotationLife}
prospectQuotationLifeModal={props.prospectQuotationLifeModal}
// handleQuotationYear={props.handleQuotationYear}
// prospectQuotationYearModal={props.prospectQuotationYearModal}
// prospectDrawerModal={props.prospectDrawerModal}
// handleProspectDrawer={props.handleProspectDrawer}
/>

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
  prospectQuotationYearModal:dashboard.prospectQuotationYearModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpFinanceDetail,
      handleProspectDrawer,
      handleQuotationYear,
      handleQuotationLife
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
)(DashboardProspectJumpstart);
