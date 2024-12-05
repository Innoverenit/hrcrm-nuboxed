
import React, { Component,useState, useMemo ,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getAllDashBoardCustomerChart} from "../Dashboard/DashboardAction";
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


 


 function StackedAllChart(props) {
  const data=props.dashBoardallCustomerChart
// console.log("data",data)

  useEffect(() => {
    props.getAllDashBoardCustomerChart(props.userId);
    
  }, []);
  return (
    <BarChart
      width={500}
      height={200}
      // margin-left={-35}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 11
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
  );
}
const mapStateToProps = ({ dashboard,auth }) => ({
  dashBoardallCustomerChart:dashboard.dashBoardallCustomerChart,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDashBoardCustomerChart
    //   getDashBoardCustomerChart

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StackedAllChart);

