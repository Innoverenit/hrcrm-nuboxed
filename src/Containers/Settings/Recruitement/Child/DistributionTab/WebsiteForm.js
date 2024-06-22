import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import {
  Select,
} from "../../../../../Components/UI/Elements";
import { MainWrapper,  } from "../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Button, Switch } from "antd";
import {
    websiteSingleMultiple,
    getDistributionAutomation,
    getDepartmentwiserUser,
} from "../../../../Settings/SettingsAction";
import {getDepartments} from "../../../Department/DepartmentAction"
import moment from "moment";
const { Option } = Select;
function WebsiteForm(props) {

    const [single, setSingle] = useState(false);
    const [selectedDept, setSelectedDept] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
console.log("single",single)
    const handleSingleMultiple = (checked) =>{
        setSingle(checked)
    }
  useEffect(() => {
    props.getDistributionAutomation(props.orgId,"lead");
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
        <MainWrapper style={{ height: "446px", width: "", overflow: "auto" }}>
        <Form className="form-background">
          <div class =" flex  justify-between w-full"
       
          >
            <div class=" w-[44%] flex flex-row mt-[0.625em] ml-[1em]"
            >
            
        
             
              <div class=" flex  flex-col w-[44%]"
              >
              <p class=" w-[6rem]">Assigned</p>
                <div>
                      {/* <Popconfirm
                        title="Do you wish to change Status ? "
                        // onConfirm={handleAppClick}
                        // onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      > */}
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleSingleMultiple}
                          checked={single}
                          checkedChildren="Multiple"
                          unCheckedChildren="Single"
                        />
                      {/* </Popconfirm> */}
                    </div>
              </div>
      
              <div class=" flex justify-between width-[50%] ml-4 " >
                                                    <div class=" w-[35%]" >
                                                    <label class=" text-[#444] font-bold text-[0.75rem]" >Department</label>
                      <select  className="customize-select"
                       
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
            <label class=" text-[#444] font-bold text-[0.75rem]" >User</label>
            <select className="customize-select"
         
                 onChange={handleUserChange}
              >
    <option value="">Select user</option>
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
  <div class=" w-[35%] ml-8" >
               <label class=" text-[#444] font-bold text-[0.75rem]" >User</label>
   <Field
               name="multyAsignedTOId"
               // label="Include"
              //  label={
              //    <FormattedMessage
              //      id="app.multyAsignedTOId"
              //      defaultMessage="User"
              //    />
              //  }
              style={{width:"10rem"}}
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
                {moment(props.distributionAutomation.updationDate).format("ll")} by{" "}
                {props.distributionAutomation.updatedBy}
              </div>
        </Form>
      </MainWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteForm);
