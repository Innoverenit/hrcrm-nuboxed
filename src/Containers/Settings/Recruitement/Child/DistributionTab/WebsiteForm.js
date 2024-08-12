import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import { FormattedMessage } from "react-intl";
import {
  Select,
} from "../../../../../Components/UI/Elements";
import { div,  } from "../../../../../Components/UI/Elements";
import { Button, Switch } from "antd";
import {
    websiteSingleMultiple,
    getDistributionAutomation,
    getDepartmentwiserUser,
} from "../../../../Settings/SettingsAction";
import {getDepartments} from "../../../Department/DepartmentAction"
import dayjs from "dayjs";
const { Option } = Select;
function WebsiteForm(props) {
 

    const [single, setSingle] = useState(false);
    
    const [userNames, setUserNames] = useState([]);
   
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
  useEffect(() => {
    
    setSingle(props.distributionAutomation.singleMultiInd)
    setSelectedDept(props.distributionAutomation.departmentId)
    
    setSelectedUser(props.distributionAutomation.asignedTOId)
    setUserNames(props.distributionAutomation.multyAsignedTOId || []);
  }, [props.distributionAutomation]);

  const departmentNameOption = props.departments.map((item) => {
    return {
        label: `${item.departmentName || ""}`,
        value: item.departmentId,
    };
});

const handleDeptChange = (value) => {
    const selectedDept = value;
    // setAutdept(selectedDept);
    setSelectedDept(selectedDept)
    
    // setUserNames([]);
    props.getDepartmentwiserUser(selectedDept) // Assuming you want to pass the selected department and filtered roles to a parent component
  };
  const handleUserChange = (value) => {
    const selectedUser = value;
    setSelectedUser(selectedUser);
  };

  const handleChangeUserName =(value)=>{
    setUserNames(value)
  }
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
          //multyAsignedTOId:single === false ? [selectedUser] : [],
          type:"lead",
          departmentId:props.distributionAutomation.departmentId || "",
          userId: props.userId,
          orgId: props.organizationId,
        }}
        onSubmit={(values) => {
          console.log(values)
       
          props.websiteSingleMultiple(
            {
              ...values,
              asignedTOId:selectedUser,

              departmentId: selectedDept,
              
              multyAsignedTOId:userNames,

              singleMultiInd: single ? true : false,
            },
            props.orgId,"lead",
          );
        }}
      >
        {({ values }) => (
       <div class="mr-5 ml-5 h-[28rem] overflow-auto">
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
                                                    <div class=" text-[#444] font-bold text-[0.75rem]" >Department</div>
                      {/* <select  className="customize-select"
                       
                      onChange={handleDeptChange}>
          <option value="">Select Department</option>
          {props.departments.map((item, index) => (
            <option 
           
            key={index} value={item.departmentId}>
              {item.departmentName}
            </option>
          ))}
        </select> */}
        <Select
        className="customize-select"
          value={selectedDept}
          onChange={handleDeptChange}
          // disabled={startInd === true}
          style={{ width: 146 }}
          placeholder="Select"
        >
          {props.departments.map((item, index) => (
          <Option value={item.departmentId}>{item.departmentName}
          </Option>
        ))}
        </Select>
        
        </div>
        {selectedDept && (
          <>                                           
{single === false?(
            <div class=" w-[35%]" >
            <div class=" text-[#444] font-bold text-[0.75rem]" >User</div>
            <Select className="customize-select"
         value={selectedUser}
                 onChange={handleUserChange}
              >
    {/* <option value="">Select user</option> */}
    {props.departmentwiseUser.map((item, index) => (
      <Option key={index}
      // disabled
      // disabled={selectedDept}
       value={item.employeeId}>
        {item.empName}
      </Option>
    ))}
  </Select>
  </div> 

):(   
  <div class=" w-[35%] ml-8" >
               <div class=" text-[#444] font-bold text-[0.75rem]" >User</div>
   {/* <Field
               name="multyAsignedTOId"
            
              style={{width:"10rem"}}
               mode
               placeholder="Select"
               component={SelectComponent}
               options={Array.isArray(employeesData) ? employeesData : []}
               value={values.multyAsignedTOId}
             
             /> */}
              <Select
                       // name="recruitersId"
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select"
                         className="customize-select"
                value={userNames}
                        onChange={handleChangeUserName}
                      >
  
                        {props.departmentwiseUser.map((item, i) => {
                          return (
                            <Option key={item.employeeId} value={item.employeeId}>{item.empName}</Option>
                          )
                        })}
                      </Select>
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

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteForm);
