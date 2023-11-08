import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import{getAllOpportunityData} from "../../Opportunity/OpportunityAction"
import {getAllCustomerData} from "../../Customer/CustomerAction"
import { Button, Tooltip, Switch } from "antd";
import { getEmployeelist } from "../../../Containers/Employees/EmployeeAction";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FastField } from "formik";
import moment from "moment";
import { getFilteredEmailContact } from "../../Candidate/CandidateAction";
import { Spacer } from "../../../Components/UI/Elements";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../Components/Forms/Formik/TimePicker";
import {
  updateTask,
  handleTaskModal,
  getCustomerTask,
  getProjectTaskList,
  getCandidateTaskList,
  getCandidateTaskFilterList,
} from "../TaskAction";
import { getTasks } from "../../../Containers/Settings/Task/TaskAction";
import {  getTaskForRecruit,} from "../../Settings/SettingsAction"
import { getUnits } from "../../../Containers/Settings/Unit/UnitAction";
import { handleChooserModal } from "../../Planner/PlannerAction";
import { StyledLabel } from "../../../Components/UI/Elements";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import ButtonGroup from "antd/lib/button/button-group";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import Upload from "../../../Components/Forms/Formik/Upload";
import DragableUpload from "../../../Components/Forms/Formik/DragableUpload";
import { Select } from "antd";
const { Option } = Select;

