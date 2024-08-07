import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";
import {
  StyledLabel,
} from "../../../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../../../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../../../../../../Components/Forms/Formik/TimePicker";
import {
  addCall,
   getActivityListByCandidateId
} from "../../../../../../CandidateAction";
import { TextareaComponent } from "../../../../../../../../Components/Forms/Formik/TextareaComponent";
const ButtonGroup = Button.Group;

const green = "#39D1B4";
const yellow = "#FFD712";

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
              <div class=" flex justify-between " >
                <div class=" h-full w-[45%]"
                >
               <div class=" flex justify-between " >
                    <div class=" w-[30%] mb-[1.25em]" >
                      <StyledLabel>Type</StyledLabel>
                 
                      <div class=" flex justify-between mt-4 " >
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
                      </div>
                    </div>
                    <div class=" w-[55%]" >
                      <StyledLabel>Category</StyledLabel>
                      <mt-3 />
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
                  </div>

                  <mt-3 />
                  <Field
                    name="callPurpose"
                    label="Topic"
                    component={InputComponent}
                    isColumn
                    width={"100%"}
                    inlineLabel
                    />
                  <mt-3 />
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
              

                  <div class=" flex justify-between mt-4" >
                    <div class=" w-[47%]" >
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
                    <div class=" w-[47%]" >
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
                  </div>
                  <mt-3 />

                  <mt-3 />
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
                <div class=" h-full w-[45%] mt-4"
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
                <mt-3 />
                <div class=" flex justify-end" >
                <Button
                  type="primary"
                  htmlType="submit"
                  // loading={isEditing ? updatingCall : addingCandidateCall}
                >
                  Create
                  {/* {isEditing ? "Update" : "Create"} */}
                </Button>
                </div>
              
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
      getActivityListByCandidateId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateCallForm);
