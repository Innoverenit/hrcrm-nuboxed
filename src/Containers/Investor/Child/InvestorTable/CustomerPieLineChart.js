import React from "react";
import Chart from "react-apexcharts";  // Correct import statement

const SteplineChart = () => {
  const options = {
    chart: {
      type: 'line',
    },
    stroke: {
      curve: 'stepline', // Stepline curve
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis categories
    },
    title: {
      text: 'Stepline Chart Example',
      align: 'center',
    },
  };

  const series = [
    {
      name: "Sales",
      data: [10, 41, 35, 51, 49, 62, 69], // Data points
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default SteplineChart;
