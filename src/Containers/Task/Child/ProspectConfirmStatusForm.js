import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, } from "formik";
import {
  Select,
} from "../../../Components/UI/Elements";

import { Button } from "antd";
import {
    getDepartmentwiserUser,
} from "../../Settings/SettingsAction";
import {convertProspectStatus} from "../TaskAction";
import {getDepartments} from "../../Settings/Department/DepartmentAction"
const { Option } = Select;
function ProspectConfirmStatusForm(props) {

  const [department, setDepartment] = useState("");
  const [user, setUser] = useState("")
// console.log("single",single)
//     const handleSingleMultiple = (checked) =>{
//         setSingle(checked)
//     }
  useEffect(() => {
  
    props.getDepartments();
    
  }, []);

  const handleDepartment = (val) => {
    setDepartment(val)
    props.getDepartmentwiserUser(val);
  }

  const handlereportingManager = (val) => {
    setUser(val)
  }

// const handleDeptChange = (event) => {
//     const selectedDept = event.target.value;
//     setSelectedDept(selectedDept);
//     setSelectedUser("");
//     props.getDepartmentwiserUser(selectedDept) // Assuming you want to pass the selected department and filtered roles to a parent component
//   };
  // const handleUserChange = (event) => {
  //   const selectedUser = event.target.value;
  //   setSelectedUser(selectedUser);
  // };
  // console.log(selectedUser)
  // const filteredUser = props.departmentwiseUser.filter((item) => item.departmentId === selectedDept);
  const employeesData = props.departmentwiseUser.map((item) => {
    return {
      label: `${item.empName}`,
      value: item.employeeId,
    };
  });
  console.log(props.rowdata)
  return (
    <>
      <Formik
        // enableReinitialize
        initialValues={{
          // multyAsignedTOId: [],
          type:"ProspectToCustomer",

        //   userId: props.userId,
          orgId: props.organizationId,
        }}
        onSubmit={(values) => {
          console.log(values)
       
          props.convertProspectStatus(
            {
              ...values,
              departmentId: department,
              userId: user,
              taskId: props.rowdata.taskId,
              // singleMultiInd: single ? true : false,
            },
            props.userId,
            props.rowdata.taskId,
          
        
        
          );
        }}
      >
        {({ values }) => (
        <div class="mr-5 ml-5 h-[28rem] overflow-auto ">
        <Form className="form-background">
          <div class=" flex justify-between w-full">
          
            <div class=" flex flex-col w-[44%] mt-[0.625rem] ml-[1rem]">                                                            
              <div class=" flex justify-between" >
                                                    <div class=" w-[35%] mt-4" >
                                                    <div class="text-[#444] font-bold text-xs">Department</div>
                                                    <Select
                        className="w-[250px]"
                        value={department}
                        onChange={(value) => handleDepartment(value)}
                      >
                        {props.departments.map((a) => {
                          return <Option value={a.departmentId}>{a.departmentName}</Option>;
                        })}
                      </Select>
        </div>
        {department && (
          <>                                           

<div class=" w-[35%] mt-4" >
<div class="text-[#444] font-bold text-xs">User</div>
        <Select
                        className="w-[250px]"
                        value={user}
                        onChange={(value) => handlereportingManager(value)}
                      >
                        {props.departmentwiseUser.map((a) => {
                          return <Option value={a.employeeId}>{a.empName}</Option>;
                        })}
                      </Select>
  </div> 


                       
</> 
        )}     
        
        <div class=" flex justify-end mt-[2rem] " >
                <Button
                  type="primary"
                  htmlType="submit"
                  // onClick={()=>{
                  //   // const data={
                  //   //     recommendedInd:!slr.recommendedInd ? true :false
                  //   // }
                  //   console.log("taskId:", props.rowdata.taskId);
                  //   console.log("user:", user);
                  //   props.convertProspectStatus(props.rowdata.taskId,user)}}
                  loading={props.linkingProspectStatus}
                >
                Update
                </Button>
              </div>                         
                                               </div>                                                                     
            </div>
          </div>                         
        </Form>
      </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings,leads,task, departments, auth }) => ({
  userId: auth.userDetails.userId,
  linkingProspectStatus:task.linkingProspectStatus,
  departmentwiseUser:settings.departmentwiseUser,
  distributionAutomation: settings.distributionAutomation,
  orgId: auth.userDetails.organizationId,
  departments:departments.departments,
  updateWebsiteSingleError: settings.updateWebsiteSingleError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        convertProspectStatus,
        getDepartments,
        getDepartmentwiserUser,
        // getDistributionAutomation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProspectConfirmStatusForm);
