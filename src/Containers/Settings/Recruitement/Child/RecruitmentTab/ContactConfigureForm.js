import React, { useState ,useEffect, Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Button, Select, Switch } from "antd";
import {
    addCustomerConfigure,
    getCustomerConfigure
} from "../../../SettingsAction"
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {getDepartments} from "../../../../Settings/Department/DepartmentAction"
import { HeaderLabel,  } from "../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { addContact, addLinkContactByOpportunityId } from "../../../../Contact/ContactAction";
import PostImageUpld from "../../../../../Components/Forms/Formik/PostImageUpld";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { getCustomerData } from "../../../../Customer/CustomerAction";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import SpeechRecognition, { useSpeechRecognition,} from 'react-speech-recognition';
import { BundleLoader } from "../../../../../Components/Placeholder";

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

function ContactForm (props) {


    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAddressVisible, setIsAddressVisible] = useState(false);
    const [isOtherVisible, setIsOtherVisible] = useState(false);
    const [islinkedinVisible, setIslinkedinVisible] = useState(false)
    const [isCustomerVisible, setIsCustomerVisible] = useState(false)
    const [isAlternateEmailVisible, setIsAlternateEmailVisible] = useState(false)
    const [isDepartmentVisible, setIsdepartmentVisible] = useState(false)
    const [isDesignationVisible, setIsdesignationVisible] = useState(false)
    const [isUploadVisible, setIsUploadVisible] = useState(false);
    const [isSourceVisible, setIsSourceVisible] = useState(false);
    const [isphoneNoVisible, setIsphoneNoVisible] = useState(false);
  const [isMobileNumberVisible, setIsMobileNumberVisible] = useState(false);
    const [isLastNameVisible, setIsLastNameVisible] = useState(false);
    const [isMiddleVisible, setIsMiddleVisible] = useState(false);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
//   componentDidMount() {
//     props.getCustomerData(props.userId);
//     props.getDepartments();
//   }
  
useEffect(() => {
props.getCustomerData(props.userId);
props.getDepartments();
}, []);

useEffect(() => {
    
    props.getCustomerConfigure(props.orgId,"add","contact")
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
      const itemsToTranslate = [
       'First Name', // 0
'Middle Name', // 1
'Last Name', // 2
'Email', // 3
'Alternate Email', // 4
'Dial Code', // 5
'Mobile', // 6
'WhatsApp', // 7
'Linkedin', // 8
'Tag Company', // 9
'Source', // 10
'Department', // 11
'Designation' ,// 12
 'Address',
 'Bedrooms',
 'price',
  'Property Type',
  'Create'
      ];
      const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
      setTranslatedMenuItems(translations);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error translating menu items:', error);
    }
  };


  fetchMenuTranslations();
  }, [props.selectedLanguage]);




  useEffect(() => {
    // if (
    //   props.customerConfigure.addressInd !== undefined &&
    //   props.customerConfigure.businessRegInd !== undefined &&
    //   props.customerConfigure.vatNoInd !== undefined &&
    //   props.customerConfigure.assignedToInd !== undefined &&
    //   props.customerConfigure.noteInd !== undefined &&
    //   props.customerConfigure.sourceInd !== undefined &&
    //   props.customerConfigure.sectorInd !== undefined &&
    //   props.customerConfigure.phoneNoInd !== undefined &&
    //   props.customerConfigure.dailCodeInd !== undefined &&
    //   props.customerConfigure.lobInd !== undefined &&
    //   props.customerConfigure.middleNameInd !== undefined &&
    //   props.customerConfigure.imageUploadInd !== undefined &&
    //   props.customerConfigure.nameInd !== undefined &&
    //   props.customerConfigure.lastNameInd !== undefined &&
    //   props.customerConfigure.urlInd !== undefined &&
      
    //   props.customerConfigure.typeInd !== undefined
      
      
    // ) {
      //setIsFirstNameVisible(props.customerConfigure.startInd);
      setIsLastNameVisible(props.customerConfigure.lastNameInd);
      
      setIsMobileNumberVisible(props.customerConfigure.dailCodeInd);
      setIsSourceVisible(props.customerConfigure.sourceInd)
      setIsOtherVisible(props.customerConfigure.whatsupInd)
      setIslinkedinVisible(props.customerConfigure.linkedinInd)
      setIsCustomerVisible(props.customerConfigure.tagCompanyInd)
      setIsAddressVisible(props.customerConfigure.addressInd)
      setIsdepartmentVisible(props.customerConfigure.departmentInd)
      setIsphoneNoVisible(props.customerConfigure.phoneNoInd)
      setIsUploadVisible(props.customerConfigure.imageUploadInd)
      setIsMiddleVisible(props.customerConfigure.middleNameInd)
      setIsdesignationVisible(props.customerConfigure.designationInd)
      setIsAlternateEmailVisible(props.customerConfigure.alternateEmailInd)
     
     
    // }
  }, [props.customerConfigure]);






  const toggleFieldVisibility = (fieldName) => {
    switch (fieldName) {
     
    
        
            case 'middle':
            setIsMiddleVisible(!isMiddleVisible);
            break;
             case 'upload':
            setIsUploadVisible(!isUploadVisible);
            break;
             case 'lastName':
            setIsLastNameVisible(!isLastNameVisible);
            break;
           
                
                
                    case 'dialcode':
                        setIsMobileNumberVisible(!isMobileNumberVisible);
                        break;
                        
                        case 'phoneNo':
                            setIsphoneNoVisible(!isphoneNoVisible);
                            break;
                            case 'address':
                                setIsAddressVisible(!isAddressVisible);
                                break;
                               
                                 
                                    case 'other':
                                        setIsOtherVisible(!isOtherVisible);
                                      break;
                                       case 'source':
                                      setIsSourceVisible(!isSourceVisible);
                                      break;


                                      case 'linkedin':
                                        setIslinkedinVisible(!islinkedinVisible);
                                        break;

                                        case 'customer':
                                            setIsCustomerVisible(!isCustomerVisible);
                                            break;


                                            case 'department':
                                                setIsdepartmentVisible(!isDepartmentVisible);
                                                break;

                                                case 'designation':
                                                    setIsdesignationVisible(!isDesignationVisible);
                                                break;

                                                case 'upload':
                                                    setIsUploadVisible(!isUploadVisible);
                                                    break;

                                                    case 'alternate':
                                                        setIsAlternateEmailVisible(!isAlternateEmailVisible);
                                                    break;
      default:
        break;
    }
  };


 
    const {
      user: { userId, firstName, lastName },
      addContact,
      addingContact,
  
      linkContact,
      opportunityId,
      addLinkContactByOpportunityId,
      defaultCustomers,
    } = props;
  
   
    
  
    
    if (loading) {
      return <div><BundleLoader/></div>;
    } 
  
    return (
      <>
        <Formik
          initialValues={{
            formType:"add",
            baseFormType:"contact",
            // whatsapp: this.state.whatsapp ? "Different" : "Same",
            address: [
              {
                addressType: "",
                address1: "",
                address2: "",
                town: "",
                street: "",
                city: "",
                postalCode: "",
                country: props.user.country,
                latitude: "",
                longitude: "",
              },
            ],
            notes: "",
          }}
        //   validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
         
            props.addCustomerConfigure(
                {
                  ...values,
                  dailCodeInd:isMobileNumberVisible,
                  phoneNoInd:isphoneNoVisible,
                
                  sourceInd:isSourceVisible,
                 
                  addressInd:isAddressVisible,
                  
                  middleNameInd:isMiddleVisible,
                  lastNameInd:isLastNameVisible,
                 
                  imageUploadInd:isUploadVisible,
                  departmentInd:isDepartmentVisible,
                  designationInd:isDesignationVisible,
                  linkedinInd:islinkedinVisible,
                  whatsupInd:isOtherVisible,
                  alternateEmailInd:isAlternateEmailVisible,
                  tagCompanyInd:isCustomerVisible

                },
                props.userId,
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
              <div class=" flex justify-around max-sm:flex-col"
              >
                <div class=" h-full w-w47.5 max-sm:w-wk"
                >
                  <div class=" flex  flex-nowrap justify-between">
                    <FastField name="imageId" component={PostImageUpld} />
                    <Switch
            checked={isUploadVisible}
            onChange={() => toggleFieldVisibility('upload')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                        {/* <div class=" w-2/5 max-sm:w-full">
                          <FastField
                            name="salutation"
                            type="text"
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
                        <div class=" w-wk max-sm:w-full">
                        <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[0]}</div>
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
                        <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[1]}</div>
                          <FastField
                            name="middleName"
                            //label="Middle Name"
                          
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                                               <Switch
            checked={isMiddleVisible}
        onChange={() => toggleFieldVisibility('middle')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                        </div>
                        <div class=" w-1/2 max-sm:w-full">
                        <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[2]}</div>
                          <FastField
                            name="lastName"
                            //label="Last Name"
                            // label={translatedMenuItems[2]}
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                                                           <Switch
        checked={isLastNameVisible}
    onChange={() => toggleFieldVisibility('lastName')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class=" flex justify-between">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[3]}</div>
                    <div class=" w-full">
                      <FastField
                        type="email"
                        name="emailId"
                        //label="Email"
                        // label={translatedMenuItems[3]}
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
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[4]}</div>
                    <div class=" w-full">
                      <FastField
                        type="email"
                        name="alternateEmail"
                        //label="Email"
                        // label={translatedMenuItems[4]}
                        className="field"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        // isRequired
                      />


<Switch
        checked={isAlternateEmailVisible}
    onChange={() => toggleFieldVisibility('alternate')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    </div>
                  
                  </div>               
                  <div class=" flex justify-between">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[5]}</div>
                    <div class=" w-2/6 max-sm:w-2/5">
                      <FastField
                        name="countryDialCode"
                        isColumnWithoutNoCreate
                        // label={translatedMenuItems[5]}
                        isColumn
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          label:`+${props.user.countryDialCode}`,
                        }}
                        inlineLabel
                      />
                                                     <Switch
            checked={isMobileNumberVisible}
            onChange={() => toggleFieldVisibility('dialcode')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    </div>
                    <div class=" w-2/5 max-sm:w-2/5">
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[6]}</div>
                      <FastField
                        type="number"
                        name="mobileNumber"
                        // label={translatedMenuItems[6]}
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                                                     <Switch
          checked={isphoneNoVisible}
           onChange={() => toggleFieldVisibility('phoneNo')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    </div>
                    <div class=" w-1/4 " >
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[7]}</div>
                      <Switch
                        // onChange={this.handleWhatsApp}
                        // checked={this.state.whatsapp}
                        checkedChildren="Different"
                        unCheckedChildren="Same"
                      />
                    </div>
                    <Switch
            checked={isOtherVisible}
        onChange={() => toggleFieldVisibility('other')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                  </div>
                 
                  <div class=" flex justify-between">
                    {/* <div class=" w-2/4">
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[5]}</div>
                      {" "}
                      {whatsapp && (
                        <FastField
                          name="countryDialCode1"
                          selectType="dialCode"
                          isColumnWithoutNoCreate
                        
                          placeholder='+31'
                         
                          isColumn
                          component={SearchSelect}
                          defaultValue={{
                            value: props.user.countryDialCode,
                          }}
                          value={values.countryDialCode1}
                          inlineLabel
                        />
                      )}
                    </div> */}
                    <div class=" w-2/4">
                    
                    </div>
                  </div>
                 
                 
                  < div class=" flex justify-between mt-3">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[8]}</div>
                    <div class=" w-full">
                      <FastField
                        type="text"
                        name="linkedinPublicUrl"
                        //label="Linkedin "
                        // label={translatedMenuItems[8]}
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />

<Switch
            checked={islinkedinVisible}
        onChange={() => toggleFieldVisibility('linkedin')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    </div>
                  </div>
                
                  {/* <div class="mt-3">
                    <div>Notes</div>
                    <div>
                  <div>
                    <span onClick={SpeechRecognition.startListening}>
                      <Tooltip title="Start">
                        <span  >
                          <RadioButtonCheckedIcon className="!text-icon ml-1 text-red-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={SpeechRecognition.stopListening}>
                      <Tooltip title="Stop">
                        <span
                          
                            >
                          <StopCircleIcon className="!text-icon ml-1 text-green-600" />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title="Clear">
                        <span >
                          <RotateRightIcon  className="!text-icon ml-1" />
                        </span>
                      </Tooltip>
                    </span>
                  </div>
                  <div>
                    <textarea
                      name="description"
                      className="textarea"
                      type="text"
                      value={transcript ? transcript : text}
                      onChange={handletext}
                    ></textarea>
                  </div>
                </div>
                  </div> */}
                </div>
                <div class=" h-3/4 w-w47.5 max-sm:w-wk "
                >
                  <div class=" flex  justify-between max-sm:mt-20">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[9]}</div>
                    <div class="  w-w47.5">
                      <Field
                        name="customerId"
                        // selectType="customerList"
                        isColumnWithoutNoCreate
                        // label={translatedMenuItems[9]}
                        component={SelectComponent}
                        isColumn
                        value={values.customerId}
                        options={[
                            { value: "1", label: "Option 1" },
                            { value: "2", label: "Option 2" },
                            { value: "3", label: "Option 3" }
                          ]}
                        isDisabled={defaultCustomers}
                        //options={Array.isArray(customerNameOption) ? customerNameOption : []}
                        // defaultValue={defaultCustomers ? defaultCustomers : null}
                        inlineLabel
                      />
                            <Switch
            checked={isCustomerVisible}
        onChange={() => toggleFieldVisibility('customer')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    </div>

                   
                    <div class=" w-w47.5">
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[10]}</div>
                    <FastField
                            name="source"
                            //  label={translatedMenuItems[10]}
                            isColumnWithoutNoCreate
                            selectType="sourceName"
                            component={SearchSelect}
                            value={values.source}
                            isColumn
                          />
                             <Switch
            checked={isSourceVisible}
        onChange={() => toggleFieldVisibility('source')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                        </div>
                     
                    
                  </div>
                 
                  <div class=" flex justify-between mt-3">    
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[11]}</div>     
                  <div class="  w-w47.5">
                    <Field
                      name="departmentId"
                     //  label={translatedMenuItems[11]}
                      width="100%"
                      isColumn
                      isColumnWithoutNoCreate
                      component={InputComponent}
                      // value={values.departmentId}
                      // options={Array.isArray(departmentNameOption) ? departmentNameOption : []}
                      inlineLabel
                    />
                       <Switch
        checked={isDepartmentVisible}
        onChange={() => toggleFieldVisibility('department')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                  </div>
                  <div class="w-w47.5">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[12]}</div>
                  <FastField
                        name="designationTypeId"
                        //label="Designation"
                        // label={translatedMenuItems[12]}
                        selectType="designationType"
                        isColumn
                        component={SearchSelect}
                        value={values.designationTypeId}
                        isColumnWithoutNoCreate
                        inlineLabel
                      />
                         <Switch
          checked={isDesignationVisible}
        onChange={() => toggleFieldVisibility('designation')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                      </div>
                  </div>
                 
                  <div class="mt-8" style={{ width: "100%",backgroundImage: "linear-gradient(-90deg, #00162994, #94b3e4)" }}>
                      <div>
                      <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[13]}</div>
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
                                             <Switch
            checked={isAddressVisible}
            onChange={() => toggleFieldVisibility('address')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />

                 
                  {props.orgType==="Real Estate"&&(
                  <div class=" h-3/4 max-sm:w-wk mt-3 "
                >
                  <div class=" flex  justify-between max-sm:mt-20">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[14]}</div>
                    <div class="  w-w47.5">
                      <Field
                        name="bedrooms"
                        // selectType="customerList"
                        isColumnWithoutNoCreate
                        // label="Bedrooms"
                      
                        // label={
                        //   <FormattedMessage
                        //     id="app.tagCompany"
                        //     defaultMessage="Tag Company"
                        //   />
                        // }
                        options={["1", "2", "3","4","5","6"]}
                        component={SelectComponent}
                        isColumn
                        //value={values.customerId}
                        //isDisabled={defaultCustomers}
                        //options={Array.isArray(customerNameOption) ? customerNameOption : []}
                        // defaultValue={defaultCustomers ? defaultCustomers : null}
                        inlineLabel
                      />
                    </div>

                   
                    <div class=" w-w47.5" >
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[15]}</div>
                    <FastField
                            name="price"
                            // label="Price"
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
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[16]}</div>    
                  <div class="  w-w47.5">
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
                 
                 

                 
                  {/* <Field
                    name="address[0].address1"
                    // label="Address"
                    label={
                      <FormattedMessage
                        id="app.address[0].address1"
                        defaultMessage="Address"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  />
                 */}
                  {/* <Field
                    name="address[0].street"
                    //label="Street"

                    label={
                      <FormattedMessage
                        id="app.street"
                        defaultMessage="Street"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  /> */}
                 
                  <div class=" flex  justify-between mt-3">
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
                )}
                  {/* <Field
                    name="address[0].address1"
                    // label="Address"
                    label={
                      <FormattedMessage
                        id="app.address[0].address1"
                        defaultMessage="Address"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  />
                   */}
                  {/* <Field
                    name="address[0].street"
                    //label="Street"

                    label={
                      <FormattedMessage
                        id="app.street"
                        defaultMessage="Street"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width="100%"
                  /> */}
                 
                  <div class=" flex  justify-between mt-3">
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
             
              <div class="flex justify-end mt-3 md:w-wk bottom-2 md:mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.addingCustomerConfig}
                >
                  <div class=" text-xs font-bold font-poppins"> 
                    {/* {translatedMenuItems[17]} */}
                    Update
                    </div>
                  {/* <FormattedMessage id="app.create" defaultMessage="Create" /> */}
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


const mapStateToProps = ({ auth, contact,settings, customer, opportunity, departments, designations }) => ({
  addingContact: contact.addingContact,
  customerConfigure:settings.customerConfigure,
  addingCustomerConfig:settings.addingCustomerConfig,
  addingContactError: contact.addingContactError,
  user: auth.userDetails,
  departments: departments.departments,
  userId: auth.userDetails.userId,
  orgType:auth.userDetails.orgType,
  customerData:customer.customerData,
  customerId: customer.customer.customerId,
  tagWithCompany: customer.customer.name,
  opportunityId: opportunity.opportunity.opportunityId,
  departmentId: departments.departmentId,
  orgId: auth.userDetails.organizationId,
  designationTypeId: designations.designationTypeId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

      addContact,
      addCustomerConfigure,
      getDepartments,
      getCustomerConfigure,
      addLinkContactByOpportunityId,
      // getCurrency,
      getCustomerData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
