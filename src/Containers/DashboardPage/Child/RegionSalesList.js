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
  const [rowdata, setrowdata] = useState("");
  const [rowdownData, setrowDowndata] = useState("");
  const [page, setPage] = useState(0);
  const [showHeartCard, setShowHeartCard] = useState(false);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    props.getRegionSalesList(currentYear,props.tabKey,props.rowdata.regionsId,"Sales");
    // setPage(page + 1);
  }, []);

  const handleRowData = (data) => {
    setrowdata(data);
    // setShowHeartCard(true);
  };

  const handleRowDownData = (data) => {
    setrowDowndata(data);
    setShowHeartCard(true);
  };
  

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
  {regionSalesList.length > 0 ? (
  regionSalesList.map((employee, i) => {
    const AssignedValue = employee.useKpiList.reduce((acc, curr) => acc + curr.assignedValue, 0);
        const Actualcompleted = employee.useKpiList.reduce((acc, curr) => acc + curr.completedValue, 0);

        const actualCompletedValue=employee.useKpiList.reduce((acc, curr) => acc + curr.actualCompletedValue, 0);
        return (
      <div key={i}>
        <div className="flex items-center">
          <div className="font-bold mr-4">{employee.employeeName}</div>
          <Button type="primary" onClick={() => {
            handleSalesPlanDrawerModal(true);
            handleRowData(employee);
            }}>View Sales Plan</Button>
        </div>
        <div className=' flex  justify-center  sticky top-28 z-auto'>
          <div className="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            <div className="flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
              <div className="md:w-[1.5rem]">
                <FormattedMessage id="app.kpi" defaultMessage="KPI" />
              </div>
            
              
              <div className="md:w-[4.1rem]">
                <FormattedMessage id="app.assigned" defaultMessage="Assigned Total" />
              </div>
          
             
              <div className="md:w-[6.1rem]">
                <FormattedMessage id="app.achieved" defaultMessage="Achieved Total" />
              </div>
            
              <div className="md:w-[4.1rem]">
                <FormattedMessage id="app.actual" defaultMessage="Actual Total" />
              </div>
            
            </div>
  
            {/* {employee.useKpiList.map((item, index) => { */}

  
              <div  className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3">
                <div className="flex font-medium flex-col md:w-[16rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div className="flex max-sm:w-full items-center">
                    <div className="max-sm:w-full">
                      <Tooltip>
                        <div className="flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                          <div className="text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer">
                            {employee.kpiSalesName}
                          </div>
                        </div>
                      </Tooltip>
                    </div>
                   
                  </div>
                </div>
       
               
                <div className="flex font-medium flex-col md:w-[19.3rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div className="text-sm text-cardBody font-poppins">
                    <>
                      <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                       {AssignedValue}
                      </div>
                    </>
                  </div>
                </div>
           
              
                <div className="flex font-medium flex-col md:w-[19.3rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div className="text-sm text-cardBody font-poppins">
                    <>
                      <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                       {Actualcompleted}
                      </div>
                    </>
                  </div>
                </div>
              
                <div className="flex font-medium flex-col md:w-[4.3rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div className="text-sm text-cardBody font-poppins">
                    <>
                      <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                       {actualCompletedValue}
                      </div>
                    </>
                  </div>
                </div>
                   <div className="flex font-medium flex-col md:w-[4.3rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div className="text-sm text-cardBody font-poppins">
                    <>
                   <Button
                   onClick={() => {
                    // handleSalesPlanDrawerModal(true);
                    handleRowDownData(employee);
                    }}
                   >Details</Button>
                    </>
                  </div>
        
                </div>
                
              </div>
             {/* ); */}
                       
{/* })} */}
          </div>
        </div>
        {/* Details card code */}
       
      
       
      </div>
      
        )
})

    ) : (
      
      <p>No Data Available</p>
    )}
              <div>
        {showHeartCard && (
<div className=' flex  justify-center  sticky top-28 z-auto'>
          <div className="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
            <div className="flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
              <div className="md:w-[11.5rem]">
                <FormattedMessage id="app.kpi" defaultMessage="KPI" />
              </div>
              <div className="md:w-[8.5rem]">
                <FormattedMessage id="app.lob" defaultMessage="LOB" />
              </div>
              <div className="md:w-[6.1rem]">
                <FormattedMessage id="app.assigned" defaultMessage="Assigned" />
              </div>
              <div className="md:w-[4.1rem]">
                <FormattedMessage id="app.assigned" defaultMessage=" Total" />
              </div>
          
              <div className="md:w-[10.1rem]">
                <FormattedMessage id="app.achieved" defaultMessage="Achieved" />
              </div>
              <div className="md:w-[6.1rem]">
                <FormattedMessage id="app.achieved" defaultMessage=" Total" />
              </div>
              <div className="md:w-[4.1rem]">
                <FormattedMessage id="app.actual" defaultMessage="Actual" />
              </div>
              <div className="md:w-[4.1rem]">
                <FormattedMessage id="app.actual" defaultMessage="Total" />
              </div>
            
            </div>
  
            {rowdownData.useKpiList.map((item, index) => {
  
  
            const AssignedTotal = Math.floor(item.month1AssignedValue + item.month2AssignedValue +item.month3AssignedValue) ;
            const AchievedTotal = Math.floor(item.month1CompletedValue + item.month2CompletedValue +item.month3CompletedValue) ;
  const ActualTotal = Math.floor(item.month1ActualCompletedValue + item.month2ActualCompletedValue +item.month3ActualCompletedValue) ;
            // + item.month1CompletedValue + item.month2CompletedValue + item.month3CompletedValue + item.month1ActualCompletedValue + item.month2ActualCompletedValue + item.month3ActualCompletedValue );
             return (
              <div key={index} className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3">
                <div className="flex font-medium flex-col md:w-[16rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div className="flex max-sm:w-full items-center">
                    <div className="max-sm:w-full">
                      <Tooltip>
                        <div className="flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                          <div className="text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer">
                            {item.kpiName}
                          </div>
                        </div>
                      </Tooltip>
                    </div>
                    <div className="max-sm:w-full">
                      <Tooltip>
                        <div className="flex max-sm:w-full justify-between flex-row md:flex-col w-[10rem]">
                          <div className="text-sm  text-cardBody font-poppins  cursor-pointer">
                            {item.lobName}
                          </div>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
       
                <div className="flex font-medium flex-col md:w-[19.3rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div className="text-sm text-cardBody font-poppins">
                    <>
                      <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                        <div className="flex flex-col">
                          <span className="mr-2">M1</span>
                          <span className='ml-2'>{item.month1AssignedValue && (
    <span>
        {item.currencyInd && `${item.userCurrency} `}
        {item.month1AssignedValue} 
    </span>
)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="mr-2">M2</span>
                          <span className='ml-2'>{item.month2AssignedValue && (
    <span>
        {item.currencyInd && `${item.userCurrency} `}
        {item.month2AssignedValue} 
    </span>
)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="mr-2">M3</span>
                
                                    <span className='ml-2'>{item.month3AssignedValue && (
    <span>
        {item.currencyInd && `${item.userCurrency} `}
        {item.month3AssignedValue} 
    </span>
)}</span>
                        </div> 
                      </div>
                    </>
                  </div>
                </div>
                <div className="flex font-medium flex-col md:w-[19.3rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div className="text-sm text-cardBody font-poppins">
                    <>
                      <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                       {AssignedTotal}
                      </div>
                    </>
                  </div>
                </div>
           
                <div className="flex font-medium flex-col md:w-[14.3rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div className="text-sm text-cardBody font-poppins">
                    <>
                      <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                        <div className="flex flex-col">
                          <span className="mr-2">M1</span>
                          <span className='ml-2'>   {item.month1CompletedValue && (
                                        <span>
                                            {item.currencyInd && `${item.userCurrency} `}
                                            {item.month1CompletedValue}
                                        </span>
                                    )}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="mr-2">M2</span>
                          <span className='ml-2'>   {item.month2CompletedValue && (
                                        <span>
                                            {item.currencyInd && `${item.userCurrency} `}
                                            {item.month2CompletedValue}
                                        </span>
                                    )}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="mr-2">M3</span>
                          <span className='ml-2'>   {item.month3CompletedValue && (
                                        <span>
                                            {item.currencyInd && `${item.userCurrency} `}
                                            {item.month3CompletedValue}
                                        </span>
                                    )}</span>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
                <div className="flex font-medium flex-col md:w-[19.3rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div className="text-sm text-cardBody font-poppins">
                    <>
                      <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                       {AchievedTotal}
                      </div>
                    </>
                  </div>
                </div>
                <div className="flex font-medium flex-col md:w-[17.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                  <div className="text-sm text-cardBody font-poppins">
                    <>
                      <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                        <div className="flex flex-col">
                          <span className="mr-2">M1</span>
                          <span className='ml-2'>   {item.month1ActualCompletedValue && (
                                        <span>
                                            {item.currencyInd && `${item.userCurrency} `}
                                            {item.month1ActualCompletedValue}
                                        </span>
                                    )}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="mr-2">M2</span>
                          <span className='ml-2'>   {item.month2ActualCompletedValue && (
                                        <span>
                                            {item.currencyInd && `${item.userCurrency} `}
                                            {item.month2ActualCompletedValue}
                                        </span>
                                    )}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="mr-2">M3</span>
                          <span className='ml-2'>   {item.month3ActualCompletedValue && (
                                        <span>
                                            {item.currencyInd && `${item.userCurrency} `}
                                            {item.month3ActualCompletedValue}
                                        </span>
                                    )}</span>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
                <div className="flex font-medium flex-col md:w-[4.3rem] max-sm:flex-row w-full max-sm:justify-between">
                  <div className="text-sm text-cardBody font-poppins">
                    <>
                      <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                       {ActualTotal}
                      </div>
                    </>
                  </div>
                </div>
                
              </div>
             );
                       
})}
          </div>
        </div>
  )}
        </div>

    <SalesPlanDrawerModal
    tabKey={props.tabKey}
            rowdata={rowdata}
      addSalesPlanModal={addSalesPlanModal}
      handleSalesPlanDrawerModal={handleSalesPlanDrawerModal}
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
















