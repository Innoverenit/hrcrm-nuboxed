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
// import React, { useState } from 'react';
// import { Card, Button, Input, Switch, Form } from 'antd';
// // import 'antd/dist/antd.css';

// const SubscriptionManager = () => {
//   const [subscriptions, setSubscriptions] = useState([]);

//   const addSubscription = () => {
//     setSubscriptions([...subscriptions, { id: Date.now(), calls: false }]);
//   };

//   const removeSubscription = (id) => {
//     setSubscriptions(subscriptions.filter(sub => sub.id !== id));
//   };

//   const handleCallsChange = (id, checked) => {
//     setSubscriptions(subscriptions.map(sub => sub.id === id ? { ...sub, calls: checked } : sub));
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Button type="primary" onClick={addSubscription}>Add Subscription</Button>
//       <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
//         {subscriptions.map(sub => (
//           <Card
//             key={sub.id}
//             style={{ width: 300, margin: '10px' }}
//             actions={[
//               <Button type="primary" htmlType="submit">Submit</Button>,
//               <Button type="danger" onClick={() => removeSubscription(sub.id)}>Remove</Button>
//             ]}
//           >
//             <Form layout="vertical">
//               <Form.Item label="Name">
//                 <Input placeholder="Enter name" />
//               </Form.Item>
//               <Form.Item label="Per month value">
//                 <Input placeholder="Enter per month value" />
//               </Form.Item>
//               <Form.Item label="Calls">
//                 <Switch checked={sub.calls} onChange={(checked) => handleCallsChange(sub.id, checked)} />
//                 {sub.calls && <Input style={{ marginTop: '10px' }} placeholder="Enter calls value" />}
//               </Form.Item>
//               <Form.Item label="Publish">
//                 <Switch />
//               </Form.Item>
//             </Form>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubscriptionManager;

// import React, { useState,useEffect } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {addSuscrptions,getSubscrptions} from "./SubscriptionAction"
// import { Card, Button, Input, Switch, Form } from 'antd';





// const SubscriptionManager = (props) => {
//   const [subscriptions, setSubscriptions] = useState([]);
  
//   useEffect(() => {
    
   
//     props.getSubscrptions(props.orgId);
 
// }, [props.orgId]);
// console.log(props.subscriptionsFormData)
// useEffect(() => {
//   // Check if data is available
//   if (props.subscriptionsFormData.length > 0) {
    
//     setSubscriptions(props.subscriptionsFormData);
//   }
// }, [props.subscriptionsFormData]);

//   const addSubscription = () => {
//     setSubscriptions([
//       ...subscriptions,
//       { callInd: false, noOfcalls: '', perMonthValue: '', subscriptionId: null, subscriptionName: '', publishInd: false }
//     ]);
//   };

//   const removeSubscription = (id) => {
//     setSubscriptions(subscriptions.filter(sub => sub.subscriptionId !== id));
//   };

//   const handleInputChange = (index, field, value) => {
//     const newSubscriptions = [...subscriptions];
//     newSubscriptions[index][field] = value;
//     setSubscriptions(newSubscriptions);
//   };

//   const handleSwitchChange = (index, field, checked) => {
//     const newSubscriptions = [...subscriptions];
//     newSubscriptions[index][field] = checked;
//     setSubscriptions(newSubscriptions);

//     const updatedSubscription = newSubscriptions[index];
//     let data = {
//       callInd: updatedSubscription.callInd,
//       description: "",
//       liveInd: true,
//       noOfcalls: updatedSubscription.noOfcalls || 0,
//       orgId: props.orgId,
//       perMonthValue: updatedSubscription.perMonthValue || 0,
//       subscriptionId: updatedSubscription.subscriptionId || null,
//       subscriptionName: updatedSubscription.subscriptionName,
//       userId: props.userId,
//       publishInd: updatedSubscription.publishInd
//     };
//     props.addSuscrptions(data);
//   };


//   // const handleSwitchChange = (index, field, checked) => {
    
//   //   const newSubscriptions = [...subscriptions];
//   //   newSubscriptions[index][field] = checked;
//   //   setSubscriptions(newSubscriptions);
//   // };

