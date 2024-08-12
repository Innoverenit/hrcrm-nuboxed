import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { addPartnerOpportunity } from "../../../../PartnerAction";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";

/**
 * yup validation scheme for creating a opportunity
 */

const OpportunitySchema = Yup.object().shape({
  opportunityName: Yup.string().required("Please provide Opportunity name"),
  currency: Yup.string().required("Currency needed!"),
});
class OpportunityForm extends Component {
  handleReset = (resetForm) => {
    resetForm();
  };

  render() {
    const {
      addingPartnerOpportunity,
      contactId,
      customerId,
      defaultCustomers,
      defaultContacts,
      name,
    } = this.props;
    console.log(customerId);
    return (
      <>
        <Formik
          initialValues={{
            opportunityName: "",
            startDate: dayjs(),
            endDate: "",
            proposalAmount: "",
            currency: "",
            orgId: this.props.organizationId,
            customerId: customerId ? customerId.value : "",
            contact: contactId ? contactId.value : "",
          }}
          validationSchema={OpportunitySchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            this.props.addPartnerOpportunity(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
                // orgId: this.props.organizationId,
                // userId: this.props.userId,
              }
              // this.props.userId,
              // this.props.customerId,
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    isRequired
                    name="opportunityName"
                    type="text"
                    //label="Name"

                    label={
                      <FormattedMessage
                        id="app.opportunityName"
                        defaultMessage="Name"
                      />
                    }
                    isColumn                   
                    width={"100%"}
                    component={InputComponent}
                    // accounts={accounts}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
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
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "33px",
                          marginTop: "4px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
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
                        value={values.endDate || values.startDate}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "33px",
                          marginTop: "4px",
                          width: "100%",
                        }}
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
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
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
                        style={{
                          // flexBasis: "80%",
                          height: "33px",
                          marginTop: "4px",
                        }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="currency"             
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
                        // options={Array.isArray(currency) ? currency : []}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    name="customerId"
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
                    margintop={"4px"}
                    value={values.customerId}
                    isDisabled={defaultCustomers}
                    defaultValue={defaultCustomers ? defaultCustomers : null}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <div class=" mt-3" />
                  <Field
                    name="contactId"
                    selectType="contactOpportunityList"                   
                    label={
                      <FormattedMessage
                        id="app.contactId"
                        defaultMessage="Contact"
                      />
                    }
                    // isRequired
                    component={SearchSelect}
                    isColumn
                    margintop={"4px"}
                    value={values.contactId}
                    // defaultValue={{ label: firstName, value: documentId }}
                    isDisabled={defaultContacts}
                    defaultValue={defaultContacts ? defaultContacts : null}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  <div class=" mt-3" />
                </div>
              </div>
              <div class=" mt-3" />
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={addingPartnerOpportunity}
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

const mapStateToProps = ({ auth, partner, contact, customer }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
  contactId: contact.contactByUserId.contactId,
  partnerId: partner.partner.partnerId,
  addingPartnerOpportunity: partner.addingPartnerOpportunity,
  addingPartnerOpportunityError: partner.addingPartnerOpportunityError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addPartnerOpportunity,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityForm);
