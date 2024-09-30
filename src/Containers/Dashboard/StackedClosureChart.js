
// import React, {} from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import TimeInterval from "../../Utils/TimeInterval";
// import {setSelectedClosureTimeIntervalReport} from "../Opportunity/OpportunityAction";
// import {getDashBoardClosureRatio} from "../Dashboard/DashboardAction";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend
// } from "recharts";
// import { FormattedMessage } from "react-intl";

//  class StackedClosureChart extends React.Component {
//   constructor() {
//     super();
//     var today = new Date(),
//     date =
//       today.getFullYear() +
//       "-" +
//       (today.getMonth() + 1) +
//       "-" +
//       today.getDate();
  
//   this.state = {
//     date: date,
//   };
//   }
//   componentDidMount() {
//     const { getDashBoardClosureRatio, userId, startDate, endDate } = this.props;
//     getDashBoardClosureRatio(userId,  startDate, endDate);
//   }
//   componentWillReceiveProps(nextProps) {
//     if (
//       this.props.startDate !== nextProps.startDate ||
//       this.props.endDate !== nextProps.endDate
//     ) {
//       const { getDashBoardClosureRatio, userId, startDate, endDate } = nextProps;
//       getDashBoardClosureRatio(userId, startDate, endDate);
//     }
//   }

//   render() {
//     const data=this.props.dashBoardClosureRatio
//     console.log("data",data)
//   return (
//     <>
// <div class="mr-5 ml-5 mt-4 h-[21rem] w-wk">  
//       {/* Recruitment Performance */}
//       <div class=" flex justify-between" >
//       {/* <div style={{ width: "47%" }}> */}
//       <span>
//       <FormattedMessage
//                         id="app.hours"
//                         defaultMessage="Hours"
//                       />
        
//         </span>
//       {/* </div> */}
//       {/* <div style={{ width: "47%" }}> */}
//     <TimeInterval
//           times={this.props.dateClosureRangeList}
//            handleClick={this.props.setSelectedClosureTimeIntervalReport}
//         />
//         {/* </div> */}
//         </div>
//     <BarChart
//       width={350}
//       height={200}
//       data={data}
//       margin={{
//         top: 10,
//         right: 20,
//         left: 6,
//         bottom: 10
//       }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Legend className="recharts-default-legend"/>
//       <Bar dataKey="hours" stackId="a" fill="rgb(0, 192, 239, 0.4)" />
//       {/* <Bar dataKey="Selected" stackId="a" fill="#ff715885" />
//       <Bar dataKey="Onboarded" stackId="a" fill="orange" />  */}
//     </BarChart>
//     </div>
//     </>
//   );
// }
//  }
// const mapStateToProps = ({ dashboard,auth,opportunity }) => ({
// //   dashBoardCustomerChart:dashboard.dashBoardCustomerChart,
//   userId: auth.userDetails.userId,
//   endDate: opportunity.endDate,
//   startDate: opportunity.startDate,
//   dashBoardClosureRatio:dashboard.dashBoardClosureRatio,
//   organisationId:auth.userDetails.organizationId,
//   userId: auth.userDetails.userId,
//   dateClosureRangeList:opportunity.dateClosureRangeList
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         getDashBoardClosureRatio,
//         setSelectedClosureTimeIntervalReport
      
//      // getDashBoardCustomerChart

//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(StackedClosureChart);


import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StackedBarChart = () => {
  const options = {
    series: [
      {
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
      },
      {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
      },
      {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
      },
      {
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8]
      }
    ],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false, // Vertical bar chart
        borderRadius: 10, // Rounded corners for the bars
        borderRadiusApplication: 'end', // Applied at the end of bars
        borderRadiusWhenStacked: 'last', // Apply to last stacked item
        dataLabels: {
          total: {
            enabled: true, // Show total data labels
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      }
    },
    xaxis: {
      type: 'datetime', // X-axis is based on dates
      categories: [
        '01/01/2011 GMT',
        '01/02/2011 GMT',
        '01/03/2011 GMT',
        '01/04/2011 GMT',
        '01/05/2011 GMT',
        '01/06/2011 GMT'
      ] // Date categories for x-axis
    },
    legend: {
      position: 'right', // Legend position
      offsetY: 40
    },
    fill: {
      opacity: 1 // Solid fill
    }
  };

  return (
    <div className=' w-[39vw] '>
      <ReactApexChart
        options={options}
        series={options.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default StackedBarChart;




