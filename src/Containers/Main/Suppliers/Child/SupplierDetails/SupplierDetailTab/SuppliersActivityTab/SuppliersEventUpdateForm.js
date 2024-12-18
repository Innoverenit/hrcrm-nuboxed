import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../../../../Components/Forms/Formik/TimePicker";
import { handleEventModal } from "../../../../../Event/EventAction";
import { updateSuppliersEvent } from "../../../SuppliersAction";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../../../../Components/UI/Antd";


const EventSchema = Yup.object().shape({
  topic: Yup.string().required("Input needed!"),
  startTime: Yup.string()
    .nullable()
    .required("Input needed!"),
  endTime: Yup.string()
    .nullable()
    .required("Input needed!"),
});
class SuppliersEventUpdateForm extends Component {
  handleCallback = () => {
    const { callback } = this.props;

    callback && callback();
  };
  render() {
    // const timeZone = "GMT+05:30";

    const {
      user: { userId, firstName, middleName, lastName },
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
      updateEvent,
      updatingEvent,
      defaultOpportunities,
      creatorId,
    } = this.props;

    console.log(defaultAccounts);
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            type: this.props.setEditingEvents.type || "",
            topic: this.props.setEditingEvents.topic || "",
            startDate: dayjs(this.props.setEditingEvents.startDate),
            startTime: null,
            endDate: dayjs(this.props.setEditingEvents.endDate),
            endTime: null,
            notes: this.props.setEditingEvents.notes || "",
            location: this.props.setEditingEvents.location || "",
            userId: this.props.userId,
          }}
          validationSchema={EventSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values);
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

            this.props.updateDistributorEvent(
              {
                ...values,
                startDate: `${newStartDate}T${newStartTime}`,
                endDate: `${newEndDate}T${newEndTime}`,

                startTime: 0,
                endTime: 0,
              },
              this.props.setEditingEvents.eventId,
              () => this.handleCallback(resetForm)
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
            <Form>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "45%",
                  }}
                >
                  <Field
                    isRequired
                    name="type"
                    label="Type"
                    placeholder={"Select"}
                    component={SelectComponent}
                    isColumn
                    options={["Meeting", "Conference", "Webinar", "Workshop"]}
                    inlineLabel
                    style={{ flexBasis: "80%", marginTop: "4px" }}
                    // defaultValue='low'
                  />
                  <mt-3 />
                  <Field
                    isRequired
                    name="topic"
                    label="Topic"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "29px",
                      marginTop: "0px",
                    }}
                  />
                  <mt-3 />

                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="startDate"
                        label="Start "
                        isColumn
                        component={DatePicker}
                        value={values.startDate}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "29px",
                          marginTop: "0px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div style={{ width: "47%" }}>
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
                          flexBasis: "80%",
                          marginTop: "0px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <mt-3 style={{ marginBottom: "15px" }} />
                  <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                    <div style={{ width: "47%" }}>
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
                          flexBasis: "80%",
                          height: "29px",
                          marginTop: "0px",
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
                    <div style={{ width: "47%" }}>
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
                          flexBasis: "80%",
                          marginTop: "0px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>               
                  <mt-3 />
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
                 

                  {/* <mt-3 style={{ marginBottom: "45px" }} /> */}
                  <Field
                    name="notes"
                    label="Notes"
                    isColumn
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "80px",
                      marginTop: "0px",
                    }}
                  />
                  <mt-3 />
                  <Field
                    name="location"
                    label="Location"
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "29px",
                      marginTop: "0px",
                    }}
                  />
                </div>
              </div>
              <mt-3 />
              <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                {isEditing && (
                  <>
                    <StyledPopconfirm
                      title="Do you want to delete?"
                      onConfirm={() => deleteEvent(prefillEvent.eventId)}
                    >
                      <Button
                        type="danger"
                        htmlType="submit"
                        loading={deletingEvent}
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
                  loading={this.props.updatingSuppliersEvent}
                >
                  Update
                  {/* {isEditing ? "Update" : "Create"} */}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, event, distributor, suppliers }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  setEditingEvents: event.setEditingEvents,
  updatingSuppliersEvent: suppliers.updatingSuppliersEvent,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateSuppliersEvent,

      handleEventModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuppliersEventUpdateForm);
