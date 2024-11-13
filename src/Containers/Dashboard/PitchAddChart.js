import React, { useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TimeInterval from "../../Utils/TimeInterval";
import {setSelectedClosureTimeIntervalReport} from "../Opportunity/OpportunityAction";
import {getDashInvestorAddedPitch} from "../Dashboard/DashboardAction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

 function PitchAddChart(props) {
  useEffect(()=> {
    if (props.timeRangeType === "today"){
      props.getDashInvestorAddedPitch(props.userId,props.endDate,props.startDate); 
    }
    else {
      props.getDashInvestorAddedPitch(props.userId,props.endDate,props.startDate); 
    }
  
  },[props.userId,props.endDate,props.startDate]);
 

    const data=props.dashInvstPitchAdded
  return (
    <>
    <div class="mr-5 ml-5  h-[16rem] w-wk ">
    
      <div class=" flex justify-between" >
    <TimeInterval
          times={props.dateClosureRangeList}
           handleClick={props.setSelectedClosureTimeIntervalReport}
        />
  
        </div>
    <BarChart
      width={350}
      height={200}
      data={data}
      margin={{
        top: 10,
        right: 20,
        left: 6,
        bottom: 10
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Number" />
      <YAxis />
      <Tooltip />
      <Legend className="recharts-default-legend"/>
      <Bar dataKey="Number" stackId="a" fill="rgb(0, 192, 239, 0.4)" />
    </BarChart>
    </div>
    </>
  );
}

const mapStateToProps = ({ dashboard,auth,opportunity }) => ({
  dashInvstPitchAdded:dashboard.dashInvstPitchAdded,
  userId: auth.userDetails.userId,
  endDate: opportunity.endDate,
  startDate: opportunity.startDate,
  dashBoardClosureRatio:dashboard.dashBoardClosureRatio,
  organisationId:auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  dateClosureRangeList:opportunity.dateClosureRangeList,
  timeRangeType:dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDashInvestorAddedPitch,
        setSelectedClosureTimeIntervalReport
      

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PitchAddChart);



