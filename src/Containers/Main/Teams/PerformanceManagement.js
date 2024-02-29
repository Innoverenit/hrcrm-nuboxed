import React, {  useEffect, useState,lazy } from "react";
import { MultiAvatar2, } from '../../../Components/UI/Elements'
import {  Tooltip, Badge } from 'antd'
import { connect } from 'react-redux'
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { bindActionCreators } from 'redux'
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Select } from "antd";
import PlaceIcon from '@mui/icons-material/Place';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DraftsIcon from '@mui/icons-material/Drafts';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import styled from 'styled-components'
import { BundleLoader } from "../../../Components/Placeholder";
import { getreportingManager,handleperformanceDrawerModal } from "./TeamsAction";
const HandleperformanceModal = lazy(() => import("./HandleperformanceModal"));


const { Option } = Select;
function PerformanceManagement (props) {
  const [storedData,setStoredData]=useState({});
  const [rowdata, setrowdata] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState("");
  function handleSetCurrentCustomer(item) {
    setCurrentCustomer(item);
  }
  const handleRowData = (data) => {
    setrowdata(data);
  };
const handleStoredData=(locs)=>{
  setStoredData(locs);
}
useEffect(() => {
  props.getreportingManager(props.reptMngrId);
 
}, []);
function handleChange(data) {
  props.Candidatesorttype(props.userId,data);
  
}

const [currentCandidateId, setCurrentCandidateId] = useState("");
function handleSetCurrentCandidateId(candidateId) {
    setCurrentCandidateId(candidateId);
    
    console.log(candidateId);
  } 
  const [currentEmployeeId, setCurrentEmployeeId] = useState("");


function handleSetCurrentEmployeeId(employeeId,) {
  setCurrentEmployeeId(employeeId,);
 
}
  if (props.fetchingEmployee) {
    return <BundleLoader/>
  
    
;
  }
  const {
    fetchingEmployee,
    type,
    user,
    filteredData,
    fetchingEmployeeError,
    employees,
    handleEmployeeDrawerForAdmin,
    employeeDrawerVisibleForAdmin,
  } = props;

    return (
      
            <>
            
            <div class=" h-h86 overflow-auto overflow-x-auto">
             
            <div class="flex flex-wrap w-full justify-center max-sm:justify-between max-sm:flex-col max-sm:items-center"> 
                  
              {props.reportingManger.map((item) => {
                console.log("noOfDocPending",item.noOfDocPending)
      
                 return (
                  <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[9.5rem] 
                  text-[#444444] m-3 p-1 w-[16rem] flex flex-col  ">
                      <div class="w-[200] flex h-[200]">
                   <Tooltip 
                   title={item.country}
                   >
                 
                   </Tooltip>
                           <div class="flex flex-row max-sm:justify-start items-center" >     
                   <div >
                          <MultiAvatar2

                           primaryTitle={item.fullName}
                          
                            imgHeight={"1.8rem"}
                            imgWidth={"1.8rem"}
                            imgRadius={20}
                          />
                         </div>
                      
                      <div class="font-semibold ml-2 ">
                      {item.fullName}
                        {/* <Header>
                        <EmployeeDetailsView
   employeeId={item.employeeId}
   fullName=
          />       
                        </Header>  */}
                        </div>
                        </div> 
        
                         
                        </div>
                        
                        <div class=" flex flex-row justify-evenly  w-full items-end">
                       
                     
                      <div class=" font-normal text-xs text-cardBody font-poppins">{item.department === null ? "Not Available" :item.department}</div>
                      <div class=" font-normal text-xs text-cardBody font-poppins">{item.roleTypeName  === null ? "Not Available" :item.roleTypeName}</div>
          
                   
                      
                        <div >
                       
                      
          </div>
          
                      </div> 
                   
                       <div class=" font-normal text-xs text-cardBody font-poppins mt-2 "><VolumeUpIcon style={{fontSize:"0.75rem"}}/> {`${item.countryDialCode} ${item.mobileNo}`}</div>
          <div class=" font-normal text-xs  mt-2 text-cardBody font-poppins "><DraftsIcon style={{fontSize:"0.75rem"}} /> {item.emailId}</div>
          <div class=" font-normal text-xs mt-2 text-cardBody font-poppins ">Reports To:  {item.reportingManagerName}</div>
          <div class=" flex flex-row justify-between mt-[0.3rem] w-full items-end">
          <div class=" font-normal text-xs text-cardBody font-poppins ">
       
          <span
              style={{ cursor: "pointer" }}
            
            >
              
              {item.locationName}
         
     </span>
   
           </div>
           <div className="flex">
          <div class=" font-normal text-xs text-cardBody font-poppins ">
          <span
              style={{ cursor: "pointer" }}
            //   onClick={() => {
                
            //      props.getEmployeeDocument(item.employeeId);
            //      props.getEmployeeTreeMap(item.employeeId);
            //     props.handleEmployeePulseDrawerModal(true);
            //     handleSetCurrentEmployeeId(item)
            //   }}
            >
              <MonitorHeartIcon  style={{ fontSize: "1rem", color: "#df9697" }}/>
     </span>
           </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ml-[0.15rem] ">
          
          <span
              style={{ cursor: "pointer" }}
              onClick={() => {
               
                props.handleperformanceDrawerModal(true);
                handleSetCurrentCustomer(item);
               handleRowData(item);
              }}
            >
                   {/* <Badge
                   style={{  fontSize:"0.75em",height:"18px" ,width:"5px"}}
                count={item.noOfDocPending}
                overflowCount={999}
              >  */}
              <InsertDriveFileIcon  className="!text-base cursor-pointer text-[#0e9590d6]"/>
              {/* </Badge> */}
     </span>
           
           </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ml-[0.15rem] ">
           <Tooltip 
                   title={`${item.workplace} , ${item.location}`}
                   >
          <span
              style={{ cursor: "pointer" }}
            
            >
              
              <PlaceIcon  className=" !text-base cursor-pointer text-[#960a0a]"/>
         
     </span>
     </Tooltip>
           </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ml-[0.15rem] ">
           <Tooltip title="Notify">
           <CircleNotificationsIcon
           className=" !text-base cursor-pointer text-[gold]"
        //    onClick={() => {
        //     handleSetCurrentEmployeeId(item);
        //     props.handleNotifyDrawer(true);
        //    }}
           />
           </Tooltip>
            </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ml-[0.15rem] ">
           {/* {user.userUpdateInd === true || user.role === "ADMIN"  ? ( */}
            <Tooltip title="Edit">
              <BorderColorIcon
                 className=" !text-base cursor-pointer text-[tomato]"
                // onClick={() => {
                //     props.setEditEmployee(item);
                //     handleStoredData(item);
                //     props.handleUpdateEmployeeModal(true);
                //     handleSetCurrentEmployeeId(item);
                  
                // }}
              />
            </Tooltip>
            {/* ):null} */}
           </div>
           </div>
           </div>
         
                     
                     

                    </div>
                 )  
            })}
              </div>
              </div>
              <HandleperformanceModal
                 rowdata={rowdata}
         addDrawerPerformanceModal={props.addDrawerPerformanceModal}
         handleperformanceDrawerModal={props.handleperformanceDrawerModal}
         handleSetCurrentCustomer={handleSetCurrentCustomer}
      />

            </>
      
    
    )
              
}

const mapStateToProps = ({ auth,teams }) => ({
    reportingManger:teams.reportingManger,
    reptMngrId:auth.userDetails.userId,
    addDrawerPerformanceModal:teams.addDrawerPerformanceModal
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getreportingManager,
        handleperformanceDrawerModal   
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceManagement)