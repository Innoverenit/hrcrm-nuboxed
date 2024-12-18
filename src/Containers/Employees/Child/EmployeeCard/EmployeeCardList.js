import React, { useEffect, useState, } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import dayjs from "dayjs";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import CellTowerIcon from '@mui/icons-material/CellTower';
import { Select } from "antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import {
    getEmployeelist,
    handleEmployeeDrawerForAdmin,
    handleEmployeePulseDrawerModal,
    getEmployeeTreeMap,
    getEmployeeDocument
  } from "../../EmployeeAction";
  import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import EmployeeDetailsView from "../EmployeeGroup/EmployeeDetails/EmployeeDetailsView";
import EmployeeType from "../SuspendEmployee/EmployeeType";
import SuspendEmployee from "../SuspendEmployee/SuspendEmployee";
import EmployeeDrawerForAdmin from "../EmployeeTable/EmployeeDrawer/EmployeeDrawerForAdmin";
import EmployeePulseDrawerModal from "../EmployeeTable/EmployeePulseDrawerModal";

const { Option } = Select;
function EmployeeCardList (props) {
  const [page, setPage] = useState(0);

useEffect(() => {
  props.getEmployeelist("cretiondate","active");
 
}, []);
function handleChange(data) {
  props.Candidatesorttype(props.userId,data);
  
}
const [currentEmployeeId, setCurrentEmployeeId] = useState("");

function handleSetCurrentEmployeeId(employeeId,) {
  setCurrentEmployeeId(employeeId,);
 
}
const [currentCandidateId, setCurrentCandidateId] = useState("");
function handleSetCurrentCandidateId(candidateId) {
    setCurrentCandidateId(candidateId); 
    console.log(candidateId);
  } 
  if (props.fetchingCandidates) {
    return <BundleLoader/>
  
;
  }
  const {
    fetchingEmployee,
    type,
    user,
    fetchingEmployeeError,
    employees,
    handleEmployeeDrawerForAdmin,
    employeeDrawerVisibleForAdmin,
  } = props;

    return (    
            <>          
      <OnlyWrapCard style={{height:"81vh"}}>
        {/* <InfiniteScroll
                    dataLength={props.tableRequirement.length}
                next={handleLoadMore}
                hasMore={true}
                height={"20vh"}
            > */}
       
        {props.filteredData.map((item) => {
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");
       
          return (
            <>
              <div>
                <div className="flex justify-between mt-2 "
                  // style={hrStyle}
                  style={{
                    borderBottom: "3px dotted #515050"
                  }}
                >
                  <div class=" flex flex-row justify-between w-wk max-sm:flex-col">
                    <div class="flex">
                    <div className=" flex font-medium flex-col md:w-44 max-sm:flex-row justify-between w-full">
                    <div class=" text-sm  font-semibold font-poppins max-sm:hidden"> Name     
          </div> 
            <div class="  text-[0.82rem] font-semibold  font-poppins">
          {/* Link */}
           <EmployeeDetailsView
          employeeId={item.employeeId}
          fullName={item.fullName}
        />
         &nbsp;&nbsp;
        {date === currentdate ? <span className="blink">New</span> : null}
            </div>
                    </div>
                  
                    <div className=" flex font-medium flex-col  md:w-40 max-sm:flex-row justify-between w-full mt-1">

                      <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                      Department
                      </div>

                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        {item.department}
                      </div>
                      {/* </Tooltip>   */}
                    </div>
                    <div className=" flex font-medium flex-col md:w-40 max-sm:flex-row justify-between w-full mt-1">       
                        <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                        Role
                        </div>

                        <div class=" font-normal text-[0.82rem]  font-poppins">
                          {item.role}
                        </div>
                     
                    </div>
                    </div>
                    <div class="flex">
                    <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row justify-between w-full mt-1">
                    

                        <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                        Mobile #
                        </div>

                        <div class=" font-normal text-[0.82rem]  font-poppins">
                          {item.mobileNo}
                        </div>
                   
                    </div>

                    <div className=" flex font-medium flex-col md:w-44 max-sm:flex-row justify-between w-full mt-1">

                      <div class=" text-sm  font-semibold font-poppins max-sm:hidden">
                      Email #
                      </div>

                      <div class=" font-normal text-[0.82rem]  font-poppins">
                      {item.emailId}
                      </div>                  
                    </div>
                    </div>
                    <div class="flex justify-between items-center">
                   <div class="flex">              
                    <div className=" flex font-medium flex-col md:w-40 max-sm:flex-row justify-between w-full mt-1">                 
                      <div class="text-[0.82rem]   font-semibold font-poppins max-sm:hidden">
                     
                      Type
                      </div>
                    
                      <EmployeeType
            type={item.type}
              employeeId={item.employeeId}
            />                 
                    </div>                   
                    </div>
                    <div class="flex ">
                
                <div className=" flex font-medium flex-col md:w-48 max-sm:flex-row justify-between w-full  mt-1">           
                  <div class=" text-sm  font-semibold font-poppins max-sm:hidden">                
                  Suspend
                  </div>                
                  <SuspendEmployee
              partnerId={item.partnerId}
              suspendInd={item.suspendInd}
              assignedIndicator={item.assignedInd}
              employeeId={item.employeeId}
            />           
                </div>                   
                </div>
                <div className=" font-medium flex-col w-8 h-12 flex justify-center">
                {item.suspendInd !== true && ( 
                    
       <CellTowerIcon        
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
     </div>
     <div class=" font-normal text-xs  font-poppins ">
          <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                // props.getCandidateById(item.candidateId);
                props.getEmployeeDocument(item.employeeId);
                 props.getEmployeeTreeMap(item.employeeId);
                props.handleEmployeePulseDrawerModal(true);
                handleSetCurrentEmployeeId(item)
              }}
            >
              <MonitorHeartIcon  style={{ fontSize: "0.8rem", color: "#df9697" }}/>
     </span>
           </div>   
           </div>   
                  </div>              
                </div>
 
              </div>

            </>

          )
        })}
      
        {/* </InfiniteScroll> */}

      </OnlyWrapCard >
      <EmployeeDrawerForAdmin
      employeeId={currentEmployeeId}
        handleEmployeeDrawerForAdmin={handleEmployeeDrawerForAdmin}
        employeeDrawerVisibleForAdmin={employeeDrawerVisibleForAdmin}
      />
                 <EmployeePulseDrawerModal
         singleEmployee={props.singleEmployee}
         employeeTreeMap={props.employeeTreeMap}
        employeeName={currentEmployeeId}
        documentsByEmployeeId={props.documentsByEmployeeId}
        addDrawerEmployeePulseModal={props.addDrawerEmployeePulseModal}
        handleEmployeePulseDrawerModal={props.handleEmployeePulseDrawerModal}
    
      />
            </>        
    )
              
}

const mapStateToProps = ({ auth,role, employee,designations,departments }) => ({
    userId: auth.userDetails.userId,
    employees: employee.employees,
    
    user: auth.userDetails,
    roles: role.roles,
    employeeTreeMap:employee.employeeTreeMap,
    addDrawerEmployeePulseModal:employee.addDrawerEmployeePulseModal,
    organizationId: auth.userDetails.organizationId,
    fetchingEmployee: employee.fetchingEmployee,
    designations: designations.designations,
    departments:departments.departments,
    documentsByEmployeeId: employee.documentsByEmployeeId,
    fetchingEmployeeError: employee.fetchingEmployeeError,
    employeeDrawerVisibleForAdmin: employee.employeeDrawerVisibleForAdmin,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getEmployeelist,
        handleEmployeeDrawerForAdmin,
        handleEmployeePulseDrawerModal,
        getEmployeeTreeMap,
        getEmployeeDocument
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCardList);