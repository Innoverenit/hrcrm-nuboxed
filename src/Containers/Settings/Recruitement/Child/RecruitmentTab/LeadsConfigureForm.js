import React, { useEffect,useState,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select, Tooltip,Switch } from "antd";

import {
    addCustomerConfigure,
    getCustomerConfigure
} from "../../../SettingsAction"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { base_url } from "../../../../../Config/Auth";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field, FieldArray, FastField,setFieldValue  } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import AddressFieldArray from "../../../../../Components/Forms/Formik/AddressFieldArray";
import {
  addLeads, 
  setClearbitData,
  emptyClearbit,
  getCrm
} from "../../../../Leads/LeadsAction";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PostImageUpld from "../../../../../Components/Forms/Formik/PostImageUpld";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import ProgressiveImage from "../../../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../../../Components/Forms/Autocomplete/ClearbitImage";
import { Listbox, } from '@headlessui/react';
import { BundleLoader } from "../../../../../Components/Placeholder";
const { Option } = Select; 

// yup validation scheme for creating a account
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const LeadsSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber:Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});

function LeadsConfigureForm (props) {
  
 const handleReset = (resetForm) => {
    resetForm();
  };
 
  useEffect(()=> {
props. getCrm();
props.emptyClearbit();
  },[]);

    const {
      accounts,
      user,
      userId,
      // user: { userId, firstName },
      isEditing,
      prefillAccount,
      addingLeads,
      addLeads,
      clearbit,
      setClearbitData,
    } = props;
    const [lob, setLob] = useState([]);
    const [selectedLob, setSelectedLob] = useState(null);
    const [touchedLob, setTouchedLob] = useState(false);
    const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.crmAllData.find((item) => item.empName === selected);
    const [isLoadingLob, setIsLoadingLob] = useState(false);
    const [source, setSource] = useState([]);
    
    const [sector, setSector] = useState([]);
    const [touched, setTouched] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
  const [touchedSector, setTouchedSector] = useState(false);
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedSource, setSelectedSource] = useState(null);
    const [isLoadingSector, setIsLoadingSector] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    const [priority,setpriority]=useState(props.selectedTask
      ? props.selectedTask.priority
      : "hot");



      const [isFirstNameVisible, setIsFirstNameVisible] = useState(false);
  const [isLastNameVisible, setIsLastNameVisible] = useState(false);
  
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isphoneNoVisible, setIsphoneNoVisible] = useState(false);
  const [isMobileNumberVisible, setIsMobileNumberVisible] = useState(false);
  const [isSourceVisible, setIsSourceVisible] = useState(false);
  const [isLobVisible, setIsLobVisible] = useState(false);
  const [isVatVisible, setIsVatVisible] = useState(false);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [isAssignedVisible, setIsAssignedVisible] = useState(false);
  const [isNotesVisible, setIsNotesVisible] = useState(false);


  const [isUrlVisible, setIsUrlVisible] = useState(false);

  const [isRegistrationVisible, setIsRegistrationVisible] = useState(false);
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [isSectorVisible, setIsSectorVisible] = useState(false);
  const [isCurrencyVisible, setIsCurrencyVisible] = useState(false);
  const [isTypeVisible, setIsTypeVisible] = useState(false);


  const [isMiddleVisible, setIsMiddleVisible] = useState(false);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '295', //First Name 0
