import React, {  useState,useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {getAllCustomerData} from "../../../Customer/CustomerAction"
import { getFilteredEmailContact } from "../../../Candidate/CandidateAction";
import dayjs from "dayjs";
import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import AddressFieldArray from "../../../../Components/Forms/Formik/AddressFieldArray";
import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../../Components/Forms/Formik/TimePicker";
import {
  deleteEvent,
  updateEvent,
  handleEventModal,
} from "../../../Event/EventAction";
import {addContactActivityEvent} from "../../ContactAction";
import{getAllOpportunityData} from "../../../Opportunity/OpportunityAction"
import { handleChooserModal } from "../../../Planner/PlannerAction";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { getAssignedToList } from "../../../Employees/EmployeeAction";
import { getEvents } from "../../../Settings/Event/EventAction";
import { setClearbitCandidateData } from "../../../Candidate/CandidateAction";
import { Listbox } from '@headlessui/react'

// yup validation scheme for creating a opportunity
const EventSchema = Yup.object().shape({
  eventTypeId: Yup.string().required("Select event type"),
  eventSubject: Yup.string().required("This field is required !"),
  timeZone: Yup.string().required("Input required !"),
  startTime: Yup.string().nullable().required("Input required !"),
  endTime: Yup.string().nullable().required("Input required !"),
  startDate: Yup.string().nullable().required("Input required !"),
});

function ContactEventForm (props) {

      const [reminder,setRemider] = useState(true);
      const [defaultOption, setDefaultOption] = useState(props.fullName);
      const [selected, setSelected] = useState(defaultOption);

 function handleCallback  () {
    const { handleChooserModal, handleEventModal, callback }= props;
    handleChooserModal(false);
    handleEventModal(false);
    callback && callback();
  };
 const handleReminderChange = (checked) => {
  setRemider(checked);
  };
  useEffect(()=> {
    props.getAssignedToList(props.orgId);
   props.getEvents();
   props.getAllCustomerData(userId)
   props.getAllOpportunityData(userId)
   props.getFilteredEmailContact(userId);
  },[])
  
    const employeesData =props.assignedToList.map((item) => {
      return {
        label: `${item.empName}`,
        value: item.employeeId,
      };
    });
    const filteredEmployeesData = employeesData.filter(
      (item) => item.value !== userId
    );
    
  
const selectedOption = props.assignedToList.find((item) => item.empName === selected);
   
const {
      user: { userId, firstName, empName,fullName, middleName, lastName, timeZone },
      isEditing,
      prefillEvent,
      addingContactActivityEvent,
      addContactActivityEvent,
      deletingEvent,
      deleteEvent,
      startDate,
      endDate,
      contactId,
      startTime,
      endTime,
      defaultContacts,
      ownerId,
      defaultAccounts,
      eventType,
      updateEvent,
      updatingEvent,
      defaultOpportunities,
      creatorId,
      employeeId,
    } = props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={
            isEditing
              ? prefillEvent
              : {
                  eventType: "",
                  eventTypeId: "",
                  eventSubject: "",
                  eventVenue: "",
                  remindAt: "",
                  notificationEmail: false,
                  eventDescription: "",
                  timeZone: timeZone,
                  startDate: startDate || dayjs(),
                  startTime: startDate || null,
                  endDate: endDate || null,
                  endTime: endDate || null,
                  assignedTo: selectedOption ? selectedOption.employeeId:userId,
                  note: "",
                  eventStatus: "",
                  allDayInd: true,
                  candidateId: "",
                  included: [],
                  fullName: "",
                  contactId: "",
                  repeatStartDate: "",
                  complitionInd: "Incomplete",
                  repeatEndDate: "",
                  repeat_ind: false,
                  address: [
                    {
                      addressType: "",
                      address1: "",
                      address2: "",
                      town: "",
                      street: "",
                      city: "",
                      postalCode: "",
                      country: "",
                      latitude: "",
                      longitude: "",
                    },
                  ],
                  employeesIds: [],
                  ownerIds: [],
                }
          }
          validationSchema={EventSchema}
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

            isEditing
              ? updateEvent(
                  prefillEvent.eventId,
                  {
                    ...values,
                    startDate: `${newStartDate}T${newStartTime}`,
                    endDate: `${newEndDate}T${newEndTime}`,
                    startTime: 0,
                    endTime: 0,
                    assignedTo: selectedOption ? selectedOption.employeeId:userId,
                  },
                  () => handleCallback(resetForm)
                )
              : addContactActivityEvent(
                  {
                    ...values,
                    contact:props.currentContact.contactId,
                    ownerIds: userId === userId ? [userId] : [],
                    startDate: `${newStartDate}T${newStartTime}`,
                    endDate: `${newEndDate}T${newEndTime}`,
                    startTime: 0,
                    endTime: 0,
                    remindInd: reminder ? true : false,
                    assignedTo: selectedOption ? selectedOption.employeeId:userId,
                  },
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
                <div class=" h-full w-w47.5 max-sm:w-wk">
            <div class="mt-4">
                  <Field
                    isRequired
                    name="eventTypeId"
                    //label="Type"
                    label={
                      <FormattedMessage id="app.type" defaultMessage="Type" />
                    }
                    component={SearchSelect}
                    isColumnWithoutNoCreate
                    selectType="eventType"
                    value={values.eventTypeId}
                    isColumn
                    inlineLabel
                  />
                  </div>
                  <div class="mt-4">
                  <Field
                    isRequired
                    name="eventSubject"
                    //label="Topic"
                    label={
                      <FormattedMessage
                        id="app.subject"
                        defaultMessage="Subject"
                      />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </div>
                 
                  <div>
                    <div class=" flex justify-between mt-4">
                      <div class=" w-1/2">
                        <Field
                          isRequired
                          name="startDate"
                          //label="Start "
                          label={
                            <FormattedMessage
                              id="app.startDate"
                              defaultMessage="Start Date"
                            />
                          }
                          isColumn
                          component={DatePicker}
                          value={values.startDate}
                          inlineLabel
                        />
                      </div>
                      <div class=" w-5/12">
                        <Field
                          isRequired
                          name="startTime"
                          // label="Start Time"
                          label={
                            <FormattedMessage
                              id="app.startTime"
                              defaultMessage="Start Time"
                            />
                          }
                          isColumn
                          component={TimePicker}
                          use12Hours
                          value={values.startTime}
                          inlineLabel
                         
                        />
                      </div>
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-1/2">
                      <Field
                        isRequired
                        name="endDate"
                        // label="End "
                        label={
                          <FormattedMessage
                            id="app.enddate"
                            defaultMessage="End Date"
                          />
                        }
                        component={DatePicker}
                        isColumn
                        value={values.endDate || values.startDate}
                        defaultValue={dayjs("2015-01-01")}
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
                    <div class=" w-5/12">
                      <Field
                        isRequired
                        name="endTime"
                       
                        label={
                          <FormattedMessage
                            id="app.endtime"
                            defaultMessage="End Time"
                          />
                        }
                        isColumn
                        component={TimePicker}
                        use12Hours
                        value={values.endTime}
                        inlineLabel
                      />
                    </div>
                  </div>
                  <Field
                    isRequired
                    defaultValue={{ label: timeZone, value: userId }}
                    isColumnWithoutNoCreate
                    name="timeZone"
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
           
                  
                    {/* <Field
                      name="employeesId"
                      isColumnWithoutNoCreate
                      selectType="employee"
                      // label="Assigned"
                      label={
                        <FormattedMessage
                          id="app.assignedto"
                          defaultMessage="Assigned"
                        />
                      }
                      component={SearchSelect}
                      isColumn
                      value={values.employeeId}
                      defaultValue={{
                        label: `${firstName || ""} ${middleName || ""} ${
                          lastName || ""
                        }`,
                        value: employeeId,
                      }}
                      inlineLabel
                    /> */}
                 <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-semibold text-gray-700">
              Assigned
            </Listbox.Label>
            <div className="relative mt-1">
            <Listbox.Button className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}}>
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
                            <div
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {item.empName}
                            </div>
                          </div>
                          {selected && (
                            <div
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
                            </div>
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
                
                  
                  {/* <Field
                    disabled="true"
                    isRequired
                    name="candidateId"
                    // type="text"
                    label="Team"
                    placeholder="Start typing to search..."
                    isColumnWithoutNoCreate
                    setClearbitCandidateData={
                      props.setClearbitCandidateData
                    }
                    component={CandidateClearbit}
                    inlineLabel
                  /> */}
                  {/* {startDate ? (
                    <span>
                      {dayjs(startDate).isBefore(dayjs()) && (
                        <span>
                          <b>This Event occurs in the past !</b>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      {dayjs(values.startDate).isBefore(dayjs()) && (
                        <span>
                          <b>This Event occurs in the past !</b>
                        </span>
                      )}
                    </span>
                  )} */}
                </div>
                <div class=" h-full w-w47.5 max-sm:w-wk mt-4">
                <div class="mt-4">
                  <FieldArray
                    name="address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        singleAddress
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  />
                  </div>
                  <div class="mt-4">
                  <Field
                    name="eventDescription"
                    //label="Notes"
                    label={
                      <FormattedMessage id="app.notes" defaultMessage="Notes" />
                    }
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                  />
                  </div>
                  
                  {/* <div class=" flex justify-between">
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
        
              <div class="flex justify-end mt-4">
                {isEditing && (
                  <>
                    <StyledPopconfirm
                      title="Do you want to delete?"
                      onConfirm={() => deleteEvent(prefillEvent.eventId)}
                    >
                      <Button
                        type="danger"
                        htmlType="submit"
                        Loading={deletingEvent}
                      >
                        <FormattedMessage
                          id="app.delete"
                          defaultMessage="Delete"
                        />
                      </Button>
                    </StyledPopconfirm>
                  </>
                )}
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={isEditing ? updatingEvent : addingContactActivityEvent}
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
const mapStateToProps = ({ auth, event,opportunity,customer, employee, events, candidate,contact }) => ({
  addingContactActivityEvent: contact.addingContactActivityEvent,
  orgId: auth.userDetails.organizationId,
  allCustomerData:customer.allCustomerData,
  updatingEvent: event.updatingEvent,
  user: auth.userDetails,
  allOpportunityData:opportunity.allOpportunityData,
  filteredContact: candidate.filteredContact,
  deletingEvent: event.deleteEvent,
  assignedToList:employee.assignedToList,
  events: events.events,
  candidateId: candidate.clearbitCandidate.candidateId,
  fullName: auth.userDetails.fullName
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addContactActivityEvent,
      deleteEvent,
      updateEvent,
      handleChooserModal,
      handleEventModal,
      getAssignedToList,
      getEvents,
      getAllOpportunityData,
      getAllCustomerData,
      getFilteredEmailContact,
      setClearbitCandidateData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactEventForm);
