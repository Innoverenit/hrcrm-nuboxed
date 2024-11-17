import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FastField, FieldArray } from "formik";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { updateDistributorContact } from "../../../Suppliers/SuppliersAction";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { getDesignations } from "../../../../Settings/Designation/DesignationAction"
import { getDepartments } from "../../../../Settings/Department/DepartmentAction"

import PostImageUpld from "../../../../../Components/Forms/Formik/PostImageUpld";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const DistributorSchema = Yup.object().shape({
    firstName: Yup.string().required("Input required"),
    mobileNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long"),
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
                        address: [
                            {
                                addressId: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].addressId : "",
                                addressType: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].addressType : "",
                                address1: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].address1 : "",
                                address2: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].address2 : "",
                                date: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].date : "",
                                street: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].street : "",
                                city: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].city : "",
                                state: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].state : "",
                                pinCode: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].pinCode : "",
                                country: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].country : "",
                                county: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].county : "",
                                state: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].state : "",
                                location: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].location : "",
                                latitude: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].latitude : "",
                                longitude: this.props.setEditingDistributorContact.addresses.length ? this.props.setEditingDistributorContact.addresses[0].longitude : "",
                            },
                        ],

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
                        this.props.handleUpdateDistributorContactModal(false)
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
                                            <FastField name="imageId" component={PostImageUpld} />
                                        </div>
                                        <div class="w-[60%]">

                                            <FastField
                                                isRequired
                                                name="firstName"
                                                label="First Name" 
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
                                                        label="Middle Name" 
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
                                                        label="Last Name" 
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
                                                label="Mobile #" 
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


                                    <div>

                                        <FastField
                                            isRequired
                                            type="email"
                                            name="emailId"
                                            label="Email"
                                            className="field"
                                            isColumn
                                            width={"100%"}
                                            component={InputComponent}
                                            inlineLabel
                                            style={{ borderRight: "3px red solid" }}
                                        />
                                    </div>
                                    <div class="w-full">
                                        <FastField
                                            name="LinkedIn"
                                            label="LinkedIn" 
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
                                            label="Notes" 
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
                                                label="Designation" 
                                                component={SelectComponent}
                                                options={Array.isArray(designation) ? designation : []}
                                                style={{
                                                    width: "100%"
                                                }}
                                            />
                                        </div>
                                        <div class="w-[47%]">
                                            <Field
                                                name="departmentId"
                                                component={InputComponent}
                                                label="Department"
                                                style={{
                                                    width: "100%"
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="mt-3">
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
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.props.updateDisributorContactById}
                                >Update
                                    
                                </Button>
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
