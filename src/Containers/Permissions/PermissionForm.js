import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button} from "antd";
import { Formik, Form, FastField } from "formik";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
import //   addEvent,
//   deleteEvent,
//   updateEvent,
//   handleEventModal,
"./PermissionsAction";
import { FlexContainer } from "../../Components/UI/Layout";

/**
 * yup validation scheme for creating a opportunity
 */

class PermissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   reminder: true,
    };
  }
  handleCallback = () => {
    // const { handleChooserModal, handleEventModal, callback } = this.props;
    // handleChooserModal(false);
    // handleEventModal(false);
    // callback && callback();
  };
  handleReminderChange = (checked) => {
    this.setState({
      reminder: checked,
    });
  };
  componentDidMount() {
    // this.props.getEmployeelist();
    // this.props.getEvents();
  }

  render() {
    const {
      //   user: { userId, firstName, middleName, lastName, timeZone },
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
      eventType,
      updateEvent,
      updatingEvent,
      defaultOpportunities,
      creatorId,
      employeeId,
    } = this.props;
    // console.log(defaultAccounts);
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={
            {
              //   eventType:"",
              //   eventTypeId:"",
              //   eventSubject: "",
              //   eventVenue: "",
              //   remindAt: "",
              //   notificationEmail: false,
              //   eventDescription: "",
              //   timeZone: timeZone,
              //   startDate: startDate || dayjs(),
              //   startTime: startDate || null,
              //   endDate: endDate || null,
              //   endTime: endDate || null,
              //   note: "",
              //   eventStatus: "",
              //   allDayInd: true,
              //   candidateId:"",
              //   repeatStartDate: "",
              //   completionInd: "Incomplete",
              //   repeatEndDate: "",
              //   repeat_ind: false,
              //   address: [
              //     {
              //       addressType: "",
              //       address1: "",
              //       address2: "",
              //       town: "",
              //       street: "",
              //       city: "",
              //       postalCode: "",
              //       country: "",
              //       latitude: "",
              //       longitude: "",
              //     },
              //   ],
              //   employeesIds: [],
              //   ownerIds:[],
            }
          }
          //   validationSchema={EventSchema}
          onSubmit={(values, { resetForm }) => {
            addEvent(
              {
                ...values,
              },
              this.handleCallback
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
            <Form className="form-background">
              
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <FlexContainer style={{ justifyContent: "space-evenly"}}>
                      <div style={{ width: "16%" }}>
                        <FastField
                          isRequired
                          name="sales"
                          //label="Start "
                          label={
                            <FormattedMessage
                              id="app.sales"
                              defaultMessage="Sales"
                            />
                          }
                          isColumn
                          component={InputComponent}
                          // value={values.startDate}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            height: "2.0625em",
                            // marginTop: "0.25em",
                            width: "100%",
                          }}
                        />
                      </div>
                      <div style={{ width: "16%" }}>
                        <FastField
                          isRequired
                          name="customercare"
                          // label="Start Time"
                          label={
                            <FormattedMessage
                              id="app.CustomerCare"
                              defaultMessage="Customer Care"
                            />
                          }
                          isColumn
                          component={InputComponent}
                          // value={values.startTime}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            // marginTop: "0.25em",
                            width: "100%",
                          }}
                        />
                      </div>
                      <div style={{ width: "16%" }}>
                        <FastField
                          isRequired
                          name="management"
                          //label="Start "
                          label={
                            <FormattedMessage
                              id="app.management"
                              defaultMessage="Management"
                            />
                          }
                          isColumn
                          component={InputComponent}
                          // value={values.startDate}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            height: "2.0625em",
                            // marginTop: "0.25em",
                            width: "100%",
                          }}
                        />
                      </div>
                      <div style={{ width: "16%" }}>
                        <FastField
                          isRequired
                          name="production"
                          //label="Start "
                          label={
                            <FormattedMessage
                              id="app.production"
                              defaultMessage="Production"
                            />
                          }
                          isColumn
                          component={InputComponent}
                          // value={values.startDate}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            height: "2.0625em",
                            // marginTop: "0.25em",
                            width: "100%",
                          }}
                        />
                      </div>
                      <div style={{ width: "16%" }}>
                        <FastField
                          isRequired
                          name="recruiter"
                          //label="Start "
                          label={
                            <FormattedMessage
                              id="app.recruiter"
                              defaultMessage="Recruiter"
                            />
                          }
                          isColumn
                          component={InputComponent}
                          // value={values.startDate}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            height: "2.0625em",
                            // marginTop: "0.25em",
                            width: "100%",
                          }}
                        />
                      </div>
                    </FlexContainer>
                  </div>

                  <FlexContainer justifyContent="flex-end">
                    &nbsp;
                    <Button
                      type="primary"
                      htmlType="submit"
                      //   Loading={addingEvent}
                    >
                      <FormattedMessage
                        id="app.create"
                        defaultMessage="Create"
                      />
                    </Button>
                  </FlexContainer>
                </div>
           
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({
  //   addingEvent: event.addingEvent,
  //   updatingEvent: event.updatingEvent,
  //   user: auth.userDetails,
  //   deletingEvent: event.deleteEvent,
  //   employees: employee.employees,
  //   events:events.events,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //   addEvent,
      //   deleteEvent,
      //   updateEvent,
      //   handleChooserModal,
      //   handleEventModal,
      //   getEmployeelist,
      //   getEvents,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PermissionForm);
