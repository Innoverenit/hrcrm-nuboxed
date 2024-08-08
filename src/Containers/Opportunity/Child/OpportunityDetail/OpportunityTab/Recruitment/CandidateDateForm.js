import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button } from "antd";
import {getProjectsData} from "../../../../../Settings/Category/Project/ProjectAction"
import { Formik, Form, Field } from "formik";
import SearchSelect from "../../../../../../Components/Forms/Formik/SearchSelect";
import { addCandidateDate } from "../../../../OpportunityAction";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import dayjs from "dayjs";


class CandidateDateForm extends Component {
  handleReset = (resetForm) => {
    resetForm();
  };

    componentDidMount() {
      this.props.getProjectsData(this.props.customerId);
    
    }

  render() {
    console.log(this.props.customerId);
    const {
      user: { userId },
      candidateDate,
      onboardDate,
      actualEndDate,
      value,
    } = this.props;


    
    const projectOption = this.props.projectsData.map((item) => {
      return {
        label: item.projectName || "",
        value: item.projectId,
      };
    });
    console.log("profile", this.props.profileId);
    return (
      <>
        <Formik
          initialValues={{
            onboardDate: onboardDate || dayjs(),
            actualEndDate: actualEndDate || dayjs(),
            // finalBilling:parseFloat(this.props.finalBilling),
            onboardInd: true,
            profileId: this.props.profileId,
            recruitmentId: this.props.recruitmentId,
            candidateId: this.props.candidateId,
            customerId:this.props.customerId,
            onboardCurrency: this.props.user.currency,
            projectName: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values);

            //let newStartDate = dayjs(values.date).format("YYYY-MM-DD");

            this.props.addCandidateDate(
              {
                ...values,
                onboardDate: dayjs(values.onboardDate).toISOString(),
                actualEndDate: dayjs(values.actualEndDate),
                actualEndDate: dayjs(values.actualEndDate),
                finalBilling: parseFloat(values.finalBilling),
                billableHour: parseFloat(values.billableHour),

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
              <div class="mt-3" />
              <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                <div style={{ width: "47%" }}>
                  <Field
                    name="projectName"
                    label={
                      <FormattedMessage
                        id="app.projectName"
                        defaultMessage="Project Name"
                      />
                    }
                    isColumn
                    //component={SearchSelect}
                    component={SelectComponent}
                    value={values.projectName}
                    options={Array.isArray(projectOption) ? projectOption : []}
                  />
                </div>

                <div style={{ width: "20%" }}>
                  <Field
                    isRequired
                    name="finalBilling"
                    label="Bill Rate"
                    component={InputComponent}
                    value={values.finalBilling}
                    inlineLabel
                    isColumn
                    width="100%"
                  />
                </div>
                <div style={{ width: "21%" }}>
                  <Field
                    name="onboardCurrency"
                    isColumnWithoutNoCreate
                    defaultValue={{
                      value: this.props.user.currency,
                    }}
                    label="Currency"
                    width="100%"
                    isColumn
                    selectType="currencyName"
                    value={values.currencyName}
                    isRequired
                    component={SearchSelect}
                    // flag={values.currency}
                    // options={Array.isArray(currency) ? currency : []}
                  />
                </div>
              </div>
              <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                <div style={{ width: "47%" }}>
                  <Field
                    isRequired
                    name="onboardDate"
                    label="Start Date"
                    component={DatePicker}
                    value={values.onboardDate}
                    inlineLabel
                    isColumn
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <div style={{ width: "47%" }}>
                  <Field
                    isRequired
                    name="actualEndDate"
                    label="End Date"
                    component={DatePicker}
                    value={values.actualEndDate}
                    inlineLabel
                    isColumn
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
              </div>
              <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                <div>
                  <Field
                    isRequired
                    name="billableHour"
                    label="Billable Hour"
                    component={InputComponent}
                    // value={values.onboardDate}
                    inlineLabel
                    isColumn
                    width="100%"
                  />
                </div>
              </div>
              <div class="mt-3" />
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={candidateDate}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
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

const mapStateToProps = ({ auth, opportunity,projects, contact, customer }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  candidateDate: opportunity.candidateDate,
  projectsData:projects.projectsData,
  orgId:auth.userDetails.organizationId
  // candidateRequirement:opportunity.candidateRequirement,
  // profileId:opportunity.candidateRequirement.profileId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCandidateDate,
      getProjectsData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDateForm);
