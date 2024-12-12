import React, { useState ,useEffect} from "react";
import { connect } from "react-redux";
import { base_url } from "../../../Config/Auth";
import { bindActionCreators } from "redux";
import { getAllSalesList } from "../../Opportunity/OpportunityAction"
import InputIcon from '@mui/icons-material/Input';
import LogoutIcon from '@mui/icons-material/Logout';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { Button,  Switch, Tooltip,Select } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import ReactDescription from "../../../Components/ReactSpeech/ReactDescription"
import{getAllOpportunityData} from "../../Opportunity/OpportunityAction"
import { handleCallNotesModal } from "../CallAction";
import { getFilteredEmailContact } from "../../Candidate/CandidateAction";
import dayjs from "dayjs";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../Components/Forms/Formik/TimePicker";
import {
  addCall,
  updateCall,
  deleteCall,
  handleCallModal,
} from "../CallAction";
import {getAllCustomerData} from "../../Customer/CustomerAction"
import { handleChooserModal } from "../../Planner/PlannerAction";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { getAssignedToList } from "../../Employees/EmployeeAction";
import { setClearbitCandidateData } from "../../Candidate/CandidateAction";
import SpeechRecognition, { useSpeechRecognition,} from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import { Listbox } from '@headlessui/react'
const { Option } = Select;  
const ButtonGroup = Button.Group;

