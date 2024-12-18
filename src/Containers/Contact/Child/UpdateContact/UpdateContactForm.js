import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select, } from "antd";
import { base_url } from "../../../../Config/Auth";
import { Formik, Form, FastField, Field } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { updateContact } from "../../ContactAction";
import PostImageUpld from "../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { getDesignations } from "../../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../../Settings/Department/DepartmentAction";
import { getCustomerData } from "../../../Customer/CustomerAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import { InputComponent1 } from "../../../../Components/Forms/Formik/InputComponent1";


const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateContactSchema = Yup.object().shape({
  emailId: Yup.string()
    .required("Input needed!")
    .email("Enter a valid Email"),
  firstName: Yup.string().required("Input needed!"),
  // mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Number is too short").max(10,"Number is too long")
});

class UpdateContactForm extends Component {
  componentDidMount() {
    this.props.getCustomerData(this.props.userId);
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
      translatedMenuItems: [],
      loading: true,
      customers: [],
      contacts:[],
      isLoadingCustomers: false,
      isLoadingContacts:false,
      loading: true,
      touchedCustomer: false,
      selectedCustomer: props.setEditingContact.customerId,
      selectedContact:props.setEditingContact.contactId,

    };
    this.handleSelectCustomerFocus=this.handleSelectCustomerFocus.bind(this)
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.fetchCustomers = this.fetchCustomers.bind(this);
    this.fetchContacts=this.fetchContacts.bind(this)
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
      const apiEndpoint = `${base_url}/contact-list/drop-down/${this.props.setEditingContact.customerId||customerId}`;
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

