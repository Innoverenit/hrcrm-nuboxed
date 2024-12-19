import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { getAssignedToList } from "../../../Employees/EmployeeAction";
import {getAllCustomerData} from "../../../Customer/CustomerAction"
import {
    getContactListByCustomerId,
    getOpportunityListByCustomerId,
  } from "../../CustomerAction";
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
import {updateActivityEventForm} from "../../../Customer/CustomerAction"
import { handleChooserModal } from "../../../Planner/PlannerAction";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { setClearbitCandidateData } from "../../../Candidate/CandidateAction";
import { Listbox } from '@headlessui/react'

// yup validation scheme for creating a opportunity
const EventSchema = Yup.object().shape({
  eventTypeId: Yup.string().required("Select event type"),
  eventSubject: Yup.string().required("This field is required !"),
  timeZone: Yup.string().required("Input required !"),
  // endDate: Yup.string()
  //   .nullable()
  //   .required("Input required !"),
  startTime: Yup.string().nullable().required("Input required !"),
  endTime: Yup.string().nullable().required("Input required !"),
  startDate: Yup.string().nullable().required("Input required !"),
});

function UpdateActivityEventForm (props) {

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
   props.getAllCustomerData(userId)
   props.getOpportunityListByCustomerId(props.customer.customerId);
   props.getContactListByCustomerId(props.customer.customerId);
  },[])
  
    const employeesData =props.sales.map((item) => {
      return {
        label: `${item.fullName}`,
        // label: `${item.salutation || ""} ${item.firstName ||
        //   ""} ${item.middleName || ""} ${item.lastName || ""}`,
        value: item.employeeId,
      };
    });
    const filteredEmployeesData = employeesData.filter(
      (item) => item.value !== props.user.userId
    );
    const opportunityNameOption = props.opportunityByCustomerId.map((item) => {
      return {
        label: `${item.opportunityName}`,
        value: item.opportunityId,
      };
    });
    const ContactData = props.contactByCustomerId.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.contactId,
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
const selectedOption = props.assignedToList.find((item) => item.empName === selected);
   
