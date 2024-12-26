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
import { updateInvestorContact } from "../../../../InvestorAction";
import PostImageUpld from "../../../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import {getDesignations} from "../../../../../Settings/Designation/DesignationAction";
import {getDepartments} from "../../../../../Settings/Department/DepartmentAction";
import { base_url } from "../../../../../../Config/Auth";

const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateCustomerContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long"),
  // mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long")
});

class UpdateInvestorContactForm extends Component {
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
      customers: [],
      contacts:[],
      isLoadingCustomers: false,
      isLoadingContacts:false,
      loading: true,
      touchedCustomer: false,
      selectedCustomer: props.currentRowData.customerId,
      selectedContact:props.currentRowData.contactId,
    };
    this.handleSelectCustomerFocus=this.handleSelectCustomerFocus.bind(this)
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.fetchCustomers = this.fetchCustomers.bind(this);
    this.fetchContacts=this.fetchContacts.bind(this)
  }



  componentDidMount() {
    // this.fetchMenuTranslations();
    this.fetchContacts()
    this.fetchCustomers()
  }

  async fetchCustomers() {
    this.setState({ isLoadingCustomers: true });

    try {
      const apiEndpoint = `${base_url}/customer/user/${this.props.userId}`;
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      this.setState({ customers: data });
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      this.setState({ isLoadingCustomers: false });
    }
  }


  handleSelectCustomerFocus() {
    const { touchedCustomer } = this.state;
    if (!touchedCustomer) {
      this.fetchCustomers();
      // this.fetchSector();

      this.setState({ touchedCustomer: true });
    }
  }

  handleCustomerChange(customerId) {
    this.setState({ selectedCustomer: customerId });
  this.fetchContacts(customerId);
  }

  handleContactChange=(contactId)=>{
    this.setState({ selectedContact: contactId });
  }


  async fetchContacts(customerId) {
    this.setState({ isLoadingContacts: true });

    try {
      const apiEndpoint = `${base_url}/contact-list/drop-down/${this.props.currentRowData.customerId||customerId}`;
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      this.setState({ contacts: data });
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      this.setState({ isLoadingContacts: false });
    }
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
      updateInvestorContact,
      updateInvestorContactById,
      linkContact,
      currentRowData,
    } = this.props;
    console.log(linkContact);

    return (
      <>
        <Formik
          initialValues={{
            salutation: currentRowData.salutation || "",
            // designation: undefined,
            designationTypeId:currentRowData.designationTypeId || "",
            description:currentRowData.description || "",
            // department: undefined,
            departmentDetails: currentRowData.departmentDetails || "",
            departmentId:currentRowData.departmentId || "",
            userId: this.props.userId,
            // tagWithCompany: tagWithCompany ? tagWithCompany : "",
            tagWithCompany: currentRowData.tagWithCompany || "",
            firstName: currentRowData.firstName || "",
            middleName:currentRowData.middleName || "",
            lastName:currentRowData.lastName || "",
            countryDialCode:  currentRowData.countryDialCode ||
            this.props.user.countryDialCode,
            countryDialCode1:  currentRowData.countryDialCode1 ||
            this.props.user.countryDialCode,
            phoneNumber: currentRowData.phoneNumber || "",
            mobileNumber: currentRowData.mobileNumber || "",
            customerId:currentRowData.customerId||"",
            email:currentRowData.email || "",
            emailId: currentRowData.emailId || "",
            linkedinPublicUrl:  currentRowData.linkedinPublicUrl || "",
            address: [
              {
                addressId: currentRowData.address ? currentRowData.address[0].addressId : "",
                addressType: currentRowData.address ? currentRowData.address[0].addressType : "",
                address1:  currentRowData.address? currentRowData.address[0].address1 : "",
                address2:  currentRowData.address? currentRowData.address[0].address2 : "",
                town: "",
                street: currentRowData.address? currentRowData.address[0].street : "",
                city: currentRowData.address? currentRowData.address[0].city : "",
                postalCode: currentRowData.address? currentRowData.address[0].postalCode : "",
                state:  currentRowData.address? currentRowData.address[0].state : "",
                country: currentRowData.countryName,
                latitude: "",
                longitude: "",
              },
            ],
            notes:currentRowData.notes || "",
          }}
          validationSchema={UpdateCustomerContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateInvestorContact(
              {
                ...values,
                customerId:this.state.selectedCustomer,
                reportsTo:this.state.selectedContact,
                contactId: currentRowData.contactId,
                
              },
              currentRowData.contactId,
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
                  <div class=" h-full w-w47.5.5"
                  >
                    <div  class=" flex flex-nowrap justify-between mt-3">
                      <FastField name="imageId" component={PostImageUpld} />
                      <div>
                      <div class=" flex justify-between">
                          
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
                              label="Middle Name"
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
                    </div>
                    <div class=" flex justify-between">
                      <div class=" w-2/5">
                        <FastField
                          name="countryDialCode1"
                          isColumnWithoutNoCreate
                          selectType="dialCode"
                          //label="Phone No #"
                          label="Dial Code"
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
                          name="phoneNumber"
                          // placeholder="Phone #"
                          label="Phone #"
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
                      <div class=" w-full">
                        <FastField
                          type="text"
                          name="linkedinPublicUrl"
                          label="Linkedin "
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                         />
                      </div>
                    </div>
                    <div class="  flex justify-between max-sm:mt-20">
        <div class="flex flex-col w-w47.5.5">
                
                  <div class=" text-xs font-bold font-poppins"> 
                    {/* {translatedMenuItems[9]} */}
                    Tag Company
                    </div>
                  {/* Tag Company */}

                    <div class="  w-wk">
                   
                    
                      <Select
        value={this.state.selectedCustomer}
                      placeholder="Select Customer"
                      loading={this.state.isLoadingCustomers}
                      onFocus={this.handleSelectCustomerFocus}
                      onChange={this.handleCustomerChange}
                    >
                      {this.state.customers.map(customer => (
                        <Option key={customer.customerId} value={customer.customerId}>
                          {customer.name}
                        </Option>
                      ))}
                    </Select>
                    
                    </div>
                    </div>              
               

<div class=" w-w47.5.5 ">
                   
                    <div class=" text-xs font-bold font-poppins"> Reports To</div>
                    
  
                    {/* {this.props.customerConfigure.sourceInd===true&& */}
                    <Select
                    value={this.state.selectedContact}
        placeholder="Select Contact"
      loading={this.state.isLoadingContacts}
        onChange={this.handleContactChange}
      disabled={!this.state.selectedCustomer} // Disable Contact dropdown if no customer is selected
      >
        {this.state.contacts.map(contact => (
          <Option key={contact.contactId} value={contact.contactId}>
            {contact.fullName}
          </Option>
        ))}
      </Select> 
                    {/* } */}
                        </div>
                     
                     
                  </div>

                    <div class=" flex justify-between mt-3">
                     
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
                     <div class=" w-2/5">
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
                    
                    <div class=" flex justify-between"></div>
                  </div>
                &nbsp;
                <div class=" h-2/3 w-w47.5.5"
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
                
                <div class=" flex justify-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={updateInvestorContactById}
                  >
                  Update
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

const mapStateToProps = ({ auth, investor, customer,departments,designations }) => ({
  updateInvestorContactById: investor.updateInvestorContactById,
  updateInvestorContactByIdError: customer.updateInvestorContactByIdError,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  token: auth.token,
  customerId: customer.customer.customerId,
  departmentId:departments.departmentId,
  designationTypeId:designations.designationTypeId,
  setEditingCustomerContact:customer.setEditingCustomerContact,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateInvestorContact,
      getDesignations,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInvestorContactForm);
