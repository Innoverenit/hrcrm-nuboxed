import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import { Switch, Popconfirm } from "antd";
import {  MainWrapper } from "../../../../../Components/UI/Layout";
import { addingThirdPartyAccess,getThirdPartyAccess, } from "../../../SettingsAction";

function ThirdPartyForm(props) {
    useEffect(() => {
    props.getThirdPartyAccess(props.orgId);
  }, []);

   const { customerContactInd } = props.thirdPartyAccess;
  console.log(customerContactInd);
  const [toggle, setToggle] = useState(customerContactInd)
  
  function handleCandidateClick(checked) {
    console.log(customerContactInd);
    if (customerContactInd) {
      //disable url
      props.addingThirdPartyAccess({
        ...props.thirdPartyAccess,
       orgId: props.orgId,
        customerContactInd:customerContactInd? false : true,
              }, );
      setToggle(customerContactInd ? false : true);
    } else {

      props.addingThirdPartyAccess({
         ...props.thirdPartyAccess,
       orgId: props.orgId,
        customerContactInd:customerContactInd? false : true,
         }, props.orgId);
      setToggle(customerContactInd ? false : true);
       }

  }
  function handleCancel() {
    if (customerContactInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  const { monitizeInd } = props.thirdPartyAccess;
  console.log(monitizeInd);
  const [monetizeInd, setMonitizeInd] = useState(monitizeInd);
  function handleMonetizeClick(checked) {
    console.log(monitizeInd);
    if (monitizeInd) {
      //disable url
      props.addingThirdPartyAccess({
         ...props.thirdPartyAccess,
        orgId: props.orgId,
        monitizeInd: monitizeInd ? false : true,
      }, props.userId);
      setMonitizeInd(monitizeInd ? false : true);
    } else {

      props.addingThirdPartyAccess({
        ...props.thirdPartyAccess,
        orgId: props.orgId,
        monitizeInd: monitizeInd ? false : true,
      }, props.orgId);
      setMonitizeInd(monitizeInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleMonitizeCancel() {
    if (monitizeInd) {
      setMonitizeInd(true);
    } else {
      setMonitizeInd(false);
    }
  }

  const { customerAiInd } = props.thirdPartyAccess;
  console.log(customerAiInd);
  const [customersAiInd, setCustomersAiInd] = useState(monitizeInd);
  function handleCustomerAiClick(checked) {
    console.log(customerAiInd);
    if (customerAiInd) {
      //disable url
      props.addingThirdPartyAccess({
         ...props.thirdPartyAccess,
        orgId: props.orgId,
        customerAiInd: customerAiInd ? false : true,
      }, props.userId);
      setCustomersAiInd(customerAiInd ? false : true);
    } else {

      props.addingThirdPartyAccess({
        ...props.thirdPartyAccess,
        orgId: props.orgId,
        customerAiInd: customerAiInd ? false : true,
      }, props.orgId);
      setCustomersAiInd(customerAiInd ? false : true);
    }

    //check if from backend we got candidate value true then add condition like if tru then call disable url else enable url
  }
  function handleCustomerCancel() {
    if (customerAiInd) {
      setCustomersAiInd(true);
    } else {
      setCustomersAiInd(false);
    }
  }

  return (
    <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
      <mt-3 />
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-[52%] ">
        <p>Allow Access to Customer Portal</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleCandidateClick}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
               checked={toggle||customerContactInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </div>
      <mt-3 />
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-[52%] ">
        <p>Show Available Talent</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
              onConfirm={handleMonetizeClick}
              onCancel={handleMonitizeCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
              checked={monetizeInd||monitizeInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </div>
      <mt-3 />
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-[52%] ">
        <p>Enable AI Assist</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleCustomerAiClick}
            onCancel={handleCustomerCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
               checked={customersAiInd||customerAiInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </div> 
      <div>Updated on {dayjs(props.thirdPartyAccess.lastUpdatedOn).format("ll")} by {props.thirdPartyAccess.name}</div>
    </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  thirdPartyAccess:settings.thirdPartyAccess,
  thirdPartyMonetize:settings.thirdPartyMonetize,
  // permissionsData: permissions.permissionsData,
    orgId: auth.userDetails.organizationId,
   userId: auth.userDetails.userId,
  fetchingThirdPartyAccess:settings.fetchingThirdPartyAccess,
  fetchingThirdPartyAccessError:settings.fetchingThirdPartyAccessError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getPermissions,
      // addingPermissions
      // getThirdPartyMonetizeAccess,
      getThirdPartyAccess,
      addingThirdPartyAccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThirdPartyForm);

