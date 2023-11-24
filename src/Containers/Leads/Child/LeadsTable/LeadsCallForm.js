import React, { Component,useState, useMemo ,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllSalesList } from "../../../Opportunity/OpportunityAction"
import { FormattedMessage } from "react-intl";
import { Button, Icon, Switch, Tooltip } from "antd";
import { Formik, Form, Field, FastField } from "formik";
import * as Yup from "yup";
import{getAllOpportunityData} from "../../../Opportunity/OpportunityAction"
import { getFilteredEmailContact } from "../../../Candidate/CandidateAction";
import dayjs from "dayjs";
import { Spacer, StyledLabel } from "../../../../Components/UI/Elements";
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
import {addLeadsActivityCall} from "../../LeadsAction"
import {getAllCustomerData} from "../../../Customer/CustomerAction"
import { handleChooserModal } from "../../../Planner/PlannerAction";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { getEmployeelist } from "../../../Employees/EmployeeAction";
import CandidateClearbit from "../../../../Components/Forms/Autocomplete/CandidateClearbit";
import { setClearbitCandidateData } from "../../../Candidate/CandidateAction";
import SpeechRecognition, { } from 'react-speech-recognition';
import { AudioOutlined } from '@ant-design/icons';
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
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
function LeadsCallForm(props) {


  
  const[category,setCategory] =useState(props.selectedCall ? props.selectedCall.callCategory : "New")
  const[reminder,setReminder] =useState(true)
  console.log("category",category);
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
    props.getEmployeelist();
    props.getAllSalesList();
    props.getAllCustomerData(props.userId)
    props.getFilteredEmailContact(userId);
    props.getAllOpportunityData(userId)
  }, []);

  
  const [defaultOption, setDefaultOption] = useState(props.fullName);
  const [selected, setSelected] = useState(defaultOption);

    const {
      handleCallNotesModal

    } = props;

    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }

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
    const employeesData = props.employees.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.employeeId,
      };
    });
    const opportunityNameOption = props.allOpportunityData.map((item) => {
      return {
        label: `${item.opportunityName}`,
        value: item.opportunityId,
      };
    });

    const ContactData = props.filteredContact.map((item) => {
      return {
        label: `${item.fullName}`,
        value: item.contactId,
      };
    });
    const salesNameOption = props.sales.map((item) => {
      return {
        label: `${item.fullName || ""}`,
        value: item.employeeId,
      };
    });
    // console.log(this.state.category);
    const {
      user: { userId, firstName, middleName, fullName, lastName, timeZone },
      isEditing,
      prefillCall,
      addingCall,
      deleteCall,
      deletingCall,
      addLeadsActivityCall,
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
    console.log(defaultAccounts);
    console.log(defaultContacts);
    if (props.selectedCall) {
      var data = props.selectedCall.callCategory === "New" ? false : true;
    }
   const selectedOption = props.employees.find((item) => item.fullName === selected);
   console.log("bn",selectedOption,selected)
   console.log(props.rowdata)
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
            let testVal = {
              ...values,
              callCategory: category,
              callType: Type,
              leadsId:props.rowdata.leadsId,
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

                  startDate: `${newStartDate}T${newStartTime}`,
                  endDate: `${newEndDate}T${newEndTime}`,
                  startTime: 0,
                  endTime: 0,
                  assignedTo: selectedOption ? selectedOption.employeeId:userId,
                },
                () => handleCallback(resetForm)
              )
              : addLeadsActivityCall(testVal,
                () => handleCallback(resetForm));
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
                    <div class=" w-2/6 max-sm:w-wk">
                      <Spacer/>
                      <StyledLabel>
                        {/* Type */}
                        <FormattedMessage id="app.type" defaultMessage="Type" />
                      </StyledLabel>
                      <div class=" flex justify-between">
                        {/* <Tooltip title="Inbound"> */}
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.introductory"
                              defaultMessage="Introductory"
                            />
                          }
                        >
                          <div
                            onClick={() => handleTypeChange("Inbound")}
                            style={{
                              fontSize: "1.375em",
                              cursor: "pointer",
                              color:
                              Type  === "Inbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-in-alt"></i>
                          </div>
                        </Tooltip>
                        {/* <Tooltip title="Outbound"> */}
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.interview"
                              defaultMessage="Interview"
                            />
                          }
                        >
                          <div
                            onClick={() => handleTypeChange("Outbound")}
                            style={{
                              fontSize: "1.375em",
                              cursor: "pointer",
                              color:
                              Type === "Outbound"
                                  ? "Orange"
                                  : null,
                            }}
                          >
                            <i className="fas fa-sign-out-alt"></i>
                          </div>
                        </Tooltip>
                        {/* <Tooltip title="Conference"> */}
                        <Tooltip
                          title={
                            <FormattedMessage
                              id="app.closure"
                              defaultMessage="Closure"
                            />
                          }
                        >
                          <div
                            onClick={() => handleTypeChange("Conference")}
                            style={{
                              fontSize: "1.375em",
                              cursor: "pointer",
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
                    <div class=" w-1/2">
                      <Spacer />
                      <StyledLabel>
                        <FormattedMessage
                          id="app.category"
                          defaultMessage="Category"
                        />
                      </StyledLabel>
                      
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
                          {/* New */}
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
                          {/* Follow up */}
                          <FormattedMessage
                            id="app.followup"
                            defaultMessage="Follow up"
                          />
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                  <Spacer/>
                  <div class=" flex justify-between items-end max-sm:flex-col " >
                    <div class=" self-start">
                      <StyledLabel>
                      Mode
                      </StyledLabel>
                      <Switch
                        // style={{
                        //   marginLeft: "0.3125em"
                        // }}
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
                        style={{ flexBasis: "30%" }}
                        isColumn
                      />
                    </div>
                  </div>
                  <Field
                    // isRequired
                    name="callPurpose"
                    // label="Topic"
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
                  <Spacer />
                  <Field
                    name="startDate"
                    // label="Date"
                    label={
                      <FormattedMessage id="app.date" defaultMessage="Date" />
                    }
                    component={DatePicker}
                    isColumn
                    width={"100%"}
                    value={values.startDate}
                    inlineLabel
                  />
                  <Spacer />
                  <div class=" flex justify-between max-sm:flex-col">
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
                        style={{
                          width: "100%",
                        }}
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
                        // inlineLabel
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <Spacer />
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
                  <Spacer />
                  {/* {startDate ? (
                    <span>
                      {dayjs(startDate).isBefore(dayjs()) && (
                        <span>
                          <b>
                            <FormattedMessage
                              id="app.thiscalloccursinthepast!"
                              defaultMessage="This Call occurs in the past !"
                            />
                          </b>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      {dayjs(values.startDate).isBefore(dayjs()) && (
                        <span>
                          <b>
                            {" "}
                            <FormattedMessage
                              id="app.thiscalloccursinthepast!"
                              defaultMessage="This Call occurs in the past !"
                            />
                          </b>
                        </span>
                      )}
                    </span>
                  )} */}
                </div>
                <div class=" h-3/4 w-w47.5 max-sm:w-wk " 
                >
                <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block font-semibold text-[0.75rem]">Assigned to</Listbox.Label>
          <div className="relative mt-1">
              <Listbox.Button  style={{boxShadow: "rgb(170, 170, 170) 0px 0.25em 0.62em"}} className="relative w-full leading-4 cursor-default border border-gray-300 bg-white py-0.5 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {selected}
              </Listbox.Button>
              {open && (
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {props.employees.map((item) => (
                    <Listbox.Option
                      key={item.employeeId}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-9 ${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }`
                      }
                      value={item.fullName}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={`ml-3 block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {item.fullName}
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
                      <Spacer />
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
                    options={Array.isArray(employeesData) ? employeesData : []}
                    value={values.included}
                    defaultValue={{
                      label: `${fullName || ""} `,
                      value: employeeId,
                    }}
                  />
                 
               
                  <Spacer/>
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
                  <Spacer /> */}
                  <div>
                    <div class=" w-full"><Field
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
                 
                  <Spacer  />
                  {/* <div class=" flex justify-between" >
                    <div 
                    class=" w-1/2 font-bold">
                    <div class=" flex justify-between" >
                        <div>
                          <StyledLabel>Set Reminder</StyledLabel>
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
              <Spacer  />
              <div class=" flex justify-end">
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
                        {/* Delete */}
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
                  Loading={isEditing ? updatingCall : addingCall}
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

const mapStateToProps = ({ auth, call, employee,customer, opportunity, candidate }) => ({
  addingCall: call.addingCall,
  allCustomerData:customer.allCustomerData,
  userId: auth.userDetails.userId,
  allOpportunityData:opportunity.allOpportunityData,
  orgId: auth.userDetails.organizationId,
  user: auth.userDetails,
  updatingCall: call.updatingCall,
  user: auth.userDetails,
  deletingCall: call.deleteCall,
  sales: opportunity.sales,
  employees: employee.employees,
  filteredContact: candidate.filteredContact,
  addNotesSpeechModal: call.addNotesSpeechModal,
  fullName: auth.userDetails.fullName
  // candidateByuserId:candidate.candidateByuserId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addLeadsActivityCall,
      getAllCustomerData,
      handleChooserModal,
      getAllSalesList,
      updateCall,
      handleCallModal,
      deleteCall,
      getEmployeelist,
      getAllOpportunityData,
      getFilteredEmailContact,
      setClearbitCandidateData, 
      handleCallNotesModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LeadsCallForm);
















