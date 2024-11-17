import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
import { TimePicker } from "../../Components/Forms/Formik/TimePicker";
import {
  addProject,
  updateProject,
  handleProjectModal,
} from "./ProjectAction";
import { handleChooserModal } from "../Planner/PlannerAction";
import { TextareaComponent } from "../../Components/Forms/Formik/TextareaComponent";
const ProjectSchema = Yup.object().shape({
  // eventType: Yup.string().required("Select event type"),
  project: Yup.string().required("This field is required !"),
  timeZone: Yup.string().required("Input required !"),
  // endDate: Yup.string()
  //   .nullable()
  //   .required("Input required !"),
  startTime: Yup.string()
    .nullable()
    .required("Input required !"),
  endTime: Yup.string()
    .nullable()
    .required("Input required !"),
  // startDate: Yup.string()
  //   .nullable()
  //   .required("Input required !"),
});

class ProjectForm extends Component {
  handleCallback = () => {
    const { handleChooserModal, handleProjectModal, callback } = this.props;
    handleChooserModal(false);
    handleProjectModal(false);
    // callback && callback();
  };
  render() {
    const {
      user: { userId, firstName, middleName, lastName, timeZone },

      isEditing,
      prefillProject,
      addingProject,
      addProject,
      // deletingEvent,
      //   deleteEvent,
      startDate,
      endDate,
      startTime,
      endTime,
      defaultContacts,
      ownerId,
      defaultAccounts,
      updateProject,
      updatingProject,
      defaultOpportunities,
      creatorId,
    } = this.props;

    console.log(defaultAccounts);

    console.log(startTime);
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={
            isEditing
              ? prefillProject
              : {
                // eventType: undefined,
                project: "",
                // eventVenue: "",
                // remindAt: "",
                // notificationEmail: false,
                notesField: "",
                timeZone: timeZone,
                startDate: startDate || dayjs(),
                startTime: startDate || null,
                endDate: endDate || null,
                endTime: endDate || null,
                // note: "",
                // eventStatus: "",
                // allDayInd: true,
                // repeatStartDate: "",
                // completionInd: "Incomplete",
                // repeatEndDate: "",
                // repeat_ind: false,
                // ownerIds: [],
                userId: this.props.userId,

              }
          }
          validationSchema={ProjectSchema}
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
              ? updateProject(
                prefillProject.projectId,
                {
                  ...values,
                  startDate: `${newStartDate}T${newStartTime}`,
                  endDate: `${newEndDate}T${newEndTime}`,
                  startTime: 0,
                  endTime: 0,
                },
                this.handleCallback
              )
              : addProject(
                {
                  ...values,
                  creationDate: "",
                  // ownerIds: userId === userId ? [userId] : [],
                  startDate: `${newStartDate}T${newStartTime}`,
                  endDate: `${newEndDate}T${newEndTime}`,
                  startTime: 0,
                  endTime: 0,
                },
                this.handleCallback,
                this.props.userId,

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
            <Form className="form-background">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  {/* <Field
                    isRequired
                    name="eventType"
                    label="Type"
                    placeholder={"Select"}
                    component={SelectComponent}
                    isColumn
                    options={["Meeting", "Conference", "Webinar", "Workshop"]}
                    inlineLabel
                    style={{ flexBasis: "80%", marginTop: "0.25em" }}
                    // defaultValue='low'
                  />
                  */}

                  <div class="mt-3">
                  <Field
                    isRequired
                    name="project"
                    // label="Project"
                    label={<FormattedMessage
                      id="app.project"
                      defaultMessage="Project"
                    />}
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </div>
                  
                  <div class="flex justify-between mt-3">
                    <div class="w-[47.5%]">
                      <Field
                        isRequired
                        name="startTime"
                        // label="Start Time"
                        label={<FormattedMessage
                          id="app.startTime"
                          defaultMessage="Start Time"
                        />}
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
                    <div class="w-[47.5%]">
                      <Field
                        isRequired
                        name="endTime"
                        //label="End Time"
                        label={<FormattedMessage
                          id="app.endTime"
                          defaultMessage="End Time"
                        />}
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
                  )}
                </div>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <div class="mt-3">
                  <Field
                    name="notesField"
                    //label="Notes"
                    label={<FormattedMessage
                      id="app.eventDescription"
                      defaultMessage="Notes"
                    />}
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                  />
</div>
                  {/* <Field
                      name="ownerIds"
                      selectType="user"
                      label="Assigned"
                      component={SearchSelect}
                      isColumn
                      margintop={"0.25em"}
                      value={values.ownerIds}
                      defaultValue={{
                        label: `${firstName || ""} ${middleName ||
                          ""} ${lastName || ""}`,
                        value: userId,
                      }}
                      inlineLabel
                      style={{ flexBasis: "80%" }}
                    />
                  )} */}
                

                </div>
              </div>
         
              <div class="flex justify-end">
                {/* {isEditing && (
                  <>
                    <StyledPopconfirm
                      title="Do you want to delete?"
                      onConfirm={() => deleteEvent(prefillProject.projectId)}
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
                )} */}
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={isEditing ? updatingProject : addingProject}
                >
                  {isEditing ? "Update" : "Create"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, project }) => ({
  addingProject: project.addingProject,
  updatingProject: project.updatingProject,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  //   deletingEvent: event.deleteEvent,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProject,
      //   deleteEvent,
      updateProject,
      handleChooserModal,
      handleProjectModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
