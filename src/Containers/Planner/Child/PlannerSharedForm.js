import React, {  useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { 
  getPlannerPermissionsList,
   sharePlannerPermission 
} from "../PlannerAction";

import {
  getCallsListByUserId,
  getEventsListByUserId,
  getTasksListByUserId,
  
} from "../../Auth/AuthAction";
import { StyledSelect } from "../../../Components/UI/Antd";
const Option =StyledSelect;

function PlannerSharedForm(props) {
  useEffect(() => {
    props.getPlannerPermissionsList();
  }, []);
  
  function handleChange(userId) {
    props.getCallsListByUserId(userId);
    props.getEventsListByUserId(userId);
    props.getTasksListByUserId(userId,0);
  }
  // console.log(props.shareUsers);
  const findLoginData=props.permissionsDataList.find((element)=>{
    if(element.userId === props.userId){
         return element.userName
   }
});
console.log("findLoginData",findLoginData&& findLoginData.userName);
  return (
    <>
    <StyledSelect
        // showArrow={false}
        // value={props.name || undefined}
        // disabled={props.stageInd || props.approveInd || props.rejectInd}
        // showSearch
        defaultValue={props.fullName}
        style={{ width: 120 }}
        placeholder="Select"
        onChange={(e) => handleChange(e)}
      >
        {props.permissionsDataList.map((item) => {
          return <Option value={item.userId}>{item.userName} </Option>;
        })}
      </StyledSelect>

     
    </>
  );
}

const mapStateToProps = ({ planner,auth }) => ({
   addingSharingPlanner: planner.addingSharingPlanner,
   userId:auth.userDetails.userId,
   user: auth.userDetails,
   fullName:
   (auth.userDetails.fullName),
     lastName:
     (auth.userDetails &&
       auth.userDetails.metaData &&
       auth.userDetails.metaData.lastName),
  //   users: team.users,
  //   shareUsers: partner.shareUsers,
  permissionsDataList: planner.permissionsDataList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      sharePlannerPermission,
      // //   getUsers,
       getPlannerPermissionsList,
       getCallsListByUserId,
       getEventsListByUserId,
       getTasksListByUserId,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlannerSharedForm);
