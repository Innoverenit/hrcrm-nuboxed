import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { StyledLabel } from "../../../../../Components/UI/Elements";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
 import { addApprove, getApproveData } from "../../../../Settings/SettingsAction";
import {getDepartments} from "../../../Department/DepartmentAction"
import {
    getRoles,
  } from "../../../../Settings/Category/Role/RoleAction";
import { FormattedMessage } from "react-intl";
const ExpenseLevelApproveForm = lazy(() => import("./ExpenseLevelApproveForm"));
class ExpenseApproveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approve: false,
            type: true,
            amendment: true
        };
    }
    handleApproveToggle = (checked) => {
        console.log(checked);
        this.setState({
            approve: checked,
        });
    };

    handleApproveType = (checked) => {
        console.log(checked);
        this.setState({
            type: checked,
        });
    };


 componentDidMount() {
         this.props.getDepartments();
         this.props.getRoles(this.props.organizationId);
     this.props.getApproveData( "Expense");
 }



 getRoleOptions(filterOptionKey, filterOptionValue) {
    const roleOptions =
      this.props.roles.length &&
      this.props.roles
        .filter((option) => {
          if (
            option.departmentId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.roleType || "",
          value: option.roleTypeId,
        }));

    return roleOptions;
  };
    render() {
    
        const departmentNameOption = this.props.departments.map((item) => {
            return {
                label: `${item.departmentName || ""}`,
                value: item.departmentId,
            };
        });
        const roleNameOption = this.props.roles.map((item) => {
            return {
                label: `${item.roleType || ""}`,
                value: item.roleTypeId,
            };
        });
     

    
        return (
            <>
                <Formik
                    enableReinitialize
                    initialValues={{
                        // reportingTo: this.props.approvalData.reportingTo || "",
                        threshold: this.props.approvalData.threshold || "",
                        departmentId: this.props.approvalData.departmentId || "",
                        roleTypeId: this.props.approvalData.roleTypeId || "",
                        jobLevel: this.props.approvalData.jobLevel || 1,
                        // processName: "BOQ",
                        subProcessName: "Expense",
                        approvalType: this.props.approvalData.approvalType === "Standard" ? true : false,
                        approvalIndicator: this.props.approvalData.approvalIndicator ? true : false,
                    
                    }}


                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                        // if (this.state.approveType) {
                        this.props.addApprove(
                            {
                                ...values,
                                approvalType: values.approvalType ? "Standard" : "Exception",
                                approvalIndicator: values.approvalIndicator ? true : false,
                               
                            },

                        );
                        resetForm();
                    }}
                >
                    {({
                        errors,
                        touched,
                        isSubmitting,
                        setFieldValue,
                        setFieldTouched,
                        values,
                        ...rest
                    }) => (
                        <Form >
                            <div
                                style={{
                                    minHeight: "40vh",
                                    width: "70%"
                                }}>

                                <div>
                                <div class=" flex justify-between">
                                        <div class=" flex w-[20%]"
                                     
                                        >
                                            <StyledLabel>Approval Needed</StyledLabel>
                                            &nbsp;&nbsp;
                                        </div>

                                        <div class=" flex justify-between w-[30%]"
                                        
                                        >
                                            <div class=" w-[30%]">

                                                <Field
                                                    name="approvalIndicator"
                                                    component={SwitchComponent}
                                                     data={values.approvalIndicator}
                                                    checkedChildren={"Yes"}
                                                    unCheckedChildren={"No"}
                                                    width={"5em"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {values.approvalIndicator ? ( */}
                                     <div class=" mt-4">
                                     
                                        <div>
                                        <div class=" flex justify-between "
                                        
                                        >
                                                <div class=" flex w-[20%] mb-[2%]"
                                              
                                                >
                                                    <StyledLabel>Type</StyledLabel>

                                                </div>

                                                <div class=" flex justify-between w-[30%]"
                                        
                                        >
                                                       <div class=" w-[40%]">

                                                        <Field
                                                            name="approvalType"
                                                            component={SwitchComponent}
                                                             data={values.approvalType}
                                                            checkedChildren={"Standard"}
                                                            unCheckedChildren={"Exception"}
                                                            width={"6em"}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                     
                                        <div class=" mt-4" >
                                            {values.approvalType ? (
                                                <ExpenseLevelApproveForm
                                                  
                                                    approvalIndicator={values.approvalIndicator ? true : false}
                                                    approvalType={values.approvalType ? "Standard" : "Exception"}
                                                />
                                            ) : ( 
                                                <div class=" flex justify-between" >
                                                <div class=" w-[32%]">
                                                        <Field
                                                            name="departmentId"
                                                            label="Department"
                                                            options={Array.isArray(departmentNameOption) ? departmentNameOption : []}
                                                            component={SelectComponent}
                                                            value={values.departmentId}
                                                            placeholder
                                                            isColumn
                                                            inlineLabel
                                                            style={{ flexBasis: "80%", marginTop: "0px", width: "100%" }}
                                                        />
                                                    </div>

                                                    <div class=" w-[32%]">
                                                    {/* <Field
                                                            name="roleTypeId"
                                                            label="Role"
                                                            options={Array.isArray(roleNameOption) ? roleNameOption : []}
                                                            component={SelectComponent}
                                                            value={values.roleTypeId}
                                                            placeholder
                                                            isColumn
                                                            inlineLabel
                                                            style={{ flexBasis: "80%", marginTop: "0px", width: "100%" }}
                                                        /> */}
                                                 <Field
                    name="roleTypeId"
                    label={<FormattedMessage
                      id="app.role"
                      defaultMessage="Role"
                    />}
                    isColumnWithoutNoCreate
                    component={SelectComponent}
                    options={
                      Array.isArray(
                        this.getRoleOptions(
                          "departmentId",
                          values.departmentId
                        )
                      )
                        ? this.getRoleOptions(
                            "departmentId",
                            values.departmentId
                          )
                        : []
                    }
                    value={values.roleTypeId}
                    filterOption={{
                      filterType: "departmentId",
                      filterValue: values.departmentId,
                    }}
                    disabled={!values.departmentId}
                    isColumn
                    margintop={"0"}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                    // value={values.roleTypeId}
                    // width={"100%"}
                    // isColumn
                    // selectType="roleType"
                     /> 
                                                    </div>
                                              
                                                </div>
                                            )} 
                                        </div>

                                    
                                        {!values.approvalType ?
                                           <div class=" flex justify-end " 
                                           // style={{ marginLeft: "104%", marginTop: "52px" }}
                                           >
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                     loading={this.props.addingApprove}
                                                    style={{
                                                        marginRight: "-230px",
                                                        marginTop: "52px",
                                                        marginBottom: "5px",
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                            </div>
                                           : null}
                                    </div>
                                 {/* ) : (null)}  */}

                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = ({ settings, departments,auth,role,designations }) => ({
     addingApprove: settings.addingApprove,
    departments:departments.departments,
    designations: designations.designations,
    approvalData: settings.approvalData,
    roles: role.roles,
    organizationId: auth.userDetails.organizationId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
         addApprove,
         getDepartments,
         getRoles,
        //  getDesignations,
        getApproveData,
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseApproveForm);
