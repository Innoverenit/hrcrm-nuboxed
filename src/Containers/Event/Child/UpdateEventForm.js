import React, { Component,useEffect,useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button, Switch,Select } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { getAssignedToList } from "../../Employees/EmployeeAction";
import{getAllOpportunityData} from "../../Opportunity/OpportunityAction"
import { getFilteredEmailContact } from "../../Candidate/CandidateAction";
import {getAllCustomerData} from "../../Customer/CustomerAction"
import dayjs from "dayjs";
import CandidateClearbit from "../../../Components/Forms/Autocomplete/CandidateClearbit";
import SearchSelect from "../../../Components/Forms/Formik/SearchSelect";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import AddressFieldArray from "../../../Components/Forms/Formik/AddressFieldArray";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../Components/Forms/Formik/TimePicker";
import {
  updateEvent,
  handleEventModal,
} from "../EventAction";
import { handleChooserModal } from "../../Planner/PlannerAction";
import { TextareaComponent } from "../../../Components/Forms/Formik/TextareaComponent";
import { getEvents } from "../../Settings/Event/EventAction";

const { Option } = Select;
/**
 * yup validation scheme for creating a opportunity
 */
const EventSchema = Yup.object().shape({
  eventTypeId: Yup.string().required("Select event type"),
  eventSubject: Yup.string().required("This field is required !"),
  timeZone: Yup.string().required("Input required !"),
});

