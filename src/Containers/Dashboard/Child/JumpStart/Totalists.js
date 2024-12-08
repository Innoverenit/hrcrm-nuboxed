
import React, { useEffect,useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import DynamicBarChart from "./DynamicBarChart";
import ExpenseBarChart from "./ExpenseBarChart";
import MileageBarChart from "./MileageBarChart";

function Totalists (props){

    return (
        <>
         <div class=" mt-1 flex flex-row justify-between" >
         <div class="w-[35rem]">
        <div class=" font-poppins font-bold text-base ">Expenses</div>
        <ExpenseBarChart dtype={"Expenses"} 
        userId={props.userId} timeRangeType={props.timeRangeType} buttonName={props.buttonName} />
        </div>
        
        <div class="w-[35rem]">
        <div class=" font-poppins font-bold text-base ">Mileage</div>
        <MileageBarChart dtype={"Mileage"} 
        userId={props.userId} timeRangeType={props.timeRangeType}/>
        </div>
      </div>
      <div class="flex justify-between">
      <div class="w-[35rem]">
      <div class=" font-poppins font-bold text-base ">Total</div>
        <DynamicBarChart dtype={"Total"} 
        userId={props.userId} timeRangeType={props.timeRangeType}/>
      </div>
      </div>
        </>
    )
}

const mapStateToProps= ({ dashboard, auth }) => ({
    user: auth.userDetails,
    orgId: auth.userDetails.organizationId,
    userId: auth.userDetails.userId,
    timeRangeType: dashboard.timeRangeType,
    startDate: dashboard.startDate,
    endDate: dashboard.endDate,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {

      },
      dispatch
    );
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Totalists);
  