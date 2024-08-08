import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray, FastField } from "formik";

import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { updateShipperContact } from "../../../ShipperAction";
import * as Yup from "yup";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import Upload from "../../../../../../Components/Forms/Formik/Upload";
import { getDesignations } from "../../../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../../../Settings/Department/DepartmentAction";
import {getCountries} from "../../../../../Auth/AuthAction";
class UpdateShipperContactForm extends Component {
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
    this.props.getCountries();
  }
  render() {
    const Dialcodes= this.props.countries.map((item,i) =>{
      return {
        label: `+${item.country_dial_code}`,
        value: `+${item.country_dial_code}`,
      };  
    });

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
            salutation: this.props.setEditingShipperContact.salutation || "",
            mobileNo: this.props.setEditingShipperContact.mobileNo || "",
            phoneNo: this.props.setEditingShipperContact.phoneNo || "",
            notes: this.props.setEditingShipperContact.notes || "",
            middleName: this.props.setEditingShipperContact.middleName || 0,
            linkedIn: this.props.setEditingShipperContact.linkedIn || 0,
            shipperId: this.props.shipperId,
            contactPersonId:
              this.props.setEditingShipperContact.contactPersonId || 0,
            lastName: this.props.setEditingShipperContact.lastName || 0,
            firstName: this.props.setEditingShipperContact.firstName || 0,
            dialCode1: this.props.setEditingShipperContact.dialCode1 || 0,
            dialCode2: this.props.setEditingShipperContact.dialCode2 || 0,
            emailId: this.props.setEditingShipperContact.emailId || 0,
            departmentId:
              this.props.setEditingShipperContact.departmentId || "",
            designationId:
              this.props.setEditingShipperContact.designationId || "",
            address: [
              {
                addressId: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].addressId
                  : "",
                addressType: this.props.setEditingShipperContact.addresses
                  .length
                  ? this.props.setEditingShipperContact.addresses[0].addressType
                  : "",
                address1: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].address1
                  : "",
                address2: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].address2
                  : "",
                date: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].date
                  : "",
                street: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].street
                  : "",
                city: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].city
                  : "",
                state: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].state
                  : "",
                pinCode: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].pinCode
                  : "",
                country: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].country
                  : "",
                county: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].county
                  : "",
                state: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].state
                  : "",
                location: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].location
                  : "",
                latitude: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].latitude
                  : "",
                longitude: this.props.setEditingShipperContact.addresses.length
                  ? this.props.setEditingShipperContact.addresses[0].longitude
                  : "",
              },
            ],
          }}
          onSubmit={(values, { resetForm }) => {
            this.props.updateShipperContact(
              {
                ...values,
                userId: this.props.userId,
              },
              this.props.setEditingShipperContact.contactPersonId,
              this.props.shipperId
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
                       component={SelectComponent}
                        options={Array.isArray(Dialcodes) ? Dialcodes : []}
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
                        component={SelectComponent}
                        options={Array.isArray(Dialcodes) ? Dialcodes : []}
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
                    marginTop: "10px",
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
                          width: "100%",
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
                          width: "100%",
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
                  loading={this.props.updateShipperContactById}
                >
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
// }

const mapStateToProps = ({ auth, shipper, designation, department }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  shipper: shipper.shipper,
  setEditingShipperContact: shipper.setEditingShipperContact,
  shipperId: shipper.shipperDetailsByShipperId.shipperId,
  updateShipperContactById: shipper.updateShipperContactById,
  designations: designation.designations,
  departments: department.departments,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateShipperContact,
      getDesignations,
      getDepartments,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateShipperContactForm);
