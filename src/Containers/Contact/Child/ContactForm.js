import React, {Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Button, Select, Switch } from "antd";
import {getCustomerConfigure} from "../../Settings/SettingsAction"
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {getDepartments} from "../../Settings/Department/DepartmentAction"
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { addContact, addLinkContactByOpportunityId } from "../ContactAction";
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { getCustomerData } from "../../Customer/CustomerAction";
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
  // mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5, "Number is too short").max(10, "Number is too long")
});

class ContactForm extends Component {
 
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
      selectedCustomer: null,
      selectedContact:null,
      translatedMenuItems: [],
      customers: [],
      contacts:[],
      isLoadingCustomers: false,
      isLoadingContacts:false,
      loading: true,
      touchedCustomer: false,
      touchedDepartment: false,
    };
    this.handleSelectCustomerFocus=this.handleSelectCustomerFocus.bind(this)
    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.fetchCustomers = this.fetchCustomers.bind(this);
  }

  componentDidMount() {
    this.props.getCustomerData(this.props.userId);
  
    
  }
  componentDidMount() {
    this.fetchMenuTranslations();
    this.props.getCustomerConfigure(this.props.orgId,"add","contact")
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
 '185',//13
//  'Bedrooms',
 '657',//14
  // 'Property Type',
  '104',//15
  '73',//16
  '995',//17
      ];
      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations ,loading: false});
     
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error translating menu items:', error);
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


  handleSelectDepartmentFocus() {
    const { touchedDepartment } = this.state;
    if (!touchedDepartment) {
      this.props.getDepartments();
      this.setState({ touchedDepartment: true });
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
      addContact,
      addingContact,
  
      linkContact,
      opportunityId,
      addLinkContactByOpportunityId,
      defaultCustomers,
    } = this.props;
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

    const departmentNameOption = this.props.departments
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
        label: `${item.departmentName || ""}`,
        value: item.departmentId,
      };
    });
    // const [text, setText] = useState("");
    // function handletext(e) {
    //   setText(e.target.value);
    // }
    // const {
    //   transcript,
    //   listening,
    //   resetTranscript,
    //   browserSupportsSpeechRecognition,
    // } = useSpeechRecognition();
  
    // if (!browserSupportsSpeechRecognition) {
    //   return <span>Browser doesn't support speech recognition.</span>;
    // }
  
    const {loading,translatedMenuItems } = this.state;
    if (loading) {
      return <div><BundleLoader/></div>;
    } 
  
    return (
      <>
        <Formik
          initialValues={{
            salutation: "",
            // designation: undefined,
            designationTypeId: this.props.designationTypeId,
            description: "",
            //department: undefined,
            departmentId: "",
            departmentDetails: "",
            userId: this.props.userId,
           // customerId: this.props.customerId,
            opportunityId: this.props.opportunityId,
            sourceId:"",
            tagWithCompany: "",
            firstName: "",
            middleName: "",
            lastName: "",
            countryDialCode: this.props.user.countryDialCode,
            countryDialCode1: this.props.user.countryDialCode,
            phoneNumber: "",
            mobileNumber: "",
            emailId: "",
            alternateEmailId:"",
            linkedinPublicUrl: "",
            bedrooms:"",
        
            propertyType:"",
            whatsapp: this.state.whatsapp ? "Different" : "Same",
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
              : addContact(
                {
                  ...values,
                  whatsapp: this.state.whatsapp ? "Different" : "Same",
                  price:values.price,
                  customerId:this.state.selectedCustomer,
                  reportsTo:this.state.selectedContact,
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
            <Form className="form-background h-[70vh]">
              <div class=" flex justify-around max-sm:flex-col"
              >
                <div class=" h-full w-w47.5.5 max-sm:w-wk"
                >
                  <div class=" flex  flex-nowrap justify-between">
                  {this.props.customerConfigure.imageUploadInd===true&&
                    <FastField name="imageId" component={PostImageUpld} />
                  }
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
               
                            {/* name="salutation"
                           */}
                        <div class=" w-[100%] max-sm:w-full">
                        <div class=" text-xs font-semibold font-poppins"> 
                         {translatedMenuItems[0]}             
                          </div>
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
                        <div class=" w-[45%] max-sm:w-full">
                        {this.props.customerConfigure.middleNameInd===true&&
                        <div class=" text-xs font-semibold font-poppins"> 
                        {translatedMenuItems[1]}</div>
  }
                        {this.props.customerConfigure.middleNameInd===true&&
                          <FastField
                            name="middleName"
                            //label="Middle Name"                        
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        }
                        </div>

                        <div class=" w-[45%] max-sm:w-full ">
                        {this.props.customerConfigure.lastNameInd===true&&
                        <div class=" text-xs font-semibold font-poppins">
                           {translatedMenuItems[2]}</div>
  }
                        {this.props.customerConfigure.lastNameInd===true&&
                          <FastField
                            name="lastName"
                            //label="Last Name"                   
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class=" flex justify-between  flex-col mt-2">
                  <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[3]}</div>
                    <div class=" w-full">
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
                  <div class=" flex flex-col justify-between mt-2 ">
                  {this.props.customerConfigure.alternateEmailInd===true&&
                  <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[4]}</div>
  }
                    <div class=" w-full">
                    {this.props.customerConfigure.alternateEmailInd===true&&
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
                    }
                    </div>
                  
                  </div>    
                  {this.props.customerConfigure.dailCodeInd===true&&
                  <div class="  flex  text-xs font-semibold font-poppins"> {translatedMenuItems[6]}</div>
  }           
             <div class="  flex justify-between shadow-[0_0.15em_0.3em_#aaa] border border-[#bfbebb] h-8">
             <div class=" w-3/12 max-sm:w-[30%]">
                
                  {this.props.customerConfigure.dailCodeInd===true&&
                   
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate                 
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          label:`+${this.props.user.countryDialCode}`,
                        }}
                        inlineLabel
                      />
                    
               
  }
   <div class="w-[1px] h-full bg-gray-300">
  <div class="w-full h-[75%]"></div>
</div>
  </div>
                    <div class=" w-[76%] max-sm:w-2/5 ">
                    {/* {this.props.customerConfigure.phoneNoInd===true&&
                    <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[6]}</div>
  } */}
                    {this.props.customerConfigure.phoneNoInd===true&&
                      <Field
                        type="number"
                        name="mobileNumber"                   
                        component={InputComponent1}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    }
                    </div>               
                  </div>
                  <div class=" text-xs mt-2 font-semibold font-poppins"> {translatedMenuItems[7]}</div>
             <div className="flex justify-between w-[100%]">
                 
                      {" "}
                   
                  <div class=" flex w-[77%] justify-between shadow-[0_0.15em_0.3em_#aaa] border border-[#bfbebb] h-8">
                  <div class=" w-3/12 max-sm:w-[35%]">   
                      {this.state.whatsapp && (
                        <FastField
                          name="countryDialCode1"
                          selectType="dialCode"
                          isColumnWithoutNoCreate
                          //label="Phone No #"
                          placeholder='+31'                      
                          isColumn
                          component={SearchSelect}
                          defaultValue={{
                            value: this.props.user.countryDialCode,
                          }}
                          value={values.countryDialCode1}
                          inlineLabel
                        />
                      )}
                    </div>
                    <div class="w-[1px] h-full bg-gray-300">
  <div class="w-full h-[75%]"></div>
</div>
<div class=" w-[76%]">
<div class="text-xs flex flex-col font-bold "> 
                      {this.state.whatsapp && (
                        <Field
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone #"
                          // label={translatedMenuItems[7]}
                          isColumn
                          component={InputComponent}
                          inlineLabel
                          width={"100%"}
                        />
                      )}
                      </div>
                    </div>
                  </div>
               
                    {this.props.customerConfigure.whatsupInd===true&&
                    <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[7]}</div>
  }   <div class=" w-1/4  flex flex-col" >
                    {this.props.customerConfigure.whatsupInd===true&&
                      <Switch
                        onChange={this.handleWhatsApp}
                        checked={this.state.whatsapp}
                        checkedChildren="Different"
                        unCheckedChildren="Same"
                      />
                    }
                    </div>
                    </div>
                 
                  < div class=" flex flex-col justify-between mt-3">
                  {this.props.customerConfigure.linkedinInd===true&&
                  <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[8]}</div>
  }
                    <div class=" w-full">
                    {this.props.customerConfigure.linkedinInd===true&&
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"            
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                    }
                    </div>
                  </div>                              
                </div>
                <div class=" h-3/4 w-w47.5.5 max-sm:w-wk "
                >
                  <div class="  flex justify-between max-sm:mt-20">
        <div class="flex flex-col w-w47.5.5">
                  {this.props.customerConfigure.tagCompanyInd===true&&
                  <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[9]}</div>
                  // Tag Company
  }
                    <div class="  w-wk">
                    {this.props.customerConfigure.tagCompanyInd===true&&
                    
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
                    }
                    </div>
                    </div>              
               

