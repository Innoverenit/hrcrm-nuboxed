
import React, { useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TimeInterval from "../../Utils/TimeInterval";
import {setSelectedClosureTimeIntervalReport} from "../Opportunity/OpportunityAction";
import {getDashCustomerAddedLeads} from "../Dashboard/DashboardAction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { MainWrapper } from "../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

 function LeadsAddChart (props) {

  useEffect(()=> {
    if (props.timeRangeType === "today"){
      props.getDashCustomerAddedLeads(props.userId,props.startDate,props.endDate); 
    }
    else {
      props.getDashCustomerAddedLeads(props.userId,props.startDate,props.endDate); 
    }
  
  },[props.userId,props.startDate,props.endDate]);
  

    const data=props.dashCustoLeadsAdded
  return (
    <>
    <MainWrapper
    style={{height:"16em",width:"-webkit-fill-available"}}
    >
      
      <div class=" flex justify-between" >
      <span><FormattedMessage
              id="app.hours"
              defaultMessage="Hours"
            /></span>
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
      <XAxis dataKey="number" />
      <YAxis />
      <Tooltip />
      <Legend className="recharts-default-legend"/>
      <Bar dataKey="number" stackId="a" fill="rgb(0, 192, 239, 0.4)" />
    </BarChart>
    </MainWrapper>
    </>
  );
}
 
const mapStateToProps = ({ dashboard,auth,opportunity }) => ({
  dashCustoLeadsAdded:dashboard.dashCustoLeadsAdded,
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
      getDashCustomerAddedLeads,
      setSelectedClosureTimeIntervalReport
      

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsAddChart);



