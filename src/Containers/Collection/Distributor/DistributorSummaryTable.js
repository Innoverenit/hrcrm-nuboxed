import React from "react";
import TimeInterval from "../../../Utils/TimeInterval";
import CustomerPieChart from "../../Dashboard/Child/JumpStart/CustomerPieChart";
import DashRepairBarClousreJumpstartUser from "../../Dashboard/Child/JumpStart/DashRepairBarClousreJumpstartUser";

function DistributorSummaryTable(props) {

    return (
        <>
                <TimeInterval/>
         <div className=" flex flex-wrap ">
        <div><CustomerPieChart/></div>
        <div><CustomerPieChart/></div>
        <div><CustomerPieChart/></div>
        <div><CustomerPieChart/></div>
        <div><CustomerPieChart/></div>
       <div> <DashRepairBarClousreJumpstartUser /></div>
        </div>
        </>
    );
};
export default DistributorSummaryTable;