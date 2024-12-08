import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "antd";
import { Formik, Form, Field, } from "formik";
import * as Yup from "yup";
import { getAllSalesList,
  getWorkflow,getStages,
 } from "../../../../Opportunity/OpportunityAction";
import SearchSelect from "../../../../../Components/Forms/Formik/SearchSelect";
 import { updateLeadsOpportunity } from "../../../LeadsAction";
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
class UpdateLeadsOpportunityForm extends Component {
  componentDidMount() {
   
    this.props.getAllSalesList();
    this.props.getWorkflow(this.props.orgId);
     this.props.getStages(this.props.orgId);
  }
  handleReset = (resetForm) => {
    resetForm();
  };
  handleReset = (resetForm) => {
    const { callback } = this.props;
    callback && callback();
    resetForm();
  };
  getStagesOptions(filterOptionKey, filterOptionValue) {
    const StagesOptions =
      this.props.stages.length &&
      this.props.stages
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
  render() {

    const salesNameOption = this.props.sales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });
    const WorkflowOptions = this.props.workflow.map((item) => {
      return {
        label: `${item.workflowName || ""}`,
        value: item.opportunityWorkflowDetailsId,
      };
    });


    const {
      updatingLeadsOpportunity,
      contactId,
      customerId,
      opportunityId,
      startDate,
      endDate,
      defaultCustomers,
      defaultContacts,
      name,
    } = this.props;
    console.log(opportunityId);
    return (
      <>
        <Formik
          initialValues={{
            opportunityName: this.props.setEditingLeadsOpportunity.opportunityName || "",
            // startDate: "",
            // endDate: "",
            startDate:dayjs(this.props.setEditingLeadsOpportunity.startDate) || "",
            endDate:this.props.setEditingLeadsOpportunity.endDate || null,
            endDate:dayjs(this.props.setEditingLeadsOpportunity.endDate) || "",
            proposalAmount: this.props.setEditingLeadsOpportunity.proposalAmount || "",
            currency:this.props.setEditingLeadsOpportunity.currency || "",
            orgId: this.props.organizationId,
            customerId: customerId ? customerId.value : "",
            contact: customerId ? customerId.value : "",
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
            
            this.props.updateLeadsOpportunity(
              {
                ...values,
                startDate: `${newStartDate}T00:00:00Z`,
                endDate: `${newEndDate}T00:00:00Z`,
                leadsId: this.props.leadsId,
              },
              // this.props.userId,
               this.props.setEditingLeadsOpportunity.opportunityId,
             
              () => this.handleReset(resetForm)
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
                  <div class=" mt-3"/>
                  <Field
                    isRequired
                    name="opportunityName"
                    type="text"
                    label="Name"
                    isColumn
                   
                    width={"100%"}
                    component={InputComponent}
                    // accounts={accounts}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
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
                        label="Currency"
                        width="100%"
                        isColumn
                        selectType="currencyName"
                        isRequired
                        component={SearchSelect}
                      />
                    </div>
                  </div>
                </div>
                <div class=" h-full w-2/5"
                >
                       <div class=" text-xs font-bold font-poppins text-black">
                    <Field
                    isRequired
                    name="salesUserIds"
                    isColumnWithoutNoCreate
                    label="Assigned"
                    component={SelectComponent}
                    options={Array.isArray(salesNameOption) ? salesNameOption : []}
                    isColumn
                    inlineLabel
                   
                  />
                  </div>
                  <Field
                    name="customerId"
                    isColumnWithoutNoCreate
                    selectType="customerList"
                    label="Customer"
                    // isRequired
                    component={SearchSelect}
                    isColumn
                    value={values.customerId}
                    inlineLabel
                  />
                  <div class=" mt-3" />
                  <Field
                    name="contactId"
                    isColumnWithoutNoCreate
                    selectType="contactListFilter"
                    label="Contact"
                    // isRequired
                    component={SearchSelect}
                    isColumn
                    value={values.contactId}
                    filterOption={{
                      filterType: "account",
                      filterValue: values.customerId
                    }}
                    inlineLabel
                  />
                  <div class=" flex justify-between">
                  <div class=" w-2/4">
                  <Field
                    name="oppWorkflow"
                    isColumnWithoutNoCreate
                    label="Workflow"
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
                      
                    component={SelectComponent}
                    options={
                      Array.isArray(this.getStagesOptions("oppWorkflow", values.oppWorkflow))
                        ? this.getStagesOptions("oppWorkflow", values.oppWorkflow)
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
                  <div class=" mt-3" />
                </div>
              </div>
              <div class=" mt-3" />
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                   Loading={updatingLeadsOpportunity}
                >
                Update
                 
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}


const mapStateToProps = ({ auth, opportunity, contact, leads }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  contactId: contact.contactByUserId.contactId,
  leadsId: leads.lead.leadsId,
  sales: opportunity.sales,
  workflow:opportunity.workflow,
  stages:opportunity.stages,
  opportunityId:opportunity.opportunityId,
  updatingLeadsOpportunity: leads.updatingLeadsOpportunity,
  updatingLeadsOpportunityError: leads.updatingLeadsOpportunityError,
  setEditingLeadsOpportunity:leads.setEditingLeadsOpportunity,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateLeadsOpportunity,
      getAllSalesList,
      getWorkflow,
      getStages
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateLeadsOpportunityForm);