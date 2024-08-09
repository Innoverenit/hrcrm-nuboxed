import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button} from "antd";
import { Formik, Form, FastField } from "formik";
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
import 
"./PermissionsAction";

class PermissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   reminder: true,
    };
  }
  handleCallback = () => {
 
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
                  <div class=" flex flex-row flex-wrap items-start self-start justify-evenly grow shrink h-auto mr-auto ">
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
                    </div>
                  </div>
                  <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
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
                  </div>
                </div>
           
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({}) => ({
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PermissionForm);
