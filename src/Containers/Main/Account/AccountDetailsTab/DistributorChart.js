import React, { useState,useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getDistibutorBarChart} from "../AccountAction"

const jsonData = [
  {
    month: "Jan",
    value: "20",
  },
  {
    month: "Feb",
    value: "40",
  },
  {
    month: "March",
    value: "60",
  },
  {
    month: "April",
    value: "80",
  },
  {
    month: "May",
    value: "100",
  },
];

const ApexChart = (props) => {
  // Extract data from jsonData

  useEffect(() => {
props.getDistibutorBarChart();
  }, []);
  const categories = jsonData.map((item) => item.month); // For x-axis
  const values = jsonData.map((item) => parseInt(item.value, 10)); // For data values

  const [chartOptions] = useState({
    series: [
      {
        name: 'Values', // Adjust name as needed
        data: values,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: categories, // Use the months from jsonData for categories
      },
      yaxis: {
        title: {
          text: 'Values',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};


const mapStateToProps = ({ auth, distributor, opportunity }) => ({
    distributorChartList:distributor.distributorChartList,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getDistibutorBarChart
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(ApexChart);



