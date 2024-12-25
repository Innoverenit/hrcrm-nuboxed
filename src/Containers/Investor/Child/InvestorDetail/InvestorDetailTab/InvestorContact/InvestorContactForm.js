import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Select, } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { createInvestorContact,getInvestorData } from "../../../../InvestorAction";
import PostImageUpld from "../../../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { getDesignations } from "../../../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../../../Settings/Department/DepartmentAction";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // whatsappNumber: Yup.string()
  //   .matches(phoneRegExp, "Whatsapp number is not valid")
  //   .min(5, "Number is too short")
  //   .max(10, "Number is too long"),
  // mobileNumber: Yup.string().required("Input needed!")
  //   .matches(phoneRegExp, "Mobile number is not valid")
  //   .min(8, "Minimum 8 digits")
  //   .max(10, "Number is too long"),
});

class InvestorContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      whatsapp: false,
      currentOption: "",
      candidate: false,
      availability: false,
    };
  }
  componentDidMount() {
    this.props.getInvestorData(this.props.userId);
  }

  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleWhatsApp = (checked) => {
    this.setState({ whatsapp: checked });
  };
  handleReset = (resetForm) => {
    const { callback } = this.props;
    callback && callback();
    resetForm();
  };
  handleClick = (option) => {
    ////debugger;
    this.setState({
      currentOption: option,
    });
    console.log(this.state.option);
    console.log(this.state.currentOption);
  };
  handleFieldClik() {
    this.setState({
      disabled: !this.state.disabled,
      visible: !this.state.visible,
    });
  }
  onChange = (value) => {
    console.log(value);
    this.setState({
      option: value,
    });
  };
  onChange1 = (value) => {
    console.log(value);
    this.setState({
      option1: value,
    });
  };
  onChange2 = (value) => {
    ////debugger;
    console.log(value);
    this.setState({
      option2: value,
    });
  };

  render() {
    const {
      user: { userId, firstName, lastName },
      createInvestorContact,
      addingInvestorContact,
      users,
      linkContact,
      defaultInvestor,
      tagWithCompany,
    } = this.props;
    const investorNameOption = this.props.investorData
    .sort((a, b) => {
      const libraryNameA = a.name && a.name.toLowerCase();
      const libraryNameB = b.name && b.name.toLowerCase();
      if (libraryNameA < libraryNameB) {
        return -1;
      }
      if (libraryNameA > libraryNameB) {
        return 1;
      }
  
      // names must be equal
      return 0;
    }
  )
    .map((item) => {
      return {
        label: `${item.name || ""}`,
        value: item.investorId,
      };
    });
    return (
      <>
        <Formik
          initialValues={{
            salutation: "",

            designationTypeId: this.props.designationTypeId,
            description: "",
            imageId:"",
            accessInd: true,
            departmentId: this.props.departmentId,
            userId: this.props.userId,
            tagWithCompany: "",
            firstName: "",
            middleName: "",
            lastName: "",
            countryDialCode: this.props.user.countryDialCode,
            countryDialCode1: this.props.user.countryDialCode,
            whatsappNumber: "",
            mobileNumber: "",
            emailId: "",
            linkedinPublicUrl: "",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                country: this.props.user.countryName,
                latitude: "",
                longitude: "",
              },
            ],
            notes: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            createInvestorContact(
              {
                ...values,
                investorId: this.props.investorId,
        
              },
              () => this.handleReset(resetForm)
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
            <Form className="form-background">
              <div class=" flex justify-between">
                <div class=" h-full w-w47.5.5"
                >
         
                  <div class=" flex flex-nowrap justify-between mt-4">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between">
                        {/* <div class=" w-2/5">
                          <FastField
                            name="salutation"
                            type="text"
                            // label="Salutation"
                            label={
                         
                            }
                            options={["Mr.", "Ms.", "None"]}
                            component={SelectComponent}
                            inlineLabel
                            className="field"
                            isColumn
                          />
                        </div> */}
                        <div class=" w-full">
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
                        </div>
                      </div>
                 
                      <div class=" flex justify-between mt-3">
                        <div class=" w-2/5">
                          <FastField
                            name="middleName"
                            label="Middle Name"e="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                        <div class=" w-2/4">
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
                  <div class=" flex justify-between">
                    <div class=" w-2/5">
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        placeholder='+31'
                        label="Dial Code"
                          
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/4">
                      <FastField
                        type="text"
                        name="mobileNumber"
                        //placeholder="Mobile #"
                        label="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                    
                  {/* <div class=" w-1/4 font-bold"
                  >
                    WhatsApp
                    <Switch
                      onChange={this.handleWhatsApp}
                      checked={this.state.whatsapp}
                      checkedChildren="Different"
                      unCheckedChildren="Same"
                    />
                  </div> */}
                  </div>
          
                  {/* <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <FastField
                        name="countryDialCode1"
                        isColumnWithoutNoCreate
                        selectType="dialCode"
                        //label="Phone No #"
                        label={
                         
                        }
                        isColumn
                        component={SearchSelect}
                        defaultValue={{
                          value: this.props.user.countryDialCode,
                        }}
                        value={values.countryDialCode1}
                        inlineLabel
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <FastField
                        type="text"
                        name="phoneNumber"
                        // placeholder="Phone #"
                        label={
                         
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                    </div>
                  </FlexContainer> */}

                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      {" "}
                      {this.state.whatsapp && (
                        <Field
                          name="countryDialCode1"
                          isColumnWithoutNoCreate
                          placeholder='+31'
                          selectType="dialCode"
                          //label="Available from"

                          label="Dial Code "
                           
                          component={SearchSelect}
                          isColumn
                          // value={values.availableDate}
                          inlineLabel
                        />
                      )}
                    </div>
                    <div class=" w-2/4">
                      {this.state.whatsapp && (
                        <FastField
                          name="whatsappNumber"
                          isColumn
                          width={"100%"}
                          style={{ flexBasis: "30%" }}
                          component={InputComponent}
                          label="Whatsapp #"
                        
                          inlineLabel
                        />
                      )}
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-full">
                      <FastField
                        type="email"
                        name="emailId"
                        label="Email"
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
        
                  <div class=" flex justify-between mt-3">
                    <div class="w-full">
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"
                        label="Linkedin "
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
      

                  <div class=" flex justify-between mt-3">
                    <div class=" w-2/4">
                      <>
                        <Field
                          name="investorId"
                          isColumnWithoutNoCreate
                          label="Tag Company"
                          component={SelectComponent}
                          isColumn
                          value={values.investorId}
                          isDisabled={defaultInvestor}
                          options={Array.isArray(investorNameOption) ? investorNameOption : []}
                          defaultValue={
                            defaultInvestor ? defaultInvestor : null
                          }
                          inlineLabel
                        
                        />
                      </>
                    </div>
                    <div class=" w-2/5">
                      <FastField
                        name="designationTypeId"
                        label="Designation"
                       
                        
                        selectType="designationType"
                        isColumn
                        component={SearchSelect}
                        value={values.designationTypeId}
                        isColumnWithoutNoCreate
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class=" w-full">
                    <FastField
                      name="departmentId"
                      label="Department"

              
                      
                      isColumn
                      isColumnWithoutNoCreate
                      component={SearchSelect}
                      value={values.departmentId}
                      selectType="departmentName"
                      inlineLabel
                    />
                  </div>
                </div>
                <div class=" h-4/6 w-w47.5.5">
                  <FieldArray
                    name="address"
                    label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
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
              </div>
    
              <div class=" flex justify-end mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingInvestorContact}
                >
                 Create

                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({
  auth,
  investor,
  departments,
  designations,
}) => ({
  addingInvestorContact: investor.addingInvestorContact,
  addingInvestorContactError: investor.addingInvestorContactError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  investorId: investor.investorDetails.investorId,
  investorData:investor.investorData,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createInvestorContact,
      getDesignations,
      getDepartments,
      getInvestorData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorContactForm);
