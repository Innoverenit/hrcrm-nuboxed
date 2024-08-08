import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip } from "antd";
import {
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Formik, Form, Field} from "formik";
import dayjs from "dayjs";
import { InputComponent } from "../../../../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../../../../Components/Forms/Formik/DatePicker";
import {
  addSuppliersActivityTask,
} from "../../../../SuppliersAction";
import { StyledLabel } from "../../../../../../../Components/UI/Elements";
import { TextareaComponent } from "../../../../../../../Components/Forms/Formik/TextareaComponent";
import ButtonGroup from "antd/lib/button/button-group";
import * as Yup from "yup";
import { SelectComponent } from "../../../../../../../Components/Forms/Formik/SelectComponent";
import { getTasks } from "../../../../../../Settings/Task/TaskAction";

const FormSchema = Yup.object().shape({
  startDate: Yup.string()
    .nullable()
    .required("Input needed!"),

});

class SuppliersActivityTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "To Start",
      priority: "High",

      Type: "Email",
      selectedType: "Email",
    };
  }

  handleTypeChange = (data) => {
    debugger;
    this.setState({ Type: data });
    this.setState({ selectedType: data });
  };
  glassButtoClick = (type) => {
    this.setState({ active: type });
  };

  handleCallback = (resetForm) => {
    const { callback } = this.props;

    callback && callback();
    resetForm();
  };

  handleButtonClick = (type) => {
    this.setState({ priority: type });
  };
  componentDidMount() {
    this.props.getTasks();;
  }
  render() {
    const taskType = this.props.tasks.map((item) => {
      return {
        label: item.taskType || "",
        value: item.taskTypeId,
      };
    });
    const today = dayjs();
    var todayDate = new Date();
    console.log(today);
    const {
      user: { userId, firstName, middleName, lastName, timeZone },

      startDate,
      endDate,
    } = this.props;

    return (
      <>
        <Formik
          initialValues={{
            name: "",
            status: this.state.active,
            priority: this.state.priority,
            type: this.state.Type,
            taskTypeId: "",
            startDate: startDate || dayjs(),
            endDate: endDate || null,
            description: "",
            supplierId: this.props.supplier.supplierId,
            userId: this.props.userId,
          }}
          validationSchema={FormSchema}
          onSubmit={(values, { resetForm }) => {
            this.props.addSuppliersActivityTask(
              {
                ...values,
                status: this.state.active,
                priority: this.state.priority,
                type: this.state.Type,
              },

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
                        label="Topic"
                        component={InputComponent}
                        isColumn
                        width={"100%"}
                        inlineLabel
                        style={{
                          flexBasis: "60%",
                          height: "29px",
                          marginTop: "0px",
                        }}
                      />
                    </div>

                    <div style={{ width: "30%" }}>
                      <div class=" text-xs font-bold font-poppins text-black">Status</div>

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
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between w-full grow shrink h-auto mr-auto ">
                    <div style={{ width: "45%" }}>
                    <div class=" flex flex-row flex-wrap items-start self-start justify-between w-full grow shrink h-auto mr-auto ">
                        <div style={{ width: "100%" }}>
                          <div class=" text-xs font-bold font-poppins text-black">Priority</div>

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
                    <div class=" flex flex-row flex-wrap items-start self-start justify-between w-full grow shrink h-auto mr-auto ">
                        <div style={{ width: "100%" }}>
                        <Field
                            name="taskTypeId"
                            // placeholder="Designation"
                            label="Type"
                            component={SelectComponent}
                            options={Array.isArray(taskType) ? taskType : []}
                            style={{
                              borderRadius: "2px",
                              width: "100%"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <mt-3 />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between w-full grow shrink h-auto mr-auto ">
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
                  loading={this.props.addingDistributorActivityTask}
                >
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, distributor, suppliers, tasks }) => ({
  addingSuppliersActivityTask: suppliers.addingSuppliersActivityTask,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  distributorDistributorId:
    distributor.distributorDetailsByDistributorId.distributorId,
    tasks: tasks.tasks,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addSuppliersActivityTask,
      getTasks,

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuppliersActivityTaskForm);

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
