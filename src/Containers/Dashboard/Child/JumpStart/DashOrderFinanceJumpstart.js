import React, { useEffect,lazy, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getJumpFinanceDetail } from "../../DashboardAction"
import { JumpStartBox, } from "../../../../Components/UI/Elements";

const DashRepairBarClousreJumpstartUser =lazy(()=>import("./DashRepairBarClousreJumpstartUser"));

function DashOrderFinanceJumpstart(props) {

  const { openPitchQualified, handlePitchQualifiedDrawer, openPitchAdded, handlePitchAddedDrawer,
    openDealAdded, handleDealAddedDrawer, openDealClosed, handleDealClosedDrawer
  } = props;
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
    "1326",  //  ""Receivable Added"// 0
     "1233", //  "Receivable Closed, // 1
  

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
  }, [props.timeRangeType])
  return (
    <>
      <div class=" flex flex-col" >
        <div class=" flex w-full" >

        <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={translatedMenuItems[0]}
              // {<FormattedMessage
              //   id="app.financeadded"
              //   defaultMessage="Receivable Added"
              // />}
           
            />
                         </div>
                     </div>
                 </div> 

                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                       <JumpStartBox
                        bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
                        noProgress
                        title={translatedMenuItems[1]}
                        // {<FormattedMessage
                        //   id="app.financeclosed"
                        //   defaultMessage="Receivable Closed"
                        // />}
            
                        />
                        
                         </div>
                     </div>
                 
                 </div> 

                 {/* <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={translatedMenuItems[0]}
              // {<FormattedMessage
              //   id="app.financeadded"
              //   defaultMessage="Receivable Added"
              // />}
           
            />
                         </div>
                     </div>
                 </div>  */}
          
                 
        </div>

<div class="mt-1">
<DashRepairBarClousreJumpstartUser 
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}/>
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
      // getJumpFinanceDetail
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
)(DashOrderFinanceJumpstart);
