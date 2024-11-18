import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { TimePicker } from "../../../Components/Forms/Formik/TimePicker";
import {addHour} from "../../Event/EventAction";
class HourForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: true,
    };
  }

  render() {

    const {
      addHour,
     
    } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            
                projectName: "",
                timeZone:""

              }
          }
   
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            let timeZoneFirst = values.timeZone;


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

            let firstStartTime = dayjs(values.startTime).format(
              "HH:mm:ss.SSS[Z]"
            ); 
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
              callCategory: this.state.category,
              callType: this.state.Type,

              startDate: `${newStartDate}T${newStartTime}`,
              endDate: `${newEndDate}T${newEndTime}`,

              startTime: 0,
              endTime: 0,
            };
          

        
             addHour(
               
                {
                  ...values,
                 
                  startDate: `${newStartDate}T${newStartTime}`,
                  endDate: `${newEndDate}T${newEndTime}`,
                  startTime: 0,
                  endTime: 0,
                },
                this.handleCallback
              )
             
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
            <Form className="form-background">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    height: "100%",
                    width: "47%",
                  }}
                >
          
          <div class="mt-3">
                  <Field
                    isRequired
                    name="projectName"
                    label={
                      <FormattedMessage
                        id="app.project"
                        defaultMessage="Project"
                      />
                    }
                    isColumn
                    width={"100%"}
                    component={InputComponent}
                    inlineLabel
                  />
                  </div>
               
                  <div class="flex justify-between mt-3">
                      <div style={{ width: "47%" }}>
                        <Field
                          isRequired
                          name="startDate"
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
                            width: "100%",
                          }}
                        />
                      </div>
                      <div style={{ width: "47%" }}>
                      <Field
                        isRequired
                        name="endDate"
                        //label="End Time"
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
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                    </div>
                </div>
                
              </div>
              <div class="flex justify-end mt-3">
                {/* {isEditing && ( */}
                  {/* <>
                    <StyledPopconfirm
                      title="Do you want to delete?"
                     // onConfirm={() => deleteEvent(prefillEvent.eventId)}
                    >
                      <Button
                        type="danger"
                        htmlType="submit"
                        //Loading={deletingEvent}
                      >
                        <FormattedMessage
                          id="app.delete"
                          defaultMessage="Delete"
                        />
                      </Button>
                    </StyledPopconfirm>
                  </> */}
                {/* )} */}
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={this.props.addingPlannerHour}
                >

                    <FormattedMessage
                      id="app.create"
                      defaultMessage="Create"
                    />
    
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ auth, event, employee, events, candidate }) => ({
//   addingEvent: event.addingEvent,
//   updatingEvent: event.updatingEvent,
addingPlannerHour:events.addingPlannerHour
//   user: auth.userDetails,
//   deletingEvent: event.deleteEvent,
//   employees: employee.employees,
//   events: events.events,
//   candidateId: candidate.clearbitCandidate.candidateId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addHour
    //   addEvent,
    //   deleteEvent,
    //   updateEvent,
    //   handleChooserModal,
    //   handleEventModal,
    //   getEmployeelist,
    //   getEvents,
    //   setClearbitCandidateData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HourForm);