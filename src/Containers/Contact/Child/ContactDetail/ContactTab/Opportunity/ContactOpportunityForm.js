import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCustomerData } from "../../../../../Customer/CustomerAction";
import { getContactData,addContactOpportunity } from "../../../../../Contact/ContactAction";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button, Tooltip,Select } from "antd";
import { Formik, Form, Field, } from "formik";
import * as Yup from "yup";
import DraggableUpload1 from "../../../../../../Components/Forms/Formik/DraggableUpload1";
import {
  addOpportunity,
  getInitiative,
  getOppLinkedWorkflow,
  getOppLinkedStages,
} from "../../../../../Opportunity/OpportunityAction";
// import {getAssignedToList} from "../../../../../Employees/EmployeeAction"
import { getCrm} from "../../../../../Leads/LeadsAction";
import {getSaleCurrency} from "../../../../../Auth/AuthAction"
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { Listbox } from "@headlessui/react";
import { getAllEmployeelist } from "../../../../../Investor/InvestorAction";
import {base_url} from "../../../../../../Config/Auth";

/**
 * yup validation scheme for creating a opportunity
 */
const { Option } = Select; 
const OpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Input needed!"),
  oppWorkflow: Yup.string().required("Input needed!"),
  currency: Yup.string().required("Input needed!"),
  oppStage: Yup.string().required("Input needed!"),
  //customerId:Yup.string().required("Input needed!"),
});
function ContactOpportunityForm(props) {

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
           "110", //  "Name" 0
           "176",//1 Start Date
           "126",//2 End Date
             "218" ,//Value 3
            "241",//Currency" 4
            "147",//Description 5
            "76",// Assigned 6
            "75",//Include"7
           "141",//Workflow 8
           "219",//stages",//9
            "104",//Create
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  useEffect(() => {
    // props.getContactData(props.userId);
    // props.getCustomerData(props.userId);
    props.getInitiative(props.userId);
     props.getOppLinkedStages(props.orgId);
     props.getOppLinkedWorkflow(props.orgId);
     props.getCrm();
    //  props.getAssignedToList(props.orgId);
     props.getAllEmployeelist();
     props.getSaleCurrency();
  }, []);

  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);

  const [include, setInclude] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);


  const [customers, setCustomers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [touchedCustomer, setTouchedCustomer] = useState(false);

  // useEffect(() => {
  //   fetchCustomers();
  // }, []);

  const fetchInclude = async () => {
    setIsLoading(true);
    try {
      const apiEndpoint = `${ base_url}/employee/active/user/drop-down/${props.organizationId}`;
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
        // Replace 'propertyToSortBy' with the actual property you want to sort by
        const propertyToSortByA = a.label.toLowerCase();
        const propertyToSortByB = b.label.toLowerCase();
        
        // Use localeCompare for case-insensitive string comparison
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

  const {
    user: { userId,empName, },
    addingOpportunity,
    startDate,
    employeeId,
    endDate,
  } = props;
  const selectedOption = props.crmAllData.find((item) => item.empName === selected);
  console.log(selectedValues)
  return (
    <>
      <Formik
        initialValues={{
          opportunityName: "",
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
          contactId:props.contactId,
          salesUserIds: selectedOption ? selectedOption.employeeId:props.userId,
          // included: selectedValues,
        }}
        validationSchema={OpportunitySchema}
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

          props.addContactOpportunity(
            {
              ...values,
              
              startDate: `${newStartDate}T20:00:00Z`,
              endDate: `${newEndDate}T20:00:00Z`,
              included: selectedValues,
              description: transcript ? transcript : text,
              salesUserIds: selectedOption ? selectedOption.employeeId:props.userId,
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
          ...res
        }) => (
          <div class="overflow-y-auto  overflow-x-hidden max-sm:h-[30rem]">
          <Form className="form-background h-[40rem]">
            <div class=" flex justify-between max-sm:flex-col ">
              <div class=" h-full w-[47.5%]  max-sm:w-wk">
              <div className="font-semibold font-poppins  text-black text-xs">{translatedMenuItems[0]}</div>
                <Field
                  isRequired
                  name="opportunityName"
                  type="text"
                  //label="Name"          
                  isColumn
                  width={"100%"}
                  component={InputComponent}
                  // accounts={accounts}
                  inlineLabel
                />
                <div class=" mt-3" />
                <div class="flex justify-between max-sm:flex-col">
                <div class=" w-w47.5.5 max-sm:w-wk">
                <div className="font-semibold font-poppins  text-xs">{translatedMenuItems[1]}</div>
                    <Field
                      name="startDate"
                      //label="Start "                 
                      component={DatePicker}
                      value={values.startDate}
                      isColumn
                      inlineLabel
                    />
                  </div>
                  <div class=" w-w47.5.5 max-sm:w-wk">
                  <div className="font-semibold font-poppins  text-black text-xs">{translatedMenuItems[2]}</div>
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
                </div>
                <div class=" mt-3" />
                <div class="flex justify-between max-sm:flex-col">
                <div class=" w-w47.5.5 max-sm:w-wk">
                <div className="font-semibold font-poppins text-black  text-xs">{translatedMenuItems[3]}</div>
                    <Field
                      name="proposalAmount"
                      //label="Value"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
                  </div>
                  <div class=" w-w47.5.5 max-sm:w-wk">
                  <div className="font-semibold font-poppins  text-black text-xs">{translatedMenuItems[4]}</div>
                    <Field
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
                    />
                  </div>
                </div>
                <div class=" mt-3" />
                <div>
                <span class=" text-xs font-semibold  text-black font-poppins">{translatedMenuItems[5]}
                  {/* Description */}                  </span>           
                    <span>
                    <span onClick={SpeechRecognition.startListening}>
                      <Tooltip title="Start">
                        <span className="!text-icon text-red-600">
                          <PlayCircleFilledIcon />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={SpeechRecognition.stopListening}>
                      <Tooltip title="Stop">
                        <span
                        className="!text-icon ml-[3px] text-green-700"
                        >
                          <StopCircleIcon />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title="Clear">
                        <span  className="!text-icon ml-[3px]">
                          <RotateRightIcon />
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
               
              </div>
              </div>
            <div
               class=" h-full w-[47.5%] max-sm:w-wk">
              <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className=" font-semibold text-xs  text-black ">
            {translatedMenuItems[6]}
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

       <div class=" mt-2 flex flex-col"> 
                  <div className="font-semibold  text-black font-poppins text-xs">{translatedMenuItems[7]}
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
<div class="flex justify-between max-sm:flex-col mt-[0.85rem]">
<div class=" w-w47.5.5 max-sm:w-wk">
                       
            </div>
         
                        </div>                         
                <div class=" mt-1" />

                <div class="flex justify-between max-sm:flex-col">
                  <div class=" w-w47.5.5 max-sm:w-wk">
                    <div class=" text-xs font-semibold font-poppins text-black">
                    {translatedMenuItems[8]}
                    {/* Workflow */}
                      <Field
                        name="oppWorkflow"
                        // selectType="contactListFilter"
                        isColumnWithoutNoCreate
                        isRequired
                        placeolder="Select type"                     
                        // component={SearchSelect}
                        component={SelectComponent}
                        options={
                          Array.isArray(WorkflowOptions) ? WorkflowOptions : []
                        }
                        value={values.oppWorkflow}
                        isColumn
                        inlineLabel
                      />
                    </div>
                  </div>
                  <div class=" mt-1" />
                  <div class=" w-w47.5.5 max-sm:w-wk">
                    <div class=" text-xs font-semibold font-poppins text-black">
                    {translatedMenuItems[9]}
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
                <div class="mt-3">
                                        <Field
                                            name="excelId"
                                            // isRequired
                                            component={DraggableUpload1}
                                        />
                                    </div>
              </div> 
  
            </div>
            <div class=" mt-3" />
            <div class="flex justify-end w-wk bottom-[3.5rem] mr-2 absolute ">
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingContactOpportunity}
              >
                <div class=" text-xs font-semibold font-poppins">
                {translatedMenuItems[10]}</div>
                {/* Create */}
              </Button>
            </div>
          </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, opportunity,employee,currency,investor, contact, customer,leads }) => ({
  user: auth.userDetails,
  crmAllData:leads.crmAllData,
  addingContactOpportunity:contact.addingContactOpportunity,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  //contactId: contact.contactByUserId.contactId,
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addOpportunity,
      getContactData,
      getCustomerData,
      getInitiative,
      getOppLinkedWorkflow,
      getOppLinkedStages,
      getCrm,
      getAllEmployeelist,
      // getAssignedToList,
      addContactOpportunity,
      getSaleCurrency
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactOpportunityForm);
