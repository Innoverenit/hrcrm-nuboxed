import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {getRepairDashboardOrderClose} from "../../../Dashboard/DashboardAction"
import { bindActionCreators } from "redux";
//import Dashboard from "../../../Dashboard";

function RepairDashboardOrderCloseList(props) {
    
      useEffect(()=>{
        if (props.timeRangeType === "today"){
          props.getRepairDashboardOrderClose(props.userId,props.startDate,props.endDate,0);
        }
        else {
          props.getRepairDashboardOrderClose(props.userId,props.startDate,props.endDate,0); 
        }
      }, [props.userId,props.startDate,props.endDate]);
  return (
    <div>RepairDashboardOrderAddedList</div>
  )
}


const mapStateToProps = ({ auth, account, opportunity,dashboard }) => ({
    userId: auth.userDetails.userId,
    user: auth.userDetails,
    startDate: dashboard.startDate,
    endDate:dashboard.endDate,
    timeRangeType:dashboard.timeRangeType,
    repairDashboardOrderClose:dashboard.repairDashboardOrderClose
    
  
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getRepairDashboardOrderClose
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(RepairDashboardOrderCloseList);

