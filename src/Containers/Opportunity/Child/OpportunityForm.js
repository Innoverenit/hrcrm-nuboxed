import React, { useState, useEffect,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {  getAllDialCodeList } from "../../../Containers/Auth/AuthAction";
import { getCustomerData } from "../../Customer/CustomerAction";
import { getContactData } from "../../Contact/ContactAction";
import { Button, Select,Switch,Input } from "antd";
import { Formik, Form, Field, } from "formik";
import * as Yup from "yup";
import DraggableUpload1 from "../../../Components/Forms/Formik/DraggableUpload1";
import {
  addOpportunity,
  getInitiative,
  getOppLinkedWorkflow,
  getOppLinkedStages,
  addMoreContact
} from "../OpportunityAction";
import {getCustomerConfigure, getUOM} from "../../Settings/SettingsAction"
import {getAssignedToList} from "../../Employees/EmployeeAction"
import { getCrm} from "../../Leads/LeadsAction";
import {getSaleCurrency} from "../../Auth/AuthAction"
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { Listbox } from "@headlessui/react";
import { getAllEmployeelist } from "../../Investor/InvestorAction";
import ReactDescription from "../../../Components/ReactSpeech/ReactDescription"
import { BundleLoader } from "../../../Components/Placeholder";
import {base_url} from "../../../Config/Auth";



const { Option } = Select; 
const OpportunitySchema = Yup.object().shape({
  //opportunityName: Yup.string().required("Input needed!"),
  oppWorkflow: Yup.string().required("Input needed!"),
  currency: Yup.string().required("Input needed!"),
  oppStage: Yup.string().required("Input needed!"),
  //customerId:Yup.string().required("Input needed!"),
});
function OpportunityForm(props) {




  useEffect(() => {
    props.getCustomerConfigure(props.orgId,"add","quotation")
  
  }, []);
  useEffect(() => {
   
    // props.getContactData(props.userId);
    // props.getCustomerData(props.userId);
    props.getInitiative(props.userId);
     props.getOppLinkedStages(props.orgId);
     props.getOppLinkedWorkflow(props.orgId);
     props.getAllDialCodeList();
     props.getCrm();
    //  props.getAssignedToList(props.orgId);
     props.getAllEmployeelist();
     props.getSaleCurrency();
  }, []);

  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);

  const[stage,setStage]=useState([])
const [isLoadingStage, setIsLoadingStage] = useState(false);
const [selectedStage, setSelectedStage] = useState(null);

  const [include, setInclude] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    phoneNumber: '',
    countryDialCode:"",
   
  });

  const [isLoadingWorkflow, setIsLoadingWorkflow] = useState(false);

  const [workflow, setWorkflow] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const[selectedUom,setSelectedUom]=useState(null);
  const[selectedUom1,setSelectedUom1]=useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const [loading, setLoading] = useState(true);
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  const [customers, setCustomers] = useState([]);
  const [contacts, setContacts] = useState([]);

  const[workFlowType,setWorkFlowType]=useState([])

  const [selectedWorkFlowType, setSelectedWorkFlowType] = useState(null);
  const [isLoadingWorkflowType, setIsLoadingWorkflowType] = useState(false);
  const [touchedWorkFlowType, setTouchedWorkFlowType] = useState(false);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
 
  const [selectedContact, setSelectedContact] = useState(null);
  const [touchedCustomer, setTouchedCustomer] = useState(false);
  const [emailInd, setEmailInd] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    props.getUOM(); ;
  }, []);
const  handleEmailInd = (checked) => {
    setEmailInd(checked)
  };


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '110', // 0
          '176', // 1
          '126', // 2
          '218', // 3
          '241', // 4
          "316",//5
          '76', // 6
          '75', // 7
          '248', // 8
          '73', // 9
          '141', // 10 Workflow
          '219', // 11 Stage
          '46',//12
       
          '7',//Custom 13
