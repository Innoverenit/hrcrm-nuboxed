// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button, Switch } from "antd";
// import { FormattedMessage } from "react-intl";
// import { Formik, Form, FastField } from "formik";
// import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
// import {addNotificationConfig,getNotificationConfig} from "../../../../SettingsAction";


// class NotificationToggleForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         admini:  this.props.notificationConfig.admin,
//         reportingMan:this.props.notificationConfig.reportingManager,
//         reportingMan1:this.props.notificationConfig.reportingManager1,
//     };
//   }
//   handleAdmini = () => {
//     this.setState((prevState) => ({
//       admini: !prevState.admini,
//     }));
//   };
//   handleReportingMan = () => {
//     this.setState((prevState) => ({
//         reportingMan: !prevState.reportingMan,
//     }));
//   };

//   handleReportingMan1 = () => {
//     this.setState((prevState) => ({
//       reportingMan1: !prevState.reportingMan1,
//     }));
//   };
  
//   componentDidMount() {
//     this.props.getNotificationConfig("candidate","create");
//   }

//   render() {

    

//     return (
//       <>
//         <Formik
//           initialValues={{
            
//             admin: this.state.admini ? "true" : "false",
//             reportingManager: this.state.reportingMan  ? "true" :"false",
//             reportingManager1: this.state.reportingMan1 ? "true" : "false",
//             type: "Create",
//             name: "Candidate",

//           }}
//           // validationSchema={FormSchema}
//           onSubmit={(values, { resetForm }) => {
//             //debugger;
//             console.log(values);
//             this.props.addNotificationConfig(
//               {
//                 ...values,
//                 admin: this.state.admini ? "true" : "false",
//                 reportingManager: this.state.reportingMan  ? "true" :"false",
//                 reportingManager1: this.state.reportingMan1 ? "true" : "false",
//               },
//             );
//           }}
//         >
//           {({
//             errors,
//             touched,
//             isSubmitting,
//             setFieldValue,
//             setFieldTouched,
//             values,
//             ...rest
//           }) => (
//             <div class="overflow-y-auto h-[30rem] overflow-x-hidden">
//             <Form class="form-background">
//               <div class="flex justify-between max-sm:flex-col">
//                 <div class="h-full w-[45%] max-sm:w-wk">
                
                
//                   <div class=" flex ">
//                     <div class=" w-[47%] mt-2"  >
//                       <div class="font-bold text-xs">Admin &nbsp;</div>
//                       <div>
//                         <Switch
//                           style={{ width: "6.25em" }}
//                           checked={this.props.notificationConfig.admin || this.state.admini}
//                           onChange={this.handleAdmini}
//                           checkedChildren="Yes"
//                           unCheckedChildren="No"
//                         />
//                       </div>
//                     </div>
//                     <div class=" w-[47%] mt-2" >
//                       <div class="font-bold text-xs">RM &nbsp;</div>
//                       <div>
//                         <Switch
//                           style={{ width: "6.25em" }}
//                           checked={this.props.notificationConfig.reportingManager || this.state.reportingMan}
//                           onChange={this.handleReportingMan}
//                           checkedChildren="Yes"
//                           unCheckedChildren="No"
//                         />
//                       </div>
//                       <div>
//                       <FastField
//                         name="name"
//                         label={
//                           <FormattedMessage
//                             id="app.name"
//                             defaultMessage="Name"
//                           />}
//                         isColumn
//                         width={"100%"}
//                         component={InputComponent}
//                         inlineLabel
//                         isRequired
//                       />
//                       </div>
//                     </div>
//                   </div>
//                   <div class=" flex">
//                   <div class=" w-[47%] mt-2" >
//                       <div class="font-bold text-xs">RM2 &nbsp;</div>
//                       <div>
//                         <Switch
//                           style={{ width: "6.25em" }}
//                           checked={this.props.notificationConfig.reportingManager1 || this.state.reportingMan1}
//                           onChange={this.handleReportingMan1}
//                           checkedChildren="Yes"
//                           unCheckedChildren="No"
//                         />
//                       </div>
//                     </div>
                   
