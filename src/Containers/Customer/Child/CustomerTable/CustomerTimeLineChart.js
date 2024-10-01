// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const TimelineChart = () => {
//   const options = {
//     series: [
//       {
//         data: [
//           {
//             x: 'Analysis',
//             y: [
//               new Date('2019-02-27').getTime(),
//               new Date('2019-03-04').getTime()
//             ],
//             fillColor: '#008FFB'
//           },
//           {
//             x: 'Design',
//             y: [
//               new Date('2019-03-04').getTime(),
//               new Date('2019-03-08').getTime()
//             ],
//             fillColor: '#00E396'
//           },
//           {
//             x: 'Coding',
//             y: [
//               new Date('2019-03-07').getTime(),
//               new Date('2019-03-10').getTime()
//             ],
//             fillColor: '#775DD0'
//           },
//           {
//             x: 'Testing',
//             y: [
//               new Date('2019-03-08').getTime(),
//               new Date('2019-03-12').getTime()
//             ],
//             fillColor: '#FEB019'
//           },
//           {
//             x: 'Deployment',
//             y: [
//               new Date('2019-03-12').getTime(),
//               new Date('2019-03-17').getTime()
//             ],
//             fillColor: '#FF4560'
//           }
//         ]
//       }
//     ],
//     chart: {
//       height: 350,
//       type: 'rangeBar'
//     },
//     plotOptions: {
//       bar: {
//         horizontal: true,
//         distributed: true,
//         dataLabels: {
//           hideOverflowingLabels: false
//         }
//       }
//     },
//     dataLabels: {
//       enabled: true,
//       formatter: function (val, opts) {
//         const label = opts.w.globals.labels[opts.dataPointIndex];
//         const startDate = new Date(val[0]);
//         const endDate = new Date(val[1]);
//         const diff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)); // Calculate difference in days
//         return `${label}: ${diff} ${diff > 1 ? 'days' : 'day'}`;
//       },
//       style: {
//         colors: ['#f3f4f5', '#fff']
//       }
//     },
//     xaxis: {
//       type: 'datetime'
//     },
//     yaxis: {
//       show: false // Hides the y-axis to make it cleaner
//     },
//     grid: {
//       row: {
//         colors: ['#f3f4f5', '#fff'], // Alternating row colors for better readability
//         opacity: 1
//       }
//     }
//   };

//   return (
//     <div>
//       <ReactApexChart options={options} series={options.series} type="rangeBar" height={350} />
//     </div>
//   );
// };

// export default TimelineChart;


import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {getCustomerDonut} from "../../CustomerAction"
import { bindActionCreators } from "redux";
import ReactApexChart from 'react-apexcharts';

const GradientDonutChart = (props) => {

  useEffect(() => {
 props.getCustomerDonut( props.customer.customerId)
  }, []);
  // Your chartData object
  const chartData = {
    open: 5,
    closed: 2,
    won: 3,
    lost: 1
  };

  // Extracting the values from chartData
  const series = Object.values(props.customerDonut);

  // Chart options
  const options = {
    labels: Object.keys(props.customerDonut),  // Use keys from chartData as labels
    chart: {
      width: 380,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient'
    },
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="donut" width={options.chart.width} />
    </div>
  );
};



const mapStateToProps = ({ auth, account, customer,opportunity }) => ({
  customerDonut:customer.customerDonut
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCustomerDonut
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(GradientDonutChart);



