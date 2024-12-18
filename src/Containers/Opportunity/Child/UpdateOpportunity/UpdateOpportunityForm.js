import React, { useState,useEffect,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select,Tooltip } from "antd";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {getSaleCurrency} from "../../../Auth/AuthAction"
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { updateOpportunity, getAllSalesList } from "../../OpportunityAction";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { getOppLinkedWorkflow, getOppLinkedStages } from "../../OpportunityAction";
import { getCustomerData } from "../../../Customer/CustomerAction";
import { getContactData } from "../../../Contact/ContactAction";
import { Listbox } from "@headlessui/react";
import { getCrm} from "../../../Leads/LeadsAction";
import {getAssignedToList} from "../../../Employees/EmployeeAction"
import { getAllEmployeelist } from "../../../Investor/InvestorAction";
import { BundleLoader } from "../../../../Components/Placeholder";
import {base_url} from "../../../../Config/Auth";

const { Option } = Select;
/**
 * yup validation scheme for creating a opportunity
 */

const UpdateOpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Please provide Opportunity name"),
  customerId:Yup.string().required("Input needed!"),
  currency: Yup.string().required("Currency needed!"),
  startDate: Yup.string().required("Input needed!"),
  endDate: Yup.string().required("Input needed!"),
  // salesUserIds: Yup.string().required("Input needed!"),
  oppWorkflow: Yup.string().required("Input needed!"),
});
function UpdateOpportunityForm (props) {
  const [customers, setCustomers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [touchedCustomer, setTouchedCustomer] = useState(false);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

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
'76', // 5
'75', // 6
'248', // 7
'73', // 8
'141', // 9
'219', // 10
'1246'//11 update
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


  useEffect(()=> {
    props.getCustomerData(props.userId);
    props.getContactData(props.userId);
    props.getOppLinkedWorkflow(props.orgId);
    props.getOppLinkedStages(props.orgId);
    props. getCrm();
    props.getAllEmployeelist();
    props.getAssignedToList(props.orgId);
    props.getSaleCurrency();
  },[]);
//   const includeOption = opportunities.map(opportunity => opportunity.included);
// const allIncluded = mappedIncluded.flat();
  useEffect(() => {
    console.log("helo")
    const includeOption = props.setEditingOpportunity.included===null?[]: props.setEditingOpportunity.included.map((item) => {
      return item.empName
    })
      
    setInclude(includeOption)
    console.log("test", includeOption)
  
  }, [props.setEditingOpportunity]);

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
  const includeOption = props.setEditingOpportunity.included===null?[]: props.setEditingOpportunity.included.map((item) => {
    return item.empName
  })
  const [includeNames, setInclude] = useState(includeOption);
  function handleChangeInclude(value) {
    setInclude(value)
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
          label: `${option.stageName}  ${option.probability}`,
          value: option.opportunityStagesId,
        }));

    return StagesOptions;
  }

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

    const getAreaOptions = (filterOptionKey, filterOptionValue) => {
      const contactOptions =
        props.contactData.length &&
        props.contactData
          .filter((option) => {
            if (
              option.customerId === filterOptionValue &&
              option.probability !== 0
            ) {
              return option;
            }
          })
          .map((option) => ({
            label: option.fullName || "",
            value: option.contactId,
          }));

      return contactOptions;
    };

    const WorkflowOptions = props.oppLinkWorkflow.map((item) => {
      return {
        label: `${item.workflowName || ""}`,
        value: item.opportunityWorkflowDetailsId,
      };
    });
  
    const AllEmplo = props.assignedToList.map((item) => {
      return {
        label: `${item.empName || ""}`,
        value: item.employeeId,
      };
    });
    // const {
    //   transcript,
    //   listening,
    //   resetTranscript,
    //   browserSupportsSpeechRecognition,
    // } = useSpeechRecognition();
  
    // if (!browserSupportsSpeechRecognition) {
    //   return <span>Browser doesn't support speech recognition.</span>;
    // }

    const {
      user: { userId,empName, },
      updateOpportunityById,
      startDate,
      endDate,
      employeeId,
    } = props;


    // const [text, setText] = useState("");
      const [defaultOption, setDefaultOption] = useState(props.setEditingOpportunity.assignedTo);
      const [selected, setSelected] = useState(defaultOption);
      const selectedOption = props.crmAllData.find((item) => item.empName === selected);

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
     


      if (loading) {
        return <div><BundleLoader/></div>;
      }
    return (
      <>
        <Formik
          initialValues={{
            opportunityName:
              props.setEditingOpportunity.opportunityName || "",
            startDate:
              dayjs(props.setEditingOpportunity.startDate) || dayjs(),
            endDate: dayjs(props.setEditingOpportunity.endDate) || dayjs(),
            // endDate: endDate || null,
            oppWorkflow:"",
            oppStage:"",
            // oppWorkflow: props.setEditingOpportunity.oppWorkflow || "",
            // oppStage: props.setEditingOpportunity.oppStage || "",
           
            // description: props.setEditingOpportunity.description || "",
            proposalAmount:
              props.setEditingOpportunity.proposalAmount || "",
            currency: props.setEditingOpportunity.currency || "",
            salesUserIds: selectedOption ? selectedOption.employeeId:props.setEditingOpportunity.salesUserIds,
            customerId: props.setEditingOpportunity.customerId || "",
            contactId: props.setEditingOpportunity.contactId || "",
            // included:[],
            included: includeNames,
          }}
          validationSchema={UpdateOpportunitySchema}
          onSubmit={(values, { resetForm }) => {
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

            props.updateOpportunity(
              {
                ...values,
                included: includeNames,
                opportunityId: props.opportunityId,
                orgId: props.organizationId,
                customerId:selectedCustomer,
                contactId:selectedContact,
                description: text,
                // description: transcript ? transcript : text,
                // customerId: props.customerId,
                userId: props.userId,
                startDate: `${newStartDate}T00:00:00Z`,
                endDate: `${newEndDate}T00:00:00Z`,
                salesUserIds: selectedOption ? selectedOption.employeeId:props.setEditingOpportunity.salesUserIds,
              },
              props.opportunityId,
              () => props.handleReset(resetForm)
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
                <div class=" h-full w-[47.5%] max-sm:w-wk">
                 
                  <div className="mt-3">
                    <div class="font-bold text-xs">{translatedMenuItems[0]}</div>
                    <Field
                      isRequired
                      name="opportunityName"
                      type="text"
                      //label="Name"                
                      isColumn
                      width={"100%"}
                      component={InputComponent}                   
                      inlineLabel
                    />
                  </div>
                
                  <div class="flex justify-between max-sm:flex-col mt-3">
                    <div class=" w-1/2 max-sm:w-wk">
                    <div class="font-bold text-xs">{translatedMenuItems[1]}</div>
                        <Field
                          isRequired
                          name="startDate"
                          //label="Start Date"                       
                          component={DatePicker}
                          value={values.startDate}
                          isColumn
                          inlineLabel
                        />
                     
                    </div>
                    <div class=" w-2/5 max-sm:w-wk">
                    <div class="font-bold text-xs">{translatedMenuItems[2]}</div>
                        <Field
                          isRequired
                          name="endDate"
                          // label="End Date"                      
                          isColumn
                          component={DatePicker}
                          value={values.endDate || values.startDate}
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
                  </div>
                  
                  <div class="flex justify-between max-sm:flex-col mt-2">
                    <div class=" w-1/2 max-sm:w-wk">
                    <div class="font-bold text-xs">{translatedMenuItems[3]}</div>
                        <Field
                          name="proposalAmount"
                          // label="Value"                                 
                          isColumn
                          isRequired
                          width={"100%"}
                          component={InputComponent}
                        />
                   
                    </div>
                    <div class=" w-2/5 max-sm:w-wk mt-1">
                    <div class="font-bold text-xs">{translatedMenuItems[4]}</div>
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        // label="currencyName"                   
                        isColumn
                        defaultValue={{
                          value: props.user.currency,
                        }}
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
                  
                <div class=" text-xs font-bold font-poppins text-black">Description</div>
                <div>
                  <div>
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
                        <span style={{ fontSize: "1.5em", marginLeft: "3px" }}>
                          <RotateRightIcon />
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
                </div>
                <div class=" h-full w-[47.5%] max-sm:w-wk mr-1">
                <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className=" font-bold text-[0.75rem] mt-[0.6rem]">
          {translatedMenuItems[5]}
            {/* Assigned */}
            </div>
          <div className="relative mt-1">
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
    <div>
    <div class=" text-black font-bold text-[0.75rem] mt-2" >
     {translatedMenuItems[6]}
      {/* Include */}
      </div>
    <Select
                        name="included"
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select"
                        defaultValue={includeNames}
                        onChange={handleChangeInclude}
                      >
  
                        {props.assignedToList.map((item, i) => {
                          return (
                            <Option value={item.employeeId}>{item.empName}</Option>
                          )
                        })}
                      </Select>
   
    </div>
    <div class="flex justify-between max-sm:flex-col  mt-3">       
    <div class=" w-[47.5%] max-sm:w-wk">              
                 <div class=" text-black font-bold text-xs" >
                {translatedMenuItems[7]}
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
              
                  <div class=" w-[47.5%] max-sm:w-wk ">               
              <div class=" text-black font-bold text-xs" >
              {translatedMenuItems[8]}
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
     </div>
                
                  <div class="flex justify-between max-sm:flex-col mt-3">
                    <div class=" w-[47.5%] max-sm:w-wk">
                    <div class="font-bold text-xs">{translatedMenuItems[9]}</div>
                      <Field
                        name="oppWorkflow"                     
                        isColumnWithoutNoCreate
                        isRequired
                        placeolder="Select type"
                        component={SelectComponent}
                        options={
                          Array.isArray(WorkflowOptions) ? WorkflowOptions : []
                        }
                        value={values.oppWorkflow}
                        isColumn
                        inlineLabel
                      />
                 
                    </div>
                  
                    <div class=" w-[47.5%] max-sm:w-wk ">     
                        <div class="font-bold text-xs">{translatedMenuItems[10]}</div>             
                      <Field
                        name="oppStage"
                        isRequired
                        isColumnWithoutNoCreate                  
                        component={SelectComponent}
                        options={
                          Array.isArray(
                            getStagesOptions("oppWorkflow", values.oppWorkflow)
                          )
                            ? getStagesOptions(
                                "oppWorkflow",
                                values.oppWorkflow
                              )
                            : []
                        }
                        value={values.oppStage}
                        filterOption={{
                          filterType: "oppWorkflow",
                          filterValue: values.oppWorkflow,
                        }}
                        disabled={!values.oppWorkflow}
                        isColumn
                        inlineLabel
                      />
                 
                    </div>
                  </div>
                 
                </div>
              </div>
             
              <div class="flex justify-end w-wk bottom-[3.5rem] mr-2 absolute mt-3 ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateOpportunityById}
                >
                 <div class="font-bold font-poppins text-xs">{translatedMenuItems[11]}</div>
                  {/* Update */}
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
}

const mapStateToProps = ({ auth, opportunity,currency,employee, customer,leads, contact,investor }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  setEditingOpportunity: opportunity.setEditingOpportunity,
  updateOpportunityById: opportunity.updateOpportunityById,
  sales: opportunity.sales,
  oppLinkWorkflow: opportunity.oppLinkWorkflow,
  oppLinkStages: opportunity.oppLinkStages,
  contactData: contact.contactData,
  customerData: customer.customerData,
  crmAllData:leads.crmAllData,
  orgId: auth.userDetails.organizationId,
  allEmployeeList:investor.allEmployeeList,
  saleCurrencies: auth.saleCurrencies,
  assignedToList:employee.assignedToList,
  currencies: auth.currencies,
  token: auth.token,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateOpportunity,
      getAllSalesList,
      getOppLinkedWorkflow,
      getOppLinkedStages,
      getContactData,
      getCustomerData,
      getCrm,
      getAssignedToList,
      getAllEmployeelist,
      getSaleCurrency
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateOpportunityForm);
