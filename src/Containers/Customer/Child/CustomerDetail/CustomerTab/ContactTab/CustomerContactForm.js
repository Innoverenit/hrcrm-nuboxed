import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Select, Switch } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { addCustomerContact } from "../../../../CustomerAction";
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
  whatsappNumber: Yup.string()
    .matches(phoneRegExp, "Whatsapp number is not valid")
    .min(8, "Minimum 8 digits")
    .max(10, "Number is too long"),
  // mobileNumber: Yup.string()
  //   .matches(phoneRegExp, "Mobile number is not valid")
  //   .min(8, "Minimum 8 digits")
  //   .max(10, "Number is too long"),
});

class ContactForm extends Component {
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
      addCustomerContact,
      addingCustomerContact,
      users,
      accountId,
      defaultAccounts,
      defaultOpportunities,
      callback,
      user,
      creatorId,
      accountIdTag,
      linkContact,
      opportunityId,
      addLinkContactByOpportunityId,
      defaultCustomers,
      customerId,
      tagWithCompany,
    } = this.props;
    console.log(linkContact);

    return (
      <>
        <Formik
          initialValues={{
            salutation: "",
            // designation: undefined,
            designationTypeId: this.props.designationTypeId,
            description: "",
            // department: undefined,
            departmentDetails: "",
            departmentId: "",
            userId: this.props.userId,
            // tagWithCompany: tagWithCompany ? tagWithCompany : "",
            tagWithCompany: "",
            firstName: "",
            middleName: "",
            whatsapp: this.state.whatsapp ? "Different" : "Same",
            lastName: "",
            countryDialCode: this.props.user.countryDialCode,
            countryDialCode1: this.props.user.countryDialCode,
            whatsappNumber: "",
            mobileNumber: "",
            email: "",
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
            addCustomerContact(
              {
                ...values,
                customerId: this.props.customerId,
                whatsapp: this.state.whatsapp ? "Different" : "Same",
              },
              this.props.userId,
            );
            this.handleReset(resetForm)
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
                <div class=" h-full w-w47.5" >
                 
                  <div class=" flex flex-nowrap justify-between mt-3">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between">
                        {/* <div class=" w-2/5">
                          <FastField
                            name="salutation"
                            type="text"
                            // label="Salutation"
                            label={
                              <FormattedMessage
                                id="app.salutation"
                                defaultMessage="Salutation"
                              />
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
                            // label="First Name"
                            label={
                              <FormattedMessage
                                id="app.firstName"
                                defaultMessage="First Name"
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
                   
                      <div class=" flex justify-between mt-3">
                        <div class=" w-2/5">
                          <FastField
                            name="middleName"
                            //label="Middle Name"
                            label={
                              <FormattedMessage
                                id="app.middle"
                                defaultMessage="Middle"
                              />
                            }
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                        <div class=" w-2/4">
                          <FastField
                            name="lastName"
                            //label="Last Name"
                            label={
                              <FormattedMessage
                                id="app.lastName"
                                defaultMessage="Last Name"
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
                    <div class=" w-2/6 max-sm:w-2/5">
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        //label="Mobile #"
                        placeholder='+31'
                        label={
                          <FormattedMessage
                            id="app.countryDialCode"
                            defaultMessage="Dial Code"
                          />
                        }
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
                    <div class=" w-2/5">
                      <FastField
                      // inputMode="numeric" 
                        type="number"
                        name="mobileNumber"
                        //placeholder="Mobile #"
                        label={
                          <FormattedMessage
                            id="app.mobileNumber"
                            defaultMessage="Mobile #"
                          />
                        }
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                    
                  <div class=" w-1/4 font-bold"
                  >
                    WhatsApp
                    <Switch
                      onChange={this.handleWhatsApp}
                      checked={this.state.whatsapp}
                      checkedChildren="Different"
                      unCheckedChildren="Same"
                    />
                  </div>
                  </div>
            

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

                          label={
                            <FormattedMessage
                              id="app.#whatsApp"
                              defaultMessage="Dial Code "
                            />
                          }
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
                          label={
                            <FormattedMessage
                              id="app.phoneNumber"
                              defaultMessage="Whatsapp #"
                            />}
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
                        //label="Email"
                        label={
                          <FormattedMessage
                            id="app.emailId"
                            defaultMessage="Email"
                          />
                        }
                        className="field"
                        isColumn
                        width={"100%"}
                        isRequired
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
                        //label="Linkedin "
                        label={
                          <FormattedMessage
                            id="app.linkedinPublicUrl"
                            defaultMessage="Linkedin"
                          />
                        }
                        isColumn
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
                          name="customerId"
                          isColumnWithoutNoCreate
                          selectType="customerList"
                          // label="Tag Company"
                          label={
                            <FormattedMessage
                              id="app.tagcompany"
                              defaultMessage="Tag Company"
                            />
                          }
                          component={SearchSelect}
                          isColumn
                          value={values.customerId}
                          isDisabled={defaultCustomers}
                        
                          defaultValue={defaultCustomers ? defaultCustomers : null}
                          // defaultValue={
                          //   defaultCustomers ? defaultCustomers : null
                          // }
                          inlineLabel
                        />
                      </>
                    </div>
                    <div class=" w-2/5">
                      <FastField
                        name="designationTypeId"
                        //label="Designation"
                        label={
                          <FormattedMessage
                            id="app.designation"
                            defaultMessage="Designation"
                          />
                        }
                        selectType="designationType"
                        isColumn
                        component={SearchSelect}
                        value={values.designationTypeId}
                        isColumnWithoutNoCreate
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class="  w-w47.5">
                    <FastField
                      name="departmentId"
                      //label="Department"
                      label={
                        <FormattedMessage
                          id="app.department"
                          defaultMessage="Department"
                        />
                      }
                      width="100%"
                      isColumn
                      isColumnWithoutNoCreate
                      component={InputComponent}
                      // value={values.departmentId}
                      // selectType="departmentName"
                      inlineLabel
                    />
                  </div>
                </div>
                <div class=" h-4/6 w-w47.5">
                  <div class=" mt-3">
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
                  </div>
                  <div class=" mt-3">
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
              </div>
           
              <div class=" flex justify-end mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingCustomerContact}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/*                     
                    Create */}
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
  contact,
  customer,
  opportunity,
  departments,
  designations,
}) => ({
  addingCustomerContact: customer.addingCustomerContact,
  addingCustomerContactError: customer.addingCustomerContactError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  customerId: customer.customer.customerId,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
  // tagWithCompany: customer.customer.name,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getContacts,
      addCustomerContact,
      // getContactById,
      // addLinkContactByOpportunityId,
      // getCurrency,
      getDesignations,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
