


// import React, { useEffect, useState } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button, Switch,Checkbox, Divider } from "antd";
// import { FormattedMessage } from "react-intl";
// import { Formik, Form, FastField } from "formik";
// import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
// import {addNotificationConfig,getNotificationConfig} from "../../../../SettingsAction";
// import { TabsWrapper } from "../../../../../../Components/UI/Layout";

// const CheckboxGroup = Checkbox.Group;

// function NotificationToggleForm (props) {
  
//   useEffect(()=>{
//     props.getNotificationConfig();
//   },[]);

//   // const userOptions = ['Access', 'Create', 'Update', 'Delete','Access Plus'];
//   const userOptions = [
//     { label: 'Create', value: 'Create' },
//     { label: 'Update', value: 'Update' },
//     // { label: 'Read', value: 'read' },
//     { label: 'Delete', value: 'Delete' },
//   ];

//   const [checkedList, setCheckedList] = useState([]);
//   const [checkAll, setCheckAll] = useState(false);
// const [admini,setAdmini]=useState(props.notificationConfig.admin);
// const [reportingMan,setreportingMan]=useState(props.notificationConfig.reportingManager);
// const [reportingMan1,setreportingMan1]=useState(props.notificationConfig.reportingManager1);
// const [adminSwitch, setAdminSwitch] = useState(false);
// const [reportingManagerSwitch, setReportingManagerSwitch] = useState(false);
// const [reportingManagerPlus1Switch, setReportingManagerPlus1Switch] = useState(false);

//   const [checkedUserList, setCheckedUserList] = useState();
//   const [indeterminateUser, setIndeterminateUser] = useState(true);
//   const [checkAllUser, setCheckAllUser] = useState(false);

//   const onUserChange = (list) => {
//     setCheckedUserList(list);
//     setIndeterminateUser(!!list.length && list.length < userOptions.length);
//     setCheckAllUser(list.length === userOptions.length);
//   };

//   const onCheckAllUserChange = (e) => {
//     setCheckedUserList(e.target.checked ? userOptions : []);
//     setIndeterminateUser(false);
//     setCheckAllUser(e.target.checked);
//   };

//   const handleAdmini = () => {
//     setAdmini((prevState) => ({
//           admini: !prevState.admini,
//         }));
//       };
//     const handleReportingMan = () => {
//       setreportingMan((prevState) => ({
//                 reportingMan: !prevState.reportingMan,
//             }));
//           };
        
//         const handleReportingMan1 = () => {
//           setreportingMan1((prevState) => ({
//               reportingMan1: !prevState.reportingMan1,
//             }));
//           };  
          
          

//           const handleChange = (checkedValues) => {
//             setCheckedList(checkedValues);
//             setCheckAll(checkedValues.length === userOptions.length);
//           };
        
//           const handleCheckAllChange = (e) => {
//             const checked = e.target.checked;
//             setCheckedList(checked ? userOptions.map((option) => option.value) : []);
//             setCheckAll(checked);
//           };

//           const handleAdminSwitchChange = (checked) => {
//             setAdminSwitch(checked);
//           };
        
//           const handleReportingManagerSwitchChange = (checked) => {
//             setReportingManagerSwitch(checked);
//           };
        
//           const handleReportingManagerPlus1SwitchChange = (checked) => {
//             setReportingManagerPlus1Switch(checked);
//           };
//           useEffect(() => {
//             setCheckedList(props.notificationConfig.type|| []);
//             setCheckAll(props.notificationConfig.length === userOptions.length);
//             setAdminSwitch(props.notificationConfig.admin);
//             setReportingManagerSwitch(props.notificationConfig.reportingManager);
//             setReportingManagerPlus1Switch(props.notificationConfig.reportingManager1);
//           }, [props.notificationConfig]);
//     return (
//       <>
//       {/* <TabsWrapper>
// <div >
// <div class=" text-clr flex justify-center mt-10 text-base font-bold"></div>

//               <div class=" flex justify-around mt-4" >
            
//               <div >
//                 <div class="text-sm font-semibold">Users</div>
//                 <Checkbox indeterminate={indeterminateUser} onChange={onCheckAllUserChange} checked={checkAllUser}>
//                  <div class="text-xs"> Check all</div>
//                 </Checkbox>
//                 <Divider />
//                 <CheckboxGroup options={userOptions} value={checkedUserList} onChange={onUserChange} />

//               </div>
//               </div>
//               </div>
//               </TabsWrapper> */}

//                 <Formik
//           initialValues={{
            
//             admin: admini ? "true" : "false",
//             reportingManager: reportingMan  ? "true" :"false",
//             reportingManager1: reportingMan1 ? "true" : "false",
//             type: "Create",
//             // name: "",

//           }}
//           // validationSchema={FormSchema}
//           onSubmit={(values, { resetForm }) => {
//             //debugger;
//             console.log(values);
//             props.addNotificationConfig(
//               {
//                 ...values,
//                 admin: adminSwitch ? "true" : "false",
//                 reportingManager: reportingManagerSwitch  ? "true" :"false",
//                 reportingManager1: reportingManagerPlus1Switch ? "true" : "false",
//                 type:checkedList,
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
           
