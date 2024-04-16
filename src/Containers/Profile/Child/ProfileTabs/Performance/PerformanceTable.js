import React, { useState,useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs,Tooltip,Button } from 'antd';
import { FormattedMessage } from "react-intl";
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
       month1CompletedValue: parseFloat(editedFields[userKpiLinkId]?.month1CompletedValue !== undefined ? editedFields[userKpiLinkId].month1CompletedValue : month1CompletedValue),
      //  month1CompletedValue: editedFields[userKpiLinkId]?.month1CompletedValue !== undefined ? editedFields[userKpiLinkId].month1CompletedValue : month1CompletedValue,
      //  month2CompletedValue: editedFields[userKpiLinkId]?.month2CompletedValue !== undefined ? editedFields[userKpiLinkId].month2CompletedValue : month2CompletedValue,
       month2CompletedValue: parseFloat(editedFields[userKpiLinkId]?.month2CompletedValue !== undefined ? editedFields[userKpiLinkId].month2CompletedValue : month2CompletedValue),
       month3CompletedValue: parseFloat(editedFields[userKpiLinkId]?.month3CompletedValue !== undefined ? editedFields[userKpiLinkId].month3CompletedValue : month3CompletedValue),
      
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
  <div className=' flex  justify-center  sticky top-28 z-auto'>
  <div className="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
    <div className="flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
      <div className="md:w-[9.5rem]">
        <FormattedMessage id="app.kpi" defaultMessage="KPI" />
      </div>
      <div className="md:w-[11.5rem]">
        <FormattedMessage id="app.lob" defaultMessage="LOB" />
      </div>
      <div className="md:w-[10.1rem]">
        <FormattedMessage id="app.assigned" defaultMessage="Assigned" />
      </div>
      <div className="md:w-[7.11rem]">
        <FormattedMessage id="app.assigned" defaultMessage=" Total" />
      </div>
  
      <div className="md:w-[6.11rem]">
        <FormattedMessage id="app.achieved" defaultMessage="Achieved" />
      </div>
      <div className="md:w-[5.51rem]">
        <FormattedMessage id="app.achieved" defaultMessage=" Total" />
      </div>
      <div className="md:w-[5.01rem]">
        <FormattedMessage id="app.actual" defaultMessage="Actual" />
      </div>
      <div className="md:w-[2.1rem]">
        <FormattedMessage id="app.actual" defaultMessage="Total" />

      </div>
      <div className="md:w-[10.1rem]"><FormattedMessage
         id="app.weightage"
         defaultMessage="Weightage"
       /></div>
        <div className="w-[4.2rem]"></div>
    </div>

    {props.employeeKpiList.map((item, index) => {


    const AssignedTotal = Math.floor(item.month1AssignedValue + item.month2AssignedValue +item.month3AssignedValue) ;
    const AchievedTotal = Math.floor(item.month1CompletedValue + item.month2CompletedValue +item.month3CompletedValue) ;
const ActualTotal = Math.floor(item.month1ActualCompletedValue + item.month2ActualCompletedValue +item.month3ActualCompletedValue) ;
    // + item.month1CompletedValue + item.month2CompletedValue + item.month3CompletedValue + item.month1ActualCompletedValue + item.month2ActualCompletedValue + item.month3ActualCompletedValue );
     return (
     <>
      <div key={index} className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3">
        <div className="flex font-medium flex-col md:w-[13rem] max-sm:flex-row w-full max-sm:justify-between">
          <div className="flex max-sm:w-full items-center">
            <div className="max-sm:w-full">
              <Tooltip>
                <div className="flex max-sm:w-full justify-between flex-row md:flex-col w-[9rem]">
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

        <div className="flex font-medium flex-col md:w-[19.32rem] max-sm:flex-row w-full max-sm:justify-between">
          <div className="text-sm text-cardBody font-poppins">
     
     <>
              <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                <div className="flex flex-col items-center">
                  <span className="mr-2">M1</span>
                  <span className='ml-2 w-20'>
                   {item.month1AssignedValue && (
<span>
{item.currencyInd && `${item.userCurrency} `}
{item.month1AssignedValue/ 10000}k 
</span>
)}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="mr-2">M2</span>
                  <span className='ml-2 w-20'>{item.month2AssignedValue && (
<span>
{item.currencyInd && `${item.userCurrency} `}
{item.month2AssignedValue/ 10000}k 
</span>
)}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="mr-2 ">M3</span>
        
                            <span className='ml-2 w-20'>{item.month3AssignedValue && (
<span>
{item.currencyInd && `${item.userCurrency} `}
{item.month3AssignedValue/ 10000}k 
</span>
)}</span>
                </div> 
              </div>
              </>
  
          </div>
        </div>
        <div className="flex font-medium flex-col md:w-[7.3rem] max-sm:flex-row w-full max-sm:justify-between">
          <div className="text-sm text-cardBody font-poppins">
            <>
              <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
              {item.month3AssignedValue && (
                <span>
               {item.currencyInd && `${item.userCurrency} `}{AssignedTotal/ 10000}k
               </span>
             )}
              </div>
            </>
          </div>
        </div>
   
        <div className="flex font-medium flex-col md:w-[18.3rem] max-sm:flex-row w-full max-sm:justify-between">
          <div className="text-sm text-cardBody font-poppins">
            <>
            {editContactId === item.userKpiLinkId ? (
        <>
        <div class=" flex flex-row">
        <input
        style={{border:"2px solid black",width:"6rem"}}
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
        &nbsp;
        <input
        placeholder="Month2"
        style={{border:"2px solid black",width:"6rem"}}
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
           &nbsp;
        <input
        placeholder="Month3"
        style={{border:"2px solid black",width:"6rem"}}
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
           &nbsp;
        </div>
        </>
      ) : (
        <>
              <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                <div className="flex flex-col">
                  <span className="mr-2">M1</span>
                  <span className='ml-2'>   {item.month1CompletedValue && (
                                <span>
                                    {item.currencyInd && `${item.userCurrency} `}
                                    {item.month1CompletedValue/ 10000}k
                                </span>
                            )}</span>
                </div>
                <div className="flex flex-col">
                  <span className="mr-2">M2</span>
                  <span className='ml-2'>   {item.month2CompletedValue && (
                                <span>
                                    {item.currencyInd && `${item.userCurrency} `}
                                    {item.month2CompletedValue/ 10000}k
                                </span>
                            )}</span>
                </div>
                <div className="flex flex-col">
                  <span className="mr-2">M3</span>
                  <span className='ml-2'>   {item.month3CompletedValue && (
                                <span>
                                    {item.currencyInd && `${item.userCurrency} `}
                                    {item.month3CompletedValue/ 10000}k
                                </span>
                            )}</span>
                </div>
              </div>
              </>
      )}
            </>
          </div>
        </div>
        <div className="flex font-medium flex-col md:w-[11.13rem] max-sm:flex-row w-full max-sm:justify-between">
          <div className="text-sm text-cardBody font-poppins">
            <>
              <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
              {item.month3CompletedValue && (
              <span>
               {item.currencyInd && `${item.userCurrency} `}{AchievedTotal/ 10000}k
               </span>
                )}
              </div>
            </>
          </div>
        </div>
        <div className="flex font-medium flex-col md:w-[19.3rem]  max-sm:flex-row w-full max-sm:justify-between">
          <div className="text-sm text-cardBody font-poppins">
            <>
              <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
                <div className="flex flex-col">
                  <span className="mr-2">M1</span>
                  <span className='ml-2'>   {item.month1ActualCompletedValue && (
                                <span>
                                    {item.currencyInd && `${item.userCurrency} `}
                                    {item.month1ActualCompletedValue/ 10000}k
                                </span>
                            )}</span>
                </div>
                <div className="flex flex-col">
                  <span className="mr-2">M2</span>
                  <span className='ml-2'>   {item.month2ActualCompletedValue && (
                                <span>
                                    {item.currencyInd && `${item.userCurrency} `}
                                    {item.month2ActualCompletedValue/ 10000}k
                                </span>
                            )}</span>
                </div>
                <div className="flex flex-col">
                  <span className="mr-2">M3</span>
                  <span className='ml-2'>   {item.month3ActualCompletedValue && (
                                <span>
                                    {item.currencyInd && `${item.userCurrency} `}
                                    {item.month3ActualCompletedValue/ 10000}k
                                </span>
                            )}</span>
                </div>
              </div>
            </>
          </div>
        </div>
        <div className="flex font-medium flex-col md:w-[5.1rem] max-sm:flex-row w-full max-sm:justify-between">
          <div className="text-sm text-cardBody font-poppins">
            <>
              <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
              {item.month3ActualCompletedValue && (
               <span>
               {item.currencyInd && `${item.userCurrency} `}{ActualTotal/ 10000}k
               </span>
             )}
              </div>
            </>
          </div>
        </div>
        <div className=" flex font-medium flex-col md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                          
                          <div class="text-sm text-cardBody font-poppins">
           
            <div className="font-normal text-sm text-cardBody font-poppins">
             {item.weitageValue && (
                               <span>
                                   {/* {item.currencyInd && `${item.userCurrency} `} */}
                                   {item.weitageValue}%
                               </span>
                           )}
            </div>
         
                          </div>
                      </div>
                      <div className=" flex  ml-8" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
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
                    
      </div>
    
      </>
     );
               
})}
  </div>
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