<div class=" w-w47.5.5 ">
                    {this.props.customerConfigure.sourceInd===true&&
                    <div class=" text-xs font-semibold font-poppins">{translatedMenuItems[17]}
                       {/* Reports To */}
                       </div>
                    
  }
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
                    {this.props.customerConfigure.sourceInd===true&&
                    <div class=" text-xs font-semibold font-poppins mt-1"> {translatedMenuItems[10]}</div>
                    
  }
                    {this.props.customerConfigure.sourceInd===true&&
                    <FastField
                            name="sourceId"              
                            isColumnWithoutNoCreate
                            selectType="sourceName"
                            component={SearchSelect}
                            value={values.source}
                            isColumn
                            inlineLabel
                          />
                    }
                        </div>
                 
                  <div class=" flex  justify-between">  
                       <div class="w-w47.5.5 flex flex-col">
                  {this.props.customerConfigure.departmentInd===true&&  
                  <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[11]}</div> 
  }    
                  <div class="  w-wk">
                  {this.props.customerConfigure.departmentInd===true&&
                    <Field
                      name="departmentId"     
                      width="100%"
                      isColumn
                      isColumnWithoutNoCreate
                      component={InputComponent}
                      // value={values.departmentId}
                      // options={Array.isArray(departmentNameOption) ? departmentNameOption : []}
                      inlineLabel
                    />
                  }
                  </div>
                  </div>
                  <div class="w-w47.5.5">
                  {this.props.customerConfigure.designationInd===true&&
                  <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[12]}</div>
  }
                  {this.props.customerConfigure.designationInd===true&&
                  <FastField
                        name="designationTypeId"                     
                        selectType="designationType"
                        isColumn
                        component={SearchSelect}
                        value={values.designationTypeId}
                        isColumnWithoutNoCreate
                        inlineLabel
                      />
                  }
                      </div>
                  </div>
                 
                  <div class="mt-3 mb-3" style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div class="mt-3">
                      {this.props.customerConfigure.addressInd===true&&
                      <div class=" text-xs font-semibold font-poppins mt-2"> {translatedMenuItems[13]}</div>
  }
                  </div>
                    </div>
                    {this.props.customerConfigure.addressInd===true&&
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
  }
              
                  {this.props.orgType==="Real Estate"&&(
                  <div class=" h-3/4 max-sm:w-wk mt-3 "
                >
                  <div class=" flex  justify-between max-sm:mt-20">
                  <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[14]}</div>
                    <div class="  w-w47.5.5">
                      <Field
                        name="bedrooms"
                        // selectType="customerList"
                        isColumnWithoutNoCreate              
                        options={["1", "2", "3","4","5","6"]}
                        component={SelectComponent}
                        isColumn                
                        inlineLabel
                      />
                    </div>

                   
                    <div class=" w-w47.5.5" >
                    <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[15]}</div>
                    <FastField
                            name="price"                        
                            options={["0-100000", "100001-300000", "300001-500000","500000+"]}
                            component={SelectComponent}                           
                            // value={values.source}
                            isColumn
                          />
                        </div>
                     
                    
                  </div>
                  
                  <div class=" flex justify-between mt-3">     
                  <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[16]}</div>    
                  <div class="  w-w47.5.5">
                    <Field
                      name="propertyType"
                      // label="Property Type"
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
                  {/* city */}
                  </div>             
                </div>
                )}
                  {/* Address     */}
                  {/* Street */}
                 
                  <div class=" flex  justify-between mt-3">
                   {/* City */}
                  </div>                             
                </div>
              </div>
             
              <div class="flex justify-end mt-3 md:w-wk bottom-2 md:mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={addingContact}
                >
                  <div class=" text-xs font-semibold font-poppins"> {translatedMenuItems[15]}</div>        
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

const mapStateToProps = ({ auth, contact,settings, customer, opportunity, departments, designations }) => ({
  addingContact: contact.addingContact,
  addingContactError: contact.addingContactError,
  user: auth.userDetails,
  departments: departments.departments,
  token: auth.token,
  customerConfigure:settings.customerConfigure,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  orgType:auth.userDetails.orgType,
  customerData:customer.customerData,
  customerId: customer.customer.customerId,
  tagWithCompany: customer.customer.name,
  opportunityId: opportunity.opportunity.opportunityId,
  departmentId: departments.departmentId,
  designationTypeId: designations.designationTypeId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

      addContact,
      getDepartments,
      getCustomerConfigure,
      addLinkContactByOpportunityId,
      // getCurrency,
      getCustomerData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