'353', // 1 middle
'354', // 2 last
'140', // 3Email
'299', // 4Mobile
'300', // 5 Phone No
'277', // 6
'302', // 7 URL
'278', // 8 Sector
'279', // 9Source
'280', // 10
'306', // 11 VAT Number
'307', // 12 Registration
'76', // 13 Assigned
'316', // 14 Notes


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
    
    props.getCustomerConfigure(props.orgId,"add","leads")
  }, []);



  useEffect(() => {
    if (
      props.customerConfigure.addressInd !== undefined &&
      props.customerConfigure.businessRegInd !== undefined &&
      props.customerConfigure.vatNoInd !== undefined &&
      props.customerConfigure.assignedToInd !== undefined &&
      props.customerConfigure.noteInd !== undefined &&
      props.customerConfigure.sourceInd !== undefined &&
      props.customerConfigure.sectorInd !== undefined &&
      props.customerConfigure.phoneNoInd !== undefined &&
      props.customerConfigure.dailCodeInd !== undefined &&
      props.customerConfigure.lobInd !== undefined &&
      props.customerConfigure.middleNameInd !== undefined &&
      props.customerConfigure.imageUploadInd !== undefined &&
      props.customerConfigure.nameInd !== undefined &&
      props.customerConfigure.lastNameInd !== undefined &&
      props.customerConfigure.urlInd !== undefined &&
      
      props.customerConfigure.typeInd !== undefined
      
      
    ) {
      //setIsFirstNameVisible(props.customerConfigure.startInd);
      setIsLastNameVisible(props.customerConfigure.lastNameInd);
      
      setIsMobileNumberVisible(props.customerConfigure.dailCodeInd);
      setIsSourceVisible(props.customerConfigure.sourceInd)
      setIsVatVisible(props.customerConfigure.vatNoInd)
      setIsAssignedVisible(props.customerConfigure.assignedToInd)
      setIsNotesVisible(props.customerConfigure.noteInd)
      setIsAddressVisible(props.customerConfigure.addressInd)
      setIsFirstNameVisible(props.customerConfigure.nameInd)
      setIsphoneNoVisible(props.customerConfigure.phoneNoInd)
      setIsUploadVisible(props.customerConfigure.imageUploadInd)
      setIsMiddleVisible(props.customerConfigure.middleNameInd)
      setIsSectorVisible(props.customerConfigure.sectorInd)
      setIsTypeVisible(props.customerConfigure.typeInd)
      setIsLobVisible(props.customerConfigure.lobInd)
      setIsUrlVisible(props.customerConfigure.urlInd)
      setIsRegistrationVisible(props.customerConfigure.businessRegInd)
    }
  }, [props.customerConfigure]);
  
    const fetchSource = async () => {
      setIsLoading(true);
      try {
        const apiEndpoint = `${base_url}/source/${props.organizationId}`;
        const response = await fetch(apiEndpoint,{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${props.token}`,
            'Content-Type': 'application/json',
            // Add any other headers if needed
          },
        });
        const data = await response.json();
        setSource(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
  const handleSelectChange = (value) => {
    setSelectedSource(value)
    console.log('Selected user:', value);
  };

  const handleSelectFocus = () => {
    if (!touched) {
      fetchSource();
      // fetchSector();

      setTouched(true);
    }
  };

  const fetchSector = async () => {
    setIsLoadingSector(true);
    try {
      const apiEndpoint = `${base_url}/sector`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setSector(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingSector(false);
    }
  };

  const handleButtonClick = (type) => {
    setpriority(type);
    };

  const handleSelectSector = (value) => {
    setSelectedSector(value)
    console.log('Selected user:', value);
  };
  
  const handleSelectSectorFocus = () => {
    if (!touchedSector) {
     
      fetchSector();

      setTouchedSector(true);
    }
  };
  const fetchLob = async () => {
    setIsLoadingLob(true);
    try {
      const apiEndpoint = `${base_url}/lob/all/${props.orgId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setLob(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingLob(false);
    }
  };
  const handleSelectLobFocus = () => {
    if (!touchedLob) {
     
      fetchLob();

      setTouchedLob(true);
    }
  };
  const handleSelectLob = (value) => {
    setSelectedLob(value)
    console.log('Selected user:', value);
  };
  const [text, setText] = useState("");
  console.log(text)
  function handletext(e) {
    setText(e.target.value);
  }



  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Browser does not support speech recognition.');
      return;
    }

  

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }
    finalTranscript = finalTranscript.trim(); // Trim spaces around the transcript

    // Ensure the final transcript is appended only once
    setTranscript((prevTranscript) => {
      setText((prevText) => (prevText + ' ' + finalTranscript).trim());
      return prevTranscript + ' ' + finalTranscript;
    });
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognitionRef.current = recognition;

  return () => {
    recognition.stop();
  };
}, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    setTranscript('');
  };

  const resetTranscript = () => {
    setTranscript('');
    setText('');
  };





  const toggleFieldVisibility = (fieldName) => {
    switch (fieldName) {
      case 'name':
        setIsFirstNameVisible(!isFirstNameVisible);
        break;
      case 'lob':
        setIsLobVisible(!isLobVisible);
        break;
      case 'url':
        setIsUrlVisible(!isUrlVisible);
        break;
    
        case 'notes':
            setIsNotesVisible(!isNotesVisible);
            break;
            case 'middle':
            setIsMiddleVisible(!isMiddleVisible);
            break;
             case 'upload':
            setIsUploadVisible(!isUploadVisible);
            break;
             case 'lastName':
            setIsLastNameVisible(!isLastNameVisible);
            break;
            case 'assigned':
                setIsAssignedVisible(!isAssignedVisible);
                break;
                 case 'sector':
                setIsSectorVisible(!isSectorVisible);
                break;
                case 'vat':
                    setIsVatVisible(!isVatVisible);
                    break;
                    case 'dialcode':
                        setIsMobileNumberVisible(!isMobileNumberVisible);
                        break;
                          case 'business':
                        setIsRegistrationVisible(!isRegistrationVisible);
                        break;
                        case 'phoneNo':
                            setIsphoneNoVisible(!isphoneNoVisible);
                            break;
                            case 'address':
                                setIsAddressVisible(!isAddressVisible);
                                break;
                               
                                 
                                    case 'type':
                                      setIsTypeVisible(!isTypeVisible);
                                      break;
                                       case 'source':
                                      setIsSourceVisible(!isSourceVisible);
                                      break;
      default:
        break;
    }
  };

  

  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition,
  // } = useSpeechRecognition();

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

 
  
  if (loading) {
    return <div><BundleLoader/></div>;
  }
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
           
            
            // bedrooms:"",
        
            // propertyType:"",
            formType:"add",
            baseFormType:"leads",
            address: [
              {
                address1: "",
                address2: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
              },
            ],
          }}
        //   validationSchema={LeadsSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            props.addCustomerConfigure(
              {
                ...values,
                  dailCodeInd:isMobileNumberVisible,
           phoneNoInd:isphoneNoVisible,
           sectorInd:isSectorVisible,
           sourceInd:isSourceVisible,
           noteInd:isNotesVisible,
           assignedToInd:isAssignedVisible,
           vatNoInd:isVatVisible,
           businessRegInd:isRegistrationVisible,
           addressInd:isAddressVisible,
           nameInd:isFirstNameVisible,
           typeInd:isTypeVisible,
           middleNameInd:isMiddleVisible,
           lastNameInd:isLastNameVisible,
           urlInd:isUrlVisible,
           lobInd:isLobVisible,
           imageUploadInd:isUploadVisible,
         
           
              },
              props.userId,
            );
            resetForm()
  //           setFieldValue("sectorId", "");

  // // Reset address fields
  // setFieldValue("address", [
  //   {
  //     address1: "",
  //     address2: "",
  //     street: "",
  //     city: "",
  //     state: "",
  //     postalCode: "",
  //   },
  // ]);
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            values,
            ...rest
          }) => (
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
            <div class="">
                    {clearbit && clearbit.hasOwnProperty("logo") && (
                      <ProgressiveImage
                        preview={
                          "http://pluspng.com/img-png/twitter-logo-png-twitter-logo-png-256.png"
                        }
                        image={clearbit.logo}
                        width={140}
                        height={150}
                        borderRadius={25}
                        padding={15}

                      />
                    )}
                    {clearbit && clearbit.hasOwnProperty("logo") ? (
                      <a
                        href="https://clearbit.com"
                        target="_blank"
                        style={{ fontSize: 13, marginLeft: 5 }}
                      >
                        Logos provided by Clearbit
                      </a>
                    ) : null}
                  </div> 
             <div class="flex justify-between  pr-2 max-sm:flex-col" >
                   
                <div class=" h-full w-w47.5.5 max-sm:w-wk"   >
                  <div class=" flex  flex-nowrap">
                    <div> <FastField name="imageId" component={PostImageUpld} /></div>
                    <Switch
            checked={isUploadVisible}
            onChange={() => toggleFieldVisibility('upload')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                        
                        <div class=" w-wk max-sm:w-full ">
                          <FastField
                            isRequired
                            name="firstName"
                            // label="First Name"
                            label={translatedMenuItems[0]}
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
                          <FastField
                            name="middleName"
                            //label="Middle Name"
                            label={translatedMenuItems[1]}
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
                          <FastField
                            name="lastName"
                            //label="Last Name"
                            label={translatedMenuItems[2]}
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

                  <Field
                    isRequired
                    name="email"
                    type="text"
                    label={translatedMenuItems[3]}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  /> 
                                     {/* <Switch
            checked={isEmailVisible}
            onChange={() => toggleFieldVisibility('email')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          /> */}
                               
                  <div class=" flex justify-between">
                    <div class=" w-3/12 max-sm:w-[35%]">
                   
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          label:`${props.user.countryDialCode}`,
                        }}
                        isColumnWithoutNoCreate
                        label={translatedMenuItems[4]}
                        isColumn
                        inlineLabel
                      />
                                         <Switch
            checked={isMobileNumberVisible}
            onChange={() => toggleFieldVisibility('dialcode')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                  
                    </div>
                    <div class=" w-8/12">
                    <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                      <FastField
                        type="text"
                        name="phoneNumber"
                        label={translatedMenuItems[5]}
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                                         <Switch
            checked={isphoneNoVisible}
           onChange={() => toggleFieldVisibility('phoneNo')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                      </div>
                    </div>
                  </div>
              
                  <div class=" mt-3">
                  <Field
                  
                    name="companyName"
                    type="text"
                    label={translatedMenuItems[6]}
                    isColumn
                    width={"100%"}
                    setClearbitData={props.setClearbitData}
                    component={ClearbitImage}
                    accounts={accounts}
                    inlineLabel
                  />
                                     <Switch
            checked={isFirstNameVisible}
            onChange={() => toggleFieldVisibility('name')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                  </div>
                  <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                  <Field
                    name="url"
                    type="text"
                    label={translatedMenuItems[7]}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                                     <Switch
            checked={isUrlVisible}
            onChange={() => toggleFieldVisibility('url')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                  </div>
                         
                 
                  <div class=" flex  justify-between mt-3">
                   <div class=" w-w47.5.5" style={{display:"flex",flexDirection:"column"}}>

<div style={{fontWeight:"bold",fontSize:"0.75rem"}}>{translatedMenuItems[8]}</div>

<Select
        showSearch
        //style={{ width: 200 }}
        placeholder="Search or select sector"
        optionFilterProp="children"
        loading={isLoadingSector}
        onFocus={handleSelectSectorFocus}
        onChange={handleSelectSector}
      >
        {sector.map(sectors => (
          <Option key={sectors.sectorId} value={sectors.sectorId}>
            {sectors.sectorName}
          </Option>
        ))}
      </Select>
      <Switch
            checked={isSectorVisible}
            onChange={() => toggleFieldVisibility('sector')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    
                    </div>
                    <div class=" w-w47.5.5"  style={{display:"flex",flexDirection:"column"}}>
                          
                          <div style={{fontWeight:"bold",fontSize:"0.75rem"}}>{translatedMenuItems[9]}</div>

<Select
        showSearch
       // style={{ width: 200 }}
        placeholder="Search or select source"
        optionFilterProp="children"
        loading={isLoading}
        onFocus={handleSelectFocus}
        onChange={handleSelectChange}
      >
        {source.map(sources => (
          <Option key={sources.sourceId} value={sources.sourceId}>
            {sources.name}
          </Option>
        ))}
      </Select>
      <Switch
            checked={isSourceVisible}
          onChange={() => toggleFieldVisibility('source')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                        </div>
                    </div>
                  
                    <div class=" flex justify-between mt-3 max-sm:flex-col">
                    <div class=" w-w47.5.5 max-sm:w-wk">
                    <div style={{fontWeight:"bold",fontSize:"0.75rem"}}>{translatedMenuItems[10]}</div>

<Select
        showSearch
       
        placeholder="Search or select LOB"
        optionFilterProp="children"
        loading={isLoadingLob}
        onFocus={handleSelectLobFocus}
        onChange={handleSelectLob}
      >
        {lob.map(item => (
          <Option key={item.name} value={item.lobDetsilsId}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Switch
            checked={isLobVisible}
            onChange={() => toggleFieldVisibility('lob')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    </div>
                    <div class=" w-w47.5.5 max-sm:w-wk">
                    <div class="flex">
                       <Tooltip title="Hot">
                         <Button
                           
                            shape="circle"
                           onClick={() => handleButtonClick("hot")}
                           style={{
                             backgroundColor:"red",
                                 borderRadius: "50%", 
                                 width: "31px", 
                                 height: "31px"
                           }}
                         >
                          {priority === "hot" && <CheckCircleOutlineIcon style={{ color: "white" }} />}
                          </Button>
                       </Tooltip>
                       &nbsp;
                       <Tooltip title="Warm">
                         <Button
                           
                            shape="circle"
             
                           onClick={() => handleButtonClick("warm")}
                           style={{
                             backgroundColor:"orange",
                                 borderRadius: "50%", 
                                 width: "31px", 
                                 height: "31px",
                           }}
                         >
                          {priority === "warm" && <CheckCircleOutlineIcon style={{ color: "white" }} />}
                          </Button>
                       </Tooltip>
                       &nbsp;
                       <Tooltip title="Cold">
                         <Button
                            shape="circle"
                           onClick={() => handleButtonClick("cold")}
                           style={{
                             backgroundColor:"teal",
                                 borderRadius: "50%", // Set the borderRadius to 50% for a circular shape
                                 width: "31px", // Adjust the width as needed
                                 height: "31px"
                           }}
                           >
                           {priority === "cold" && <CheckCircleOutlineIcon style={{ color: "white" }} />}
                           </Button>
                       </Tooltip>
                     </div>
                      </div>

                      <Switch
            checked={isTypeVisible}
            onChange={() => toggleFieldVisibility('type')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                  </div>
               
                 
                    <div class=" flex justify-between mt-3 max-sm:flex-col">
                    <div class=" w-w47.5.5 max-sm:w-wk">
                    <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                      <Field
                        name="vatNo"
                        type="text"
                        label={translatedMenuItems[11]}
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                                         <Switch
            checked={isVatVisible}
            onChange={() => toggleFieldVisibility('vat')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                      </div>
                    </div>
                    <div class="w-w47.5.5">
                    <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                      <Field
                        name="businessRegistration"
                        type="text"
                        // label="URL"
                        label={translatedMenuItems[12]}
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                                         <Switch
            checked={isRegistrationVisible}
            onChange={() => toggleFieldVisibility('business')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                      </div>
                    </div>
                  </div>
             

                 
                </div>
                <div class=" h-3/4 w-w47.5.5 max-sm:w-wk " 
                >
                   <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className=" font-semibold text-[0.75rem]">{translatedMenuItems[13]}</Listbox.Label>
          <div className="relative">
              <Listbox.Button  style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {props.crmAllData.map((item) => (
                    <Listbox.Option
                      key={item.employeeId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }`
                      }
                      value={item.empName}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {item.empName}
                            </span>
                          </div>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                active ? "text-white" : "text-indigo-600"
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
    <Switch
            checked={isAssignedVisible}
            onChange={() => toggleFieldVisibility('assigned')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
             
                
                  <div class=" mt-3">
                  <FieldArray
                    name="address"
                    label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                      translateText={props.translateText}
 selectedLanguage={props.selectedLanguage}
translatedMenuItems={props.translatedMenuItems}
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
                  </div>
                  {props.orgType==="Real Estate"&&(
                  <div class=" h-3/4  max-sm:w-wk "
                >
                  <div class=" flex  justify-between max-sm:mt-20">
                    <div class="w-[47.5%]">
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
                                         <Switch
            // checked={isFirstNameVisible}
            // onChange={() => toggleFieldVisibility('name')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                    </div>

                   
                    <div class="w-[47.5%]">
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
                                             <Switch
            // checked={isFirstNameVisible}
            // onChange={() => toggleFieldVisibility('name')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                        </div>
                     
                    
                  </div>
                 
                  <div class=" flex justify-between mt-3">         
                  <div class="  w-w47.5.5">
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
                                       <Switch
            // checked={isFirstNameVisible}
            // onChange={() => toggleFieldVisibility('name')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />
                  </div>
                
                  </div>
                           
                  <div class=" flex  justify-between mt-3">
                  
                  </div>
                  
                
                </div>
                )}
                <div class="mt-3">
                    <div class="font-bold text-xs font-poppins">{translatedMenuItems[14]}</div>
                    <div>
                  <div>
                    <span onClick={startListening}>
                      <Tooltip title="Start">
                        <span  >
                          <RadioButtonCheckedIcon className="!text-icon ml-1 text-red-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={stopListening}>
                      <Tooltip title="Stop">
                        <span >
                          <StopCircleIcon  className="!text-icon ml-1 text-green-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title="Clear">
                        <span>
                          <RotateRightIcon   className="!text-icon ml-1" />
                        </span>
                      </Tooltip>
                    </span>
                  </div>
                  <div>
                    {/* <textarea
                      name="description"
                      className="textarea"
                      type="text"
                      value={transcript ? transcript : text}
                      onChange={handletext}
                    ></textarea> */}

<textarea
        name="description"
        className="textarea"
        type="text"
        // value={text}
        // onChange={handleTextChange}
      ></textarea>
                         <Switch
          checked={isNotesVisible}
            onChange={() => toggleFieldVisibility('notes')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          />

                  </div>
                </div>
                  </div>
                </div>
              </div>
            
              <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
                <Button
               type="primary"
               htmlType="submit"
                   loading={props.addingCustomerConfig}
                >
                 
                            
                   Update 
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
}

const mapStateToProps = ({ auth, leads,lob,settings }) => ({
  addingLeads: leads.addingLeads,
  crmAllData:leads.crmAllData,
  addingLeadsError: leads.addingLeadsError,
   clearbit: leads.clearbit,
   orgType:auth.userDetails.orgType,
  user: auth.userDetails,
  lobListData: lob.lobListData,
  addingCustomerConfig:settings.addingCustomerConfig,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  fullName: auth.userDetails.fullName,
  customerConfigure:settings.customerConfigure,
  token: auth.token,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCustomerConfigure,
        addCustomerConfigure,
    //    addLeads,
       getCrm,
      setClearbitData,
      emptyClearbit

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsConfigureForm);
