import React, { useState, lazy, Suspense} from "react";
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
import PhoneIcon from '@mui/icons-material/Phone';
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
import { Link } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { elipsize } from "../../../../Helpers/Function/Functions";
import EmployeeSearchedData1 from "./EmployeeSearchedData1";
const EmployeeDrawerForAdmin =lazy(()=>import("../EmployeeTable/EmployeeDrawer/EmployeeDrawerForAdmin"));
const EmployeePulseDrawerModal =lazy(()=>import("../EmployeeTable/EmployeePulseDrawerModal"));
const EmployeeDocumentDrawerModal =lazy(()=>import("./EmployeeDocumentDrawerModal"));
const UpdateEmployeeModal =lazy(()=>import("./UpdateEmployeeModal"));
const OpenNotifyDrawer =lazy(()=>import("./OpenNotifyDrawer"));
const StepperEmployeeModal =lazy(()=>import("./StepperEmployeeModal"));



function EmployeeCardView (props) {
  const [userData, setUserData] = useState("");
  const [currentEmployeeId, setCurrentEmployeeId] = useState("");
  const [isCopied, setIsCopied] = useState(false);

function handleSetCurrentEmployeeId(employeeId,) {
  setCurrentEmployeeId(employeeId,);
 
}

function handleSetCurrentUser(item) {
  setUserData(item,);
 
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
            {props.employeeSerachedData.length > 0 ? (
    <EmployeeSearchedData1
    employeeSerachedData={props.employeeSerachedData}
  fetchingEmployeeInputSearchData={props.fetchingEmployeeInputSearchData}
    />
  ) : (
            <div class=" h-h86 overflow-auto overflow-x-auto">
             {props.employees=="Data not Found" ? "Data not Found" :
            <div class="flex flex-wrap  w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">  
              {props.filteredData.length === 0 ?<span class=" flex items-center mt-8">Data Not Available</span> :props.filteredData.map((item) => {
               
                const handleCopyClick = () => {
                  const emailElement = document.createElement('textarea');
                  emailElement.value = item.emailId || "";
                  document.body.appendChild(emailElement);
                  emailElement.select();
                  document.execCommand('copy');
                  document.body.removeChild(emailElement);
              
                  setIsCopied(true);
              
                  // Reset the copied state after a short delay
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 1500);
                };
                const tooltipContent = `${item.workplace}, ${item.locationName}`;
                const showTooltip = tooltipContent.trim() !== ''; 
                 return (
                  <div class="rounded-md border-2 bg-[#ffffff]  shadow-[#aaa] h-[9rem] 
                  text-[#444444] my-3 p-1 ml-3 w-[15vw] flex flex-col  max-sm:w-wk max-sm:ml-0 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
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
                            {/* <a class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[blue] cursor-pointer" 
                            href={`employee/${item.employeeId}`}>{item.fullName}</a> */}
                      

                      <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer"  
                      to={`/employee/${item.employeeId}`} title={item.fullName}>
      {item.fullName}
    </Link>

                        </div>
                        </div> 
        
                         
                        </div>
                        
                        <div class=" flex flex-row justify-evenly  w-full items-end">
                       
                        {/* <div class=" text-xs  font-medium font-poppins">Department   </div> */}
                      <div class="  text-xs  font-poppins">{item.department === null ? "Not Available" :item.department}</div>
                      <div class="  text-xs  font-poppins">{item.roleTypeName  === null ? "Not Available" :item.roleTypeName}</div>
          
                   
                      
                        <div >
                        {/* <div class=" text-xs  font-medium font-poppins">Role   </div> */}
                      
          </div>
          
                      </div> 
                   
                       <div class="  text-xs  font-poppins mt-1 "><PhoneIcon  className="!text-icon cursor-pointer text-[grey]"/> {`${item.countryDialCode} ${item.mobileNo}`}</div>
          <div class="  text-xs  mt-1  font-poppins flex justify-between ">
            <div>
            <DraftsIcon  className="!text-base cursor-pointer text-green-400 mr-1" /> 
          <Tooltip title={item.emailId}>
          {elipsize(item.emailId || "", 25)}
          </Tooltip>
          </div>
          <div>
          <ContentCopyIcon
        className={`!text-base cursor-pointer ${isCopied ? 'text-blue-400' : 'text-gray-400'}`}
        onClick={handleCopyClick}
      />
      </div>
          </div>
          <div class="  text-xs mt-1  font-poppins ">Reports To:    <span>
          {item.reportingManagerName 
                        ? `${item.reportingManagerName}`
                        : <span class="text-[red]" >Not Assigned </span>}
                      </span>
         </div>
          <div class=" flex flex-row justify-between mt-[0.5rem] w-full items-end">
          <div class="  text-xs  font-poppins ">
       
          <span class=" cursor-pointer"
            
            >
              
              {item.locationName}
         
     </span>
   
           </div>
           <div class="flex">
          <div class="  text-xs  font-poppins ">
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
              <MonitorHeartIcon className="!text-icon cursor-pointer text-[#df9697]" />
              </Tooltip>
     </span>
           </div>
           <div class="  text-xs  font-poppins ml-[0.15rem]">
            {/* {user.userAccessPlusInd === true ?( */}
          <span
              className=" cursor-pointer"
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
              <InsertDriveFileIcon  className="!text-base cursor-pointer"/>
              </Tooltip>
              </Badge>
     </span>
            {/* ):null} */}
           </div>
           <div class="  text-xs  font-poppins ml-[0.15rem]">
           <Tooltip title={showTooltip ? tooltipContent : 'Not available'}>
                   {/* title={`${item.workplace} , ${item.location}`}
                   > */}
           <span>
              
              <PlaceIcon  className=" !text-base cursor-pointer text-[#960a0a]"/>
         
     </span>
     </Tooltip>
           </div>
           <div class="  text-xs  font-poppins ml-[0.15rem]">
           <Tooltip title="Assign as Admin">
           <CircleNotificationsIcon
          className=" !text-base cursor-pointer text-[gold]"
           onClick={() => {
            handleSetCurrentEmployeeId(item);
            props.handleNotifyDrawer(true);
           }}
           />
           </Tooltip>
            </div>
          
           <div class="  text-xs  font-poppins ml-[0.15rem]">
            <Tooltip title="Onboarding">
              <BadgeIcon   className=" !text-base cursor-pointer text-[#709ab3]"
                onClick={() => {
                    props.handleOnboardingEmployeeModal(true);
                    handleSetCurrentEmployeeId(item);
                  
                }}
              />
            </Tooltip>
           </div>
           <div class="  text-xs  font-poppins ml-[0.15rem]">
           {user.userUpdateInd === true || user.role === "ADMIN"  ? (
            <Tooltip title="Edit">
              <BorderColorIcon
                className=" !text-base cursor-pointer text-[tomato]"
                onClick={() => {
                  props.handleUpdateEmployeeModal(true); 
                  handleSetCurrentUser(item);
                  handleSetCurrentEmployeeId(item);
                   
                }}
              />
            </Tooltip>
            ):null}
           </div>
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
}
              </div>
   )} 
     <Suspense fallback={<BundleLoader />}>
              <UpdateEmployeeModal
              userData={userData}
       currentEmployeeId={currentEmployeeId}
        updateEmployeeModal={props.updateEmployeeModal}
        handleUpdateEmployeeModal={props.handleUpdateEmployeeModal}
      />
               <StepperEmployeeModal
               userStageList={props.userStageList}
               currentEmployeeId={currentEmployeeId}
               employeeName={currentEmployeeId}
              //  singleEmployee={props.singleEmployee}
              //  employeeName={currentEmployeeId}
       onboardingEmployeeModal={props.onboardingEmployeeModal}
        handleOnboardingEmployeeModal={props.handleOnboardingEmployeeModal}
        handleSetCurrentEmployeeId={props.handleSetCurrentEmployeeId}
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
  </Suspense>
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
    userStageList:employee.userStageList,
    documentsByEmployeeId: employee.documentsByEmployeeId,
    addDrawerEmployeePulseModal:employee.addDrawerEmployeePulseModal,
    addDrawerEmployeeDocumentModal:employee.addDrawerEmployeeDocumentModal,
    fetchingEmployeeError: employee.fetchingEmployeeError,
    employeeDrawerVisibleForAdmin: employee.employeeDrawerVisibleForAdmin,
    openNotifydrwr:employee.openNotifydrwr,
    employeeSerachedData: employee.employeeSerachedData,
    fetchingEmployeeInputSearchData: employee.fetchingEmployeeInputSearchData
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
