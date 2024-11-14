import React, { useEffect,useState  } from "react";
import TimeInterval from "../../../Utils/TimeInterval";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CustomerPieChart from "../../Dashboard/Child/JumpStart/CustomerPieChart";
import DashRepairBarClousreJumpstartUser from "../../Dashboard/Child/JumpStart/DashRepairBarClousreJumpstartUser";
import {
    setSelectedTimeIntervalReport,
    setTimeRangeReport,
  } from "../../Dashboard/DashboardAction";

import CollectionModePaymentChart from "./CollectionModePaymentChart";
import CollectionTypePaymentChart from "./CollectionTypePaymentChart";
import ReconcileModePaymentChart from "./ReconcileModePaymentChart";
import ReconcileTypePaymentChart from "./ReconcileTypePaymentChart";

function DistributorSummaryTable(props) {

    return (
        <>
                <TimeInterval 
                  times={props.dateRangeList}
                  handleClick={props.setSelectedTimeIntervalReport}
                />
         <div className=" flex flex-wrap ">
        <div><CollectionModePaymentChart/></div>
        <div><CollectionTypePaymentChart/></div>
        <div><ReconcileModePaymentChart/></div>
        <div><ReconcileTypePaymentChart/></div>
        <div><CustomerPieChart/></div>
       <div> <DashRepairBarClousreJumpstartUser /></div>
        </div>
        </>
    );
};
const mapStateToProps = ({ collection, auth,dashboard }) => ({
    user: auth.userDetails,
    viewType: collection.viewType,
    userId: auth.userDetails.userId,
    dateRangeList: dashboard.dateRangeList,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {

        setSelectedTimeIntervalReport,
        setTimeRangeReport,
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(DistributorSummaryTable); ;