import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select, } from "antd";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { updateCustomerContact } from "../../../../CustomerAction";
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
      translatedMenuItems: [],
      loading: true,
      customers: [],
      contacts:[],
      isLoadingCustomers: false,
      isLoadingContacts:false,
      loading: true,
      touchedCustomer: false,
      selectedCustomer: props.setEditingCustomerContact.customerId,
      selectedContact:props.setEditingCustomerContact.contactId,
    };
    this.handleSelectCustomerFocus=this.handleSelectCustomerFocus.bind(this)
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.fetchCustomers = this.fetchCustomers.bind(this);
  }
  
  componentDidMount() {
    this.fetchMenuTranslations();
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
      const apiEndpoint = `${base_url}/contact-list/drop-down/${this.props.setEditingCustomerContact.customerId||customerId}`;
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

 

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        
"295",//0
"353",//1
"354",//2
   "357"  ,//3   
   "546",//4
   "300",//5
   "1157",//6
   "140",//7
   "547",//8
   "361",//9
   "325",//10
   "326",//11
   "316",//12
   "104",//13
   "361",
   "995"

      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
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
            // address: [
            //   {
            //     addressId: this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].addressId : "",
            //     addressType: this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].addressType : "",
            //     address1:  this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].address1 : "",
            //     address2:  this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].address2 : "",
            //     town: "",
            //     street: this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].street : "",
            //     city: this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].city : "",
            //     postalCode: this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].postalCode : "",
            //     state:  this.props.setEditingCustomerContact.address.length ? this.props.setEditingCustomerContact.address[0].state : "",
            //     country: this.props.setEditingCustomerContact.countryName,
            //     latitude: "",
            //     longitude: "",
            //   },
            // ],
            notes:this.props.setEditingCustomerContact.notes || "",
          }}
          validationSchema={UpdateCustomerContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateCustomerContact(
              {
                ...values,
                contactId: this.props.contactId,
                customerId:this.state.selectedCustomer,
                reportsTo:this.state.selectedContact,
                
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
              <Form className="form-background h-[87vh]">
                <div  class=" flex justify-between">
                <div class=" h-full w-[47.5%] mt-3"
                >
                    <div  class=" flex flex-nowrap mt-3">
                      <FastField name="imageId" component={PostImageUpld} />
                      <div>
                      <div class=" flex justify-between ml-1 ">
                        {/* salutation */}
                          <div class=" w-full">
                          <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[0]}</div>
                            <FastField
                              isRequired
                              name="firstName"
                              // label="First Name"
                          
                              type="text"
                              width={"100%"}
                              isColumn
                              component={InputComponent}
                              inlineLabel
                              />
                          </div>
                        </div>
                        
                        <div class=" flex justify-between mt-3">
                          <div class=" w-2/5 ml-1 ">
                          <div class="font-bold font-poppins  text-xs">{this.state.translatedMenuItems[1]}</div>
                            <FastField
                              name="middleName"
                              //label="Middle Name"
                      
                              type="text"
                              width={"100%"}
                              isColumn
                              component={InputComponent}
                              inlineLabel
                              />
                          </div>
                          <div class=" w-7/12 ml-1 ">
                          <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[2]}</div>
                            <FastField
                              name="lastName"
                              //label="Last Name"               
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
                      <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[3]}</div>
                        <FastField
                          name="countryDialCode"
                          isColumnWithoutNoCreate
                          //label="Mobile #"                  
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
                      <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[4]}</div>
                        <FastField
                          type="text"
                          name="mobileNumber"
                          //placeholder="Mobile #"                   
                          component={InputComponent}
                          inlineLabel
                          width={"100%"}
                          isColumn
                          />
                      </div>
                    </div>
                    <div class=" flex justify-between">
                      <div class=" w-2/5">
                      <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[5]}</div>
                        <FastField
                          name="countryDialCode1"
                          isColumnWithoutNoCreate
                          selectType="dialCode"
                          //label="Phone No #"                     
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
                      <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[6]}</div>
                        <FastField
                          type="text"
                          name="whatsappNumber"                     
                          isColumn
                          component={InputComponent}
                          inlineLabel
                          width={"100%"}
                         />
                      </div>
                    </div>

                  
                    <div class=" flex justify-between mt-3">
                      <div class=" w-full">
                      <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[7]}</div>
                        <FastField
                          isRequired
                          type="email"
                          name="emailId"
                          //label="Email"
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
                      <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[8]}</div>
                        <FastField
                          type="text"
                          name="linkedinPublicUrl"
                          //label="Linkedin "
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
                    {this.state.translatedMenuItems[14]} {/* Tag Company */}
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
                   
                    <div class=" text-xs font-bold font-poppins"> {this.state.translatedMenuItems[15]}</div>
                    
  
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

                    <div class=" flex justify-between">
                    <div class="  w-w47.5.5">
                    <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[10]}</div>
                        <FastField
                         name="designationTypeId"
                         //label="Designation"
                         selectType="designationType"
                           isColumn
                         component={SearchSelect}
                         value={values.designationTypeId}
                         isColumnWithoutNoCreate
                         inlineLabel
                        />
                     </div>
                     <div class="w-w47.5.5">
                     <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[11]}</div>
                      <FastField
                        name="departmentId"
                        //label="Department"
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
                   
                    {/* <FieldArray
                    name="address"
                    label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  /> */}
                  <div class=" mt-3">    
                  <div class="font-bold font-poppins text-xs">{this.state.translatedMenuItems[12]}</div>      
                    <Field
                      name="notes"
                      // label="Notes"
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
                  <div className="font-bold font-poppins text-xs">{this.state.translatedMenuItems[13]}</div>
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
  token: auth.token,
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
