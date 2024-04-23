import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import PostImageUpld from "../../../../../../../Components/Forms/Formik/PostImageUpld";
import { FlexContainer } from "../../../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import { addSupplierContact } from "../../../../SuppliersAction";
import { getDesignations } from "../../../../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../../../../Settings/Department/DepartmentAction";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
    firstName: Yup.string().required("Input needed!"),
    emailId: Yup.string().required("Input needed!"),
});

class SupplierContactForm extends Component {
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
                        userId: this.props.userId,
                        supplierId: this.props.type === "supplier" ? this.props.id : "",
                        distributorId: this.props.type === "distributor" ? this.props.id : "",
                        shipperId: this.props.type === "shipper" ? this.props.id : "",
                        salutation: "",
                        mobileNo: "",
                        phoneNo: "",
                        notes: "",
                        middleName: "",
                        linkedIn: "",
                        lastName: "",
                        firstName: "",
                        dialCode1: "",
                        dialCode2: "",
                        emailId: "",
                        departmentId: "",
                        designationId: "",
                        address: [
                            {
                                addressType: "",
                                address1: "",
                                address2: "",
                                addressId: "",
                                date: "",
                                street: "",
                                city: "",
                                pinCode: "",
                                country: "",
                                county: "",
                                latitude: "",
                                longitude: "",
                                location: "",
                                state: "",
                            },
                        ],

                    }}

                    validationSchema={ContactSchema}
                    onSubmit={(values, { resetForm }) => {
                        this.props.addSupplierContact(
                            {
                                ...values,
                            },
                            this.props.id
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
                                        <FastField name="imageId" component={PostImageUpld} />
                                        <div>
                                            <FlexContainer justifyContent="space-between">
                                                {/* <div style={{ width: "35%" }}>
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
                                                </div> */}
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
                                            <Spacer />
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
                                    <Spacer />
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
                                    <Spacer />
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

                                    <Spacer />
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
                                                    borderRight: "3px red solid",
                                                    flexBasis: "80%",
                                                    height: "2.0625em",
                                                    marginTop: "0em",
                                                }}
                                            />
                                        </div>
                                    </FlexContainer>
                                    <Spacer />
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
                                    <Spacer style={{ marginTop: "25px" }} />
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
                                    <Spacer />

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
                                    loading={this.props.addingContactSupplier}
                                >
                                    {/* <FormattedMessage id="app.create" defaultMessage="Create" /> */}

                                    Create
                                </Button>
                            </FlexContainer>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

const mapStateToProps = ({ auth, suppliers, designations, departments }) => ({
    addingContactSupplier: suppliers.addingContactSupplier,
    user: auth.userDetails,
    userId: auth.userDetails.userId,
    supplierId: suppliers.supplierDetailById.supplierId,
    departments: departments.departments,
    designations: designations.designations,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addSupplierContact,
            getDesignations,
            getDepartments,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SupplierContactForm);
