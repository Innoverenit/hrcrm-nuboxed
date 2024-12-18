import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select, Tooltip,Progress } from "antd"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {getLob} from "../../../Settings/Category/LOB/LOBAction"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {getEmployeeKpiList,deleteKpiData,updateAssignedValue} from "../TeamsAction"
import { Button } from 'antd';
import { StyledPopconfirm } from "../../../../Components/UI/Antd";

const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function AssigenedKpiCardList(props) {
  const [lob, setLob] = useState("");
  const [editedFields, setEditedFields] = useState({});
  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    props.getLob(props.orgId); 
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

  const handleEditClick = (userKpiLinkId,lobName) => {
    setEditContactId(userKpiLinkId);
    setLob(lobName);
  };
  const handleCancelClick = (userKpiLinkId) => {
    setEditedFields((prevFields) => ({ ...prevFields, [userKpiLinkId]: undefined }));
    setEditContactId(null);
  };
  const handleLobChange = (event) => {
    const lob = event.target.value;
    setLob(lob);
    // setSelectedUser("");
    // props.getDepartmentwiserUser(selected) // Assuming you want to pass the selected department and filtered roles to a parent component
  };



  const handleUpdateAssigned = (userKpiLinkId,  month1AssignedValue,month2AssignedValue,month3AssignedValue,weitageValue,lobName) => {
    const data = {
        userKpiLinkId: userKpiLinkId, 
       employeeId: props.rowdata.employeeId,

       month1AssignedValue: parseFloat(editedFields[userKpiLinkId]?.month1AssignedValue !== undefined ? editedFields[userKpiLinkId].month1AssignedValue : month1AssignedValue),
      //  assignedValue: editedFields[userKpiLinkId]?.assignedValue !== undefined ? editedFields[userKpiLinkId].assignedValue : assignedValue,
      month2AssignedValue: parseFloat(editedFields[userKpiLinkId]?.month2AssignedValue !== undefined ? editedFields[userKpiLinkId].month2AssignedValue : month2AssignedValue), 
      month3AssignedValue: parseFloat(editedFields[userKpiLinkId]?.month3AssignedValue !== undefined ? editedFields[userKpiLinkId].month3AssignedValue : month3AssignedValue),         
       weitageValue: editedFields[userKpiLinkId]?.weitageValue !== undefined ? editedFields[userKpiLinkId].weitageValue : weitageValue,
      //  lobName: editedFields[userKpiLinkId]?.lobName !== undefined ? editedFields[userKpiLinkId].lobName : lobName,
      lobDetailsId: lob,
    };
  
    props.updateAssignedValue(data, props.rowdata.employeeId,)
     
     
      setEditedFields((prevFields) => ({ ...prevFields, [userKpiLinkId]: undefined }));
      setEditContactId(null);
    
  };


  return (
    <>
<div className=' flex sticky z-auto'>
         <div className="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
           <div className="flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
             <div className="md:w-[9.5rem]">
             KPI
             </div>
             <div className="md:w-[7.5rem]">
             LOB
             </div>
             <div className="md:w-[9.1rem]">
             Assigned
             </div>
             <div className="md:w-[7.11rem]">
             Total
             </div>
         
             <div className="md:w-[10.11rem]">
             Achieved
             </div>
             <div className="md:w-[6.51rem]">
             Total
             </div>
             <div class="w-[2rem]"></div>
             <div className="md:w-[8.01rem]">
             Actual
      </div>
             <div className="md:w-[1.1rem]">
             Total

             </div>
             <div class="w-[2rem]"></div>
             <div className="md:w-[2.1rem]">Weightage</div>
               <div className="w-[1rem]"></div>
           </div>
 
           {props.employeeKpiList.map((item, index) => {
 
 
           const AssignedTotal = Math.floor(item.month1AssignedValue + item.month2AssignedValue +item.month3AssignedValue) ;
           const AchievedTotal = Math.floor(item.month1CompletedValue + item.month2CompletedValue +item.month3CompletedValue) ;
 const ActualTotal = Math.floor(item.month1ActualCompletedValue + item.month2ActualCompletedValue +item.month3ActualCompletedValue) ;
 const actualPercentage = AssignedTotal !== 0 ? Math.floor((ActualTotal / AssignedTotal) * 100) : 0;
 const acivedPercentage = AssignedTotal !== 0 ? Math.floor((AchievedTotal / AssignedTotal) * 100) : 0;
            return (
            <>
             <div key={index} className="flex rounded justify-between bg-white mt-[0.5rem] h-8 items-center p-1">
               <div className="flex  md:w-[13rem] max-sm:flex-row w-full max-sm:justify-between">
                 <div className="flex max-sm:w-full items-center">
                   <div className="max-sm:w-full">
                     <Tooltip>
                       <div className="flex max-sm:w-full justify-between flex-row md:flex-col w-[9rem]">
                         <div className="text-xstext-blue-500  font-poppins font-semibold cursor-pointer">
                           {item.kpiName}
                         </div>
                       </div>
                     </Tooltip>
                   </div>
                
                 </div>
               </div>
               <div className="flex  md:w-[17rem] max-sm:flex-row w-full max-sm:justify-between">
                 <div className="text-xs font-poppins">
                   <>
         
                   {editContactId === item.userKpiLinkId ? (
  <select
    className="customize-select"
    style={{ width: "50%" }}
    value={lob} 
    onChange={handleLobChange}
  >
    <option value="">Select</option>
    {props.lobListData.map((item, index) => (
      <option key={index} value={item.lobDetsilsId}>
        {item.name}
      </option>
    ))}
  </select>
) : (
  <div className="font-normal text-xs font-poppins">{item.lobName}</div>
)}
           
                   </>
                 </div>
               </div>
               {/* <div className="flex  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between">
                 <div className="text-xs font-poppins">
                   <>
         
           {props.rowdata.currency}
           
                   </>
                 </div>
               </div> */}
      
               <div className="flex  md:w-[32.32rem] max-sm:flex-row w-full max-sm:justify-between">
                 <div className="text-xs font-poppins">
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
                     <div className="font-normal flex flex-row text-xs font-poppins">
                       <div className="flex flex-col items-center">
                         <span className="mr-2">M1</span>
                         <span className='ml-2 w-[4rem]'>
                          {item.month1AssignedValue && (
   <span>
       {item.currencyInd && `${item.userCurrency} `}
       {Math.floor(item.month1AssignedValue/ 1000)}k 
   </span>
)}</span>
                       </div>
                       <div className="flex flex-col items-center">
                         <span className="mr-2">M2</span>
                         <span className='ml-2 w-[4rem]'>{item.month2AssignedValue && (
   <span>
       {item.currencyInd && `${item.userCurrency} `}
       {Math.floor(item.month2AssignedValue/ 1000)}k 
   </span>
)}</span>
                       </div>
                       <div className="flex flex-col items-center">
                         <span className="mr-2 ">M3</span>
               
                                   <span className='ml-2 w-[4rem]'>{item.month3AssignedValue && (
   <span>
       {item.currencyInd && `${item.userCurrency} `}
       {Math.floor(item.month3AssignedValue/ 1000)}k 
   </span>
)}</span>
                       </div> 
                     </div>
                     </>
          )}
                   </>
                 </div>
               </div>
               <div className="flex  md:w-[13.3rem] max-sm:flex-row w-full max-sm:justify-between">
                 <div className="text-xs font-poppins">
                   <>
                     <div className="font-normal flex flex-row text-xs font-poppins">
                     {item.month3AssignedValue && (
                       <span>
                      {item.currencyInd && `${item.userCurrency} `}{Math.floor(AssignedTotal / 1000)}k
                      </span>
                    )}
                     </div>
                   </>
                 </div>
               </div>
          
               <div className="flex  md:w-[33.3rem] max-sm:flex-row w-full max-sm:justify-between">
                 <div className="text-xs font-poppins">
                   <>
                     <div className="font-normal flex flex-row text-xs font-poppins">
                       <div className="flex flex-col items-center">
                         <span className="mr-2">M1</span>
                         <span className='ml-2  w-[4rem]'>   {item.month1CompletedValue && (
                                       <span>
                                           {item.currencyInd && `${item.userCurrency} `}
                                           {(item.month1CompletedValue / 1000).toFixed(2)}k
                                       </span>
                                   )}</span>
                       </div>
                       <div className="flex flex-col items-center">
                         <span className="mr-2">M2</span>
                         <span className='ml-2  w-[4rem]'>   {item.month2CompletedValue && (
                                       <span>
                                           {item.currencyInd && `${item.userCurrency} `}
                                           {(item.month2CompletedValue / 1000).toFixed(2)}k
                                       </span>
                                   )}</span>
                       </div>
                       <div className="flex flex-col items-center">
                         <span className="mr-2">M3</span>
                         <span className='ml-2  w-[4rem]'>   {item.month3CompletedValue && (
                                       <span>
                                           {item.currencyInd && `${item.userCurrency} `}
                                           {(item.month3CompletedValue / 1000).toFixed(2)}k
                                       </span>
                                   )}</span>
                       </div>
                     </div>
                   </>
                 </div>
               </div>
               <div className="flex  md:w-[11.13rem] max-sm:flex-row w-full max-sm:justify-between">
                 <div className="text-xs font-poppins">
                   <>
                     <div className="font-normal flex flex-row text-xs font-poppins">
                     {item.month3CompletedValue && (
                     <span>
                      {item.currencyInd && `${item.userCurrency} `}
                      {(AchievedTotal/ 1000).toFixed(2)}k
                      </span>
                       )}
                     </div>
                   </>
                 </div>
               </div>
               <div className=" flex   md:w-[7.5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
         <div class=" text-xs  font-poppins">
         {/* <Tooltip title={item.oppStage}> */}
{" "}
<Progress
type="circle"
style={{ cursor: "pointer",color:"red" }}
percent={acivedPercentage}
//disable={true}
width={30}
 strokeColor={"#005075"}

/>
  
{/* </Tooltip> */}
      
         </div>
       </div>
               <div className="flex  md:w-[15.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                 <div className="text-xs font-poppins">
                   <>
                     <div className="font-normal flex flex-row text-xs font-poppins">
                       <div className="flex flex-col items-center">
                         <span className="mr-2">M1</span>
                         <span className='ml-2 w-[4rem]'>   {item.month1ActualCompletedValue && (
                                       <span>
                                           {item.currencyInd && `${item.userCurrency} `}
                                           {(item.month1ActualCompletedValue / 1000).toFixed(2)}k
                                       </span>
                                   )}</span>
                       </div>
                       <div className="flex flex-col items-center">
                         <span className="mr-2">M2</span>
                         <span className='ml-2 w-[4rem]'>   {item.month2ActualCompletedValue && (
                                       <span>
                                           {item.currencyInd && `${item.userCurrency} `}
                                           {(item.month2ActualCompletedValue / 1000).toFixed(2)}k
                                       </span>
                                   )}</span>
                       </div>
                       <div className="flex flex-col items-center">
                         <span className="mr-2">M3</span>
                         <span className='ml-2 w-[5.5rem]'>   {item.month3ActualCompletedValue && (
                                       <span>
                                           {item.currencyInd && `${item.userCurrency} `}
                                           {(item.month3ActualCompletedValue / 1000).toFixed(2)}k
                                       </span>
                                   )}</span>
                       </div>
                     </div>
                   </>
                 </div>
               </div>
               <div className="flex  md:w-[11.1rem] max-sm:flex-row w-full max-sm:justify-between">
                 <div className="text-xs font-poppins">
                   <>
                     <div className="font-normal flex flex-row text-xs font-poppins">
                     {item.month3ActualCompletedValue && (
                      <span>
                      {item.currencyInd && `${item.userCurrency} `}
                      {(ActualTotal / 1000).toFixed(2)}k
                      </span>
                    )}
                     </div>
                   </>
                 </div>
               </div>
               <div className=" flex   md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
         
         <div class=" text-xs  font-poppins">
 
{" "}
<Progress
type="circle"
style={{ cursor: "pointer",color:"red" }}
percent={actualPercentage}
width={30}
 strokeColor={"#005075"}

/>
  

      
         </div>
       </div>
               <div className=" flex  md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                 
                                 <div class="text-xs font-poppins">
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
                   <div className="font-normal text-xs font-poppins">
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
                             <div class="flex flex-col w-[1rem] ml-1 max-sm:flex-row max-sm:w-auto">
                             <div  >
                  {editContactId === item.userKpiLinkId ? (
                      <>
                    <Button onClick={() => handleUpdateAssigned(item.userKpiLinkId, item.month1AssignedValue,item.month2AssignedValue,item.month3AssignedValue,item.weitageValue,item.lobName)}>
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
                              <div>
                                  

                                 
                                  <StyledPopconfirm
                title="Do you want to delete?"
                onConfirm={() => props.deleteKpiData(item.userKpiLinkId)}
                >
           <Tooltip title="Delete">
           <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
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
  teams,
  lob
}) => ({
    employeeKpiList:teams.employeeKpiList,
  userId:auth.userDetails.userId,
  lobListData: lob.lobListData,
  orgId:auth.userDetails.organizationId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getEmployeeKpiList,
        deleteKpiData,
        getLob,
        updateAssignedValue
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AssigenedKpiCardList);