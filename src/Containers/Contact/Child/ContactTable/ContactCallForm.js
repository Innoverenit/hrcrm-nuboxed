import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllSalesList } from "../../../Opportunity/OpportunityAction"
import { FormattedMessage } from "react-intl";
import { Button,  Switch, Tooltip } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import{getAllOpportunityData} from "../../../Opportunity/OpportunityAction"
import { getFilteredEmailContact } from "../../../Candidate/CandidateAction";
import dayjs from "dayjs";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../../Components/Forms/Formik/TimePicker";
import {
  updateCall,
  deleteCall,
  handleCallModal,
  handleCallNotesModal,
} from "../../../Call/CallAction";
import {addContactActivityCall} from "../../ContactAction";
import {getAllCustomerData} from "../../../Customer/CustomerAction"
import { handleChooserModal } from "../../../Planner/PlannerAction";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { getAssignedToList } from "../../../Employees/EmployeeAction";
import { setClearbitCandidateData } from "../../../Candidate/CandidateAction";
import SpeechRecognition, { } from 'react-speech-recognition';
import { AudioOutlined } from '@ant-design/icons';
import { Listbox} from '@headlessui/react'

const ButtonGroup = Button.Group;
const suffix = (
  <AudioOutlined
    onClick={SpeechRecognition.startListening}
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const green = "#39D1B4";
const yellow = "#FFD712";
// yup validation scheme for creating a call
const CallSchema = Yup.object().shape({
  callType: Yup.string().required("Select call type"),
  callCategory: Yup.string().required("Input required !"),
  callPurpose: Yup.string().required("Input required !"),

  startDate: Yup.string()
    .nullable()
    .required("Input required !"),

  startTime: Yup.string()
    .nullable()
    .required("Input required !"),
  endTime: Yup.string()
    .nullable()
    .required("Input required !"),

  // reminder:Yup.string()
  // .nullable()
  // .required("Input required !"),
});
function ContactCallForm(props) {


  
  const[category,setCategory] =useState(props.selectedCall ? props.selectedCall.callCategory : "New")
  const[reminder,setReminder] =useState(true)

  const[Type,setType]=useState(props.selectedCall?props.selectedCall.callType:"Inbound",)

  function handleCategoryChange (data)  {
    debugger;

    setCategory(  data );
  };
 function handleTypeChange  (data) {
    debugger;
    setType( data );

  };
  function handleReminderChange (checked) {
    setReminder(
       checked,
    );
  };
  function handleCallback (resetForm)  {
    const { handleChooserModal, handleCallModal, callback } = props;
    handleChooserModal(false);
    handleCallModal(false);
    callback && callback();
    // resetForm();
  };
  useEffect(() => {
    props.getAssignedToList(props.orgId);
    props.getAllSalesList();
    props.getAllCustomerData(props.userId)
    props.getFilteredEmailContact(userId);
    props.getAllOpportunityData(userId)
  }, []);

  
  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);

 
    const employeesData = props.assignedToList.map((item) => {
      return {
        label: `${item.empName}`,
        value: item.employeeId,
      };
    });

    const {
      user: { userId, firstName, empName,middleName, fullName, lastName, timeZone },
      isEditing,
      prefillCall,
      addingContactActivityCall,
      deleteCall,
      deletingCall,
      addContactActivityCall,
      startDate,
      endDate,
      startTime,
      endTime,
      defaultContacts,
      ownerId,
      employeeId,
      contactId,
      defaultAccounts,
      updateCall,
      updatingCall,
      defaultOpportunities,
    } = props;
    const filteredEmployeesData = employeesData.filter(
      (item) => item.value !== userId
    );
   
  

    if (props.selectedCall) {
      var data = props.selectedCall.callCategory === "New" ? false : true;
    }
   const selectedOption = props.assignedToList.find((item) => item.empName === selected);

   return (
      <>
        <Formik
          // enableReinitialize
          initialValues={
            isEditing
              ? prefillCall
              : {
                callType: Type,
                callCategory:category,

                callPurpose: "",
                fullName: "",
                timeZone: timeZone,
                remindInd: reminder ? true : false,
                remindTime: "",
                candidate: "",
                complitionInd: "Incomplete",
                startDate: startDate || dayjs(),
                startTime: startDate || null,
                endDate: endDate || null,
                endTime: endDate || null,

                callResult: "",
                callDescription: "",

                included: [],
                assignedTo: selectedOption ? selectedOption.employeeId:userId,
                contactId: "",
                candidateId: "",
              }
             
          }
          validationSchema={CallSchema}
          onSubmit={(values, { resetForm }) => {
  
            let timeZoneFirst = values.timeZone;
     

            let mytimeZone = timeZoneFirst.substring(4, 10);
           

            var a = mytimeZone.split(":");
     
            var timeZoneminutes = +a[0] * 60 + +a[1];
          
            if (!values.endDate) {
              values.endDate = values.startDate;
            }
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
           
            //Time calculation
            let firstStartTime = dayjs(values.startTime).format(
              "HH:mm:ss.SSS[Z]"
            ); // getting start time from form input
       
            let firstStartHours = firstStartTime.substring(0, 5); // getting only hours and minutes
   

            let timeEndPart = firstStartTime.substring(5, 13); // getting seconds and rest
      

            var firstStartTimeSplit = firstStartHours.split(":"); // removing the colon
   

            var minutes =
              +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1]; // converting hours into minutes


            var firstStartTimeminutes = minutes - timeZoneminutes; // start time + time zone
            

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
         
            var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
           
            let hr = Math.floor(firstEndTimeminutes / 60); // converting to hours

            let mi = firstEndTimeminutes % 60;
   
            hr = hr < 10 ? "0" + hr : hr;
            mi = mi < 10 ? "0" + mi : mi;
            let finalEndTime = `${hr}:${mi}`;
          

            let newEndTime = `${finalEndTime}${timeEndPart}`;
            let testVal = {
              ...values,
              callCategory: category,
              callType: Type,
              contactId:props.currentContact.contactId,
              startDate: `${newStartDate}T${newStartTime}`,
              endDate: `${newEndDate}T${newEndTime}`,

              startTime: 0,
              endTime: 0,
              assignedTo: selectedOption ? selectedOption.employeeId:userId,
            };
            isEditing
              ? updateCall(
                prefillCall.callId,
                {
                  ...values,
                  callCategory: category,
                  callType: Type,

                  startDate: `${newStartDate}T20:00:00Z`,
                  endDate: `${newEndDate}T20:00:00Z`,
                  startTime: 0,
                  endTime: 0,
                  assignedTo: selectedOption ? selectedOption.employeeId:userId,
                },
                () => handleCallback(resetForm)
              )
              : addContactActivityCall(testVal,
               resetForm()
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
            <div class="overflow-y-auto h-[34rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background">
              <div class=" flex justify-around max-sm:flex-col">
              <div class=" h-full w-w47.5 max-sm:w-wk"   >
              <div class=" flex justify-between w-full max-sm:flex-col">
                    <div class=" w-2/6 max-sm:w-wk mt-4">

                      <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                       
                        <FormattedMessage id="app.type" defaultMessage="Type" />
                      </div>
                      <div class=" flex justify-between">
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.introductory"
                              defaultMessage="Introductory"
                            />
                          }
                        >
                          <div
                          class="text-xl cursor-pointer"
                            onClick={() => handleTypeChange("Inbound")}
                            style={{
                              color: Type  === "Inbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-in-alt"></i>
                          </div>
                        </Tooltip>
     
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.interview"
                              defaultMessage="Interview"
                            />
                          }
                        >
                          <div
                          class="text-xl cursor-pointer"
                            onClick={() => handleTypeChange("Outbound")}
                            style={{
                             
                              color:
                              Type === "Outbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-out-alt"></i>
                          </div>
                        </Tooltip>
   
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.closure"
                              defaultMessage="Closure"
                            />
                          }
                        >
                          <div
                          class="text-xl cursor-pointer"
                            onClick={() => handleTypeChange("Conference")}
                            style={{
                             
                              color:
                              Type === "Conference"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-network-wired"></i>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                    <div class=" w-1/2 mt-4">
                
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                        <FormattedMessage
                          id="app.category"
                          defaultMessage="Category"
                        />
                      </div>
                      
                      <ButtonGroup>
                        <Button
                          onClick={() => handleCategoryChange("New")}
                          style={{
                            backgroundColor:
                            category === "New"
                                ? "orange"
                                : "white",
                            color:
                            category === "New" ? "white" : "black",
                          }}
                        >
                         
                          <FormattedMessage id="app.new" defaultMessage="New" />
                        </Button>
                        <Button
                          onClick={() => handleCategoryChange("Follow up")}
                          style={{
                            backgroundColor:
                            category === "Follow up"
                                ? "orange"
                                : "white",
                            color:
                            category === "Follow up"
                                ? "white"
                                : "black",
                          }}
                        >
                   
                          <FormattedMessage
                            id="app.followup"
                            defaultMessage="Follow up"
                          />
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
        
                  <div class=" flex justify-between items-end max-sm:flex-col mt-4" >
                    <div class=" self-start">
                    <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">
                      Mode
                      </div>
                      <Switch
                        name="mode"
                        checkedChildren="Audio"
                        unCheckedChildren="Video"
                      />
                    </div>
                    <div class=" w-1/3 self-baseline max-sm:w-wk">
                      <FastField
                        name="modeType"
                        label="Channel"
                        isColumn
                        options={[
                          "Zoom Call",
                          "Whatsapp call",
                          "Google Meet",
                          "Others",
                        ]}
                        component={SelectComponent}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/5 mt-[0.9rem] max-sm:w-wk">
                      <FastField
                        type="text"
                        name="modeLink"
                        placeholder="Link"
                        label=""
                        component={InputComponent}
                        inlineLabel
                        width={"100%"}
                        isColumn
                      />
                    </div>
                  </div>
                  <Field
                    name="callPurpose"
                    label={
                      <FormattedMessage
                        id="app.subject"
                        defaultMessage="Subject"
                      />
                    }
                    component={InputComponent}
                    isColumn
                    width={"100%"}
                    inlineLabel
                  />
                  <div class="mt-4">
                  <Field
                    name="startDate"
                    label={<FormattedMessage id="app.date" defaultMessage="Date" />}
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    value={values.startDate}
                    inlineLabel
                  />
                  </div>
                  
                  <div class=" flex justify-between max-sm:flex-col mt-4">
                    <div class=" w-1/2 max-sm:w-wk">
                      <Field
                        name="startTime"
                        // label="Start Time"
                        label={
                          <FormattedMessage
                            id="app.starttime"
                            defaultMessage="Start Time"
                          />
                        }
                        component={TimePicker}
                        isRequired
                        isColumn
                        use12Hours
                        value={values.startTime}
                        inlineLabel
                      />
                    </div>
                    <div class=" w-2/5 max-sm:w-wk">
                      <Field
                        name="endTime"
                        // label="End Time"
                        label={
                          <FormattedMessage
                            id="app.endtime"
                            defaultMessage="End Time"
                          />
                        }
                        component={TimePicker}
                        use12Hours
                        isRequired
                        isColumn
                        value={values.endTime}
                       
                      />
                    </div>
                  </div>
                  <div class="mt-4">
                  <Field
                    isRequired
                    defaultValue={{ label: timeZone, value: userId }}
                    name="timeZone"
                    isColumnWithoutNoCreate
                    //label="TimeZone "
                    label={
                      <FormattedMessage
                        id="app.timeZone"
                        defaultMessage="Time Zone"
                      />
                    }
                    selectType="timeZone"
                    isColumn
                    value={values.timeZone}
                    component={SearchSelect}
                    inlineLabel
                  />
                  </div>
                </div>
                <div class=" h-3/4 w-w47.5 max-sm:w-wk ">
                <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block font-semibold text-[0.75rem]">Assigned</Listbox.Label>
          <div className="relative mt-1">
              <Listbox.Button  style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
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
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }`
                      }
                      value={item.empName}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {item.empName}
                            </span>
                          </div>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                active ? "text-white" : "text-indigo-600"
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
                    <div class="mt-4">
                  <Field
                    name="included"
                    // label="Include"
                    label={
                      <FormattedMessage
                        id="app.include"
                        defaultMessage="Include"
                      />
                    }
                    mode
                    placeholder="Select"
                    component={SelectComponent}
                    options={Array.isArray(filteredEmployeesData) ? filteredEmployeesData : []}
                    value={values.included}
                    defaultValue={{
                      label: `${empName || ""} `,
                      value: employeeId,
                    }}
                  />
                  </div>  
               
            
                  {/* <div >
                  <Field
                    disabled="true"
                    isRequired
                    name="candidateId"
                    // type="text"
                    //label="Talent"
                    label={
                      <FormattedMessage
                        id="app.team"
                        defaultMessage="Team"
                      />
                    }
                    placeholder="Start typing to search..."
                    isColumnWithoutNoCreate
                    setClearbitCandidateData={props.setClearbitCandidateData}
                    component={CandidateClearbit}
                    inlineLabel
                  />
                   </div>
                */}
                  <div>
                    <div class=" w-full mt-4"><Field
                      name="callDescription"
                      // label="Notes"
                      label={
                        <FormattedMessage id="app.notes" defaultMessage="Notes" />
                      }
                      isColumn
                      width={"100%"}
                      component={TextareaComponent}
                      inlineLabel
                    /></div>
                  </div>
                 
            
                  {/* <div class=" flex justify-between" >
                    <div 
                    class=" w-1/2 font-bold">
                    <div class=" flex justify-between" >
                        <div>
                          <div class=" text-xs font-bold font-poppins text-black">Set Reminder</div>
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
                  </div> */}
                </div>
              </div>
              <div class=" flex justify-end mt-4">
                {isEditing && (
                  <>
                    <StyledPopconfirm
                      // title="Do you want to delete?"
                      title={
                        <FormattedMessage
                          id="app.doyouwanttodelete?"
                          defaultMessage="Do you want to delete?"
                        />
                      }
                      onConfirm={() => deleteCall(prefillCall.callId)}
                    >
                      <Button
                        type="danger"
                        htmlType="submit"
                        Loading={deletingCall}
                      >
                        <FormattedMessage
                          id="app.delete"
                          defaultMessage="Delete"
                        />
                      </Button>
                    </StyledPopconfirm>
                  </>
                )}
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={isEditing ? updatingCall : addingContactActivityCall}
                >
                  {isEditing ? (
                    "Update"
                  ) : (
                    // "Create"
                    <FormattedMessage id="app.create" defaultMessage="Create" />
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

const mapStateToProps = ({ auth, call, employee,customer, opportunity, candidate,contact }) => ({
  addingContactActivityCall: contact.addingContactActivityCall,
  allCustomerData:customer.allCustomerData,
  userId: auth.userDetails.userId,
  allOpportunityData:opportunity.allOpportunityData,
  orgId: auth.userDetails.organizationId,
  user: auth.userDetails,
  updatingCall: call.updatingCall,
  user: auth.userDetails,
  deletingCall: call.deleteCall,
  sales: opportunity.sales,
  assignedToList:employee.assignedToList,
  filteredContact: candidate.filteredContact,
  addNotesSpeechModal: call.addNotesSpeechModal,
  fullName: auth.userDetails.fullName
  // candidateByuserId:candidate.candidateByuserId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addContactActivityCall,
      getAllCustomerData,
      handleChooserModal,
      getAllSalesList,
      updateCall,
      handleCallModal,
      deleteCall,
      getAssignedToList,
      getAllOpportunityData,
      getFilteredEmailContact,
    //   setClearbitCandidateData, 
    //   handleCallNotesModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ContactCallForm);
