function UpdateEventForm (props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     reminder: true,
  //   };
  // }
  const includeOption = props.setEditingEvents.included===null?[]: props.setEditingEvents.included.map((item) => {
    return item.fullName
  })
  const [includeNames, setInclude] = useState(includeOption);
 function  handleCallback ()  {
    const { handleChooserModal, handleEventModal, callback } = props;
    handleChooserModal(false);
    handleEventModal(false);
    callback && callback();
  };
  function handleChangeInclude(value) {
    setInclude(value)
  }
  useEffect(()=> {

    props.getAllCustomerData(props.userId)
    props.getAssignedToList(props.orgId);
    props.getAllOpportunityData(props.userId)
    props.getFilteredEmailContact(props.userId);
   },[])

  useEffect(() => {
    console.log("helo")
    const includeOption = props.setEditingEvents.included===null?[]: props.setEditingEvents.included.map((item) => {
      return item.fullName
    })

    
   
    setInclude(includeOption)
    console.log("test", includeOption)
  
  }, [props.setEditingEvents]);
  console.log(includeNames)
  // handleReminderChange = (checked) => {
  //   this.setState({
  //     reminder: checked,
  //   });
  // };
  // componentDidMount() {
  // }
 

  // render() {
  
   
    const employeesData = props.employees.map((item) => {
      return {
        label: item.fullName,
        value: item.employeeId,
      };
    });
    const ContactData = props.filteredContact.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.contactId,
      };
    });
    const opportunityNameOption = props.allOpportunityData.map((item) => {
      return {
        label: `${item.opportunityName}`,
        value: item.opportunityId,
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
    const employeeOption = props.assignedToList.map((item) => {
      return {
        label: item.empName,
        value: item.employeeId,
      };
    });
    const {
      user: { userId, firstName, middleName,fullName, lastName, timeZone },
      isEditing,
      prefillEvent,
      addingEvent,
      addEvent,
      deletingEvent,
      deleteEvent,
      startDate,
      endDate,
      startTime,
      endTime,
      defaultContacts,
      ownerId,
      defaultAccounts,
      // updateEvent,
       updatingEvent,
      defaultOpportunities,
      creatorId,
      employeeId,
      eventTypeId,
    } = props;

    console.log(defaultAccounts);
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={
            // isEditing  ? prefillEvent : 
            {
              // eventType: props.setEditingEvents.eventType || "",
              eventTypeId: props.setEditingEvents.eventTypeId || "",
              eventSubject: props.setEditingEvents.eventSubject || "",
              // eventVenue: props.setEditingEvents.eventVenue || "",
              // remindAt: props.setEditingEvents.remindAt || "",
              // notificationEmail: false,
              eventDescription: props.setEditingEvents.eventDescription || "",
              timeZone: timeZone,
              startDate: startDate || dayjs(),
              // startTime: startDate || null,
              // endDate: endDate || null,
              // endTime: endDate || null,
              included: includeNames,
              // note: props.setEditingEvents.note || "",
              // eventStatus: props.setEditingEvents.eventStatus || "",
              // allDayInd: true,
              candidateId: props.setEditingEvents.candidateId || "",
              // repeatStartDate: props.setEditingEvents.repeatStartDate || "",
              // completionInd: "Incomplete",
              // repeatEndDate: props.setEditingEvents.repeatEndDate || "",
              // repeat_ind: false,
              address: [
                {
                  addressId: props.setEditingEvents.address.length ? props.setEditingEvents.address[0].addressId : "",
                  addressType: "",
                  address1:  props.setEditingEvents.address.length ? props.setEditingEvents.address[0].address1 : "",
                  address2: "",
                  town: props.setEditingEvents.address.length ? props.setEditingEvents.address[0].town : "",
                  street: props.setEditingEvents.address.length ? props.setEditingEvents.address[0].street : "",
                  city: props.setEditingEvents.address.length ? props.setEditingEvents.address[0].city : "",
                  postalCode: props.setEditingEvents.address.length ? props.setEditingEvents.address[0].postalCode : "",
                  country: "",
                  latitude: "",
                  longitude: "",
                },
              ],
              // employeesIds: [],
              // ownerIds: [],
              assignedTo: props.setEditingEvents.assignedTo || "",
            }
          }
          // validationSchema={EventSchema}
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

            // isEditing ? 
           props.updateEvent(
              //   prefillEvent.eventId,
              props.setEditingEvents.eventId,
              {
                ...values,
                // ownerIds: userId === userId ? [userId] : [],
                startDate: `${newStartDate}T20:00:00Z`,
              endDate: `${newEndDate}T20:00:00Z`,
                startTime: 0,
                endTime: 0,
                included: includeNames,
                // remindInd: this.state.reminder ? true : false,
              },

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
          <div class=" flex justify-between max-sm:flex-col">
              <div class=" h-full w-w47.5 max-sm:w-wk"   >
                  <Field
                    isRequired
                    name="eventTypeId"
                    //label="Type"
                    label={
                      <FormattedMessage id="app.type" defaultMessage="type" />
                    }
                    component={SearchSelect}
                    isColumnWithoutNoCreate
                    selectType="eventType"
                    isColumn
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      // marginTop: "0.25em" 
                    }}
                  // defaultValue='low'
                  />
                 
                  <div class="mt-3">
                  <Field
                    isRequired
                    name="eventSubject"
                    //label="Topic"
                    label={
                      <FormattedMessage
                      id="app.subject"
                      defaultMessage="subject"
                    />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      // height: "2.0625em",
                      // marginTop: "0.25em",
                    }}
                  />
                  </div>
                 
                  <div class=" flex justify-between mt-3" >
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
                        style={{
                          flexBasis: "80%",
                          width: "100%",
                        }}
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
                        style={{
                          flexBasis: "80%",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                
                  <div class=" flex justify-between mt-3" >
                    <div class=" w-1/2">
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
                        defaultValue={dayjs("2015-01-01")}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
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
                        //label="End Time"
                        label={
                          <FormattedMessage
                          id="app.endtime"
                          defaultMessage="endtime"
                        />
                        }
                        isColumn
                        component={TimePicker}
                        use12Hours
                        value={values.endTime}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>

                  <div class="mt-3">
                  <Field
                    isRequired
                    defaultValue={{ label: timeZone, value: userId }}
                    isColumnWithoutNoCreate
                    name="timeZone"
                    //label="TimeZone "
                    label={
                      <FormattedMessage
                        id="app.timeZone"
                        defaultMessage="timeZone"
                      />
                    }
                    selectType="timeZone"
                    isColumn
                    // margintop={"0.25em"}
                    value={values.timeZone}
                    component={SearchSelect}
                    inlineLabel
                    style={{ flexBasis: "50%" }}
                  />
                  </div>
                  <div class="mt-3">
                  <Field
                    name="eventDescription"
                    //label="Notes"yy
                    label={
                      <FormattedMessage
                        id="app.notes"
                        defaultMessage="notes"
                      />
                    }
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "5em",
                    }}
                  />
                  </div>
  
                  <div class="mt-3">
                  {props.user.crmInd === true &&(
                 <Field
                 name="customerId"
                 // selectType="customerList"
                 isColumnWithoutNoCreate
                 label={
                  <FormattedMessage
                     id="app.customer"
                     defaultMessage="customer"
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
                  
                  <div class="mt-3">
                  {props.user.crmInd === true &&(
                  <Field
                    name="contactId"
                    //selectType="contactList"
                    isColumnWithoutNoCreate
                    // label="Contact"
                    label={
                      <FormattedMessage
                        id="app.contact"
                        defaultMessage="contact"
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
                 
                  <div class="mt-3">
                  {props.user.crmInd === true &&(
                 <Field
                 name="opportunityId"
                 // selectType="customerList"
                 isColumnWithoutNoCreate
                 label={
                  <FormattedMessage
                     id="app.opportunity"
                     defaultMessage="opportunity"
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
                  
                  {/* <Spacer />
                  {startDate ? (
                    <span>
                      {dayjs(startDate).isBefore(dayjs()) && (
                        <span style={{ marginLeft: 10 }}>
                          <b>This Event occurs in the past !</b>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      {dayjs(values.startDate).isBefore(dayjs()) && (
                        <span style={{ marginLeft: 10 }}>
                          <b>This Event occurs in the past !</b>
                        </span>
                      )}
                    </span>
                  )} */}
                </div>
                <div class=" h-full w-w47.5 max-sm:w-wk mt-3"   >
              

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
                  //value={values.assignedTo}
                  options={Array.isArray(employeeOption) ? employeeOption : []}
                  // defaultValue={{
                  //   label: `${firstName || ""} ${middleName ||
                  //     ""} ${lastName || ""}`,
                  //   value: employeeId,
                  // }}
                  inlineLabel
                />
                  
                  {/* <Field
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
                    options={Array.isArray(employeesData) ? employeesData : []}
                    value={values.included}
                    defaultValue={{
                      label: `${fullName || ""} `,
                      value: employeeId,
                    }}
                  /> */}
                     <div class="w-full mt-3">
                     <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col">Include</div> 
  
                     <Select
  name="included"
  mode="multiple"
  style={{ width: '100%' }}
  placeholder="Select"
  defaultValue={includeNames}
  onChange={handleChangeInclude}
>
  {props.assignedToList.map((item) => {
    const isCurrentUser = item.employeeId === props.user.userId;

    if (!isCurrentUser) {
      return (
        <Option key={item.employeeId} value={item.employeeId}>
          {item.empName}
        </Option>
      );
    }

    return null; // Skip rendering for the current user
  })}
</Select>

  
                    </div>
                  <div class="mt-3">
                  <Field
                    isRequired
                    name="candidateId"
                    label="Team"
                    placeholder="Start typing to search..."
                    isColumnWithoutNoCreate
                    setClearbitCandidateData={props.setClearbitCandidateData}
                    component={CandidateClearbit}
                    // selectType="candidateList"
                    isColumn
                    inlineLabel
                    style={{ flexBasis: "80%" }}
                  />
                  </div>
                  <div class="mt-3">
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
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3 "> 
                    Set Reminder
                  </div>
                  <div class=" flex justify-between max-sm:justify-around" >

                    <Switch
                      style={{ width: "60px" }}
                     // onChange={this.handleReminderChange}
                      // checked={this.state.reminder}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                    {/* {this.state.reminder ? ( */}
                      <div class=" w-1/3 font-bold">
                        <Field
                          isRequired
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
                          defaultValue='30 min'
                          isColumn
                          inlineLabel
                        />
                      </div>

                    {/* ) : null} */}
                  </div>
                </div>
              </div>
             
              <div class=" flex justify-end mt-3">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={updatingEvent}
                >

                  <FormattedMessage
                    id="app.update"
                    defaultMessage="update"
                  />
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }



const mapStateToProps = ({ auth, event,opportunity,candidate, employee, customer,events }) => ({
  allCustomerData:customer.allCustomerData,
  updatingEvent: event.updatingEvent,
  user: auth.userDetails,
  orgId: auth.userDetails.organizationId,
  userId:auth.userDetails.userId,
  filteredContact: candidate.filteredContact,
  setEditingEvents: event.setEditingEvents,
  allOpportunityData:opportunity.allOpportunityData,
  employees: employee.employees,
  assignedToList:employee.assignedToList,
  events: events.events,
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllCustomerData,
      getAllOpportunityData,
      getAssignedToList,
      updateEvent,
      handleChooserModal,
      handleEventModal,
      getFilteredEmailContact,
      getEvents,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventForm);