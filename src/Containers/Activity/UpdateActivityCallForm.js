import React, {useState ,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllSalesList } from "../Opportunity/OpportunityAction"

import { Button, Switch, Tooltip ,Select} from "antd";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import SearchSelect from "../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../Components/Forms/Formik/TimePicker";
import {updateActivityCall} from "./ActivityAction"
import {getAllCustomerData} from "../Customer/CustomerAction"
import { StyledPopconfirm } from "../../Components/UI/Antd";
import SpeechRecognition, { } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import { Listbox } from '@headlessui/react'
import { BundleLoader } from "../../Components/Placeholder";
import { base_url } from "../../Config/Auth";
const ButtonGroup = Button.Group;
const { Option } = Select;
const suffix = (
  <MicIcon
    onClick={SpeechRecognition.startListening}
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
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

  // reminder:Yup.string()
  // .nullable()
  // .required("Input required !"),
});
function UpdateActivityCallForm(props) {


  const [contacts, setContacts] = useState([]);
 

  const [isLoadingOpportunity, setIsLoadingOpportunity] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const [opportunity, setOpportunity] = useState([]);
 

  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  
  const[category,setCategory] =useState(props.selectedCall ? props.selectedCall.callCategory : "New")
  const[reminder,setReminder] =useState(true)
  const [selectedIncludeValues, setSelectedIncludeValues] = useState([]);
  console.log("category",category);
  const[Type,setType]=useState(props.selectedCall?props.selectedCall.callType:"Inbound",)
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleCategoryChange (data)  {
    debugger;

    setCategory(  data );
  };

  const handleSelectChangeInclude = (values) => {
    setSelectedIncludeValues(values); // Update selected values
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
  const handleContactChange=(value)=>{
    setSelectedContact(value);
  }



  const handleOpportunityChange=(value)=>{
    setSelectedOpportunity(value);
  }
  function handleCallback (resetForm)  {
    const { handleChooserModal, handleCallModal, callback } = props;
   // handleChooserModal(false);
    // handleCallModal(false);
    callback && callback();
    // resetForm();
  };



  const fetchContacts = async () => {
    setIsLoadingContacts(true);
    try {
      const apiEndpoint = `${base_url}/contact-list/drop-down/${props.uniqueId}`;
      const response = await fetch(apiEndpoint, {
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




  const fetchOpportunity = async () => {
    setIsLoadingOpportunity(true);
    try {
      const apiEndpoint = `${base_url}/opportunity/open/${props.uniqueId}`;
      const response = await fetch(apiEndpoint, {
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
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoadingOpportunity(false);
    }
  };


 
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
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
        "213" ,  // "Quotation",//13
         "316"  ,// "Notes"//14
         "104" //Create

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
    fetchContacts()
    fetchOpportunity()
    props.getAllSalesList();
    props.getAllCustomerData(props.userId)
    //props.getOpportunityListByCustomerId(props.customer.customerId);
    //props.getContactListByCustomerId(props.customer.customerId);
    // props.getAllOpportunityData(userId)
  }, []);
  console.log(props.selectedStatus)

  
  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);

    // const {
    //   handleCallNotesModal

    // } = props;

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
    const employeesData = props.sales.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.employeeId,
      };
    });
    const filteredEmployeesData = employeesData.filter(
      (item) => item.value !== props.user.userId
    );
    const opportunityNameOption = props.opportunityByCustomerId.map((item) => {
      return {
        label: `${item.opportunityName}`,
        value: item.opportunityId,
      };
    });

    const ContactData = props.contactByCustomerId.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.contactId,
      };
    });
    const filteredContactData = ContactData.filter(
      (item) => item.value !== props.user.userId
    );

    const salesNameOption = props.sales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });
    // console.log(this.state.category);
    const {
      user: { userId, firstName, middleName, fullName, lastName, timeZone },
      isEditing,
      prefillCall,
      addingCustomerActivityCall,
      deleteCall,
      deletingCall,
      addCustomerActivityCall,
      startDate,
      endDate,
      startTime,
      endTime,
      defaultContacts,
      ownerId,
      defaultCustomers,
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
   const selectedOption = props.sales.find((item) => item.fullName === selected);
   if (loading) {
    return <div><BundleLoader/></div>;
  }
  console.log(props.name)
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

                callPurpose: props.selectedStatus.activityType,
                fullName: "",
                timeZone: timeZone,
                remindInd: reminder ? true : false,
                remindTime: "",
                candidate: "",
                complitionInd: "Incomplete",
                startDate:
              dayjs(props.selectedStatus.startDate) || dayjs(),
                startTime: startDate || null,
                endDate: endDate || null,
                endTime: endDate || null,

                callResult: "",
                callDescription: "",
                // opportunity:"",
                included: props.selectedStatus.included,
                assignedTo: selectedOption ? selectedOption.employeeId:userId,
                // contactId: [],
                // contacts:[],
                candidateId: "",
              }
             
          }
          // validationSchema={CallSchema}
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
              contacts:selectedContact,
              opportunity:selectedOpportunity,
              contactId:props.contact?props.contact:null,
              customer: props.customer ? props.customer.customerId : null,
              investorId:props.investor?props.investor.investorId:null,
              distributorId:props.distributor?props.distributor.distributorId:null,
              supplierId:props.supplier?props.supplier.supplierId:null,
              shipperId:props.shipper?props.shipper.shipperId:null,
              callCategory: category,
              callType: Type,
              startDate: `${newStartDate}T${newStartTime}`,
              endDate: `${newEndDate}T${newEndTime}`,

              startTime: 0,
              endTime: 0,
              assignedTo: selectedOption ? selectedOption.employeeId:userId,
            };
            props.updateActivityCall(testVal,props.selectedStatus.callId,
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background h-wk">
              <div class=" flex justify-around max-sm:flex-col">
              <div class=" h-full w-w47.5.5 max-sm:w-wk"   >
              <div class=" flex justify-between w-full max-sm:flex-col">
                    <div class=" w-2/6 max-sm:w-wk">
                  
                      <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">
                        {/* Type */}
                        {translatedMenuItems[0]}
                      </div>
                      <div class=" flex justify-between">
                        <Tooltip title="Inbound">
                      
                          <div
                            onClick={() => handleTypeChange("Inbound")}
                            style={{
                              fontSize: "1.375em",
                              cursor: "pointer",
                              color:
                              Type  === "Inbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-in-alt"></i>
                          </div>
                        </Tooltip>
                        <Tooltip title="Outbound">
                      
                          <div
                            onClick={() => handleTypeChange("Outbound")}
                            style={{
                              fontSize: "1.375em",
                              cursor: "pointer",
                              color:
                              Type === "Outbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-out-alt"></i>
                          </div>
                        </Tooltip>
                        <Tooltip title="Conference">
                       
                          <div
                            onClick={() => handleTypeChange("Conference")}
                            style={{
                              fontSize: "1.375em",
                              cursor: "pointer",
                              color:
                              Type === "Conference"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-network-wired"></i>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                    <div class=" w-1/2">
                     
                      <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">
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
               
                  <div class=" flex justify-between mt-3 items-end max-sm:flex-col " >
                    <div class=" self-start">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                    {translatedMenuItems[2]}
                      {/* Mode */}
                      </div>
                      <Switch
                        // style={{
                        //   marginLeft: "0.3125em"
                        // }}
                        name="mode"
                        checkedChildren="Audio"
                        unCheckedChildren="Video"
                      />
                    </div>
                    <div class="font-bold text-xs font-poppins w-1/3 self-baseline max-sm:w-wk">
                    {translatedMenuItems[3]}
                      <FastField
                        name="modeType"
                        // label="Channel"
                        isColumn
                        options={[
                          "Zoom Call",
                          "Whatsapp call",
                          "Google Meet",
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
                  <div className="font-bold text-xs font-poppins">
                  {translatedMenuItems[4]}</div>
                  <Field
                    // isRequired
                    name="callPurpose"
                    // label="Topic"
                  // subject
                    component={InputComponent}
                    isColumn
                    width={"100%"}
                    inlineLabel
                  />
            <div class=" mt-3">
             <div className="font-bold text-xs font-poppins">
                  {translatedMenuItems[5]}</div>
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
                
                  <div class=" flex justify-between mt-3 max-sm:flex-col">
                    <div class="font-bold text-xs font-poppins  w-1/2 max-sm:w-wk">               
                    {translatedMenuItems[6]}
                      <Field
                        name="startTime"
                        // label="Start Time"                 
                        component={TimePicker}
                        isRequired
                        isColumn
                        use12Hours
                        value={values.startTime}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                    <div class="font-bold text-xs font-poppins  w-2/5 max-sm:w-wk">
                    {translatedMenuItems[7]}
                      <Field
                        name="endTime"
                        // label="End Time"                   
                        component={TimePicker}
                        use12Hours
                        isRequired
                        isColumn
                        value={values.endTime}
                        // inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                 <div class=" mt-3">
                  <div className="font-bold text-xs font-poppins "> {translatedMenuItems[8]}</div>
              
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
                <div class=" h-3/4 w-w47.5.5 max-sm:w-wk " 
                >
                <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className=" font-bold text-xs">   {translatedMenuItems[9]}
            {/* Assigned */}
            </div>
          <div className="relative mt-1">
              <Listbox.Button  style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {props.sales.map((item) => (
                    <Listbox.Option
                      key={item.employeeId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }`
                      }
                      value={item.fullName}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {item.fullName}
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
    <div class=" mt-3">
                  <Field
                    name="included"
                    label="Include"
                  
                    mode
                    placeholder="Select"
                    component={SelectComponent}
                    options={Array.isArray(filteredEmployeesData) ? filteredEmployeesData : []}
                    value={values.included}
                    defaultValue={{
                      label: `${fullName || ""} `,
                      value: employeeId,
                    }}
                  />
                 </div>
                 {props.type!=="contact"&&(
                  <>
  <div class=" mt-3">
  {props.user.crmInd === true &&(
<Field
name="customerId"
isColumnWithoutNoCreate
selectType="customerList"
label="Tag Company"

component={SearchSelect}
isColumn
//value={props.name}
//isDisabled={defaultCustomers}

defaultValue={props.defaultValue}
// defaultValue={
//   defaultCustomers ? defaultCustomers : null
// }
inlineLabel
/>
  )} 
  </div>
  </>
                 )}
               
               {props.type!=="contact"&&(
                  <div class=" mt-3">
                  {props.user.crmInd === true &&(
               <>
                <label style={{fontWeight:"bold",fontSize:"0.75rem"}}>Contact</label>
                <Select
                placeholder="Select Contact"
                loading={isLoadingContacts}
                onChange={handleContactChange}
                mode="multiple"
              //disabled={!this.state.selectedCustomer} // Disable Contact dropdown if no customer is selected
              >
                {contacts.map(contact => (
                  <Option key={contact.contactId} value={contact.contactId}>
                    {contact.fullName}
                  </Option>
                ))}
              </Select> 
              </>
                  )} 
                  </div>
               )}
               {props.type!=="contact"&&(
                  <div class=" mt-3">
                  {props.user.crmInd === true &&(
                  <>
                  <label style={{fontWeight:"bold",fontSize:"0.75rem"}}>Opportunity</label>
                  <Select
                  placeholder="Select Opportunity"
                  loading={isLoadingOpportunity}
                  onChange={handleOpportunityChange}
                  
                //disabled={!this.state.selectedCustomer} // Disable Contact dropdown if no customer is selected
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
               )}
               
                  {/* <div >
                  <Field
                    disabled="true"
                    isRequired
                    name="candidateId"
                    // type="text"
                    //label="Talent"
                    
                    }
                    placeholder="Start typing to search..."
                    isColumnWithoutNoCreate
                    setClearbitCandidateData={props.setClearbitCandidateData}
                    component={CandidateClearbit}
                    inlineLabel
                  />
                   </div>
                 
                    <div class=" mt-3">
                    <div class=" w-full"><Field
                      name="callDescription"
                      // label="Notes"
                      label=
                      }
                      isColumn
                      width={"100%"}
                      component={TextareaComponent}
                      inlineLabel
                    /></div>
                  </div>
                 
                
                  {/* <div class=" flex justify-between" >
                    <div 
                    class=" w-1/2 font-bold">
                    <div class=" flex justify-between" >
                        <div>
                         <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Set Reminder</div>
                        </div>
                        <div>
                          <Switch
                            onChange={handleReminderChange}
                            checked={reminder}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                          />
                        </div>
                      </div>
                    </div>
                    <div class=" w-1/3 font-bold">
                      {reminder ? (
                        <div>
                          <Field
                            // isRequired
                            name="remindTime"
                            label="Reminder"
                            width={"100%"}
                            component={SelectComponent}
                            options={[
                              "15 min",
                              "30 min",
                              "45 min",
                              "1 hour",
                              "2 hour",
                            ]}
                            defaultValue="30 min"
                            isColumn
                            inlineLabel
                          />
                        </div>
                      ) : null}
                    </div>
                  </div> */}
                </div>
              </div>
              
              <div class=" flex justify-end mt-3">
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
                  loading={props.updatingActivityCall}
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

const mapStateToProps = ({ auth, call,activity, employee,customer, opportunity, candidate }) => ({
    addingActivityCall: activity.addingActivityCall,
    updatingActivityCall:activity.updatingActivityCall,
  allCustomerData:customer.allCustomerData,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  user: auth.userDetails,
  updatingCall: call.updatingCall,
  user: auth.userDetails,
  token:auth.token,
//   deletingCall: call.deleteCall,
  sales: opportunity.sales,
  opportunityByCustomerId: customer.opportunityByCustomerId,
  contactByCustomerId: customer.contactByCustomerId,
  addNotesSpeechModal: call.addNotesSpeechModal,
  fullName: auth.userDetails.fullName,
  token: auth.token,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateActivityCall,
      getAllCustomerData,
     // handleChooserModal,
      getAllSalesList,
    //   updateCall,
      //handleCallModal,
    //   deleteCall,
      // getOpportunityListByCustomerId,
      // getContactListByCustomerId,
      //setClearbitCandidateData, 
    //   handleCallNotesModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(UpdateActivityCallForm);
















