import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
import { Formik, Form, Field } from "formik";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { StyledLabel } from "../../../../../Components/UI/Elements";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
 import { addApprove, getApproveData } from "../../../../Settings/SettingsAction";
import {getDepartments} from "../../../Department/DepartmentAction"
import {
    getRoles,
  } from "../../../../Settings/Category/Role/RoleAction";
  import * as Yup from "yup";
import { FormattedMessage } from "react-intl";
import ProspectCustomerLevelForm from "./ProspectCustomerLevelForm";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const MileageSchema = Yup.object().shape({
    roleTypeId: Yup.string().required("Input needed!"),
});
class ProspectCustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approve: false,
            type: true,
            amendment: true,
            selectedOption: null,
        };
    }

    handleChange = (value) => {
        this.setState({ selectedOption: value });
      };
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
     this.props.getApproveData( "ProspectToCustomer");
 }

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
                        subProcessName: "ProspectToCustomer",
                        approvalType: this.props.approvalData.approvalType === "Standard" ? true : false,
                        approvalIndicator: this.props.approvalData.approvalIndicator ? true : false,
                    
                    }}

                    validationSchema={MileageSchema}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                        // if (this.state.approveType) {
                        this.props.addApprove(
                            {
                                ...values,
                                selectedOption: this.state.selectedOption,
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
                            <div class=" w-[71%] min-h-{40vh}"
                              >

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
                                {values.approvalIndicator ? (
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
                                                            width={"8em"}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div class=" mt-4" >
                                            {values.approvalType ? (
                                                <ProspectCustomerLevelForm
                                                  
                                                    approvalIndicator={values.approvalIndicator ? true : false}
                                                    approvalType={values.approvalType ? "Standard" : "Exception"}
                                                />
                                            ) : ( 
                                                <div class=" flex justify-between" >
                                                    <div class=" w-[32%]">
                                                    <Select
                      value={this.state.selectedOption}
                      onChange={this.handleChange}
                  >
                    <option value="ReportingManager">Reporting Manager</option>
                    <option value="ReportingManager+1">Reporting Manager +1</option>
                    <option value="Management">Management</option>
                  </Select>
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
                                 ) : (null)} 

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

export default connect(mapStateToProps, mapDispatchToProps)(ProspectCustomerForm);