//   const handlePressEnter = (index) => {
//     const updatedSubscription = subscriptions[index];
//     console.log({
//       callInd: updatedSubscription.callInd,
//       createdBy: "string",
//       creationDate: "2024-08-05T07:22:47.795Z",
//       description: "string",
//       liveInd: true,
//       noOfcalls: updatedSubscription.noOfcalls || 0,
//       orgId: "string",
//       perMonthValue: updatedSubscription.perMonthValue || 0,
//       subscriptionId: updatedSubscription.subscriptionId || null,
//       subscriptionName: updatedSubscription.subscriptionName,
//       updatedBy: "string",
//       updationDate: "2024-08-05T07:22:47.796Z",
//       userId: "string",
//       publishInd: updatedSubscription.publishInd
//     });
//     let data={
//       callInd: updatedSubscription.callInd,
//       // createdBy: "string",
//       // creationDate: "2024-08-05T07:22:47.795Z",
//       description: "",
//       liveInd: true,
//       noOfcalls: updatedSubscription.noOfcalls || 0,
//       orgId: props.orgId,
//       perMonthValue: updatedSubscription.perMonthValue || 0,
//       subscriptionId: updatedSubscription.subscriptionId || null,
//       subscriptionName: updatedSubscription.subscriptionName,
//       // updatedBy: "string",
//       // updationDate: "2024-08-05T07:22:47.796Z",
//       userId: props.userId,
//       publishInd: updatedSubscription.publishInd
//     }
//     props.addSuscrptions(data)
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Button type="primary" onClick={addSubscription}>Add Subscription</Button>
//       <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
//         {subscriptions.map((sub, index) => (
//           <Card
//             key={index}
//             style={{ width: 300, margin: '10px' }}
//             actions={[
//               // <Button type="primary" htmlType="submit">Submit</Button>,
//               <Button type="danger" onClick={() => removeSubscription(sub.subscriptionId)}>Remove</Button>
//             ]}
//           >
//             <Form layout="vertical">
//               <Form.Item
//                 label="Name"
//                 required
//                 rules={[{ required: true, message: 'Please enter the name' }]}
//               >
//                 <Input
//                   value={sub.subscriptionName}
//                   onChange={(e) => handleInputChange(index, 'subscriptionName', e.target.value)}
//                   placeholder="Enter name"
//                   onPressEnter={() => handlePressEnter(index)}
//                 />
//               </Form.Item>
//               <Form.Item
//                 label="Per month value"
//                 required
//                 rules={[{ required: true, message: 'Please enter the per month value' }]}
//               >
//                 <Input
//                   value={sub.perMonthValue}
//                   onChange={(e) => handleInputChange(index, 'perMonthValue', e.target.value)}
//                   placeholder="Enter per month value"
//                   onPressEnter={() => handlePressEnter(index)}
//                 />
//               </Form.Item>
//               <Form.Item label="Calls">
//                 <Switch
//                   checked={sub.callInd}
//                     checkedChildren="Yes"
//                         unCheckedChildren="No"
//                   onChange={(checked) => handleSwitchChange(index, 'callInd', checked)}
//                 />
//                 {sub.callInd && (
//                   <Input
//                     value={sub.noOfcalls}
//                     onChange={(e) => handleInputChange(index, 'noOfcalls', e.target.value)}
//                     style={{ marginTop: '10px' }}
//                     placeholder="Enter calls value"
//                     onPressEnter={() => handlePressEnter(index)}
//                   />
//                 )}
//               </Form.Item>
//               <Form.Item label="Publish">
//                 <Switch
//                   checked={sub.publishInd}
//                     checkedChildren="Yes"
//                         unCheckedChildren="No"
//                   onChange={(checked) => handleSwitchChange(index, 'publishInd', checked)}
//                 />
//               </Form.Item>
//             </Form>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };
// const mapStateToProps = ({ auth,subscription, partner }) => ({
//   orgId:auth.userDetails.organizationId,
//   userId:auth.userDetails.userId,
//   subscriptionsFormData: subscription.subscriptionsFormData,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addSuscrptions,
//       getSubscrptions
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionManager);







