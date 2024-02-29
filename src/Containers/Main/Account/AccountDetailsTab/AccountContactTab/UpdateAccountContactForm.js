import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { updateDistributorContact } from "../../AccountAction"
import * as Yup from "yup";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import Upload from "../../../../../Components/Forms/Formik/Upload";
import { getDesignations } from "../../../../Settings/Designation/DesignationAction"
import { getDepartments } from "../../../../Settings/Department/DepartmentAction"
import { FormattedMessage } from "react-intl";

const DistributorSchema = Yup.object().shape({
    firstName: Yup.string().required("Input required"),
});

class UpdateAccountContactForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cash: "false",
            amount: "false",
        };
    }
    handleCashChange = (checked) => {
        console.log(checked);
        this.setState({
            cash: checked,
        });
    };
    handleAmountChange = (checked) => {
        console.log(checked);
        this.setState({
            amount: checked,
        });
    };
    componentDidMount() {
        this.props.getDesignations();
        this.props.getDepartments();
    }
    render() {
        const designation = this.props.designations.map((item) => {
            return {
                label: item.designationType || "",
                value: item.designationTypeId,
            };
        });

        const department = this.props.departments.map((item) => {
            return {
                label: item.departmentName || "",
                value: item.departmentId,
            };
        });
        return (
            <>
                <Formik
                    initialValues={{
                        salutation: this.props.setEditingDistributorContact.salutation || "",
                        mobileNo: this.props.setEditingDistributorContact.mobileNo || "",
                        phoneNo: this.props.setEditingDistributorContact.phoneNo || "",
                        notes: this.props.setEditingDistributorContact.notes || "",
                        middleName: this.props.setEditingDistributorContact.middleName || "",
                        linkedIn: this.props.setEditingDistributorContact.linkedIn || "",
                        distributorId: this.props.distributorId,
                        userId: this.props.userId,
                        contactPersonId: this.props.setEditingDistributorContact.contactPersonId || "",
                        lastName: this.props.setEditingDistributorContact.lastName || "",
                        firstName: this.props.setEditingDistributorContact.firstName || "",
                        dialCode1: this.props.setEditingDistributorContact.dialCode1 || "",
                        dialCode2: this.props.setEditingDistributorContact.dialCode2 || "",
                        emailId: this.props.setEditingDistributorContact.emailId || "",
                        departmentId: this.props.setEditingDistributorContact.departmentId || "",
                        designationId: this.props.setEditingDistributorContact.designationId || "",
                        // address: [
                        //     {
                        //         addressId: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].addressId : "",
                        //         addressType: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].addressType : "",
                        //         address1: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].address1 : "",
                        //         address2: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].address2 : "",
                        //         date: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].date : "",
                        //         street: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].street : "",
                        //         city: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].city : "",
                        //         state: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].state : "",
                        //         pinCode: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].pinCode : "",
                        //         country: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].country : "",
                        //         county: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].county : "",
                        //         state: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].state : "",
                        //         location: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].location : "",
                        //         latitude: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].latitude : "",
                        //         longitude: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].longitude : "",
                        //     },
                        // ],

                    }}
                    validationSchema={DistributorSchema}

                    onSubmit={(values, { resetForm }) => {
                        this.props.updateDistributorContact(
                            {
                                ...values,

                            },
                            this.props.setEditingDistributorContact.contactPersonId,
                            this.props.distributorId,
                        );
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
                        <Form class="form-background">
                           <div class="flex justify-between">
                           <div class="h-full w-[45%]"> 
                           <div class="flex justify-between mt-3">
                                        <div class="w-[40%]">
                                            <Field name="imageId" component={Upload} />
                                        </div>
                                        <div class="w-[60%]">

                                            <FastField
                                                isRequired
                                                name="firstName"
                                                label={<FormattedMessage id="app.firstname" defaultMessage="First Name"/>}
                                                type="text"
                                                width={"100%"}
                                                isColumn
                                                component={InputComponent}
                                                inlineLabel

                                            />

<div class="flex justify-between">
                                                <div class="w-[47%]">
                                                    <FastField
                                                        name="middleName"
                                                        label={<FormattedMessage id="app.middlename" defaultMessage="Middle Name"/>}
                                                        type="text"
                                                        width={"100%"}
                                                        isColumn
                                                        component={InputComponent}
                                                        inlineLabel

                                                    />
                                                </div>
                                                <div class="w-[47%]">
                                                    <FastField
                                                        name="lastName"
                                                        label={<FormattedMessage id="app.lastname" defaultMessage="Last Name"/>}
                                                        type="text"
                                                        width={"100%"}
                                                        isColumn
                                                        component={InputComponent}
                                                        inlineLabel

                                                    />
                                                </div>
                                                </div>
                                        </div>
                                        </div>
                                        <div class="flex justify-between items-end">
                                        <div class="w-[47%]">
                                            <FastField
                                                name="dialCode1"
                                                label={<FormattedMessage id="app.mobile" defaultMessage="Mobile #" />}
                                                isColumn
                                                isColumnWithoutNoCreate
                                                selectType="dialCode"
                                                component={SearchSelect}
                                                value={values.countryDialCode}
                                                inlineLabel

                                            />
                                        </div>
                                        <div class="w-[47%]">
                                            <FastField
                                                type="text"
                                                name="mobileNo"
                                                placeholder="Mobile #"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                            />
                                        </div>
                                        </div>

                                    <div class="flex justify-between items-end mt-3">
                                    <div class="w-[47%]">
                                            <FastField
                                                name="dialCode2"
                                                selectType="dialCode"
                                                label={<FormattedMessage id="app.phone" defaultMessage="Phone #"/>}
                                                isColumn
                                                isColumnWithoutNoCreate
                                                component={SearchSelect}
                                                value={values.countryDialCode1}
                                                inlineLabel
                                               
                                            />
                                        </div>
                                        <div class="w-[47%]">
                                            <FastField
                                                type="text"
                                                name="phoneNo"
                                                placeholder="Phone #"
                                                isColumn
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}

                                            />
                                        </div>
                                    </div>

                                    
<div class="mt-3">

                                    <FastField

                                        type="email"
                                        name="emailId"
                                        label={<FormattedMessage id="app.email" defaultMessage="Email"/>}
                                        className="field"
                                        isColumn
                                        width={"100%"}
                                        component={InputComponent}
                                        inlineLabel
                                    />
                                    </div>
                                    <div class="w-full">
                                        <FastField
                                            name="LinkedIn"
                                            label={<FormattedMessage id="app.linkedIn" defaultMessage="LinkedIn"/>}
                                            className="field"
                                            isColumn
                                            width={"100%"}
                                            component={InputComponent}
                                            inlineLabel
                                        />
                                    </div>
                                    <div class="mt-3">
                                    <Field
                                        name="notes"
                                        label={<FormattedMessage id="app.notes" defaultMessage="Notes"/>}
                                        width={"100%"}
                                        isColumn
                                        component={TextareaComponent}
                                    />
</div>
                                </div>

                                <div
                                class="w-[45%] h-[70%]">
                                    <div class="flex justify-between">
                                        <div class="w-[47%]">
                                            <Field
                                                name="designationId"
                                                placeholder="Designation"
                                                label={<FormattedMessage id="app.designation" defaultMessage="Designation"/>}
                                                component={SelectComponent}
                                                options={Array.isArray(designation) ? designation : []}
                                             
                                            />
                                        </div>
                                        <div class="w-[47%]">
                                            <Field
                                                name="departmentId"
                                                component={InputComponent}
                                                label={<FormattedMessage id="app.department" defaultMessage="Department"/>}
                                                // component={SelectComponent}
                                                // options={Array.isArray(department) ? department : []}
                                                
                                            />
                                        </div>
                                    </div>
                                  

                                    {/* <div>
                                        <FieldArray
                                            name="address"
                                            render={(arrayHelpers) => (
                                                <AddressFieldArray
                                                    singleAddress
                                                    arrayHelpers={arrayHelpers}
                                                    values={values}
                                                />
                                            )}
                                        />
                                    </div> */}
                                </div>
                            </div>
                            <div class="mt-3">
                            <div class="flex justify-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.props.updateDisributorContactById}
                                >
                               <FormattedMessage id="app.update" defaultMessage="Update"/>      
                                </Button>
                            </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}
// }

const mapStateToProps = ({ auth, distributor, departments, designations }) => ({
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    distributor: distributor.distributor,
    setEditingDistributorContact: distributor.setEditingDistributorContact,
    distributorId: distributor.distributorDetailsByDistributorId.distributorId,
    updateDisributorContactById: distributor.updateDisributorContactById,
    departments: departments.departments,
    designations: designations.designations,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateDistributorContact,
            getDesignations,
            getDepartments,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccountContactForm);
