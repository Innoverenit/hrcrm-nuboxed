import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field, } from "formik";
import {  getDetailsList } from "../../Dashboard/DashboardAction";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import dayjs from "dayjs";



class Details extends Component {
  componentDidMount() {
this.props.getDetailsList(this.props.item.recruitmentId);
  }

 
  render() {
     const diff = Math.abs(
      dayjs(this.props.detail.availableDate).diff(dayjs(this.props.detail.creationDate), "months")
    );
    const date = diff + 0;
    console.log(date)
    console.log(this.props.item.recruitmentId)
    return (
      <>
        <Formik
          initialValues={{
            jobOrder:this.props.detail.jobOrder || "",
            requirementName:this.props.detail.requirementName || "",
            creationDate:this.props.detail.creationDate || "",
            ownerName:this.props.detail.ownerName || "",
            recruiterList:this.props.detail.recruiterList || "",
            avilableDate:this.props.detail.avilableDate || "",
            billing:this.props.detail.billing || "",
            fullName:this.props.detail.fullName || "",
            partnerName:this.props.detail.partnerName || "",
           duration:date 
            //jobOrder:this.props.detail.jobOrder || "",
           // recruitmentId:this.props.item.recruitmentId,
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
            <div class="flex justify-between">
            <div class="h-full w-w45">
            <Field
                      isRequired
                      name="jobOrder"
                      //type="text"
                      label={<FormattedMessage
                        id="app.jobId"
                        defaultMessage="Job ID"
                      />}
                      // label="Job ID"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                      <Field
                      isRequired
                     name="requirementName"
                      type="text"
                      label={<FormattedMessage
                        id="app.requirement"
                        defaultMessage="Requirement"
                      />}
                      // label="Requirement"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                      <Field
                      isRequired
                      name="ownerName"
                      type="text"
                      label={<FormattedMessage
                        id="app.created"
                        defaultMessage="Created"
                      />}
                      // label="Created"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                      <Field
                      isRequired
                      name="creationDate"
                      type="text"
                      label={<FormattedMessage
                        id="app.createdOn"
                        defaultMessage="Created On"
                      />}
                      // label="Created On"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                      <Field
                      isRequired
                      name="recruiterList"
                      type="text"
                      label={<FormattedMessage
                        id="app.recruiter"
                        defaultMessage="Recruiter"
                      />}
                      // label="Recruiter"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                </div>
                <div class="h-full w-w45">
                <Field
                      isRequired
                      name="avilableDate"
                      type="text"
                      label={<FormattedMessage
                        id="app.start"
                        defaultMessage="Start"
                      />}
                      // label="Start"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                      <Field
                      isRequired
                      name="duration"
                      type="text"
                      label={<FormattedMessage
                        id="app.duration"
                        defaultMessage="Duration"
                      />}
                      // label="Duration"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                      <Field
                      isRequired
                      name="billing"
                      type="text"
                      label={<FormattedMessage
                        id="app.billing"
                        defaultMessage="Billing"
                      />}
                      // label="Billing"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                      <Field
                      isRequired
                      name="candidatetList"
                      type="text"
                      label={<FormattedMessage
                        id="app.talent"
                        defaultMessage="Talent"
                      />}
                      // label="Talent"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                      <Field
                      isRequired
                      name="partnerName"
                      type="text"
                      label={<FormattedMessage
                        id="app.sponsor"
                        defaultMessage="Sponsor"
                      />}
                      // label="Sponsor"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                      inlineLabel
                    />
                  </div>
            </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, dashboard,opportunity }) => ({
  detail:dashboard.detail,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDetailsList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
