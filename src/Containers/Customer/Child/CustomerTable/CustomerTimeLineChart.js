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


import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GradientDonutChart = () => {
  const options = {
    series: [44, 55, 41, 17, 15],  // Data for the chart
    chart: {
      width: 380,  // Chart width
      type: 'donut',  // Chart type
    },
    plotOptions: {
      pie: {
        startAngle: -90,  // Custom start angle
        endAngle: 270     // Custom end angle
      }
    },
    dataLabels: {
      enabled: false  // Disable data labels
    },
    fill: {
      type: 'gradient'  // Gradient fill
    },
    legend: {
      formatter: function(val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];  // Custom legend text
      }
    },
    // title: {
    //   text: 'Gradient Donut with custom Start-angle'  // Title for the chart
    // },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200  // Responsive chart width for smaller screens
          },
          legend: {
            position: 'bottom'  // Legend position for smaller screens
          }
        }
      }
    ]
  };

  const series = [44, 55, 41, 17, 15];  // Data for the donut chart

  return (
    <div>
      <ReactApexChart options={options} series={series} type="donut" width={options.chart.width} />
    </div>
  );
};

export default GradientDonutChart;