{/* <div className=' flex  justify-center  sticky top-28 z-auto'>
<div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
<div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
<div className=" md:w-[4.5rem]">
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
            <div className="md:w-[10.1rem]"><FormattedMessage
        id="app.actual"
        defaultMessage="Actual"
      /></div>




</div>


{props.employeeKpiList.map((item) => { 


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
                                      
{item.kpiName}


                                  </div>
                                  </div>
                              </Tooltip>
                              </div>
                              </div>
                      </div>
                      <div class="flex">

                  
                  <div className=" flex font-medium flex-col md:w-[14.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                         
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
                     <div className=" flex font-medium flex-col md:w-[18.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                         
                         <div class="text-sm text-cardBody font-poppins">
                         {editContactId === item.userKpiLinkId ? (
        <>
        <div class=" flex flex-row">
        <input
        style={{border:"2px solid black",width:"6rem"}}
        placeholder="Month1"
          value={editedFields[item.userKpiLinkId]?.month1CompletedValue !== undefined ? editedFields[item.userKpiLinkId].month1CompletedValue : item.month1CompletedValue}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!isNaN(inputValue)) { 
                handleChange(item.userKpiLinkId, 'month1CompletedValue', inputValue);
            } else {
              alert("Please enter  number.");
           
            }
        }}
        />
        &nbsp;
        <input
        placeholder="Month2"
        style={{border:"2px solid black",width:"6rem"}}
          value={editedFields[item.userKpiLinkId]?.month2CompletedValue !== undefined ? editedFields[item.userKpiLinkId].month2CompletedValue : item.month2CompletedValue}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!isNaN(inputValue)) { 
                handleChange(item.userKpiLinkId, 'month2CompletedValue', inputValue);
            } else {
              alert("Please enter  number.");
           
            }
        }}
        />
           &nbsp;
        <input
        placeholder="Month3"
        style={{border:"2px solid black",width:"6rem"}}
          value={editedFields[item.userKpiLinkId]?.month3CompletedValue !== undefined ? editedFields[item.userKpiLinkId].month3CompletedValue : item.month3CompletedValue}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!isNaN(inputValue)) { 
                handleChange(item.userKpiLinkId, 'month3CompletedValue', inputValue);
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

        <div className="font-normal flex flex-row text-sm text-cardBody font-poppins">
        <div class=" flex flex-col">
<span className='mr-2'>Month 1</span>
<span className='ml-2'>   {item.month1CompletedValue && (
                                  <span>
                                      {item.currencyInd && `${item.userCurrency} `}
                                      {item.month1CompletedValue}
                                  </span>
                              )}</span>
</div>
<div class=" flex flex-col">
<span className='mr-2'>Month 2</span>
<span className='ml-2'>   {item.month2CompletedValue && (
                                  <span>
                                      {item.currencyInd && `${item.userCurrency} `}
                                      {item.month2CompletedValue}
                                  </span>
                              )}</span>

</div>
<div class=" flex flex-col">
<span className='mr-2'>Month 3</span>
<span className='ml-2'>   {item.month3CompletedValue && (
                                  <span>
                                      {item.currencyInd && `${item.userCurrency} `}
                                      {item.month3CompletedValue}
                                  </span>
                              )}</span>

</div>
        </div>
        
    
        </>
      )}
                         </div>
                     </div>
                    <div className=" flex font-medium flex-col md:w-[5.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                    {item.actualCompletedValue && (
        <div className="font-normal text-sm text-cardBody font-poppins">
{` ${item.actualCompletedValue} ${item.userCurrency}`}
          </div>
            )} 
                    </div>
                  
                    </div>
                    <div className=" flex  ml-8" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
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
                   

                    
                   
                  </div>
              </div>


          )
      })}
          
</div>
</div> */}