//                   </div>
                 
//                 </div>
//               </div>
//               <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   loading={this.props.addingNotificationConfig}
//                 >
//                  Update
//                 </Button>
//               </div>
//             </Form>
//             </div>
//           )}
//         </Formik>
//       </>
//     );
//   }
// }
// const mapStateToProps = ({ settings, auth, }) => ({
//   addingNotificationConfig:settings.addingNotificationConfig,
//   userId:auth.userDetails.userId,
//   orgId:auth.userDetails.organizationId,
//   notificationConfig:settings.notificationConfig

// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addNotificationConfig,
//       getNotificationConfig
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(NotificationToggleForm);


import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch,Checkbox, Divider } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import {addNotificationConfig,getNotificationConfig} from "../../../../SettingsAction";
import { TabsWrapper } from "../../../../../../Components/UI/Layout";

const CheckboxGroup = Checkbox.Group;

function NotificationToggleForm (props) {
  
  useEffect(()=>{
    props.getNotificationConfig();
  },[]);

  // const userOptions = ['Access', 'Create', 'Update', 'Delete','Access Plus'];
  const userOptions = [
    { label: 'Create', value: 'create' },
    { label: 'Update', value: 'update' },
    // { label: 'Read', value: 'read' },
    { label: 'Delete', value: 'delete' },
  ];

  const [checkedList, setCheckedList] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
const [admini,setAdmini]=useState(props.notificationConfig.admin);
const [reportingMan,setreportingMan]=useState(props.notificationConfig.reportingManager);
const [reportingMan1,setreportingMan1]=useState(props.notificationConfig.reportingManager1);
const [adminSwitch, setAdminSwitch] = useState(false);
const [reportingManagerSwitch, setReportingManagerSwitch] = useState(false);
const [reportingManagerPlus1Switch, setReportingManagerPlus1Switch] = useState(false);

  const [checkedUserList, setCheckedUserList] = useState();
  const [indeterminateUser, setIndeterminateUser] = useState(true);
  const [checkAllUser, setCheckAllUser] = useState(false);

  const onUserChange = (list) => {
    setCheckedUserList(list);
    setIndeterminateUser(!!list.length && list.length < userOptions.length);
    setCheckAllUser(list.length === userOptions.length);
  };

  const onCheckAllUserChange = (e) => {
    setCheckedUserList(e.target.checked ? userOptions : []);
    setIndeterminateUser(false);
    setCheckAllUser(e.target.checked);
  };

  const handleAdmini = () => {
    setAdmini((prevState) => ({
          admini: !prevState.admini,
        }));
      };
    const handleReportingMan = () => {
      setreportingMan((prevState) => ({
                reportingMan: !prevState.reportingMan,
            }));
          };
        
        const handleReportingMan1 = () => {
          setreportingMan1((prevState) => ({
              reportingMan1: !prevState.reportingMan1,
            }));
          };  
          
          

          const handleChange = (checkedValues) => {
            setCheckedList(checkedValues);
            setCheckAll(checkedValues.length === userOptions.length);
          };
        
          const handleCheckAllChange = (e) => {
            const checked = e.target.checked;
            setCheckedList(checked ? userOptions.map((option) => option.value) : []);
            setCheckAll(checked);
          };

          const handleAdminSwitchChange = (checked) => {
            setAdminSwitch(checked);
          };
        
          const handleReportingManagerSwitchChange = (checked) => {
            setReportingManagerSwitch(checked);
          };
        
          const handleReportingManagerPlus1SwitchChange = (checked) => {
            setReportingManagerPlus1Switch(checked);
          };
    return (
      <>
      {/* <TabsWrapper>
<div >
<div class=" text-clr flex justify-center mt-10 text-base font-bold"></div>

              <div class=" flex justify-around mt-4" >
            
              <div >
                <div class="text-sm font-semibold">Users</div>
                <Checkbox indeterminate={indeterminateUser} onChange={onCheckAllUserChange} checked={checkAllUser}>
                 <div class="text-xs"> Check all</div>
                </Checkbox>
                <Divider />
                <CheckboxGroup options={userOptions} value={checkedUserList} onChange={onUserChange} />

              </div>
              </div>
              </div>
              </TabsWrapper> */}

                <Formik
          initialValues={{
            
            admin: admini ? "true" : "false",
            reportingManager: reportingMan  ? "true" :"false",
            reportingManager1: reportingMan1 ? "true" : "false",
            type: "Create",
            // name: "",

          }}
          // validationSchema={FormSchema}
          onSubmit={(values, { resetForm }) => {
            //debugger;
            console.log(values);
            props.addNotificationConfig(
              {
                ...values,
                admin: adminSwitch ? "true" : "false",
                reportingManager: reportingManagerSwitch  ? "true" :"false",
                reportingManager1: reportingManagerPlus1Switch ? "true" : "false",
                type:checkedList,
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
           
              <div class="flex justify-evenly">
<div>
<div class="font-bold text-xs">Admin &nbsp;</div>
                      <div>
                        {/* <Switch
                          style={{ width: "6.25em" }}
                          checked={props.notificationConfig.admin || admini}
                          onChange={handleAdmini}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        /> */}

<Switch 
 style={{ width: "6.25em" }}
checkedChildren="Yes"
unCheckedChildren="No"
onChange={handleAdminSwitchChange} checked={adminSwitch} />
                      </div>
</div>
<div>
<div class="font-bold text-xs">Reporting Manager &nbsp;</div>
                      <div>
                        {/* <Switch
                          style={{ width: "6.25em" }}
                          checked={props.notificationConfig.reportingManager || reportingMan}
                          onChange={handleReportingMan}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        /> */}
                         <Switch 
                         style={{ width: "6.25em" }}
                           checkedChildren="Yes"
                           unCheckedChildren="No"
                         onChange={handleReportingManagerSwitchChange} checked={reportingManagerSwitch} />
                      </div>
</div>
<div>
<div class="font-bold text-xs">Reporting Manager +1 &nbsp;</div>
                      <div>
                        {/* <Switch
                          style={{ width: "6.25em" }}
                          checked={props.notificationConfig.reportingManager1 || reportingMan1}
                          onChange={handleReportingMan1}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        /> */}
                         <Switch
                             checkedChildren="Yes"
                             unCheckedChildren="No"
                         style={{ width: "6.25em" }}
          onChange={handleReportingManagerPlus1SwitchChange}
          checked={reportingManagerPlus1Switch}
        />
                      </div>
</div>
<div>
<div class="text-sm font-semibold">Users</div>
                {/* <Checkbox indeterminate={indeterminateUser} onChange={onCheckAllUserChange} checked={checkAllUser}>
                 <div class="text-xs"> Check all</div>
                </Checkbox> */}
                 <Checkbox
        indeterminate={checkedList.length > 0 && checkedList.length < userOptions.length}
        onChange={handleCheckAllChange}
        checked={checkAll}
      >
      <div class="text-xs"> Check all</div>
      </Checkbox>
                <Divider />
                {/* <CheckboxGroup options={userOptions} value={checkedUserList} onChange={onUserChange} /> */}
                <CheckboxGroup options={userOptions} value={checkedList} onChange={handleChange} />

</div>
              </div>
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={props.addingNotificationConfig}
                >
                 Update
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
              </>
    );
}
const mapStateToProps = ({ settings, auth, }) => ({
  addingNotificationConfig:settings.addingNotificationConfig,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  notificationConfig:settings.notificationConfig

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNotificationConfig,
      getNotificationConfig
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationToggleForm);


