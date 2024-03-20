import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, } from "formik";
import {
  Select,
  StyledLabel,
} from "../../../Components/UI/Elements";
import { MainWrapper } from "../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { Button, Switch } from "antd";
import {
    getDepartmentwiserUser,
} from "../../Settings/SettingsAction";
import {convertProspectStatus} from "../TaskAction";
import {getDepartments} from "../../Settings/Department/DepartmentAction"
const { Option } = Select;
function ProspectConfirmStatusForm(props) {

    const [single, setSingle] = useState(false);
    const [selectedDept, setSelectedDept] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
console.log("single",single)
    const handleSingleMultiple = (checked) =>{
        setSingle(checked)
    }
  useEffect(() => {
  
    props.getDepartments();
    
  }, []);


const handleDeptChange = (event) => {
    const selectedDept = event.target.value;
    setSelectedDept(selectedDept);
    setSelectedUser("");
    props.getDepartmentwiserUser(selectedDept) // Assuming you want to pass the selected department and filtered roles to a parent component
  };
  const handleUserChange = (event) => {
    const selectedUser = event.target.value;
    setSelectedUser(selectedUser);
  };
  console.log(selectedUser)
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
          type:"ProspectConvertToCustomer",

        //   userId: props.userId,
          orgId: props.organizationId,
        }}
        onSubmit={(values) => {
          console.log(values)
       
          props.convertProspectStatus(
            {
              ...values,
              departmentId: selectedDept,
              // singleMultiInd: single ? true : false,
            },
            props.rowdata.taskId,
          selectedUser,
        
        
          );
        }}
      >
        {({ values }) => (
        <MainWrapper style={{ height: "446px", width: "", overflow: "auto" }}>
        <Form className="form-background">
          <div class=" flex justify-between w-full"
          >
            <div class=" flex flex-col w-[44%] mt-[0.625rem] ml-[1rem]"
            >
            
        
             
            
             
              <div class=" flex justify-between" >
                                                    <div class=" w-[35%] mt-4" >
                                                    <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>Department</label>
                      <select   className="customize-select"
                   
                      onChange={handleDeptChange}>
          <option value="">Select Department</option>
          {props.departments.map((item, index) => (
            <option 
           
            key={index} value={item.departmentId}>
              {item.departmentName}
            </option>
          ))}
        </select>
        </div>
        {selectedDept && (
          <>                                           

<div class=" w-[35%] mt-4" >
            <label style={{color:"#444",fontWeight:"bold",fontSize:" 0.75rem"}}>User</label>
            <select   className="customize-select"
                 onChange={handleUserChange}
              >
    <option value="">select user</option>
    {props.departmentwiseUser.map((item, index) => (
      <option key={index}
      // disabled
      // disabled={selectedDept}
       value={item.employeeId}>
        {item.empName}
      </option>
    ))}
  </select>
  </div> 


                       
</> 
        )}                                                  
                                                </div>
                                           
                                       
            </div>
          </div>
        
             
              <div class=" flex justify-end mt-3" >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.linkingProspectStatus}
                >
                  <FormattedMessage id="app.submit" defaultMessage="Submit" />
                  {/* Update */}
                </Button>
              </div>
  
        </Form>
      </MainWrapper>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings,leads,task, departments, auth }) => ({
//   userId: auth.userDetails.userId,
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
