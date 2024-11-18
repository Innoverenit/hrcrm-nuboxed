import React, {  useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip, Switch } from "antd";
import { getTasks } from "../../../../../Containers/Settings/Task/TaskAction";

import { Formik, Form, Field, FastField } from "formik";
import dayjs from "dayjs";
import { getAllOpportunityData } from "../../../../Opportunity/OpportunityAction"
import { getFilteredEmailContact } from "../../../../Candidate/CandidateAction";
import { getAllCustomerData,addCustomerActivityTask } from "../../../../Customer/CustomerAction"
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getUnits } from "../../../../../Containers/Settings/Unit/UnitAction";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../Components/Forms/Formik/DatePicker";
import {
    addTask,
    updateTask,
    handleTaskModal,
    getCustomerTask,
    getProjectTaskList,

    getCandidateTaskList,
    getCandidateTaskFilterList,
    deleteTask,
} from "../../../../Task/TaskAction";
import {
    getTaskForRecruit,
    getTaskForStages,
    getTaskForWorkflow,
} from "../../../../Settings/SettingsAction";
import { handleChooserModal } from "../../../../Planner/PlannerAction";

import { TextareaComponent } from "../../../../../Components/Forms/Formik/TextareaComponent";
import ButtonGroup from "antd/lib/button/button-group";
import { StyledPopconfirm } from "../../../../../Components/UI/Antd";
import { getAssignedToList } from "../../../../Employees/EmployeeAction";
import Upload from "../../../../../Components/Forms/Formik/Upload";
import DragableUpload from "../../../../../Components/Forms/Formik/DragableUpload";
import { Select } from "antd";
import { Listbox } from '@headlessui/react';

const { Option } = Select;

function ActivityTaskForm(props) {
    const [selectedTaskType, setSelectedTaskType] = useState('');
    const [selectedWorkflow, setSelectedWorkflow] = useState("");
    //   const[selectedTaskType,setselectedTaskType]=useState("")
    // const[selectedWorkflow,setselectedWorkflow]=useState("");
    const [workflow, setworkflow] = useState([]);
    const [active, setactive] = useState(props.selectedTask ? props.selectedTask.taskStatus
        : "To Start");
    const [priority, setpriority] = useState(props.selectedTask
        ? props.selectedTask.priority
        : "High");
    const [complexity, setcomplexity] = useState(props.selectedTask
        ? props.selectedTask.complexity
        : "Easy");
    const [Type, setType] = useState(props.selectedTask
        ? props.selectedTask.taskType
        : "Email",);
    const [selectedType, setselectedType] = useState(props.selectedTask
        ? props.selectedTask.taskType
        : "Email");
    const [reminder, setreminder] = useState(true);

    function handleTypeChange(data) {
        setType(data);
        setselectedType(data);
    };
    const glassButtoClick = (type) => {
        setactive(type);
    };

    const handleReminderChange = (checked) => {
        setreminder(checked);
    };


    const handleTaskTypeChange = (event) => {
        const selectedTaskType = event.target.value;
        setSelectedTaskType(selectedTaskType);
        setSelectedWorkflow("");
        props.getTaskForWorkflow(selectedTaskType);
    };

    const handleWorkflowChange = (event) => {
        const selectedWorkflow = event.target.value;
        setSelectedWorkflow(selectedWorkflow);
    };
    const filteredWorkflow = props.recruitWorkflowTask.filter((item) => item.taskTypeId === selectedTaskType);

    function handleCallback() {
        const { handleChooserModal, handleTaskModal, callback } = props;
        handleChooserModal(false);
        handleTaskModal(false);
        callback && callback();
    };

    const handleButtonClick = (type) => {
        setpriority(type);
    };

    const handleComplexityClick = (type) => {
        setcomplexity(type);
    };

    const handleprojectOptions = (filterOptionKey, filterOptionValue) => {
        const projectOptions =
            props.projectTaskList.length &&
            props.projectTaskList.filter((option) => {
                if (
                    option.customerId === filterOptionValue &&
                    option.probability !== 0
                ) {
                    return option;
                }
            });
        const newArray = [
            ...new Map(projectOptions.map((m) => [m.projectId, m])).values(),
        ];

        const newData = newArray.map((option) => ({
            label: option.projectName || "",
            value: option.projectId,
        }));

        return newData;
    };
    function taskStageOptions(filterOptionKey, filterOptionValue) {
        const listOptions =
            props.recruitTaskStages.length &&
            props.recruitTaskStages
                .filter((option) => {
                    if (
                        option.taskTypeId === filterOptionValue &&
                        option.probability !== 0
                    ) {
                        return option;
                    }
                })
                .map((option) => ({
                    label: option.taskChecklistStageName || "",
                    value: option.taskChecklistId,
                }));
        console.log(listOptions);

        return listOptions;
    };



    const handlecandidateOptions = (filterOptionKey, filterOptionValue) => {
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
                    value: option.included,
                }));
        console.log(candidateOptions);

        return candidateOptions;
    };
    const opportunityNameOption = props.allOpportunityData.map((item) => {
        return {
            label: `${item.opportunityName}`,
            value: item.opportunityId,
        };
    });



    useEffect(() => {
        props.getAssignedToList(props.orgId);
        props.getTaskForStages();
        props.getAllCustomerData(userId)
        props.getAllOpportunityData(userId)
        props.getFilteredEmailContact(userId);
        props.getTaskForRecruit(props.orgId);
        props.getCustomerTask(props.orgId);
        props.getProjectTaskList(props.orgId);
        props.getTasks();
        props.getUnits(props.orgId);
        props.getCandidateTaskList(props.orgId);
        props.getCandidateTaskFilterList(props.orgId);
    }, []);

    console.log(selectedWorkflow)
    console.log(selectedTaskType)
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
                value: item.customerId,
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
    const today = dayjs();
    var todayDate = new Date();
    console.log(today);
    const {
        user: { userId, firstName,empName, fullName, middleName, lastName, timeZone },
        addingTask,
        isEditing,
        prefillTask,
        addTask,
        startDate,
        endDate,
        deleteTask,
        deletingTask,
        defaultContacts,
        assignedDate,
        ownerId,
        contactId,
        defaultAccounts,
        updateTask,
        updatingTask,
        startTime,
        endTime,
        defaultOpportunities,
        employeeId,
        taskTypeId,
    } = props;
    const employeesData = props.assignedToList.map((item) => {
        return {
            label: `${item.empName}`,
            value: item.employeeId,
        };
    });

    const unitData = props.units.map((item) => {
        return {
            label: `${item.unitName}`,
            value: item.unitId,
        };
    });
    const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.assignedToList.find((item) => item.empName === selected);
    console.log("workflow", selectedWorkflow);
    console.log("recruitWorkflowTask", props.recruitWorkflowTask);
    return (
        <>
            <Formik
                // enableReinitialize
                initialValues={
                    isEditing
                        ? prefillTask
                        : {
                           
                            taskTypeId: "",
                            taskName: "",
                            documentId: "",
                            link: "",
                            taskTypeId: selectedTaskType,
                            taskChecklistId: selectedWorkflow,
                            fullName: "",
                            assignedDate: assignedDate || dayjs(),
                            customerId: "",
                            projectName: "",
                            included: [],
                            taskChecklistId: "",
                            taskDescription: "",
                            timeZone: timeZone,
                            contactId: "",
                            startDate: startDate || dayjs(),
                            endDate: endDate || null,
                            endDate: dayjs(),
                            taskStatus: active,

                            priority: priority,
                            complexity: complexity,
                            unit: "",

                            department: "",
                            remindInd: reminder ? true : false,
                            remindTime: "",
                            level: "",
                            repeatInd: false,

                            ownerIds: [],
                            startTime: startDate || null,
                            endTime: endDate || null,
                            value: "",
                            assignedTo: selectedOption ? selectedOption.employeeId : userId,

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

                    var minutes =
                        +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes
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

                    isEditing
                        ? updateTask(
                            prefillTask.taskId,
                            {
                                ...values,


                                // taskTypeId: "",
                                taskStatus: active,
                                priority: priority,
                                complexity: complexity,

                                startDate: `${newStartDate}T${newStartTime}`,
                                endDate: `${newEndDate}T${newEndTime}`,
                                startTime: 0,
                                endTime: 0,
                                assignedTo: selectedOption ? selectedOption.employeeId : userId,
                            },
                            handleCallback
                        )
                        : props.addCustomerActivityTask(
                            {
                                ...values,
                                taskTypeId: selectedTaskType,
                                taskChecklistId: selectedWorkflow,
                                taskStatus: active,
                                priority: priority,
                                complexity: complexity,
                                ownerIds: userId === userId ? [userId] : [],
                                startDate: `${newStartDate}T20:00:00Z`,
                                endDate: `${newEndDate}T20:00:00Z`,
                                startTime: 0,
                                endTime: 0,
                                assignedTo: selectedOption ? selectedOption.employeeId : userId,
                            },
                            handleCallback
                        );
                    !isEditing && resetForm();
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
                            <div class="flex justify-around pr-2 max-sm:flex-col">

                                <div class=" h-full w-w47.5 max-sm:w-wk">

                                    <div class=" flex justify-between ">
                                        {values.taskTypeId === "TSK52434477391272022" && (
                                            <FastField name="imageId" component={Upload} />
                                        )}

                                        {values.taskTypeId === "TSK52434477391272022" && (
                                            <div class=" w-4/6 max-sm:w-wk">
                                                <Field
                                                    name="documentId"
                                                    isRequired
                                                    component={DragableUpload}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div class=" flex justify-between ">

                                        <div class=" flex justify-between flex-col w-full">

                                            <div class=" text-xs font-bold font-poppins text-black">
                                                Priority
                                              

                                            </div>

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


                                        <div class=" w-1/2  max-sm:w-wk ">

                                            <div class=" text-xs font-bold font-poppins text-black">Type</div>
                                            <select
                                                style={{ border: "0.06em solid #aaa" }}
                                                onChange={handleTaskTypeChange}
                                            >
                                                <option value="">Select</option>
                                                {props.tasks.map((item, index) => (
                                                    <option key={index} value={item.taskTypeId}>
                                                        {item.taskType}
                                                    </option>
                                                ))}
                                            </select>
                                      
                                        </div>

                                        <div class=" w-1/2 ml-2 max-sm:w-wk">

                                            <div class=" text-xs font-bold font-poppins text-black">Workflow</div>
                                            <select
                                                style={{ border: "0.06em solid #aaa" }}
                                                onChange={handleWorkflowChange}
                                            >
                                                <option value="">select</option>
                                                {filteredWorkflow.map((item, index) => (
                                                    <option key={index}
                                                        value={item.taskChecklistId}>
                                                        {item.taskChecklistName}
                                                    </option>
                                                ))}
                                            </select>
                                          
                                        </div>
                                      
                                        <div style={{ width: "24%" }}>

                                            <div class=" text-xs font-bold font-poppins text-black">
                                              
                                                Status
                                            </div>

                                            <div style={{ width: "100%" }}>
                                                <ButtonGroup>
                                                    <StatusIcon
                                                        color="blue"
                                                        type="To Start"
                                                        iconType="fa-hourglass-start"
                                                        tooltip="To Start"
                                                        tooltipTitle="To Start"
                                                        status={active}
                                                        onClick={() => glassButtoClick("To Start")}
                                                    />

                                                    <StatusIcon
                                                        type="In Progress"
                                                        iconType="fa-hourglass-half"
                                                        tooltip="In Progress"
                                                        tooltipTitle="In Progress"
                                                        status={active}
                                                        onClick={() => glassButtoClick("In Progress")}
                                                    />

                                                    <StatusIcon
                                                        type="Completed"
                                                        iconType="fa-hourglass"
                                                        tooltip="Completed"
                                                        tooltipTitle="Completed"
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
                                    < div class="mt-3" />
                                    <div class=" flex justify-between w-full max-sm:flex-col">

                                     
                                    </div>
                                    < div class="mt-3" />
                                      <div class=" flex justify-between">
                                        <div class=" w-1/2 ">
                                            <Field
                                                isRequired
                                                name="endDate"
                                                // label="End "
                                                label="End Date"
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
                                        <div class=" w-5/12">
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
                                                    value={values.unitId}
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
                                                        <div class=" text-xs font-bold font-poppins text-black">Complexity</div>
                                                        <div>
                                                            <Tooltip title="Easy">
                                                                <Button
                                                                    type="primary"
                                                                    shape="circle"
                                                                    icon={<ExclamationCircleOutlined />}
                                                                    onClick={() =>
                                                                        handleComplexityClick("Easy")
                                                                    }
                                                                    style={{
                                                                        backgroundColor:
                                                                            complexity === "Easy"
                                                                                ? "green"
                                                                                : "white",
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                            &nbsp;
                                                            <Tooltip title="Medium">
                                                                <Button
                                                                    type="primary"
                                                                    shape="circle"
                                                                    icon={<ExclamationCircleOutlined />}
                                                                    onClick={() =>
                                                                        handleComplexityClick("Medium")
                                                                    }
                                                                    style={{
                                                                        backgroundColor:
                                                                            complexity === "Medium"
                                                                                ? "Orange"
                                                                                : "white",
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                            &nbsp;
                                                            <Tooltip title="Hard">
                                                                <Button
                                                                    type="primary"
                                                                    shape="circle"
                                                                    icon={<ExclamationCircleOutlined />}
                                                                    onClick={() =>
                                                                        handleComplexityClick("Hard")
                                                                    }
                                                                    style={{
                                                                        backgroundColor:
                                                                            complexity === "Hard"
                                                                                ? "red"
                                                                                : "white",
                                                                    }}
                                                                ></Button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div class=" w-2/5">
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
                                                            // defaultValue={dayjs("2015-01-01")}
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
                                        < div class="mt-3" />
                                      
                                    </div>
                                </div>
                                <div class=" h-full w-w47.5 max-sm:w-wk">

                                    <Listbox value={selected} onChange={setSelected}>
                                        {({ open }) => (
                                            <>
                                                <Listbox.Label className="block font-semibold text-[0.75rem] ">
                                                    Assigned
                                                </Listbox.Label>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" style={{ boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em" }}>
                                                        {selected}
                                                    </Listbox.Button>
                                                    {open && (
                                                        <Listbox.Options
                                                            static
                                                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                        >
                                                            {props.assignedToList.map((item) => (
                                                                <Listbox.Option
                                                                    key={item.employeeId}
                                                                    className={({ active }) =>
                                                                        `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? "text-white bg-indigo-600" : "text-gray-900"
                                                                        }`
                                                                    }
                                                                    value={item.empName}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                                <span
                                                                                    className={`ml-3 block truncate ${selected ? "font-semibold" : "font-normal"
                                                                                        }`}
                                                                                >
                                                                                    {item.empName}
                                                                                </span>
                                                                            </div>
                                                                            {selected && (
                                                                                <span
                                                                                    className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-indigo-600"
                                                                                        }`}
                                                                                >

                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        className="h-5 w-5"
                                                                                        viewBox="0 0 20 20"
                                                                                        fill="currentColor"
                                                                                        aria-hidden="true"
                                                                                    >
                                                                                        <path
                                                                                            fillRule="evenodd"
                                                                                            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                                                                            clipRule="evenodd"
                                                                                        />
                                                                                    </svg>
                                                                                </span>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                    < div class="mt-3" />
                                 
                                    < div class="mt-3" />
                                    <div>
                                        {props.user.crmInd === true && (
                                            <Field
                                                name="contactId"
                                                //selectType="contactList"
                                                isColumnWithoutNoCreate
                                                label="Contact"
                                                component={SelectComponent}
                                                isColumn
                                                options={Array.isArray(ContactData) ? ContactData : []}
                                                value={values.contactId}
                                                // isDisabled={defaultContacts}
                                                defaultValue={{
                                                    label: `${fullName || ""} `,
                                                    value: contactId,
                                                }}
                                                inlineLabel
                                            />
                                        )}
                                    </div>
                                    < div class="mt-3" />
                                    <div>
                                        {props.user.crmInd === true && (
                                            <Field
                                                name="customerId"
                                                // selectType="customerList"
                                                isColumnWithoutNoCreate
                                                label="Customer"
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
                                    < div class="mt-3" />
                                    <div>
                                        {props.user.crmInd === true && (
                                            <Field
                                                name="opportunityId"
                                                // selectType="customerList"
                                                isColumnWithoutNoCreate
                                                label="Opportunity"
                                                   
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
                                    <Field
                                        name="taskDescription"
                                        label="Notes"
                                     
                                        width={"21.875em"}
                                        isColumn
                                        component={TextareaComponent}
                                        inlineLabel
                                    />
                                    <div class=" mt-4">
                                        <Field
                                            type="text"
                                            name="link"
                                            //label="Name"
                                            // value={values.taskName}
                                            label="Link"
                                               
                                            component={InputComponent}
                                            isColumn
                                            width={"100%"}
                                            inlineLabel
                                        />
                                    </div>



                                    < div class="mt-3" />
                                    <div class=" flex justify-between">
                                        {values.taskTypeId === "TSK52434477391272022" && (
                                            <div class=" w-1/2 font-bold">
                                                <div class=" flex justify-between">
                                                    <div>
                                                        <div class=" text-xs font-bold font-poppins text-black">Set Reminder </div>
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
                            < div class="mt-3" />
                            <div class=" flex justify-end">
                                {isEditing && (
                                    <>
                                        <StyledPopconfirm
                                            title="Do you want to delete?"
                                            onConfirm={() => deleteTask(prefillTask.taskId)}
                                        >
                                            <Button
                                                type="danger"
                                                htmlType="submit"
                                                Loading={deletingTask}
                                            >
                                        
                                                Delete
                                            </Button>
                                        </StyledPopconfirm>
                                    </>
                                )}
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isEditing ? updatingTask : addingTask}
                                >
                                    {isEditing ? (
                                        "Update"
                                    ) : (
                                        "Create"
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

const mapStateToProps = ({
    auth,
    task,
    settings,
    employee,
    unit,
    opportunity,
    tasks,
    customer,
    candidate,
}) => ({
    addingTask: task.addingTask,
    assignedToList:employee.assignedToList,
    allOpportunityData: opportunity.allOpportunityData,
    filteredContact: candidate.filteredContact,
    allCustomerData: customer.allCustomerData,
    recruitWorkflowTask: settings.recruitWorkflowTask,
    orgId: auth.userDetails.organizationId,
    projectTaskList: task.projectTaskList,
    candidateTaskList: task.candidateTaskList,
    user: auth.userDetails,
    stagesTask: settings.stagesTask,
    updatingTask: task.updatingTask,
    units: unit.units,
    recruitTask: settings.recruitTask,
    deletingTask: task.deleteTask,
    recruitTaskStages: settings.recruitTaskStages,
    tasks: tasks.tasks,
    customerTaskList: task.customerTaskList,
    candidateFilterTaskList: task.candidateFilterTaskList,
    fullName: auth.userDetails.fullName,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addTask,
            getAllCustomerData,
            getAllOpportunityData,
            getFilteredEmailContact,
            getTasks,
            handleChooserModal,
            getCandidateTaskFilterList,
            getCandidateTaskList,
            updateTask,
            handleTaskModal,
            getCustomerTask,
            getTaskForRecruit,
            deleteTask,
            getAssignedToList,
            getProjectTaskList,
            getTaskForWorkflow,
            getUnits,
            getTaskForStages,
            addCustomerActivityTask
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ActivityTaskForm);

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
