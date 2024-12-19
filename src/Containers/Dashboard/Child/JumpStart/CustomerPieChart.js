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
