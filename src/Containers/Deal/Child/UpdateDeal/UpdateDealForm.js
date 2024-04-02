import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Select } from "antd";
import {getInvestorCurrency} from "../../../Auth/AuthAction"
import {getAssignedToList} from "../../../Employees/EmployeeAction"
import {getAllEmployeelist} from "../../../Investor/InvestorAction"
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";
import {updateDeal} from "../../DealAction";
import { getInvestorData } from "../../../Customer/CustomerAction";
import { getContactData } from "../../../Contact/ContactAction";
import {
  getDealLinkedWorkflow,
  getDealLinkedStages
} from "../../DealAction";
import { Listbox } from "@headlessui/react";
const { Option } = Select;
/**
 * yup validation scheme for creating a opportunity
 */

const UpdateOpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Please provide Opportunity name"),
  investorId:Yup.string().required("Input needed!"),
  currency: Yup.string().required("Currency needed!"),
  startDate: Yup.string().required("Input needed!"),
  endDate: Yup.string().required("Input needed!"),
  // salesUserIds: Yup.string().required("Input needed!"),
  oppWorkflow: Yup.string().required("Input needed!"),
});
function UpdateDealForm (props) {

  const includeOption = props.currentItem.include===null?[]: props.currentItem.include.map((item) => {
    return item.empName
  })
  const [includeNames, setInclude] = useState(includeOption);
  useEffect(()=> {
    props.getAllEmployeelist();
    props.getAssignedToList(props.orgId);
    props.getInvestorCurrency();
    props.getInvestorData(props.userId);
    props.getContactData(props.userId);
    props.getDealLinkedStages(props.orgId);
    props.getDealLinkedWorkflow(props.orgId);
  },[]);

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
  
  useEffect(() => {
    console.log("helo")
    const includeOption = props.currentItem.include===null?[]: props.currentItem.include.map((item) => {
      return item.empName
    })

    
   
    setInclude(includeOption)
    console.log("test", includeOption)
  
  }, [props.currentItem]);
  console.log(includeNames)

 
 
  function handleChangeInclude(value) {
    setInclude(value)
  }

    const allEmplo = props.allEmployeeList.map((item) => {
      return {
        label: `${item.empName || ""}`,
        value: item.employeeId,
      };
    });

    const customerNameOption = props.investorData
      // .sort((a, b) => {
      //   const libraryNameA = a.name && a.name.toLowerCase();
      //   const libraryNameB = b.name && b.name.toLowerCase();
      //   if (libraryNameA < libraryNameB) {
      //     return -1;
      //   }
      //   if (libraryNameA > libraryNameB) {
      //     return 1;
      //   }

      //   // names must be equal
      //   return 0;
      // })
      .map((item) => {
        return {
          label: `${item.name || ""}`,
          value: item.investorId,
        };
      });

    const getAreaOptions = (filterOptionKey, filterOptionValue) => {
      const contactOptions =
        props.contactData.length &&
        props.contactData
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

    const WorkflowOptions = props.dealLinkWorkflow.map((item) => {
      return {
        label: `${item.workflowName || ""}`,
        value: item.investorOppWorkflowId,
      };
    });
    const { updateOpportunityById, updateDeal, startDate, endDate } =
      props;

      const [defaultOption, setDefaultOption] = useState(props.currentItem.assignedTo);
      const [selected, setSelected] = useState(defaultOption);
      const selectedOption = props.allEmployeeList.find((item) => item.empName === selected);
    return (
      <>
        <Formik
          initialValues={{
            opportunityName:
              props.currentItem.opportunityName || "",
              oppWorkflow: props.currentItem.oppWorkflow || "",
              oppStage: props.currentItem.oppStage || "",
            startDate:
              dayjs(props.currentItem.startDate) || dayjs(),
            endDate: dayjs(props.currentItem.endDate) || dayjs(),
            // endDate: endDate || null,

            proposalAmount:
              props.currentItem.proposalAmount || "",
            currency: props.currentItem.currency || "",
            salesUserIds: selectedOption ? selectedOption.employeeId:props.currentItem.salesUserIds,
            investorId: props.currentItem.investorId || "",
            contactId: props.currentItem.contactName || "",
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

            props.updateDeal(
              {
                ...values,
                included: includeNames,
                invOpportunityId: props.currentItem.invOpportunityId,
                orgId: props.organizationId,
                investorId: props.investorId,
                userId: props.userId,
                startDate: `${newStartDate}T00:00:00Z`,
                endDate: `${newEndDate}T00:00:00Z`,
                salesUserIds: selectedOption ? selectedOption.employeeId:props.currentItem.salesUserIds,
              },
              props.currentItem.invOpportunityId,
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
              <div class=" flex justify-around max-sm:flex-col">
                <div class=" h-full w-w47.5 max-sm:w-wk">
                <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col ">
                    <Field
                      isRequired
                      name="opportunityName"
                      type="text"
                      //label="Name"
                      label={
                        <FormattedMessage id="app.name" defaultMessage="name" />
                      }
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      // accounts={accounts}
                      inlineLabel
                    />
                  </div>
                
                  <div class="flex justify-between max-sm:flex-col mt-3">
                    <div class=" w-w47.5 max-sm:w-wk">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col ">
                        <Field
                          isRequired
                          name="startDate"
                          //label="Start Date"
                          label={
                            <FormattedMessage
                          id="app.startdate"
                          defaultMessage="startdate"
                        />
                          }
                          component={DatePicker}
                          value={values.startDate}
                          isColumn
                          inlineLabel
                        />
                      </div>
                    </div>
                    <div class="w-w47.5 max-sm:w-wk">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col ">
                        <Field
                          isRequired
                          name="endDate"
                          // label="End Date"
                          label={
                            <FormattedMessage
                            id="app.enddate"
                            defaultMessage="enddate"
                          />
                          }
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
                  </div>
                
                  <div class="flex justify-between max-sm:flex-col mt-3">
                    <div class=" w-w47.5 max-sm:w-wk">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col ">
                        <Field
                          name="proposalAmount"
                          // label="Proposal Amount"
                          label={
                            <FormattedMessage
                          id="app.fundValue"
                          defaultMessage="fundValue"
                        />
                          }
                          isColumn
                          isRequired
                          width={"100%"}
                          component={InputComponent}
                        />
                      </div>
                    </div>
                    <div class=" w-w47.5 max-sm:w-wk">
                    <Field
                      name="currency"
                      isColumnWithoutNoCreate
                      // defaultValue={{
                      //   value: props.user.currency,
                      // }}
                      label={
                        <FormattedMessage
                          id="app.currency"
                          defaultMessage="Currency"
                        />
                      }
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
                <div class=" h-full w-w47.5 max-sm:w-wk">
                <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block font-semibold text-[0.75rem] mt-[0.6rem]"><FormattedMessage
                          id="app.assignedto"
                          defaultMessage="assignedto"
                        /></Listbox.Label>
          <div className="relative ">
              <Listbox.Button style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
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
    <div>
    <label class=" text-[#444] font-bold text-[0.75rem]" >Include</label>
 
    <Select
  name="included"
  mode="multiple"
  style={{ width: '100%' }}
  placeholder="Select"
  defaultValue={includeNames}
  onChange={handleChangeInclude}
>
  {props.assignedToList.map((item) => {
    const isCurrentUser = item.employeeId === props.user.userId;

    if (!isCurrentUser) {
      return (
        <Option key={item.employeeId} value={item.employeeId}>
          {item.empName}
        </Option>
      );
    }

    return null; // Skip rendering for the current user
  })}
</Select>
{/* <Field
                    name="include"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.include"
                        defaultMessage="Include"
                      />
                    }
                    component={SelectComponent}
                    options={
                      Array.isArray(allEmplo)
                        ? allEmplo
                        : []
                    }
                    isColumn
                    value={values.employeeId}
                    inlineLabel
                  /> */}
  </div>

                  <Field
                    name="investorId"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                      id="app.investor"
                      defaultMessage="investor"
                    />
                    }
                    // isRequired
                    component={SelectComponent}
                    isColumn
                    options={
                      Array.isArray(customerNameOption)
                        ? customerNameOption
                        : []
                    }
                    value={values.investorId}
                    inlineLabel
                  />

                 
<div class="mt-3">
                  <Field
                    name="contactId"
                    isColumnWithoutNoCreate
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="contact"
                      />
                    }
                    component={SelectComponent}
                    isColumn
                    options={
                      Array.isArray(
                        getAreaOptions("investorId", values.investorId)
                      )
                        ? getAreaOptions("investorId", values.investorId)
                        : []
                    }
                    filterOption={{
                      filterType: "investorId",
                      filterValue: values.investorId,
                    }}
                    disabled={!values.investorId}
                    value={values.contactId}
                    inlineLabel
                  />
</div>
              
                  <div class="flex justify-between max-sm:flex-col mt-3">
                    <div class=" w-w47.5 max-sm:w-wk">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                        <Field
                          name="oppWorkflow"
                          isColumnWithoutNoCreate
                          label={
                            <FormattedMessage
                            id="app.workflow"
                            defaultMessage="workflow"
                          />
                          }
                          component={SelectComponent}
                          options={
                            Array.isArray(WorkflowOptions)
                              ? WorkflowOptions
                              : []
                          }
                          value={values.oppWorkflow}
                          isColumn
                          margintop={"0"}
                          inlineLabel
                        />
                      </div>
                    </div>
    
                    <div class="w-w47.5 max-sm:w-wk ">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col ">
                        <Field
                          name="oppStage"
                          isColumnWithoutNoCreate
                          label={
                            <FormattedMessage
                            id="app.stages"
                            defaultMessage="stages"
                          />
                          }
                          component={SelectComponent}
                          options={
                            Array.isArray(
                             getStagesOptions(
                                "oppWorkflow",
                                values.oppWorkflow
                              )
                            )
                              ? getStagesOptions(
                                  "oppWorkflow",
                                  values.oppWorkflow
                                )
                              : []
                          }
                          // value={values.oppStage}
                          filterOption={{
                            filterType: "oppWorkflow",
                            filterValue: values.oppWorkflow,
                          }}
                          disabled={!values.oppWorkflow}
                          isColumn
                          margintop={"0"}
                          inlineLabel
                        />
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>
             
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute mt-3 ">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updateOpportunityById}
                >
                  <FormattedMessage id="app.update" defaultMessage="update" />
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

const mapStateToProps = ({ auth,deal,investor,employee, opportunity, customer, contact }) => ({
  user: auth.userDetails,
  currencies: auth.currencies,
  investorCurrencies:auth.investorCurrencies,
  allEmployeeList:investor.allEmployeeList,
  assignedToList:employee.assignedToList,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  setEditingOpportunity: opportunity.setEditingOpportunity,
  updateOpportunityById: opportunity.updateOpportunityById,
  dealLinkWorkflow:deal.dealLinkWorkflow,
  dealLinkStages:deal.dealLinkStages,
  fullName: auth.userDetails.fullName,
  workflow: opportunity.workflow,
  stages: opportunity.stages,
  contactData: contact.contactData,
  investorData: customer.investorData,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateDeal,
      getInvestorCurrency,
      getAllEmployeelist,
      getAssignedToList,
      getDealLinkedWorkflow,
      getDealLinkedStages,
      getContactData,
      getInvestorData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateDealForm);
