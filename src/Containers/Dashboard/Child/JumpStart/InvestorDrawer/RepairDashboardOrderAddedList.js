import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {getRepairDashboardOrderAdded} from "../../../../Dashboard/DashboardAction"
import { bindActionCreators } from "redux";
import Dashboard from "../../../Dashboard";

function RepairDashboardOrderAddedList(props) {
    
      useEffect(()=>{
        if (props.timeRangeType === "today"){
          props.getRepairDashboardOrderAdded(props.userId,props.startDate,props.endDate,0);
        }
        else {
          props.getRepairDashboardOrderAdded(props.userId,props.startDate,props.endDate,0); 
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
    repairDashboardOrderAdded:dashboard.repairDashboardOrderAdded
    
  
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getRepairDashboardOrderAdded
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(RepairDashboardOrderAddedList);

