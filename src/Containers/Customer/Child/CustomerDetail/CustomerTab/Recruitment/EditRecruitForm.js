import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, message, Input, Switch } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { Spacer } from "../../../../../../Components/UI/Elements";

import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";

// import {
//   getProcessForRecruit,
//   getProcessStagesForRecruit,
//   getAllProcessStagesForRecruit,
// } from "../../../../../Settings/SettingsAction";
// import { getCurrency, updateRecruitment } from "../../../../OpportunityAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
// import { addRecruit } from "../../../../OpportunityAction";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
// import { opportunityReducer } from "../../../../OpportunityReducer";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";

/**
 * yup validation scheme for creating a opportunity
 */

const OpportunitySchema = Yup.object().shape({});

function EditRecruitForm(props) {
  const currency = props.currencies.map((item) => {
    return {
      label: item.currencyName || "",
      value: item.currencyName,
    };
  });

  // useEffect(() => {
  //   props.getCurrency();
  // }, []);
  // console.log("djbhfkdhg", props.currentRecruitmentData);

  return (
    <>
      <Formik
        initialValues={{
          avilableDate: dayjs(props.currentRecruitmentData.avilableDate) || "",
          billing: props.currentRecruitmentData.billing || "",
          currency: props.currentRecruitmentData.currency || undefined,
          recruitmentId: props.currentRecruitmentData.recruitmentId,
          description: props.currentRecruitmentData.description || "",
        }}
        validationSchema={OpportunitySchema}
        onSubmit={(values, { resetForm }) => {
          console.log({
            ...values,
            avilableDate: values.avilableDate.toISOString(),
          });
          // props.updateRecruitment(
          //   {
          //     ...values,
          //     avilableDate: values.avilableDate.toISOString(),
          //   },
          //   props.opportunityId,
          //   () => props.handleEditModal(false)
          // );
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
                    width: "100%",
                  }}
                >
                  <Field
                    name="description"
                    //label="Description"
                    label={<FormattedMessage
                      id="app.description"
                      defaultMessage="Description"
                    />}
                    width={"100%"}
                    isColumn
                    component={TextareaComponent}
                    style={{
                      flexBasis: "80%",
                      height: "5em",
                      // marginLeft: "2.5em",
                      marginTop: "0.25em",
                    }}
                  />
                  <Spacer />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "46%" }}>
                      {" "}
                      <Field
                        name="avilableDate"
                        //label="Start Date"
                        label={<FormattedMessage
                          id="app.avilableDate"
                          defaultMessage="Start Date"
                        />}
                        isRequired
                        component={DatePicker}
                        isColumn
                        width={"100%"}
                        value={values.avilableDate}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2em",
                          width: "100%",
                          marginTop: "0.25em",
                        }}
                      />
                    </div>
                    <div style={{ width: "22%" }}>
                      <Field
                        name="billing"
                        //label="Billing / hour"
                        label={<FormattedMessage
                          id="app.billing"
                          defaultMessage="Billing / hour"
                        />}
                        width={"100%"}
                        isRequired
                        isColumn
                        component={InputComponent}
                        style={{
                          flexBasis: "80%",
                          height: "2em",
                          marginTop: "0.4375em",
                        }}
                      />
                    </div>
                    <div style={{ width: "25%" }}>
                      <Field
                        name="currency"
                        placeholder="Currency"
                        noLabel
                        defaultValue={{
                          value: this.props.user.currency,
                        }}
                        isRequired
                        component={SelectComponent}
                        options={Array.isArray(currency) ? currency : []}
                        style={{
                          borderRadius: 5,
                          marginTop: "1.75em",
                        }}
                      />
                    </div>
                  </FlexContainer>

                  <Spacer />
                </div>
              &nbsp;
              <div
                  style={{
                    height: "100%",
                  }}
                ></div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.updatingRecruitment}
                >
                  <FormattedMessage
                    id="app.update"
                    defaultMessage="Update"
                  />
                  {/* Update */}
                </Button>
              </FlexContainer>
            </Form>
          )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({
  auth,
  opportunity,
  team,
  contact,
  account,
  settings,
  partner,
}) => ({
  // currencies: opportunity.currencies,
  // currentRecruitmentData: opportunity.currentRecruitmentData,
  // updatingRecruitment: opportunity.updatingRecruitment,
  opportunityId: opportunity.opportunity.opportunityId,
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getCurrency,
      // updateRecruitment,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditRecruitForm);
