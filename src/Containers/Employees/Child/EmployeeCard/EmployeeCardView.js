import React, { useState, lazy,} from "react";
import { MultiAvatar2, } from '../../../../Components/UI/Elements'
import {  Tooltip, Badge } from 'antd'
import { connect } from 'react-redux'
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { bindActionCreators } from 'redux'
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BadgeIcon from '@mui/icons-material/Badge';
import PlaceIcon from '@mui/icons-material/Place';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DraftsIcon from '@mui/icons-material/Drafts';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { BundleLoader } from "../../../../Components/Placeholder";
import {
    getEmployeelist,
    setEditEmployee,
    handleEmployeeDrawerForAdmin,
    handleEmployeePulseDrawerModal,
    getEmployeeTreeMap,
    handleEmployeeDocumentDrawerModal,
    getEmployeeDocument,
    handleUpdateEmployeeModal,
    handleOnboardingEmployeeModal,
    handleNotifyDrawer
  } from "../../EmployeeAction";

const EmployeeDrawerForAdmin =lazy(()=>import("../EmployeeTable/EmployeeDrawer/EmployeeDrawerForAdmin"));
const EmployeePulseDrawerModal =lazy(()=>import("../EmployeeTable/EmployeePulseDrawerModal"));
const EmployeeDocumentDrawerModal =lazy(()=>import("./EmployeeDocumentDrawerModal"));
const UpdateEmployeeModal =lazy(()=>import("./UpdateEmployeeModal"));
const OpenNotifyDrawer =lazy(()=>import("./OpenNotifyDrawer"));
const StepperEmployeeModal =lazy(()=>import("./StepperEmployeeModal"));



