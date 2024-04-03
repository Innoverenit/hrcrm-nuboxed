import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import { ActionIcon } from "../../../Components/Utils";
import {
  StyledPopconfirm,
} from "../../../Components/UI/Antd";
import {  Tooltip, Select,Button } from "antd";
import { MultiAvatar2, SubTitle } from "../../../Components/UI/Elements";
import {
    getRegionSalesList,
    handleSalesPlanDrawerModal
} from "../RegionalDashAction";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../Components/Placeholder";
import SalesPlanDrawerModal from "./SalesPlanDrawerModal";


const Option = Select;



function RegionSalesList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    props.getRegionSalesList(currentYear,props.tabKey,props.rowdata.regionsId,"Sales");
    // setPage(page + 1);
  }, []);


  

  const {
    //   opportunity: { opportunityId },
    fetchingRegionalSalesList,
    regionSalesList,
    addSalesPlanModal,
    handleSalesPlanDrawerModal,
  } = props;

  if (fetchingRegionalSalesList) return <BundleLoader/>;
  return (
    <>
  {regionSalesList.map((item, i) => {
  return (
    <div key={i} className="flex items-center">
      <div className="font-bold mr-4">{item.employeeName}</div>
      <Button type="primary"
        onClick={() => {
          handleSalesPlanDrawerModal(true);
          // handleSetCurrentCustomer(item);
        }}
      >View Sales Plan</Button>
    </div>
  );
})}
     
      <div className=' flex  justify-center  sticky top-28 z-auto'>
      <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
      <div className=" md:w-[11.5rem]">
    <FormattedMessage
              id="app.name"
              defaultMessage="Name"
            /></div>
<div className=" md:w-[12.1rem]"><FormattedMessage
              id="app.assigned"
              defaultMessage="Assigned"
            /></div>
             <div className="md:w-[10.1rem]"><FormattedMessage
              id="app.achieved"
              defaultMessage="Achieved"
            /></div>
                  <div className="md:w-[7.1rem]"><FormattedMessage
              id="app.actual"
              defaultMessage="Actual"
            /></div>
   
    
    {/* <div className="w-[10.2rem]"></div> */}

  </div>

    
  {regionSalesList.map((item) => { 
    
    
                return (
                    <div>
                        <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                            >
                                 
                                 <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

      <div class="max-sm:w-full">
                                    <Tooltip>
                                      <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                      
                                        <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                            
  {item.kpiSalesName}
 
   
                                        </div>
                                        </div>
                                    </Tooltip>
                                    </div>
                                    </div>
                            </div>
                            <div class="flex">

                        
                        <div className=" flex font-medium flex-col md:w-[16.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                               
                               <div class="text-sm text-cardBody font-poppins">
  
                 <div className="font-normal text-sm text-cardBody font-poppins">
                     {item.assignedValue && (
                   <span>
                   
                    {` ${item.assignedValue} ${item.userCurrency}`}
                    </span>
                     )}
                 </div>
           
                               </div>
                           </div>
                           <div className=" flex font-medium flex-col md:w-[14.3rem] max-sm:flex-row w-full max-sm:justify-between ">
                               
                               <div class="text-sm text-cardBody font-poppins">
            
              <>
              {/* {item.completedValue && ( */}
              <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
              <div class=" flex flex-col">
    <span className='mr-2'>M1</span>
    <span>{`${item.month1CompletedValue}`}</span>
  </div>
  <div class=" flex flex-col">
    <span className='mr-2'>M2</span>
    <span className='ml-2'>{`${item.month2CompletedValue}`}</span>
  </div>
  <div class=" flex flex-col">
    <span className='mr-2'>M3</span>
    <span className='ml-2'>{`${item.month3CompletedValue}`}</span>
  </div>
              </div>
              
              {/* )} */}
              </>
         
                               </div>
                           </div>
                          <div className=" flex font-medium flex-col md:w-[8.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                          <div class="text-sm text-cardBody font-poppins">
            
            <>
            {/* {item.completedValue && ( */}
            <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
            <div class=" flex flex-col">
  <span className='mr-2'>M1</span>
  <span>{`${item.month1ActualCompletedValue}`}</span>
</div>
<div class=" flex flex-col">
  <span className='mr-2'>M2</span>
  <span className='ml-2'>{`${item.month2ActualCompletedValue}`}</span>
</div>
<div class=" flex flex-col">
  <span className='mr-2'>M3</span>
  <span className='ml-2'>{`${item.month3ActualCompletedValue}`}</span>
</div>
            </div>
            
            {/* )} */}
            </>
       
                             </div>
                          </div>
                        
                          </div>
                          {/* <div className=" flex  ml-8" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                {editContactId === item.userKpiLinkId ? (
                    <>
                   <Button onClick={() => handleUpdateContact(item.userKpiLinkId, item.month1CompletedValue,item.month2CompletedValue,item.month3CompletedValue)}>
                Save
              </Button>
                    <Button onClick={() => handleCancelClick(item.userKpiLinkId)} style={{ marginLeft: '0.5rem' }}>
                    Cancel
                  </Button>
                  </>
                  
                ) : (
                  <BorderColorIcon
                    tooltipTitle="Edit"
                    iconType="edit"
                     onClick={() => handleEditClick(item.userKpiLinkId)}
                    style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '1rem', }}
                  />
                )}
              </div>
                          */}

                          
                         
                        </div>
                    </div>


                )
            })}
                
  </div>
  </div>


 
  <SalesPlanDrawerModal
        // customer={currentCustomer}
        addSalesPlanModal={addSalesPlanModal}
        handleSalesPlanDrawerModal={handleSalesPlanDrawerModal}
        // handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
     
   
    </>
  );
}
const mapStateToProps = ({
  customer, dashboardRegional, departments, contact
}) => ({
    regionSalesList:dashboardRegional.regionSalesList,
    addSalesPlanModal:dashboardRegional.addSalesPlanModal,
    fetchingRegionalSalesList:dashboardRegional.fetchingRegionalSalesList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getRegionSalesList,
        handleSalesPlanDrawerModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(RegionSalesList);
















