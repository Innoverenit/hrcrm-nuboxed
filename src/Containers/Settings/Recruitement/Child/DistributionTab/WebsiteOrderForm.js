import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import {

  Select,
} from "../../../../../Components/UI/Elements";

import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Button, Switch } from "antd";
import {
    websiteSingleMultiple,
    getDistributionAutomation,
    getDepartmentwiserUser,
} from "../../../../Settings/SettingsAction";
import {getDepartments} from "../../../Department/DepartmentAction"
import dayjs from "dayjs";
const { Option } = Select;
function WebsiteOrderForm(props) {

    const [single, setSingle] = useState(false);
    const [selectedDept, setSelectedDept] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
console.log("single",single)
    const handleSingleMultiple = (checked) =>{
        setSingle(checked)
    }
  useEffect(() => {
    // props.getDistributionAutomation(props.orgId,"lead");
    props.getDepartments();
    
  }, []);

  const departmentNameOption = props.departments.map((item) => {
    return {
        label: `${item.departmentName || ""}`,
        value: item.departmentId,
    };
});

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
  // const filteredUser = props.departmentwiseUser.filter((item) => item.departmentId === selectedDept);
  const employeesData = props.departmentwiseUser.map((item) => {
    return {
      label: `${item.empName}`,
      value: item.employeeId,
    };
  });
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          multyAsignedTOId:single === false ? [selectedUser] : [],
          type:"lead",
          departmentId:props.distributionAutomation.departmentId || "",
        //   timePeriod: props.distributionAutomation.timePeriod === 0 ? "Not Applicable" :props.distributionAutomation.timePeriod|| "",
        //   orderTimePeriod: props.distributionAutomation.orderTimePeriod === 0 ? "Not Applicable" :props.distributionAutomation.orderTimePeriod || "",
          userId: props.userId,
          orgId: props.organizationId,
        }}
        onSubmit={(values) => {
          console.log(values)
       
          props.websiteSingleMultiple(
            {
              ...values,
              departmentId: selectedDept,
              singleMultiInd: single ? true : false,
            },
            props.orgId,"lead",
          );
        }}
      >
        {({ values }) => (
       <div class="mr-5 ml-5  h-[28rem] overflow-auto">
        <Form className="form-background">
          <div class =" flex justify-between w-full">
                
            <div class=" w-[44%] flex flex-row mt-[0.625em] ml-[1em]">                                 
            <div class=" flex  flex-col w-[44%]">
              
            <div class=" text-[#444] font-bold text-xs w-24" >Assigned</div>
                <div>                     
                        <Switch className="w-[5rem]"                        
                          onChange={handleSingleMultiple}
                          checked={single}
                          checkedChildren="Multiple"
                          unCheckedChildren="Single"
                        />             
                    </div>
              </div>
      
              <div class=" flex justify-between width-[50%] ml-4 " >
                                                    <div class=" w-[35%]" >
                                                    <div class=" text-[#444] font-bold text-xs" >Department</div>
                      <select 
                       className="customize-select"
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
{single === false?(
            <div class=" w-[35%]" >
            <div class=" text-[#444] font-bold text-[0.75rem]" >User</div>
            <select
            className="customize-select"
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

):(   
  <div class=" w-[35%] ml-4" >
  <div class=" text-[#444] font-bold text-xs" >User</div>
   <Field class="w-[10rem]"
               name="multyAsignedTOId"
               // label="Include"                  
               mode
               placeholder="Select"
               component={SelectComponent}
               options={Array.isArray(employeesData) ? employeesData : []}
               value={values.multyAsignedTOId}
             
             />
   </div>   
)}                        
</> 
        )}                                                  
                                                </div>
             
            </div>
          </div>
       
         
              <div class=" flex justify-end mt-[1.25em]" >
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.updateRequirement}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Update */}
                </Button>
              </div>
              <div class="mt-4">
                Updated on{" "}
                {dayjs(props.distributionAutomation.updationDate).format("ll")} by{" "}
                {props.distributionAutomation.updatedBy}
              </div>
        </Form>
      </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, departments, auth }) => ({
  userId: auth.userDetails.userId,
  departmentwiseUser:settings.departmentwiseUser,
  distributionAutomation: settings.distributionAutomation,
  orgId: auth.userDetails.organizationId,
  departments:departments.departments,
  updateWebsiteSingle: settings.updateWebsiteSingle,
  updateWebsiteSingleError: settings.updateWebsiteSingleError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        websiteSingleMultiple,
        getDepartments,
        getDepartmentwiserUser,
        getDistributionAutomation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteOrderForm);
