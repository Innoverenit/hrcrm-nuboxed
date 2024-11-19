import React, { useEffect,useState  } from "react";
import TimeInterval from "../../../Utils/TimeInterval";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    setSelectedTimeIntervalReport,
    setTimeRangeReport,
  } from "../../Dashboard/DashboardAction";
import CollectionModePaymentChart from "./CollectionModePaymentChart";
import CollectionTypePaymentChart from "./CollectionTypePaymentChart";
import ReconcileModePaymentChart from "./ReconcileModePaymentChart";
import ReconcileTypePaymentChart from "./ReconcileTypePaymentChart";
import CreditMemoUtilizedChart from "./CreditMemoUtilizedChart";
import BarChartCustomer from "./BarChartCustomer";
import DynamicPieChart from "../../Dashboard/Child/JumpStart/DynamicPieChart";

function DistributorSummaryTable(props) {

    return (
        <>
                <TimeInterval 
                  times={props.dateRangeList}
                  handleClick={props.setSelectedTimeIntervalReport}
                />

<div class="w-wk">
         <div className="flex justify-between w-wk">
        <div>
        <div class=" font-poppins font-bold text-base ">Collection Value by Payment Mode</div>
          <DynamicPieChart dtype={"NotApprovePayment"} userId={props.userId} timeRangeType={props.timeRangeType} />
        </div>

        <div>
        <div class=" font-poppins font-bold text-base ">Reconcile Value by Payment Mode</div>
          <DynamicPieChart dtype={"ApprovePayment"} userId={props.userId} timeRangeType={props.timeRangeType}/>
          </div>

          <div>
        <div class=" font-poppins font-bold text-base ">Reconcile by Payment Type </div>
          <DynamicPieChart dtype={"Approve"} userId={props.userId} timeRangeType={props.timeRangeType}/>
          </div>
          {/* <div>
        <div class="font-poppins font-bold text-base">Credit memo utilized</div>
          <CreditMemoUtilizedChart dtype={"NotApprove"}/>
          </div> */}

         
</div>

<div className="flex justify-between w-wk">
<div>  
        <div class=" font-poppins font-bold text-base ">Collection by Payment Type</div>
          <DynamicPieChart dtype={"NotApprove"} userId={props.userId} timeRangeType={props.timeRangeType}/>
        </div>
        
        
       <div class="w-wk"> 
       <div class="font-poppins font-bold text-base">Bar chart by Customer</div>
        <DynamicPieChart dtype={"customer"} userId={props.userId} timeRangeType={props.timeRangeType}/>
        </div>

        </div>
        </div>
        </>
    );
};
const mapStateToProps = ({ collection, auth,dashboard }) => ({
    user: auth.userDetails,
    viewType: collection.viewType,
    userId: auth.userDetails.userId,
    dateRangeList: dashboard.dateRangeList,
    timeRangeType: dashboard.timeRangeType,
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