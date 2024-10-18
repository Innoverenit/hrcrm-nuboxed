import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChartDashedCustom = () => {
  const options = {
    series: [
      {
        name: "Session Duration",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
      },
      {
        name: "Page Views",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
      },
      {
        name: 'Total Visits',
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
      }
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [5, 7, 5], // Custom stroke widths for each series
      curve: 'straight', // Straight lines
      dashArray: [0, 8, 5] // Different line styles: solid, dashed, and dashed
    },
    title: {
      text: 'Page Statistics',
      align: 'left'
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          ' - <strong>' +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          '</strong>'
        );
      }
    },
    markers: {
      size: 0, // No marker points on the lines
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: [
        '01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan',
        '08 Jan', '09 Jan', '10 Jan', '11 Jan', '12 Jan'
      ], // X-axis categories (dates)
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val + " (mins)"; // Tooltip for session duration
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val + " per session"; // Tooltip for page views
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val; // Tooltip for total visits
            }
          }
        }
      ]
    },
    grid: {
      borderColor: '#f1f1f1' // Gridline color
    }
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={options.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChartDashedCustom;
