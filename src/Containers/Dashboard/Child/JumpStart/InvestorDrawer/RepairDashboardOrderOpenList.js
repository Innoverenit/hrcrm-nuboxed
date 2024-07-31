import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {getRepairDashboardOrderOpen} from "../../../../Dashboard/DashboardAction"
import { bindActionCreators } from "redux";
import Dashboard from "../../../Dashboard";

function RepairDashboardOrderOpenList(props) {
    
      useEffect(()=>{
        if (props.timeRangeType === "today"){
          props.getRepairDashboardOrderOpen(props.userId,props.startDate,props.endDate,0);
        }
        else {
          props.getRepairDashboardOrderOpen(props.userId,props.startDate,props.endDate,0); 
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
    repairDashboardOrderOpen:dashboard.repairDashboardOrderOpen
    
  
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getRepairDashboardOrderOpen
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(RepairDashboardOrderOpenList);

