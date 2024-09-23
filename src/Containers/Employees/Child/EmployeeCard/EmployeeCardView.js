import React, { useEffect,useState, lazy, Suspense} from "react";
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

const  EmployeeSearchedData1 =lazy(()=>import("./EmployeeSearchedData1"));
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

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "1547",//0 Data Not Available
          "118",//1 Not Available
           "995",//2Reports To:
          "1548",//3Not Assigned 
           "392",//4 Pulse
           "1549",//5Required Document
           "1550",// "Assign as Admin"
          "1551",//  Onboarding
          "170",//  "Edit" 
                 
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

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
            <div class="flex flex-wrap  justify-evenly w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">  
              {props.filteredData.length === 0 ?<span class=" flex items-center mt-8"> {translatedMenuItems[0]}</span> :props.filteredData.map((item) => {
               
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
                      <div class="  text-xs  font-poppins">{item.department === null ?  translatedMenuItems[1] :item.department}</div>
                      <div class="  text-xs  font-poppins">{item.roleTypeName  === null ?  translatedMenuItems[1] :item.roleTypeName}</div>
          
                   
                      
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
          <div class="  text-xs mt-1  font-poppins "> {translatedMenuItems[2]}:    <span>
          {item.reportingManagerName 
                        ? `${item.reportingManagerName}`
                        : <span class="text-[red]" > {translatedMenuItems[3]} </span>}
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
               <Tooltip title= {translatedMenuItems[4]}>
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
                  <Tooltip title= {translatedMenuItems[5]}>
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
           <Tooltip title= {translatedMenuItems[6]}>
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
            <Tooltip title= {translatedMenuItems[7]}>
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
            <Tooltip title= {translatedMenuItems[8]}>
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
         
                    </div>
                 )  
            })}
              </div>
}
              </div>
   )} 
     <Suspense fallback={<BundleLoader />}>
              <UpdateEmployeeModal
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
              userData={userData}
       currentEmployeeId={currentEmployeeId}
        updateEmployeeModal={props.updateEmployeeModal}
        handleUpdateEmployeeModal={props.handleUpdateEmployeeModal}
      />
               <StepperEmployeeModal
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
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
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
      employeeId={currentEmployeeId}
        handleEmployeeDrawerForAdmin={handleEmployeeDrawerForAdmin}
        employeeDrawerVisibleForAdmin={employeeDrawerVisibleForAdmin}
      />
            <EmployeePulseDrawerModal
             translateText={props.translateText}
             selectedLanguage={props.selectedLanguage}
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
                translateText={props.translateText}
                selectedLanguage={props.selectedLanguage}
         singleEmployee={props.singleEmployee}
        employeeName={currentEmployeeId}
        addDrawerEmployeeDocumentModal={props.addDrawerEmployeeDocumentModal}
        handleEmployeeDocumentDrawerModal={props.handleEmployeeDocumentDrawerModal}
      />
      <OpenNotifyDrawer
       translateText={props.translateText}
       selectedLanguage={props.selectedLanguage}
      currentEmployeeId={currentEmployeeId}
       openNotifydrwr={props.openNotifydrwr} 
       handleNotifyDrawer={props.handleNotifyDrawer}/>
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
