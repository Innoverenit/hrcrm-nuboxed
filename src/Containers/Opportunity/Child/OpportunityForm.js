import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCustomerData } from "../../Customer/CustomerAction";
import { getContactData } from "../../Contact/ContactAction";
import { FormattedMessage } from "react-intl";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button, Tooltip } from "antd";
import { Formik, Form, Field, } from "formik";
import * as Yup from "yup";
import { Spacer, StyledLabel } from "../../../Components/UI/Elements";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import {
  addOpportunity,
  getRecruiterName,
  getAllSalesList,
  getInitiative,
  getOppLinkedWorkflow,
  getOppLinkedStages,
  
} from "../OpportunityAction";
import { getCrm} from "../../Leads/LeadsAction";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import { Fragment } from "react";
import { Listbox } from "@headlessui/react";

/**
 * yup validation scheme for creating a opportunity
 */

const OpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Input needed!"),
  oppWorkflow: Yup.string().required("Input needed!"),
  currency: Yup.string().required("Input needed!"),
  oppStage: Yup.string().required("Input needed!"),
  customerId:Yup.string().required("Input needed!"),
});
function OpportunityForm(props) {
  useEffect(() => {
    props.getRecruiterName();
    props.getAllSalesList();
    props.getContactData(props.userId);
    props.getCustomerData(props.userId);
    props.getInitiative(props.userId);
     props.getOppLinkedStages(props.orgId);
     props.getOppLinkedWorkflow(props.orgId);
     props. getCrm();
  }, []);

  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);


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
  


  function getInitiativeOptions(filterOptionKey, filterOptionValue) {
    const initiativeOptions =
      props.initiatives.length &&
      props.initiatives
        .filter((option) => {
          if (
            option.customerId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })

        .map((option) => ({
          label: option.initiativeName || "",
          value: option.initiativeDetailsId,
        }));

    return initiativeOptions;
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
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

  function getskillOptions(filterOptionKey, filterOptionValue) {
    const skillOptions =
      props.opportunitySkills.length &&
      props.opportunitySkills
        .filter((option) => {
          if (option.initiativeDetailsId === filterOptionValue) {
            // console.log("option",option.initiativeSkillMapper)
            return option;
          }
        })

        .map((option) => {
          console.log("option1", option);
          return {
            label: `${option.skillName || ""}`,
            value: option.skilId,
          };
        });

    return skillOptions;
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

  const recruiterNameOption = props.recruiterName.map((item) => {
    return {
      label: `${item.fullName || ""}`,
      value: item.employeeId,
    };
  });

  const salesNameOption = props.sales.map((item) => {
    return {
      label: `${item.fullName || ""}`,
      value: item.employeeId,
    };
  });
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
    user: { userId },
    addingOpportunity,
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
  const selectedOption = props.sales.find((item) => item.fullName === selected);
  
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
          contactId: undefined,
          oppInnitiative: "",
          oppStage: "",
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

          props.addOpportunity(
            {
              ...values,
              startDate: `${newStartDate}T20:00:00Z`,
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
            <div class=" flex justify-between max-sm:flex-col">
              <div class=" h-full w-[47.5%] max-sm:w-wk">
                <Spacer />
                <Field
                  isRequired
                  name="opportunityName"
                  type="text"
                  //label="Name"

                  label={
                    <FormattedMessage id="app.name" defaultMessage="Name" />
                  }
                  isColumn
                  width={"100%"}
                  component={InputComponent}
                  // accounts={accounts}
                  inlineLabel
                />
                <Spacer />
                <div class="flex justify-between max-sm:flex-col">
                <div class=" w-w47.5 max-sm:w-wk">
                    <Field
                      name="startDate"
                      //label="Start "
                      label={
                        <FormattedMessage
                          id="app.startDate"
                          defaultMessage="Start Date"
                        />
                      }
                      component={DatePicker}
                      value={values.startDate}
                      isColumn
                      inlineLabel
                    />
                  </div>
                  <div class=" w-w47.5 max-sm:w-wk">
                    <Field
                      // isRequired
                      name="endDate"
                      // label="End Date"
                      label={
                        <FormattedMessage
                          id="app.endDate"
                          defaultMessage="End Date"
                        />
                      }
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
                <Spacer />
                <div class="flex justify-between max-sm:flex-col">
                <div class=" w-w47.5 max-sm:w-wk">
                    <Field
                      name="proposalAmount"
                      //label="Proposal Amount"

                      label={
                        <FormattedMessage
                          id="app.proposalamount"
                          defaultMessage="Proposal Amount"
                        />
                      }
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
                  </div>
                  <div class=" w-w47.5 max-sm:w-wk">
                    <Field
                      name="currency"
                      isColumnWithoutNoCreate
                      defaultValue={{
                        value: props.user.currency,
                      }}
                      label={
                        <FormattedMessage
                          id="app.currency"
                          defaultMessage="Currency"
                        />
                      }
                      width="100%"
                      isColumn
                      selectType="currencyName"
                      value={values.currencyName}
                      isRequired
                      component={SearchSelect}
                    />
                  </div>
                </div>
                <Spacer />
                <StyledLabel>Description</StyledLabel>
                <div>
                  <div>
                    <span onClick={SpeechRecognition.startListening}>
                      <Tooltip title="Start">
                        <span style={{ fontSize: "1.5em", color: "red" }}>
                          <PlayCircleFilledIcon />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={SpeechRecognition.stopListening}>
                      <Tooltip title="Stop">
                        <span
                          style={{
                            fontSize: "1.5em",
                            color: "green",
                            marginLeft: "3px",
                          }}
                        >
                          <StopCircleIcon />
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
            <div
               class=" h-full w-[47.5%] max-sm:w-wk">
              <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block font-semibold text-[0.75rem] mt-[0.6rem]">
              Assigned to
            </Listbox.Label>
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

               
<div class="flex justify-between max-sm:flex-col mt-[0.85rem]">
<div class=" w-w47.5 max-sm:w-wk">
                  <Field
                    name="customerId"
                    // selectType="customerList"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.customer"
                        defaultMessage="Customer"
                      />
                    }
                    //component={SearchSelect}
                    component={SelectComponent}
                    options={
                      Array.isArray(customerNameOption)
                        ? customerNameOption
                        : []
                    }
                    isColumn
                    margintop={"0"}
                    value={values.customerId}
                    inlineLabel
                  />
          
            </div>
            <div class=" w-w47.5 max-sm:w-wk">
            <StyledLabel>
                  <Field
                    name="contactId"
                    // selectType="contactListFilter"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="Contact"
                      />
                    }
                    // component={SearchSelect}
                    component={SelectComponent}
                    options={
                      Array.isArray(
                        getAreaOptions("customerId", values.customerId)
                      )
                        ? getAreaOptions("customerId", values.customerId)
                        : []
                    }
                    value={values.contactId}
                    filterOption={{
                      filterType: "customerId",
                      filterValue: values.customerId,
                    }}
                    disabled={!values.customerId}
                    isColumn
                    inlineLabel
                  />
                </StyledLabel>
                </div>
                        </div>
              
                {/* <StyledLabel>
                  <Field
                    name="oppInnitiative"
                    //selectType="initiativeName"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.initiative"
                        defaultMessage="Initiative"
                      />
                    }
                    component={SelectComponent}
                    options={
                      Array.isArray(
                        getInitiativeOptions("customerId", values.customerId)
                      )
                        ? getInitiativeOptions("customerId", values.customerId)
                        : []
                    }
                    value={values.initiativeDetailsId}
                    filterOption={{
                      filterType: "customerId",
                      filterValue: values.customerId,
                    }}
                    disabled={!values.customerId}
                    isColumn
                    inlineLabel
                  />
                </StyledLabel> */}
                <Spacer />

                <div class="flex justify-between max-sm:flex-col">
                  <div class=" w-w47.5 max-sm:w-wk">
                    <StyledLabel>
                      <Field
                        name="oppWorkflow"
                        // selectType="contactListFilter"
                        isColumnWithoutNoCreate
                        isRequired
                        placeolder="Select type"
                        label={
                          <FormattedMessage
                            id="app.workflow"
                            defaultMessage="Workflow"
                          />
                        }
                        // component={SearchSelect}
                        component={SelectComponent}
                        options={
                          Array.isArray(WorkflowOptions) ? WorkflowOptions : []
                        }
                        value={values.oppWorkflow}
                        isColumn
                        inlineLabel
                      />
                    </StyledLabel>
                  </div>
                  <Spacer />
                  <div class=" w-w47.5 max-sm:w-wk">
                    <StyledLabel>
                      <Field
                        name="oppStage"
                        isRequired
                        isColumnWithoutNoCreate
                        label={
                          <FormattedMessage
                            id="app.stages"
                            defaultMessage="Stages"
                          />
                        }
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
                    </StyledLabel>
                  </div>
                </div>
              </div> 
  
            </div>
            <Spacer />
            <div class="flex justify-end w-wk bottom-2 mr-2 absolute ">
              <Button
                type="primary"
                htmlType="submit"
                Loading={addingOpportunity}
              >
                <FormattedMessage id="app.create" defaultMessage="Create" />
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

const mapStateToProps = ({ auth, opportunity, contact, customer,leads }) => ({
  user: auth.userDetails,
  crmAllData:leads.crmAllData,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  contactId: contact.contactByUserId.contactId,
  customerId: customer.customer.customerId,
  initiativesByCustomerId: customer.initiativesByCustomerId,
  addingOpportunity: opportunity.addingOpportunity,
  addingOpportunityError: opportunity.addingOpportunityError,
  recruiterName: opportunity.recruiterName,
  orgId: auth.userDetails.organizationId,
  // salesUserIds:auth.userDetails.userId,
  sales: opportunity.sales,
  oppLinkStages: opportunity.oppLinkStages,
  stages:opportunity.stages,
  currencies: auth.currencies,
  contactByUserId: contact.contactByUserId,
  customerByUserId: customer.customerByUserId,
  initiatives: opportunity.initiatives,
  workflow:opportunity.workflow,
  oppLinkWorkflow: opportunity.oppLinkWorkflow,
  customerData: customer.customerData,
  contactData: contact.contactData,
  fullName: auth.userDetails.fullName
  // opportunitySkills:opportunity.opportunitySkills
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addOpportunity,
      getContactData,
      getRecruiterName,
      getAllSalesList,
      // getInitiativeByCustomerId,
      getCustomerData,
      getInitiative,
      getOppLinkedWorkflow,
      // getOpportunitySKill
      getOppLinkedStages,
      getCrm,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityForm);