function UpdateTaskForm(props) {
  const candidateNameOption =
    props.setEditingTask.candidates === null
      ? []
      : props.setEditingTask.candidates.map((item) => {
          return item.candidateId;
        });

  const [active, setActive] = useState(
    props.setEditingTask ? props.setEditingTask.status : "To Start"
  );
  const [reminder, setReminder] = useState(true);
  const [complexity, setComplexity] = useState(
    props.setEditingTask ? props.setEditingTask.complexity : "Easy"
  );
  const [priority, setPriority] = useState(
    props.setEditingTask ? props.setEditingTask.priority : "High"
  );
  const [type, setType] = useState(
    props.setEditingTask ? props.setEditingTask.type : "Email"
  );
  const [selectedType, setSelectedType] = useState(
    props.setEditingTask ? props.setEditingTask.type : "Email"
  );

  const [candidate, setCandidate] = useState(candidateNameOption);

  useEffect(() => {
    const candidateNameOption =
      props.setEditingTask.candidates === null
        ? []
        : props.setEditingTask.candidates.map((item) => {
            return item.candidateId;
          });
    setCandidate(candidateNameOption);
  }, [props.setEditingTask]);

  function handleTypeChange(data) {
    debugger;
    // this.setState({ Type: data });
    setType(data);
    setSelectedType(data);
    // this.setState({ selectedType: data });
  }
  function glassButtoClick(type) {
    // this.setState({ active: type });
    setActive(type);
    // alert(this.state.active)
  }

  function handleChangeCandidate(value) {
    setCandidate(value);
  }

  function handleReminderChange(checked) {
    setReminder(checked);
  }

  function handleButtonClick(type) {
    // this.setState({ priority: type });
    setPriority(type);
    // alert(this.state.priority)
  }
  function handleComplexityClick(type) {
    // this.setState({ complexity: type });
    setComplexity(type);
    // alert(this.state.priority)
  }
  function handleprojectOptions(filterOptionKey, filterOptionValue) {
    const projectOptions =
      props.projectTaskList.length &&
      props.projectTaskList
        .filter((option) => {
          if (
            option.customerId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.projectName || "",
          value: option.projectId,
        }));

    return projectOptions;
  }
  function handlecandidateOptions(filterOptionKey, filterOptionValue) {
    const candidateOptions =
      props.candidateFilterTaskList.length &&
      props.candidateFilterTaskList
        .filter((option) => {
          if (
            option.customerId === filterOptionValue &&
            option.probability !== 0
          ) {
            return option;
          }
        })
        .map((option) => ({
          label: option.candidateName || "",
          value: option.candidateId,
        }));
    console.log(candidateOptions);

    return candidateOptions;
  }

  useEffect(() => {
    //props.getEmployeelist();
    props.getCustomerTask(props.orgId);
    props.getFilteredEmailContact(props.userId);
    props.getAllOpportunityData(props.userId)
    props.getProjectTaskList(props.orgId);
    props.getTasks();
    props.getAllCustomerData(props.userId)
    props.getUnits(props.orgId);
    props.getCandidateTaskList(props.orgId);
    props.getTaskForRecruit(props.orgId);
    props.getCandidateTaskFilterList(props.orgId);
    props.getEmployeelist(props.userId);
  }, []);

  const today = moment();
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
    deleteTask,
    deletingTask,
    defaultContacts,
    ownerId,
    defaultAccounts,

    updatingTask,

    startTime,
    endTime,
    defaultOpportunities,
    // oppoStages,
    employeeId,
    taskTypeId,
  } = props;

  const unitData = props.units.map((item) => {
    return {
      label: `${item.unitName}`,
      value: item.unitId,
    };
  });

  const TaskOption = props.tasks.map((item) => {
    return {
      label: item.taskType,
      value: item.taskTypeId,
    };
  });
  const customerNameOption = props.allCustomerData
  .sort((a, b) => {
    const libraryNameA = a.name && a.name.toLowerCase();
    const libraryNameB = b.name && b.name.toLowerCase();
    if (libraryNameA < libraryNameB) {
      return -1;
    }
    if (libraryNameA > libraryNameB) {
      return 1;
    }

    // names must be equal
    return 0;
  })
  .map((item) => {
    return {
      label: `${item.name || ""}`,
      value: item.customerId,
    };
  });
  const ContactData = props.filteredContact.map((item) => {
    return {
      label: `${item.fullName}`,
      value: item.contactId,
    };
  });

  const candidateOption = props.candidateTaskList.map((item) => {
    return {
      label: item.fullName,
      value: item.candidateId,
    };
  });

  const employeeOption = props.employees.map((item) => {
    return {
      label: item.fullName,
      value: item.employeeId,
    };
  });

  const opportunityNameOption = props.allOpportunityData.map((item) => {
    return {
      label: `${item.opportunityName}`,
      value: item.opportunityId,
    };
  });

  const TaskOptions = props.recruitTask.map((item) => {
    return {
      label: `${item.taskChecklistName}`,
      value: item.taskChecklistId,
    };
  });
  const customerData = props.customerTaskList
    .sort((a, b) => {
      const customerNameA = a.name && a.name.toLowerCase();
      const customerNameB = b.name && b.name.toLowerCase();
      if (customerNameA < customerNameB) {
        return -1;
      }
      if (customerNameA > customerNameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
    .map((item) => {
      return {
        label: `${item.name}`,
        // label: `${item.salutation || ""} ${item.firstName ||
        //   ""} ${item.middleName || ""} ${item.lastName || ""}`,
        value: item.customerId,
      };
    });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={
          // isEditing ? prefillTask :
          {
            taskType: props.setEditingTask.taskType || "",
            link:props.setEditingTask.link || "",
            documentId:"",
            taskName: props.setEditingTask.taskName || "",
            value: props.setEditingTask.value || "",
            taskDescription: props.setEditingTask.taskDescription || "",
            timeZone: timeZone,
            // taskClosureDate: "",
            startDate: startDate || dayjs(),
            endDate: endDate || null,
            endDate: dayjs(),
            complitionStatus: active,
            assignedDate: moment(props.setEditingTask.assignedDate),
            // userId:props.userId,
            priority: priority,
            unit: props.setEditingTask.unit || "",

            remindInd: reminder ? true : false,
            remindTime: props.setEditingTask.remindTime || "",

            startTime: startDate || null,
            endTime: endDate || null,
            taskChecklistId:props.setEditingTask.taskChecklistId || "",
            assignedTo: props.setEditingTask.assignedTo || "",
            customerId: props.setEditingTask.customerId || "",
            candidateId: candidate,
            taskTypeId: props.setEditingTask.taskTypeId || "",
            projectName: props.setEditingTask.projectId || "",
            unit: props.setEditingTask.unit || "",
          }
        }
        // validationSchema={TaskSchema}
        onSubmit={(values, { resetForm }) => {
          ////debugger;
          console.log(values);
          console.log(values.startDate);

          let timeZoneFirst = "GMT+05:30";

          let mytimeZone = timeZoneFirst.substring(4, 10);
          console.log(mytimeZone);

          var a = mytimeZone.split(":");
          console.log(a);
          var timeZoneminutes = +a[0] * 60 + +a[1];
          console.log(timeZoneminutes);
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

          var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
          console.log(minutes);

          var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
          console.log(firstStartTimeminutes);

          let h = Math.floor(firstStartTimeminutes / 60); // converting to hours
          let m = firstStartTimeminutes % 60;
          h = h < 10 ? "0" + h : h;
          m = m < 10 ? "0" + m : m;
          let finalStartTime = `${h}:${m}`;
          console.log(finalStartTime);

          let newStartTime = `${finalStartTime}${timeEndPart}`;
          console.log(newStartTime);

          let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
          let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
          console.log(firstEndTime);
          let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
          console.log(firstEndHours);

          var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
          console.log(firstEndTimeSplit);
          var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
          console.log(endMinutes);
          var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
          console.log(firstEndTimeminutes);
          let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours
          console.log(hr);
          let mi = firstEndTimeminutes % 60;
          console.log(hr);
          hr = hr < 10 ? "0" + hr : hr;
          mi = mi < 10 ? "0" + mi : mi;
          let finalEndTime = `${hr}:${mi}`;
          console.log(finalEndTime);
          console.log(timeEndPart);
          console.log(`${finalEndTime}${timeEndPart}`);

          let newEndTime = `${finalEndTime}${timeEndPart}`;

          // isEditing?
          // updateTask
          props.updateTask(
            // prefillTask.taskId,
            props.setEditingTask.taskId,
            {
              ...values,
              candidateId: candidate,
              taskType: type,
              // taskStatus: active,
              priority: priority,
              complitionStatus: active,
              taskType: type,
              priority: priority,
              complexity: complexity,
              // ownerIds: userId === userId ? [userId] : [],
              // startDate: moment(values.startDate).toISOString(),
              // endDate: moment(values.endDate).toISOString(),
              // startDate: `${newStartDate}T${newStartTime}`,
              // endDate: `${newEndDate}T${newEndTime}`,
              startDate: `${newStartDate}T20:00:00Z`,
              endDate: `${newEndDate}T20:00:00Z`,
              startTime: 0,
              endTime: 0,
            }
            // this.handleCallback
          );
          resetForm();
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
          <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
          <Form className="form-background">
          <div class="flex justify-between pr-2 max-sm:flex-col">
              <div class=" h-full w-w47.5  max-sm:w-wk">
                <div class=" flex justify-between">
                  {values.taskTypeId === "TSK52434477391272022" && (
                    <FastField name="imageId" component={Upload} />
                  )}

                  {values.taskTypeId === "TSK52434477391272022" && (
                    <div class=" w-4/6  max-sm:w-wk">
                      <Field
                        name="documentId"
                        isRequired
                        component={DragableUpload}
                      />
                    </div>
                  )}
                </div>
                <div class=" flex justify-between  max-sm:flex-col">
                <div class=" flex justify-between flex-col w-full">
                        
                        <StyledLabel>
                          {/* Priority */}
                          <FormattedMessage
                            id="app.priority"
                            defaultMessage="Priority"
                          />
                          
                        </StyledLabel>
                      
                        <div class="flex">
                          <Tooltip title="High">
                            <Button
                              type="primary"
                               shape="circle"
                              // icon={<ExclamationCircleOutlined />}
                              onClick={() => handleButtonClick("High")}
                              style={{
                                backgroundColor:
                                  priority === "High"
                                    ? "red"
                                    : "white",
                                    borderRadius: "50%", 
                                    width: "31px", 
                                    height: "31px"
                              }}
                            />
                          </Tooltip>
                          &nbsp;
                          <Tooltip title="Medium">
                            <Button
                              type="primary"
                               shape="circle"
                              // icon={<ExclamationCircleOutlined />}
                              onClick={() => handleButtonClick("Medium")}
                              style={{
                                backgroundColor:
                                  priority === "Medium"
                                    ? "Orange"
                                    : "white",
                                    borderRadius: "50%", 
                                    width: "31px", 
                                    height: "31px",
                              }}
                            />
                          </Tooltip>
                          &nbsp;
                          <Tooltip title="Low">
                            <Button
                              type="primary"
                               shape="circle"
                              // icon={<ExclamationCircleOutlined />}
                              onClick={() => handleButtonClick("Low")}
                              style={{
                                backgroundColor:
                                  priority === "Low"
                                    ? "teal"
                                    : "white",
                                    borderRadius: "50%", // Set the borderRadius to 50% for a circular shape
                                    width: "31px", // Adjust the width as needed
                                    height: "31px"
                              }}
                            ></Button>
                          </Tooltip>
                        </div>
                      </div>
                  <div class=" w-1/2 max-sm:w-wk">
                   
                    <StyledLabel>Type</StyledLabel>
                    <Field
                      name="taskTypeId"
                      component={SelectComponent}
                      value={values.taskTypeId}
                      options={Array.isArray(TaskOption) ? TaskOption : []}
                      // value={values.taskTypeId}
                    />
                  </div>
                  <div class=" w-3/12 ml-2">                
                    <StyledLabel>
                      <FormattedMessage
                        id="app.status"
                        defaultMessage="Status"
                      />
                      {/* Status */}
                    </StyledLabel>
                    <div class=" w-full">
                      <ButtonGroup>
                        <StatusIcon
                          color="blue"
                          type="To Start"
                          iconType="fa-hourglass-start"
                          tooltip="To Start"
                          tooltipTitle={
                            <FormattedMessage
                              id="app.tostart"
                              defaultMessage="To Start"
                            />
                          }
                          status={active}
                          onClick={() => glassButtoClick("To Start")}
                        />
                        <StatusIcon
                          type="In Progress"
                          iconType="fa-hourglass-half"
                          tooltip="In Progress"
                          tooltipTitle={
                            <FormattedMessage
                              id="app.inprogress"
                              defaultMessage="In Progress"
                            />
                          }
                          status={active}
                          onClick={() => glassButtoClick("In Progress")}
                        />
                        <StatusIcon
                          type="Completed"
                          iconType="fa-hourglass"
                          tooltip="Completed"
                          tooltipTitle={
                            <FormattedMessage
                              id="app.completed"
                              defaultMessage="Completed"
                            />
                          }
                          status={active}
                          onClick={() => glassButtoClick("Completed")}
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
                {/* <div class=" flex justify-between w-full max-sm:flex-col">
                
                  <div class=" w-5/12 max-sm:w-wk">
                    <div class=" flex justify-between w-full">
                      <div class=" w-full">
                        <Field
                          isRequired
                          name="taskName"
                          label={
                            <FormattedMessage
                              id="app.name"
                              defaultMessage="Name"
                            />
                          }
                          component={InputComponent}
                          isColumn
                          width={"100%"}
                          inlineLabel
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Spacer /> */}
                
                <div class=" flex justify-between">
                {values.taskTypeId === "TSK52434477391272022" && (
                    <div class=" w-1/2 max-sm:w-wk">
                   <StyledLabel>
                  <Field
                   name="taskChecklistId"
                  // selectType="contactListFilter"
                   isColumnWithoutNoCreate
                   isRequired
                   value={values.taskChecklistId}
                   placeolder='Select type'
                   label={
                     <FormattedMessage
                       id="app.taskList"
                       defaultMessage="Task CheckList"
                     />
                   }
                  // component={SearchSelect}
                  component={SelectComponent}
                  options={Array.isArray(TaskOptions) ? TaskOptions : []} 
                   isColumn
                   inlineLabel
                 />
                  </StyledLabel>
                 </div>
                )}
                 </div>
                <div class=" flex justify-between">
                <div class=" w-1/2 ">
                      <Field
                        isRequired
                        name="endDate"
                        // label="End "
                        label={
                          <FormattedMessage
                            id="app.endDate"
                            defaultMessage="End Date"
                          />
                        }
                        component={DatePicker}
                        isColumn
                        value={values.endDate || values.startDate}
                        // defaultValue={dayjs("2015-01-01")}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                        disabledDate={(currentDate) => {
                          if (values.startDate) {
                            if (
                              moment(currentDate).isBefore(
                                moment(values.startDate)
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
                    <div class=" w-5/12">
                          <Field
                            isRequired
                            name="taskName"
                            //label="Name"
                            // value={values.taskName}
                            label={
                              <FormattedMessage
                                id="app.name"
                                defaultMessage="Name"
                              />
                            }
                            component={InputComponent}
                            isColumn
                            width={"100%"}
                            inlineLabel
                          />
                        </div>
               
                </div>
                <div class=" w-full mt-4">
                        <Field
                          name="documentId"
                          isRequired
                          component={DragableUpload}
                        />
                      </div>

                <div class=" flex justify-between">
                  {values.taskTypeId === "TSK52434477391272022" && (
                    <div class=" w-1/2">
                      <Field
                        // isRequired
                        name="customerId"
                        label="Customer"
                        isColumn
                        component={SelectComponent}
                        value={values.customerId}
                        options={
                          Array.isArray(customerData) ? customerData : []
                        }
                        // use12Hours

                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                  {values.taskTypeId === "TSK52434477391272022" && (
                    <div class=" w-5/12">
                      <Field
                        isRequired
                        name="projectName"
                        label="Project"
                        component={SelectComponent}
                        options={
                          Array.isArray(
                            handleprojectOptions(
                              "customerId",
                              values.customerId
                            )
                          )
                            ? handleprojectOptions(
                                "customerId",
                                values.customerId
                              )
                            : []
                        }
                        value={values.projectName}
                        isColumn
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div class=" flex justify-between">
                  {values.taskTypeId === "TSK52434477391272022" && (
                    <div class=" w-1/2">
                      <Field
                        // isRequired
                        name="value"
                        label="Value"
                        component={InputComponent}
                        isColumn
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                  {values.taskTypeId === "TSK52434477391272022" && (
                    <div class=" w-5/12">
                      <Field
                        // isRequired
                        name="unit"
                        label="Unit"
                        isColumn
                        value={values.unit}
                        component={SelectComponent}
                        options={Array.isArray(unitData) ? unitData : []}
                        // use12Hours

                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div class=" flex justify-between w-full">
                <div class=" w-1/2">
                    <div class=" flex justify-between w-full">
                      {values.taskTypeId === "TSK52434477391272022" && (
                        <div class=" w-full">
                          <StyledLabel>Complexity</StyledLabel>
                          <div>
                            <Tooltip title="Easy">
                              <Button
                                type="primary"
                                shape="circle"
                                icon={<ExclamationCircleOutlined />}
                                onClick={() => handleComplexityClick("Easy")}
                                style={{
                                  backgroundColor:
                                    complexity === "Easy" ? "green" : "white",
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Medium">
                              <Button
                                type="primary"
                                shape="circle"
                                icon={<ExclamationCircleOutlined />}
                                onClick={() => handleComplexityClick("Medium")}
                                style={{
                                  backgroundColor:
                                    complexity === "Medium"
                                      ? "Orange"
                                      : "white",
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Hard">
                              <Button
                                type="primary"
                                shape="circle"
                                icon={<ExclamationCircleOutlined />}
                                onClick={() => handleComplexityClick("Hard")}
                                style={{
                                  backgroundColor:
                                    complexity === "Hard" ? "red" : "white",
                                }}
                              ></Button>
                            </Tooltip>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class=" w-2/5 max-sm:w-wk">
                    <div class=" flex justify-between w-full">
                      {values.taskTypeId === "TSK52434477391272022" && (
                      <div class=" w-full">
                          <Field
                            isRequired
                            name="assignedDate"
                            label=" Assigned Date"
                            component={DatePicker}
                            isColumn
                            value={values.assignedDate}
                            inlineLabel
                            style={{
                              width: "100%",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Spacer />
                  {/* {values.startDate && (
                    <>
                      {dayjs(todayDate).isSameOrBefore(
                        dayjs(values.startDate)
                      ) ? (
                        <></>
                      ) : (
                        <>
                          {" "}
                          <span
                          >
                            <b>This Task occurs in the past !</b>
                          </span>
                        </>
                      )}
                    </>
                  )} */}
                </div>
              </div>
              <div class=" h-full w-w47.5 max-sm:w-wk">          
                <Field
                  name="assignedTo"
                  // label="Assigned to"
                  label={
                    <FormattedMessage
                      id="app.assignedto"
                      defaultMessage="Assigned to"
                    />
                  }
                  isColumn
                  component={SelectComponent}
                  value={values.assignedTo}
                  options={Array.isArray(employeeOption) ? employeeOption : []}
                  // defaultValue={{
                  //   label: `${firstName || ""} ${middleName ||
                  //     ""} ${lastName || ""}`,
                  //   value: employeeId,
                  // }}
                  inlineLabel
                />
                <Spacer />
                {/* {values.taskTypeId === "TSK52434477391272022" && (
                 

                  <Select
                  label="Team"
                    name="candidateId"
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select"
                    defaultValue={candidate}
                    onChange={handleChangeCandidate}
                    options={
                      Array.isArray(
                        handlecandidateOptions("customerId", values.customerId)
                      )
                        ? handlecandidateOptions(
                            "customerId",
                            values.customerId
                          )
                        : []
                    }
                  />
                )}
                {values.taskTypeId !== "TSK52434477391272022" && (
                  <Field
                    name="candidateId"
                    //type="text"
                    label="Team"
                    mode
                    component={SelectComponent}
                    value={values.candidateId}
                    options={
                      Array.isArray(candidateOption) ? candidateOption : []
                    }
                  />
                )}
                <Spacer /> */}
                <Field
                  name="taskDescription"
                  //label="Notes"
                  label={
                    <FormattedMessage id="app.notes" defaultMessage="Notes" />
                  }
                  width={"21.875em"}
                  isColumn
                  component={TextareaComponent}
                  inlineLabel
                />
                <Spacer />
                <div class=" mt-4">
                      <Field
                            type="text"
                            name="link"
                            //label="Name"
                            // value={values.taskName}
                            label={
                              <FormattedMessage
                                id="app.link"
                                defaultMessage="Link"
                              />
                            }
                            component={InputComponent}
                            isColumn
                            width={"100%"}
                            inlineLabel
                          />
                      </div>
                      <Spacer />
                  <div>
                  {props.user.crmInd === true &&(
                 <Field
                 name="customerId"
                 // selectType="customerList"
                 isColumnWithoutNoCreate
                 label={
                   <FormattedMessage
                     id="app.customer"
                     defaultMessage="Customer"
                   />
                 }
                 //component={SearchSelect}
                 component={SelectComponent}
                 options={
                   Array.isArray(customerNameOption)
                     ? customerNameOption
                     : []
                 }
                 isColumn
                 margintop={"0"}
                 value={values.customerId}
                 inlineLabel
               />
                  )} 
                  </div>
                  <Spacer />
                  <div>
                  {props.user.crmInd === true &&(
                  <Field
                    name="contactId"
                    //selectType="contactList"
                    isColumnWithoutNoCreate
                    // label="Contact"
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="Contact"
                      />
                    }
                    component={SelectComponent}
                    isColumn
                    options={Array.isArray(ContactData) ? ContactData : []}
                    value={values.contactId}
                    // isDisabled={defaultContacts}
                    defaultValue={{
                      label: `${props.fullName || ""} `,
                      value: props.contactId,
                    }}
                    inlineLabel
                  />
                  )} 
                  </div>
                  <Spacer/>
                  <div>
                  {props.user.crmInd === true &&(
                 <Field
                 name="opportunityId"
                 // selectType="customerList"
                 isColumnWithoutNoCreate
                 label={
                   <FormattedMessage
                     id="app.opportunity"
                     defaultMessage="Opportunity"
                   />
                 }
                 //component={SearchSelect}
                 component={SelectComponent}
                 options={
                   Array.isArray(opportunityNameOption)
                     ? opportunityNameOption
                     : []
                 }
                 isColumn
                 margintop={"0"}
                 value={values.opportunityId}
                 inlineLabel
               />
                  )} 
                  </div>
                <div class=" flex justify-between">
                  {values.taskTypeId === "TSK52434477391272022" && (
                    <div class=" w-1/2 font-bold">
                      <div class=" flex justify-between">
                        <div>
                          <StyledLabel>Set Reminder </StyledLabel>
                        </div>
                        <div>
                          <Switch
                            onChange={handleReminderChange}
                            checked={reminder}
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {values.taskTypeId === "TSK52434477391272022" && (
                    <div class=" w-1/3 font-bold">
                      {reminder ? (
                        <div>
                          <Field
                            // isRequired
                            name="remindTime"
                            label="Reminder"
                            width={"100%"}
                            component={SelectComponent}
                            options={[
                              "15 min",
                              "30 min",
                              "45 min",
                              "1 hour",
                              "2 hour",
                            ]}
                            defaultValue="30 min"
                            isColumn
                            inlineLabel
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Spacer />
            <div class=" flex justify-end">
              {isEditing && (
                <>
                  <StyledPopconfirm
                    //title="Do you want to delete?"
                    title={
                      <FormattedMessage
                        id="app.doyouwanttodelete?"
                        defaultMessage="Do you want to delete?"
                      />
                    }
                    onConfirm={() => deleteTask(prefillTask.taskId)}
                  >
                    <Button
                      type="danger"
                      htmlType="submit"
                      Loading={deletingTask}
                    >
                      <FormattedMessage
                        id="app.delete"
                        defaultMessage="Delete"
                      />
                      {/* Delete */}
                    </Button>
                  </StyledPopconfirm>
                </>
              )}
              <Button
                type="primary"
                htmlType="submit"
                Loading={isEditing ? updatingTask : addingTask}
              >
                {isEditing ? (
                  "Update"
                ) : (
                  // "Create"
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                )}
              </Button>
            </div>
          </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth,candidate, opportunity,task,customer,settings, unit, tasks, employee }) => ({
  // addingTask: task.addingTask,
  user: auth.userDetails,
  allOpportunityData:opportunity.allOpportunityData,
  allCustomerData:customer.allCustomerData,
  userId: auth.userDetails.userId,
  recruitTask: settings.recruitTask,
  orgId: auth.userDetails.organizationId,
  updatingTask: task.updatingTask,
  projectTaskList: task.projectTaskList,
  customerTaskList: task.customerTaskList,
  candidateFilterTaskList: task.candidateFilterTaskList,
  employees: employee.employees,
  units: unit.units,
  candidateTaskList: task.candidateTaskList,
  tasks: tasks.tasks,
  filteredContact: candidate.filteredContact,
  setEditingTask: task.setEditingTask,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // addTask,
      getAllCustomerData,
      getFilteredEmailContact,
      handleChooserModal,
      updateTask,
      getProjectTaskList,
      getUnits,
      getTasks,
      getAllOpportunityData,
      getCustomerTask,
      getCandidateTaskFilterList,
      getCandidateTaskList,
      getEmployeelist,
      getTaskForRecruit,
      handleTaskModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskForm);

function StatusIcon({ type, iconType, tooltip, status, size, onClick, role }) {
  const start = type;
  console.log(start);
  //////debugger;
  if (status === type) {
    size = "1.875em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        ghost={status !== type}
        style={{
          padding: "0.375em",
          borderColor: "transparent",
          color: status === type ? "orange" : "grey",
        }}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.375em" }}></i>
      </Button>
    </Tooltip>
  );
}
