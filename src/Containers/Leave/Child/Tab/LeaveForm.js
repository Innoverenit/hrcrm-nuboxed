import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Button,Switch } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { DatePicker } from "../../../../Components/Forms/Formik/DatePicker";
import { handleChooserModal } from "../../../Planner/PlannerAction";
import { addLeaves } from "../../LeavesAction";


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

class LeaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Account: false,
      Holiday: false,
      Travel: false,
      Project: false,   
      day:"",
      firstCase:false,
      isAccepted:false
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
  handleTravel = (checked) => {
    this.setState({ Travel: checked });
  };
  radioClick = (checked) => {
    this.setState({ isAccepted: checked });
  };
  firstClick= (checked)=>{
    this.setState({firstCase:checked});
  }
  handleCallback = () => {
    const { handleChooserModal, handleEventModal, callback } = this.props;
    handleChooserModal(false);
    handleEventModal(false);
    callback && callback();
  };
  
  render() {
    const { prefillLeave, startDate, endDate, isEditing, addingLeaves } = this.props;
console.log(this.state.firstCase)
// const [text, setText] = useState("");
//   function handletext(e) {
//     setText(e.target.value);
//   }
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }
    return (
      <>
        <Formik 
          // enableReinitialize
          initialValues={
            isEditing
              ? prefillLeave
              : {
                startDate: startDate || dayjs(),

                endDate: endDate || dayjs(),
                
                employeeId: this.props.userId,
                halfDayType: this.state.firstCase ? "true" : "false",
                halfDayInd: this.state.isAccepted ? "true" : "false",
                reason: "",
                coverDetails: "",
              }
          }
          // validationSchema={documentSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);

            this.props.addLeaves(
              {
                ...values,
                halfDayType: this.state.firstCase ? "true" : "false",
                halfDayInd: this.state.isAccepted ? "true" : "false",
                startDate: dayjs(values.startDate).toISOString(),
                endDate: dayjs(values.endDate).toISOString(),
                // halfDayType:this.state.firstCase?"0":"1",
              },
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
            <div class="flex justify-between  pr-2 max-sm:flex-col">
              <div class=" h-full w-w47.5.5 max-sm:w-wk"   >
              
              
               {/* <Radio.Group name="radiogroup">
                              <Radio
                                  value={this.state.Project}
                                  checked={this.state.Project}
                                  onChange={this.handleProject}
                              >
                                  Project
          </Radio>
                              <Radio
                                  value={this.state.Travel}
                                  checked={this.state.Travel}
                                  onChange={this.handleTravel}
                              >
                                  Travel
          </Radio>
                              <Radio
                                  value={this.state.Holiday}
                                  checked={this.state.Holiday}
                                  onChange={this.handleHoliday}
                              >
                                  Holiday
          </Radio>
                              <Radio
                                  value={this.state.Account}
                                  checked={this.state.Account}
                                  onChange={this.handleAccount}
                              >
                                  Account
          </Radio>
                          </Radio.Group> */}

    
    <div class="mt-3 flex flex-col justify-between w-[100%]">
      <div class="w-[47%]">
        <Field
          isRequired
          name="startDate"

          label="Start Date"
          component={DatePicker}
          // width="100%"
          value={values.startDate}
          isColumn
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
       label="End Date "
       isColumn
       component={DatePicker}
       value={values.endDate || values.startDate}
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
      <div>
     
    </div>
    <div class="flex flex-row mt-2">
    <div class=" w-3/12 max-sm:w-wk ml-4"
        style={{
         
          fontWeight: "bold",
        }}
      >
        <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col"> Half Day</div>
        <Switch
           onChange={this.radioClick}
          checked={this.state.isAccepted}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
        
      </div>
    {this.state.isAccepted?(
  <div class=" flex items-center h-16 flex-row-reverse mr-4  max-sm:w-wk"
  style={{
   
    fontWeight: "bold",
  }}
>
  
  <Switch
     onChange={this.handleSwitchChange}
    checked={this.state.firstCase}
    checkedChildren="1st hlf"
    unCheckedChildren="2nd hlf"
  />
  
</div>
   
  
   
    ): null}
  
  </div>
  </div>  


              
 


               
              </div>
              <div class=" h-3/4 w-w47.5.5 max-sm:w-wk "
              >

<div class="mt-3 w-w47.5.5 max-sm:w-wk">
    <Field
      name="coverDetails"
      label="Cover"
      width={"100%"}
      component={InputComponent}
      isColumn
    />
  </div>
  <div class="mt-3">

 
  <div>Reason</div>
                    <div>
                  {/* <div>
                    <span onClick={SpeechRecognition.startListening}>
                      <Tooltip title="Start">
                        <span  >
                          <RadioButtonCheckedIcon className="!text-icon ml-1 text-red-600"/>
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={SpeechRecognition.stopListening}>
                      <Tooltip title="Stop">
                        <span>
                          <StopCircleIcon className="!text-icon ml-1 text-green-600" />
                        </span>
                      </Tooltip>
                    </span>

                    <span onClick={resetTranscript}>
                      <Tooltip title="Clear">
                        <span  >
                          <RotateRightIcon className="!text-icon ml-1"/>
                        </span>
                      </Tooltip>
                    </span>
                  </div> */}
                  <div>
                    <textarea
                      name="description"
                      className="textarea"
                      type="text"
                      // value={transcript ? transcript : text}
                      // onChange={handletext}
                    ></textarea>
                  </div>
                </div>
</div>

              
             

              </div>
            </div>

            <div class="flex justify-end mt-3 w-wk bottom-2 mr-2 md:absolute ">
            <Button htmlType="submit" type="primary"
    Loading={addingLeaves}>
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addLeaves,
      // deleteEvent,
      // updateEvent,
      handleChooserModal,
      // handleEventModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeaveForm);
