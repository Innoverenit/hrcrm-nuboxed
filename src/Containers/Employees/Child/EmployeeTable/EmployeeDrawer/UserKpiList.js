import React, { useEffect, useState, useMemo,useRef, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select, Tooltip } from "antd"
import { Tabs } from 'antd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
 import {getUserKpiList,updateActualValue} from "../../../EmployeeAction"
// import {getKpis} from "../../../../Settings/Category/KPI/KPIAction"
import { Button } from 'antd';
import { FormattedMessage } from "react-intl";
const { TabPane } = Tabs;
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function UserKpiList(props) {

  const [editedFields, setEditedFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [editContactId, setEditContactId] = useState(null);
  const yearSelectRef = useRef(null);
  const [activeTab, setActiveTab] = useState("");
  const years=[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const tab=[
    "Q1","Q2","Q3","Q4"
  ]
  // useEffect(() => {
  //   props.getEmployeeKpiList(props.employeeId)
  // }, []);
  const resetData = () => {
    setSelectedYear(null);
    setActiveTab(null)
    // setSales({ amount: null, currency: null });
    // setFulfillment({ amount: null });
    // setInvestment({ amount: null, currency: null });
   
    if (yearSelectRef.current) {
      yearSelectRef.current.value = ""; // Reset the value of the select element
    }
  };
  const handleTabClick = async (key) => {
    setActiveTab(key);
    setLoading(true); 
    await loadKPIsForTab(selectedYear, key);
  
    setLoading(false); 
  };
  
  const loadKPIsForTab = async (year, tabKey) => {
    await props.getUserKpiList(props.employeeName.employeeId,selectedYear,tabKey);
  };

  // useEffect(() => {
  //   // props.getKpis(props.employeeName.departmentId)
  //   props.getUserKpiList(props.employeeName.employeeId)
    
  // }, []);


  const handleChange = (userKpiLinkId, fieldName, value) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [userKpiLinkId]: {
        ...prevFields[userKpiLinkId],
        [fieldName]: value,
      },
    }));
  };

  const handleEditClick = (userKpiLinkId) => {
    setEditContactId(userKpiLinkId);
  };
  const handleCancelClick = (userKpiLinkId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [userKpiLinkId]: undefined }));
    setEditContactId(null);
  };


  const handleYearChange = async (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
  
   
  };
  const handleUpdateContact = (userKpiLinkId,  month1ActualCompletedValue,month2ActualCompletedValue,month3ActualCompletedValue) => {
    const data = {
        userKpiLinkId: userKpiLinkId, 
       employeeId: props.employeeName.employeeId,
       month1ActualCompletedValue: parseFloat(editedFields[userKpiLinkId]?.month1ActualCompletedValue !== undefined ? editedFields[userKpiLinkId].month1ActualCompletedValue : month1ActualCompletedValue),
       month2ActualCompletedValue: parseFloat(editedFields[userKpiLinkId]?.month2ActualCompletedValue !== undefined ? editedFields[userKpiLinkId].month2ActualCompletedValue : month2ActualCompletedValue),
       month3ActualCompletedValue: parseFloat(editedFields[userKpiLinkId]?.month3ActualCompletedValue !== undefined ? editedFields[userKpiLinkId].month3ActualCompletedValue : month3ActualCompletedValue),
      //  actualCompletedValue: editedFields[userKpiLinkId]?.actualCompletedValue !== undefined ? editedFields[userKpiLinkId].actualCompletedValue : actualCompletedValue,
    };
  
    props.updateActualValue(data, props.employeeName.employeeId,selectedYear,activeTab)
     
     
      setEditedFields((prevFields) => ({ ...prevFields, [userKpiLinkId]: undefined }));
      setEditContactId(null);
    
  };
 ;


  return (
    <>
       <div class="flex flex-col justify-between  pr-2 max-sm:flex-col">
              <div class=" w-[20%] flex flex-row">
                <span class=" flex font-semibold">Fiscal Year</span>
                &nbsp;&nbsp;
            <select 
      ref={yearSelectRef}
      onChange={handleYearChange}>
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      </div>
      {selectedYear && (
        <div class=" w-full flex flex-col mt-4">
           <Tabs type="card" 
           activeKey={activeTab} 
          onChange={handleTabClick}
           >
      {tab.map((tabs) => (
        <TabPane key={tabs} tab={tabs}>
       
       
       
        </TabPane>
      ))}
    </Tabs>
    </div> 
    )}
     </div>
     {activeTab&&(
  <div class="rounded-lg m-5 p-2 w-[97%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[8.5rem]">
        <FormattedMessage
                  id="app.name"
                  defaultMessage="Name"
                /></div>
 

                         <div className=" md:w-[7.1rem]"><FormattedMessage
                  id="app.assigned"
                  defaultMessage="Assigned"
                /></div>
                 <div className="md:w-[10.1rem]"><FormattedMessage
                  id="app.achieved"
                  defaultMessage="Achieved"
                /></div>
                     <div className="md:w-[14.1rem]"><FormattedMessage
                  id="app.actual"
                  defaultMessage="Actual"
                /></div>
              
       
        
        {/* <div className="w-[10.2rem]"></div> */}

      </div>
   
        
      {props.userKpiList.map((item) => { 
        
        
                    return (
                        <div>
                            <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                                >
                                     
                                     <div className=" flex font-medium flex-col md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
      {item.kpiName}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                            
                            <div className=" flex font-medium flex-col md:w-[12.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                   
                                   <div class="text-sm text-cardBody font-poppins">
              
                     <div className="font-normal text-sm text-cardBody font-poppins">
                     {item.assignedValue && (
                                        <span>
                                            {item.currencyInd && `${item.userCurrency} `}
                                            {item.assignedValue}
                                        </span>
                                    )}
                     </div>
                
                                   </div>
                               </div>
                               <div className=" flex font-medium flex-col md:w-[16.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                               {item.completedValue && (
                                        <span>
                                            {item.currencyInd && `${item.userCurrency} `}
                                            {item.completedValue}
                                        </span>
                                    )}
                            </div>
                            <div className="Ccard__title w-[15rem]">
                            <div class="text-sm text-cardBody font-poppins">
                               {editContactId === item.userKpiLinkId ? (
              <>
              <div class=" flex flex-row">
              <input
              style={{border:"2px solid black",width:"6rem"}}
              placeholder="Month1"
                value={editedFields[item.userKpiLinkId]?.month1ActualCompletedValue !== undefined ? editedFields[item.userKpiLinkId].month1ActualCompletedValue : item.month1ActualCompletedValue}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!isNaN(inputValue)) { // Check if the input is a number
                      handleChange(item.userKpiLinkId, 'month1ActualCompletedValue', inputValue);
                  } else {
                    alert("Please enter  number.");
                 
                  }
              }}
              />
              &nbsp;
              <input
              placeholder="Month2"
              style={{border:"2px solid black",width:"6rem"}}
                value={editedFields[item.userKpiLinkId]?.month2ActualCompletedValue !== undefined ? editedFields[item.userKpiLinkId].month2ActualCompletedValue : item.month2ActualCompletedValue}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!isNaN(inputValue)) { // Check if the input is a number
                      handleChange(item.userKpiLinkId, 'month2ActualCompletedValue', inputValue);
                  } else {
                    alert("Please enter  number.");
                 
                  }
              }}
              />
                 &nbsp;
              <input
              placeholder="Month3"
              style={{border:"2px solid black",width:"6rem"}}
                value={editedFields[item.userKpiLinkId]?.month3ActualCompletedValue !== undefined ? editedFields[item.userKpiLinkId].month3ActualCompletedValue : item.month3ActualCompletedValue}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!isNaN(inputValue)) { // Check if the input is a number
                      handleChange(item.userKpiLinkId, 'month3ActualCompletedValue', inputValue);
                  } else {
                    alert("Please enter  number.");
                 
                  }
              }}
              />
                 &nbsp;
              </div>
              </>
            ) : (
              <>
              {/* {item.completedValue && ( */}
              <div className="font-normal flex  flex-row text-sm text-cardBody font-poppins">
              <div class=" flex flex-col">
    <span className='mr-2'>M1</span>
    <span className='ml-2'>   {item.month1ActualCompletedValue && (
                                        <span>
                                            {item.currencyInd && `${item.userCurrency} `}
                                            {item.month1ActualCompletedValue}
                                        </span>
                                    )}</span>
  </div>
  <div class=" flex flex-col">
    <span className='mr-2'>M2</span>
    <span className='ml-2'>   {item.month2ActualCompletedValue && (
                                        <span>
                                            {item.currencyInd && `${item.userCurrency} `}
                                            {item.month2ActualCompletedValue}
                                        </span>
                                    )}</span>
    {/* <span className='ml-2'>{`${item.month2CompletedValue}`}</span> */}
  </div>
  <div class=" flex flex-col">
    <span className='mr-2'>M3</span>
    <span className='ml-2'>   {item.month3ActualCompletedValue && (
                                        <span>
                                            {item.currencyInd && `${item.userCurrency} `}
                                            {item.month3ActualCompletedValue}
                                        </span>
                                    )}</span>
    {/* <span className='ml-2'>{`${item.month3ActualCompletedValue}`}</span> */}
  </div>
              </div>
              
              {/* )} */}
              </>
            )}
                               </div>
                  </div>

                  <div className=" flex mt-[1rem] ml-4" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                    {editContactId === item.userKpiLinkId ? (
                        <>
                      <Button onClick={() => handleUpdateContact(item.userKpiLinkId, item.month1ActualCompletedValue,item.month2ActualCompletedValue,item.month3ActualCompletedValue)}>
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
                        style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
                      />
                    )}
                  </div>
                              </div>
                 

                              
                             
                            </div>
                        </div>


                    )
                })}
                    
      </div>
     )}

   
   
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  kpi,
  employee
}) => ({
    userKpiList:employee.userKpiList,
    kpiListData: kpi.kpiListData,
  userId:auth.userDetails.userId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserKpiList,
      updateActualValue,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UserKpiList);

