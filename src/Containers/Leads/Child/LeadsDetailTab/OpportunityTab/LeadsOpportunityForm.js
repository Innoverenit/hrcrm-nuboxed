import React, { useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "antd";
import {
  getContactListByUserId,
} from "../../../../Contact/ContactAction";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getCustomerListByUserId } from "../../../../Customer/CustomerAction";

import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
import { addLeadsOpportunity } from ".././../../LeadsAction";
import {
  getInitiative,
  getWorkflow,
  getStages,
}
  from "../../../../Opportunity/OpportunityAction";
import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";

/**
 * yup validation scheme for creating a opportunity
 */

const OpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Please provide Opportunity name"),
  currency: Yup.string().required("Currency needed!"),
});
function LeadsOpportunityForm (props) {
  // handleReset = (resetForm) => {
  //   resetForm();
  // };

  useEffect(() => {
    //props.getAllSalesList();
    props.getContactListByUserId(props.userId);
    props.getCustomerListByUserId(props.userId);
    props.getInitiative(props.userId);
    props.getWorkflow(props.orgId);
   props.getStages(props.orgId);
   
  }, []);
    const {
      addingCustomerOpportunity,
      contactId,
      customerId,
      startDate,
      endDate,
      defaultCustomers,
      defaultContacts,
      name,
    } = props;


    const salesNameOption = props.sales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });
    console.log(customerId);

    const customerNameOption = props.customerByUserId
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
    }
  )
    .map((item) => {
      return {
        label: `${item.name || ""}`,
        value: item.customerId,
      };
    });
  
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

    function getInitiativeOptions(filterOptionKey, filterOptionValue) {
      const initiativeOptions =
        props.initiatives.length &&
        props.initiatives
          .filter((option) => {
            if (option.customerId === filterOptionValue && option.probability !== 0) {
              return option;
            }
          })
          
          .map((option) => ({
            label: option.initiativeName || "",
            value: option.initiativeDetailsId,
          }));
  
      return initiativeOptions;
    }
    const WorkflowOptions = props.workflow.map((item) => {
      return {
        label: `${item.workflowName || ""}`,
        value: item.opportunityWorkflowDetailsId,
      };
    });

    function getStagesOptions(filterOptionKey, filterOptionValue) {
      const StagesOptions =
        props.stages.length &&
        props.stages
          .filter((option) => {
            if (option.opportunityWorkflowDetailsId === filterOptionValue && option.probability !== 0) {
              return option;
            }
          })
          
          .map((option) => ({
            label: option.stageName || "",
            value: option.opportunityStagesId,
          }));
  
      return StagesOptions;
    }
    
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
            leadsId:props.leadsId,
            // contactId:"",

            currency: props.user.currency,
            orgId: props.organizationId,
            customerId: customerId ? customerId.value : "",
            contactId: customerId ? customerId.value : "",
            description:"",
            salesUserIds: props.user.employeeId||"",
            opportunitySkill: [
              {
                noOfPosition: "",
                oppInnitiative: "",
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
            props.addLeadsOpportunity(
              {
                ...values,
           
                startDate: `${newStartDate}T00:00:00Z`,
                endDate: `${newEndDate}T00:00:00Z`,
                leadsId: props.leadsId,
                // orgId: props.organizationId,
                 userId: props.userId,
              },
               props.leadsId,
              // props.customerId,
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
            <Form className="form-background">
             <div  class=" flex justify-between">
          
          <div class=" h-full w-2/4"
          >
                  <Field
                    isRequired
                    name="opportunityName"
                    type="text"
                    label="Name"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    />
                  <div class=" mt-3" />
                  <div class=" flex justify-between">
                  <div class=" w-2/4">
                      <Field
                        isRequired
                        name="startDate"
                        label="Start "
                        component={DatePicker}
                        value={values.startDate}
                        isColumn
                        inlineLabel
                        />
                    </div>
                    <div class=" w-2/5">
                      <Field
                        isRequired
                        name="endDate"
                        label="End Date"
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
                  <div class=" mt-3" />
                  <div class=" flex justify-between">
                  <div class=" w-2/4">
                      <Field
                        name="proposalAmount"
                        label="Value"
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                       />
                    </div>
                    <div class=" w-2/5">
                    <Field
                        name="currency"
                        isColumnWithoutNoCreate
                        defaultValue={{
                          value: props.user.currency,
                        }}
                        label="Currency"
                        width="100%"
                        isColumn
                        selectType="currencyName"
                        value={values.currencyName}
                        isRequired
                        component={SearchSelect}
                      />
                    </div>
                 
                  </div>

                  <div class=" mt-3"/>
                    <div class=" w-full">
                     <Field
                    name="description"
                    label="Description" 
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                  </div>
                </div>
                <div class=" h-full w-2/5"
                >
                  <Field
                    name="salesUserIds"
                    isColumnWithoutNoCreate
                    label="Assigned"
                     
                    component={SelectComponent}
                    options={Array.isArray(salesNameOption) ? salesNameOption : []}
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Field
                    name="customerId"
                    isColumnWithoutNoCreate
                    label="Customer"
                      
                    component={SelectComponent}
                    options={Array.isArray(customerNameOption) ? customerNameOption : []}
                    isColumn
                    value={values.customerId}
                    inlineLabel
                    
                  />
                 <div class=" mt-3" />
                  <Field
                    name="contactId"
                    isColumnWithoutNoCreate
                    selectType="contactOpportunityList"
                    label="Contact"
                    // isRequired
                    component={SelectComponent}
                    options={
                      Array.isArray(getAreaOptions("customerId", values.customerId))
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
                  <div class=" mt-3" />
                    <Field
                      name="oppInnitiative"
                    isColumnWithoutNoCreate
                    label="Initiative"
                    component={SelectComponent}
                    options={
                      Array.isArray(getInitiativeOptions("customerId", values.customerId))
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
            <div class=" flex justify-between">
                  <div class=" w-2/4">
                   <Field
                    name="oppWorkflow"
                    isColumnWithoutNoCreate
                    label="Workflow"
                    // isRequired
                    component={SelectComponent}
                   options={Array.isArray(WorkflowOptions) ? WorkflowOptions : []}
                   value={values.oppWorkflow}   
                    isColumn
                    inlineLabel
                    />
                    </div>
                    <div class=" w-2/5">
                      <Field
                    name="oppStage"
                    isColumnWithoutNoCreate               
                    label="Stages"
                    // isRequired
                    component={SelectComponent}
                    options={
                      Array.isArray(getStagesOptions("oppWorkflow", values.oppWorkflow))
                        ? getStagesOptions("oppWorkflow", values.oppWorkflow)
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
              <div class=" mt-3" />
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.addingLeadsOpportunity}
                >
                Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  
}

const mapStateToProps = ({ auth, opportunity, contact, customer,leads }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  orgId:auth.userDetails.organizationId,
  contactId: contact.contactByUserId.contactId,
  // leadsId: leads.lead.leadsId,
  initiatives:opportunity.initiatives,
  contactByUserId:contact.contactByUserId,
  customerByUserId:customer.customerByUserId,
  addingLeadsOpportunity: leads.addingLeadsOpportunity,
  addingLeadsOpportunityError: leads.addingLeadsOpportunityError,
  currencies:auth.currencies,
  sales: opportunity.sales,
  stages:opportunity.stages,
  workflow:opportunity.workflow,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   addLeadsOpportunity,
   getCustomerListByUserId,
   getContactListByUserId,
   getInitiative,
   getWorkflow,
      getStages,
    //   getAllSalesList,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeadsOpportunityForm);