const suffix = (
  <MicIcon className=" !text-icon  text-[#1890ff]"
    onClick={SpeechRecognition.startListening}
   
  />
);
const green = "#39D1B4";
const yellow = "#FFD712";
// yup validation scheme for creating a call
const CallSchema = Yup.object().shape({
  callType: Yup.string().required("Select call type"),
  callCategory: Yup.string().required("Input required !"),
  callPurpose: Yup.string().required("Input required !"),

  startDate: Yup.string()
    .nullable()
    .required("Input required !"),

  startTime: Yup.string()
    .nullable()
    .required("Input required !"),
  endTime: Yup.string()
    .nullable()
    .required("Input required !"),

});
function CallForm(props) {


  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const[category,setCategory] =useState(props.selectedCall ? props.selectedCall.callCategory : "New")
  const[reminder,setReminder] =useState(true);
  const [places, setPlaces] = useState(Array.from({ length: 1 }, (_, placeIndex) => ({
    startTime:"",
    timeTo:"",
  })));
  console.log("category",category);
  const[Type,setType]=useState(props.selectedCall?props.selectedCall.callType:"Inbound",)

  function handleCategoryChange (data)  {
    debugger;

    setCategory(  data );
  };
 function handleTypeChange  (data) {
    debugger;
    setType( data );

  };
  function handleReminderChange (checked) {
    setReminder(
       checked,
    );
  };
  function handleCallback (resetForm)  {
    const { handleChooserModal, handleCallModal, callback } = props;
    handleChooserModal(false);
    handleCallModal(false);
    callback && callback();
    // resetForm();
  
  };
  useEffect(() => {
    props.getAssignedToList();
    props.getAllSalesList();
  }, []);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
       "71", //  "Type",//0
         "14", // "Category",//1
        "26" , // "Mode",//2
        "90" , // "Channel",//3
        "72" , // "Subject",//4
        "74" , // "Date",//5
        "93" , // "Start Time",//6
         "94" ,// "End Time",//7
        "95" , // "Time Zone",//8
        "76",  // "Assigned",//9
        "75",  // "Include",//10
        "97",  // "Prospect",//11
         "73", // "Contact",//12
       "99" ,  // "Opportunity",//13
        "316"  ,// "Notes"//14
        "104" //Create
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  
  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);

    const {
      handleCallNotesModal

    } = props;

    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }

    const customerNameOption = props.allCustomerData
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
    })
    .map((item) => {
      return {
        label: `${item.name || ""}`,
        value: item.customerId,
      };
    });
 

    const handleChange = (value, placeIndex) => {
      console.log(value)
      console.log(placeIndex+1)
      const updatedPlaces = [...places];
      updatedPlaces[placeIndex] = {
        address1: value,
        country: '',
        state: '',
        city:"",
        pinCode:"",
        street:"",
        sequenceNo:placeIndex+1,
        // latLng: null,
        latitude: 0, 
        longitude: 0, 
        numberOfCars: updatedPlaces[placeIndex].numberOfCars,
        carList: updatedPlaces[placeIndex].carList,
        loadingDate: updatedPlaces[placeIndex].loadingDate,
        // loadingHours: updatedPlaces[placeIndex].loadingHours,
        startTime:updatedPlaces[placeIndex].startTime,
        timeTo:updatedPlaces[placeIndex].timeTo
      };
      setPlaces(updatedPlaces);
    };

    const handleStartTimeChange = (event, placeIndex) => {
      const updatedPlaces = [...places];
      updatedPlaces[placeIndex].startTime = event.target.value;
      setPlaces(updatedPlaces);
    };
    // console.log(this.state.category);
    const {
      user: { userId, firstName,empName, middleName, fullName, lastName, timeZone },
      isEditing,
      prefillCall,
      addingCall,
      deleteCall,
      deletingCall,
      addCall,
      startDate,
      endDate,
      startTime,
      endTime,
      defaultContacts,
      ownerId,
      employeeId,
      contactId,
      defaultAccounts,
      updateCall,
      updatingCall,
      defaultOpportunities,
    } = props;
    console.log(defaultAccounts);
    console.log(defaultContacts);
    if (props.selectedCall) {
      var data = props.selectedCall.callCategory === "New" ? false : true;
    }
   const selectedOption = props.assignedToList.find((item) => item.empName === selected);
   const [customer, setCustomer] = useState([]);
   const [selectedCustomer, setSelectedCustomer] = useState(null);
   const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
   const [touchedCustomer, setTouchedCustomer] = useState(false);

   const [contact, setContact] = useState([]);
   const [selectedContact, setSelectedContact] = useState(null);
   const [isLoadingContact, setIsLoadingContact] = useState(false);
   const [touchedContact, setTouchedContact] = useState(false);


   const [opportunity, setOpportunity] = useState([]);
   const [selectedOpportunity, setSelectedOpportunity] = useState(null);
   const [isLoadingOpportunity, setIsLoadingOpportunity] = useState(false);
   const [touchedOpportunity, setTouchedOpportunity] = useState(false);


   const fetchCustomer = async () => {
    setIsLoadingCustomer(true);
    try {
      const apiEndpoint = `
    ${base_url}/customer/drop/customer-list/${props.userId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingCustomer(false);
    }
  };

  const handleSelectChangeCustomer = (customerId) => {
    setSelectedCustomer(customerId)
    fetchContact(customerId);
    fetchOpportunity(customerId)
    // console.log('Selected user:', value);
  };

  const handleSelectCustomerFocus = () => {
    if (!touchedCustomer) {
     
      fetchCustomer();

      setTouchedCustomer(true);
    }
  };



  const fetchContact = async (customerId) => {
    setIsLoadingContact(true);
    try {
      const apiEndpoint = `
     ${base_url}/customer/contact/drop/${customerId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setContact(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingContact(false);
    }
  };


  const handleSelectChangeContact = (value) => {
    setSelectedContact(value)
    console.log('Selected user:', value);
  };

  const handleSelectContactFocus = () => {
    if (!touchedContact) {
     
      //fetchContact();

      setTouchedContact(true);
    }
  };



  const fetchOpportunity = async (customerId) => {
    setIsLoadingOpportunity(true);
    try {
      const apiEndpoint = `
      
     ${base_url}/opportunity/drop-opportunityList/customer/${customerId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setOpportunity(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingOpportunity(false);
    }
  };


  const handleSelectChangeOpportunity = (value) => {
    setSelectedOpportunity(value)
    console.log('Selected user:', value);
  };

  const handleSelectOpportunityFocus = () => {
    if (!touchedOpportunity) {
     
      //fetchOpportunity();

      setTouchedOpportunity(true);
    }
  };

  const [include, setInclude] = useState([]);
  const [isLoadingInclude, setIsLoadingInclude] = useState(false);
  const [touchedInclude, setTouchedInclude] = useState(false);
  const [selectedIncludeValues, setSelectedIncludeValues] = useState([]);



  const fetchInclude = async () => {
    setIsLoadingInclude(true);
    try {
      const apiEndpoint = `${base_url}/employee/active/user/drop-down/${props.orgId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setInclude(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingInclude(false);
    }
  };


  const handleSelectChangeInclude = (values) => {
    setSelectedIncludeValues(values); // Update selected values
  };


  const handleSelectIncludeFocus = () => {
    if (!touchedInclude) {
      fetchInclude();
      setTouchedInclude(true);
    }
  };
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
          initialValues={
            isEditing
              ? prefillCall
              : {
                callType: Type,
                callCategory:category,

                callPurpose: "",
                // customerId:selectedCustomer,
                fullName: "",
                timeZone: timeZone,
                remindInd: reminder ? true : false,
                remindTime: "",
                candidate: "",
                complitionInd: "Incomplete",
                startDate: startDate || dayjs(),
                startTime: startDate || null,
                endDate: endDate || null,
                endTime: endDate || null,

                callResult: "",
                callDescription: "",

                included: [],
                assignedTo: selectedOption ? selectedOption.employeeId:userId,
              
                candidateId: "",
              }
             
          }
          validationSchema={CallSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            let timeZoneFirst = values.timeZone;
            console.log(timeZone);

            let mytimeZone = timeZoneFirst.substring(4, 10);
            console.log(mytimeZone);

            var a = mytimeZone.split(":");
            console.log(a);
            var timeZoneminutes = +a[0] * 60 + +a[1];
            console.log(timeZoneminutes);
            if (!values.endDate) {
              values.endDate = values.startDate;
            }
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
            console.log(newStartDate);
            //Time calculation
            let firstStartTime = dayjs(values.startTime).format(
              "HH:mm:ss.SSS[Z]"
            ); // getting start time from form input
            console.log(firstStartTime);

            let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
            console.log(firstStartHours);

            let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
            console.log(timeEndPart);

            var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
            console.log(firstStartTimeSplit);

            var minutes =
              +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
            console.log(minutes);

            var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
            console.log(firstStartTimeminutes);

            let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;
            console.log(finalStartTime);

            let newStartTime = `${finalStartTime}${timeEndPart}`;
            console.log(newStartTime);

            let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
            let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
            console.log(firstEndTime);
            let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
            console.log(firstEndHours);

            var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
            console.log(firstEndTimeSplit);
            var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
            console.log(endMinutes);
            var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
            console.log(firstEndTimeminutes);
            let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
            console.log(hr);
            let mi = firstEndTimeminutes % 60;
            console.log(hr);
            hr = hr < 10 ? "0" + hr : hr;
            mi = mi < 10 ? "0" + mi : mi;
            let finalEndTime = `${hr}:${mi}`;
            console.log(finalEndTime);
            console.log(timeEndPart);
            console.log(`${finalEndTime}${timeEndPart}`);

            let newEndTime = `${finalEndTime}${timeEndPart}`;
            let testVal = {
              ...values,
              callCategory: category,
              callType: Type,
              included:selectedIncludeValues,
              // startDate: `${newStartDate}T${newStartTime}`,
              // endDate: `${newEndDate}T${newEndTime}`,
              startDate: `${newStartDate}T20:00:00Z`,
              endDate: `${newEndDate}T20:00:00Z`,
              contactId: selectedContact,
              opportunityId:selectedOpportunity,
              customerId: selectedCustomer,
              // startTime: values.startTime?values.startTime:null,
              startTime: 0,
              endTime: 0,
              assignedTo: selectedOption ? selectedOption.employeeId:userId,
            };
            isEditing
              ? updateCall(
                prefillCall.callId,
                {
                  ...values,
                  callCategory: category,
                  callType: Type,
              
                  customerId:selectedCustomer,
                  contactId: selectedContact,
                  opportunityId:selectedOpportunity,
                  startTime: values.startTime?values.startTime:null,
                  startDate: `${newStartDate}T20:00:00Z`,
                  endDate: `${newEndDate}T20:00:00Z`,
                  // startTime: 0,
                  endTime: 0,
                  assignedTo: selectedOption ? selectedOption.employeeId:userId,
                },
                () => handleCallback(resetForm)
              )
              : addCall(testVal,
                () => handleCallback(resetForm));
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
            <div class="overflow-y-auto h-[36rem] overflow-x-hidden max-sm:h-[30rem]" style={{scrollbarWidth:"thin"}}>
            <Form className="form-background ">
              <div class=" flex justify-around max-sm:flex-col">
              <div class=" h-full w-w47 max-sm:w-wk"   >
              <div class=" flex justify-between w-full max-sm:flex-col">
                    <div class=" w-2/6  max-sm:w-wk ">
                     
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs ">
                        {/* Type */}
                        {translatedMenuItems[0]}                 
                      </div>
                      <div class=" flex justify-between">
                        {/* <Tooltip title="Inbound"> */}
                        <Tooltip
                          title="introductory"
                        >
                          <div
                            onClick={() => handleTypeChange("Inbound")}
                            className=" text-[1.375em] cursor-pointer"
                            style={{
                              color:
                              Type  === "Inbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <InputIcon className=" !text-icon "/>
                          </div>
                        </Tooltip>
                        {/* <Tooltip title="Outbound"> */}
                        <Tooltip
                          title="Interview"
                            
                        >
                          <div
                            onClick={() => handleTypeChange("Outbound")}
                            className=" text-[1.375em] cursor-pointer"
                            style={{                   
                              color:
                              Type === "Outbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                               <LogoutIcon className=" !text-icon "/>
                          </div>
                        </Tooltip>
                        {/* <Tooltip title="Conference"> */}
                        <Tooltip
                          title="Closure"
                           
                        >
                          <div
                            onClick={() => handleTypeChange("Conference")}
                            className=" text-[1.375em] cursor-pointer"
                            style={{                              
                              color:
                              Type === "Conference"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                              <Diversity3Icon className=" !text-icon "/>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                    <div class=" w-1/2 mt-3">
                      
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs ">
                    {translatedMenuItems[1]} 
                      </div>
                      
                      <ButtonGroup>
                        <Button
                          onClick={() => handleCategoryChange("New")}
                          style={{
                            backgroundColor:
                            category === "New"
                                ? "orange"
                                : "white",
                            color:
                            category === "New" ? "white" : "black",
                          }}
                        >
                          New
                        
                        </Button>
                        <Button
                          onClick={() => handleCategoryChange("Follow up")}
                          style={{
                            backgroundColor:
                            category === "Follow up"
                                ? "orange"
                                : "white",
                            color:
                            category === "Follow up"
                                ? "white"
                                : "black",
                          }}
                        >
                          Follow up
                          
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                  
                  <div class=" flex mt-3 justify-between items-end max-sm:flex-col " >
                    <div class=" self-start">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs ">
                    {translatedMenuItems[2]}   {/* mode"
                          /> */}
                      </div>
                      <Switch
                       
                        name="mode"
                        checkedChildren="Video"
                        unCheckedChildren="Audio"
                      />
                    </div>
                    <div class=" w-1/3 self-baseline max-sm:w-wk">
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[3]}</div>
                    {/* Channel */}
                      <FastField
                        name="modeType"
                        isColumn
                        options={[
                          "Phone",
                          "Zoom ",
                          "Whatsapp ",
                          "Google Meet",
                          "Teams",
                          "Others",
                        ]}
                        component={SelectComponent}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/5 mt-[0.9rem] max-sm:w-wk">
        
                      <FastField
                        type="text"
                        name="modeLink"
                        placeholder="Link"
                        label=""
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        style={{ flexBasis: "30%" }}
                        isColumn
                      />
                    </div>
                  </div>
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[4]}</div>
                  <Field
                    // isRequired
                    name="callPurpose"
                    // label="Topic"            
                    component={InputComponent}
                    isColumn
                    width={"100%"}
                    inlineLabel
                  />
           <div class="mt-3">
          <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[5]}</div>
                  <Field
                    name="startDate"
                    // label="Date"                
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    value={values.startDate}
                    inlineLabel
                  />
                  </div>
                  <div class=" flex mt-3 justify-between max-sm:flex-col">
                    <div class=" w-5/12 max-sm:w-wk">
                    {/* start
      /> */}        <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[6]}</div>   
                    <Field
                        name="startTime"
                        // label="Start Time"
                       
                        component={TimePicker}
                        isRequired
                        isColumn
                        use12Hours
                        value={values.startTime}
                        inlineLabel
                       
                      />
                    </div>
                    <div class=" w-5/12 max-sm:w-wk">
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[7]}</div>
                      <Field
                        name="endTime"
                        // label="End Time"                 
                        component={TimePicker}
                        use12Hours
                        isRequired
                        isColumn
                        value={values.endTime}
                        // inlineLabel
                       
                      />
                    </div>
                  </div>
                  <div class="mt-3">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[8]}</div>
                  <Field
                    isRequired
                    defaultValue={{ label: timeZone, value: userId }}
                    name="timeZone"
                    isColumnWithoutNoCreate
                    //label="TimeZone "         
                    selectType="timeZone"
                    isColumn
                    value={values.timeZone}
                    component={SearchSelect}
                    inlineLabel
                  />
                  </div>
                             
                </div>
                <div class=" mt-3 h-3/4 w-w47 max-sm:w-wk " 
                >   <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[9]}</div>
                <Listbox value={selected} onChange={handleSelectChangeInclude} className=" h-[1.88rem]" style={{ height:"1.88rem"}}>
      {({ open }) => (
        <>
                  
        
          <div className="relative mt-1 h-[1.88rem]">
              <Listbox.Button  style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="  relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5  pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {props.assignedToList.map((includes) => (
                    <Listbox.Option
                      key={includes.employeeId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }`
                      }
                      value={includes.employeeId}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {includes.fullName}
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
    <div class="mt-3">
    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[10]}</div>           
                   <Select
          showSearch
          className=" mt-1"
          placeholder="Search or select"
          optionFilterProp="children"
          loading={isLoadingInclude}
          onFocus={handleSelectIncludeFocus}
          onChange={handleSelectChangeInclude}
          defaultValue={selectedIncludeValues} 
          mode="multiple" 
        >
          {include.map(includes => (
            <Option key={includes.employeeId} value={includes.employeeId}>
              {includes.empName}
            </Option>
          ))}
        </Select>
                 </div>
                 <div class="mt-3 flex flex-col"  >
                 <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[11]}</div>
                  {props.user.crmInd === true &&(
              
     <>        
<Select
        showSearch 
        placeholder="Search or select"
        optionFilterProp="children"
        loading={isLoadingCustomer}
        onFocus={handleSelectCustomerFocus}
        onChange={handleSelectChangeCustomer}
      >
        {customer.map(customers => (
          <Option key={customers.customerId} value={customers.customerId}>
            {customers.name}
          </Option>
        ))}
      </Select>
      </> 
                  )} 
                  </div>
                  
                  <div class="mt-3" >
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[12]}</div>
                  {props.user.crmInd === true &&(
                  
                  <>

<Select
        showSearch
        placeholder="Search or select contact"
        optionFilterProp="children"
        loading={isLoadingContact}
        onFocus={handleSelectContactFocus}
        onChange={handleSelectChangeContact}
        disabled={!selectedCustomer} 
      >
        {contact.map(contacts => (
          <Option key={contacts.contactId} value={contacts.contactId}>
            {contacts.fullName}
          </Option>
        ))}
      </Select>
      </>
                  )} 
                  </div>
              
                  <div class="mt-3">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[13]}</div>
                  {props.user.crmInd === true &&(       
              <>
              <Select
        showSearch
        placeholder="Search or select opportunity"
        optionFilterProp="children"
        loading={isLoadingOpportunity}
        disabled={!selectedCustomer}
        onFocus={handleSelectOpportunityFocus}
        onChange={handleSelectChangeOpportunity}
      >
        {opportunity.map(opp => (
          <Option key={opp.opportunityId} value={opp.opportunityId}>
            {opp.opportunityName}
          </Option>
        ))}
      </Select>
      </>
                  )} 
                  </div>               
                <div class="mt-3">
                <ReactDescription
                setText={setText}
                text={text}
                />          
                </div>
              </div>              
              </div>
              <div class=" flex mt-1 justify-end">
                {isEditing && (
                  <>
                    <StyledPopconfirm
                      title="Do you want to delete?"                  
                      onConfirm={() => deleteCall(prefillCall.callId)}
                    >
                      <Button
                        type="danger"
                        htmlType="submit"
                        Loading={deletingCall}
                      >
                        Delete                       
                      </Button>
                    </StyledPopconfirm>
                  </>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={isEditing ? updatingCall : addingCall}
                >
                  {isEditing ? (
                    "Update"
                  ) : (
                    // "Create"
                  <div className="font-bold font-poppins text-xs">{translatedMenuItems[15]}</div>
                  )}
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }

const mapStateToProps = ({ auth, call, employee,customer, opportunity, candidate }) => ({
  addingCall: call.addingCall,
  allCustomerData:customer.allCustomerData,
  userId: auth.userDetails.userId,
  allOpportunityData:opportunity.allOpportunityData,
  orgId: auth.userDetails.organizationId,
  user: auth.userDetails,
  updatingCall: call.updatingCall,
  user: auth.userDetails,
  token: auth.token,
  assignedToList:employee.assignedToList,
  deletingCall: call.deleteCall,
  sales: opportunity.sales,
  employees: employee.employees,
  filteredContact: candidate.filteredContact,
  addNotesSpeechModal: call.addNotesSpeechModal,
  fullName: auth.userDetails.fullName
  // candidateByuserId:candidate.candidateByuserId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCall,
      getAllCustomerData,
      handleChooserModal,
      getAllSalesList,
      updateCall,
      handleCallModal,
      deleteCall,
      getAssignedToList,
      getAllOpportunityData,
      getFilteredEmailContact,
      setClearbitCandidateData, 
      handleCallNotesModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CallForm);