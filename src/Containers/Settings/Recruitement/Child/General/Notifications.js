import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form,  } from "formik";
import {
  Select,
} from "../../../../../Components/UI/Elements";
import {  Popconfirm, Switch } from "antd";
import { addingNotifications, getNotifications } from "../../../SettingsAction";
import dayjs from "dayjs";
const { Option } = Select;
function Notifications(props) {
  useEffect(() => {
    props.getNotifications(props.orgId);
  }, []);

  const { inappInd } = props.notifications;
  console.log(inappInd);
  const [toggle, setToggle] = useState(inappInd);
  function handleAppClick(checked) {
    console.log(inappInd);
    if (inappInd) {
      //disable url
      props.addingNotifications({
        ...props.notifications,
        orgId: props.orgId,
        inappInd: inappInd ? false : true,
      });
      setToggle(inappInd ? false : true);
    } else {
      props.addingNotifications(
        {
          ...props.notifications,
          orgId: props.orgId,
          inappInd: inappInd ? false : true,
        },
        props.orgId
      );
      setToggle(inappInd ? false : true);
    }
  }
  function handleCancel() {
    if (inappInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  const { smsInd } = props.notifications;
  console.log(smsInd);
  const [inSmsInd, setsmsInd] = useState(smsInd);
  function handleSmsClick(checked) {
    console.log(smsInd);
    if (smsInd) {
  
      props.addingNotifications({
        ...props.notifications,
        orgId: props.orgId,
        smsInd: smsInd ? false : true,
      });
      setsmsInd(smsInd ? false : true);
    } else {
      props.addingNotifications(
        {
          ...props.notifications,
          orgId: props.orgId,
          smsInd: smsInd ? false : true,
        },
        props.orgId
      );
      setsmsInd(smsInd ? false : true);
    }
  }
  function handleCancel() {
    if (smsInd) {
      setsmsInd(true);
    } else {
      setsmsInd(false);
    }
  }

  const { emailInd } = props.notifications;
  console.log(emailInd);
  const [inEmailInd, setemailInd] = useState(emailInd);
  function handleEmailClick(checked) {
    console.log(emailInd);
    if (emailInd) {
      //disable url
      props.addingNotifications({
        ...props.notifications,
        orgId: props.orgId,
        emailInd: emailInd ? false : true,
      });
      setemailInd(emailInd ? false : true);
    } else {
      props.addingNotifications(
        {
          ...props.notifications,
          orgId: props.orgId,
          emailInd: emailInd ? false : true,
        },
        props.orgId
      );
      setemailInd(emailInd ? false : true);
    }
  }
  function handleCancel() {
    if (emailInd) {
      setemailInd(true);
    } else {
      setemailInd(false);
    }
  }

  const { whatsappInd } = props.notifications;
  console.log(whatsappInd);
  const [inWhatsappInd, setwhatsappInd] = useState(whatsappInd);
  function handleWpClick(checked) {
    console.log(whatsappInd);
    if (whatsappInd) {
      //disable url
      props.addingNotifications({
        ...props.notifications,
        orgId: props.orgId,
        whatsappInd: whatsappInd ? false : true,
      });
      setwhatsappInd(whatsappInd ? false : true);
    } else {
      props.addingNotifications(
        {
          ...props.notifications,
          orgId: props.orgId,
          whatsappInd: whatsappInd ? false : true,
        },
        props.orgId
      );
      setwhatsappInd(whatsappInd ? false : true);
    }
  }
  function handleCancel() {
    if (whatsappInd) {
      setwhatsappInd(true);
    } else {
      setwhatsappInd(false);
    }
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
        //   timePeriod: "",
          userId: props.userId,
          orgId: props.organizationId,
        }}
        onSubmit={(values, { resetForm }) => {}}
      >
        {({ values }) => (
          <div >
            <Form className="form-background">
              <div class=" flex justify-between w-[100%] p-3">                       
               <div class=" w-[100%]">             
                  <div>
                    <div class="flex font-bold text-sm">
                                 Notifications
                    </div>
                  </div>           
                  <div class=" flex  text-xs justify-between mt-2"  >          
                  
                    <div>In app</div>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleAppClick}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch                       
                          checked={toggle || inappInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div>
                  <div class=" flex  text-xs justify-between mt-2">                              
                    <div>In SMS</div>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleSmsClick}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                        
                          checked={inSmsInd || smsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div>
                  <div class=" text-xs flex justify-between mt-2"
                
                >
                    <div>In Email</div>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleEmailClick}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                        
                          checked={inEmailInd || emailInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div>
              
               
                </div>
              </div>
              <div class=" text-xs mt-2">Updated on {" "} {dayjs(props.notifications.updatedDate).format("DD/MM/YYYY")} by {" "} {props.notifications.ownerName}</div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  notifications: settings.notifications,
  fetchingNotifications: settings.fetchingNotifications,
  fetchingNotificationsError: settings.fetchingNotificationsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotifications,
      addingNotifications,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
