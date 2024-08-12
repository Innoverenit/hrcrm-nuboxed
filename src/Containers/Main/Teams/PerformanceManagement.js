import React, {  useEffect, useState,lazy,Suspense } from "react";
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
import {getEmployeeTreeMap} from "../../Employees/EmployeeAction"
import { BundleLoader } from "../../../Components/Placeholder";
import { getreportingManager,handleperformanceDrawerModal,handleTeamsPulseDrawerModal } from "./TeamsAction";
const HandleperformanceModal = lazy(() => import("./HandleperformanceModal"));
const  HandlePulseDrawerModal = lazy(() => import("./TeamsCard.js/HandlePulseDrawerModal"));


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

  const {
    fetchingEmployee,
    type,
    fetchingRepoting,
    user,
    filteredData,
    fetchingEmployeeError,
    employees,
    handleEmployeeDrawerForAdmin,
    employeeDrawerVisibleForAdmin,
  } = props;
  if (fetchingRepoting) {
    return <BundleLoader/>
  
    
;
  }

    return (
      
            <>
            
            <div class=" h-h86 overflow-auto overflow-x-auto">
             
            <div class="flex flex-wrap w-full justify-start max-sm:justify-between max-sm:flex-col max-sm:items-center"> 
                  
              {props.reportingManger.map((item) => {
                console.log("noOfDocPending",item.noOfDocPending)
      
                 return (
                  <div class="rounded border-2 bg-[#ffffff]  shadow-[#aaa] h-[9.5rem] 
                  text-[#444444] m-1 p-1 w-[16rem] flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
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
                       
                     
                      <div class=" font-normal text-xs  font-poppins">{item.department === null ? "Not Available" :item.department}</div>
                      <div class=" font-normal text-xs  font-poppins">{item.roleTypeName  === null ? "Not Available" :item.roleTypeName}</div>
          
                   
                      
                        <div >
                       
                      
          </div>
          
                      </div> 
                   
                       <div class=" font-normal text-xs  font-poppins mt-2 "><VolumeUpIcon style={{fontSize:"0.75rem"}}/> {`${item.countryDialCode} ${item.mobileNo}`}</div>
          <div class=" font-normal text-xs  mt-2  font-poppins "><DraftsIcon style={{fontSize:"0.75rem"}} /> {item.emailId}</div>
          <div class=" font-normal text-xs mt-2  font-poppins ">Reports To:  {item.reportingManagerName}</div>
          <div class=" flex flex-row justify-between mt-[0.3rem] w-full items-end">
          <div class=" font-normal text-xs  font-poppins ">
       
          <span
              style={{ cursor: "pointer" }}
            
            >
              
              {item.locationName}
         
     </span>
   
           </div>
           <div className="flex">
          <div class=" font-normal text-xs  font-poppins ">
          <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.getEmployeeTreeMap(item.employeeId);
                props.handleperformanceDrawerModal(true);
                handleSetCurrentCustomer(item);
               handleRowData(item);
              }}
             
            
          
            >
                <Tooltip title="Pulse">
              <MonitorHeartIcon   className=" !text-base cursor-pointer text-[#df9697]"/>
              </Tooltip>
     </span>
           </div>
           <div class=" font-normal text-xs  font-poppins ml-[0.15rem] ">
          
          <span
              style={{ cursor: "pointer" }}
              onClick={() => {
               
                props.handleTeamsPulseDrawerModal(true);
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
           <div class=" font-normal text-xs  font-poppins ml-[0.15rem] ">
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
           <div class=" font-normal text-xs  font-poppins ml-[0.15rem] ">
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
           <div class=" font-normal text-xs  font-poppins ml-[0.15rem] ">
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
              <Suspense fallback={<BundleLoader />}>
              <HandleperformanceModal
                 rowdata={rowdata}
                 employeeTreeMap={props.employeeTreeMap}
         addDrawerPerformanceModal={props.addDrawerPerformanceModal}
         handleperformanceDrawerModal={props.handleperformanceDrawerModal}
         handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
                <HandlePulseDrawerModal
                 rowdata={rowdata}
                 addDrawerTeamsPulseModal={props.addDrawerTeamsPulseModal}
                 handleTeamsPulseDrawerModal={props.handleTeamsPulseDrawerModal}
         handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
</Suspense>
            </>
      
    
    )
              
}

const mapStateToProps = ({ auth,teams,employee }) => ({
    reportingManger:teams.reportingManger,
    reptMngrId:auth.userDetails.userId,
    employeeTreeMap:employee.employeeTreeMap,
    addDrawerTeamsPulseModal:teams.addDrawerTeamsPulseModal,
    fetchingRepoting:teams.fetchingRepoting,
    addDrawerPerformanceModal:teams.addDrawerPerformanceModal
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getreportingManager,
        handleperformanceDrawerModal ,
        handleTeamsPulseDrawerModal  ,
        getEmployeeTreeMap
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceManagement)