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
import SupplierContactLevelApproveForm from "./SupplierContactLevelApproveForm";
const ContactUserLevelApproveForm = lazy(() => import("./ContactUserLevelApproveForm"));
class SupplierContactuserForm extends Component {
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
     this.props.getApproveData( "Supplier Contact To User");
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
                       
                        threshold: this.props.approvalData.threshold || "",
                        departmentId: this.props.approvalData.departmentId || "",
                        roleTypeId: this.props.approvalData.roleTypeId || "",
                        jobLevel: this.props.approvalData.jobLevel || 1,
                       
                        subProcessName: "Supplier Contact To User",
                        approvalType: this.props.approvalData.approvalType === "Standard" ? true : false,
                        approvalIndicator: this.props.approvalData.approvalIndicator ? true : false,
                    
                    }}


                    onSubmit={(values, { resetForm }) => {
                        console.log(values);
                       
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
                            <div class=" w-[70%] min-h-{40vh}"
        >

                                <div>
                                <div class=" flex justify-between">
                                        <div class=" flex w-[20%]"
                                     
                                        >
                                            <div class=" text-xs font-bold font-poppins text-black">Approval Needed</div>
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
                                     
                                       
                                        <div class=" mt-4" >
                                        <SupplierContactLevelApproveForm
                                                  
                                                  approvalIndicator={values.approvalIndicator ? true : false}
                                                  approvalType={values.approvalType ? "Standard" : "Exception"}
                                              />
                                            
                                        </div>
                                        
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierContactuserForm);
