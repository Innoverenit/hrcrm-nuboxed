import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form,  } from "formik";
import {
  Select,
} from "../../../../../Components/UI/Elements";
import {  Popconfirm, Switch } from "antd";
import { addingIdentifier, getIdentifier } from "../../../SettingsAction";
import dayjs from "dayjs";
const { Option } = Select;
function Identifier(props) {
  useEffect(() => {
    props.getIdentifier(props.orgId);
  }, []);

  const { inappInd } = props.identifiers;
  console.log(inappInd);
  const [toggle, setToggle] = useState(inappInd);
  function handleAppClick(checked) {
    console.log(inappInd);
    if (inappInd) {
      //disable url
      props.addingIdentifier({
        //...props.identifiers,
        orgId: props.orgId,
        inappInd: inappInd ? false : true,
      });
      setToggle(inappInd ? false : true);
    } else {
      props.addingIdentifier(
        {
          ...props.identifiers,
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

  const { smsInd } = props.identifiers;
  console.log(smsInd);
  const [inSmsInd, setsmsInd] = useState(smsInd);
  function handleSmsClick(checked) {
    console.log(smsInd);
    if (smsInd) {
  
      props.addingIdentifier({
        ...props.identifiers,
        orgId: props.orgId,
        smsInd: smsInd ? false : true,
      });
      setsmsInd(smsInd ? false : true);
    } else {
      props.addingIdentifier(
        {
          ...props.identifiers,
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

  const { emailInd } = props.identifiers;
  console.log(emailInd);
  const [inEmailInd, setemailInd] = useState(emailInd);
  function handleEmailClick(checked) {
    console.log(emailInd);
    if (emailInd) {
      //disable url
      props.addingIdentifier({
        ...props.identifiers,
        orgId: props.orgId,
        emailInd: emailInd ? false : true,
      });
      setemailInd(emailInd ? false : true);
    } else {
      props.addingIdentifier(
        {
          ...props.identifiers,
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

  const { whatsappInd } = props.identifiers;
  console.log(whatsappInd);
  const [inWhatsappInd, setwhatsappInd] = useState(whatsappInd);
  function handleWpClick(checked) {
    console.log(whatsappInd);
    if (whatsappInd) {
      //disable url
      props.addingIdentifier({
        ...props.identifiers,
        orgId: props.orgId,
        whatsappInd: whatsappInd ? false : true,
      });
      setwhatsappInd(whatsappInd ? false : true);
    } else {
      props.addingIdentifier(
        {
          ...props.identifiers,
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
                    <div class="flex font-bold text-base">
                    Identifier
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
              
                  {/* <div class=" flex justify-between mt-2"
                
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
                        
                          checked={inWhatsappInd || whatsappInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div> */}
                  {/* <div class=" mt-3" />
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
                        
                          // checked={inSmsInd || smsInd}
                          checkedChildren="Basic"
                          unCheckedChildren="Advanced"
                        />
                      </Popconfirm>
                    </div>
                  </div> */}
                </div>
              </div>
              <div class=" text-xs mt-2">Updated on {dayjs(props.identifiers.updatedDate).format("ll")} by {props.identifiers.ownerName}</div>
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
  identifiers: settings.identifiers,
  fetchingIdentifiers: settings.fetchingIdentifiers,
  fetchingIdentifiersError: settings.fetchingIdentifiersError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getIdentifier,
      addingIdentifier,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Identifier);
