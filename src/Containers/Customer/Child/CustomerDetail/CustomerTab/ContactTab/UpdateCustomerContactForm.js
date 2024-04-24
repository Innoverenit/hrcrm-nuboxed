import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button, Select, } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { updateCustomerContact } from "../../../../CustomerAction";
import PostImageUpld from "../../../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import {getDesignations} from "../../../../../Settings/Designation/DesignationAction";
import {getDepartments} from "../../../../../Settings/Department/DepartmentAction";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateCustomerContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string().email("Enter a valid Email"),
  // phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(5,"Number is too short").max(10,"Number is too long"),
  // mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Number is too short").max(10,"Number is too long")
});

class UpdateCustomerContactForm extends Component {
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
      updateCustomerContact,
      updateCustomerContactById,
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
            salutation: this.props.setEditingCustomerContact.salutation || "",
            // designation: undefined,
            // customerId: customerId ? customerId.value : "",
            designationTypeId:this.props.setEditingCustomerContact.designationTypeId || "",
            description:this.props.setEditingCustomerContact.description || "",
            // department: undefined,
            departmentDetails: this.props.setEditingCustomerContact.departmentDetails || "",
            departmentId:this.props.setEditingCustomerContact.departmentId || "",
            userId: this.props.userId,
            // tagWithCompany: tagWithCompany ? tagWithCompany : "",
            customerId: this.props.setEditingCustomerContact.tagWithCompany || "",
            firstName: this.props.setEditingCustomerContact.firstName || "",
            middleName:this.props.setEditingCustomerContact.middleName || "",
            lastName:this.props.setEditingCustomerContact.lastName || "",
            countryDialCode:  this.props.setEditingCustomerContact.countryDialCode ||
            this.props.user.countryDialCode,
            countryDialCode1:  this.props.setEditingCustomerContact.countryDialCode1 ||
            this.props.user.countryDialCode,
            whatsappNumber: this.props.setEditingCustomerContact.whatsappNumber || "",
            mobileNumber: this.props.setEditingCustomerContact.mobileNumber || "",
            customerId:this.props.setEditingCustomerContact.customerId||"",
            email:this.props.setEditingCustomerContact.email || "",
            emailId: this.props.setEditingCustomerContact.emailId || "",
            linkedinPublicUrl:  this.props.setEditingCustomerContact.linkedinPublicUrl || "",
            address: [
              {
                addressId: this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].addressId : "",
                addressType: this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].addressType : "",
                address1:  this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].address1 : "",
                address2:  this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].address2 : "",
                town: "",
                street: this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].street : "",
                city: this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].city : "",
                postalCode: this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].postalCode : "",
                state:  this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].state : "",
                country: this.props.setEditingCustomerContact.countryName,
                latitude: "",
                longitude: "",
              },
            ],
            notes:this.props.setEditingCustomerContact.notes || "",
          }}
          validationSchema={UpdateCustomerContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateCustomerContact(
              {
                ...values,
                contactId: this.props.contactId,
                
              },
              this.props.contactId,
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
                <div  class=" flex justify-between">
                <div class=" h-full w-[47.5%] mt-3"
                >
                    <div  class=" flex flex-nowrap mt-3">
                      <FastField name="imageId" component={PostImageUpld} />
                      <div>
                      <div class=" flex justify-between">
                          {/* <div class =" w-2/6">
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
                          <div class=" w-7/12">
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
                      <div class=" w-2/5">
                        <FastField
                          name="countryDialCode"
                          isColumnWithoutNoCreate
                          //label="Mobile #"
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
                      <div class=" w-2/4">
                        <FastField
                          type="text"
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
                    </div>
                    <div class=" flex justify-between">
                      <div class=" w-2/5">
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
                      <div class=" w-2/4">
                        <FastField
                          type="text"
                          name="whatsappNumber"
                          // placeholder="Phone #"
                          label={
                            <FormattedMessage
                              id="app.phoneNumber"
                              defaultMessage="Whatsapp #"
                            />
                          }
                          isColumn
                          component={InputComponent}
                          inlineLabel
                          width={"100%"}
                         />
                      </div>
                    </div>

                  
                    <div class=" flex justify-between mt-3">
                      <div class=" w-full">
                        <FastField
                          isRequired
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
                          component={InputComponent}
                          inlineLabel
                         />
                      </div>
                    </div>
              
                    <div class=" flex justify-between mt-3">
                      <div class=" w-full">
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
                    <div class="  w-w47.5">
                        <>
                        <Field
                    name="customerId"
                    selectType="customerList"
                    isColumnWithoutNoCreate
                    // label="Tag Company"
                    label={
                      <FormattedMessage
                        id="app.tagWithCompany"
                        defaultMessage="Tag Company"
                      />
                    }
                    component={SearchSelect}
                    isColumn
                    value={values.customerId}
                    isDisabled={defaultCustomers}
                    defaultValue={defaultCustomers ? defaultCustomers : null}
                    // defaultValue={{ label: tagWithCompany, value: customerId }}
                    inlineLabel
                  />
                        </>
                      </div>
                    
                   
                    </div>

                    <div class=" flex justify-between">
                    <div class="  w-w47.5">
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
                     <div class="w-w47.5">
                      <FastField
                        name="departmentId"
                        //label="Department"
                        label={
                          <FormattedMessage
                            id="app.department"
                            defaultMessage="Department"
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
                    </div>
                   
                    <div class=" flex justify-between mt-3"></div>
                  </div>
              
                  <div class=" h-full w-[47.5%]"
                >                
                   
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
                
                <div class=" flex justify-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updateCustomerContactById}
                  >
                    <FormattedMessage id="app.update" defaultMessage="Update" />
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

const mapStateToProps = ({ auth, contact, customer, opportunity,departments,designations }) => ({
  updateCustomerContactById: customer.updateCustomerContactById,
  updateCustomerContactByIdError: customer.updateCustomerContactByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  customerId: customer.customer.customerId,
  departmentId:departments.departmentId,
  designationTypeId:designations.designationTypeId,
  setEditingCustomerContact:customer.setEditingCustomerContact,
  // tagWithCompany: customer.customer.name,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getContacts,
      updateCustomerContact,
      // getContactById,
      // addLinkContactByOpportunityId,
      // getCurrency,
      getDesignations,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomerContactForm);