function EmployeeCardView (props) {

  const [currentEmployeeId, setCurrentEmployeeId] = useState("");


function handleSetCurrentEmployeeId(employeeId,) {
  setCurrentEmployeeId(employeeId,);
 
}
  if (props.fetchingEmployee) {
    return <BundleLoader/>;}

  const {
    user,
    handleEmployeeDrawerForAdmin,
    employeeDrawerVisibleForAdmin,
  } = props;

    return (
      
            <>
            
            <div class=" h-h86 overflow-auto overflow-x-auto">
             
            <div class="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">  
              {props.filteredData.length === 0 ?<span class=" flex items-center mt-8">Data Not Available</span> :props.filteredData.map((item) => {
                
                 return (
                  <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[10rem] 
                  text-[#444444] m-3 p-1 w-[19vw] flex flex-col  ">
                      <div class="flex">
                   <Tooltip 
                   title={item.country}
                   >
                 
                   </Tooltip>
                           <div class="flex flex-row max-sm:justify-start items-center" >     
                   <div >
                          <MultiAvatar2

                           primaryTitle={item.fullName}
                            // imageId={item.imageId ? item.imageId : ''}
                            imgHeight={"1.8rem"}
                            imgWidth={"1.8rem"}
                            imgRadius={20}
                          />
                         </div>
              
                      <div>
                            <a class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[blue] cursor-pointer" 
                            href={`employee/${item.employeeId}`}>{item.fullName}</a>
                      
                        </div>
                        </div> 
        
                         
                        </div>
                        
                        <div class=" flex flex-row justify-evenly  w-full items-end">
                       
                        {/* <div class=" text-sm text-cardBody font-medium font-poppins">Department   </div> */}
                      <div class=" font-normal text-xs text-cardBody font-poppins">{item.department === null ? "Not Available" :item.department}</div>
                      <div class=" font-normal text-xs text-cardBody font-poppins">{item.roleType  === null ? "Not Available" :item.roleType}</div>
          
                   
                      
                        <div >
                        {/* <div class=" text-sm text-cardBody font-medium font-poppins">Role   </div> */}
                      
          </div>
          
                      </div> 
                   
                       <div class=" font-normal text-xs text-cardBody font-poppins mt-2 "><VolumeUpIcon style={{fontSize:"0.75rem"}}/> {`${item.countryDialCode} ${item.mobileNo}`}</div>
          <div class=" font-normal text-xs  mt-2 text-cardBody font-poppins "><DraftsIcon style={{fontSize:"0.75rem"}} /> {item.emailId}</div>
          <div class=" font-normal text-xs mt-2 text-cardBody font-poppins ">Reports To:    <span>
          {item.reportingManagerName 
                        ? `${item.reportingManagerName}`
                        : "Not Assigned"}
                      </span>
         </div>
          <div class=" flex flex-row justify-evenly mt-[0.5rem] w-full items-end">
          <div class=" font-normal text-xs text-cardBody font-poppins ">
       
          <span class=" cursor-pointer"
            
            >
              
              {item.location}
         
     </span>
   
           </div>
          <div class=" font-normal text-xs text-cardBody font-poppins ">
          <span class=" cursor-pointer"
         
              onClick={() => {
                // props.getCandidateById(item.candidateId);
                 props.getEmployeeDocument(item.employeeId);
                 props.getEmployeeTreeMap(item.employeeId);
                props.handleEmployeePulseDrawerModal(true);
                handleSetCurrentEmployeeId(item)
              }}
            >
               <Tooltip title="Pulse">
              <MonitorHeartIcon  style={{ fontSize: "1rem", color: "#df9697" }}/>
              </Tooltip>
     </span>
           </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ">
            {/* {user.userAccessPlusInd === true ?( */}
          <span
              style={{ cursor: "pointer" }}
              onClick={() => {
               
                props.handleEmployeeDocumentDrawerModal(true);
                handleSetCurrentEmployeeId(item)
              }}
            >
                   <Badge
                   style={{  fontSize:"0.75em",height:"18px" ,width:"5px"}}
                count={item.noOfDocPending}
                overflowCount={999}
              > 
                  <Tooltip title="Required Documents">
              <InsertDriveFileIcon  style={{ fontSize: "1rem", }}/>
              </Tooltip>
              </Badge>
     </span>
            {/* ):null} */}
           </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ">
           <Tooltip 
                   title={`${item.workplace} , ${item.location}`}
                   >
           <span>
              
              <PlaceIcon  className=" !text-base cursor-pointer"/>
         
     </span>
     </Tooltip>
           </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ">
           <Tooltip title="Assign as Admin">
           <CircleNotificationsIcon
           style={{ cursor: "pointer",fontSize: "1rem" }}
           onClick={() => {
            handleSetCurrentEmployeeId(item);
            props.handleNotifyDrawer(true);
           }}
           />
           </Tooltip>
            </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ">
           {user.userUpdateInd === true || user.role === "ADMIN"  ? (
            <Tooltip title="Edit">
              <BorderColorIcon
                className=" !text-base cursor-pointer"
                onClick={() => {
                  props.handleUpdateEmployeeModal(true); 
                  handleSetCurrentEmployeeId(item);
                   
                }}
              />
            </Tooltip>
            ):null}
           </div>
           <div class=" font-normal text-xs text-cardBody font-poppins ">
            <Tooltip title="Onboarding">
              <BadgeIcon
                style={{ cursor: "pointer",fontSize: "1rem" }}
                onClick={() => {
                    props.handleOnboardingEmployeeModal(true);
                    handleSetCurrentEmployeeId(item);
                  
                }}
              />
            </Tooltip>
           </div>
           </div>
         
                     
                      {/* <div class=" flex flex-row justify-around w-full items-end">
              
                     <span>
                        <Tooltip  title={`${item.countryDialCode} ${item.mobileNo}`}>
                        <VolumeUpIcon  style={{fontSize:"0.8rem",color:"#24d8a7"}}  />
                        </Tooltip> 
                        </span>
                        <span>
                        <Tooltip  title={item.emailId}>
                   <DraftsIcon 
                   style={{fontSize:"0.8rem",color:"#24d8a7"}}
                  // icon={regular("envelope")}  
                  />
          </Tooltip> 
          </span>
        
            <span
              style={{
                cursor: "pointer",
                
              }}
            >
                {item.suspendInd !== true && ( 
                    
                    <CellTowerIcon
                         // size={"small"}
                         // type="ghost"
                         // style={{            
                         //   borderColor: "transparent",
                         //   alignSelf: "flex-end",
                         // }}
                         style={{ 
                             color: item.role === "ADMIN" ?"blue":  "green",
                             fontSize: "123%"
                             }}
                         onClick={() => {
                             handleEmployeeDrawerForAdmin(true);
                             handleSetCurrentEmployeeId(item.employeeId)
                           }}
                        
                     
                       />
                       )}  
            </span>
       
         
       
                        </div>  */}

                    </div>
                 )  
            })}
              </div>
              </div>

              <UpdateEmployeeModal
       currentEmployeeId={currentEmployeeId}
        updateEmployeeModal={props.updateEmployeeModal}
        handleUpdateEmployeeModal={props.handleUpdateEmployeeModal}
      />
               <StepperEmployeeModal
               currentEmployeeId={currentEmployeeId}

              //  singleEmployee={props.singleEmployee}
              //  employeeName={currentEmployeeId}
       onboardingEmployeeModal={props.onboardingEmployeeModal}
        handleOnboardingEmployeeModal={props.handleOnboardingEmployeeModal}
        // handleSetCurrentEmployeeId={props.handleSetCurrentEmployeeId}
      />
              <EmployeeDrawerForAdmin
      employeeId={currentEmployeeId}
        handleEmployeeDrawerForAdmin={handleEmployeeDrawerForAdmin}
        employeeDrawerVisibleForAdmin={employeeDrawerVisibleForAdmin}
      />
            <EmployeePulseDrawerModal
         singleEmployee={props.singleEmployee}
         employeeTreeMap={props.employeeTreeMap}
        //  currentData={rowData}
        employeeName={currentEmployeeId}
        documentsByEmployeeId={props.documentsByEmployeeId}
        addDrawerEmployeePulseModal={props.addDrawerEmployeePulseModal}
        handleEmployeePulseDrawerModal={props.handleEmployeePulseDrawerModal}
        // candidateByUserId={this.props.candidateByUserId}
      />
               <EmployeeDocumentDrawerModal
         singleEmployee={props.singleEmployee}
        employeeName={currentEmployeeId}
        addDrawerEmployeeDocumentModal={props.addDrawerEmployeeDocumentModal}
        handleEmployeeDocumentDrawerModal={props.handleEmployeeDocumentDrawerModal}
      />
      <OpenNotifyDrawer
      currentEmployeeId={currentEmployeeId}
       openNotifydrwr={props.openNotifydrwr} handleNotifyDrawer={props.handleNotifyDrawer}/>

            </>
      
    
    );
              
}

const mapStateToProps = ({ auth,role, employee,designations,departments }) => ({
    userId: auth.userDetails.userId,
    updateEmployeeModal:employee.updateEmployeeModal,
    onboardingEmployeeModal:employee.onboardingEmployeeModal,
    employees: employee.employees,
    user: auth.userDetails,
    roles: role.roles,
    organizationId: auth.userDetails.organizationId,
    fetchingEmployee: employee.fetchingEmployee,
    designations: designations.designations,
    departments:departments.departments,
    employeeTreeMap:employee.employeeTreeMap,
    documentsByEmployeeId: employee.documentsByEmployeeId,
    addDrawerEmployeePulseModal:employee.addDrawerEmployeePulseModal,
    addDrawerEmployeeDocumentModal:employee.addDrawerEmployeeDocumentModal,
    fetchingEmployeeError: employee.fetchingEmployeeError,
    employeeDrawerVisibleForAdmin: employee.employeeDrawerVisibleForAdmin,
    openNotifydrwr:employee.openNotifydrwr,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getEmployeelist,
        setEditEmployee,
        handleEmployeeDrawerForAdmin,
        handleEmployeePulseDrawerModal,
        handleEmployeeDocumentDrawerModal,
        handleUpdateEmployeeModal,
        handleOnboardingEmployeeModal,
        getEmployeeTreeMap,
        getEmployeeDocument,
        handleNotifyDrawer
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCardView)
