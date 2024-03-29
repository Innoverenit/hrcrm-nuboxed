import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import { Spacer } from "../../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import Upload from "../../../../../../Components/Forms/Formik/Upload";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import * as Yup from "yup";
import {
  addContactShipper,
  getShipperByShipperId,
} from "../../../ShipperAction";
import {getCountries} from "../../../../../Auth/AuthAction";
import { getDesignations } from "../../../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../../../Settings/Department/DepartmentAction";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const DistributorSchema = Yup.object().shape({
  emailId: Yup.string()
  .email("Enter a valid Email").required("Input needed!"),
firstName: Yup.string().required("Input needed!"),
phoneNo: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(8,"Too Short").max(10,"Too Large")
});
const { Option } = Select;

class ContactShipperForm extends Component {
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
            shipperId: this.props.shipperId,
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
          validationSchema={DistributorSchema}
          onSubmit={(values, { resetForm }) => {
            this.props.addContactShipper(
              {
                ...values,
              },
              this.props.shipperId
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
            <Form class="form-background">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                ><Spacer/>
                  <FlexContainer flexWrap="no-wrap">
                    <FastField name="imageId" component={Upload} />
                    <div>
                      <FlexContainer justifyContent="space-between">
                        <div style={{ width: "35%" }}>
                          <FastField
                            name="salutation"
                            type="text"
                            label={<FormattedMessage id="app.salutation" defaultMessage="Salutation" />}
                            options={["Mr.", "Ms.", "None"]}
                            component={SelectComponent}
                            inlineLabel
                            className="field"
                            isColumn
                            style={{
                              flexBasis: "80%",
                              height: "2.0625em",
                              marginTop: "0.25em",
                            }}
                          />
                        </div>
                        <div style={{ width: "55%" }}>
                          <FastField
                            isRequired
                            name="firstName"
                            label={<FormattedMessage id="app.firstname" defaultMessage="First Name" />}
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                            style={{
                              height: "2.0625em",
                              flexBasis: "80%",
                              marginTop: "0.25em",
                            }}
                          />
                        </div>
                      </FlexContainer>                     
                      <FlexContainer justifyContent="space-between">
                        <div style={{ width: "40%" }}>
                          <FastField
                            name="middleName"
                            label={<FormattedMessage id="app.middlename" defaultMessage="Middle Name" />}
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                            style={{
                              height: "2.0625em",
                              flexBasis: "80%",
                              marginTop: "0.25em",
                            }}
                          />
                        </div>
                        <div style={{ width: "55%" }}>
                          <FastField
                            name="lastName"
                            label={<FormattedMessage id="app.lastname" defaultMessage="Last Name" />}
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                            style={{
                              height: "2.0625em",
                              flexBasis: "80%",
                              marginTop: "0.25em",
                            }}
                          />
                        </div>
                      </FlexContainer>
                    </div>
                  </FlexContainer>             
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="dialCode1"
                        label={<FormattedMessage id="app.dialcode" defaultMessage="Dial Code" />}
                        isColumn
                        margintop={"0.25em"}
                        // component={SearchSelect}
                        component={SelectComponent}
                        options={Array.isArray(Dialcodes) ? Dialcodes : []}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        // value={values.countryDialCode}
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                        isColumnWithoutNoCreate
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="mobileNo"
                        label={<FormattedMessage id="app.mobile" defaultMessage="Mobile #" />}
                        placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="dialCode2"
                        selectType="dialCode"
                        label={<FormattedMessage id="app.dialcode" defaultMessage="Dial Code" />}
                        isColumn
                        margintop={"0.25em"}
                        component={SelectComponent}
                        options={Array.isArray(Dialcodes) ? Dialcodes : []}
                        // component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        // value={values.countryDialCode1}
                        inlineLabel
                        style={{ flexBasis: "80%" }}
                        isColumnWithoutNoCreate
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="phoneNo"
                        label={<FormattedMessage id="app.phone" defaultMessage="Phone #" />}
                        placeholder="Phone #"
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          marginTop: "0.25em",
                        }}
                        
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "100%" }}>
                      <FastField
                        type="email"
                        name="emailId"
                        label={<FormattedMessage id="app.email" defaultMessage="Email" />}
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel                     
                      />
                    </div>
                  </FlexContainer>               
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "100%" }}>
                      <FastField
                        type="text"
                        name="linkedIn"
                        label={<FormattedMessage id="app.linkedin" defaultMessage="Linkedin" />}
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel                      
                      />
                    </div>
                  </FlexContainer>                
                  <Field
                    name="notes"
                    label={<FormattedMessage id="app.notes" defaultMessage="Notes"/>}
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}                 
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
                        placeholder={<FormattedMessage id="app.designation" defaultMessage="Designation"/>}
                        label={<FormattedMessage id="app.designation" defaultMessage="Designation"/>}
                        component={SelectComponent}
                        options={Array.isArray(designation) ? designation : []}                     
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="departmentId"
                        label={<FormattedMessage id="app.department" defaultMessage="Department"/>}
                        component={SelectComponent}
                        options={Array.isArray(department) ? department : []}                       
                      />
                    </div>
                  </FlexContainer>
                  <FlexContainer>
                    {" "}
                    <div style={{ width: "100%" }}>
                      <Field
                        name="shipById"
                        selectType="shipperName"
                        label={<FormattedMessage id="app.mode" defaultMessage="Mode"/>}
                        component={SearchSelect}
                        isColumn
                        value={values.shipById}
                        inlineLabel
                        isColumnWithoutNoCreate
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
                  loading={this.props.addingContactShipper}
                >
                  {<FormattedMessage id="app.create" defaultMessage="Create"/>}
                  
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ auth, shipper, designations, departments }) => ({
  addingContactShipper: shipper.addingContactShipper,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  shipperId: shipper.shipperDetailsByShipperId.shipperId,
  shipperDetailsByShipperId: shipper.shipperDetailsByShipperId,
  designations: designations.designations,
  departments: departments.departments,
  countries: auth.countries,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addContactShipper,
      getShipperByShipperId,
      getDepartments,
      getDesignations,
      getCountries
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactShipperForm);
