import React, { useEffect, useState, useMemo,useRef, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select, Tooltip,Progress } from "antd"
import { Tabs } from 'antd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
 import {getUserKpiList,updateActualValue} from "../../../EmployeeAction"
// import {getKpis} from "../../../../Settings/Category/KPI/KPIAction"
import { Button } from 'antd';

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
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "",//0 Fiscal Year
          "",//1 Select Year
           "154",//2  Submit
        "76" , //  Assigned"3
        "" ,//  Total4
        "" , //  Achieved5
        "" ,  //  "Actual6
        "" ,  //  Weightage7
        "66" , //  Month8
        "1078" , //  Save9
        "1079" ,  //  Cancel10
          "170" , //  "Edit"11
                 
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
       
      } catch (error) {
   
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
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
  <div className=' flex  justify-center  sticky  z-auto'>
  <div className="rounded m-1 p-1  w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
    <div className="flex justify-between  h-10 w-[100%]  p-1 bg-transparent font-bold sticky z-10">
      <div className="md:w-[8.5rem]"> KPI
        {/* <FormattedMessage id="app.kpi" defaultMessage="KPI" /> */}
      </div>
      <div className="md:w-[7.5rem]"> LOB
        {/* <FormattedMessage id="app.lob" defaultMessage="LOB" /> */}
      </div>
     
      <div className="md:w-[11.1rem]">
      {translatedMenuItems[3]}    {/* <FormattedMessage id="app.assigned" defaultMessage="Assigned" /> */}
      </div>
      <div className="md:w-[9.11rem]">
      {translatedMenuItems[4]}    {/* <FormattedMessage id="app.assigned" defaultMessage=" Total" /> */}
      </div>
  
      <div className="md:w-[7.11rem]">
      {translatedMenuItems[5]}   {/* <FormattedMessage id="app.achieved" defaultMessage="Achieved" /> */}
      </div>
      <div className="md:w-[7.51rem]">
      {translatedMenuItems[4]}    {/* <FormattedMessage id="app.achieved" defaultMessage=" Total" /> */}
      </div>
      <div class="w-[2rem]"></div>
      <div className="md:w-[8.01rem]">
      {translatedMenuItems[6]}   {/* <FormattedMessage id="app.actual" defaultMessage="Actual" /> */}
      </div>
      <div className="md:w-[3.1rem]">
      {translatedMenuItems[4]}  {/* <FormattedMessage id="app.actual" defaultMessage="Total" /> */}

      </div>
      <div class="w-[2rem]"></div>
       <div className="md:w-[4.1rem]">{translatedMenuItems[7]} 
      {/* <FormattedMessage
         id="app.weightage"
         defaultMessage="Weightage"
       /> */}
       </div>
        {/* <div className="w-[2rem]"></div> */}
    </div>

    {props.userKpiList.map((item, index) => {


    const AssignedTotal = Math.floor(item.month1AssignedValue + item.month2AssignedValue +item.month3AssignedValue) ;
    const AchievedTotal = Math.floor(item.month1CompletedValue + item.month2CompletedValue +item.month3CompletedValue) ;
const ActualTotal = Math.floor(item.month1ActualCompletedValue + item.month2ActualCompletedValue +item.month3ActualCompletedValue) ;
const actualPercentage = AssignedTotal !== 0 ? Math.floor((ActualTotal / AssignedTotal) * 100) : 0;
const acivedPercentage = AssignedTotal !== 0 ? Math.floor((item.completedValue / AssignedTotal) * 100) : 0;
     return (
     <>
      <div key={index} className="flex rounded justify-between bg-white mt-[0.5rem] h-8 items-center p-1">
        <div className="flex  md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between ">
          <div className="flex max-sm:w-full items-center">
            <div className="max-sm:w-full">
              <Tooltip>
                <div className="flex max-sm:w-full justify-between flex-row md:flex-col w-[9rem]">
                  <div className="text-xs text-blue-500  font-poppins font-semibold cursor-pointer">
                    {item.kpiName}
                  </div>
                </div>
              </Tooltip>
            </div>
         
          </div>
        </div>
        <div className="flex  md:w-[17rem] max-sm:flex-row w-full max-sm:justify-between">
          <div className="text-xs  font-poppins">
            <>

<div className=" text-xs  font-poppins">{item.lobName}</div>

            </>
          </div>
        </div>
    

        <div className="flex  md:w-[26.32rem] max-sm:flex-row w-full max-sm:justify-between">
          <div className="text-xs  font-poppins">
          <>
<div className=" flex flex-row text-xs  font-poppins">
 <div className="flex flex-col w-[4rem] items-center">
   <span className="mr-2  !text-tab">M1</span>
   <span className='ml-2 w-20'>
    {item.month1AssignedValue && (
<span>
{item.currencyInd && `${item.userCurrency} `}
{Math.floor(item.month1AssignedValue/ 1000)}k 
</span>
)}</span>
 </div>
 <div className="flex flex-col w-[4rem] items-center">
   <span className="mr-2  !text-tab">M2</span>
   <span className='ml-2 w-20'>{item.month2AssignedValue && (
<span>
{item.currencyInd && `${item.userCurrency} `}
{Math.floor(item.month2AssignedValue/ 1000)}k 
</span>
)}</span>
 </div>
 <div className="flex flex-col w-[4rem] items-center">
   <span className="mr-2  !text-tab ">M3</span>

             <span className='ml-2 w-20'>{item.month3AssignedValue && (
<span>
{item.currencyInd && `${item.userCurrency} `}
{Math.floor(item.month3AssignedValue/ 1000)}k 
</span>
)}</span>
 </div> 
</div>
</>
          </div>
        </div>
        <div className="flex  md:w-[13.3rem] max-sm:flex-row w-full max-sm:justify-between">
          <div className="text-xs  font-poppins">
            <>
              <div className=" flex flex-row text-xs  font-poppins">
              {item.month3AssignedValue && (
    <span>
        {item.currencyInd && `${item.userCurrency} `}
        {Math.floor(AssignedTotal / 1000)}k
    </span>
)}
              </div>
            </>
          </div>
        </div>
   
        <div className="flex  md:w-[28.3rem] max-sm:flex-row w-full max-sm:justify-between">
        <div className="text-xs  font-poppins">
          <>
     
            <div className=" flex flex-row text-xs  font-poppins">
              <div className="flex flex-col items-center">
                <span className="mr-2  !text-tab">M1</span>
                <span className='ml-2 w-[4rem]'>   {item.month1CompletedValue && (
                              <span>
                                  {item.currencyInd && `${item.userCurrency} `}
                                  {(item.month1CompletedValue / 1000).toFixed(2)}k
                              </span>
                          )}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="mr-2  !text-tab">M2</span>
                <span className='ml-2 w-[4rem]'>   {item.month2CompletedValue && (
                              <span>
                                  {item.currencyInd && `${item.userCurrency} `}
                                  {(item.month2CompletedValue / 1000).toFixed(2)}k
                              </span>
                          )}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="mr-2  !text-tab">M3</span>
                <span className='ml-2 w-[4rem]'>   {item.month3CompletedValue && (
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
        <div className="text-xs  font-poppins">
          <>
            <div className=" flex flex-row text-xs  font-poppins">
            {item.month3CompletedValue && (
            <span>
             {item.currencyInd && `${item.userCurrency} `}
             {(item.completedValue / 1000).toFixed(2)}k
             </span>
              )}
            </div>
          </>
        </div>
      </div>
      <div className=" flex   md:w-[5.5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
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
      <div className="flex  md:w-[24.3rem]  max-sm:flex-row w-full max-sm:justify-between">
        <div className="text-xs  font-poppins">
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
            <div className=" flex flex-row text-xs  font-poppins">
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
                <span className='ml-2 w-[5.5rem]'>
    {item.month3ActualCompletedValue && (
        <span>
            {item.currencyInd && `${item.userCurrency} `}
            {(item.month3ActualCompletedValue / 1000).toFixed(2)}k
        </span>
    )}
</span>
              </div>
            </div>
          </>
           )}
        </div>
      </div>
      <div className="flex  md:w-[9.1rem] max-sm:flex-row w-full max-sm:justify-between">
        <div className="text-xs  font-poppins">
          <>
            <div className=" flex flex-row text-xs  font-poppins">
            {item.month3ActualCompletedValue && (
    <span class=" w-[4rem]">
        {item.currencyInd && `${item.userCurrency} `}
        {(ActualTotal / 1000).toFixed(2)}k
    </span>
)}
            </div>
          </>
        </div>
      </div>
      <div className=" flex   md:w-[5.5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
         <div class=" text-xs  font-poppins">
         {/* <Tooltip title={item.oppStage}> */}
{" "}
<Progress
type="circle"
style={{ cursor: "pointer",color:"red" }}
percent={actualPercentage}
//disable={true}
width={30}
 strokeColor={"#005075"}

/>
  
{/* </Tooltip> */}
      
         </div>
       </div>
<div className=" flex  md:w-[4.2rem] max-sm:flex-row w-full max-sm:justify-between ">
           
           <div class="text-xs  font-poppins">

<div className=" text-xs  font-poppins">
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
              <Button onClick={() => handleUpdateContact(item.userKpiLinkId, item.month1ActualCompletedValue,item.month2ActualCompletedValue,item.month3ActualCompletedValue)}>
              {translatedMenuItems[9]}   {/* Save */}
             </Button>
               <Button onClick={() => handleCancelClick(item.userKpiLinkId)} style={{ marginLeft: '0.5rem' }}>
               {translatedMenuItems[10]}   {/* Cancel */}
             </Button>
             </>
             
           ) : (
             <BorderColorIcon
               tooltipTitle={translatedMenuItems[11]} 
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
  currency:auth.userDetails.currency,
  
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

// <div class="rounded-lg m-5 p-2 w-[97%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
// <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
// <div className=" md:w-[8.5rem]">
// <FormattedMessage
//         id="app.name"
//         defaultMessage="Name"
//       /></div>


//                <div className=" md:w-[7.1rem]"><FormattedMessage
//         id="app.assigned"
//         defaultMessage="Assigned"
//       /></div>
//        <div className="md:w-[10.1rem]"><FormattedMessage
//         id="app.achieved"
//         defaultMessage="Achieved"
//       /></div>
//            <div className="md:w-[14.1rem]"><FormattedMessage
//         id="app.actual"
//         defaultMessage="Actual"
//       /></div>
    




// </div>


// {props.userKpiList.map((item) => { 


//           return (
//               <div>
//                   <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
//                       >
                           
//                            <div className=" flex  md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
// <div className="flex max-sm:w-full items-center"> 

// <div class="max-sm:w-full">
//                               <Tooltip>
//                                 <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                
//                                   <div class="text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                                      
// {item.kpiName}


//                                   </div>
//                                   </div>
//                               </Tooltip>
//                               </div>
//                               </div>
//                       </div>
//                       <div class="flex">

                  
//                   <div className=" flex  md:w-[12.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                         
//                          <div class="text-xs  font-poppins">
    
//            <div className=" text-xs  font-poppins">
//            {item.assignedValue && (
//                               <span>
//                                   {item.currencyInd && `${item.userCurrency} `}
//                                   {item.assignedValue}
//                               </span>
//                           )}
//            </div>
      
//                          </div>
//                      </div>
//                      <div className=" flex  md:w-[16.3rem]  max-sm:flex-row w-full max-sm:justify-between">
//                      {item.completedValue && (
//                               <span>
//                                   {item.currencyInd && `${item.userCurrency} `}
//                                   {item.completedValue}
//                               </span>
//                           )}
//                   </div>
//                   <div className="Ccard__title w-[15rem]">
//                   <div class="text-xs  font-poppins">
//                      {editContactId === item.userKpiLinkId ? (
//     <>
//     <div class=" flex flex-row">
//     <input
//     style={{border:"2px solid black",width:"6rem"}}
//     placeholder="Month1"
//       value={editedFields[item.userKpiLinkId]?.month1ActualCompletedValue !== undefined ? editedFields[item.userKpiLinkId].month1ActualCompletedValue : item.month1ActualCompletedValue}
//       onChange={(e) => {
//         const inputValue = e.target.value;
//         if (!isNaN(inputValue)) { 
//             handleChange(item.userKpiLinkId, 'month1ActualCompletedValue', inputValue);
//         } else {
//           alert("Please enter  number.");
       
//         }
//     }}
//     />
//     &nbsp;
//     <input
//     placeholder="Month2"
//     style={{border:"2px solid black",width:"6rem"}}
//       value={editedFields[item.userKpiLinkId]?.month2ActualCompletedValue !== undefined ? editedFields[item.userKpiLinkId].month2ActualCompletedValue : item.month2ActualCompletedValue}
//       onChange={(e) => {
//         const inputValue = e.target.value;
//         if (!isNaN(inputValue)) { 
//             handleChange(item.userKpiLinkId, 'month2ActualCompletedValue', inputValue);
//         } else {
//           alert("Please enter  number.");
       
//         }
//     }}
//     />
//        &nbsp;
//     <input
//     placeholder="Month3"
//     style={{border:"2px solid black",width:"6rem"}}
//       value={editedFields[item.userKpiLinkId]?.month3ActualCompletedValue !== undefined ? editedFields[item.userKpiLinkId].month3ActualCompletedValue : item.month3ActualCompletedValue}
//       onChange={(e) => {
//         const inputValue = e.target.value;
//         if (!isNaN(inputValue)) { 
//             handleChange(item.userKpiLinkId, 'month3ActualCompletedValue', inputValue);
//         } else {
//           alert("Please enter  number.");
       
//         }
//     }}
//     />
//        &nbsp;
//     </div>
//     </>
//   ) : (
//     <>

//     <div className=" flex  flex-row text-xs  font-poppins">
//     <div class=" flex flex-col">
// <span className='mr-2'>M1</span>
// <span className='ml-2'>   {item.month1ActualCompletedValue && (
//                               <span>
//                                   {item.currencyInd && `${item.userCurrency} `}
//                                   {item.month1ActualCompletedValue}
//                               </span>
//                           )}</span>
// </div>
// <div class=" flex flex-col">
// <span className='mr-2'>M2</span>
// <span className='ml-2'>   {item.month2ActualCompletedValue && (
//                               <span>
//                                   {item.currencyInd && `${item.userCurrency} `}
//                                   {item.month2ActualCompletedValue}
//                               </span>
//                           )}</span>
// {/* <span className='ml-2'>{`${item.month2CompletedValue}`}</span> */}
// </div>
// <div class=" flex flex-col">
// <span className='mr-2'>M3</span>
// <span className='ml-2'>   {item.month3ActualCompletedValue && (
//                               <span>
//                                   {item.currencyInd && `${item.userCurrency} `}
//                                   {item.month3ActualCompletedValue}
//                               </span>
//                           )}</span>
// {/* <span className='ml-2'>{`${item.month3ActualCompletedValue}`}</span> */}
// </div>
//     </div>
    
 
//     </>
//   )}
//                      </div>
//         </div>

//         <div className=" flex mt-[1rem] ml-4" style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.1 ))' }} >
//           {editContactId === item.userKpiLinkId ? (
//               <>
//             <Button onClick={() => handleUpdateContact(item.userKpiLinkId, item.month1ActualCompletedValue,item.month2ActualCompletedValue,item.month3ActualCompletedValue)}>
//               Save
//             </Button>
//               <Button onClick={() => handleCancelClick(item.userKpiLinkId)} style={{ marginLeft: '0.5rem' }}>
//               Cancel
//             </Button>
//             </>
            
//           ) : (
//             <BorderColorIcon
//               tooltipTitle="Edit"
//               iconType="edit"
//               onClick={() => handleEditClick(item.userKpiLinkId)}
//               style={{ color: 'blue', display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}
//             />
//           )}
//         </div>
//                     </div>
       

                    
                   
//                   </div>
//               </div>


//           )
//       })}
          
// </div>