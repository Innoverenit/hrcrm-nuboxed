import React, { useState,useEffect,useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
import { Tabs,Select } from 'antd';
import {getEmployeeKpiList,updateCompletedValue} from "../../../../Main/Teams/TeamsAction"
import BorderColorIcon from '@mui/icons-material/BorderColor';
const { TabPane } = Tabs;
const PerformanceTable = (props) => {
  const { translatedMenuItems } = props;
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [editedFields, setEditedFields] = useState({});
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
    await props.getEmployeeKpiList(props.employeeId,selectedYear,tabKey);
  };

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

  const handleUpdateContact = (userKpiLinkId,  month1CompletedValue,month2CompletedValue,month3CompletedValue) => {
    const data = {
        userKpiLinkId: userKpiLinkId, 
       employeeId: props.employeeId,
       month1CompletedValue: editedFields[userKpiLinkId]?.month1CompletedValue !== undefined ? editedFields[userKpiLinkId].month1CompletedValue : month1CompletedValue,
       month2CompletedValue: editedFields[userKpiLinkId]?.month2CompletedValue !== undefined ? editedFields[userKpiLinkId].month2CompletedValue : month2CompletedValue,
       month3CompletedValue: editedFields[userKpiLinkId]?.month3CompletedValue !== undefined ? editedFields[userKpiLinkId].month3CompletedValue : month3CompletedValue,
    };
  
    props.updateCompletedValue(data, props.employeeId,)
     
     
      setEditedFields((prevFields) => ({ ...prevFields, [userKpiLinkId]: undefined }));
      setEditContactId(null);
    
  };
  const handleYearChange = async (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
  
   
  };
  

  return (
    <>
           <div class="flex flex-col justify-between  pr-2 max-sm:flex-col">
              <div class=" w-[15%]">
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
      <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        {props.employeeKpiList.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between mt-4" 
            //   style={{ borderBottom: '3px dotted #515050' }}
              >
                <div className="flex justify-between w-2/3">
                 
                  <div className="Ccard__title w-40">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Name
                    </div>
                  
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        {item.kpiName}
                        </div>
                   
                  </div>
                
                  {/* <div className="Ccard__title w-28">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Frequency
                    </div>
                
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <span>
                          {item.frequency} 
                        </span>
                      </div>
                  
                  </div> */}
                  <div className="Ccard__title w-36">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Assigned
                    </div>
                    {item.assignedValue && (
                      <div className="font-normal text-sm text-cardBody font-poppins">
                       {` ${item.assignedValue} ${item.userCurrency}`}
                        </div>
                    )}
                  
                  </div>
                  <div className="Ccard__title w-[9rem]">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Achieved 
                    </div>
                    {editContactId === item.userKpiLinkId ? (
                      <>
                      {/* <div class=" flex flex-row"> */}
                      <input
                      style={{border:"2px solid black"}}
                      placeholder="Month1"
                        value={editedFields[item.userKpiLinkId]?.month1CompletedValue !== undefined ? editedFields[item.userKpiLinkId].month1CompletedValue : item.month1CompletedValue}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (!isNaN(inputValue)) { // Check if the input is a number
                              handleChange(item.userKpiLinkId, 'month1CompletedValue', inputValue);
                          } else {
                            alert("Please enter  number.");
                         
                          }
                      }}
                      />
                      <input
                      placeholder="Month2"
                      style={{border:"2px solid black"}}
                        value={editedFields[item.userKpiLinkId]?.month2CompletedValue !== undefined ? editedFields[item.userKpiLinkId].month2CompletedValue : item.month2CompletedValue}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (!isNaN(inputValue)) { // Check if the input is a number
                              handleChange(item.userKpiLinkId, 'month2CompletedValue', inputValue);
                          } else {
                            alert("Please enter  number.");
                         
                          }
                      }}
                      />
                      <input
                      placeholder="Month3"
                      style={{border:"2px solid black"}}
                        value={editedFields[item.userKpiLinkId]?.month3CompletedValue !== undefined ? editedFields[item.userKpiLinkId].month3CompletedValue : item.month3CompletedValue}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (!isNaN(inputValue)) { // Check if the input is a number
                              handleChange(item.userKpiLinkId, 'month3CompletedValue', inputValue);
                          } else {
                            alert("Please enter  number.");
                         
                          }
                      }}
                      />
                      {/* </div> */}
                      </>
                    ) : (
                      <>
                      {/* {item.completedValue && ( */}
                      <div className="font-normal text-sm text-cardBody font-poppins">
                        <span> {` ${item.month1CompletedValue}${item.month2CompletedValue} ${item.month3CompletedValue} 
                        `}
                       
                        </span>
                      </div>
                      {/* )} */}
                      </>
                    )}
                  </div>
                  <div className="Ccard__title w-36">
                    <div className="text-base text-cardBody font-medium font-poppins">
                    Actual
                    </div>
                    {item.actualCompletedValue && (
                      <div className="font-normal text-sm text-cardBody font-poppins">
  {` ${item.actualCompletedValue} ${item.userCurrency}`}
                        </div>
                          )} 
                  
                  </div>
                  <div className=" flex mt-[1rem] ml-4" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
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
                        style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
     )}
    </>
  );
};



const mapStateToProps = ({ auth,
    teams }) => ({
    employeeKpiList:teams.employeeKpiList,
  userId:auth.userDetails.userId,

 
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        getEmployeeKpiList,
        updateCompletedValue

    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PerformanceTable);









