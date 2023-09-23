import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Icon, Tooltip } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { Spacer } from "../../../../../../../../Components/UI/Elements";

import SearchSelect from "../../../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../../../Components/Forms/Formik/InputComponent";

import { SelectComponent } from "../../../../../../../../Components/Forms/Formik/SelectComponent";

import { DatePicker } from "../../../../../../../../Components/Forms/Formik/DatePicker";
import {
  addCandidateTask,
  // updateTask,
  // handleTaskModal,
  getActivityListByCandidateId
} from "../../../../../../CandidateAction";
// import { handleChooserModal } from "../../../Planner/PlannerAction";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { StyledLabel } from "../../../../../../../../Components/UI/Elements";
// import { getOppoStages } from "../../../Settings/SettingsAction";
import { FlexContainer } from "../../../../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../../../../Components/Forms/Formik/TextareaComponent";
import ButtonGroup from "antd/lib/button/button-group";
import { getTasks } from "../../../../../../../Settings/Task/TaskAction";
/**
 * yup validation scheme for creating a opportunity
 */
// const TaskSchema = Yup.object().shape({
//   priority: Yup.string().required("Select Priority"),
//   taskSubject: Yup.string().required("This field is required !"),
//   taskStatus: Yup.string().required("This field is required !"),

//   timeZone: Yup.string().required("Input required !"),
//   startDate: Yup.string()
//     .nullable()
//     .required("Input required !"),
// });

class CandidateTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.selectedTask
        ? this.props.selectedTask.taskStatus
        : "To Start",
      priority: this.props.selectedTask
        ? this.props.selectedTask.priority
        : "High",

      Type: this.props.selectedTask
        ? this.props.selectedTask.taskType
        : "Email",
      selectedType: this.props.selectedTask
        ? this.props.selectedTask.taskType
        : "Email",
    };
  }

  handleTypeChange = (data) => {
    debugger;
    this.setState({ Type: data });
    this.setState({ selectedType: data });
  };
  glassButtoClick = (type) => {
    this.setState({ active: type });
    // alert(this.state.active)
  };

  handleCallback = (resetForm) => {
    const { callback } = this.props;
    this.props.getActivityListByCandidateId(this.props.candidateId);
    callback && callback();
    resetForm();
  };
  componentDidMount() {
    // this.props.getOppoStages();
  }

  handleButtonClick = (type) => {
    this.setState({ priority: type });
    // alert(this.state.priority)
  };
  render() {
    const today = dayjs();
    var todayDate = new Date();
    console.log(today);
    const {
      user: {
        userId,
        firstName,
        middleName,
        lastName,
        // timeZone
      },
      addingTask,
      isEditing,
      prefillTask,
      addCandidateTask,
      startDate,
      endDate,
      defaultContacts,
      ownerId,
      defaultAccounts,
      updateTask,
      updatingTask,
      defaultOpportunities,
      oppoStages,
      taskTypeId,
    } = this.props;
    // console.log(isEditing);
    // console.log(prefillTask);
    // console.log(addCandidateTask);
    // console.log(defaultContacts);

    console.log(oppoStages);

    // function getStagesOptions(filterOptionKey, filterOptionValue) {
    //   console.log(filterOptionKey, filterOptionValue);
    //   const stagesOptions =
    //     oppoStages.length &&
    //     oppoStages
    //       .filter((option) => {
    //         //////debugger
    //         // console.log(option);
    //         // console.log(option.processId);
    //         // console.log(filterOptionValue[0]);
    //         if (option.opportunityId === filterOptionValue[0]) {
    //           return option;
    //         }
    //       })
    //       .map((option) => ({
    //         label: option.stageName || "",
    //         value: option.stageId,
    //       }));
    //   //////debugger

    //   return stagesOptions;
    // }

    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            // isEditing
            //   ? prefillTask
            //   : {
            taskName: "",
            taskStatus: this.state.active,
            priority: this.state.priority,
            taskType: this.state.Type,
            startDate: startDate || null,
            endDate: endDate || null,
            notes: "",
            taskCandidateId: this.props.candidateId,
            // userId: this.props.userId,
            ownerIds: [this.props.userId],
            taskTypeId: "",
            candidateId: this.props.candidateId,
            // }
          }}
          // validationSchema={TaskSchema}
          onSubmit={(values, { resetForm }) => {
            ////debugger;
            console.log(values);
            if (!values.endDate) {
              values.endDate = values.startDate;
            }
            console.log(values.startDate);
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
            let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
            var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
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
            // isEditing
            //   ? updateTask(
            //       prefillTask.taskId,
            //       {
            //         ...values,
            //         taskType: this.state.Type,
            //         taskStatus: this.state.active,
            //         priority: this.state.priority,
            //         startDate: dayjs(values.startDate).toISOString(),
            //         endDate: dayjs(values.endDate).toISOString(),
            //       },
            //       this.handleCallback
            //     )
            //   : addCandidateTask(
            //       {
            //         ...values,
            //         taskStatus: this.state.active,
            //         taskType: this.state.Type,
            //         priority: this.state.priority,
            //         association: {
            //           ...values.association,
            //           ownerIds: userId === userId ? [userId] : [],
            //         },

            //         startDate: dayjs(values.startDate).toISOString(),
            //         endDate: dayjs(values.endDate).toISOString(),
            //       },
            //       this.handleCallback
            //     );
            // !isEditing && resetForm();
            this.props.addCandidateTask(
              {
                ...values,
              },
              this.props.userId,
              this.props.candidateId,

              () => this.handleCallback(resetForm)
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "65%" }}>
                      <Field
                        isRequired
                        name="taskName"
                        label="Name"
                        component={InputComponent}
                        isColumn
                        width={"100%"}
                        inlineLabel
                      />
                    </div>

                    <div style={{ width: "30%" }}>
                      <StyledLabel>Status</StyledLabel>

                      <div style={{ width: "100%" }}>
                        <ButtonGroup>
                          <StatusIcon
                            color="blue"
                            type="To Start"
                            iconType="fa-hourglass-start"
                            tooltip="To Start"
                            status={this.state.active}
                            onClick={() => this.glassButtoClick("To Start")}
                          />

                          <StatusIcon
                            type="In Progress"
                            iconType="fa-hourglass-half"
                            tooltip="In Progress"
                            status={this.state.active}
                            onClick={() => this.glassButtoClick("In Progress")}
                          />

                          <StatusIcon
                            type="Completed"
                            iconType="fa-hourglass"
                            tooltip="Completed"
                            status={this.state.active}
                            onClick={() => this.glassButtoClick("Completed")}
                          //  status={item.taskStatus}
                          //  onClick={() =>
                          //    patchTask(item.taskId, { ...item, taskStatus: "Completed" })
                          //  }
                          />
                        </ButtonGroup>
                      </div>
                    </div>
                  </div>
                  <Spacer />
                  <FlexContainer
                    justifyContent="spcae-between"
                    style={{ width: "100%" }}
                  >
                    <div style={{ width: "45%" }}>
                      <FlexContainer
                        justifyContent="spcae-between"
                        style={{ width: "100%" }}
                      >
                        <div style={{ width: "100%" }}>
                          <StyledLabel>Priority</StyledLabel>

                          <FlexContainer>
                          <Tooltip
                              //title="High"
                              title={
                                <FormattedMessage
                                  id="app.high"
                                  defaultMessage="High"
                                />
                              }
                            >
                              <Button
                               // type="primary"
                                shape="circle"                              
                               onClick={() => this.handleButtonClick("High")}
                                style={{
                                  borderRadius: "50%",
                                      height: "2.1875em",
                                      width: "2.1875em",
                                  backgroundColor:
                                    this.state.priority === "High"
                                      ? "red"
                                      : "white",                                                                            
                                }}
                              />
                            </Tooltip>
                            &nbsp;
                            <Tooltip
                              //title="Medium"
                              title={
                                <FormattedMessage
                                  id="app.medium"
                                  defaultMessage="Medium"
                                />
                              }
                            >
                              <Button
                               // type="primary"
                                shape="circle"
                                onClick={() => this.handleButtonClick("Medium")}
                                style={{
                                  borderRadius: "50%",
                                      height: "2.1875em",
                                      width: "2.1875em",
                                  backgroundColor:
                                    this.state.priority === "Medium"
                                      ? "Orange"
                                      : "white",
                                }}
                              />
                            </Tooltip>
                            &nbsp;
                            <Tooltip //title="Low"
                              title={
                                <FormattedMessage
                                  id="app.low"
                                  defaultMessage="Low"
                                />
                              }
                            >
                              <Button
                                //type="primary"
                                shape="circle"
                                onClick={() => this.handleButtonClick("Low")}
                                style={{
                                  borderRadius: "50%",
                                      height: "2.1875em",
                                      width: "2.1875em",
                                  backgroundColor:
                                    this.state.priority === "Low"
                                      ? "teal"
                                      : "white",
                                }}
                              ></Button>
                            </Tooltip>
                          </FlexContainer>
                        </div>
                      </FlexContainer>
                    </div>

                    <div style={{ width: "47%", marginLeft: "1.8em" }}>
                      <FlexContainer
                        justifyContent="space-between"
                        style={{ width: "100%" }}
                      >

                        <div style={{ width: "100%" }}>
                          <StyledLabel>
                            Type
                            {/* <FormattedMessage id="app.type" defaultMessage="Type" /> */}
                          </StyledLabel>
                          <Field
                            isRequired
                            name="taskTypeId"
                            // label="Type"
                            isColumnWithoutNoCreate
                            component={SearchSelect}
                            selectType="taskType"
                            isColumn
                            inlineLabel
                          />
                          {/* <Tooltip title="Email">
                              <div
                                onClick={() => this.handleTypeChange("Email")}
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Email"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="mail"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip title="LinkedIn post">
                              <div
                                onClick={() =>
                                  this.handleTypeChange("LinkedIn post")
                                }
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "LinkedIn post"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="linkedin"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip title="Ticket">
                              <div
                                onClick={() => this.handleTypeChange("Ticket")}
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Ticket"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="idcard"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip title="Documentation">
                              <div
                                onClick={() =>
                                  this.handleTypeChange("Documentation")
                                }
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Documentation"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="file"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip title="Research">
                              <div
                                onClick={() =>
                                  this.handleTypeChange("Research")
                                }
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Research"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="file-search"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip title="Collaborate">
                              <div
                                onClick={() =>
                                  this.handleTypeChange("Collaborate")
                                }
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Collaborate"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="wechat"></Icon>
                              </div>
                            </Tooltip>

                            <Tooltip title="Other">
                              <div
                                onClick={() => this.handleTypeChange("Other")}
                                style={{
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  color:
                                    this.state.selectedType === "Other"
                                      ? "Orange"
                                      : null,
                                }}
                              >
                                <Icon type="more"></Icon>
                              </div>
                            </Tooltip> */}

                        </div>
                      </FlexContainer>
                    </div>
                  </FlexContainer>

                  {/* <div style={{ width: "50%" }}>
                      <Field
                        name="taskType"
                        label="Type"
                        isColumn
                        component={SelectComponent}
                        options={[
                          "Email",
                          "LinkedIn post",
                          "Documentation",
                          "Research",
                          "Collaborate",
                          "Others",
                        ]}
                        inlineLabel
                        style={{ flexBasis: "80%", marginTop: "4px" }}
                        // defaultValue='low'
                      />
                    </div>
                  </FlexContainer> */}

                  <Spacer />
                  <FlexContainer
                    justifyContent="space-between"
                    style={{ width: "100%" }}
                  >
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="startDate"
                        label="Start "
                        component={DatePicker}
                        // width="100%"
                        value={values.startDate}
                        isColumn
                        inlineLabel
                      />
                      <Spacer />
                    </div>

                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="endDate"
                        label="End "
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
                  </FlexContainer>
                  <div>
                    <Spacer style={{ marginBottom: "18px" }} />
                    {/* <Field
                      isRequired
                      defaultValue={{ label: timeZone, value: userId }}
                      name="timeZone"
                      label="TimeZone "
                      isColumn
                      margintop={"4px"}
                      selectType="timeZone"
                      value={values.timeZone}
                      component={SearchSelect}
                      inlineLabel
                      style={{ flexBasis: "80%" }}
                    /> */}

                    {values.startDate && (
                      <>
                        {dayjs(todayDate).isSameOrBefore(
                          dayjs(values.startDate)
                        ) ? (
                          <></>
                        ) : (
                          <>
                            {" "}
                            <span style={{ marginLeft: 10 }}>
                              <b>This Task occurs in the past !</b>
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    name="notes"
                    label="Description"
                    width={"350px"}
                    isColumn
                    component={TextareaComponent}
                    inlineLabel
                  />
                  {/* <Field
                    name="association.ownerIds"
                    selectType="user"
                    label="Assigned to"
                    component={SearchSelect}
                    isColumn
                    margintop={"4px"}
                    value={values.association.ownerIds}
                    defaultValue={{
                      label: `${firstName || ""} ${middleName ||
                        ""} ${lastName || ""}`,
                      value: userId,
                    }}
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  /> */}

                  {/* <Field
                    isRequired
                    name="callwith"
                    type="text"
                    label="Call with"
                    width={"100%"}
                    component={SelectComponent}
                    options={["Distributor", "Customer"]}
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "60%" }}
                  /> */}

                  <Spacer />
                </div>
              </div>
              <Spacer />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                // loading={isEditing ? updatingTask : addingTask}
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

const mapStateToProps = ({ auth, candidate, settings, tasks }) => ({
  addingCandidateTask: candidate.addingCandidateTask,
  user: auth.userDetails,
  // updatingTask: task.updatingTask,
  //   oppoStages: settings.oppoStages,
  userId: auth.userDetails.userId,
  ownerIds: auth.userDetails.userId,
  tasks: tasks.tasks,
  candidateId: candidate.candidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addCandidateTask,
      //   handleChooserModal,
      // updateTask,
      // handleTaskModal,
      //   getOppoStages,
      getTasks,
      getActivityListByCandidateId
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CandidateTaskForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  console.log(start);
  //////debugger;
  if (status === type) {
    size = "30px";
  } else {
    size = "16px";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "6px",
          borderColor: "transparent",
          color: status === type ? "orange" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
      </Button>
    </Tooltip>
  );
}
