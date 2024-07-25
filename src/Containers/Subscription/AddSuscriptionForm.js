import React, {useEffect, useState,Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch,Select } from "antd";
import dayjs from "dayjs";
import SearchSelect from "../../Components/Forms/Formik/SearchSelect";
import { Formik, Form, Field, } from "formik";
import {addSuscrptions} from "./SubscriptionAction";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { InputComponent } from "../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../Components/Forms/Formik/SelectComponent";
import AddressFieldArray from "../../Components/Forms/Formik/AddressFieldArray";
import { DatePicker } from "../../Components/Forms/Formik/DatePicker";
// const FormSchema = Yup.object().shape({
//   name: Yup.string().required("Input required!"),
//   management: Yup.string().required("Input required!"),
//   locationtypeId: Yup.string().required("Input required!"),
// });
const { Option } = Select;

class AddSuscriptionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
call: false,
      translatedMenuItems: []
    };
  
  }
  handleCall = (checked) => {
    this.setState({ call: checked });
  };
  handleInventory = (checked) => {
    this.setState({ inventory: checked });
  };
  handleMaterial = (checked) => {
    this.setState({ material: checked });
  };
  render() {
  

    const {
      startDate,
      endDate,
    } = this.props;
  
    return (
  
      <>
        <Formik
          initialValues={{
            subscriptionName:"",
            noOfAppointments:"",
            calls_ind: this.state.call?"true":"false",
            orgId:this.props.orgId,
            userId:this.props.userId
          }}
          // validationSchema={FormSchema}
          onSubmit={(values, { resetForm }) => {
            let timeZoneFirst = "GMT+05:30";
            let mytimeZone = timeZoneFirst.substring(4, 10);
            var a = mytimeZone.split(":");
            var timeZoneminutes = +a[0] * 60 + +a[1];
            if (!values.startDate) {
              values.startDate = values.startDate;
            }
            if (!values.endDate) {
              values.endDate = values.endDate;
            }
  
            let newStartDate = dayjs(values.startDate).format("YYYY-MM-DD");
            let newEndDate = dayjs(values.endDate).format("YYYY-MM-DD");
  
            let newStartTime = dayjs(values.startTime).format("HH:mm:ss.SSS[Z]");
            let firstStartHours = newStartTime.substring(0, 5);
            let timeEndPart = newStartTime.substring(5, 13);
            var firstStartTimeSplit = firstStartHours.split(":");
            var minutes = +firstStartTimeSplit[0] * 60 + +firstStartTimeSplit[1];
            var firstStartTimeminutes = minutes - timeZoneminutes;
            let h = Math.floor(firstStartTimeminutes / 60);
            let m = firstStartTimeminutes % 60;
            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            let finalStartTime = `${h}:${m}`;
            let newFormattedStartTime = `${finalStartTime}${timeEndPart}`;
  
            this.props.addSuscrptions(
              {
                ...values,
               
                calls_ind: this.state.call?"true":"false" ,
                  
                
              },
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
            <div class="overflow-y-auto h-[30rem] overflow-x-hidden">
            <Form class="form-background">
              <div class="flex justify-between max-sm:flex-col">
                <div class="h-full w-[45%] max-sm:w-wk">
                  <div>
                    <Field
                      name="subscriptionName"
                      // label="Name"
                      label="Subscription name "
                      type="text"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      isRequired
                    />
                  </div>
                  <div class=" flex justify-between w-wk mt-3 max-sm:w-[30%]">
                    <div>
                  <Field
                      name="noOfAppointments"
                      // label="Name"
                      label="Numbers Of Appointment"
                      type="text"
                      width={"100%"}
                      component={InputComponent}
                      isColumn
                      inlineLabel
                      isRequired
                    />
                    </div>
                   
                    </div>
                  
                  <div class="font-bold m-[0.1rem-0-0.02rem-0.2rem] text-xs flex flex-col mt-3">What qualifies as appointment</div>
                  <div class=" flex ">
                   
                    <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs">
                      {/* {this.state.translatedMenuItems[2]}   */}Calls
                         &nbsp;<i class="fas fa-warehouse text-base"></i></div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.call}
                          onChange={this.handleCall}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                  </div>
                 
                
     
                </div>
                
              </div>
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.addingSuscrptions}
                >
                 Create
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ subscription, auth,}) => ({
  addingSuscrptions: subscription.addingSuscrptions,
  timeZone: auth.timeZone,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  organizationId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     addSuscrptions,
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddSuscriptionForm);
