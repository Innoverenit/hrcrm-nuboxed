
import React, { useState,useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import dayjs from "dayjs";
import {getEmployeeData} from "../../../../../Employees/EmployeeAction"
import { InputComponent } from '../../../../../../Components/Forms/Formik/InputComponent';
import { SelectComponent } from '../../../../../../Components/Forms/Formik/SelectComponent';
import { Button, } from "antd";
import { Formik, Form, Field } from "formik";
import { Select } from "antd";
import { getWebsite,addWebsite } from '../../../../SettingsAction';
import { StyledLabel } from "../../../../../../Components/UI/Elements";

const { Option } = Select;

    function WebsiteForm(props) {
        useEffect(() =>{
          props.getWebsite( props.organizationId);
        },[]);

        const [selectType, setSelectType] = useState("");

        function handleChange(data) {
          setSelectType(data);
          props.getEmployeeData(data);
          
        }
     
        console.log(props.website.length && props.website[0].ip)

        const employeeNameOption = props.employeesData.map((item) => {
          return {
            label: `${item.fullName || ""}`,
            value: item.employeeId,
          };
        });
  return (
    <>
      <Formik
      enableReinitialize
        initialValues={{
          url: props.website.length && props.website[0].url,
          ip:  props.website.length && props.website[0].ip,
          orgId: props.organizationId,
          assignToUserId: props.website.length && props.website[0].assignToUserId,
        }}
        onSubmit={(values) => {
            props.addWebsite(
                {
                    ...values,
                },
                props.organizationId
            )
        }}
      >
        {({ values }) => (
          <Form className="form-background">
            <div style={{ display: "flex", justifyContent: "space-between",alignItems: "center" }}>
              <div
                style={{
                  height: "100%",
                  width: "60%",
                }}
              > 
          <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
              <div style={{width:"45%"}}>           
                <Field
                  label="URL"
                  name="url"
                  type="text"
                  width={"100%"}
                  //   placeholder="Email"
                  // value={values.userName}
                  component={InputComponent}
                />
                </div>  
                <div style={{width:"45%"}}>
                  
                <Field
                  label="IP"
                  name="ip"
                  type="text"
                  width={"100%"}
                  //   placeholder="Email"
                  // value={values.userName}
                  component={InputComponent}
                />
                </div>                  
                </div>
                <mt-3 />
                <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                      <div style={{ width: "44%" }}>
                      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">               
                      <StyledLabel >Talent From This Channel Will be Assigned</StyledLabel> 
                              
                      {/* <Switch                                              
             
                        checkedChildren="Employee"
                        unCheckedChildren="Contractor"
                      /> */}

<Select
  
  // style={{ width: '100%' }}
  placeholder="Select"
 //  defaultValue={partners}
 onChange={(e) => handleChange(e)}
>

  
<Option value="employee">Employee</Option>
   <Option value="contractor">Contractor</Option>
   
  
</Select> 
                     
                      </div>
                      </div>
                      <div style={{ width: "30%" }}>
                      {selectType === "employee" ? (
                       <Field
                        name="assignToUserId"
                        // defaultValue={values.assignToUserId}
                        // isColumnWithoutNoCreate
                        label="Employee"
                        // label={handleChange ? "Contractor" : "Employee"}
                        isColumn
                        
                        width={"47%"}
                       
                        isRequired
                        component={SelectComponent}
                        options={Array.isArray(employeeNameOption) ? employeeNameOption : []}
                      />
                      ) : selectType === "contractor" ? (
                       <Field
                        name="assignToUserId"
                        label="Contractor"
                        // isColumnWithoutNoCreate
                        // label={handleChange ? "Contractor" : "Employee"}
                        isColumn
                        
                        width={"47%"}
                       
                        isRequired
                        component={SelectComponent}
                        options={Array.isArray(employeeNameOption) ? employeeNameOption : []}
                      />
                      ) : null}
                      </div>
                      
                      </div>
              </div>
              </div>   
              <div>Updated on {dayjs(props.website && props.website.length && props.website[0].lastUpdatedOn).format("ll")} by {props.website && props.website.length && props.website[0].name}</div>
              <mt-3 style={{ marginTop: "1.25em" }} />

              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button 
                      type="primary"
                      htmlType="submit"
                      Loading={props.addingWebsite}
                    >Update                  
                    </Button>
                    </div>
                     </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth,settings,employee }) => ({
  // user: auth.userDetails,
  // userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  website: settings.website,
  employees: employee.employees,
  employeesData: employee.employeesData,
  userId:auth.userId,
      addingWebsite: settings.addingWebsite,
      addingWebsiteError: settings.addingWebsiteError,
      fetchingWebsite: settings.fetchingWebsite,
      fetchingWebsiteError: settings.fetchingWebsiteError,
});


const mapDispatchToProps = (dispatch) =>
bindActionCreators(
    {
        getWebsite,
        // getEmployeelist,
        getEmployeeData,
        addWebsite,
      },dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WebsiteForm)