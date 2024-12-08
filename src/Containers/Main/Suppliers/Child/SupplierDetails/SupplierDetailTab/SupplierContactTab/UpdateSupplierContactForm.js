import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Select, Icon, Tag, Switch } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";

import { ShowOrCollapse } from "../../../../../Components/Common";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import Upload from "../../../../../Components/Forms/Formik/Upload";

import { FlexContainer } from "../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { updateSupplierContact } from "../../../SuppliersAction";
import { getDesignations } from "../../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../../Settings/Department/DepartmentAction";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
    firstName: Yup.string().required("Input needed!"),
    // emailId: Yup.string().required("Input needed!"),
});

class UpdateSupplierContactForm extends Component {
    componentDidMount() {
        this.props.getDesignations();
        this.props.getDepartments();
    }

    render() {
        const designation = this.props.designations.map((item) => {
            return {
                label: item.designationName || "",
                value: item.designationId,
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
                        userId: this.props.userId,
                        supplierId: this.props.supplierId,
                        contactPersonId: this.props.setEditingSupplierContact.contactPersonId || "",
                        salutation: this.props.setEditingSupplierContact.salutation || "",
                        mobileNo: this.props.setEditingSupplierContact.mobileNo || "",
                        phoneNo: this.props.setEditingSupplierContact.phoneNo || "",
                        notes: this.props.setEditingSupplierContact.notes || "",
                        middleName: this.props.setEditingSupplierContact.middleName || "",
                        linkedIn: this.props.setEditingSupplierContact.linkedIn || "",
                        lastName: this.props.setEditingSupplierContact.lastName || "",
                        firstName: this.props.setEditingSupplierContact.firstName || "",
                        dialCode1: this.props.setEditingSupplierContact.dialCode1 || "",
                        dialCode2: this.props.setEditingSupplierContact.dialCode2 || "",
                        emailId: this.props.setEditingSupplierContact.emailId || "",
                        departmentId: this.props.setEditingSupplierContact.departmentId || "",
                        designationId: this.props.setEditingSupplierContact.designationId || "",
                        address: [
                            {
                                addressType: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].addressType
                                    : "",
                                addressId: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].addressId
                                    : "",
                                address1: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].address1
                                    : "",
                                address2: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].address2
                                    : "",
                                town: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].town
                                    : "",
                                street: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].street
                                    : "",
                                city: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].city
                                    : "",
                                state: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].state
                                    : "",
                                pinCode: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].pinCode
                                    : "",
                                country: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].country
                                    : "",
                                dialCode: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].dialCode
                                    : "",
                                latitude: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].latitude
                                    : "",
                                longitude: this.props.setEditingSupplierContact.addresses.length
                                    ? this.props.setEditingSupplierContact.addresses[0].longitude
                                    : "",
                            },
                        ],

                    }}


                    onSubmit={(values, { resetForm }) => {
                        this.props.updateSupplierContact(
                            {
                                ...values,
                            },
                            this.props.setEditingSupplierContact.contactPersonId
                        );
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        setFieldValue,
                        setFieldTouched,
                    }) => (
                        <Form>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    style={{
                                        height: "100%",
                                        width: "45%",
                                    }}
                                >
                                    <FlexContainer flexWrap="no-wrap">
                                        <FastField name="imageId" component={Upload} />
                                        <div>
                                            <FlexContainer justifyContent="space-between">
                                                <div style={{ width: "35%" }}>
                                                    <FastField
                                                        name="salutation"
                                                        type="text"
                                                        label="Salutation"
                                                        options={["Mr.", "Ms.", "None"]}
                                                        component={SelectComponent}
                                                        inlineLabel
                                                        className="field"
                                                        isColumn
                                                        style={{
                                                            flexBasis: "80%",
                                                            height: "2.0625em",
                                                            marginTop: "0em",
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ width: "63%" }}>
                                                    <FastField
                                                        isRequired
                                                        name="firstName"
                                                        label="First Name"
                                                        type="text"
                                                        width={"100%"}
                                                        isColumn
                                                        component={InputComponent}
                                                        inlineLabel
                                                        style={{
                                                            height: "2.0625em",
                                                            flexBasis: "80%",
                                                            marginTop: "0em",
                                                        }}
                                                    />
                                                </div>
                                            </FlexContainer>
                                            <div class=" mt-3" />
                                            <FlexContainer justifyContent="space-between">
                                                <div style={{ width: "40%" }}>
                                                    <FastField
                                                        name="middleName"
                                                        label="Middle Name"
                                                        type="text"
                                                        width={"100%"}
                                                        isColumn
                                                        component={InputComponent}
                                                        inlineLabel
                                                        style={{
                                                            height: "2.0625em",
                                                            flexBasis: "80%",
                                                            marginTop: "0em",
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ width: "55%" }}>
                                                    <FastField
                                                        name="lastName"
                                                        label="Last Name"
                                                        type="text"
                                                        width={"100%"}
                                                        isColumn
                                                        component={InputComponent}
                                                        inlineLabel
                                                        style={{
                                                            height: "2.0625em",
                                                            flexBasis: "80%",
                                                            marginTop: "0em",
                                                        }}
                                                    />
                                                </div>
                                            </FlexContainer>
                                        </div>
                                    </FlexContainer>
                                    <div class=" mt-3" />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="dialCode1"
                                                label="Mobile #"
                                                isColumn
                                                margintop={"0.25em"}
                                                selectType="dialCode"
                                                component={SearchSelect}
                                                defaultValue={{
                                                    value: this.props.user.countryDialCode,
                                                }}
                                                value={values.countryDialCode}
                                                inlineLabel
                                                style={{ flexBasis: "80%" }}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                type="text"
                                                name="mobileNo"
                                                placeholder="Mobile #"
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                isColumn
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "2.0625em",
                                                    marginTop: "0em",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <div class=" mt-3" />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                name="dialCode2"
                                                selectType="dialCode"
                                                label="Phone #"
                                                isColumn
                                                margintop={"0.25em"}
                                                component={SearchSelect}
                                                defaultValue={{
                                                    value: this.props.user.countryDialCode,
                                                }}
                                                value={values.countryDialCode1}
                                                inlineLabel
                                                style={{ flexBasis: "80%" }}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <FastField
                                                type="text"
                                                name="phoneNo"
                                                placeholder="Phone #"
                                                isColumn
                                                component={InputComponent}
                                                inlineLabel
                                                width={"100%"}
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "2.0625em",
                                                    marginTop: "0em",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>

                                    <div class=" mt-3" />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "100%" }}>
                                            <FastField
                                                // isRequired
                                                type="email"
                                                name="emailId"
                                                label="Email"
                                                className="field"
                                                isColumn
                                                width={"100%"}
                                                component={InputComponent}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "2.0625em",
                                                    marginTop: "0em",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <div class=" mt-3" />
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "100%" }}>
                                            <FastField
                                                type="text"
                                                name="linkedIn"
                                                label="Linkedin "
                                                isColumn
                                                width={"100%"}
                                                component={InputComponent}
                                                inlineLabel
                                                style={{
                                                    flexBasis: "80%",
                                                    height: "2.0625em",
                                                    marginTop: "0em",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <div class=" mt-3" style={{ marginTop: "25px" }} />
                                    <Field
                                        name="notes"
                                        label="Notes"
                                        width={"100%"}
                                        isColumn
                                        component={TextareaComponent}
                                        style={{
                                            flexBasis: "80%",
                                            height: "3em",
                                            // marginLeft: "2.5em",
                                            marginTop: "0em",
                                        }}
                                    />

                                </div>
                                &nbsp;
                                <div
                                    style={{
                                        height: "70%",
                                        width: "45%",
                                        marginTop: "10px"
                                    }}
                                >
                                    <FlexContainer justifyContent="space-between">
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                name="designationId"
                                                placeholder="Designation"
                                                label="Designation"
                                                component={SelectComponent}
                                                options={Array.isArray(designation) ? designation : []}
                                                style={{
                                                    borderRadius: "2px",
                                                    width: "100%"
                                                }}
                                            />
                                        </div>
                                        <div style={{ width: "47%" }}>
                                            <Field
                                                name="departmentId"
                                                // placeholder="Designation"
                                                label="Department"
                                                component={SelectComponent}
                                                options={Array.isArray(department) ? department : []}
                                                style={{
                                                    borderRadius: "2px",
                                                    width: "100%"
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <div class=" mt-3" />

                                    <div style={{ marginTop: "30px" }}>
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
                            <FlexContainer justifyContent="flex-end">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    // icon={<PoweroffOutlined />}
                                    loading={this.props.updateSupplierContactById}
                                >
                                    Update
                                </Button>
                            </FlexContainer>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = ({ auth, suppliers, designation, department }) => ({
    updateSupplierContactById: suppliers.updateSupplierContactById,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    supplierId: suppliers.supplierDetailById.supplierId,
    designations: designation.designations,
    departments: department.departments,
    setEditingSupplierContact: suppliers.setEditingSupplierContact,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            updateSupplierContact,
            getDesignations,
            getDepartments,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSupplierContactForm);
