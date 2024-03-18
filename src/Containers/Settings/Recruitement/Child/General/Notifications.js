import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form,  } from "formik";
import {
  Select,
  StyledLabel,
} from "../../../../../Components/UI/Elements";
import { MainWrapper, } from "../../../../../Components/UI/Elements";
import {  Popconfirm, Switch } from "antd";
import { addingNotifications, getNotifications } from "../../../SettingsAction";
import moment from "moment";
const { Option } = Select;
function Notifications(props) {
  useEffect(() => {
    props.getNotifications(props.orgId);
    // props.getRequirementsDuration(props.orgId);
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
      //disable url
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
          <MainWrapper >
            <Form className="form-background">
              <div class=" flex justify-between w-[30rem]"
             
              >
               <div class=" w-[44%] mt-[0.625em] ml-[1em]"
                >
                  <div>
                    <div class="flex font-bold mt-4  text-base"

                    >
                      Notifications
                    </div>
                  </div>

              
                  <div class=" flex justify-between mt-4"
               
                  >
                    <p>In app</p>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleAppClick}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={toggle || inappInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div>
                  <div class=" flex justify-between mt-4"
                
                  >
                    <p>In SMS</p>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleSmsClick}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={inSmsInd || smsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div>
                  <div class=" flex justify-between mt-4"
                
                >
                    <p>In Email</p>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleEmailClick}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={inEmailInd || emailInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div>
              
                  {/* <div class=" flex justify-between mt-4"
                
                  >
                    <p>In Whatsapp</p>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleWpClick}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={inWhatsappInd || whatsappInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div> */}
                  {/* <Spacer />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Level</p>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        // onConfirm={handleSmsClick}
                        // onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          // checked={inSmsInd || smsInd}
                          checkedChildren="Basic"
                          unCheckedChildren="Advanced"
                        />
                      </Popconfirm>
                    </div>
                  </div> */}
                </div>
              </div>
              <div class=" mt-4">Updated on {moment(props.notifications.updatedDate).format("ll")} by {props.notifications.ownerName}</div>
            </Form>
          </MainWrapper>
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
