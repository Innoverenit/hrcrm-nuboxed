import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Icon, Switch, Tooltip } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import {
  Spacer,
  StyledLabel,
} from "../../../../../../../../Components/UI/Elements";
import SearchSelect from "../../../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../../../../../../Components/Forms/Formik/TimePicker";
import {
  addCall,
  // updateCall,
  // deleteCall,
  // handleCallModal,
   getActivityListByCandidateId
} from "../../../../../../CandidateAction";
// import { handleChooserModal } from "../../../Planner/PlannerAction";
import { FlexContainer } from "../../../../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../../../../../../Components/UI/Antd";
const ButtonGroup = Button.Group;

const green = "#39D1B4";
const yellow = "#FFD712";
/**
 *
 * yup validation scheme for creating a call
 */
// const CallSchema = Yup.object().shape(
//   {
//     startDate: Yup.string()
//       .nullable()
//       .required("Input required !"),

//     startTime: Yup.string()
//       .nullable()
//       .required("Input required !"),
//     endTime: Yup.string()
//       .nullable()
//       .required("Input required !"),
//     contactId: Yup.string().when("accountId", {
//       is: (accountId) => !accountId,
//       then: Yup.string().required("Input required !"),
//     }),
//     accountId: Yup.string().when("contactId", {
//       is: (contactId) => !contactId,
//       then: Yup.string().required("Input required !"),
//     }),
//   },
//   ["contactId", "accountId"]
// );

// await schema.validate({
//   contactIds: "",
//   accountIds: "accountIds"
// });

class CandidateCallForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.selectedCall
        ? this.props.selectedCall.category
        : "Follow up",
      selected: this.props.selectedCall
        ? this.props.selectedCall.category
        : "Follow up",
      Type: this.props.selectedCall ? this.props.selectedCall.type : "Outbound",
      selectedType: this.props.selectedCall
        ? this.props.selectedCall.type
        : "Outbound",
    };
  }
  handleCategoryChange = (data) => {
    debugger;
    this.setState({ category: data });
    this.setState({ selected: data });
  };

  handleTypeChange = (data) => {
    debugger;
    this.setState({ Type: data });
    this.setState({ selectedType: data });
  };

  handleCallback = (resetForm) => {
    const { callback } = this.props;
    this.props.getActivityListByCandidateId(this.props.candidateId);
    callback && callback();
    resetForm();
   };

  render() {
    console.log(this.state.category);
    const {
      user: { userId, firstName, middleName, lastName, timeZone },
      isEditing,
      prefillCall,
      addingCandidateCall,
      deleteCall,
      deletingCall,
      addCall,
      startDate,
      callDate,
      endDate,
      startTime,
      endTime,
      defaultContacts,
      ownerId,
      defaultAccounts,
      updateCall,
      updatingCall,
      defaultOpportunities,
    } = this.props;
    // console.log(defaultAccounts);
    // console.log(defaultContacts);
    // console.log(prefillCall);
    // console.log(callDate);
    if (this.props.selectedCall) {
      var data = this.props.selectedCall.category === "New" ? false : true;
    }

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            callType: this.state.Type,
            callCategory: this.state.category,
            callPurpose:"",
            callDate: callDate || dayjs(),
            startTime: callDate || null,
            
            endTime: endDate || null,
            callDescription: "",
             callCandidateId:this.props.candidateId,
             candidateId:this.props.candidateId,
             ownerIds: [this.props.userId],
          }}
          // validationSchema={CallSchema}
          onSubmit={(values, { resetForm }) => {
            ////debugger
            console.log(values);
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

            var firstStartTimeminutes = minutes;
            //  - timeZoneminutes; // start time + time zone
            console.log(firstStartTimeminutes);

            let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;

            let newStartTime = `${finalStartTime}${timeEndPart}`;

            let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
            let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
            console.log(firstEndTime);
            let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
            console.log(firstEndHours);

            var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
            console.log(firstEndTimeSplit);
            var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
            console.log(endMinutes);

            var firstEndTimeminutes = Math.abs(endMinutes);
            // - timeZoneminutes); // start time + time zone
            console.log(firstEndTimeminutes);
            let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
            let mi = firstEndTimeminutes % 60;
            hr = hr < 10 ? "0" + hr : hr;
            mi = mi < 10 ? "0" + mi : mi;
            let finalEndTime = `${hr}:${mi}`;

            let newEndTime = `${finalEndTime}${timeEndPart}`;

            this.props.addCall(
              {
                ...values,
                // testVal,
              //   type: this.state.Type,
              //   category: this.state.category,
                startDate: `${newStartDate}T${newStartTime}`,
              endDate: `${newEndDate}T${newEndTime}`,

              startTime: 0,
              endTime: 0,
              },
              this.props.userId,
            this.props.candidateId,
           
      
              () => this.handleCallback(resetForm)
            );
            // !isEditing && resetForm();
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
                  <FlexContainer
                    justifyContent="space-between"
                   >
                      <Spacer style={{ marginBottom: "1.25em" }} />
                    <div style={{ width: "30%" }}>
                      <StyledLabel>Type</StyledLabel>
                      <Spacer />
                      <FlexContainer
                        justifyContent="space-between"

                      >
                        <Tooltip title="Outbound">
                          <div
                            onClick={() => this.handleTypeChange("Outbound")}
                            style={{
                              fontSize: "22px",
                              cursor: "pointer",
                              color:
                                this.state.selectedType === "Outbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-out-alt"></i>
                          </div>
                        </Tooltip>

                        <Tooltip title="Inbound">
                          <div
                            onClick={() => this.handleTypeChange("Inbound")}
                            style={{
                              fontSize: "22px",
                              cursor: "pointer",
                              color:
                                this.state.selectedType === "Inbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-in-alt"></i>
                          </div>
                        </Tooltip>
                        <Tooltip title="Conference">
                          <div
                            onClick={() => this.handleTypeChange("Conference")}
                            style={{
                              fontSize: "22px",
                              cursor: "pointer",
                              color:
                                this.state.selectedType === "Conference"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-network-wired"></i>
                          </div>
                        </Tooltip>
                      </FlexContainer>
                    </div>
                    <div style={{ width: "55%" }}>
                      <StyledLabel>Category</StyledLabel>
                      <Spacer />
                      <ButtonGroup>
                        <Button
                          onClick={() => this.handleCategoryChange("Follow up")}
                          style={{
                            backgroundColor:
                              this.state.selected === "Follow up"
                                ? "orange"
                                : "white",
                            color:
                              this.state.selected === "Follow up"
                                ? "white"
                                : "black",
                          }}
                        >
                          Follow up
                        </Button>

                        <Button
                          onClick={() => this.handleCategoryChange("New")}
                          style={{
                            backgroundColor:
                              this.state.selected === "New"
                                ? "orange"
                                : "white",
                            color:
                              this.state.selected === "New" ? "white" : "black",
                          }}
                        >
                          New
                        </Button>
                      </ButtonGroup>
                    </div>
                  </FlexContainer>

                  <Spacer />
                  <Field
                    name="callPurpose"
                    label="Topic"
                    component={InputComponent}
                    isColumn
                    width={"100%"}
                    inlineLabel
                    />
                  <Spacer />
                  <Field
                    name="callDate"
                    label="Date"
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    value={values.callDate}
                    inlineLabel
                    style={{
                          width: "100%",
                          }}
                  />
                  <Spacer />

                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        name="startTime"
                        label="Start Time"
                        component={TimePicker}
                        isColumn
                        use12Hours
                        value={values.startTime}
                        inlineLabel
                         style={{
                              width: "100%",
                             }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
                      <Field
                        name="endTime"
                        label="End Time"
                        component={TimePicker}
                        use12Hours
                        isColumn
                        value={values.endTime}
                        // inlineLabel
                        style={{
                              width: "100%",
                            }}
                      />
                    </div>
                  </FlexContainer>
                  <Spacer />

                  <Spacer />
                  {startDate ? (
                    <span>
                      {dayjs(startDate).isBefore(dayjs()) && (
                        <span style={{ marginLeft: 10 }}>
                          <b>This Call occurs in the past !</b>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      {dayjs(values.startDate).isBefore(dayjs()) && (
                        <span style={{ marginLeft: 10 }}>
                          <b>This Call occurs in the past !</b>
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <Spacer/>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    name="callDescription"
                    label="Description"
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                    />
                </div>
              </div>
              {/* <Spacer />
              <FlexContainer justifyContent="flex-end">
                {isEditing && (
                  <>
                    <StyledPopconfirm
                      title="Do you want to delete?"
                      onConfirm={() => deleteCall(prefillCall.callId)}
                    >
                      <Button
                        type="danger"
                        htmlType="submit"
                        loading={deletingCall}
                      >
                        Delete
                      </Button>
                    </StyledPopconfirm>
                  </>
                )} */}
                <Spacer />
                <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  // loading={isEditing ? updatingCall : addingCandidateCall}
                >
                  Create
                  {/* {isEditing ? "Update" : "Create"} */}
                </Button>
                </FlexContainer>
              
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, candidate }) => ({
  addingCandidateCall: candidate.addingCandidateCall,
  // updatingCall: call.updatingCall,
  user: auth.userDetails,
  // deletingCall: call.deleteCall,
  userId: auth.userDetails.userId,
  ownerIds:auth.userDetails.userId,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCall,
      // handleChooserModal,
      // updateCall,
      // handleCallModal,
      // deleteCall,
      // handleAccountTimelineModal,
      // handleContactActivityModal,
      // handleOpportunityActivityModal,
      getActivityListByCandidateId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateCallForm);
