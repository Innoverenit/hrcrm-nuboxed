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
          <CollectionModePaymentChart/>
        </div>

        <div>
        <div class=" font-poppins font-bold text-base ">Reconcile Value by Payment Mode</div>
          <ReconcileModePaymentChart/>
          </div>

          <div>
        <div class=" font-poppins font-bold text-base ">Reconcile by Payment Type </div>
          <ReconcileTypePaymentChart/>
          </div>
          {/* <div>
        <div class="font-poppins font-bold text-base">Credit memo utilized</div>
          <CreditMemoUtilizedChart/>
          </div> */}

         
</div>

<div className="flex justify-between w-wk">
<div>  
        <div class=" font-poppins font-bold text-base ">Collection by Payment Type</div>
          <CollectionTypePaymentChart/>
        </div>
        
        
       <div class="w-wk"> 
       <div class="font-poppins font-bold text-base">Bar chart by Customer</div>
        <BarChartCustomer/>
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