import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form} from "formik";
import { FormattedMessage } from "react-intl";
import {
  Select,
} from "../../../../../Components/UI/Elements";
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
          <div class =" flex w-full"
             >                                   
              <div class=" flex  flex-col w-[10%]"
              >
              
             <div class=" text-[#444] font-bold text-xs  w-[6rem]" >Assigned</div>
                <div>                    
                        <Switch classname="w-[6rem]"                     
                          onChange={handleSingleMultiple}
                          checked={single}
                          checkedChildren="Multiple"
                          unCheckedChildren="Single"
                        />
                      {/* </Popconfirm> */}
                    </div>
              </div>
            
              <div class=" flex flex-col justify-between width-[50%] ml-4 " >                                               
                                                    <div class=" text-[#444] font-bold text-xs" >Department</div>
                   
        <Select
        className="customize-select w-[28%]"
          value={selectedDept}
          onChange={handleDeptChange}
          // disabled={startInd === true}      
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
            <div class=" text-[#444] font-bold text-xs ml-4" >User
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
              <div class=" flex justify-end mt-2 ml-8" >
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.updateRequirement}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Update */}
                </Button>
              </div>
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
