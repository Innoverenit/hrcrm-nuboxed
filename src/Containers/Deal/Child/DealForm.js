import React,{ useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCustomerData,getInvestorData } from "../../Customer/CustomerAction";
import { getdealsContactdata } from "../../Contact/ContactAction";

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ReactDescription from "../../../Components/ReactSpeech/ReactDescription"
import {getInvestorCurrency} from "../../Auth/AuthAction"
import {getAllEmployeelist} from "../../Investor/InvestorAction"
import { Button, Tooltip,Select } from "antd";
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {
  getRecruiterName,
  getInitiative,
  getStages,
} from "../../Opportunity/OpportunityAction";
import {getSources} from "../../Settings/Category/Source/SourceAction"
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { Listbox } from "@headlessui/react";
import {createDeals,  getAllDealStages,
  getDealLinkedWorkflow,
  getDealLinkedStages,
  getActiveAssignedToList
} from "../DealAction";
import { base_url } from "../../../Config/Auth";

const { Option } = Select; 

const OpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Input needed!"),
 // oppWorkflow: Yup.string().required("Input needed!"),
  currency: Yup.string().required("Input needed!"),
  //oppStage: Yup.string().required("Input needed!"),
});
function DealForm(props) {
  const [loading, setLoading] = useState(true);
  const [workflow, setWorkflow] = useState([]);
  const[stage,setStage]=useState([])
const [isLoadingStage, setIsLoadingStage] = useState(false);
const [selectedStage, setSelectedStage] = useState(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [selectedWorkFlowType, setSelectedWorkFlowType] = useState(null);
  const [isLoadingWorkflowType, setIsLoadingWorkflowType] = useState(false);
  const [touchedWorkFlowType, setTouchedWorkFlowType] = useState(false);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  
  useEffect(() => {
    props.getInvestorCurrency();
    props.getRecruiterName();
    props.getAllEmployeelist();
    props.getActiveAssignedToList(props.orgId,"Included");
    props.getSources(props.orgId);
    props.getdealsContactdata(props.userId);
    props.getInvestorData(props.userId)
     props.getDealLinkedStages(props.orgId);
    props.getDealLinkedWorkflow(props.orgId);
    props.getAllDealStages(props.orgId);
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
          "110",//0 Name
          "176",//1 Start Date
              "126",//2 End Date
              "218",//3 Value
              "241",// 4 Currency
              "147",//5 Description
              "76",//13 Assigned
              "75",//7 Include
              "511",//8 Investor
              "73",//9 Contact
              "141",//10 Workflow
              "219",//11 Stages
              '104'// Create
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


  function getAreaOptions(filterOptionKey, filterOptionValue) {
    const contactOptions =
      props.dealsContactData.length &&
      props.dealsContactData
        .filter((option) => {
          if (
            option.investorId === filterOptionValue &&
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
  }


  function getStagesOptions(filterOptionKey, filterOptionValue) {
    const StagesOptions =
      props.dealLinkStages.length &&
      props.dealLinkStages
        .filter((option) => {
          if (
            option.investorOppWorkflowId === filterOptionValue &&
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
          // label: option.stageName || "",
          label: `${option.stageName}  ${option.probability}`,
          value: option.investorOppStagesId,
        }));

    return StagesOptions;
  }

  const WorkflowOptions = props.dealLinkWorkflow.map((item) => {
    return {
      label: `${item.workflowName || ""}`,
      value: item.investorOppWorkflowId,
    };
  });

  const AllEmplo = props.activeAssignedToList.map((item) => {
    return {
      label: `${item.empName || ""}`,
      value: item.employeeId,
    };
  });
  const filteredEmployeesData = AllEmplo.filter(
    (item) => item.value !== props.user.userId
  );
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
    //  value: item.currency_id,
    value: item.currency_name,
    };
  });

  const customerNameOption = props.investorData
  
    .map((item) => {
      return {
        label: `${item.name || ""}`,
        value: item.investorId,
      };
    });

    const sortedSource =props.sources.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      // Compare department names
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    const sourceOptions = sortedSource.map((item) => {
      return {
        label: `${item.name}`,
        value: item.sourceId,
      };
    });
 

  const allEmplo = props.allEmployeeList.map((item) => {
    return {
      label: `${item.empName || ""}`,
      value: item.employeeId,
    };
  });
  const [text, setText] = useState("");
  function handletext(e) {
 
    setText(e.target.value);

  }


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
  const handleSelectWorkflowTypeFocus = () => {
    if (!touchedWorkFlowType) {
      fetchWorkFlowType();
      // fetchSector();
  
      setTouchedWorkFlowType(true);
    }
  };
  const handleStageChange=(value)=>{
    setSelectedStage(value);
  }

  const fetchWorkFlowType = async () => {
    setIsLoadingWorkflowType(true);
    try {
      // const response = await axios.get('https://develop.tekorero.com/employeePortal/api/v1/customer/user/${props.userId}');
      // setCustomers(response.data);
      const apiEndpoint = `${base_url}/workflow/publish/for_dropdown/${props.organizationId}/Deals`;
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
    user: { userId,empName },
    creatingDeal,
    employeeId,
    salesUserIds,
    fullName,
    contactId,
    customerId,
    startDate,
    endDate,
    defaultCustomers,
    defaultContacts,
    name,
  } = props;
  const selectedOption = props.allEmployeeList.find((item) => item.empName === selected);
  console.log(props.dealsContactData)
  console.log( props.dealLinkStages)
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
          currency: props.user.currency,
          orgId: props.organizationId,
          userId: props.userId,
          customerId: undefined,
          oppWorkflow: "",
          contactId: undefined?"":null,
          oppInnitiative: "",
          oppStage: "",
          source:"",
          included:[],
          salesUserIds: selectedOption ? selectedOption.employeeId:props.userId,
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
          
          props.createDeals(
            {
              ...values,
              startDate: `${newStartDate}T20:00:00Z`,
              oppStage: selectedStage,
              oppWorkflow: selectedWorkflow,
              endDate: `${newEndDate}T20:00:00Z`,
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
          ...rest
        }) => (
          <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
          <Form className="form-background">
            <div class=" flex justify-around max-sm:flex-col">
              <div class=" h-full w-w47.5.5 max-sm:w-wk">
              <div class=" text-xs font-bold font-poppins ">
               {translatedMenuItems[0]} 
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
                <div class=" text-xs font-bold font-poppins w-w47.5.5 max-sm:w-wk">
               {translatedMenuItems[1]}
                    <Field
                      name="startDate"
                      //label="Start "                 
                      component={DatePicker}
                      value={values.startDate}
                      isColumn
                      inlineLabel
                    />
                  </div>
                  <div class=" text-xs font-bold font-poppins w-w47.5.5 max-sm:w-wk">
               {translatedMenuItems[2]} 
                    <Field         
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
               
                <div class="flex justify-between max-sm:flex-col mt-3">
                <div class="  text-xs font-bold font-poppins w-w47.5.5 max-sm:w-wk">
               {translatedMenuItems[3]} 
                    <Field
                      name="proposalAmount"
                      //label="Value"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
                  </div>
                  <div class=" text-xs font-bold font-poppins w-w47.5.5 max-sm:w-wk">
                  {translatedMenuItems[4]} 
                  <Field
                      name="currency"
                      isColumnWithoutNoCreate
                      defaultValue={{
                        value: props.currency_name
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
                <div class="mt-3">   
                <ReactDescription
                setText={setText}
                text={text}
                />
                {/* <div>
                <span class="font-bold font-poppins m-[0.1rem-0-0.02rem-0.2rem] text-xs ">
                  {translatedMenuItems[5]}     
                Description         
                        </span>
               
                  <span>
                    <span onClick={SpeechRecognition.startListening}>
                      <Tooltip title="Start">
                      <RadioButtonCheckedIcon className="!text-icon ml-1 text-red-600"/>                         
                      </Tooltip>
                    </span>

                    <span onClick={SpeechRecognition.stopListening}>
                      <Tooltip title="Stop">
                        <span   >
                        <StopCircleIcon className="!text-icon ml-1 text-green-600" />                                
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title="Clear">
                        <span>
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
            <div
               class="text-xs font-bold font-poppins h-full w-w47.5.5 max-sm:w-wk">
                  {translatedMenuItems[6]} 
                  {/* Assigned */}
              <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>         
            <div className="relative ">
              <Listbox.Button className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} >
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
<div class="text-xs font-bold font-poppins mt-2">
{translatedMenuItems[7]} 
<Field
                    name="included"
                    // label="Include"                
                    mode
                    placeholder="Select"
                    component={SelectComponent}
                    options={Array.isArray(filteredEmployeesData) ? filteredEmployeesData : []}
                    value={values.included}
                    defaultValue={{
                      label: `${empName || ""} `,
                      value: employeeId,
                    }}
                  />
  </div>
                
<div class="mt-2 flex justify-between max-sm:flex-col">
<div class=" w-w47.5.5 max-sm:w-wk mt-1">
<div class="font-bold font-poppins m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
{translatedMenuItems[8]}
                  <Field
                    name="investorId"
                    // selectType="customerList"
                    isColumnWithoutNoCreate                
                    component={SelectComponent}
                    options={
                      Array.isArray(customerNameOption)
                        ? customerNameOption
                        : []
                    }
                    isColumn                 
                    value={values.investorId}
                    inlineLabel
                  />
                </div>
            </div>
                <div class=" w-w47.5.5 max-sm:w-wk">
                <Field
                            name="source"
                             label="source"                             
                            isColumnWithoutNoCreate
                            component={SelectComponent}
                    options={
                      Array.isArray(sourceOptions)
                        ? sourceOptions
                        : []
                    }
                   isColumn
                          />
                        </div>
                        </div>
                        <div class="font-bold font-poppins m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-2">
                       {translatedMenuItems[9]} 
                  <Field
                    name="contactId"
                    // selectType="contactListFilter"
                    isColumnWithoutNoCreate               
                    component={SelectComponent}
                    options={
                      Array.isArray(
                        getAreaOptions("investorId", values.investorId)
                      )
                        ? getAreaOptions("investorId", values.investorId)
                        : []
                    }
                    value={values.contactId}
                    filterOption={{
                      filterType: "investorId",
                      filterValue: values.investorId,
                    }}
                    disabled={!values.investorId}
                    isColumn
                    inlineLabel
                  />
                </div>
               
           
                <div class="flex justify-between max-sm:flex-col mt-3">
                  <div class=" w-w47.5.5 max-sm:w-wk">
                  <div class="font-bold font-poppins m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
               {translatedMenuItems[10]} 
                      {/* <Field
                        name="oppWorkflow"
                        // selectType="contactListFilter"
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
                      /> */}

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
                  </div>
                  
                  <div class=" w-w47.5.5 max-sm:w-wk ">
                  <div class="font-bold font-poppins m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                  {translatedMenuItems[11]} 

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
                  </div>
                </div>
              </div> 
  
            </div>
           
            <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute  mt-3">
              <Button
                type="primary"
                htmlType="submit"
                loading={creatingDeal}
              >
                 <div class=" text-xs font-bold font-poppins"> {translatedMenuItems[12]}</div> 
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

const mapStateToProps = ({ auth,source,investor, opportunity,deal,settings,employee, contact, customer }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  contactId: contact.contactByUserId.contactId,
  customerId: customer.customer.customerId,
  initiativesByCustomerId: customer.initiativesByCustomerId,
  creatingDeal: deal.creatingDeal,
  creatingDealError: deal.creatingDealError,
  recruiterName: opportunity.recruiterName,
  orgId: auth.userDetails.organizationId,
  // salesUserIds:auth.userDetails.userId,
  sales: opportunity.sales,
  allEmployeeList:investor.allEmployeeList,
  dealStages: deal.dealStages,
  investorCurrencies: auth.investorCurrencies,
  contactByUserId: contact.contactByUserId,
  customerByUserId: customer.customerByUserId,
  initiatives: opportunity.initiatives,
  dealLinkWorkflow:deal.dealLinkWorkflow,
  dealLinkStages:deal.dealLinkStages,
  dealsProcess: settings.dealsProcess,
  customerData: customer.customerData,
  investorData:customer.investorData,
  token: auth.token,
  dealsContactData: contact.dealsContactData,
  fullName: auth.userDetails.fullName,
  sources: source.sources,
  creatingDeal:deal.creatingDeal,
  activeAssignedToList:deal.activeAssignedToList,
  // opportunitySkills:opportunity.opportunitySkills
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createDeals,
      getInvestorCurrency,
      getdealsContactdata,
      getRecruiterName,
      getAllEmployeelist,
      // getInitiativeByCustomerId,
      getCustomerData,
      getInvestorData,
      getInitiative,
      getActiveAssignedToList,
      // getWorkflow,
      getStages,
      getSources,
      getDealLinkedWorkflow,
      getDealLinkedStages,
      getAllDealStages
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DealForm);
