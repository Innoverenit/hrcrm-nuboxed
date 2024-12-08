
import React from "react";
import { connect } from "react-redux";
import { Popover } from "antd";
import { bindActionCreators } from "redux";
import TimeInterval from "../../Utils/TimeInterval";
import {getDashBoardSummaryChart,} from "./DashboardAction";
import {setSelectedStackedTimeIntervalReport} from "../Contact/ContactAction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


// const data = [
//   {
//     customerName: "ABN Amro",
//     userId: null,
//     customerId: null,
//     requirementName: null,
//     recruitmentId: null,
//     recruiterId: null,
//     name: null,
//     orgId: null,
//     opportunityNo: 0,
//     openRequirmentNo: 1,
//     selectedNo: 0,
//     onboardedNo: 0,
//     position: 1
//   },
//   {
//     customerName: "TESTING ",
//     userId: null,
//     customerId: null,
//     requirementName: null,
//     recruitmentId: null,
//     recruiterId: null,
//     name: null,
//     orgId: null,
//     opportunityNo: 0,
//     openRequirmentNo: 304,
//     selectedNo: 0,
//     onboardedNo: 1,
//     position: 303
//   }
// ]


 


 class StackedSummaryChart extends React.Component {
  
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
componentDidMount() {
  const { getDashBoardSummaryChart, organizationId, startDate, endDate } = this.props;
  getDashBoardSummaryChart(organizationId,  startDate, endDate);
}
componentWillReceiveProps(nextProps) {
  if (
    this.props.startDate !== nextProps.startDate ||
    this.props.endDate !== nextProps.endDate
  ) {
    const { getDashBoardSummaryChart, organizationId, startDate, endDate } = nextProps;
    getDashBoardSummaryChart(organizationId, startDate, endDate);
  }
}

  // useEffect(() => {
  //   props.getDashBoardSummaryChart(props.organizationId);
    
  // }, []);
  render() {
    const data=this.props.dashBoardSummaryChart
  return (
    <>
    <TimeInterval
          times={this.props.dateStackedRangeList}
          handleClick={this.props.setSelectedStackedTimeIntervalReport}
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
  dashBoardSummaryChart:dashboard.dashBoardSummaryChart,
  organizationId:auth.userDetails.organizationId,
//   dashBoardCustomerChart:dashboard.dashBoardCustomerChart,
  userId: auth.userDetails.userId,
  dateStackedRangeList:contact.dateStackedRangeList,
  endDate: contact.endDate,
  startDate: contact.startDate,
  showDatelist:dashboard.showDatelist,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
      getDashBoardSummaryChart,
      setSelectedStackedTimeIntervalReport

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StackedSummaryChart);

