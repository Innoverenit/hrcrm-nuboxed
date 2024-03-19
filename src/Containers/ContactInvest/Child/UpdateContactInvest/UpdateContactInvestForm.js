import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { updateContactInvest } from "../../ContactInvestAction";
import PostImageUpld from "../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../Settings/Department/DepartmentAction";
import { getCustomerData } from "../../../Customer/CustomerAction";
import {getInvestorData,getDialCode} from "../../../Investor/InvestorAction";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateContactSchema = Yup.object().shape({
  emailId: Yup.string()
    .required("Input needed!")
    .email("Enter a valid Email"),
  firstName: Yup.string().required("Input needed!"),
  // mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Minimum 8 digits").max(10,"Number is too long")
});

class UpdateContactInvestForm extends Component {
  componentDidMount() {
    this.props.getCustomerData(this.props.userId);
    this.props.getInvestorData(this.props.userId);
    this.props.getDialCode();
  }
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      currentOption: "",
      candidate: false,
      availability: false,
    };
  }
  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleReset = (resetForm) => {
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
      updateContactInvest,
      updateContactInvestById,
      linkContact,
      defaultCustomers,
      contactiData
    } = this.props;
    console.log(linkContact);

    const sortedCountry =this.props.dialCodeList.sort((a, b) => {
      const nameA = a.country_dial_code.toLowerCase();
      const nameB = b.country_dial_code.toLowerCase();
      // Compare department names
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    const countryNameOption = this.props.dialCodeList.map((item) => {
      return {
        label: `+${item.country_dial_code}`,
        value: item.country_dial_code,
      };
    });
    const customerNameOption = this.props.investorData
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
        value: item.customerId,
      };
    });
    return (
      <>
        <Formik
          initialValues={{
            salutation:contactiData.salutation || "",
            designationTypeId:contactiData.designationTypeId || "",
            description:contactiData.description || "",
            departmentId:contactiData.departmentId || "",
            sourceId:contactiData.source || "",
            departmentDetails:
             contactiData.departmentDetails || "",
            userId: this.props.userId,
            firstName: contactiData.firstName || "",
            middleName: contactiData.middleName || "",
            lastName: contactiData.lastName || "",
            countryDialCode:
              contactiData.countryDialCode ||
              this.props.user.countryDialCode,
            countryDialCode1:
              contactiData.countryDialCode1 ||
              this.props.user.countryDialCode1,
            phoneNumber: contactiData.phoneNumber || "",
            mobileNumber: contactiData.mobileNumber || "",
            emailId: contactiData.emailId || "",
            customerId:contactiData.customerId||"",
            linkedinPublicUrl:
              contactiData.linkedinPublicUrl || "",
              address: [
              {
                addressId: contactiData.address.length ? contactiData.address[0].addressId : "",
                address1: contactiData.address.length ? contactiData.address[0].address1 : "",
                street:  contactiData.address.length ? contactiData.address[0].street : "",
                city:  contactiData.address.length ? contactiData.address[0].city : "",
                state:  contactiData.address.length ? contactiData.address[0].state : "",
                postalCode:  contactiData.address.length ? contactiData.address[0].postalCode : "",
              },
            ],
            notes: contactiData.notes || "",
          }}
          validationSchema={UpdateContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateContactInvest(
              {
                ...values,
                contactId: contactiData.contactId,
              },
              contactiData.contactId,
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
              <div class=" flex justify-around max-sm:flex-col  ">
                <div class=" h-full w-w47.5 max-sm:w-wk" >
                 <div class=" flex justify-between  flex-nowrap">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                    <div class=" flex justify-between max-sm:flex-col">
                        {/* <div class=" w-2/5 max-sm:w-wk">
                          <FastField
                            name="salutation"
                            type="text"
                            // label="Salutation"
                            label={
                              <FormattedMessage
                                id="app.salutation"
                                defaultMessage="salutation"
                              />
                            }
                            options={["Mr.", "Ms.", "None"]}
                            component={SelectComponent}
                            inlineLabel
                            className="field"
                            isColumn
                          />
                        </div> */}
                        <div class=" w-full max-sm:w-wk">
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"
                            label={
                              <FormattedMessage
                              id="app.firstname"
                              defaultMessage="firstname"
                            />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-wk">
                          <FastField
                            name="middleName"
                            //label="Middle Name"
                            label={
                              <FormattedMessage
                                id="app.middle"
                                defaultMessage="middle"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                        <div class=" w-1/2 max-sm:w-wk">
                          <FastField
                            name="lastName"
                            //label="Last Name"
                            label={
                              <FormattedMessage
                                id="app.lastname"
                                defaultMessage="lastname"
                              />
                            }
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
                    <div class=" w-full">
                      <FastField
                        type="email"
                        name="emailId"
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.email"
                            defaultMessage="Email"
                          />
                        }
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        isRequired
                      />
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/6 max-sm:w-2/5">
                    <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.dialCode"
                            defaultMessage="Dial Code"
                          />
                        }
                        defaultValue={{
                          label:`+${contactiData.countryDialCode}`,
                        }}
                        isColumn
                        // width={"100%"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-[60%] max-sm:w-2/4">
                      <FastField
                        type="text"
                        name="mobileNumber"
                        label={
                          <FormattedMessage
                            id="app.mobile"
                            defaultMessage="mobile #"
                          />
                        }
                        //placeholder="Mobile #"
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                  </div>
                  {/* <div class=" flex justify-between">
                    <div class=" w-2/6 max-sm:w-2/5">
                      <FastField
                        name="countryDialCode1"
                        isColumnWithoutNoCreate
                        selectType="dialCode"
                        //label="Phone No #"
                        label={
                          <FormattedMessage
                            id="app.countryDialCode1"
                            defaultMessage="Dial Code"
                          />
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
                    <div class=" w-[60%] max-sm:w-2/4">
                      <FastField
                        type="text"
                        name="phoneNumber"
                        //placeholder="Phone #"
                        label={
                          <FormattedMessage
                            id="app.phoneNumber"
                            defaultMessage="Phone #"
                          />
                        }
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                    </div>
                  </div> */}

                 
                 
                  < div class=" flex justify-between mt-3">
                    <div class=" w-full">
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"
                        //label="Linkedin "
                        label={
                          <FormattedMessage
                          id="app.linkedin"
                          defaultMessage="linkedin"
                        />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    </div>
                  </div>
                 
                  <div class="mt-6">
                  <Field
                    name="notes"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />                 
                  </div>
                </div>
                
                <div class=" h-3/4 w-w47.5 max-sm:w-wk "> 
                <div class=" flex  justify-between">
                <div class=" w-w47.5">
                      <Field
                        name="customerId"
                        // selectType="customerList"
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.tagcompany"
                            defaultMessage="tagcompany"
                          />
                        }
                        component={SelectComponent}
                        isColumn
                        value={values.customerId}
                        isDisabled={defaultCustomers}
                        options={Array.isArray(customerNameOption) ? customerNameOption : []}
                        // defaultValue={defaultCustomers ? defaultCustomers : null}
                        inlineLabel
                      />
                    </div>
            
                <div class="  w-w47.5 ">
                  <FastField
                    name="designationTypeId"
                    //label="Designation"
                    label={
                      <FormattedMessage
                      id="app.designation"
                      defaultMessage="designation"
                    />
                    }
                    selectType="designationType"
                    // options={[
                    //   "Board",
                    //   "CXO",
                    //   "Director",
                    //   "Unit Head",
                    //   "Mid Level",
                    //   "Junior",
                    // ]}
                    isColumn
                    // component={SelectComponent}
                    component={SearchSelect}
                    value={values.designationTypeId}
                    isColumnWithoutNoCreate
                    inlineLabel
                  />
                </div>
              </div>
              
              <div class=" flex justify-between mt-3">   
              <div class=" w-w47.5">
                    <FastField
                      name="departmentId"
                      //label="Department"
                      label={
                        <FormattedMessage
                          id="app.department"
                          defaultMessage="department"
                        />
                      }
                      isColumn
                      isColumnWithoutNoCreate
                      component={SearchSelect}
                      value={values.departmentId}
                      selectType="departmentName"
                      inlineLabel    
                    />
                    </div>
                    <div class=" w-w47.5">
                  <FastField
                            name="sourceId"
                             label={
                              <FormattedMessage
                              id="app.source"
                              defaultMessage="source"
                            />
                            }
                            isColumnWithoutNoCreate
                            selectType="sourceName"
                            component={SearchSelect}
                            value={values.sourceId}
                            isColumn
                          />
                        </div>

                  </div>
                 
                 
                  <div class="mt-6 w-full" style={{backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                      <div class="text-white font-medium m-[0.2rem_0_0.4rem_0.2rem] text-xs flex" ><FormattedMessage
                id="app.address"
                defaultMessage="Address"
              /> </div>
                  </div>
                    </div>
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

               
                 
                  <div class=" flex  justify-between mt-6">
                    {/* <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].city"
                        //label="City"
                        label={
                          <FormattedMessage
                            id="app.ddress[0].city"
                            defaultMessage="City"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                      </div> */}
                  </div>
                 
                  {/* <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].state"
                        //label="State"

                        label={
                          <FormattedMessage
                            id="app.address[0].State"
                            defaultMessage="State"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="address[0].postalCode"
                        //label="Zip Code"

                        label={
                          <FormattedMessage
                            id="app.address[0].postalCode"
                            defaultMessage="Pin Code"
                          />
                        }
                        component={InputComponent}
                        isColumn
                        width="100%"
                      />
                    </div>
                  </FlexContainer> */}
                </div>
              </div>
             
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute mt-6 ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateContactInvestById}
                >
                  <FormattedMessage id="app.update" defaultMessage="update" />

                  {/* Update */}
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth,investor, contact, contactinvest,customer, departments, designations, opportunity }) => ({
  setEditingContact: contact.setEditingContact,
  updateContactInvestById: contactinvest.updateContactInvestById,
  updateContactByIdError: contact.updateContactByIdError,
  user: auth.userDetails,
  investorData:investor.investorData,
  customerData:customer.customerData,
  userId: auth.userDetails.userId,
  customerId: customer.customer.customerId,
  departmentId: departments.departmentId,
  dialCodeList:investor.dialCodeList,
  designationTypeId: designations.designationTypeId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateContactInvest,
      getCustomerData,
      getDesignations,
      getDepartments,
      getInvestorData,
      getDialCode,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactInvestForm);
