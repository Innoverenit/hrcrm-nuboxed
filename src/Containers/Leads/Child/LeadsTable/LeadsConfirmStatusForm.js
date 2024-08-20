import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, } from "formik";
import {
  Select,
  
} from "../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { Button, Switch } from "antd";
import {
    getDepartmentwiserUser,
} from "../../../Settings/SettingsAction";
import {convertCustomerStatus} from "../../LeadsAction";
import {getDepartments} from "../../../Settings/Department/DepartmentAction"
const { Option } = Select;
function LeadsConfirmStatusForm(props) {

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
        enableReinitialize
        initialValues={{
          // multyAsignedTOId: [],
          type:"lead",
        //   timePeriod: props.distributionAutomation.timePeriod === 0 ? "Not Applicable" :props.distributionAutomation.timePeriod|| "",
        //   orderTimePeriod: props.distributionAutomation.orderTimePeriod === 0 ? "Not Applicable" :props.distributionAutomation.orderTimePeriod || "",
          userId: props.userId,
          orgId: props.organizationId,
        }}
        onSubmit={(values) => {
          console.log(values)
       
          props.convertCustomerStatus(
            {
              ...values,
              departmentId: selectedDept,
              // singleMultiInd: single ? true : false,
            },
            props.rowdata.leadsId,
          single === false?selectedUser:props.userId,
          );
        }}
      >
        {({ values }) => (
      <div class="mr-5 ml-5 h-[28rem] overflow-auto"> 
        <Form className="form-background">
          <div class=" flex justify-between w-full"
          >
            <div class=" flex  mt-[0.625rem] ml-[1rem]"
            >             
              <div class=" flex justify-between w-[30%] mr-3 "
              >           
                <div>
                     
                      <div class=" text-xs font-bold font-poppins text-black">Assign To</div>
                        <Switch
                          style={{ width: "5em" }}
                          onChange={handleSingleMultiple}
                          checked={single}
                          checkedChildren="Self"
                          unCheckedChildren="Select"
                        />
                  
                    </div>
              </div>
              {single === false &&(
              <div class=" flex justify-between" >
                                                    <div  >
                                                    <div  className="text-black text-xs font-bold"  >Department</div>
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
<div  >
            <div className="text-black text-xs font-bold" >User</div>
            <select   className="customize-select"
                 onChange={handleUserChange}
              >
    <option value="">select user</option>
    {props.departmentwiseUser.map((item, index) => (
      <option key={index}
   
       value={item.employeeId}>
        {item.empName}
      </option>
    ))}
  </select>
  </div>                  
</> 
        )}                                                  
                                         </div>                                          
                                         )}
            </div>
          </div>       
              <div class=" flex justify-end mt-3" >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.linkingCustomerStatus}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Update */}
                </Button>
              </div>
  
        </Form>
      </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings,leads, departments, auth }) => ({
  userId: auth.userDetails.userId,
  linkingCustomerStatus:leads.linkingCustomerStatus,
  departmentwiseUser:settings.departmentwiseUser,
  distributionAutomation: settings.distributionAutomation,
  orgId: auth.userDetails.organizationId,
  departments:departments.departments,
  linkingLeads:leads.linkingLeads,
  updateWebsiteSingleError: settings.updateWebsiteSingleError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      convertCustomerStatus,
        getDepartments,
        getDepartmentwiserUser,
        // getDistributionAutomation,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsConfirmStatusForm);
