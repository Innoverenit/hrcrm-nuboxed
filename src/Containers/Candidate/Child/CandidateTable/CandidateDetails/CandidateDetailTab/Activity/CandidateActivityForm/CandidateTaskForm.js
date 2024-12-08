import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import { Formik, Form, Field, } from "formik";
import dayjs from "dayjs";

import SearchSelect from "../../../../../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../../../../../Components/Forms/Formik/DatePicker";
import {
  addCandidateTask,
  getActivityListByCandidateId
} from "../../../../../../CandidateAction";

import { TextareaComponent } from "../../../../../../../../Components/Forms/Formik/TextareaComponent";
import ButtonGroup from "antd/lib/button/button-group";
import { getTasks } from "../../../../../../../Settings/Task/TaskAction";

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
          <div class=" flex justify-between " >
                <div class=" h-full w-[45%]"
                >
    <div class=" flex justify-between " >
    <div class=" w-[65%] " >
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

                    <div class=" w-[30%] " >
                      <div class=" text-xs font-bold font-poppins text-black">Status</div>

                      <div class=" w-full " >
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
                  <div class=" flex justify-between w-full mt-4 " >
                  <div class=" w-[45%]"
                >
                   <div class=" flex justify-between w-full" >
                        <div class=" w-full" style={{ width: "100%" }}>
                          <div class=" text-xs font-bold font-poppins text-black">Priority</div>

                          <div class=" flex">
                          <Tooltip
                              title="High"
                              
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
                              title="Medium"
                             
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
                            <Tooltip 
                            title="Low"
                             
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
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class=" w-[47%] ml-[1.8em]" >
                    <div class=" flex justify-between w-full " >

                        <div class=" w-full" >
                          <div class=" text-xs font-bold font-poppins text-black">
                            Type
                           
                          </div>
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
                        

                        </div>
                      </div>
                    </div>
                  </div>

<div class=" flex justify-between mt-4 w-full" >
                    <div class=" w-[47%]" >
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
                 
                    </div>

                    <div class=" w-[47%]" >
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
                  </div>
                  <div class=" mb-[18px]">
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

                <div class=" h-full w-[45%] "
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
                    label="Assigned"
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

             
                </div>
              </div>
              <div class=" flex justify-end mt-4" >
                <Button
                  type="primary"
                  htmlType="submit"
                // loading={isEditing ? updatingTask : addingTask}
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
