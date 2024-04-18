

import React, {useState,useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip, Switch ,Select} from "antd";
import { getTasks } from "../../../../Containers/Settings/Task/TaskAction";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, FastField } from "formik";
import dayjs from "dayjs";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { getUnits } from "../../../../Containers/Settings/Unit/UnitAction";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import {
    addStepperTask,
} from "../../TaskAction";

import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import ButtonGroup from "antd/lib/button/button-group";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import Upload from "../../../../Components/Forms/Formik/Upload";
import DragableUpload from "../../../../Components/Forms/Formik/DragableUpload";

import moment from "moment";
import { Listbox } from '@headlessui/react';
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";

const { Option } = Select;

function StepperTaskForm (props) {
  const [selectedTaskType, setSelectedTaskType] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState("");
//   const[selectedTaskType,setselectedTaskType]=useState("")
// const[selectedWorkflow,setselectedWorkflow]=useState("");
const[workflow,setworkflow]=useState([]);
const[active,setactive]=useState(props.selectedTask ? props.selectedTask.status
  : "To Start");
const [priority,setpriority]=useState(props.selectedTask
  ? props.selectedTask.priority
  : "High");
  const[complexity,setcomplexity]=useState(props.selectedTask
    ? props.selectedTask.complexity
    : "Easy");
  const[Type,setType]=useState(props.selectedTask
    ? props.selectedTask.taskType
    : "Email",);
  const[selectedType,setselectedType]=useState(props.selectedTask
    ? props.selectedTask.taskType
    : "Email");
  const[reminder,setreminder]=useState(true);
    
 function handleTypeChange(data){
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
    // const filteredWorkflow = props.recruitWorkflowTask.filter((item) => item.taskTypeId === selectedTaskType);
    setSelectedTaskType(selectedTaskType);
     setSelectedWorkflow("");
    props.getTaskForWorkflow(selectedTaskType);
  };

//  const handleTaskTypeChange = (event) => {
//     const selectedTaskType = event.target.value;
//      const filteredWorkflow = props.recruitWorkflowTask.filter((item) => item.taskTypeId === selectedTaskType);
//      const workflow=filteredWorkflow
//      setselectedTaskType(selectedTaskType,workflow);
//     console.log(selectedTaskType)
//     props.getTaskForWorkflow(selectedTaskType);
//   };

  const handleWorkflowChange = (event) => {
    const selectedWorkflow = event.target.value;
    setSelectedWorkflow(selectedWorkflow);
  };
  const filteredWorkflow = props.recruitWorkflowTask.filter((item) => item.taskTypeId === selectedTaskType);

 function handleCallback() {
    const { handleChooserModal, handleTaskModal, callback }= props;
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

  // handleCheckListOptions = (filterOptionKey, filterOptionValue) => {
  //   const listOptions =
  //     this.props.recruitWorkflowTask.length &&
  //     this.props.recruitWorkflowTask
  //       .filter((option) => {
  //         if (
  //           option.taskTypeId === filterOptionValue &&
  //           option.probability !== 0
  //         ) {
  //           return option;
  //         }
  //       })
  //       .map((option) => ({
  //         label: option.taskChecklistName || "",
  //         value: option.taskType,
  //       }));
  //   console.log(listOptions);

  //   return listOptions;
  // };

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


 
//   useEffect(()=> {
//       props.getTaskForStages();
//     props.getProjectTaskList(props.orgId);
//     props.getTasks();
//     props.getUnits(props.orgId);
//     props.getCandidateTaskList(props.orgId);
//     props.getCandidateTaskFilterList(props.orgId);
//   },[]);

      
    
    const {
      user: { userId, firstName, fullName,empName, middleName, lastName, timeZone },
      addingStepperTask,
      isEditing,
      prefillTask,
      addStepperTask,
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



    const [defaultOption, setDefaultOption] = useState(props.fullName);
    const [selected, setSelected] = useState(defaultOption);
    const selectedOption = props.assignedToList.find((item) => item.empName === selected);
    const [customer, setCustomer] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
    const [touchedCustomer, setTouchedCustomer] = useState(false);


    const [include, setInclude] = useState([]);
  const [isLoadingInclude, setIsLoadingInclude] = useState(false);
  const [touchedInclude, setTouchedInclude] = useState(false);
  const [selectedIncludeValues, setSelectedIncludeValues] = useState([]);
 
    const [contact, setContact] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isLoadingContact, setIsLoadingContact] = useState(false);
    const [touchedContact, setTouchedContact] = useState(false);
 
 
    const [opportunity, setOpportunity] = useState([]);
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [isLoadingOpportunity, setIsLoadingOpportunity] = useState(false);
    const [touchedOpportunity, setTouchedOpportunity] = useState(false);

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={
            isEditing
              ? prefillTask
              : {
                  // taskType: state.currentType,
                  taskTypeId: "",
                  step: "",
                  documentId:"",
                  
                  link:"",
                  taskTypeId:selectedTaskType,
                  taskChecklistId:selectedWorkflow,
                  fullName: "",
                  assignedDate: assignedDate || dayjs(),
                 
                  projectName: "",
               
                  taskChecklistId: "",
                  taskDescription: "",
                  timeZone: timeZone,
                  contactId: "",
                  startDate: startDate || dayjs(),
                  endDate: endDate || null,
                  endDate: dayjs(),
                  // included: [],
                  status: active,

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
                  assignedTo: selectedOption ? selectedOption.employeeId:userId,
                
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

           
              addStepperTask(
                  {
                    ...values,
                   
                    
                    status: active,
                    taskId:props.taskId,
                    
                    endDate: `${newEndDate}T20:00:00Z`,
                 
                  },
                  handleCallback
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
              <div class="flex justify-around pr-2 max-sm:flex-col">
               
                <div class=" h-full w-w47.5 max-sm:w-wk">
              
                 
                  <div class="mt-3 flex justify-between">
               
                  <div class=" w-[30.5%] mr-1">
                          <Field
                          
                            name="step"
                          
                            label={
                              <FormattedMessage
                                id="app.step"
                                defaultMessage="Step"
                              />
                            }
                            component={InputComponent}
                            isColumn
                            width={"100%"}
                            inlineLabel
                          />
                        </div>
                    <div class=" w-[30.5%] ">
                      <Field
                        isRequired
                        name="endDate"
                        // label="End "
                        label={
                          <FormattedMessage
                            id="app.enddate"
                            defaultMessage="enddate"
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
                   
                 
                  
                  </div>
                 

               
              
                  
              

<div class=" flex justify-between ">
               
               
            
          
             <div class=" w-[39.5%]  max-sm:w-wk ">
               
             <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col"><FormattedMessage
                       id="app.type"
                       defaultMessage="type"
                     /></div>
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



          
             <div class="w-[16%] ml-2">
              
             <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                 <FormattedMessage
                   id="app.status"
                   defaultMessage="status"
                 />
               
               </div>

               <div class="w-[100%]">
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
                         defaultMessage="inprogress"
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
                         defaultMessage="completed"
                       />
                     }
                     status={active}
                     onClick={() => glassButtoClick("Completed")}
                  
                   />
                 </ButtonGroup>
               </div>
             </div>
           </div>
                
                          
                        
                     
              
               
                  
               

                
                  
                </div>
               
              </div>
            
              <div class="mt-3 flex justify-end">
              
                <Button
                  type="primary"
                  htmlType="submit"
              loading={ addingStepperTask}
                >
                 
                   
                    <FormattedMessage id="app.create" defaultMessage="create" />
                 
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
    addingStepperTask: task.addingStepperTask,
  assignedToList:employee.assignedToList,
  userId: auth.userDetails.userId,
  allOpportunityData:opportunity.allOpportunityData,
  filteredContact: candidate.filteredContact,
  allCustomerData:customer.allCustomerData,
  recruitWorkflowTask: settings.recruitWorkflowTask,
  orgId: auth.userDetails.organizationId,
  projectTaskList: task.projectTaskList,
  candidateTaskList: task.candidateTaskList,
  user: auth.userDetails,

  fullName: auth.userDetails.fullName
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addStepperTask,


    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StepperTaskForm);

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
