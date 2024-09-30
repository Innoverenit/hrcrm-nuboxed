// import React, {} from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import TimeInterval from "../../../../Utils/TimeInterval";
// import {setSelectedClosureTimeIntervalReport} from "../../../Opportunity/OpportunityAction";
// import {getDashBoardClosureRatio} from "../../../Dashboard/DashboardAction";
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

// const DashRepairBarClousreJumpstartUser = (props) => {
//     const { getDashBoardClosureRatio, userId, startDate, endDate, dateClosureRangeList, setSelectedClosureTimeIntervalReport } = props;
  
//     // useEffect(() => {
//     //   getDashBoardClosureRatio(userId, startDate, endDate);
//     // }, [getDashBoardClosureRatio, userId, startDate, endDate]);
  
//     // useEffect(() => {
//     //   if (props.startDate !== startDate || props.endDate !== endDate) {
//     //     getDashBoardClosureRatio(userId, startDate, endDate);
//     //   }
//     // }, [props.startDate, props.endDate, startDate, endDate, getDashBoardClosureRatio, userId]);
  
// const repairBar = [
//     {
//         "hours": 1.5,
//         "name": 1,
//         "Date": "2024-09-01T00:00:00.000+00:00"
//     },
//     {
//         "hours": 2.7,
//         "name": 2,
//         "Date": "2024-09-02T00:00:00.000+00:00"
//     },
//     {
//         "hours": 3.0,
//         "name": 3,
//         "Date": "2024-09-03T00:00:00.000+00:00"
//     },
//     {
//         "hours": 5.5,
//         "name": 4,
//         "Date": "2024-09-04T00:00:00.000+00:00"
//     }]

//   return (
//     <>
// <div class="mr-5 ml-5 mt-4 h-[21rem] w-wk">  
//       <div class=" flex justify-between" >
//       <span>
//       <FormattedMessage
//                         id="app.hours"
//                         defaultMessage="Hours"
//                       />
        
//         </span>
//    <TimeInterval
//             times={dateClosureRangeList}
//             handleClick={setSelectedClosureTimeIntervalReport}
//           />
//         </div>
//     <BarChart
//       width={350}
//       height={200}
//       data={repairBar}
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
//     </BarChart>
//     </div>
//     </>
//   );
// }
 
// const mapStateToProps = ({ dashboard,auth,opportunity }) => ({
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

//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(DashRepairBarClousreJumpstartUser);



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
    <div>
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






