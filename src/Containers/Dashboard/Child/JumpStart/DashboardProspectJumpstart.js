import React, { useEffect, useState , lazy, Suspense,} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getJumpFinanceDetail ,getProspectTableData,
  getQuotationTableData,handleProspectDrawer} from "../../DashboardAction"
import { BundleLoader } from "../../../../Components/Placeholder";
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import ApartmentIcon from '@mui/icons-material/Apartment';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const AddProspectDrawerModal =lazy(()=>import("../JumpStart/AddProspectDrawerModal"));
const CustomerPieChart=lazy(()=>import("./CustomerPieChart"));

function DashboardProspectJumpstart(props) {

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
   
        "1288", //  "Prospects"//0
         "1468",   // "Current Quotation",//1
         "1291", // "Open Quotations",//2
          "1289",  // "Quotations Life Time",//3
          "1594",// By sector 4 
          "1595",//5
        
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

  useEffect(() => {
    if (props.prospectTableData) {
      setModalData(props.prospectTableData);
    }
  }, [props.prospectTableData]);

  useEffect(() => {
    if (props.quotationTableData) {
      setModalData(props.quotationTableData);
    }
  }, [props.quotationTableData]);

  const handleClick = (type) => {
    setCurrentOrderType(type);
    setIsModalOpen(true);
  
    switch(type) {
      case 'Prospect':
        props.getProspectTableData(props.selectedCountry)
        break;
      case 'Current Quotation':
        props.getQuotationTableData(props.selectedCountry);
        break;
      case 'Open Quotations':
        props.getQuotationTableData(props.selectedCountry);
        break;
      case 'Quotations Life Time':
        props.getQuotationTableData(props.selectedCountry);
        break;
      default:
        break;
    }
  };
//   useEffect(() => {
//     props.getJumpFinanceDetail(props.orgId, props.timeRangeType)
//   }, [props.timeRangeType])    
console.log(props.prospectChart)
// console.log(props.prospectLifeTime.customerCountByCountry)
  return (
    <>
     <div class=" flex flex-col">
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-1">
                                 <div class="rounded-full p-2 bg-green-600"><ApartmentIcon className="text-white"/></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={translatedMenuItems[0]}
            jumpstartClick={()=>handleClick("Prospect")}
            cursorData={"pointer"}
            //  value={props.prospectChart.customerCountByCountry}
            isLoading={props.fetchingProspectData}
            />
                        
                     </div>
                 
                 </div> 
                 </div>
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-1">
                                   <div class="rounded-full p-2 bg-pink-600"><LightbulbIcon className="text-white" /></div>
                               </div>
                               <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title={translatedMenuItems[1]}
              jumpstartClick={()=>handleClick("Current Quotation")}
             cursorData={"pointer"}
            // value={props.openQuotationYear.yearlyOpportunityCountByCountry}
          isLoading={props.fetchingOpenQuotationYear}
            />
                           </div>
                       </div>
                    
                   </div>  
           

           
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center text-xs">
                              <div class="flex-shrink pr-1">
                                  <div class="rounded-full p-2 bg-blue-600"><LightbulbIcon className="text-white" /></div>
                              </div>
                              <JumpStartBox
                         bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title={translatedMenuItems[2]}
              // value={props.prospectQuotation.openOpportunityCountByCountry}
              jumpstartClick={()=>handleClick("Open Quotations")}
            cursorData={"pointer"}
            // value={ props.financeDetail.closedOpportunity}
          isLoading={props.fetchingProspectQuotation}
            />
                          </div>
                      </div>
                     
                  </div>
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-1">
                                   <div class="rounded-full p-2 bg-yellow-600"><LightbulbIcon className="text-white" /></div>
                               </div>

                               <JumpStartBox
   bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title={translatedMenuItems[3]}
              // value={props.prospectLifeTime.opportunityCountByCountry}
              jumpstartClick={()=>handleClick("Quotations Life Time")}
            cursorData={"pointer"}
            // value={props.financeDetail.opportunityAdded}
            isLoading={props.fetchingProspectLifetime}
            />
      
                           </div>
                       </div>
                     
                   </div>  
                 
                  
          
          
        </div>
      </div>
      <div class=" mt-1 flex flex-row justify-between" >
        <div>
        <div class=" font-poppins font-bold text-base ">{translatedMenuItems[4]} </div>
        <Suspense fallback={<BundleLoader />}> <CustomerPieChart/></Suspense>       
        </div>
        <div>
        <div class=" font-poppins font-bold text-base "> {translatedMenuItems[5]}</div>
        <Suspense fallback={<BundleLoader />}> <CustomerPieChart/></Suspense> </div>
      </div>
      </div>
      <Suspense fallback={<BundleLoader />}>
<AddProspectDrawerModal
selectedCountry={props.selectedCountry}
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
  prospectTableData: dashboard.prospectTableData,
  quotationTableData:dashboard.quotationTableData,
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpFinanceDetail,
      handleProspectDrawer,
      getProspectTableData,
      getQuotationTableData,

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardProspectJumpstart);
