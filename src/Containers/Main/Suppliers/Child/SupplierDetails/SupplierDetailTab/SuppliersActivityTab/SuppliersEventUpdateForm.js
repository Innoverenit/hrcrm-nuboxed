import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Icon } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { Spacer } from "../../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../../../../Components/Forms/Formik/SelectComponent";
import { DatePicker } from "../../../../../../Components/Forms/Formik/DatePicker";
import { TimePicker } from "../../../../../../Components/Forms/Formik/TimePicker";
import { handleEventModal } from "../../../../../Event/EventAction";
import { updateSuppliersEvent } from "../../../SuppliersAction";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { TextareaComponent } from "../../../../../../Components/Forms/Formik/TextareaComponent";
import { StyledPopconfirm } from "../../../../../../Components/UI/Antd";
/**
 * yup validation scheme for creating a opportunity
 */
// const EventSchema = Yup.object().shape({
//   eventType: Yup.string().required("Please select event type"),
// eventSubject: Yup.string().required("This field is required !"),
// endDate: Yup.string()
//   .nullable()
//   .required("Input required !"),
// startTime: Yup.string()
//   .nullable()
//   .required("Input required !"),
// endTime: Yup.string()
//   .nullable()
//   .required("Input required !"),
// startDate: Yup.string()
//   .nullable()
//   .required("Input required !"),
// association: Yup.object()
//   .shape(
//     {
//       contactIds: Yup.string().when("accountIds", {
//         is: (accountIds) => !accountIds,
//         then: Yup.string().required("Contact or Company required"),
//       }),
//       accountIds: Yup.string().when("contactIds", {
//         is: (contactIds) => !contactIds,
//         then: Yup.string().required("Company or Contact required"),
//       }),
//     },
//     ["contactIds", "accountIds"]
//   )
//   .required(""),
// });

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
            startDate: moment(this.props.setEditingEvents.startDate),
            startTime: null,
            endDate: moment(this.props.setEditingEvents.endDate),
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
            let newStartDate = moment(values.startDate).format("YYYY-MM-DD");
            console.log(newStartDate);
            //Time calculation
            let firstStartTime = moment(values.startTime).format(
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

            let newEndDate = moment(values.endDate).format("YYYY-MM-DD");
            let firstEndTime = moment(values.endTime).format("HH:mm:ss.SSS[Z]"); // getting start time from form input
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
                  <Spacer />
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
                  <Spacer />

                  <FlexContainer justifyContent="space-between">
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
                  </FlexContainer>
                  <Spacer style={{ marginBottom: "15px" }} />
                  <FlexContainer justifyContent="space-between">
                    <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="endDate"
                        label="End "
                        component={DatePicker}
                        isColumn
                        value={values.endDate || values.startDate}
                        defaultValue={moment("2015-01-01")}
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
                  </FlexContainer>

                  {/* <FieldArray
                    name="address"
                    render={(arrayHelpers) => (
                      <AddressFieldArray
                        singleAddress
                        arrayHelpers={arrayHelpers}
                        values={values}
                      />
                    )}
                  /> */}
                  <Spacer />
                  {startDate ? (
                    <span>
                      {moment(startDate).isBefore(moment()) && (
                        <span style={{ marginLeft: 10 }}>
                          <b>This Event occurs in the past !</b>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      {moment(values.startDate).isBefore(moment()) && (
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
                  {/* {this.props.partnerLogin === "Yes" &&
                  this.props.department === "Partner" ? (
                    <Field
                      type="text"
                      name="association.ownerIds"
                      label="Assigned to"
                      isColumn
                      width={"100%"}
                      disabled
                      value={this.props.creatorName}
                      component={InputComponent}
                      inlineLabel
                      style={{
                        flexBasis: "80%",
                        height: "29px",
                        marginTop: "0px",
                      }}
                    />
                  ) : (
                    <Field
                      name="association.ownerIds"
                      selectType="user"
                      label="Assigned to"
                      component={SearchSelect}
                      isColumn
                      margintop={"4px"}
                      value={values.association.ownerIds}
                      defaultValue={{
                        label: `${firstName || ""} ${middleName ||
                          ""} ${lastName || ""}`,
                        value: userId,
                      }}
                      inlineLabel
                      style={{ flexBasis: "80%" }}
                    />
                  )} */}

                  {/* <Spacer style={{ marginBottom: "45px" }} /> */}
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
                  <Spacer />
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
              <Spacer />
              <FlexContainer justifyContent="flex-end">
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
              </FlexContainer>
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
