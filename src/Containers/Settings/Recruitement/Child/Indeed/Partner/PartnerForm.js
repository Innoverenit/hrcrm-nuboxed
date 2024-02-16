import PropTypes from 'prop-types'
import React, { useState,useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import dayjs from "dayjs";
import {getEmployeeData} from "../../../../../Employees/EmployeeAction"
import { FlexContainer } from '../../../../../../Components/UI/Layout'
import { InputComponent } from '../../../../../../Components/Forms/Formik/InputComponent';
import { SelectComponent } from '../../../../../../Components/Forms/Formik/SelectComponent';
import { Button,Input,Switch } from "antd";
import { Formik, Form, Field } from "formik";
import { Spacer } from "../../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { Select } from "antd";
import { getPartner,addPartner } from '../../../../SettingsAction';
import { StyledLabel } from "../../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
const { Option } = Select;

    function PartnerForm(props) {
        useEffect(() =>{
          props.getPartner( props.organizationId);
        },[]);

        const [selectType, setSelectType] = useState("");

        function handleChange(data) {
          setSelectType(data);
          props.getEmployeeData(data);
        }
        console.log(props.partner.length && props.partner[0].ip)

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
          url: props.partner.length && props.partner[0].url,
          ip:  props.partner.length && props.partner[0].ip,
          orgId: props.organizationId,
          assignToUserId: props.partner.length && props.partner[0].assignToUserId,
        }}
        onSubmit={(values) => {
            props.addPartner(
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
              <FlexContainer justifyContent= "space-between">  
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
                </FlexContainer>
                <Spacer />
                {/* <FlexContainer justifyContent="space-between">
                  <StyledLabel>Candidate  From This Channel Will be Assigned to</StyledLabel> 
                  <div style={{ width: "45%" }}>  
                      <Field
                        name="assignToUserId"
                        // isColumnWithoutNoCreate
                        isColumn
                        
                        width={"47%"}
                       
                        isRequired
                        component={SelectComponent}
                        options={Array.isArray(employeeNameOption) ? employeeNameOption : []}
                      />
                      </div>
                      </FlexContainer> */}
                      <FlexContainer justifyContent="space-between">
                      <div style={{ width: "44%" }}>
                      <FlexContainer justifyContent="space-between">                 
                      <StyledLabel >Vendor From This Channel Will be Assigned to</StyledLabel>                  
                      {/* <Switch                                              
                        // checked={this.state.availability}
                        // onChange={this.handleAvailability}
                        // disabled={this.state.availability}
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
                      </FlexContainer>
                      </div>
                      <div style={{ width: "30%" }}>
                      {selectType === "employee" ? (
                       <Field
                        name="assignToUserId"
                        // isColumnWithoutNoCreate
                        label="Employee"
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
                      
                      </FlexContainer>
              </div>
              </div>  
              <div>Updated on {dayjs(props.partner && props.partner.length && props.partner[0].lastUpdatedOn).format("ll")} by {props.partner && props.partner.length && props.partner[0].name}</div> 
              <Spacer style={{ marginTop: "1.25em" }} />
              <FlexContainer justifyContent="flex-end">
                <Button 
                      type="primary"
                      htmlType="submit"
                   Loading={props.addingPartner}
                    >Update                  
                    </Button>
                    </FlexContainer>
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
  partner: settings.partner,
  employees: employee.employees,
  userId:auth.userId,
      addingPartner: settings.addingPartner,
      addingPartnerError: settings.addingPartnerError,
      fetchingPartner: settings.fetchingPartner,
      employeesData: employee.employeesData,
      fetchingPartnerError: settings.fetchingPartnerError,
});


const mapDispatchToProps = (dispatch) =>
bindActionCreators(
    {
        getPartner,
        getEmployeeData,
        addPartner,
      },dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PartnerForm)