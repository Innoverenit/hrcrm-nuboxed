

import React, {useState,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Tooltip,Select} from "antd";

import { Formik, Form, Field} from "formik";
import { BundleLoader } from "../../../../Components/Placeholder";
import dayjs from "dayjs";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import {
    addStepperTask,
} from "../../TaskAction";
import ButtonGroup from "antd/lib/button/button-group";

const  StepperTaskList = lazy(() => import("./StepperTaskList"));

const { Option } = Select;

function StepperTaskForm (props) {
const[active,setactive]=useState(props.selectedTask ? props.selectedTask.status
  : "To Start");
 const glassButtoClick = (type) => {
    setactive(type);
  };

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



 
 
    
    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={
            isEditing
              ? prefillTask
              : {
               
                  step: "",
               
                  taskId:props.currentNameId.taskId,
                  endDate: dayjs(),
            
                  status: active,


              
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
                    taskId:props.currentNameId.taskId,
                    
                    endDate: `${newEndDate}T20:00:00Z`,
                 
                  },
                  props.currentNameId.taskId,
                  // handleCallback
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
            // <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
              <div class="flex  pr-2 max-sm:flex-col">
               
                <div class=" h-full w-w47.5.5 max-sm:w-wk">
              
                 
                  <div class="mt-3 flex justify-between">
                  <div class="w-[16%] ml-2">
              
             <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                status
                
               
               </div>

               <div class="w-[100%]">
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
                     tooltipTitle="inprogress"
                       
                     status={active}
                     onClick={() => glassButtoClick("In Progress")}
                   />

                   <StatusIcon
                     type="Completed"
                     iconType="fa-hourglass"
                     tooltip="Completed"
                     tooltipTitle="completed"
                     
                     status={active}
                     onClick={() => glassButtoClick("Completed")}
                  
                   />
                 </ButtonGroup>
               </div>
             </div>
                  <div class=" w-[30.5%] mr-1">
                          <Field
                          
                            name="step"
                          
                            label="Step"
                             
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
                      label="End "
                        
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
                   
                 
                  
                  </div>
                 

               
              
                  
              

                
                          
                        
                     
              
               
                  
               

                
                  
                </div>
               
              </div>
            
              <div class="mt-3 flex justify-end">
              
                <Button
                  type="primary"
                  htmlType="submit"
              loading={ addingStepperTask}
                >
                 
                   
                 create
                 
                </Button>
              </div>
            </Form>
            // </div>
          )}
        </Formik>
        <Suspense fallback={<BundleLoader />}> <StepperTaskList currentNameId={props.currentNameId}/></Suspense>
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
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
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
