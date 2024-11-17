import React, {  } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";



const OpportunitySchema = Yup.object().shape({});

function EditRecruitForm(props) {
  const currency = props.currencies.map((item) => {
    return {
      label: item.currencyName || "",
      value: item.currencyName,
    };
  });

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
                  <div class=" mt-3" />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
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
                  </div>

                  <div class=" mt-3" />
                </div>
              &nbsp;
              <div
                  style={{
                    height: "100%",
                  }}
                ></div>
              </div>
              <div class=" mt-3" />
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
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
              </div>
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
