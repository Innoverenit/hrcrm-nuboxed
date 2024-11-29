import React, { useEffect, useState, lazy, Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import {
  getJumpFinanceDetail
} from "../../DashboardAction";
import { BundleLoader } from "../../../../Components/Placeholder";
const StackedClosureChart= lazy(()=>import("../../StackedClosureChart"));
function DashOrderJumpstart(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "1326", //          "Receivables Added", // 0
          "1233",// "Receivables Closed", // 1
          "1234",// "Receivables Cancelled" // 2
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
    props.getJumpFinanceDetail(props.orgId,props.timeRangeType, "Catalog")
  }, [props.timeRangeType]);

  if (loading) {
    return <div><BundleLoader/></div>;
  }

  return (
    <>
   <div class=" flex flex-col">
      <div class=" flex flex-row w-full"  >
       
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
              title={translatedMenuItems[0]}
            // jumpstartClick={()=>handleClick("Prospect")}
            cursorData={"pointer"}
            value={props.financeDetail.totalPayableAmount}
            isLoading={props.fetchingJumpstartFinanceDetail}
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
              title={translatedMenuItems[1]}
              // jumpstartClick={()=>handleClick("Current Quotation")}
             cursorData={"pointer"}
             value={props.financeDetail.outstanding}
             isLoading={props.fetchingJumpstartFinanceDetail}
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
              title={translatedMenuItems[2]}
                      // jumpstartClick={()=>handleClick("Open Quotations")}
            cursorData={"pointer"}
            value={ props.financeDetail.orderValue}
            isLoading={props.fetchingJumpstartFinanceDetail}
            />
                          </div>
                      </div>
                     
                  </div>   
        </div>
      </div>
      <div class="mt-1">
      <Suspense fallback={<BundleLoader />}> 
      <StackedClosureChart />
      </Suspense>
      </div>
      </div>
    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  financeDetail: dashboard.financeDetail,
  orgId: auth.userDetails.organizationId,
  fetchingJumpstartFinanceDetail: dashboard.fetchingJumpstartFinanceDetail,
  userId: auth.userDetails.employeeId,
  timeRangeType: dashboard.timeRangeType,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpFinanceDetail
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
)(DashOrderJumpstart);
