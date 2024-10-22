// import React from 'react';
// import { PieChart, Pie, Cell } from 'recharts';

// const data = [
//   { name: 'A', value: 400 },
//   { name: 'B', value: 300 },
//   { name: 'C', value: 300 },
//   { name: 'D', value: 200 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const PieChartComponent = () => {
//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         data={data}
//         cx={200}
//         cy={200}
//         innerRadius={60}
//         outerRadius={80}
//         fill="#8884d8"
//         paddingAngle={5}
//         dataKey="value"
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//     </PieChart>
//   );
// };

// export default PieChartComponent;


// import React,{useEffect} from 'react';
// import Chart from 'react-apexcharts';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {getCustomerChart} from "../../DashboardAction";
// import { BundleLoader } from '../../../../Components/Placeholder';

// // const data = {
// //   series: [400, 300, 300, 200],
// //   options: {
// //     chart: {
// //       type: 'pie',
// //     },
// //     labels: ['A', 'B', 'C', 'D'],
// //     colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
// //   },
// // };

// const PieChartComponent = (props) => {
//     useEffect(()=> {
       
//        props.getCustomerChart(props.orgId);

      
//       },[props.orgId,]);
//       if(props.gettingCustomerChart){
//         return <BundleLoader/>
//       }
//       const labels = props.customerDashboardChart.map(item => item.type);
//   const counts = props.customerDashboardChart.map(item => item.count);
//   const series = counts;
//   const options = {
//     chart: {
//       type: 'pie',
//     },
//     labels: labels,
//     colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'], // You can customize colors here
//   };
//   return (
//     <div className="pie-chart">
//       {/* <Chart
//         options={data.options}
//         series={data.series}
//         type="pie"
//         // width="400"
//         height={300} // Adjust height here
//         width={300}
//       /> */}

// <Chart options={options} series={series} type="pie" height={300} width={300} />
//     </div>
//   );
// };

// const mapStateToProps = ({ dashboard,auth }) => ({
//     // showHotColdWarm:dashboard.showHotColdWarm,
//     orgId:auth.userDetails.organizationId,
//     timeRangeType:dashboard.timeRangeType,
//     customerDashboardChart:dashboard.customerDashboardChart,
//     startDate: dashboard.startDate,
//     endDate: dashboard.endDate,
//     gettingCustomerChart:dashboard.gettingCustomerChart,
//     // gettingHotColdWarm:dashboard.gettingHotColdWarm,
//     // showHotColdWarm:dashboard.showHotColdWarm,
//     // openLeadHCWdrawer:dashboard.openLeadHCWdrawer
//   });
//   const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         getCustomerChart
//     //   getHotColdWarm,
//     //   handleLeadHCWdrawer
//     },
//     dispatch
//   );
//   export default connect(mapStateToProps, mapDispatchToProps)(PieChartComponent);

// export default PieChartComponent;




import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GradientDonutChart = () => {
  const options = {
    series: [44, 55, 41, 17, 15],  // Data for the chart
    chart: {
      // width: 300,  // Chart width
      type: 'donut',  // Chart type
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
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
            width: 150  // Responsive chart width for smaller screens
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
    <div className=' w-[23vw]'>
      <ReactApexChart options={options} series={series} type="donut" width={options.chart.width} />
    </div>
  );
};

export default GradientDonutChart;
