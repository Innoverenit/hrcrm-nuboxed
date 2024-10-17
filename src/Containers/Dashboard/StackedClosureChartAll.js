
import React, {} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TimeInterval from "../../Utils/TimeInterval";
 import {setSelectedClosureTimeIntervalReport} from "../Opportunity/OpportunityAction";
 import {getAllDashBoardClosureRatio} from "../Dashboard/DashboardAction";
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

 class StackedClosureChartAll extends React.Component {
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
    const { getAllDashBoardClosureRatio, userId, department,startDate, endDate } = this.props;
    getAllDashBoardClosureRatio(userId,  startDate, endDate,department);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.startDate !== nextProps.startDate ||
      this.props.endDate !== nextProps.endDate
    ) {
      const { getAllDashBoardClosureRatio, userId,department, startDate, endDate } = nextProps;
      getAllDashBoardClosureRatio(userId, startDate, endDate,department);
    }
  }

  render() {
      const data=this.props.dashBoardallClosureRatio
    // console.log("data",data)
  return (
    <>
    <div class="mr-5 ml-5 !h-[15rem] w-[60%] max-sm:w-wk">
      {/* Recruitment Performance */}
      <div class=" flex justify-between" >
      {/* <div style={{ width: "47%" }}> */}
      <span>  <FormattedMessage
                id="app.performance"
                defaultMessage="Performance"
              /></span>
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
      <Bar dataKey="OpenRequirements" stackId="a" fill="rgb(0, 192, 239, 0.4)" />
      <Bar dataKey="Selected" stackId="a" fill="#ff715885" />
      <Bar dataKey="Onboarded" stackId="a" fill="orange" /> 
    </BarChart>
    </div>
    </>
  );
}
 }
const mapStateToProps = ({ dashboard,auth,opportunity }) => ({
  userId: auth.userDetails.userId,
  endDate: opportunity.endDate,
  department:auth.userDetails.department,
dashBoardallClosureRatio:dashboard.dashBoardallClosureRatio,

  startDate: opportunity.startDate,

  dateClosureRangeList:opportunity.dateClosureRangeList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDashBoardClosureRatio,
        // getDashBoardClosureRatio,
         setSelectedClosureTimeIntervalReport
      


    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StackedClosureChartAll);

