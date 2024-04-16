import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select, Tooltip } from "antd"
import { DeleteOutlined } from "@ant-design/icons";
import { MainWrapper } from "../../../../Components/UI/Layout";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {getEmployeeKpiList,deleteKpiData,updateAssignedValue} from "../TeamsAction"
import { Button } from 'antd';
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function AssigenedKpiCardList(props) {

  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    props.getEmployeeKpiList(props.rowdata.employeeId, props.selectedYear, props.activeTab);
  }, [props.rowdata.employeeId, props.selectedYear, props.activeTab]);


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



  const handleUpdateAssigned = (userKpiLinkId,  month1AssignedValue,month2AssignedValue,month3AssignedValue,weitageValue) => {
    const data = {
        userKpiLinkId: userKpiLinkId, 
       employeeId: props.rowdata.employeeId,

       month1AssignedValue: parseFloat(editedFields[userKpiLinkId]?.month1AssignedValue !== undefined ? editedFields[userKpiLinkId].month1AssignedValue : month1AssignedValue),
      //  assignedValue: editedFields[userKpiLinkId]?.assignedValue !== undefined ? editedFields[userKpiLinkId].assignedValue : assignedValue,
      month2AssignedValue: parseFloat(editedFields[userKpiLinkId]?.month2AssignedValue !== undefined ? editedFields[userKpiLinkId].month2AssignedValue : month2AssignedValue), 
      month3AssignedValue: parseFloat(editedFields[userKpiLinkId]?.month3AssignedValue !== undefined ? editedFields[userKpiLinkId].month3AssignedValue : month3AssignedValue),         
       weitageValue: editedFields[userKpiLinkId]?.weitageValue !== undefined ? editedFields[userKpiLinkId].weitageValue : weitageValue,
    };
  
    props.updateAssignedValue(data, props.rowdata.employeeId,)
     
     
      setEditedFields((prevFields) => ({ ...prevFields, [userKpiLinkId]: undefined }));
      setEditContactId(null);
    
  };


  return (
    <>
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
                   {editContactId === item.userKpiLinkId ? (
            <>
            <div class=" flex flex-row">
            <input
            style={{border:"2px solid black",width:"4rem"}}
            placeholder="Month1"
              value={editedFields[item.userKpiLinkId]?.month1AssignedValue !== undefined ? editedFields[item.userKpiLinkId].month1AssignedValue : item.month1AssignedValue}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue)) { // Check if the input is a number
                    handleChange(item.userKpiLinkId, 'month1AssignedValue', inputValue);
                } else {
                  alert("Please enter  number.");
               
                }
            }}
            />
            &nbsp;
            <input
            placeholder="Month2"
            style={{border:"2px solid black",width:"4rem"}}
              value={editedFields[item.userKpiLinkId]?.month2AssignedValue !== undefined ? editedFields[item.userKpiLinkId].month2AssignedValue : item.month2AssignedValue}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue)) { // Check if the input is a number
                    handleChange(item.userKpiLinkId, 'month2AssignedValue', inputValue);
                } else {
                  alert("Please enter  number.");
               
                }
            }}
            />
               &nbsp;
            <input
            placeholder="Month3"
            style={{border:"2px solid black",width:"4rem"}}
              value={editedFields[item.userKpiLinkId]?.month3AssignedValue !== undefined ? editedFields[item.userKpiLinkId].month3AssignedValue : item.month3AssignedValue}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue)) { // Check if the input is a number
                    handleChange(item.userKpiLinkId, 'month3AssignedValue', inputValue);
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
          )}
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
                                 {editContactId === item.userKpiLinkId ? (
                  <input
                  style={{border:"2px solid black", width:"90%"}}
                  value={editedFields[item.userKpiLinkId]?.weitageValue !== undefined ? editedFields[item.userKpiLinkId].weitageValue : item.weitageValue}
                  onChange={(e) => {
                      const inputValue = e.target.value;
                      if (!isNaN(inputValue)) { // Check if the input is a number
                          handleChange(item.userKpiLinkId, 'weitageValue', inputValue);
                      } else {
                        alert("Please enter  number.");
                     
                      }
                  }}
              />
                 ) : (
                   <div className="font-normal text-sm text-cardBody font-poppins">
                    {item.weitageValue && (
                                      <span>
                                          {/* {item.currencyInd && `${item.userCurrency} `} */}
                                          {item.weitageValue}%
                                      </span>
                                  )}
                   </div>
                 )}
                                 </div>
                             </div>
                             <div className=" flex  ml-8" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                  {editContactId === item.userKpiLinkId ? (
                      <>
                    <Button onClick={() => handleUpdateAssigned(item.userKpiLinkId, item.month1AssignedValue,item.month2AssignedValue,item.month3AssignedValue,item.weitageValue)}>
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
                              <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                  <div class=" text-sm text-cardBody font-poppins text-center">
                                  <StyledPopconfirm
                title="Do you want to delete?"
                onConfirm={() => props.deleteKpiData(item.userKpiLinkId)}
                >
           <Tooltip title="Delete">
                <DeleteOutlined
                  type="delete"
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: "1rem",
                  }}
                />
             </Tooltip>
              </StyledPopconfirm>

                                  </div>
                              </div>
             </div>
           
             </>
            );
                      
})}
         </div>
       </div>
   
   
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  teams
}) => ({
    employeeKpiList:teams.employeeKpiList,
  userId:auth.userDetails.userId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getEmployeeKpiList,
        deleteKpiData,
        updateAssignedValue
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AssigenedKpiCardList);

{/* <div className=' flex justify-end sticky top-28 z-auto'>
<div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        <div className=" flex justify-between w-[96%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[12.5rem]">
      <FormattedMessage
                id="app.name"
                defaultMessage="Name"
              /></div>
                 <div className=" md:w-[11.5rem]">
      <FormattedMessage
                id="app.lob"
                defaultMessage="LOB"
              /></div>
              
                     <div className=" md:w-[13.1rem]"><FormattedMessage
                id="app.assigned"
                defaultMessage="Assigned"
              /></div>
               <div className="md:w-[8.1rem]"><FormattedMessage
                id="app.achieved"
                defaultMessage="Achieved"
              /></div>
                    <div className="md:w-[10.1rem]"><FormattedMessage
                id="app.actual"
                defaultMessage="Actual"
              /></div>
                     <div className="md:w-[10.1rem]"><FormattedMessage
                id="app.weightage"
                defaultMessage="Weightage"
              /></div>
     
      
      <div className="w-[4.2rem]"></div>

    </div>
    <div class=" flex flex-col" >
    <div className="!h-[25vh] !mt-2" >
    {props.employeeKpiList.map((item) => { 
      
      
                  return (
                      <div>
                          <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                              >
                                   
                                   <div className=" flex font-medium flex-col md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
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
                              <div className=" flex font-medium flex-col md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

        <div class="max-sm:w-full">
                                      <Tooltip>
                                        <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                        
                                          <div class="text-sm  text-cardBody font-poppins ">
                                              
    {item.lobName}
   
     
                                          </div>
                                          </div>
                                      </Tooltip>
                                      </div>
                                      </div>
                              </div>
                              <div class="flex">



                          
                          <div className=" flex font-medium flex-col md:w-[23.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                 
                                 <div class="text-sm text-cardBody font-poppins">
                                 {editContactId === item.userKpiLinkId ? (
            <>
            <div class=" flex flex-row">
            <input
            style={{border:"2px solid black",width:"4rem"}}
            placeholder="Month1"
              value={editedFields[item.userKpiLinkId]?.month1AssignedValue !== undefined ? editedFields[item.userKpiLinkId].month1AssignedValue : item.month1AssignedValue}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue)) { 
                    handleChange(item.userKpiLinkId, 'month1AssignedValue', inputValue);
                } else {
                  alert("Please enter  number.");
               
                }
            }}
            />
            &nbsp;
            <input
            placeholder="Month2"
            style={{border:"2px solid black",width:"4rem"}}
              value={editedFields[item.userKpiLinkId]?.month2AssignedValue !== undefined ? editedFields[item.userKpiLinkId].month2AssignedValue : item.month2AssignedValue}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue)) { 
                    handleChange(item.userKpiLinkId, 'month2AssignedValue', inputValue);
                } else {
                  alert("Please enter  number.");
               
                }
            }}
            />
               &nbsp;
            <input
            placeholder="Month3"
            style={{border:"2px solid black",width:"4rem"}}
              value={editedFields[item.userKpiLinkId]?.month3AssignedValue !== undefined ? editedFields[item.userKpiLinkId].month3AssignedValue : item.month3AssignedValue}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue)) {
                    handleChange(item.userKpiLinkId, 'month3AssignedValue', inputValue);
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
  <span className='mr-2'>M1</span>
  <span className='ml-2 w-[6rem]'>   {item.month1AssignedValue && (
                                      <span>
                                          {item.currencyInd && `${item.userCurrency} `}
                                          {item.month1AssignedValue}
                                      </span>
                                  )}</span>
</div>
<div class=" flex flex-col">
  <span className='mr-2'>M2</span>
  <span className='ml-2 w-[6rem]'>   {item.month2AssignedValue && (
                                      <span>
                                          {item.currencyInd && `${item.userCurrency} `}
                                          {item.month2AssignedValue}
                                      </span>
                                  )}</span>

</div>
<div class=" flex flex-col">
  <span className='mr-2'>M3</span>
  <span className='ml-2 w-[7rem]'>   {item.month3AssignedValue && (
                                      <span>
                                          {item.currencyInd && `${item.userCurrency} `}
                                          {item.month3AssignedValue}
                                      </span>
                                  )}</span>
 
</div>
            </div>
            
     
            </>
          )}
                                 </div>
                             </div>
                             <div className=" flex font-normal flex-col md:w-[9.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                             {item.completedValue && (
                                      <span>
                                          {item.currencyInd && `${item.userCurrency} `}
                                          {item.completedValue}
                                      </span>
                                  )}
                          </div>
                            <div className=" flex font-normal flex-col md:w-[5.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                            {item.actualCompletedValue && (
                                      <span>
                                          {item.currencyInd && `${item.userCurrency} `}
                                          {item.actualCompletedValue}
                                      </span>
                                  )}
                            </div>
                            <div className=" flex font-medium flex-col md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                 
                                 <div class="text-sm text-cardBody font-poppins">
                                 {editContactId === item.userKpiLinkId ? (
                  <input
                  style={{border:"2px solid black", width:"90%"}}
                  value={editedFields[item.userKpiLinkId]?.weitageValue !== undefined ? editedFields[item.userKpiLinkId].weitageValue : item.weitageValue}
                  onChange={(e) => {
                      const inputValue = e.target.value;
                      if (!isNaN(inputValue)) { 
                          handleChange(item.userKpiLinkId, 'weitageValue', inputValue);
                      } else {
                        alert("Please enter  number.");
                     
                      }
                  }}
              />
                 ) : (
                   <div className="font-normal text-sm text-cardBody font-poppins">
                    {item.weitageValue && (
                                      <span>
                                         
                                          {item.weitageValue}%
                                      </span>
                                  )}
                   </div>
                 )}
                                 </div>
                             </div>
                            </div>
                            <div className=" flex  ml-8" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
                  {editContactId === item.userKpiLinkId ? (
                      <>
                    <Button onClick={() => handleUpdateAssigned(item.userKpiLinkId, item.month1AssignedValue,item.month2AssignedValue,item.month3AssignedValue,item.weitageValue)}>
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
                              <div className=" flex font-medium ml-2 flex-col md:w-[2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                  <div class=" text-sm text-cardBody font-poppins text-center">
                                  <StyledPopconfirm
                title="Do you want to delete?"
                 onConfirm={() => props.deleteKpiData(item.userKpiLinkId)}
                >
           <Tooltip title="Delete">
                <DeleteOutlined
                  type="delete"
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: "1rem",
                  }}
                />
             </Tooltip>
              </StyledPopconfirm>

                                  </div>
                              </div>

                            
                           
                          </div>
                      </div>


                  )
              })}
                 </div>
                 </div>
                  
    </div>
   
</div> */}