'147',//Description 14
'104',//create
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
  const fetchCustomers = async () => {
    setIsLoadingCustomers(true);
    try {
   

      const apiEndpoint = `${base_url}/customer/user/${props.userId}`;
      const response = await fetch(apiEndpoint,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
      });
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  const handleSelectCustomerFocus = () => {
    if (!touchedCustomer) {
      fetchCustomers();
      // fetchSector();

      setTouchedCustomer(true);
    }
  };


  const handleUomChange2=(value)=>{
    setSelectedUom1(value);
  }

  const fetchContacts = async (customerId) => {
    setIsLoadingContacts(true);
    try {
   
      const apiEndpoint = `${base_url}/customer/contact/drop/${customerId}`;
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

  const handleCustomerChange = (customerId) => {
    setSelectedCustomer(customerId);
    fetchContacts(customerId);
  };
  const handleContactChange=(value)=>{
    setSelectedContact(value);
  }
  const fetchInclude = async () => {
    setIsLoading(true);
    try {
      const apiEndpoint = `${base_url}/employee/active/user/drop-down/${props.organizationId}`;
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
      setIsLoading(false);
    }
  };

  const handleSelectChange = (values) => {
    setSelectedValues(values); // Update selected values
  };

  const handleSelectFocus = () => {
    if (!touched) {
      fetchInclude();
      setTouched(true);
    }
  };

  const sortedCurrency =props.saleCurrencies.sort((a, b) => {
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
      value: item.currency_name,
    };
  });

  function getAreaOptions(filterOptionKey, filterOptionValue) {
    const contactOptions = props.contactData
      .filter((option) => option.customerId === filterOptionValue && option.probability !== 0)
      .map((option) => ({
        label: option.fullName || "",
        value: option.contactId,
      }))
      .sort((a, b) => {
      
        const propertyToSortByA = a.label.toLowerCase();
        const propertyToSortByB = b.label.toLowerCase();
               
        return propertyToSortByA.localeCompare(propertyToSortByB);
      });
  
    return contactOptions;
  }
  
  function getStagesOptions(filterOptionKey, filterOptionValue) {
    const StagesOptions =
      props.oppLinkStages.length &&
      props.oppLinkStages
        .filter((option) => {
          if (
            option.opportunityWorkflowDetailsId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .sort((a, b) => {
          if (a.probability < b.probability) {
            return -1; // Sort in increasing order
          } else if (a.probability > b.probability) {
            return 1;
          } else {
            return 0;
          }
        })

        .map((option) => ({
          // label: `${option.stageName || ""}`,
           label: `${option.stageName}  ${option.probability}`,
          value: option.opportunityStagesId,
        }));

    return StagesOptions;
  }
  const sortedWorkflow =props.oppLinkWorkflow.sort((a, b) => {
    const nameA = a.workflowName.toLowerCase();
    const nameB = b.workflowName.toLowerCase();
    // Compare department names
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const WorkflowOptions = sortedWorkflow.map((item) => {
    return {
      label: `${item.workflowName || ""}`,
      value: item.opportunityWorkflowDetailsId,
    };
  });

  const customerNameOption = props.customerData
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

const AllEmplo = props.assignedToList.map((item) => {
  return {
    label: `${item.empName || ""}`,
    value: item.employeeId,
  };
});
const filteredEmployeesData = AllEmplo.filter(
  (item) => item.value !== props.user.userId


);


const handleSelectWorkflowTypeFocus = () => {
  if (!touchedWorkFlowType) {
    fetchWorkFlowType();
    // fetchSector();

    setTouchedWorkFlowType(true);
  }
};



const handleUomChange1=(value)=>{
  setSelectedUom(value);
}

const handleWorkFlowTypeChange = (type) => {
  setSelectedWorkFlowType(type);
  // fetchWorkFlowType(customerId);
  fetchWorkflow(type)
};


const fetchWorkFlowType = async () => {
  setIsLoadingWorkflowType(true);
  try {
    // const response = await axios.get('https://develop.tekorero.com/employeePortal/api/v1/customer/user/${props.userId}');
    // setCustomers(response.data);
    const apiEndpoint = `${base_url}/workflow/publish/for_dropdown/${props.organizationId}/Quotation`;
    const response = await fetch(apiEndpoint,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
    });
    const data = await response.json();
    setWorkflow(data);
  } catch (error) {
    console.error('Error fetching customers:', error);
  } finally {
    setIsLoadingWorkflowType(false);
  }
};


const fetchWorkflow = async (type) => {
  setIsLoadingWorkflow(true);
  try {
    // const response = await axios.get(`https://develop.tekorero.com/employeePortal/api/v1/customer/contact/drop/${customerId}`);
    // setContacts(response.data);
    const apiEndpoint = `${base_url}/workflow/for_dropdown/${props.orgId}/${type}`;
    const response = await fetch(apiEndpoint,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
    });
    const data = await response.json();
    setWorkflow(data);
  } catch (error) {
    console.error('Error fetching contacts:', error);
  } finally {
    setIsLoadingWorkflow(false);
  }
};


const handleWorkflowChange=(workflowDetailsId)=>{
  setSelectedWorkflow(workflowDetailsId);
  fetchStage(workflowDetailsId)
}


const fetchStage= async (workflowId) => {
  setIsLoadingStage(true);
  try {
    // const response = await axios.get(`https://develop.tekorero.com/employeePortal/api/v1/customer/contact/drop/${customerId}`);
    // setContacts(response.data);
    const apiEndpoint = `${base_url}/workflow/stages/for_dropdown/${props.orgId}/${workflowId}`;
    const response = await fetch(apiEndpoint,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
    });
    const data = await response.json();
    setStage(data);
  } catch (error) {
    console.error('Error fetching contacts:', error);
  } finally {
    setIsLoadingStage(false);
  }
};


const handleStageChange=(value)=>{
  setSelectedStage(value);
}

  const [text, setText] = useState("");
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





  // const handleMobileKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     console.log('New Contact Added:', newContact);
  //     // Reset fields after pressing enter
  //     setIsAddingContact(false);
  //     setNewContact({ firstName: '', lastName: '', email: '', mobile: '',dialCode:"" });
  //     let data={
  //       firstName: newContact.firstName,
  //       lastName:newContact.lastName ,
  //       emailId: newContact.emailId,
  //       phoneNumber: newContact.phoneNumber,
  //       countryDialCode:newContact.countryDialCode,
  //       customerId:selectedCustomer
  //     }
  //     props.addMoreContact(data)
  //     fetchContacts(selectedCustomer);
     
  //   }
   
    
  // };



  const handleMobileKeyPress = async (e) => {
    if (e.key === 'Enter') {
      console.log('New Contact Added:', newContact);
  
      // Prepare data for adding the contact
      let data = {
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        emailId: newContact.emailId,
        phoneNumber: newContact.phoneNumber,
        countryDialCode: newContact.countryDialCode,
        customerId: selectedCustomer
      };
  
      try {
        // Await the addMoreContact function to ensure success before proceeding
        await props.addMoreContact(data);
  
        // Reset fields after success
        setIsAddingContact(false);
        setNewContact({ firstName: '', lastName: '', email: '', mobile: '', dialCode: '' });
  
        // Fetch updated contact list
        fetchContacts(selectedCustomer);
      } catch (error) {
        // Handle error
        console.error('Error adding contact:', error);
      }
    }
  };
  
  
  const handleRemoveFields = () => {
    setIsAddingContact(false);
    setNewContact({  firstName: '',
      lastName: '',
      emailId: '',
      phoneNumber: '',
      countryDialCode:"",
      customerId:""});
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };


  const handleAddContact = () => {
    setIsAddingContact(true);
  };


  const handleDialCodeChange = (value) => {
    setNewContact((prev) => ({ ...prev, countryDialCode: value }));
  };
 
 

  const {
    user: { userId,empName, },
    addingOpportunity,
    startDate,
    employeeId,
    endDate,
  } = props;
  const selectedOption = props.crmAllData.find((item) => item.empName === selected);
  console.log(selectedValues)
  if (loading) {
    return <div><BundleLoader/></div>;
  }
  return (
    <>
      <Formik
        initialValues={{
          opportunityName: "",
          customValue1:"",
          customValue2:"",
          startDate: startDate || dayjs(),
          endDate: endDate || null,
          endDate: dayjs(),
          userId: props.userId,
          description: "",
          proposalAmount: "",
          // excelId: "",
          currency: props.user.currency,
          orgId: props.organizationId,
          userId: props.userId,
          // customerId: undefined,
          oppWorkflow: "",
          contactId: undefined,
          oppInnitiative: "",
          oppStage: "",
          salesUserIds: selectedOption ? selectedOption.employeeId:props.userId,
          // included: selectedValues,
          emialInd:emailInd ? "true" : "false",
        }}
        // validationSchema={OpportunitySchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          console.log(values);

          let timeZoneFirst = "GMT+05:30";

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

          var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
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

          props.addOpportunity(
            {
              ...values,
              customerId:selectedCustomer,
              contactId:selectedContact,
              cstmVl1Uom :selectedUom,
              cstmVl2Uom:selectedUom1,
              oppStage: selectedStage,
              oppWorkflow: selectedWorkflow,
              workFlowType:selectedWorkFlowType,
              startDate: `${newStartDate}T20:00:00Z`,
              endDate: `${newEndDate}T20:00:00Z`,
              included: selectedValues,
              description: text,
              salesUserIds: selectedOption ? selectedOption.employeeId:props.userId,
              emialInd:emailInd ? "true" : "false",
            },
            props.userId,
            props.customerId,
            resetForm()
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
          <div class="overflow-y-auto h-[32rem] overflow-x-hidden max-sm:h-[30rem]">
          <Form className="form-background">
            <div class=" flex justify-between max-sm:flex-col">
              <div class=" h-full w-[47.5%] mt-3 max-sm:w-wk">
              {props.customerConfigure.nameInd===true&&
              <>
              <div class="font-bold text-xs">{translatedMenuItems[0]}</div>
                <Field          
                  name="opportunityName"
                  type="text"
                  //label="Name"             
                  isColumn
                  width={"100%"}
                  component={InputComponent}              
                  inlineLabel
                />
                </>
              }
                
                <div class="flex justify-between max-sm:flex-col mt-3">
                {props.customerConfigure.startDateInd===true&&
                <div class=" w-w47.5.5 max-sm:w-wk">
                <div class="font-bold text-xs">{translatedMenuItems[1]}</div>
                    <Field
                      name="startDate"
                      //label="Start "                
                      component={DatePicker}
                      value={values.startDate}
                      isColumn
                      inlineLabel
                    />
                  </div>
}
{props.customerConfigure.endDateInd===true&&
                  <div class=" w-w47.5.5 max-sm:w-wk">
                  <div class="font-bold text-xs">{translatedMenuItems[2]}</div>
                    <Field
                      // isRequired
                      name="endDate"
                      // label="End Date"                 
                      isColumn
                      component={DatePicker}
                      value={values.endDate || values.startDate}
                      inlineLabel
                      disabledDate={(currentDate) => {
                        if (values.startDate) {
                          if (
                            dayjs(currentDate).isBefore(dayjs(values.startDate))
                          ) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                      }}
                    />
                  </div>
}
                </div>
               
              <div class="flex justify-between max-sm:flex-col mt-3">
                {props.customerConfigure.oppValueInd===true&&
                <div class=" w-w47.5.5 max-sm:w-wk">
                <div class="font-bold text-xs">{translatedMenuItems[3]}</div>
                    <Field
                      name="proposalAmount"       
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
                  </div>
}
{props.customerConfigure.potentialCurrencyInd===true&&
                  <div class=" w-w47.5.5 max-sm:w-wk">
                  <div class="font-bold text-xs">{translatedMenuItems[4]}</div>
                    <Field
                      name="currency"
                      isColumnWithoutNoCreate
                      defaultValue={{
                        value: props.user.currency,
                      }}                 
                      width="100%"
                      isColumn
                      isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(currencyNameOption)
                          ? currencyNameOption
                          : []
                      }
                    />
                  </div>
}
                </div>
                <div class="flex justify-between max-sm:flex-col mt-3">
                {/* {props.customerConfigure.customValue1Ind===true&&
                <div class=" w-w47.5.5 max-sm:w-wk">
                <div class="font-bold text-xs">
                Custom Value1
                    </div>
                    <Field
                      name="proposalAmount"      
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
   
                  </div>
} */}
                  {/* {props.customerConfigure.customValue2Ind===true&&
                  <div class=" w-w47.5.5 max-sm:w-wk">
                  <div class="font-bold text-xs">
                    Custom Value2
                    </div>
                    <Field
                      name="currency"
                      isColumnWithoutNoCreate
                      defaultValue={{
                        value: props.user.currency,
                      }}                 
                      width="100%"
                      isColumn
                      isRequired
                      component={SelectComponent}
                      options={
                        Array.isArray(currencyNameOption)
                          ? currencyNameOption
                          : []
                      }
                    />
   
                  </div>
} */}
                </div> 
                 <div class="flex justify-between max-sm:flex-col mt-3">
                 {props.customerConfigure.customValue2Ind===true&&
                <div class=" flex  w-w47.5.5 justify-between mt-4 max-sm:w-wk">
                  <div className=" w-w47.5.5 max-sm:w-wk">
                <div class="font-bold text-xs">{translatedMenuItems[13]}1
                {/* Custom 1 */}
                    </div>
                    <Field
                      name="customValue1"
                      //label="Value"          
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
                                                                       {/* <Switch
        checked={customValue1Visible}
    onChange={() => toggleFieldVisibility('customValue1')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          /> */}
          </div>
          <div className=" w-w47.5.5 max-sm:w-wk">
                <div class="font-bold text-xs">
               UOM
                    </div>
                    <Select
                        className="w-32"
                        onChange={handleUomChange1}
                      // value={Uom}
                        // onChange={(value) => setNewUom(value)} // `value` is passed directly by Select's onChange handler
                      >
                      
                      {props.UOMListData.map(uom => (
          <Option key={uom.unitName} value={uom.unitName}>
            {uom.unitName}
          </Option>
        ))}
                       
                      
                      </Select>
                    {/* <Field
                      name="proposalAmount"
                      //label="Value"          
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    /> */}
                                                                       {/* <Switch
        checked={customValue1Visible}
    onChange={() => toggleFieldVisibility('customValue1')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          /> */}
          </div>
                  </div>
}
                  {props.customerConfigure.customValue1Ind===true&&
                  <div class=" flex  w-w47.5.5 justify-between mt-4 max-sm:flex-col max-sm:w-wk" >
                  <div class=" w-w47.5.5 max-sm:w-wk">
                  <div class="font-bold text-xs">{translatedMenuItems[0]} 2
                    {/* Custom 2 */}
                    {/* {translatedMenuItems[4]} */}
                    </div>
                    <Field
                      name="customValue2"
                      //label="Value"          
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
                    
                    {/* <Field
                      name="currency"
                      isColumnWithoutNoCreate
                      defaultValue={{
                        value: props.user.currency,
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
                    /> */}
                                                                       {/* <Switch
        checked={customValue2Visible}
    onChange={() => toggleFieldVisibility('customValue2')}
          checkedChildren="Visible"
            unCheckedChildren="Hidden"
          /> */}
          <div> 
          </div>
          
                      </div>
                      <div class="w-w47.5.5 max-sm:w-wk">
          <div class="font-bold text-xs">
               UOM
                    </div>
                      <Select
                        className="w-32"
                        onChange={handleUomChange2}
                      // value={Uom}
                        // onChange={(value) => setNewUom(value)} // `value` is passed directly by Select's onChange handler
                      >
                      
                      {props.UOMListData.map(uom => (
          <Option key={uom.unitName} value={uom.unitName}>
            {uom.unitName}
          </Option>
        ))}
                       
                      
                      </Select>
                      </div>
                  </div>
}
                </div>
                {props.customerConfigure.descriptionInd===true&&
                <div class="mt-3">
                <ReactDescription
                setText={setText}
                text={text}
                />
              {/* <div>
                <span class="font-bold text-xs">{translatedMenuItems[5]}</span>
                Description
                   <span>
                    <span onClick={startListening}>
                      <Tooltip title="Start">
                        <span >
                          <RadioButtonCheckedIcon  className="!text-icon ml-1 text-red-600" />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={stopListening}>
                      <Tooltip title="Stop">
                        <span>
                          <StopCircleIcon   className="!text-icon ml-1 text-green-600" />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title="Clear">
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
                      onChange={handleTextChange}
                    ></textarea>
                  </div>
                  </div> */}
              </div>
}
              </div>

            <div
               class=" h-full w-[47.5%] max-sm:w-wk mr-1">
                            {props.customerConfigure.assignedToInd===true&&
              <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className=" font-bold text-[0.75rem] mt-[0.6rem]">
          {translatedMenuItems[6]}
              {/* Assigned */}
            </div>
            <div className="relative">
              <Listbox.Button style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
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
{props.customerConfigure.includeInd===true&&
       <div class=" mt-2" style={{display:"flex",flexDirection:"column"}}>    
                  <div className="font-bold text-xs">
                {translatedMenuItems[7]}
                    {/* Include */}
                    </div>
                   <Select
          showSearch

          placeholder="Search or select include"
          optionFilterProp="children"
          loading={isLoading}
          onFocus={handleSelectFocus}
          onChange={handleSelectChange}
          defaultValue={selectedValues} 
          mode="multiple" 
        >
          {include.map(includes => (
            <Option key={includes.employeeId} value={includes.employeeId}>
              {includes.empName}
            </Option>
          ))}
        </Select>
        </div>  
}      
<div class="flex justify-between max-sm:flex-col mt-[0.75rem]">
{props.customerConfigure.customerInd===true&&
<div class=" w-w47.5.5 max-sm:w-wk">                
<div className="font-bold text-xs">
{translatedMenuItems[8]}
  {/* Customer */}
  </div>
      <Select
       
        placeholder="Select Customer"
        loading={isLoadingCustomers}
        onFocus={handleSelectCustomerFocus}
        onChange={handleCustomerChange}
      >
        {customers.map(customer => (
          <Option key={customer.customerId} value={customer.customerId}>
            {customer.name}
          </Option>
        ))}
      </Select>
          
            </div>
}
{props.customerConfigure.contactInd===true&&
            <div class=" w-w47.5.5 max-sm:w-wk">                         

<div className= "font-bold text-[0.75rem]">
{translatedMenuItems[9]}  
{selectedCustomer&&(
<AddCircleIcon
  onClick={handleAddContact}
  style={{color:"red"}}
/>
)}
  {/* Contact */}
  </div>
      <Select
        placeholder="Select Contact"
        loading={isLoadingContacts}
        onChange={handleContactChange}
        disabled={!selectedCustomer} // Disable Contact dropdown if no customer is selected
      >
        {contacts.map(contact => (
          <Option key={contact.contactId} value={contact.contactId}>
            {contact.fullName}
          </Option>
        ))}
      </Select>            
                </div>
}
                        </div>





                        {isAddingContact && (
                        <div class="flex justify-between max-sm:flex-col mt-[0.75rem]">
<div class=" w-w47.5.5 max-sm:w-wk">                
<div className="font-bold text-xs">

  {/* Customer */}
  </div>
  <Input
              placeholder="First Name"
              name="firstName"
              style={{marginLeft:"-6px"}}
              value={newContact.firstName}
              onChange={handleInputChange}
            />
          
            </div>

            <div class=" w-w47.5.5 max-sm:w-wk">                
<div className="font-bold text-xs">

  {/* Customer */}
  </div>
  <Input
              placeholder="Last Name"
              name="lastName"
              style={{marginLeft:"-4px"}}
              value={newContact.lastName}
              onChange={handleInputChange}
            />
          
            </div>

            <div class=" w-w47.5.5 max-sm:w-wk">                         

<div className= "font-bold text-[0.75rem]">
 
  {/* Contact */}
  </div>
  <Input
              placeholder="Mobile No"
              name="phoneNumber"
              value={newContact.mobile}
             
              onChange={handleInputChange}
             
              style={{ flex: 1,marginLeft:"-1px" }} // Allow input to take full width
            />    


                </div>


                <div class=" w-w47.5.5 max-sm:w-wk">                         

<div className= "font-bold text-[0.75rem]">
 
  {/* Contact */}
  </div>
  <Select
        placeholder="Select dialcode"
        name="countryDialCode"
        style={{width:"80px"}}
      onChange={handleDialCodeChange}
      value={newContact.dialCode}
       
      >
        {props.dialcodeList.map(contact => (
          <Option key= {`+${contact.country_dial_code}`} value= {`+${contact.country_dial_code}`}>
            {/* {contact.country_dial_code} */}
           {`+${contact.country_dial_code}`}
          </Option>
        ))}
      </Select>   


                </div>




            <div class=" w-w47.5.5 max-sm:w-wk">                
<div className="font-bold text-xs">

  {/* Customer */}
  </div>
  <Input
              placeholder="Email"
              name="emailId"
              value={newContact.email}
              onChange={handleInputChange}
              onKeyPress={handleMobileKeyPress}
            />


<CancelIcon
              onClick={handleRemoveFields}
              style={{
                marginLeft: 8,
                cursor: 'pointer',
                color: 'red', // Change color for visibility
              }}
            />
          
            </div>
            
            
                        </div>
                        )}
      
                
                                          
      <div class="flex justify-between max-sm:flex-col mt-3">
      {props.customerConfigure.workFlowInd===true&&
                  <div class=" w-w47.5.5 max-sm:w-wk">
                   
<label style={{fontWeight:"bold",fontSize:"0.75rem"}}>{translatedMenuItems[10]}
  {/* Workflow */}
  </label>
      <Select
       
        placeholder="Select Workflow"
      loading={isLoadingWorkflowType}
        onChange={handleWorkflowChange}
        onFocus={handleSelectWorkflowTypeFocus}
        // disabled={!selectedWorkFlowType}
      >
        {workflow.map(work => (
          <Option key={work.workflowDetailsId} value={work.workflowDetailsId}>
            {work.workflowName}
          </Option>
        ))}
      </Select>
                  </div>
}
{props.customerConfigure.stageInd===true&&
                 
                  <div class=" w-w47.5.5 max-sm:w-wk ">
                  <label style={{fontWeight:"bold",fontSize:"0.75rem"}}>{translatedMenuItems[11]}
                  {/* Stage */}
                  </label>
      <Select
       
        placeholder="Select Stage"
        loading={isLoadingStage}
        onChange={handleStageChange}
      disabled={!selectedWorkflow}
      >
        {stage.map(stage => (
          <Option key={stage.stagesId} value={stage.stagesId}>
            {stage.stageName}
          </Option>
        ))}
      </Select>
                  </div>
}
                </div>
                {props.customerConfigure.documentInd===true&&
                <div class="mt-3">
                                        <Field
                                            name="excelId"
                                            // isRequired
                                            component={DraggableUpload1}
                                        />
                                    </div>
}
                                    <div class=" flex">
                                    {props.customerConfigure.autoEmailQtnInd===true&&
                  <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs">
                     Auto Email Quotation to receipient?
                    </div>
                      <div>
                      <Switch               
                          checked={emailInd}
                          onChange={handleEmailInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
}
                    </div>
              </div> 
             
            </div>
          
            <div class="flex justify-end w-wk bottom-[3.5rem] mr-2 absolute mt-3 ">
              <Button
                type="primary"
                htmlType="submit"
                loading={addingOpportunity}
              >
                <div class="font-bold font-poppins text-xs">    {translatedMenuItems[15]}
                   {/* Create */}
                   </div>
             
              </Button>
            </div>
          </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, settings,opportunity,employee,currency,investor, contact, customer,leads }) => ({
  user: auth.userDetails,
  crmAllData:leads.crmAllData,
  userId: auth.userDetails.userId,
  customerConfigure:settings.customerConfigure,
  organizationId: auth.userDetails.organizationId,
  contactId: contact.contactByUserId.contactId,
  customerId: customer.customer.customerId,
  initiativesByCustomerId: customer.initiativesByCustomerId,
  addingOpportunity: opportunity.addingOpportunity,
  addingOpportunityError: opportunity.addingOpportunityError,
  orgId: auth.userDetails.organizationId,
  oppLinkStages: opportunity.oppLinkStages,
  stages:opportunity.stages,
  contactByUserId: contact.contactByUserId,
  customerByUserId: customer.customerByUserId,
  initiatives: opportunity.initiatives,
  workflow:opportunity.workflow,
  token: auth.token,
  oppLinkWorkflow: opportunity.oppLinkWorkflow,
  organizationId: auth.userDetails.organizationId,
  customerData: customer.customerData,
  contactData: contact.contactData,
  fullName: auth.userDetails.fullName,
  allEmployeeList:investor.allEmployeeList,
  assignedToList:employee.assignedToList,
  currencies: auth.currencies,
  saleCurrencies: auth.saleCurrencies,
  dialcodeList: auth.dialcodeList,
  UOMListData:settings.UOMListData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addOpportunity,
      getCustomerConfigure,
      getAllDialCodeList,
      getContactData,
      getCustomerData,
      getInitiative,
      getOppLinkedWorkflow,
      getOppLinkedStages,
      getCrm,
      addMoreContact,
      getAllEmployeelist,
      getAssignedToList,
      getSaleCurrency,
      getUOM
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityForm);
