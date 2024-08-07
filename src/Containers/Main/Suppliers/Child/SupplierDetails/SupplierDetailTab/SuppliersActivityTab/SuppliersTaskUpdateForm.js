import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Icon, Tooltip } from "antd";
import { Formik, Form, Field } from "formik";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import dayjs from "dayjs";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { handleTaskModal } from "../../../../../Task/TaskAction";
import {  updateSuppliersTask } from "../../../SuppliersAction";
import { handleChooserModal } from "../../../../../Planner/PlannerAction";
import { StyledLabel } from "../../../../../../Components/UI/Elements";
import { getOppoStages } from "../../../../../Settings/SettingsAction";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import ButtonGroup from "antd/lib/button/button-group";

const TaskSchema = Yup.object().shape({
  name: Yup.string()
    .nullable()
    .required("Input required!"),
});

class SuppliersTaskUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.setEditingTask
        ? this.props.setEditingTask.status
        : "To Start",
      priority: this.props.setEditingTask
        ? this.props.setEditingTask.priority
        : "High",

      Type: this.props.setEditingTask
        ? this.props.setEditingTask.type
        : "Email",
      selectedType: this.props.setEditingTask
        ? this.props.setEditingTask.type
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

  handleCallback = () => {
    const { handleChooserModal, handleTaskModal, callback } = this.props;
    handleChooserModal(false);
    handleTaskModal(false);
    callback && callback();
  };
  componentDidMount() {}

  handleButtonClick = (type) => {
    this.setState({ priority: type });
    // alert(this.state.priority)
  };
  render() {
    const today = dayjs();
    var todayDate = new Date();
    console.log(today);
    const {
      user: { userId, firstName, middleName, lastName, timeZone },
      addingTask,
      isEditing,
      prefillTask,
      addTask,
      startDate,
      endDate,
      defaultContacts,
      ownerId,
      defaultAccounts,
      updateDistributorTask,
      updatingTask,
      defaultOpportunities,
      oppoStages,
    } = this.props;
  
    console.log(oppoStages);

    function getStagesOptions(filterOptionKey, filterOptionValue) {
      console.log(filterOptionKey, filterOptionValue);
      const stagesOptions =
        oppoStages.length &&
        oppoStages
          .filter((option) => {
         
            if (option.opportunityId === filterOptionValue[0]) {
              return option;
            }
          })
          .map((option) => ({
            label: option.stageName || "",
            value: option.stageId,
          }));
      //////debugger

      return stagesOptions;
    }

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={{
            name: this.props.setEditingTask.topic || "",
            status: this.state.active,
            priority: this.state.priority,
            type: this.state.Type,
            startDate: dayjs(this.props.setEditingTask.startDate),

            endDate: dayjs(this.props.setEditingTask.endDate),
            description: this.props.setEditingTask.description || "",
            userId: this.props.userId,
            timeZone: this.props.setEditingTask.timeZone,
          }}
          validationSchema={TaskSchema}
          onSubmit={(values, { resetForm }) => {
            updateDistributorTask(
              this.props.setEditingTask.taskId,
              {
                ...values,
                type: this.state.Type,
                status: this.state.active,
                priority: this.state.priority,

                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
              },
              this.props.setEditingTask.taskId,
              this.handleCallback
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
            <Form>
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
                        name="name"
                        label="Name"
                        component={InputComponent}
                        isColumn
                        width={"100%"}
                        inlineLabel
                        style={{
                          flexBasis: "60%",
                          height: "29px",
                          marginTop: "0px",
                        }}
                        status={this.state.active}
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
                          
                          />
                        </ButtonGroup>
                      </div>
                    </div>
                  </div>
                  <mt-3 />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between w-[100%] grow shrink h-auto mr-auto ">
                    <div style={{ width: "45%" }}>
                    <div class=" flex flex-row flex-wrap items-start self-start justify-between w-[100%] grow shrink h-auto mr-auto ">
                        <div style={{ width: "100%" }}>
                          <StyledLabel>Priority</StyledLabel>

                          <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                            <Tooltip title="High">
                              <Button
                                type="primary"
                                shape="circle"
                                icon={
                                  <ExclamationCircleOutlined
                                    style={{ fontSize: "3px" }}
                                  />
                                }
                                onClick={() => this.handleButtonClick("High")}
                                style={{
                                  backgroundColor:
                                    this.state.priority === "High"
                                      ? "red"
                                      : "white",
                                }}
                              />
                            </Tooltip>
                            &nbsp;
                            <Tooltip title="Medium">
                              <Button
                                type="primary"
                                shape="circle"
                                icon={
                                  <ExclamationCircleOutlined
                                    style={{ fontSize: "3px" }}
                                  />
                                }
                                onClick={() => this.handleButtonClick("Medium")}
                                style={{
                                  backgroundColor:
                                    this.state.priority === "Medium"
                                      ? "Orange"
                                      : "white",
                                }}
                              />
                            </Tooltip>
                            &nbsp;
                            <Tooltip title="Low">
                              <Button
                                type="primary"
                                shape="circle"
                                icon={
                                  <ExclamationCircleOutlined
                                    style={{ fontSize: "3px" }}
                                  />
                                }
                                onClick={() => this.handleButtonClick("Low")}
                                style={{
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

                    <div style={{ width: "55%" }}>
                    <div class=" flex flex-row flex-wrap items-start self-start justify-between w-[100%] grow shrink h-auto mr-auto ">
                        <div style={{ width: "100%" }}>
                          <StyledLabel>Type</StyledLabel>

                          <div class=" flex flex-row flex-wrap items-start self-start justify-between w-[100%] grow shrink h-auto mr-auto ">
                            <Tooltip title="Email">
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
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
           
                  <mt-3 />
                  <div
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
                        style={{
                          flexBasis: "80%",
                          height: "29px",
                          marginTop: "0px",
                          width: "100%",
                        }}
                      />

                      <mt-3 />
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
                        style={{
                          flexBasis: "80%",
                          height: "29px",
                          marginTop: "0px",
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
                  <div>
                    <mt-3 style={{ marginBottom: "18px" }} />
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
                    name="description"
                    label="Description"
                    width={"350px"}
                    isColumn
                    component={TextareaComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "80px",
                      marginTop: "0px",
                    }}
                  />
                
                  <mt-3 />
                </div>
              </div>
              <mt-3 />
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.updatingSuppliersTask}
                >
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, task, distributor, suppliers }) => ({
  addingTask: task.addingTask,
  user: auth.userDetails,
  updatingSuppliersTask: suppliers.updatingSuppliersTask,
  setEditingTask: task.setEditingTask,
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleChooserModal,
      updateSuppliersTask,
      handleTaskModal,
      getOppoStages,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuppliersTaskUpdateForm);

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
