import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";
import { bindActionCreators } from "redux";
import {Button ,Radio,Select} from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {getAllCustomerData} from "../../Customer/CustomerAction"
import { getFilteredEmailContact } from "../../Candidate/CandidateAction";
import dayjs from "dayjs";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../Components/Forms/Formik/TimePicker";
import ReactDescription from "../../../Components/ReactSpeech/ReactDescription"
import {
  addEvent,
  deleteEvent,
  updateEvent,
  handleEventModal,
} from "../EventAction";
import{getAllOpportunityData} from "../../Opportunity/OpportunityAction"
import { handleChooserModal } from "../../Planner/PlannerAction";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import { getAssignedToList } from "../../Employees/EmployeeAction";
import { setClearbitCandidateData } from "../../Candidate/CandidateAction";
import SpeechRecognition, { useSpeechRecognition,} from 'react-speech-recognition';
import { Listbox } from '@headlessui/react';
import {base_url} from "../../../Config/Auth";

const { Option } = Select; 
// yup validation scheme for creating a opportunity
const EventSchema = Yup.object().shape({
  eventTypeId: Yup.string().required("Select event type"),
  eventSubject: Yup.string().required("Input required!"),
  timeZone: Yup.string().required("Input required!"),
  // endDate: Yup.string()
  //   .nullable()
  //   .required("Input required !"),
  startTime: Yup.string().nullable().required("Input required!"),
  endTime: Yup.string().nullable().required("Input required!"),
  startDate: Yup.string().nullable().required("Input required!"),
});