  async fetchMenuTranslations() {
    try {
      this.setState({ loading: true });
      const itemsToTranslate = [
        '295', // 0
'353', // 1
'354', // 2
'140', // 3
'1117', // 4
'357', // 5
'546', // 6
'1157', // 7
'547', // 8
'361', // 9
'279', // 10
'326', // 11
'325' ,// 12
'316', //13
'1246'// 'Update'

      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
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
      updateContact,
      updateContactById,
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
      designationTypeId,
      departmentId,
      defaultCustomers
    } = this.props;
    console.log(linkContact);
    const customerNameOption = this.props.customerData
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
    const {loading,translatedMenuItems } = this.state;
    if (loading) {
      return <div><BundleLoader/></div>;
    } 
  
    return (
      <>
        <Formik
          initialValues={{
            salutation: this.props.setEditingContact.salutation || "",
            designationTypeId: this.props.setEditingContact.designationTypeId || "",
            description: this.props.setEditingContact.description || "",
            departmentId: this.props.setEditingContact.department || "",
            departmentDetails:
              this.props.setEditingContact.departmentDetails || "",
              sourceId:
              this.props.setEditingContact.sourceId || "",
            userId: this.props.userId,
            firstName: this.props.setEditingContact.firstName || "",
            middleName: this.props.setEditingContact.middleName || "",
            lastName: this.props.setEditingContact.lastName || "",
            countryDialCode:
              this.props.setEditingContact.countryDialCode ||
              this.props.user.countryDialCode,
            countryDialCode1:
              this.props.setEditingContact.countryDialCode1 ||
              this.props.user.countryDialCode,
            phoneNumber: this.props.setEditingContact.phoneNumber || "",
            mobileNumber: this.props.setEditingContact.mobileNumber || "",
            emailId: this.props.setEditingContact.emailId || "",
            alternateEmailId: this.props.setEditingContact.alternateEmailId || "",
            
            customerId:this.props.setEditingContact.customerId||"",
            linkedinPublicUrl:
              this.props.setEditingContact.linkedinPublicUrl || "",
            //   address: [
            //   {
            //     addressId: this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].addressId : "",
            //     address1: this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].address1 : "",
            //     street:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].street : "",
            //     city:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].city : "",
            //     state:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].state : "",
            //     postalCode:  this.props.setEditingContact.address.length ? this.props.setEditingContact.address[0].postalCode : "",
            //   },
            // ],
            notes: this.props.setEditingContact.notes || "",
            bedrooms:this.props.setEditingContact.bedrooms || "",
            price:this.props.setEditingContact.price || "",
            propertyType:this.props.setEditingContact.propertyType || "",
          }}
          validationSchema={UpdateContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            updateContact(
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
              <div class=" flex justify-around max-sm:flex-col "
              >
                <div class=" h-full w-w47.5 max-sm:w-wk"
                >
                 <div class=" flex  flex-nowrap justify-between">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                    <div class=" flex justify-between max-sm:flex-col">
                     
                            {/* // label="Salutation" */}
                           
                        <div class=" w-wk max-sm:w-full">
                        <div class="text-xs font-poppins font-bold ">{translatedMenuItems[0]}</div>
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
                      <div class=" flex justify-between max-sm:flex-col">
                        <div class=" w-2/5 max-sm:w-full">
                        <div class="text-xs font-poppins font-bold ">{translatedMenuItems[1]}</div>
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
                        <div class=" w-1/2 max-sm:w-full">
                        <div class="text-xs font-poppins font-bold ">{translatedMenuItems[2]}</div>
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
                    <div class="text-xs font-bold font-poppins w-full">
                   {translatedMenuItems[3]}
                      <FastField
                        type="email"
                        name="emailId"
                        //label="Email"
                      
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
                    <div class=" text-xs font-bold font-poppins w-full">
                    {translatedMenuItems[4]}
                      <FastField
                        type="email"
                        name="alternateEmailId"
                        //label="Email"
                      
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        // isRequired
                      />
                    </div>
                  
                  </div>  
                  
                  <div class="text-xs font-poppins font-bold mt-2 ">{translatedMenuItems[6]}</div>
                  <div class=" flex justify-between shadow-[0_0.15em_0.3em_#aaa] border border-[#bfbebb] h-8">
                  <div class=" w-3/12 max-sm:w-[35%]">     
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        // label={translatedMenuItems[5]}
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          label:`+${this.props.user.countryDialCode }`,
                        }}
                        inlineLabel
                      />
                    </div>
                    <div class="w-[1px] h-full bg-gray-300">
  <div class="w-full h-[75%]"></div>
</div>
<div class=" w-[76%]">
                    <div class="text-xs font-bold font-poppins  ">
                    {/* {translatedMenuItems[6]} */}
                      <Field
                        type="text"
                        name="mobileNumber"
                     
                        //placeholder="Mobile #"
                        component={InputComponent1}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                    </div>
                  </div>                                     
                  < div class=" flex justify-between mt-3">
                    <div class="text-xs font-bold font-poppins w-full">
                    {translatedMenuItems[8]}
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
                 
                  
                  {/* <div class="mt-3 text-xs font-bold font-poppins">
                  {translatedMenuItems[13]}
                  <Field
                    name="notes"
                    // label="Notes"
                  
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />                 
                  </div> */}
                </div>
                
                <div class=" h-3/4 w-w47.5 max-sm:w-wk "
                > 
               <div class="  flex justify-between max-sm:mt-20">
        <div class="flex flex-col w-w47.5">
                
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
               

<div class=" w-w47.5 ">
                   
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
              <div class=" text-xs font-bold font-poppins w-w47.5">
                {translatedMenuItems[10]}
                    <FastField
                            name="sourceId"
                        
                            isColumnWithoutNoCreate
                            selectType="sourceName"
                            component={SearchSelect}
                            value={values.sourceId}
                            isColumn
                          />
                        </div>
              
                  <div class=" flex justify-between mt-3">      
              <div class="text-xs font-bold font-poppins w-1/2">
              {translatedMenuItems[11]}
                    <FastField
                      name="departmentId"
                      //label="Department"
                 
                      width="100%"
                      isColumn
                      isColumnWithoutNoCreate
                      // component={SelectComponent}
                      component={InputComponent}
                      // value={values.departmentId}
                      // selectType="departmentName"
                      inlineLabel
                    />
                  </div>
                  <div class="text-xs font-bold font-poppins w-[47.5%]">
                  {translatedMenuItems[12]}
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
                 </div>
               
                {this.props.orgType==="Real Estate"&&(
                  <div class=" h-3/4 max-sm:w-wk mt-4 "
                >
                  <div class=" flex  justify-between max-sm:mt-20">
                    <div class="  w-w47.5">
                      <Field
                        name="bedrooms"
                        // selectType="customerList"
                        isColumnWithoutNoCreate
                        label="Bedrooms"
                        options={["1", "2", "3","4","5","6"]}
                        component={SelectComponent}
                        isColumn
                    
                        inlineLabel
                      />
                    </div>

                   
                    <div class=" w-w47.5" >
                    <FastField
                            name="price"
                            label="Price"
                            //isColumnWithoutNoCreate
                            //selectType="sourceName"
                            options={["0-100000", "100001-300000", "300001-500000","500000+"]}
                            component={SelectComponent}
                            
                            // value={values.source}
                            isColumn
                          />
                        </div>
                     
                    
                  </div>
                 
                  <div class=" flex justify-between mt-3">         
                  <div class="  w-w47.5">
                    <Field
                      name="propertyType"
                      label="Property Type"
                      width="100%"
                      isColumn
                      isColumnWithoutNoCreate
                      options={["Studio", "Row house", "Villa"]}
                      component={SelectComponent}
                    
                      // value={values.departmentId}
                      // options={Array.isArray(departmentNameOption) ? departmentNameOption : []}
                      inlineLabel
                    />
                  </div>
                
                  </div>
                 
                  <div class=" flex  justify-between mt-3">
                   {/* City */}
                  </div>
                  
                </div>
                )}
                                 
                  <div class=" flex  justify-between mt-3">
                   
                  </div>
                  
                </div>
              </div>
             
              <div class="flex mt-3 justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateContactById}
                >
                  <div class="text-xs font-bold font-poppins"> {translatedMenuItems[14]}</div>

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

const mapStateToProps = ({ auth, contact,customer, departments, designations, opportunity }) => ({
  setEditingContact: contact.setEditingContact,
  updateContactById: contact.updateContactById,
  updateContactByIdError: contact.updateContactByIdError,
  user: auth.userDetails,
  token: auth.token,
  orgType:auth.userDetails.orgType,
  customerData:customer.customerData,
  userId: auth.userDetails.userId,
  customerId: customer.customer.customerId,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

      updateContact,
      getCustomerData,
      getDesignations,
      getDepartments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactForm);
