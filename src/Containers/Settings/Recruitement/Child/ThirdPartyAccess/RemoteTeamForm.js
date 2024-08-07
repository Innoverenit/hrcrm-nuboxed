// 

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { bindActionCreators } from "redux";
import {  Switch, Popconfirm } from "antd";
import {  MainWrapper } from "../../../../../Components/UI/Layout";
 import { getRemoteAccess,addingRemoteAccess } from "../../../SettingsAction";

function RemoteTeamForm(props) {
  useEffect(() => {
     props.getRemoteAccess(props.orgId);
  }, []);

 

  const { enableHiringTeamInd } = props.remoteAccess;
  console.log(enableHiringTeamInd);
 const [toggle, setToggle] = useState(enableHiringTeamInd)
 
 function handleTeamClick(checked) {
    console.log(enableHiringTeamInd);
   if (enableHiringTeamInd) {
     //disable url
     props.addingRemoteAccess({
        ...props.remoteAccess,
       orgId: props.orgId,
       enableHiringTeamInd:enableHiringTeamInd? false : true,
      }, );
      setToggle( enableHiringTeamInd ? false : true);
   } else {

     props.addingRemoteAccess({
        ...props.remoteAccess,
       orgId: props.orgId,
       enableHiringTeamInd:enableHiringTeamInd? false : true,
     }, props.orgId);
     setToggle(enableHiringTeamInd ? false : true);
   }

 }
 function handleCancel() {
   if (enableHiringTeamInd) {
    setToggle(true);
   } else {
    setToggle(false);
   }
 }
  return (
    <MainWrapper style={{ height: "446px", width:"", overflow: "auto" }}>
      
          
      <Spacer />
      <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto w-[52%] ">
        <p>Enable Hiring Team Feature on Portal</p>
        <div>
          <Popconfirm
            title="Do you wish to change Status ? "
             onConfirm={handleTeamClick}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              style={{ width: "5em" }}
                checked={toggle||enableHiringTeamInd}
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          </Popconfirm>
        </div>
      </div> 
    <Spacer />
      <div>Updated on {dayjs(props.remoteAccess.lastUpdatedOn).format("ll")} by {props.remoteAccess.name}</div>
    </MainWrapper>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  orgId: auth.userDetails.organizationId,
  remoteAccess:settings.remoteAccess,
   userId: auth.userDetails.userId,
  fetchingRemoteAccess:settings.fetchingRemoteAccess,
  fetchingRemoteAccessError:settings.fetchingRemoteAccessError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getRemoteAccess,
      addingRemoteAccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoteTeamForm);