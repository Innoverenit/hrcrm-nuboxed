
import React from "react";
import { connect } from "react-redux";
import { Popover} from "antd";
import { bindActionCreators } from "redux";
import TimeInterval from "../../Utils/TimeInterval";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


const data = [
  {
    customerName: "ABN Amro",
    userId: null,
    customerId: null,
    requirementName: null,
    recruitmentId: null,
    recruiterId: null,
    name: null,
    orgId: null,
    opportunityNo: 0,
    openRequirmentNo: 1,
    selectedNo: 0,
    onboardedNo: 0,
    position: 1
  },
  {
    customerName: "TESTING ",
    userId: null,
    customerId: null,
    requirementName: null,
    recruitmentId: null,
    recruiterId: null,
    name: null,
    orgId: null,
    opportunityNo: 0,
    openRequirmentNo: 304,
    selectedNo: 0,
    onboardedNo: 1,
    position: 303
  }
]
 class StackedAllSummaryChart extends React.Component {
  
// console.log("data",data)
constructor() {
  super();
  var today = new Date(),
  date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate();

this.state = {
  date: date,
};
}
  render() {
    // const data=this.props.dashBoardSummaryChart
  return (
    <>
    <TimeInterval
        //   times={this.props.dateStackedRangeList}
        //   handleClick={this.props.setSelectedStackedTimeIntervalReport}
        />
        <Popover>
    <BarChart
      width={500}
      height={200}
      // margin-left={-35}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="customerName" />
      <YAxis />
      <Tooltip />
      <Legend className="recharts-default-legend"/>
      <Bar dataKey="Positions" stackId="a" fill="rgb(0, 192, 239, 0.4)" />
      <Bar dataKey="Selected" stackId="a" fill="#ff715885" />
       <Bar dataKey="OnBoarded" stackId="a" fill="orange" /> 
    </BarChart>
    </Popover>
    </>
  );
}
 }
const mapStateToProps = ({ dashboard,auth ,contact}) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StackedAllSummaryChart);

