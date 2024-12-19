import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch,Checkbox, Divider } from "antd";
import { Formik, Form } from "formik";
import {addNotificationConfig,
} from "../../../../SettingsAction";


const CheckboxGroup = Checkbox.Group;

function NotificationToggleForm (props) {

  const userOptions = [
    { label: 'Create', value: 'Create' },
    { label: 'Update', value: 'Update' },
    // { label: 'Read', value: 'read' },
    { label: 'Delete', value: 'Delete' },
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
          useEffect(() => {
            setCheckedList(props.notificationConfig.type|| []);
            setCheckAll(props.notificationConfig.length === userOptions.length);
            setAdminSwitch(props.notificationConfig.admin);
            setReportingManagerSwitch(props.notificationConfig.reportingManager);
            setReportingManagerPlus1Switch(props.notificationConfig.reportingManager1);
          }, [props.notificationConfig]);
    return (
      <>

                <Formik
          initialValues={{
            
            admin: admini ? "true" : "false",
            reportingManager: reportingMan  ? "true" :"false",
            reportingManager1: reportingMan1 ? "true" : "false",
            type: "Create",
            name:props.activeTab,
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
                 <Checkbox
        indeterminate={checkedList.length > 0 && checkedList.length < userOptions.length}
        onChange={handleCheckAllChange}
        checked={checkAll}
      >
      <div class="text-xs"> Check all</div>
      </Checkbox>
                <Divider />
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
//   notificationConfig:settings.notificationConfig

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNotificationConfig,
    //   getNotificationConfig
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationToggleForm);