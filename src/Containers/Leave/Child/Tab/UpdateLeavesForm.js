import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button,Switch } from "antd";
import { Formik, Form, Field, } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { TextareaComponent } from "../../../../Components/Forms/Formik/TextareaComponent";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import { handleChooserModal } from "../../../Planner/PlannerAction";
import { updateLeaves } from "../../LeavesAction";

/**
 * yup validation scheme for creating a opportunity
 */
const EventSchema = Yup.object().shape({
  eventType: Yup.string().required("Select event type"),
  eventSubject: Yup.string().required("This field is required !"),
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
  startDate: Yup.string()
    .nullable()
    .required("Input required !"),
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
  // .required(""),
});

class UpdateLeaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Account: false,
      Holiday: false,
      Travel: false,
      Project: false,
      firstCase:false,
      isAccepted:true
    };
  }
  handleSwitchChange = (value) => {
    this.setState({ firstCase: value });

    
    if (value) {
      console.log('1'); 
    } else {
      console.log('0');
    }
  };
  handleProject = (checked) => {
    this.setState({ Project: checked });
  };
  handleAccount = (checked) => {
    this.setState({ Account: checked });
  };
  handleHoliday = (checked) => {
    this.setState({ Holiday: checked });
  };
  radioClick = (checked) => {
    this.setState({ isAccepted: checked });
  };
  firstClick= (checked)=>{
    this.setState({firstCase:checked});
  }
  handleTravel = (checked) => {
    this.setState({ Travel: checked });
  };
  handleCallback = () => {
    const { handleChooserModal, handleEventModal, callback } = this.props;
    handleChooserModal(false);
    handleEventModal(false);
    callback && callback();
  };
  render() {
    const { prefillLeave, startDate, endDate, isEditing, addingLeaves, updatingLeave } = this.props;

    return (
      <>
        <Formik
          // enableReinitialize
          initialValues={
            // isEditing  ? prefillLeave: 
            {
              startDate: dayjs(this.props.setEditingLeave.startDate),

              endDate: dayjs(this.props.setEditingLeave.endDate),

              employeeId: this.props.userId,

              reason: this.props.setEditingLeave.reason || "",
              coverDetails: this.props.setEditingLeave.coverDetails || "",
              leaveId: this.props.leaveId,
            }
          }
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.updateLeaves(
              {
                ...values,
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
                leaveId: this.props.leaveId,
                case:this.state.firstCase?"0":"1",
              },
              this.props.leaveId,
              this.props.userId,

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
            <Form className="form-background">
              <div class=" flex justify-between" >
                <div class=" h-full w-full"
                >                  
                                                {/* Project                  
                                                Travel                 
                                                Holiday                
                                                Account */}
                                     
                  <div class=" flex justify-between w-full mt-3"           
                  >
                    <div >
                      <Field
                        isRequired
                        name="startDate"

                        // label="Start Date"
                        label={<FormattedMessage
                          id="app.startDate"
                          defaultMessage="Start Date"
                        />}
                        component={DatePicker}
                        // width="100%"
                        value={values.startDate}
                        isColumn
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          // marginTop: "0.25em",
                          width: "100%",
                        }}
                      />               
                    </div>
                    {this.state.isAccepted?(
                  <div class=" w-[47%]" >
                      <Field
                        isRequired
                        name="endDate"
                        // label="End Date "

                        label={<FormattedMessage
                          id="app.endDate"
                          defaultMessage="End Date"
                        />}
                        isColumn
                        component={DatePicker}
                        value={values.endDate || values.startDate}
                        inlineLabel
                        style={{
                          flexBasis: "80%",
                          height: "2.0625em",
                          // marginTop: "0.25em",
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
                     ):(
                      <div class=" flex items-center h-16 flex-row-reverse w-[25%] font-bold"                      
                      >                      
                        <Switch
                           onChange={this.handleSwitchChange}
                          checked={this.state.firstCase}
                          checkedChildren="1st hlf"
                          unCheckedChildren="2nd hlf"
                        />
                        
                      </div>
                    )}
                  </div>
                
  <div class="w-3/12 max-sm:w-wk mt-3 font-bold"
                    
                    >
                      <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col"> Half Day</div>
                      <Switch
                         onChange={this.radioClick}
                        checked={this.state.isAccepted}
                        checkedChildren="No"
                        unCheckedChildren="Yes"
                      />
                      
                    </div>
                   
                    <div class=" w-1/2 mt-3 max-sm:w-wk">
              <Field
                name="coverDetails"
                //label="Cover"
                label={<FormattedMessage
                  id="app.coverDetails"
                  defaultMessage="Cover"
                />}
                width={"100%"}
                component={InputComponent}
                isColumn
              />
            </div>
                 <div class=" mt-3">
                  <Field
                    isRequired
                    name="reason"
                    //  / label="Reason"
                    label={<FormattedMessage
                      id="app.reason"
                      defaultMessage="Reason"
                    />}
                    width={"100%"}
                    component={TextareaComponent}
                    inlineLabel
                    style={{
                      flexBasis: "80%",
                      height: "2.0625em",
                      // marginTop: "0.25em",
                    }}
                  />
</div>
                
                </div>
              </div>
         
              <div class=" flex justify-end mt-3" >
                
                <Button htmlType="submit" type="primary"
                  Loading={updatingLeave}>
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ auth, leave }) => ({
  addingLeaves: leave.addingLeaves,
  // updatingEvent: event.updatingEvent,
  userId: auth.userDetails.userId,
  // deletingEvent: event.deleteEvent,
  setEditingLeave: leave.setEditingLeave,
  updatingLeave: leave.updatingLeaveError,
  updatingLeaveError: leave.updatingLeaveError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateLeaves,
      // deleteEvent,
      // updateEvent,
      handleChooserModal,
      // handleEventModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLeaveForm);
