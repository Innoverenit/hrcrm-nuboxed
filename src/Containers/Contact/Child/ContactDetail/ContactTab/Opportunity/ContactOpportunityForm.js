import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { Formik, Form, Field, } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import {getAllSalesList} from "../../../../../Opportunity/OpportunityAction";
import { addContactOpportunity } from "../../../../ContactAction";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";

/**
 * yup validation scheme for creating a opportunity
 */

const OpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Please provide Opportunity name"),
  currency: Yup.string().required("Currency needed!"),
});
class ContactOpportunityForm extends Component {
  handleReset = (resetForm) => {
    resetForm();
  };
  componentDidMount(){
    this.props.getAllSalesList();
  }
  render() {
    const {
      addingContactOpportunity,
      contactId,
      customerId,
      defaultCustomers,
      // user: { timeZone },
      startDate,
      endDate,
      defaultContacts,
      name,
    } = this.props;

    const salesNameOption = this.props.sales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });
    console.log(customerId);
    return (
      <>
        <Formik
          initialValues={{
            opportunityName: "",
            startDate: startDate || dayjs(),
            endDate: endDate || null,
            endDate: dayjs(),
            proposalAmount: "",
            currency: this.props.user.currency,
            orgId: this.props.organizationId,
            customerId: customerId ? customerId.value : "",
            contactId: contactId ? contactId.value : "",
            description:"",
            salesUserIds:this.props.user.employeeId||""
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
            this.props.addContactOpportunity(
              {
                ...values,
                contactId: this.props.contactId,
                startDate: `${newStartDate}T00:00:00Z`,
                endDate: `${newEndDate}T00:00:00Z`,
              },

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
              <div class=" flex justify-between "
              >
                <div class=" h-full w-2/4"
                >
                  <Field
                    isRequired
                    name="opportunityName"
                    type="text"
                    // label="Name"

                    label={
                      <FormattedMessage
                        id="app.name"
                        defaultMessage="Name"
                      />
                    }
                    isColumn
                
                    width={"100%"}
                    component={InputComponent}
                    // accounts={accounts}
                    inlineLabel
                    />
                  <Spacer />
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      <Field
                        isRequired
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
                        width={"100%"}
                        inlineLabel
                        />
                    </div>
                    <div class=" w-2/4">
                      <Field
                        isRequired
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
                        // value={values.endDate}
                        value={values.endDate || values.startDate}
                        // defaultValue={dayjs("2015-01-01")}
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
                  <Spacer />
                  <div class=" flex justify-between">
                    <div class=" w-2/4">
                      <Field
                        name="proposalAmount"
                        //label="Value"

                        label={
                          <FormattedMessage
                            id="app.proposalAmount"
                            defaultMessage="Value"
                          />
                        }
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        />
                    </div>
                    <div class=" w-2/4">
                      <Field
                        name="currency"
                        isColumnWithoutNoCreate
                      
                        label={
                          <FormattedMessage
                            id="app.currency"
                            defaultMessage="Currency"
                          />
                        }
                        width="100%"
                        isColumn
                        selectType="currency"
                        isRequired
                        component={SearchSelect}
                        flag={values.currency}
                      />
                    </div>
                  </div>
                </div>
                <div class=" h-full w-2/4"
                >
                   <Field
                    name="salesUserIds"
                    // selectType="employee"
                    isColumnWithoutNoCreate
                    // label="Assigned to"
                    label={
                      <FormattedMessage
                        id="app.assignedto"
                        defaultMessage="Assigned to"
                      />
                    }
                    component={SelectComponent}
                    options={Array.isArray(salesNameOption) ? salesNameOption : []}
                    // margintop={"0"}
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <Field
                    name="customerId"
                    isColumnWithoutNoCreate
                    selectType="customerList"
                    // label="Customer"

                    label={
                      <FormattedMessage
                        id="app.customerId"
                        defaultMessage="Customer"
                      />
                    }
                    // isRequired
                    component={SearchSelect}
                    isColumn
              
                    value={values.customerId}
                    isDisabled={defaultCustomers}
                    defaultValue={defaultCustomers ? defaultCustomers : null}
                    inlineLabel
                    />
                  <Spacer />
                  <Field
                    name="contactId"
                    isColumnWithoutNoCreate
                    selectType="contactList"
                   
                    label={
                      <FormattedMessage
                        id="app.contactId"
                        defaultMessage="Contact"
                      />
                    }
                    // isRequired
                    component={SearchSelect}
                    isColumn
               
                    value={values.contactId}
                    // defaultValue={{ label: firstName, value: documentId }}
                    isDisabled={defaultContacts}
                    defaultValue={defaultContacts ? defaultContacts : null}
                    inlineLabel
                    />
                  <Spacer />
                  <Field
                    name="description"
                    // label="Notes"
                    label={
                      <FormattedMessage id="app.description" defaultMessage="Description" />
                    }
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                  />
                </div>
              </div>
              <Spacer />
              <div class=" flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={addingContactOpportunity}
                >
                  <FormattedMessage id="app.create" defaultMessage="Create" />
                  {/* Create */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, contact, customer,opportunity }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  contactId: contact.contact.contactId,
  customerId: customer.customer.customerId,
  addingContactOpportunity: contact.addingContactOpportunity,
  addingContactOpportunityError: contact.addingContactOpportunityError,
  sales: opportunity.sales,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addContactOpportunity,
      getAllSalesList,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactOpportunityForm);
