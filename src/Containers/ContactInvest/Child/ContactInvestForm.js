import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select } from "antd";
import { Listbox} from '@headlessui/react'
import {getAllEmployeelist} from "../../Investor/InvestorAction"
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {getSources} from "../../Settings/Category/Source/SourceAction"
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { addLinkContactByOpportunityId } from "../../Contact/ContactAction";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { getDesignations } from "../../Settings/Designation/DesignationAction";
import { getDepartments } from "../../Settings/Department/DepartmentAction";
import {addContactInvest} from "../ContactInvestAction";
import {getInvestorData,getDialCode} from "../../Investor/InvestorAction";
import { BundleLoader } from "../../../Components/Placeholder";
import { base_url } from "../../../Config/Auth";
import { InputComponent1 } from "../../../Components/Forms/Formik/InputComponent1";
const { Option } = Select;
/**
 * yup validation scheme for creating a contact
 */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  emailId: Yup.string()
    .required("Input needed!")
    .email("Enter a valid Email"),
  // mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(8, "Minimum 8 digits").max(10, "Number is too long")
});

class ContactInvestForm extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      option: "Mobile",
      option1: "Mobile",
      option2: "Work",
      currentOption: "",
      whatsapp: false,
      candidate: false,
      availability: false,
      translatedMenuItems: [],
      loading: true,
      selected: '', 
      defaultOption: this.props.fullName,
      customers: [],
      contacts:[],
      isLoadingCustomers: false,
      isLoadingContacts:false,
      loading: true,
      touchedCustomer: false,
      selectedCustomer: null,
      selectedContact:null,
    };
    this.handleSelectCustomerFocus=this.handleSelectCustomerFocus.bind(this)
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.fetchCustomers = this.fetchCustomers.bind(this);
  }

  componentDidMount() {
    this.props.getAllEmployeelist();
    this.props.getInvestorData(this.props.userId);
    this.props.getSources(this.props.orgId);
    this.props.getDialCode();
    // this.props.getCustomerData(this.props.userId);
     this.props.getDepartments();
     this.fetchMenuTranslations();
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
      const apiEndpoint = `${base_url}/contact-list/drop-down/${customerId}`;
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
        "295",//0 First Name
        "353",//1 Middle Name
        "354",//2 Last Name
        "140",//3 Email
'1117', // 4 Alternate Email
'357', // 5 Dial Code
'546', // 6 Mobile
'1157', // 7 WhatsApp
'547', // 8 Linkedin
'147',//9Description
'361', // 10 Tag Company
'325' , // 11 Designation
'326', // 12 Department
'279' ,//13 Source
'185',//Address
'104',//Create
"76"//16 Assigned    
      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
    }
  }
  setDefaultOption = (newOption) => {
    this.setState({ defaultOption: newOption });
  };
  handleCandidate = (checked) => {
    this.setState({ candidate: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleWhatsApp = (checked) => {
    this.setState({ whatsapp: checked });
  };
  setSelected = (value) => {
    this.setState({ selected: value });
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
    const { selected } = this.state;
    const { allEmployeeList } = this.props;
    const selectedOption = allEmployeeList.find((item) => item.empName === selected);
    const countryNameOption = this.props.dialCodeList.map((item) => {
      return {
        label: `+${item.country_dial_code}`,
        value: item.country_dial_code,
      };
    });
  const sourceOption = this.props.sources.map((item) => {
    return {
      label: item.name
      || null,
      value: item.sourceId
      ,
    };
  });
    const {
      user: { userId, firstName, lastName },
      addContactInvest,
      addingContact,
      customerId,
      designationTypeId,
      departmentId,
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
  
    const {loading,translatedMenuItems } = this.state;
    if (loading) {
      return <div><BundleLoader/></div>;
    } 
    return (
      <>
        <Formik
          initialValues={{
            salutation: "",
            designationTypeId: this.props.designationTypeId,
            description: "",
            departmentId: this.props.departmentId,
            departmentDetails: "",
            userId: this.props.userId,
            investorId: this.props.investorId,
            opportunityId: this.props.opportunityId,
            tagWithCompany: "",
            firstName: "",
            middleName: "",
            lastName: "",
            countryDialCode: this.props.user.countryDialCode,
            countryDialCode1: this.props.user.countryDialCode1,
            phoneNumber: "",
            mobileNumber: "",
            emailId: "",
            alternateEmail:"",
            linkedinPublicUrl: "",
            sourceId:"",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                country: this.props.user.country,
                latitude: "",
                assignedTo: selectedOption ? selectedOption.employeeId:userId,
                longitude: "",
              },
            ],
            notes: "",
          }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            linkContact
              ? addLinkContactByOpportunityId(values, opportunityId, () =>
                this.handleReset(resetForm)
              )
              : addContactInvest(
                {
                  ...values,
                  customerId:this.state.selectedCustomer,
                  reportsTo:this.state.selectedContact,
                  assignedTo: selectedOption ? selectedOption.employeeId:userId,
                //   whatsapp: this.state.whatsapp ? "Different" : "Same",
                },
                this.props.userId,
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
              <div class=" flex justify-around max-sm:flex-col ">
                <div class=" h-full w-w47.5.5 max-sm:w-wk">
                  <div class=" flex justify-between  flex-nowrap">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">                     
                            {/* name="salutation"                                        */}
                        <div class=" font-bold font-poppins text-xs w-full max-sm:w-wk">
                          {translatedMenuItems[0]}
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
                        <div class="font-bold font-poppins text-xs w-2/5 max-sm:w-wk">
                       {translatedMenuItems[1]}
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
                        <div class=" font-bold font-poppins text-xs w-1/2 max-sm:w-wk">
                       {translatedMenuItems[2]}
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
                  <div class=" flex justify-between mt-1">
                    <div class=" font-bold font-poppins text-xs w-full">
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
                    <div class=" font-bold font-poppins text-xs  w-full">
                    {translatedMenuItems[4]}
                      <FastField
                        type="email"
                        name="alternateEmail"
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
                  <div className="font-bold text-xs">{translatedMenuItems[6]}</div>
<div class=" flex justify-between shadow-[0_0.15em_0.3em_#aaa] border border-[#bfbebb] h-8">
                    <div class=" w-3/12 max-sm:w-[35%]">  
                    <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate                                
                        defaultValue={{
                          label:`+${user.countryDialCode}`,
                        }}
                        isColumn
                        // width={"100%"}
                        selectType="dialCode"
                        component={SearchSelect}
                        inlineLabel
                      />
                    </div>
                    <div class="w-[1px] h-full bg-gray-300">
  <div class="w-full h-[75%]"></div>
</div>
                    <div class=" w-[76%]">
                    <div class="text-xs flex flex-col font-bold "> 
                      <Field
                        type="number"
                        name="mobileNumber"                                      
                        //placeholder="Mobile #"
                        component={InputComponent1}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>                  
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-2/4">                
                      {" "}
                      {this.state.whatsapp && (
                         <Field
                         name="countryDialCode1"
                         selectType="dialCode"
                         isColumnWithoutNoCreate                     
                         defaultValue={{
                          label:`+${user.countryDialCode1}`,
                        }}
                         isColumn
                         component={SelectComponent}
                         options={
                           Array.isArray(countryNameOption)
                             ? countryNameOption
                             : []
                         }
                         // value={values.countryDialCode1}
                         inlineLabel
                       />
                      )}
                    </div>
                    {this.state.whatsapp && (
                    <div class=" font-bold font-poppins text-xs w-2/4">      
                    {translatedMenuItems[7]}           
                     
                        <FastField
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone #"
                        
                        //phone no
                          isColumn
                          component={InputComponent1}
                          inlineLabel
                          width={"100%"}
                        />
                     
                    </div>
                      )}
                  </div>
              
                 
                  </div>
                  < div class=" flex justify-between mt-2">
                    <div class="font-bold font-poppins text-xs w-full">
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
                  <div class="font-bold font-poppins text-xs mt-2">
                  {translatedMenuItems[9]}
                    {/* Descriptions */}
                 
                    <div>               
                  <div>
                    <textarea
                      name="description"
                      className="textarea"
                      type="text"
                      
                    ></textarea>
                  </div>
                </div>
</div>
                </div>
                <div class=" h-3/4 w-w47.5.5 max-sm:w-wk " >
                <div className="flex justify-between">
        <div className="h-full w-full">
          <Listbox value={selected} onChange={this.setSelected}>
            {({ open }) => (
              <>
                <Listbox.Label className="font-bold text-xs font-poppins">
                  {translatedMenuItems[16]} 
                  {/* Assigned */}
                </Listbox.Label>
                <div className="relative mt-[0.1rem]">
                  <Listbox.Button className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                    {selected || 'Select an employee'}
                  </Listbox.Button>
                  {open && (
                    <Listbox.Options
                      static
                      className="absolute z-10 mt-1 max-h-56 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      {allEmployeeList.map((item) => (
                        <Listbox.Option
                          key={item.employeeId}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-3 pr-9 ${
                              active ? 'text-white bg-indigo-600' : 'text-gray-900'
                            }`
                          }
                          value={item.empName}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={`ml-3 block truncate ${
                                    selected ? 'font-semibold' : 'font-normal'
                                  }`}
                                >
                                  {item.empName}
                                </span>
                              </div>
                              {selected && (
                                <span
                                  className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                    active ? 'text-white' : 'text-indigo-600'
                                  }`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  )}
                </div>
              </>
            )}
          </Listbox>
        </div>
      </div>
                 
                 
                 {/* <div class=" flex  justify-between">
                    <div class="font-bold font-poppins text-xs  w-w47.5.5">
                    {translatedMenuItems[10]}
                      <Field
                        name="investorId"
                        // selectType="customerList"
                        isColumnWithoutNoCreate                 
                         //Tag Company
                         component={SelectComponent}
                        isColumn
                        value={values.investorId}
                        isDisabled={defaultCustomers}
                        options={Array.isArray(investorNameOption) ? investorNameOption : []}
                        inlineLabel
                      />
                    </div>

                    <div class=" font-bold font-poppins text-xs w-w47.5.5">
                    {translatedMenuItems[11]}
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
                  </div> */}

<div class="  flex justify-between max-sm:mt-20">
        <div class="flex flex-col w-w47.5.5">
                  {/* {this.props.customerConfigure.tagCompanyInd===true&& */}
                  <div class=" text-xs font-bold font-poppins"> 
                  {/* {translatedMenuItems[9]} */}
                  Customer
                  </div>
               
  {/* } */}
                    <div class="  w-wk">
                    {/* {this.props.customerConfigure.tagCompanyInd===true&& */}
                      
                      <Select
       
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
                    {/* } */}
                    </div>
                    </div>              
                    {/* <div class=" w-w47.5.5 ">
                    {this.props.customerConfigure.sourceInd===true&&
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[10]}</div>
                    
  }
                    {this.props.customerConfigure.sourceInd===true&&
                    <FastField
                            name="source"              
                            isColumnWithoutNoCreate
                            selectType="sourceName"
                            component={SearchSelect}
                            value={values.source}
                            isColumn
                            inlineLabel
                          />
                    }
                        </div> */}

<div class=" w-w47.5.5 ">
                    {/* {this.props.customerConfigure.sourceInd===true&& */}
                    <div class=" text-xs font-bold font-poppins"> Reports To</div>
                    
  {/* } */}
                    {/* {this.props.customerConfigure.sourceInd===true&& */}
                    <Select
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

                  <div class=" w-w47.5.5 ">
                   
                    <div class=" text-xs font-bold font-poppins"> 
                      {/* {translatedMenuItems[10]} */}
                      Source
                      </div>
                    
  
                   <Field
                            name="sourceId"
                            //source                                
                            isColumnWithoutNoCreate
                            component={SelectComponent}
                            options={
                              Array.isArray(sourceOption) ? sourceOption : []
                            }
                            isColumn
                          />
                          </div>
                
                  <div class=" flex justify-between mt-3">         
                  <div class="font-bold font-poppins text-xs w-w47.5.5">
                 {translatedMenuItems[12]}
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
                  <div class="font-bold font-poppins text-xs w-w47.5.5">
                 {/* {translatedMenuItems[13]} */}
                 Designation
                  {/* <Field
                            name="sourceId"
                            //source                                
                            isColumnWithoutNoCreate
                            component={SelectComponent}
                            options={
                              Array.isArray(sourceOption) ? sourceOption : []
                            }
                            isColumn
                          /> */}
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
                 
                  <div class="w-full mt-3 "
                   style={{ backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                  <div class="text-white font-medium m-[0.2rem_0_0.4rem_0.2rem] text-xs flex" >{translatedMenuItems[14]}
                     {/* Address */}
                     </div>
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
                  {/* City */}
                  </div>                               
                </div>
              </div>
             
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute mt-4 ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingContact}
                >
                 <div className="font-bold font-poppins text-xs"> {translatedMenuItems[15]}</div>
                  {/*                     
                    Create */}
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

const mapStateToProps = ({ auth, contact,source, customer,investor, opportunity, departments, designations }) => ({
  addingContact: contact.addingContact,
  addingContactError: contact.addingContactError,
  user: auth.userDetails,
  sources: source.sources,
  dialCodeList:investor.dialCodeList,
  orgId:auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  investorData:investor.investorData,
  token: auth.token,
  orgId: auth.userDetails.organizationId,
  investorId: investor.investorDetails.investorId,
  tagWithCompany: customer.customer.name,
  opportunityId: opportunity.opportunity.opportunityId,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,
  allEmployeeList:investor.allEmployeeList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addContactInvest,
      addLinkContactByOpportunityId,
      getDesignations,
      getSources,
      getDialCode,
      getInvestorData,
      getDepartments,
      getAllEmployeelist
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestForm);