const {
      user: { userId, firstName,empName, fullName, middleName, lastName, timeZone },
      isEditing,
      prefillEvent,
      updatingActivityEventForm,
      updateActivityEventForm,
      deletingEvent,
      deleteEvent,
      startDate,
      endDate,
      //  contactId,
      startTime,
      endTime,
      defaultCustomers,
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
          // enableReinitialize
          initialValues={
            {
                  eventType: "",
                  eventTypeId: "",
                  eventSubject: "",
                  eventVenue: "",
                  remindAt: "",
                  // opportunity:"",
                  // contact:"",
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
                  // candidateId: "",
                  included: [],
                  fullName: "",
                
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
                  // employeesIds: [],
                  // ownerIds: [],
                }
          }
          validationSchema={EventSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            let timeZoneFirst = values.timeZone;
            console.log(timeZone);

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

            let newStartTime = `${finalStartTime}${timeEndPart}`;

            let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
            let firstEndTime = dayjs(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
            let firstEndHours = firstEndTime.substring(0, 5); // getting only hours and minutes
            var firstEndTimeSplit = firstEndHours.split(":"); // removing the colon
            var endMinutes = +firstEndTimeSplit[0] * 60 + +firstEndTimeSplit[1]; // converting hours into minutes
            console.log(endMinutes);
            var firstEndTimeminutes = Math.abs(endMinutes - timeZoneminutes); // start time + time zone
            console.log(firstEndTimeminutes);
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
                    contact: values.contact,
                    // contact: values.contactId,
                    opportunity: values.opportunity,
                    customer: props.customer.customerId,
                    startDate: `${newStartDate}T${newStartTime}`,
                    endDate: `${newEndDate}T${newEndTime}`,
                    startTime: 0,
                    endTime: 0,
                    assignedTo: selectedOption ? selectedOption.employeeId:userId,
                  },
                  handleCallback
                )
              : 
              updateActivityEventForm(
                  {
                    ...values,
                    contact: values.contact,
                    // contact: values.contactId,
                    opportunity: values.opportunity,
                    customer: props.customer.customerId,
                    // ownerIds: userId === userId ? [userId] : [],
                    startDate: `${newStartDate}T${newStartTime}`,
                    endDate: `${newEndDate}T${newEndTime}`,
                    startTime: 0,
                    endTime: 0,
                    remindInd: reminder ? true : false,
                    assignedTo: selectedOption ? selectedOption.employeeId:userId,
                  },props.selectedStatus.eventId,
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
            <div class="overflow-y-auto h-[44rem] overflow-x-hidden max-sm:h-[30rem]">
            <Form className="form-background h-wk">
              <div class=" flex justify-around max-sm:flex-col">
                <div class=" h-full w-w47.5.5 mt-3 max-sm:w-wk">
                  
                  <Field
                    isRequired
                    name="eventTypeId"
                    label="Type"
                    component={SearchSelect}
                    isColumnWithoutNoCreate
                    selectType="eventType"
                    value={values.eventTypeId}
                    isColumn
                    inlineLabel
                  />
                  <Field
                    isRequired
                    name="eventSubject"
                    //label="Topic"
                    label="Subject"
                    
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                
                  <div class=" mt-3">
                    <div class=" flex justify-between">
                      <div class=" w-1/2">
                        <Field
                          isRequired
                          name="startDate"
                          label="Start "
                         
                          isColumn
                          component={DatePicker}
                          value={values.startDate}
                          inlineLabel
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                      <div class=" w-5/12">
                        <Field
                          isRequired
                          name="startTime"
                          label="Start Time"
                         
                          isColumn
                          component={TimePicker}
                          use12Hours
                          value={values.startTime}
                          inlineLabel
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div class=" flex justify-between">
                    <div class=" w-1/2">
                      <Field
                        isRequired
                        name="endDate"
                        label="End "
                       
                        component={DatePicker}
                        isColumn
                        value={values.endDate || values.startDate}
                        defaultValue={dayjs("2015-01-01")}
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
                        name="endTime"
                        label="End Time"
                       
                        isColumn
                        component={TimePicker}
                        use12Hours
                        value={values.endTime}
                        inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <Field
                    isRequired
                    defaultValue={{ label: timeZone, value: userId }}
                    isColumnWithoutNoCreate
                    name="timeZone"
                    label="TimeZone "
                    selectType="timeZone"
                    isColumn
                    value={values.timeZone}
                    component={SearchSelect}
                    inlineLabel
                  />
                 
                  
                 <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-semibold text-gray-700 mt-3">
              Assigned
            </Listbox.Label>
            <div className="relative mt-1">
            <Listbox.Button style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" >
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
      <div class=" mt-3">
                  <Field
                    name="included"
                    label="Include"
                    mode
                    placeholder="Select"
                    component={SelectComponent}
                    options={Array.isArray(filteredEmployeesData) ? filteredEmployeesData : []}
                    value={values.included}
                    defaultValue={{
                      label: `${fullName || ""} `,
                      value: employeeId,
                    }}
                  />
                  </div>
                  <div class=" mt-3">
                  {props.user.crmInd === true &&(
                <Field
                name="customerId"
                isColumnWithoutNoCreate
                selectType="customerList"
                label="Tag Company"
              
                component={SearchSelect}
                isColumn
                value={values.customerId}
                isDisabled={defaultCustomers}
              
                defaultValue={defaultCustomers ? defaultCustomers : null}
                // defaultValue={
                //   defaultCustomers ? defaultCustomers : null
                // }
                inlineLabel
              />
                  )} 
                  </div>
                  <div class=" mt-3">
                  {props.user.crmInd === true &&(
                  <Field
                    name="contact"
                    //selectType="contactList"
                    isColumnWithoutNoCreate
                    label="Contact"
                  
                    component={SelectComponent}
                    isColumn
                    options={Array.isArray(ContactData) ? ContactData : []}
                    // value={values.contactId}
                    // isDisabled={defaultContacts}
                    // defaultValue={{
                    //   label: `${fullName || ""} `,
                    //   value: contactId,
                    // }}
                    inlineLabel
                  />
                  )} 
                  </div>
                  <div class=" mt-3">
                  {props.user.crmInd === true &&(
                 <Field
                 name="opportunity"
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
                //  value={values.opportunityId}
                 inlineLabel
               />
                  )} 
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
                <div class=" h-full w-w47.5.5 mt-3 max-sm:w-wk ">
                
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
              <div class=" mt-3">
                  <Field
                    name="eventDescription"
                    label="Notes"
                   
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
            
              <div class=" flex justify-end mt-3">
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
                      Delete
                      </Button>
                    </StyledPopconfirm>
                  </>
                )}
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isEditing ? updatingEvent : updatingActivityEventForm}
                >
                  {isEditing ? (
                    "Update"
                  ) : (
                  
                    "Update"
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
const mapStateToProps = ({ auth, event,opportunity,customer, employee, events, candidate }) => ({
  updatingActivityEventForm: customer.updatingActivityEventForm,
  assignedToList:employee.assignedToList,
  opportunityByCustomerId: customer.opportunityByCustomerId,
  contactByCustomerId: customer.contactByCustomerId,
  allCustomerData:customer.allCustomerData,
  updatingEvent: event.updatingEvent,
  user: auth.userDetails,
  orgId: auth.userDetails.organizationId,
  setActivityEditingEvents:event.setActivityEditingEvents,
  deletingEvent: event.deleteEvent,
  sales: opportunity.sales,
  candidateId: candidate.clearbitCandidate.candidateId,
  fullName: auth.userDetails.fullName
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateActivityEventForm,
      deleteEvent,
      updateEvent,
      getAssignedToList,
      handleChooserModal,
      handleEventModal,
      getOpportunityListByCustomerId,
      getContactListByCustomerId,
      getAllCustomerData,
      setClearbitCandidateData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateActivityEventForm);
