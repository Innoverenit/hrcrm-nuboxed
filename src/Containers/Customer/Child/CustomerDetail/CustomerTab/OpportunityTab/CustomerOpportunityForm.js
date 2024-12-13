import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button ,Select} from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {getCurrency} from "../../../../../Auth/AuthAction"
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { addCustomerOpportunity } from "../../../../CustomerAction";
import { getWorkflow, getStages,
} from "../../../../../Opportunity/OpportunityAction";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { getCrm} from "../../../../../Leads/LeadsAction";
import { Listbox, } from '@headlessui/react'
import { base_url } from "../../../../../../Config/Auth";
/**
 * yup validation scheme for creating a opportunity
 */
const { Option } = Select; 
const OpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Please provide Opportunity name"),
  currency: Yup.string().required("Currency needed!"),
  //oppWorkflow: Yup.string().required("Input needed!"),
  //oppStage: Yup.string().required("Input needed!"),
});
function CustomerOpportunityForm(props) {



  const [isLoadingWorkflow, setIsLoadingWorkflow] = useState(false);

  const [workflow, setWorkflow] = useState([]);

  const [selectedWorkFlowType, setSelectedWorkFlowType] = useState(null);
  const [isLoadingWorkflowType, setIsLoadingWorkflowType] = useState(false);
  const [touchedWorkFlowType, setTouchedWorkFlowType] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  const[stage,setStage]=useState([])
  const [isLoadingStage, setIsLoadingStage] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]); 
  const handleReset = (resetForm) => {
    resetForm();
  };

  useEffect(() => {
    props.getCurrency();
    props.getWorkflow(props.orgId);
    props.getStages(props.orgId);
    props. getCrm();
  }, []);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        const itemsToTranslate = [
          '110', // 0 Name
          '176', // 1 Start Date
          '126', // 2 End Date
          '218', // 3 Value
          '241', // 4 cureency
          "147",//5 Description
          '76', // 6Assigned
          '75', // 7 include
          '248', // 8customer
          '73', // 9 contact
          '141', // 10workflow
          '104', // 11
          '219',//12
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
      } catch (error) {
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
  const {
    addingCustomerOpportunity,
    customerId,
    startDate,
    endDate,
    defaultCustomers,
    userId,
  } = props;


  function getAreaOptions(filterOptionKey, filterOptionValue) {
    const contactOptions =
      props.contactByUserId.length &&
      props.contactByUserId
        .filter((option) => {
          if (option.customerId === filterOptionValue && option.probability !== 0) {
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
      props.stages.length &&
      props.stages
        .filter((option) => {
          if (option.opportunityWorkflowDetailsId === filterOptionValue && option.probability !== 0) {
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
  const WorkflowOptions = props.workflow.map((item) => {
    return {
      label: `${item.workflowName || ""}`,
      value: item.opportunityWorkflowDetailsId,
    };
  });
  const sortedCurrency =props.currencies.sort((a, b) => {
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




  const handleSelectWorkflowTypeFocus = () => {
    if (!touchedWorkFlowType) {
      fetchWorkFlowType();
      // fetchSector();
  
      setTouchedWorkFlowType(true);
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
  


  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);
  const selectedOption = props.sales.find((item) => item.fullName === selected);
  
  return (
    <>
      <Formik
        initialValues={{
          opportunityName: "",
          // startDate: "",
          // endDate: "",
          startDate: startDate || dayjs(),
          endDate: endDate || null,
          endDate: dayjs(),
          proposalAmount: "",
          // contactId:"",

          currency: props.user.currency,
          orgId: props.organizationId,
          customerId: customerId ? customerId.value : "",
          contactId: customerId ? customerId.value : "",
          description: "",
          salesUserIds: selectedOption ? selectedOption.employeeId:userId,
          opportunitySkill: [
            {
              noOfPosition: "",
              oppInnitiative: "",
              // opportunityId: "",
              // opportunitySkillLinkId: "",
              skill: ""
            }
          ],

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
          props.addCustomerOpportunity(
            {
              ...values,
              startDate: `${newStartDate}T00:00:00Z`,
              endDate: `${newEndDate}T00:00:00Z`,
              customerId: props.customerId,
              userId: props.userId,
              oppWorkflow:selectedWorkflow,
              oppStage:selectedStage,
              salesUserIds: selectedOption ? selectedOption.employeeId:userId,
            },
            props.userId,
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
          <Form className="form-background h-[56vh]">
            <div  class=" flex justify-between">
          
            <div class=" h-full w-[47.5%] mt-3"
                >
                  <div class="text-xs font-bold w-full max-sm:w-full">
                  {translatedMenuItems[0]} </div>
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
           
                <div class=" flex justify-between mt-3">
                  <div class=" w-2/4">
                  <div class="text-xs font-bold w-full max-sm:w-full">
                  {translatedMenuItems[1]} </div>
                    <Field
                      isRequired
                      name="startDate"
                      //label="Start "                   
                      component={DatePicker}
                      value={values.startDate}
                      isColumn
                      inlineLabel
                    />
                  </div>
                  <div class=" w-2/5">
                  <div class="text-xs font-bold w-full max-sm:w-full">
                  {translatedMenuItems[2]} </div>
                    <Field
                      isRequired
                      name="endDate"
                      // label="End Date"                   
                      isColumn
                      component={DatePicker}
                      // value={values.endDate}
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
          
                <div class=" flex justify-between mt-3">
                  <div class=" w-2/4">
                  <div class="text-xs font-bold w-full max-sm:w-full">
                  {translatedMenuItems[3]} </div>
                    <Field
                      name="proposalAmount"
                      //label="Value"                 
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
                  </div>
                  <div class=" w-2/5">
                  <div class="text-xs font-bold w-full max-sm:w-full">
                  {translatedMenuItems[4]} </div>
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
               
<div class=" mt-3">
<div class="text-xs font-bold w-full max-sm:w-full">
{translatedMenuItems[5]} </div>
                <Field
                  name="description"
                  // label="Notes"                
                  width={"100%"}
                  isColumn
                  component={TextareaComponent}
                />
                </div>
              </div>
          
              <div class=" h-full w-[47.5%]"
                >
                    <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <div className=" font-bold text-xs mb-1 leading-lh1.2  ">                        
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
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto  bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
               
                 <div class="mt-3">
                 <div class="text-xs font-bold w-full max-sm:w-full">
                 {translatedMenuItems[8]} </div>
                <Field
                  name="customerId"
                  isColumnWithoutNoCreate
                  // label="Customer"           
                  component={SelectComponent}
                  isColumn
                  options={[]}
                  // value={values.customerId}
                  isDisabled={defaultCustomers}
                  defaultValue={defaultCustomers ? defaultCustomers : null}
                  inlineLabel

                />
                </div>
         <div class=" mt-3">
         <div class="text-xs font-bold w-full max-sm:w-full">
         {translatedMenuItems[7]} </div>
                <Field
                  name="contactId"
                  isColumnWithoutNoCreate
                  selectType="contactOpportunityList"
                  // label="Contact"               
                  component={SearchSelect}
                  isColumn
                  value={values.contactId}
                  inlineLabel
                />
</div>
<div class="flex justify-between max-sm:flex-col mt-3">
     
                  <div class=" w-w47.5.5 max-sm:w-wk">
                   
                  <div class="font-bold text-xs font-poppins">     {translatedMenuItems[10]}
                   {/* Workflow */}
                    </div>
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


                 
                  <div class=" w-w47.5.5 max-sm:w-wk ">
                  <div class="font-bold text-xs font-poppins">     {translatedMenuItems[12]}
                    {/* Stage */}
                    </div>
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
          
            <div class=" flex justify-end mt-3">
              <Button
                type="primary"
                htmlType="submit"
                Loading={addingCustomerOpportunity}
              >
                <div class="text-xs font-bold font-poppins">
                {translatedMenuItems[11]} </div>
    
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );

}

const mapStateToProps = ({ auth, opportunity, currency, customer,leads }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  // contactId: contact.contactByUserId.contactId,
  customerId: customer.customer.customerId,
  addingCustomerOpportunity: customer.addingCustomerOpportunity,
  addingCustomerOpportunityError: customer.addingCustomerOpportunity,
  currencies: auth.currencies,
  sales: opportunity.sales,
  workflow: opportunity.workflow,
  stages: opportunity.stages,
  orgId: auth.userDetails.organizationId,
  fullName: auth.userDetails.fullName,
  crmAllData:leads.crmAllData,
  token:auth.token,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCustomerOpportunity,
      getCurrency,
      getWorkflow,
      getStages, 
      getCrm,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerOpportunityForm);
