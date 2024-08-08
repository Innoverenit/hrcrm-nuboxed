
import React, {} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TimeInterval from "../../Utils/TimeInterval";
import {setSelectedClosureTimeIntervalReport} from "../Opportunity/OpportunityAction";
import {getDashBoardClosureRatio} from "../Dashboard/DashboardAction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { FormattedMessage } from "react-intl";

 class StackedClosureChart extends React.Component {
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
    const { getDashBoardClosureRatio, userId, startDate, endDate } = this.props;
    getDashBoardClosureRatio(userId,  startDate, endDate);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.startDate !== nextProps.startDate ||
      this.props.endDate !== nextProps.endDate
    ) {
      const { getDashBoardClosureRatio, userId, startDate, endDate } = nextProps;
      getDashBoardClosureRatio(userId, startDate, endDate);
    }
  }

  render() {
    const data=this.props.dashBoardClosureRatio
    console.log("data",data)
  return (
    <>
<div class="mr-5 ml-5 mt-4 h-[21rem] w-wk">  
      {/* Recruitment Performance */}
      <div class=" flex justify-between" >
      {/* <div style={{ width: "47%" }}> */}
      <span>
      <FormattedMessage
                        id="app.hours"
                        defaultMessage="Hours"
                      />
        
        </span>
      {/* </div> */}
      {/* <div style={{ width: "47%" }}> */}
    <TimeInterval
          times={this.props.dateClosureRangeList}
           handleClick={this.props.setSelectedClosureTimeIntervalReport}
        />
        {/* </div> */}
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
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend className="recharts-default-legend"/>
      <Bar dataKey="hours" stackId="a" fill="rgb(0, 192, 239, 0.4)" />
      {/* <Bar dataKey="Selected" stackId="a" fill="#ff715885" />
      <Bar dataKey="Onboarded" stackId="a" fill="orange" />  */}
    </BarChart>
    </div>
    </>
  );
}
 }
const mapStateToProps = ({ dashboard,auth,opportunity }) => ({
//   dashBoardCustomerChart:dashboard.dashBoardCustomerChart,
  userId: auth.userDetails.userId,
  endDate: opportunity.endDate,
  startDate: opportunity.startDate,
  dashBoardClosureRatio:dashboard.dashBoardClosureRatio,
  organisationId:auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  dateClosureRangeList:opportunity.dateClosureRangeList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getDashBoardClosureRatio,
        setSelectedClosureTimeIntervalReport
      
     // getDashBoardCustomerChart

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StackedClosureChart);


// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// const data = [
//   { name: 'Hour 1', hoursWorked: 4 },
//   { name: 'Hour 2', hoursWorked: 7 },
//   { name: 'Hour 3', hoursWorked: 9 },
//   { name: 'Hour 4', hoursWorked: 4 },
//   { name: 'Hour 5', hoursWorked: 6 },
// ];
// const StackedBarChart = ({  }) => {
//   return (
//     <BarChart width={600} height={400} data={data}>
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="hoursWorked" stackId="a" fill="#8884d8" />
//     </BarChart>
//   );
// };

// export default StackedBarChart;


