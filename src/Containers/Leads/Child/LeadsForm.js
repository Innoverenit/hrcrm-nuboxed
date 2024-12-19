import React, { useEffect,useState,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select, Tooltip } from "antd";
import { base_url } from "../../../Config/Auth";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import {
  addLeads, 
  setClearbitData,
  emptyClearbit,
  getCrm
} from "../../Leads/LeadsAction";
import {getCustomerConfigure} from "../../Settings/SettingsAction"
import ReactDescription from "../../../Components/ReactSpeech/ReactDescription"
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import ProgressiveImage from "../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import { Listbox, } from '@headlessui/react';
import { BundleLoader } from "../../../Components/Placeholder";
import SearchSelect1 from "../../../Components/Forms/Formik/SearchSelect1";
import { InputComponent1 } from "../../../Components/Forms/Formik/InputComponent1";
const { Option } = Select; 
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const LeadsSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  // phoneNumber:Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});

function LeadsForm (props) {
  
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
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '295', // 0
'296', // 1
'354', // 2
'140', // 3
'546', // 4
'300', // 5
'277', // 6
'302', // 7
'278', // 8
'279', // 9
'280', // 10
'306', // 11
'307', // 12
'76', // 13
'316', // 14
'104'


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

  const handleIconClick = (type) => {
    setpriority(type);
  };

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

  useEffect(() => {
   
    props.getCustomerConfigure(props.orgId,"add","leads")
    // setSource("")
    // props.getCurrency();
  }, []);

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

  //   const recognition = new window.webkitSpeechRecognition();
  //   recognition.continuous = true;
  //   recognition.interimResults = true;
  //   recognition.lang = 'en-US';

  //   recognition.onresult = (event) => {
  //     let finalTranscript = '';
  //     for (let i = event.resultIndex; i < event.results.length; ++i) {
  //       if (event.results[i].isFinal) {
  //         finalTranscript += event.results[i][0].transcript;
  //       }
  //     }
  //     setTranscript(finalTranscript);
  //   };

  //   recognition.onend = () => {
  //     setIsListening(false);
  //   };

  //   recognitionRef.current = recognition;

  //   return () => {
  //     recognition.stop();
  //   };
  // }, []);

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

  if (loading) {
    return <div><BundleLoader/></div>;
  }
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            partnerName: "",
            // price:"",
            source: selectedSource,
            leadType:"",
            url: "",
            sectorId: selectedSector,
            email: "",
            phoneNumber: "",
            fullName:"",
            userId: props.userId,
            notes: "",
            businessRegistration: "",
            assignedTo: selectedOption ? selectedOption.employeeId:userId,
            department: "",
            salutation:"",
            firstName:"",
            type:priority,
            middleName:"",
            lastName:"",
            proposalValue:"",
            opportunityName:"",
            countryDialCode:props.user.countryDialCode,
            // bedrooms:"",
        
            // propertyType:"",
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
          validationSchema={LeadsSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addLeads(
              {
                ...values,
                companyName: "",
                notes: text,
                assignedTo: selectedOption ? selectedOption.employeeId:userId,
                source: selectedSource,
                lobId:selectedLob,
                countryDialCode:values.countryDialCode,
                // price:values.price,
                type:priority,
                sectorId: selectedSector,
              },
              props.userId,
            );
            resetForm()
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
                {props.customerConfigure.imageUploadInd===true&&
                  <div class=" flex  flex-nowrap">
                    <div> <FastField name="imageId" component={PostImageUpld} /></div>
                   
                    <div>
                      <div class=" flex justify-between max-sm:flex-col ml-2">                        
                            {/* name="salutation" */}
                    
                        <div class=" w-wk max-sm:w-full  ">
                          <div className="font-bold text-xs">{translatedMenuItems[0]}</div>
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
                      <div class=" flex justify-between max-sm:flex-col ml-2 ">
                      {props.customerConfigure.middleNameInd===true&&
                        <div class=" w-2/5 max-sm:w-full">
                           <div className="font-bold text-xs">{translatedMenuItems[1]}</div>
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
}
{props.customerConfigure.lastNameInd===true&&
                        <div class=" w-1/2 max-sm:w-full">
                           <div className="font-bold text-xs">{translatedMenuItems[2]}</div>
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
}
                      </div>
                    </div>
                  </div>
} 
                    <div className="font-bold text-xs mt-1">{translatedMenuItems[3]}</div>
                  <Field
                    isRequired
                    name="email"
                    type="text"                   
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  /> 
  <div className="font-bold text-xs">{translatedMenuItems[5]}</div>
<div class=" flex justify-between shadow-[0_0.15em_0.3em_#aaa] border border-[#bfbebb] h-8">
                     <div class=" w-3/12 max-sm:w-[35%]">     
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        component={SearchSelect1}
                        defaultValue={{
                          label:`${props.user.countryDialCode}`,
                        }}
                        isColumnWithoutNoCreate                      
                        isColumn
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
                        name="phoneNumber"                      
                        isColumn
                        component={InputComponent1}
                        inlineLabel
                        width={"100%"}
                      />
                      </div>

                    </div>
                  
                  </div> 



                  {/* <div class=" flex justify-between">
                  {props.customerConfigure.dailCodeInd===true&&
                    <div class=" w-3/12 max-sm:w-[35%]">
                    <div className="font-bold text-xs">{translatedMenuItems[4]}</div>
                      <FastField
                        name="countryDialCode"
                        selectType="dialCode"
                        component={SearchSelect}
                        defaultValue={{
                          label:`${props.user.countryDialCode}`,
                        }}
                        isColumnWithoutNoCreate                      
                        isColumn
                        inlineLabel
                      />            
                    </div>
}
                    <div class=" w-8/12">
                    {props.customerConfigure.phoneNoInd===true&&
                    <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                       <div className="font-bold text-xs">{translatedMenuItems[5]}</div>
                      <FastField
                        type="text"
                        name="phoneNumber"                      
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                      </div>
}
                    </div>
                  
                  </div>  */}
                  <div class=" mt-3">
                  <Field
                  
                    name="leadType"
                    // type="text"
                    label="Lead Type"
                    isColumn
                    width={"100%"}
                    options={["BtoB","BtoC" ]}
                        component={SelectComponent}
                    inlineLabel
                  />
                  </div> 
                  {values.leadType === "BtoB" && (          
                  <div class=" mt-1">
                  <div className="font-bold text-xs">{translatedMenuItems[6]}</div>
                  <Field                  
                    name="companyName"
                    type="text"        
                    isColumn
                    width={"100%"}
                    setClearbitData={props.setClearbitData}
                    component={ClearbitImage}
                    accounts={accounts}
                    inlineLabel
                  />
                  </div>
                  )}
                   {values.leadType === "BtoB" && (
                  <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                  <div className="font-bold text-xs">{translatedMenuItems[7]}</div>
                  {props.customerConfigure.urlInd===true&&               
                  <Field
                    name="url"
                    type="text"              
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
}
                  </div>
                   )}
                                        
                  <div class=" flex  justify-between mt-3">
                   <div class="flex flex-col w-w47.5.5" >
                   {props.customerConfigure.sectorInd===true&&
                  <div className="font-bold text-xs">{translatedMenuItems[8]}</div>
}
{props.customerConfigure.sectorInd===true&&
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
}                 
                    </div>
                    <div class=" w-w47.5.5"  style={{display:"flex",flexDirection:"column"}}>
                    {props.customerConfigure.sourceInd===true&&
                         <div className="font-bold text-xs">{translatedMenuItems[9]}</div>
                    }
                          {props.customerConfigure.sourceInd===true&&
<Select
        showSearch
      
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
}
                        </div>
                    </div>
                  
                    <div class=" flex justify-between mt-3 max-sm:flex-col">
                    <div class=" w-w47.5.5 max-sm:w-wk">
                    {props.customerConfigure.lobInd===true&&
                  <div className="font-bold text-xs">{translatedMenuItems[10]}</div>
}
{props.customerConfigure.lobInd===true&&
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
}
                    </div>
                    <div class="flex items-center justify-center w-w47.5.5 max-sm:w-wk">
                    {props.customerConfigure.typeInd===true&&
                    <div class="flex">
                       <Tooltip title="Hot">
                       <i
          className={`fas fa-mug-hot${priority === "hot" ? " selected" : ""}`}
          onClick={() => handleIconClick("hot")}
          style={{
            color: priority === "hot" ? "red" : "red",
            borderRadius: "50%",
            fontSize: "1rem",
            height:"1.5rem",
            padding: "5px",
            cursor: "pointer"
          }}
        ></i>
                       </Tooltip>
                       &nbsp;
                       <Tooltip title="Warm">
                       <i
          className={`fas fa-burn${priority === "warm" ? " selected" : ""}`}
          onClick={() => handleIconClick("warm")}
          style={{
            color: priority === "warm" ? "white" : "orange",
            backgroundColor: priority === "warm" ? "orange" : "transparent",
            borderRadius: "50%",
            fontSize: "1rem",
            height:"1.5rem",
            padding: "5px",
            cursor: "pointer"
          }}
        ></i>
                       </Tooltip>
                       &nbsp;
                       <Tooltip title="Cold">
                       <i
          className={`far fa-snowflake${priority === "cold" ? " selected" : ""}`}
          onClick={() => handleIconClick("cold")}
          style={{
            color: priority === "cold" ? "white" : "teal",
            backgroundColor: priority === "cold" ? "teal" : "transparent",
            borderRadius: "50%",
            fontSize: "1rem",
            height:"1.5rem",
            padding: "5px",
            cursor: "pointer"
          }}
         
        ></i>
                       </Tooltip>
                     </div>
}
                      </div>
                  </div>                            
                    <div class=" flex justify-between mt-3 max-sm:flex-col">
                    {values.leadType === "BtoB" && (
                    <div class=" w-w47.5.5 max-sm:w-wk">
                    {props.customerConfigure.vatNoInd===true&&
                    <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                      <div className="font-bold text-xs">{translatedMenuItems[11]}</div>
                      <Field
                        name="vatNo"
                        type="text"                 
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
}
                    </div>
                    )}
                     {values.leadType === "BtoB" && (
                    <div class="w-w47.5.5">
                    {props.customerConfigure.businessRegInd===true&&
                    <div class="m-[0.1rem_0_0.02rem_0.2rem] text-xs flex flex-col font-bold ">
                      <div className="font-bold text-xs">{translatedMenuItems[12]}</div>
                      <Field
                        name="businessRegistration"
                        type="text"
                        // label="URL"            
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
}
                    </div>
                     )}
                  </div>               
                </div>
                <div class=" h-3/4 w-w47.5.5 max-sm:w-wk " 
                >
                    {props.customerConfigure.assignedToInd===true&&
                   <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className=" font-bold text-xs">{translatedMenuItems[13]}</div>
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
}
             
                
                  <div class=" mt-3">
                  {props.customerConfigure.addressInd===true&&
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
}
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
                    </div>                
                    <div class="w-[47.5%]">
                    <FastField
                            name="price"
                            label="Price"                       
                            //selectType="sourceName"
                            options={["0-100000", "100001-300000", "300001-500000","500000+"]}
                            component={SelectComponent}                           
                           // value={values.source}
                            isColumn
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
                  </div>              
                  </div>
                                                                        
                  <div class=" flex  justify-between mt-3">
                  {/* city */}
                  </div>             
                </div>
                )}
                 {props.customerConfigure.noteInd===true&&
              <div class="mt-3">
                {/* <div>
                  
                    <span class=" font-bold text-xs font-poppins">{translatedMenuItems[14]}</span>
                  <span>
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
                  </span>

                  <div>                  
        <textarea
        name="description"
        className="textarea"
        type="text"
        value={text}
        onChange={handleTextChange}
      ></textarea>

                  </div>
                  </div> */}
            <ReactDescription
                setText={setText}
                text={text}
                />
                  </div>
}
                </div>
              </div>
              
            
              <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
                <Button
               type="primary"
               htmlType="submit"
                  loading={addingLeads}
                >
                       <div class=" font-bold text-xs font-poppins">{translatedMenuItems[15]}</div>
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

const mapStateToProps = ({ auth, leads,settings,lob }) => ({
  addingLeads: leads.addingLeads,
  crmAllData:leads.crmAllData,
  addingLeadsError: leads.addingLeadsError,
   clearbit: leads.clearbit,
   orgType:auth.userDetails.orgType,
  user: auth.userDetails,
  lobListData: lob.lobListData,
  organizationId: auth.userDetails.organizationId,
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  fullName: auth.userDetails.fullName,
  token: auth.token,
  customerConfigure:settings.customerConfigure,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       addLeads,
       getCrm,
      setClearbitData,
      emptyClearbit,
      getCustomerConfigure,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsForm);