//               <div class="flex justify-evenly">
// <div>
// <div class="font-bold text-xs">Admin &nbsp;</div>
//                       <div>
//                         {/* <Switch
//                           style={{ width: "6.25em" }}
//                           checked={props.notificationConfig.admin || admini}
//                           onChange={handleAdmini}
//                           checkedChildren="Yes"
//                           unCheckedChildren="No"
//                         /> */}

// <Switch 
//  style={{ width: "6.25em" }}
// checkedChildren="Yes"
// unCheckedChildren="No"
// onChange={handleAdminSwitchChange} checked={adminSwitch} />
//                       </div>
// </div>
// <div>
// <div class="font-bold text-xs">Reporting Manager &nbsp;</div>
//                       <div>
//                         {/* <Switch
//                           style={{ width: "6.25em" }}
//                           checked={props.notificationConfig.reportingManager || reportingMan}
//                           onChange={handleReportingMan}
//                           checkedChildren="Yes"
//                           unCheckedChildren="No"
//                         /> */}
//                          <Switch 
//                          style={{ width: "6.25em" }}
//                            checkedChildren="Yes"
//                            unCheckedChildren="No"
//                          onChange={handleReportingManagerSwitchChange} checked={reportingManagerSwitch} />
//                       </div>
// </div>
// <div>
// <div class="font-bold text-xs">Reporting Manager +1 &nbsp;</div>
//                       <div>
//                         {/* <Switch
//                           style={{ width: "6.25em" }}
//                           checked={props.notificationConfig.reportingManager1 || reportingMan1}
//                           onChange={handleReportingMan1}
//                           checkedChildren="Yes"
//                           unCheckedChildren="No"
//                         /> */}
//                          <Switch
//                              checkedChildren="Yes"
//                              unCheckedChildren="No"
//                          style={{ width: "6.25em" }}
//           onChange={handleReportingManagerPlus1SwitchChange}
//           checked={reportingManagerPlus1Switch}
//         />
//                       </div>
// </div>
// <div>
// <div class="text-sm font-semibold">Users</div>
//                 {/* <Checkbox indeterminate={indeterminateUser} onChange={onCheckAllUserChange} checked={checkAllUser}>
//                  <div class="text-xs"> Check all</div>
//                 </Checkbox> */}
//                  <Checkbox
//         indeterminate={checkedList.length > 0 && checkedList.length < userOptions.length}
//         onChange={handleCheckAllChange}
//         checked={checkAll}
//       >
//       <div class="text-xs"> Check all</div>
//       </Checkbox>
//                 <Divider />
//                 {/* <CheckboxGroup options={userOptions} value={checkedUserList} onChange={onUserChange} /> */}
//                 <CheckboxGroup options={userOptions} value={checkedList} onChange={handleChange} />

// </div>
//               </div>
//               <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   loading={props.addingNotificationConfig}
//                 >
//                  Update
//                 </Button>
//               </div>
//             </Form>
//             </div>
//           )}
//         </Formik>
//               </>
//     );
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




import React, { useState,useEffect,Component, lazy, Suspense } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Tabs, Card } from 'antd';
import {getNotificationConfig} from "../../../../SettingsAction";
import NottificationToggleTab from './NottificationToggleTab';
const { TabPane } = Tabs;

function NotificationToggleForm(props) {
  const [activeTab, setActiveTab] = useState("Customer");
  const tabData = [
    { tab: 'Customer' },
    
    { tab: 'Prospect' },
    { tab: 'Pitch' },
    { tab: 'Opportunity' },
    { tab: 'Leads' },
    { tab: 'Contact' },
    { tab: 'Deals' },
    { tab: 'Investor' },
    { tab: 'Call' },
    { tab: 'Event' },
    { tab: 'Task' },
{ tab: 'Supplier' },
{ tab: 'Shipper' },
  ];

  useEffect(() => {

    props.getNotificationConfig(activeTab);
   //  console.log(activeTab)
   },[activeTab]);

  //  useEffect(() => {
  //   // Check if data is available
  //   if (props.notificationConfig.length > 0) {
  //     // Update activeTab when data is available
  //     setActiveTab(props.organizationDetailsList?.organizationId);
  //   }
  // }, [props.organizationDetailsList]);
  const handleTabClick = (key) => {
    console.log(key)
    setActiveTab(key);
   props.getNotificationConfig(key);
  };
  return (
    <Tabs type="card" 
    // activeKey={activeTab} 
     onChange={handleTabClick}
    >
    {tabData.map((item) => (
      <TabPane key={item.tab
      } tab={item.tab}>
        {/* <Card>
          <p>Country: {item.country_name}</p>
          <p>ID: {item.country_id}</p>
        </Card> */}
         {props.gettingNotificationConfig ? <div style={{textAlign:"center"}}>Loading...</div>:
       <NottificationToggleTab
       activeTab={activeTab}
       notificationConfig={props.notificationConfig}
       />
      }
      </TabPane>
    ))}
  </Tabs>
  )
}

const mapStateToProps = ({ auth,settings }) => ({
  notificationConfig:settings.notificationConfig,
  gettingNotificationConfig:settings.gettingNotificationConfig
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotificationConfig
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationToggleForm);