function EventForm (props) {

      const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
      const [reminder,setRemider] = useState(true);
      const [defaultOption, setDefaultOption] = useState(props.fullName);
      const [selected, setSelected] = useState(defaultOption);



      const [isLoadingContacts, setIsLoadingContacts] = useState(false);
      const [contacts, setContacts] = useState([]);

    

 function handleCallback  () {
    const { handleChooserModal, handleEventModal, callback }= props;
    handleChooserModal(false);
    handleEventModal(false);
    callback && callback();
  };
 const handleReminderChange = (checked) => {
  setRemider(checked);
  };
  useEffect(()=> {
    // props.getAssignedToList(props.orgId);
  //  props.getAllCustomerData(userId)
  //  props.getAllOpportunityData(userId)
  //  props.getFilteredEmailContact(userId);
  },[])
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
        "71",//  "Type",//0
       "72", //  "Subject",//1
       "176", //  "Start Date",//2
       "93", //  "Start Time",//3
        "126" , // "End Date",//4
         "94", // "End Time",//5
        "95",  // " Time Zone",//6
        "97" , // "Prospect",//7
          "73",// "Contact",//8
         "99", // "Opportunity",//9
         "76", // "Assigned",//10
          "75",// "Include",//11
      "185", //"Address",//12
          // "Street",//13
          // "Zip Code",//14
          // "City", //15
          //  "State",//16
          //  "Country",///17
         "316" //  "Notes"//18
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  
  const sortedEmployee =props.assignedToList.sort((a, b) => {
    const nameA = a.empName.toLowerCase();
    const nameB = b.empName.toLowerCase();
    // Compare department names
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  
    const employeesData =sortedEmployee.map((item) => {
      return {
        label: `${item.empName}`,
        // label: `${item.salutation || ""} ${item.firstName ||
        //   ""} ${item.middleName || ""} ${item.lastName || ""}`,
        value: item.employeeId,
      };
    });

    const filteredEmployeesData = employeesData.filter(
      (item) => item.value !== props.user.userId
    );
    const sortedOpportunity =props.allOpportunityData.sort((a, b) => {
      const nameA = a.opportunityName.toLowerCase();
      const nameB = b.opportunityName.toLowerCase();
      // Compare department names
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    const opportunityNameOption = sortedOpportunity.map((item) => {
      return {
        label: `${item.opportunityName}`,
        value: item.opportunityId,
      };
    });

    const sortedContact =props.filteredContact.sort((a, b) => {
      const nameA = a.fullName.toLowerCase();
      const nameB = b.fullName.toLowerCase();
      // Compare department names
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    const ContactData = sortedContact.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.contactId,
      };
    });
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
   const [selectedValue, setSelectedValue] = useState('Prospect');
   const [include, setInclude] = useState([]);
  const [isLoadingInclude, setIsLoadingInclude] = useState(false);
  const [touchedInclude, setTouchedInclude] = useState(false);
  const [selectedIncludeValues, setSelectedIncludeValues] = useState([]);
  const [investor, setInvestor] = useState([]);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [isLoadingInvestor, setIsLoadingInvestor] = useState(false);
  const [touchedInvestor, setTouchedInvestor] = useState(false);
  const [investorContact, setInvestorContact] = useState([]);
  const [selectedContactInvestor, setSelectedContactInvestor] = useState(null);
  const [isLoadingContactInvestor, setIsLoadingCOntactInvestor] = useState(false);
  const [deal, setDeal] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isLoadingDeal, setIsLoadingDeal] = useState(false);
  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSelectChangeInvestorContact = (value) => {
    setSelectedContactInvestor(value)
  };
 const handleSelectInvestorFocus = () => {
    if (!touchedInvestor) {
     
    fetchInvestor();

      setTouchedInvestor(true);
    }
  };

  const fetchInvestor = async () => {
    setIsLoadingInvestor(true);
    try {
      const apiEndpoint = `
     ${base_url}/investor/user/${props.userId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setInvestor(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingInvestor(false);
    }
  };


  const handleSelectChangeInvestor = (value) => {
    setSelectedInvestor(value)
    fetchContactInvestor(value);
    fetchDeal(value)
  };

  const fetchContactInvestor = async (value) => {
    setIsLoadingCOntactInvestor(true);
    try {
   
      const apiEndpoint = `${base_url}/investor/contacts/${value}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setInvestorContact(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoadingCOntactInvestor(false);
    }
  };

  const fetchDeal = async (value) => {
    setIsLoadingDeal(true);
    try {
   
      const apiEndpoint = `${base_url}/investorOpportunity/details/investor/${value}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setDeal(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoadingDeal(false);
    }
  };

  const handleContactChange=(value)=>{
    setSelectedContact(value);
  }

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

  const handleSelectChangeCustomer = (value) => {
    setSelectedCustomer(value)
    fetchContacts(value);
    fetchOpportunity(value)
    console.log('Selected user:', value);
  };

  const handleSelectCustomerFocus = () => {
    if (!touchedCustomer) {
     
      fetchCustomer();

      setTouchedCustomer(true);
    }
  };

  const fetchContact = async () => {
    setIsLoadingContact(true);
    try {
      const apiEndpoint = `
     ${base_url}/contact/user/${props.userId}`;
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
     
      fetchContact();

      setTouchedContact(true);
    }
  };

  const fetchOpportunity = async (value) => {
    setIsLoadingOpportunity(true);
    try {
      const apiEndpoint = `
      
${base_url}/opportunity/open/${value}`;
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

  const handleSelectChangeDeal = (value) => {
    setSelectedDeal(value)
    
  };

  const handleSelectOpportunityFocus = () => {
    if (!touchedOpportunity) {
     
      fetchOpportunity();

      setTouchedOpportunity(true);
    }
  };

  const fetchContacts = async (value) => {
    setIsLoadingContacts(true);
    try {
   
      const apiEndpoint = `${base_url}/customer/contact/drop/${value}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoadingContacts(false);
    }
  };

const {
      user: { userId, firstName,empName, fullName, middleName, lastName, timeZone },
      isEditing,
      prefillEvent,
      addingEvent,
      addEvent,
      deletingEvent,
      deleteEvent,
      startDate,
      endDate,
      contactId,
      startTime,
      endTime,
      defaultContacts,
      ownerId,
      defaultAccounts,
      eventType,
      updateEvent,
      updatingEvent,
      defaultOpportunities,
      creatorId,
      employeeId,
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
          initialValues={
            isEditing
              ? prefillEvent
              : {
                  eventType: "",
                 
                  eventTypeId: "",
                  eventSubject: "",
                  eventVenue: "",
                  remindAt: "",
                  notificationEmail: false,
                  eventDescription: "",
                  timeZone: timeZone,
                  startDate: startDate || dayjs(),
                  startTime: startDate || null,
                  endDate: endDate || null,
                  endTime: endDate || null,
                  assignedTo: selectedOption ? selectedOption.employeeId:userId,
                  note: "",
                  eventStatus: "",
                  allDayInd: true,
                  candidateId: "",
                  // included: [],
                  fullName: "",
                 
                  repeatStartDate: "",
                  complitionInd: "Incomplete",
                  repeatEndDate: "",
                  repeat_ind: false,
                  address: [
                    {
                      addressType: "",
                      address1: "",
                      address2: "",
                      town: "",
                      street: "",
                      city: "",
                      postalCode: "",
                      country: "",
                      latitude: "",
                      longitude: "",
                    },
                  ],
                  employeesIds: [],
                  ownerIds: [],
                }
          }
          validationSchema={EventSchema}
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

            let newStartTime = `${finalStartTime}${timeEndPart}`;

            let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
            let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
            let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
            var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
            var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
            console.log(endMinutes);
            var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
            console.log(firstEndTimeminutes);
            let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
            let mi = firstEndTimeminutes % 60;
            hr = hr < 10 ? "0" + hr : hr;
            mi = mi < 10 ? "0" + mi : mi;
            let finalEndTime = `${hr}:${mi}`;

            let newEndTime = `${finalEndTime}${timeEndPart}`;

            isEditing
              ? updateEvent(
                  prefillEvent.eventId,
                  {
                    ...values,
                    startDate: `${newStartDate}T${newStartTime}`,
                    endDate: `${newEndDate}T${newEndTime}`,
                    startTime: 0,
                    endTime: 0,
                   
                    assignedTo: selectedOption ? selectedOption.employeeId:userId,
                  },
                  handleCallback
                )
              : addEvent(
                  {
                    ...values,
                    included:selectedIncludeValues,
                    ownerIds: userId === userId ? [userId] : [],
                    startDate: `${newStartDate}T20:00:00Z`,
                    endDate: `${newEndDate}T20:00:00Z`,
                    startTime: 0,
                    endTime: 0,
                    customer:selectedCustomer,
                    contacts:selectedValue === 'Investor'?selectedContactInvestor:selectedContact,
                    oppertunity:selectedOpportunity,
                    investorId:selectedInvestor,
                    invOpp:selectedDeal,
                    // contactId: selectedContact,
                    // opportunityId:selectedOpportunity,
                    // customerId:selectedCustomer,
                    remindInd: reminder ? true : false,
                    assignedTo: selectedOption ? selectedOption.employeeId:userId,
                  },
                  handleCallback
                );
            !isEditing && resetForm();
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
            <div class="overflow-y-auto h-[36rem] overflow-x-hidden max-sm:h-[30rem]  "  style={{scrollbarWidth:"thin"}}>
            <Form className="form-background max-sm:w-[90%]">
              <div class=" flex justify-around max-sm:flex-col">
                <div class=" h-full w-w47.5  max-sm:w-wk">
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[0]}</div>
                  <Field
                    isRequired
                    name="eventTypeId"
                    //label="Type"               
                    component={SearchSelect}
                    isColumnWithoutNoCreate
                    selectType="eventType"
                    value={values.eventTypeId}
                    isColumn
                    inlineLabel
                  />
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[1]}</div>
                  <Field
                    isRequired
                    name="eventSubject"
                    //label="Topic"             
                    isColumn
                  style={{ width:"100%"}}
                    component={InputComponent}
                    inlineLabel
                  />
              
                  <div class="mt-3">
                    <div class=" flex justify-between">
                      <div class=" w-5/12 flex flex-col">
                      <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[2]}</div>
                        <Field
                          isRequired
                          name="startDate"
                          //label="Start "                    
                          isColumn
                          component={DatePicker}
                          value={values.startDate}
                          inlineLabel
                        
                        />
                      </div>
                      <div class=" w-5/12 flex flex-col">
                      <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[3]}</div>
                        <Field
                          isRequired
                          name="startTime"
                          // label="Start Time"                    
                          isColumn
                          component={TimePicker}
                          use12Hours
                          value={values.startTime}
                          inlineLabel
                        
                        />
                      </div>
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-5/12 flex flex-col mt-1">
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[4]}</div>
                      <Field
                        isRequired
                        name="endDate"
                        // label="End "               
                        component={DatePicker}
                        isColumn
                        value={values.endDate || values.startDate}
                        defaultValue={dayjs("2015-01-01")}
                        inlineLabel
                       
                        disabledDate={(currentDate) => {
                          if (values.startDate) {
                            if (
                              dayjs(currentDate).isBefore(
                                dayjs(values.startDate)
                              )
                            ) {
                              return true;
                            } else {
                              return false;
                            }
                          }
                        }}
                      />
                    </div>
                    <div class=" w-5/12 flex flex-col mt-1">
                    <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[5]}</div>
                      <Field
                        isRequired
                        name="endTime"
                        //label="End Time"              
                        isColumn
                        component={TimePicker}
                        use12Hours
                        value={values.endTime}
                        inlineLabel
                        
                      />
                    </div>
                  </div>
                  <div class=" text-xs font-bold font-poppins mt-1"> {translatedMenuItems[6]}</div>
                  <Field
                    isRequired
                    defaultValue={{ label: timeZone, value: userId }}
                    isColumnWithoutNoCreate
                    name="timeZone"
                    //label="TimeZone "        
                    selectType="timeZone"
                    isColumn
                    value={values.timeZone}
                    component={SearchSelect}
                    inlineLabel
                  />
                  <Radio.Group onChange={handleRadioChange} value={selectedValue}>
        <Radio value="Prospect">Prospect</Radio>
        <Radio value="Investor">Investor</Radio>
      </Radio.Group> 
      {selectedValue === 'Prospect' && ( 
        <div>    
                   <div class="mt-3" >
                   <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[7]}</div>
                  {props.user.crmInd === true &&(
              
     <>        


<Select
        showSearch
      
        placeholder="Search or select prospect"
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
                  <div class="mt-3 "  >
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[8]}</div>
                  {props.user.crmInd === true &&(
                  
                  <>              
<Select
        showSearch
      
        placeholder="Search or select contact"
        optionFilterProp="children"
        loading={isLoadingContacts}
      mode="multiple"
        onChange={handleContactChange}
        disabled={!selectedCustomer}
      >
        {contacts.map(contacts => (
          <Option key={contacts.contactId} value={contacts.contactId}>
            {contacts.fullName}
          </Option>
        ))}
      </Select>
      </>
                  )} 
                  </div>
                  <div class="mt-3">
                  <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[9]}</div>
                  {props.user.crmInd === true &&(          
              <>
              <Select
        showSearch
      
        placeholder="Search or select opportunity"
        optionFilterProp="children"
        loading={isLoadingOpportunity}
        // onFocus={handleSelectOpportunityFocus}
        disabled={!selectedContact}
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
                  </div>
                   )}
{selectedValue === 'Investor' && ( 
        <div>    
                   <div class="mt-3" >
                   <div class=" text-xs font-bold font-poppins"> 
                    {/* {translatedMenuItems[7]} */}
Investor
                   </div>
                  {props.user.crmInd === true &&(           
     <>        
<Select
        showSearch
       
        placeholder="Search or select"
        optionFilterProp="children"
        loading={isLoadingInvestor}
        onFocus={handleSelectInvestorFocus}
        onChange={handleSelectChangeInvestor}
      >
        {investor.map(investor => (
          <Option key={investor.investorId} value={investor.investorId}>
            {investor.name}
          </Option>
        ))}
      </Select>
      </> 
                  )} 
                  </div>
                  <div class="mt-3 "  >
                  <div class=" text-xs font-bold font-poppins"> 
                  Investor Contact
                    </div>
                  {props.user.crmInd === true &&(
                  
                  <>                
<Select
        showSearch
      
        placeholder="Search or select"
        optionFilterProp="children"
        loading={isLoadingContactInvestor}
        disabled={!selectedInvestor}
        mode="multiple"
        //onFocus={handleSelectContactFocus}
        onChange={handleSelectChangeInvestorContact}
      >
        {investorContact.map(inv => (
          <Option key={inv.contactId} value={inv.contactId}>
            {inv.fullName}
          </Option>
        ))}
      </Select>
      </>
                  )} 
                  </div>
                  <div class="mt-3">
                  <div class=" text-xs font-bold font-poppins"> 
                    {/* {translatedMenuItems[9]} */}
                    Deal
                    </div>
                  {props.user.crmInd === true &&(            
              <>
              <Select
        showSearch
      
        placeholder="Search or select"
        optionFilterProp="children"
        loading={isLoadingDeal}
        disabled={!selectedContactInvestor}
        //onFocus={handleSelectOpportunityFocus}
        onChange={handleSelectChangeDeal}
      >
        {deal.map(opp => (
          <Option key={opp.opportunityId} value={opp.opportunityId}>
            {opp.opportunityName}
          </Option>
        ))}
      </Select>
      </>
                  )} 
                  </div>
                  </div>
                   )}
                
                               
                </div>
                <div class="h-full w-w47.5 max-sm:w-wk ">
                <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[10]}</div>
                <div class="mt-1">
                 <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
                           {/* assignedto" */}
                 
            <div className="relative ">
            <Listbox.Button className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}}>
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {props.assignedToList.map((item) => (
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
      </div>
      <div class="mt-2">
      <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[11]}</div>
              
{/* <div style={{fontWeight:"bold",fontSize:"0.75rem"}}>Include</div> */}
                   <Select
          showSearch
          
          placeholder="Search or select include"
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
                 <div class=" text-xs font-bold font-poppins mt-1"> {translatedMenuItems[12]}</div>
                  <FieldArray
                    name="address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                     
                        singleAddress
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
              <div class="mt-2">
              <ReactDescription
                setText={setText}
                text={text}
                />
            
                  </div>
                  
                </div>
              </div>
      
              <div class=" flex mt-31 justify-end">
                {isEditing && (
                  <>
                    <StyledPopconfirm
                      title="Do you want to delete?"
                      onConfirm={() => deleteEvent(prefillEvent.eventId)}
                    >
                      <Button
                        type="danger"
                        htmlType="submit"
                        Loading={deletingEvent}
                      >
                        delete
                      </Button>
                    </StyledPopconfirm>
                  </>
                )}
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={isEditing ? updatingEvent : addingEvent}
                >
                  {isEditing ? (
                    "Update"
                  ) : (
                    "Create"
                 
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
const mapStateToProps = ({ auth, event,opportunity,customer, employee, events, candidate }) => ({
  addingEvent: event.addingEvent,
  orgId: auth.userDetails.organizationId,
  allCustomerData:customer.allCustomerData,
  updatingEvent: event.updatingEvent,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  token: auth.token,
  assignedToList:employee.assignedToList,
  allOpportunityData:opportunity.allOpportunityData,
  filteredContact: candidate.filteredContact,
  deletingEvent: event.deleteEvent,
  employees: employee.employees,
  candidateId: candidate.clearbitCandidate.candidateId,
  fullName: auth.userDetails.fullName
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addEvent,
      deleteEvent,
      updateEvent,
      handleChooserModal,
      handleEventModal,
      getAssignedToList,
      getAllOpportunityData,
      getAllCustomerData,
      getFilteredEmailContact,
      setClearbitCandidateData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
