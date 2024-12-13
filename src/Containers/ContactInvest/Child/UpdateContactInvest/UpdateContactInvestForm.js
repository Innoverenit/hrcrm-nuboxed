import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";

import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
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
import { BundleLoader } from "../../../../Components/Placeholder";
import { InputComponent1 } from "../../../../Components/Forms/Formik/InputComponent1";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UpdateContactSchema = Yup.object().shape({
  emailId: Yup.string()
    .required("Input needed!")
    .email("Enter a valid Email"),
  firstName: Yup.string().required("Input needed!"),
  // mobileNumber: Yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(5,"Minimum 8 digits").max(10,"Number is too long")
});

class UpdateContactInvestForm extends Component {
 
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
      loading: true

    };
  }
  componentDidMount() {
    this.props.getCustomerData(this.props.userId);
    this.props.getInvestorData(this.props.userId);
    this.props.getDialCode();
  }
  componentDidMount() {
    this.fetchMenuTranslations();
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
'357', // 5Dial Code
'546', // 6 Mobile
'1157', // 7 WhatsApp
'547', // 8 Linkedin
'361', // 10 Tag Company
'279' ,//13 Source
'326', // 11Department
'325', // 12
''//13UpdateContact

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
    const {loading,translatedMenuItems } = this.state;
    if (loading) {
      return <div><BundleLoader/></div>;
    } 
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
            alternateEmail: contactiData.alternateEmail || "",
            
            customerId:contactiData.customerId||"",
            linkedinPublicUrl:
              contactiData.linkedinPublicUrl || "",
            //   address: [
            //   {
            //     addressId: contactiData.address.length ? contactiData.address[0].addressId : "",
            //     address1: contactiData.address.length ? contactiData.address[0].address1 : "",
            //     street:  contactiData.address.length ? contactiData.address[0].street : "",
            //     city:  contactiData.address.length ? contactiData.address[0].city : "",
            //     state:  contactiData.address.length ? contactiData.address[0].state : "",
            //     postalCode:  contactiData.address.length ? contactiData.address[0].postalCode : "",
            //   },
            // ],
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
                <div class=" h-full w-w47.5.5 max-sm:w-wk" >
                 <div class=" flex justify-between  flex-nowrap">
                    <FastField name="imageId" component={PostImageUpld} />
                    <div>
                    <div class=" flex justify-between max-sm:flex-col">
                                 {/* name="salutation" */}
                       
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
                      <div class=" flex justify-between max-sm:flex-col mt-1">
                        <div class=" font-bold font-poppins text-xs w-2/5 max-sm:w-wk">
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
                        <div class=" font-bold font-poppins text-xs w-1/2 max-sm:w-wk mt-1">
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
                  <div class=" flex justify-between mt-1 ">
                    <div class=" font-bold font-poppins text-xs w-full">
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
                          label:`+${contactiData.countryDialCode}`,
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
                        type="text"
                        name="mobileNumber"                     
                        component={InputComponent1}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                    </div>
                  </div>
                      
                     < div class=" flex justify-between mt-2">
                    <div class="  font-bold font-poppins text-xs w-full">
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
                 
                  <div class="mt-2">
                  <Field
                    name="notes"
                 label="Notes"
                   
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />                 
                  </div>
                </div>
                
                <div class=" h-3/4 w-w47.5.5 max-sm:w-wk "> 
                <div class=" flex  justify-between">
                <div class="  font-bold font-poppins text-xs w-w47.5.5">
            {translatedMenuItems[9]}  
                      <Field
                        name="customerId"
                        // selectType="customerList"
                        isColumnWithoutNoCreate                    
                        //Tag Company                   
                        component={SelectComponent}
                        isColumn
                        value={values.customerId}
                        isDisabled={defaultCustomers}
                        options={Array.isArray(customerNameOption) ? customerNameOption : []}
                        // defaultValue={defaultCustomers ? defaultCustomers : null}
                        inlineLabel
                      />
                    </div>          
                <div class="  font-bold font-poppins text-xs w-w47.5.5 ">
                {translatedMenuItems[10]} 
                  <FastField
                    name="designationTypeId"
                    //label="Designation"                                  
                    selectType="designationType"                 
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
              <div class=" font-bold font-poppins text-xs w-w47.5.5">
              {translatedMenuItems[11]} 
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
                    <div class=" font-bold font-poppins text-xs w-w47.5.5">
                   {translatedMenuItems[12]}  
                  <FastField
                            name="sourceId"                                   
                            isColumnWithoutNoCreate
                            selectType="sourceName"
                            component={SearchSelect}
                            value={values.sourceId}
                            isColumn
                          />
                        </div>
                  </div>                         
                  {/* <div class="mt-6 w-full" style={{backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                      <div class="text-white um m-[0.2rem_0_0.4rem_0.2rem] text-xs flex" >
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
                  />                           */}
                  <div class=" flex  justify-between mt-6">
                  
                </div>
              </div>
             
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute mt-6 ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateContactInvestById}
                >
<div className="font-bold font-poppins text-xs"> {translatedMenuItems[13]} </div>

                  {/* Update */}
                </Button>
              </div>
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
