import React, {  useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Select,Switch,Tooltip} from "antd";

import { Formik, Form, Field, FieldArray, FastField } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import ReactDescription from "../../../Components/ReactSpeech/ReactDescription";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import SpeechRecognition, { useSpeechRecognition,} from 'react-speech-recognition';
import {getSectors} from "../../Settings/Sectors/SectorsAction"
import {getSources} from "../../Settings/Category/Source/SourceAction"
import {getAllEmployeelist,getDialCode} from "../../Investor/InvestorAction"
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import {addPitch,setClearbitData} from "../PitchAction"
import PostImageUpld from "../../../Components/Forms/Formik/PostImageUpld";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import ProgressiveImage from "../../../Components/Utils/ProgressiveImage";
import ClearbitImage from "../../../Components/Forms/Autocomplete/ClearbitImage";
import { Listbox, } from '@headlessui/react'
import {getInvestorCurrency} from "../../Auth/AuthAction"
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import {base_url} from "../../../Config/Auth";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const CustomerSchema = Yup.object().shape({
  firstName: Yup.string().required("Input needed!"),
  email: Yup.string().required("Input needed!").email("Enter a valid Email"),
  //  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(8,"Minimum 8 digits").max(10,"Number is too long")
});
const { Option } = Select; 
function PitchForm (props) {
  
 const handleReset = (resetForm) => {
    resetForm();
  };
 
  useEffect(()=> {
props.getAllEmployeelist();
props.getSources(props.orgId);
props.getDialCode();
props.getInvestorCurrency();
// props.getSectors();
  },[]);

  const sourceOption = props.sources.map((item) => {
    return {
      label: item.name
      || null,
      value: item.sourceId
      ,
    };
  });
  const dialCodeOption = props.dialCodeList.map((item) => {
    return {
      label: `+${item.country_dial_code || ""}`,
      value: item.country_dial_code
      ,
    };
  });
  const sectorOption = props.sectors.map((item) => {
    return {
      label: item.sectorName
      || null,
      value: item.sectorId
      ,
    };
  });
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

   
    const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.allEmployeeList.find((item) => item.empName === selected);
    const [sector, setSector] = useState([]);
    const [source, setSource] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [touched, setTouched] = useState(false);
    const [selectedSource, setSelectedSource] = useState(null);
    const [selectedSector, setSelectedSector] = useState(null);
    const [isLoadingSector, setIsLoadingSector] = useState(false);
    const [touchedSector, setTouchedSector] = useState(false);
    const [contract, setContract] = useState(false);
    const [loading, setLoading] = useState(true);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

    const [priority,setpriority]=useState(props.selectedTask
      ? props.selectedTask.priority
      : "hot");

      useEffect(() => {
        const fetchMenuTranslations = async () => {
          try {
            const itemsToTranslate = [
             "295",//0 First Name
              "353",//1 Middle Name
              "354",//2 Last Name
              "140",//3 Email
              "357",//4 Dial Code
              "300",//5 Phone No
              "277",//6 Company
              "302",//7 Url
              "454",//8 Share Quantity
              "455",//9 Share Value
              "14",//10 Category
              "74",//11 Date
              "241",//12 Currency
              "76",//13 Assigned
              "185", // 14 "Address",
              "316",//15 Notes
               "104",//  16Create
            "194" ,//  "Clear"17
            "5" , //  "Stop"18
            "158" , //  "Start19
            "273" , //  "Cold"20
            "272" , //  "Warm"21
            "271" , //  "Hot"22
            "279" ,  //  Source23
            "1302" ,  //  Search or select source24
            "288" ,  //  Search or select sector25
            "278" , //  Sector26
            "460" , //  businessregistration27
            ];
    
            const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
            setTranslatedMenuItems(translations);
          } catch (error) {
            console.error('Error translating menu items:', error);
          }
        };
    
        fetchMenuTranslations();
      }, [props.selectedLanguage]);

      const handleIconClick = (type) => {
        setpriority(type);
      };

    const handleContract = (checked) => {
      setContract(checked);
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

    const handleSelectSector = (value) => {
      setSelectedSector(value)
      console.log('Selected user:', value);
    };
    const handleButtonClick = (type) => {
      setpriority(type);
      };

    const handleSelectSectorFocus = () => {
      if (!touchedSector) {
       
        fetchSector();
  
        setTouchedSector(true);
      }
    };

    const sortedCurrency =props.investorCurrencies.sort((a, b) => {
      const nameA = a.currency_name.toLowerCase();
      const nameB = b.currency_name.toLowerCase();
      // Compare department names
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    const currencyNameOption = sortedCurrency.map((item) => {
      return {
        label: `${item.currency_name}`,
        value: item.currency_id,
      };
    });

    const fetchSource = async () => {
      setIsLoading(true);
      try {
        const apiEndpoint =`${base_url}/source/${props.userId}`;
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
    const {
      startDate,
      endDate,
    } = props;
    const [text, setText] = useState("");
  function handletext(e) {
    setText(e.target.value);
  }
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            partnerName: "",
            companyName: "",
            url: "",
            sectorId: selectedSector,
            email: "",
            shareCurrency :"",
            phoneNumber: "",
            countryDialCode:user.countryDialCode || "",
            fullName:"",
            userId: props.userId,
            notes: "",
            unitOfShare:"",
            valueOfShare:"",
            type:priority,
            businessRegistration: "",
            assignedTo: selectedOption ? selectedOption.employeeId:userId,
            department: "",
            salutation:"",
            pvtAndIntunlInd: contract ? "true" : "false",
            firstName:"",
            middleName:"",
            lastName:"",
            proposalValue:"",
            opportunityName:"",
            firstMeetingDate: endDate || null,
            source:selectedSource,
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
          validationSchema={CustomerSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            let timeZoneFirst = "GMT+05:30";
            let mytimeZone = timeZoneFirst.substring(4, 10);
            var a = mytimeZone.split(":");
            var timeZoneminutes = +a[0] * 60 + +a[1];
            
            if (!values.firstMeetingDate) {
              values.firstMeetingDate = values.startDate;
            }
  
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
            let newEndDate = dayjs(values.firstMeetingDate).format("YYYY-MM-DD");
  
            let newStartTime = dayjs(values.startTime).format("HH:mm:ss.SSS[Z]");
            let firstStartHours = newStartTime.substring(0, 5);
            let timeEndPart = newStartTime.substring(5, 13);
            var firstStartTimeSplit = firstStartHours.split(":");
            var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1];
            var firstStartTimeminutes = minutes - timeZoneminutes;
            let h = Math.floor(firstStartTimeminutes / 60);
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;
            let newFormattedStartTime = `${finalStartTime}${timeEndPart}`;

            props.addPitch(
              {
                ...values,
                type:priority,
                assignedTo: selectedOption ? selectedOption.employeeId:userId,
                pvtAndIntunlInd: contract ? "true" : "false",
                sectorId: selectedSector,
                source:selectedSource,
                firstMeetingDate: `${newEndDate}T20:00:00Z`,
              },
              props.userId,
              () => handleReset(resetForm)
            );
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
            <div class="overflow-y-auto h-[34rem] md:overflow-x-hidden max-sm:h-[30rem]">
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
            <div class=" flex justify-around max-sm:flex-col">
                   
                <div class=" h-full w-w47.5.5 max-sm:w-wk"   >
                  <div class=" flex  flex-nowrap">
                    <div> <FastField name="imageId" component={PostImageUpld} /></div>
                   
                    <div>
                      <div class=" flex justify-between max-sm:flex-col">
                      
                            {/* name="salutation"
                            */}
                        <div class="text-xs font-bold font-poppins w-full max-sm:w-full">
                             {translatedMenuItems[0]}
                             <FastField
                            isRequired
                            name="firstName"                                               
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                      </div>                  
                      <div class=" flex justify-between  max-sm:flex-col">
                        <div class=" text-xs font-bold   w-2/5 max-sm:w-full"> 
                        {translatedMenuItems[1]}  
                          <FastField
                            name="middleName"                                    
                            type="text"
                            width={"100%"}
                            isColumn
                            component={InputComponent}
                            inlineLabel
                          />
                        </div>
                        <div class=" text-xs font-bold w-1/2 max-sm:w-full"> 
                      {translatedMenuItems[2]}            
                          <FastField
                            name="lastName"
                            // label="Last Name"                      
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
                  <div className="text-xs font-bold w-1/2 max-sm:w-full mt-1">
                  {translatedMenuItems[3]} </div>  
              <Field
                  isRequired
                    name="email"
                    type="text"             
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />                             
                <div class=" flex justify-between">
                    <div class="font-bold text-xs w-3/12 max-sm:w-[32%]">
                 {translatedMenuItems[4]}     
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
                    <div class=" w-8/12">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs ">   
                 {translatedMenuItems[5]}     
                    {/* //Phone Number           */}
                      <FastField
                        type="text"
                        name="phoneNumber"                                            
                        isColumn
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                      />
                      </div>
                    </div>
                  </div>
                 
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">   
                 {translatedMenuItems[6]}        
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
                 <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">  
               {translatedMenuItems[7]}     
                 {/* url  */}
                  <Field
                    name="url"
                    type="text"                
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </div>
                  <div class=" flex justify-between">
                  {contract ?
                    <div class=" w-w47.5.5">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                   <Field
                        name="vatNo"
                        type="text"
                        label="vatNumber"
                        
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
                    </div>
                    : ( null)}
                     {contract ?
                    <div class="w-w47.5.5">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                    {translatedMenuItems[27]}  
                                     <Field
                        name="businessRegistration"
                        type="text"
                        label="URL"
                       
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
                    </div>
                      : ( null)}
                  </div>

                  <div class=" flex justify-between mt-1">
                    <div class=" w-w47.5.5">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                   {translatedMenuItems[8]}  
                      <Field
                        name="unitOfShare"
                        type="text"
                        // label="Share Quantity"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
                    </div>
                    <div class="w-w47.5.5 mt-1">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                    {translatedMenuItems[9]} 
                      <Field
                        name="valueOfShare"
                        type="text"
                        // label="Share Value"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                      />
                      </div>
                    </div>
                  </div>


                  <div class=" flex justify-between">
                  {contract ?
                  <div class=" w-w47.5.5 flex flex-col" >           
                     <div class="font-bold text-xs">
                     {translatedMenuItems[26]}   {/* Sector */}
                      </div>
<Select
        showSearch
       
        placeholder= {translatedMenuItems[25]}  
        // "Search or select sector"
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
                    </div>
                     : ( null)}
                       {contract ?
                    <div class=" w-w47.5.5 flex flex-col" >                

                     <div class="font-bold text-xs"> 
                      {/* Source */} {translatedMenuItems[23]}  
                      </div>

<Select
        showSearch    
        placeholder= {translatedMenuItems[24]}  
        // "Search or select source"
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
                        </div>
: ( null)}                 
                    </div>
                    <div class=" flex items-center justify-between">
                    <div class=" flex flex-col   mt-2">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                  {translatedMenuItems[10]}   {/* Category */}
                      </div>
                    <Switch
                      style={{ width: "6.25em", marginLeft: "0.625em" }}
                      onChange={handleContract}
                      checked={contract}
                      checkedChildren="Institutional"
                      unCheckedChildren="Private"
                    />
                  </div>
                  <div class=" flex justify-between  w-3/5 max-sm:w-wk">                 
       <div className="flex">
      <Tooltip title= {translatedMenuItems[22]}  >
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
     
      <Tooltip title={translatedMenuItems[21]}>
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
  
      <Tooltip title={translatedMenuItems[20]}>
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
                      </div>
</div>
<div class=" flex items-center justify-between mt-1">
<div class=" text-xs font-bold w-w47.5.5 max-sm:w-wk">
{translatedMenuItems[11]}  
                    <Field
                      name="firstMeetingDate"
                      // label="Date"
                      component={DatePicker}
                      value={values.firstMeetingDate}
                      isColumn
                      inlineLabel
                    />
                  </div>

                  <div class="text-xs font-bold w-w47.5.5 max-sm:w-wk"> 
                {translatedMenuItems[12]}      
                    <Field
                      name="shareCurrency"
                      isColumnWithoutNoCreate
                      defaultValue={{
                        value: props.currency_id
                      }}                    
                      width="100%"
                      isColumn
                      // selectType="currencyName"
                      isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(currencyNameOption)
                          ? currencyNameOption
                          : []
                      }
                    />
                  </div>
  </div>
                </div>
                <div class=" text-xs font-bold h-3/4 w-w47.5.5 max-sm:w-wk "  
                >           {translatedMenuItems[13]}  
                {/* Assigned */}
                   <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>       
          <div className="relative ">
              <Listbox.Button style={{ boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em" }} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {props.allEmployeeList.map((item) => (
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
                 <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-1">
                 {translatedMenuItems[14]}                 
                  <FieldArray
                    name="address"
                    // label="Address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                  </div>
                  
                <div class="mt-3">   
                <ReactDescription
                setText={setText}
                text={text}
                />
                  {/* <div>          
                <span class=" font-bold text-xs font-poppins">{translatedMenuItems[15]} </span>  
                Notes
           
                  <span>
                    <span onClick={SpeechRecognition.startListening}>
                      <Tooltip title={translatedMenuItems[19]}>
                        <span  >
                          <RadioButtonCheckedIcon className="!text-icon ml-1 text-red-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={SpeechRecognition.stopListening}>
                      <Tooltip title={translatedMenuItems[18]}>
                        <span>
                          <StopCircleIcon className="!text-icon ml-1 text-green-600" />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title={translatedMenuItems[17]}>
                        <span >
                          <RotateRightIcon  className="!text-icon ml-1"/>
                        </span>
                      </Tooltip>
                    </span>
                  </span>
                  <div>
                    <textarea
                      name="description"
                      className="textarea"
                      type="text"
                      value={transcript ? transcript : text}
                      onChange={handletext}
                    ></textarea>
                  </div>
              
                </div> */}
                  </div>
                </div>
              </div>
         
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute mt-3 ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.addingPitch}
                >
                             <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[16]}</div>  
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

const mapStateToProps = ({ auth,investor,source,countrys,sector, leads,employee,pitch }) => ({
    addingPitch: pitch.addingPitch,
  addingLeadsError: leads.addingLeadsError,
   clearbit: pitch.clearbit,
  user: auth.userDetails,
  sources: source.sources,
  country: countrys.country,
  dialCodeList:investor.dialCodeList,
orgId:auth.userDetails.organizationId,
  allEmployeeList:investor.allEmployeeList,
  userId: auth.userDetails.userId,
  fullName: auth.userDetails.fullName,
  token: auth.token,
  organizationId: auth.userDetails.organizationId,
  sectors: sector.sectors,
  investorCurrencies: auth.investorCurrencies,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addPitch,
      setClearbitData,
      getAllEmployeelist,
      getSources,
      getDialCode,
      getSectors,
      getInvestorCurrency
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PitchForm);
