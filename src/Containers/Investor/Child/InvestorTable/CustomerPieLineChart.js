// import React from "react";
// import Chart from "react-apexcharts";  // Correct import statement

// const SteplineChart = () => {
//   const options = {
//     chart: {
//       type: 'line',
//     },
//     stroke: {
//       curve: 'stepline', // Stepline curve
//     },
//     xaxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis categories
//     },
//     title: {
//       text: 'Stepline Chart Example',
//       align: 'center',
//     },
//   };

//   const series = [
//     {
//       name: "Sales",
//       data: [10, 41, 35, 51, 49, 62, 69], // Data points
//     },
//   ];

//   return (
//     <div>
//       <Chart options={options} series={series} type="line" height={350} />
//     </div>
//   );
// };

// export default SteplineChart;



import React from "react";
import Chart from "react-apexcharts";  // Correct import statement

const SteplineChart = () => {
  const initialdata = [
    { value: 20, date: '01-10-2024' },
    { value: 30, date: '02-10-2024' },
    { value: 40, date: '03-10-2024' },
    { value: 50, date: '04-10-2024' },
  ];

  // Map the initialdata to the required format
  const categories = initialdata.map(item => item.date);  // Extract dates for x-axis
  const dataValues = initialdata.map(item => item.value);  // Extract values for series

  const options = {
    chart: {
      type: 'line',
    },
    stroke: {
      curve: 'stepline', // Stepline curve
    },
    xaxis: {
      categories: categories,  // Use mapped dates
    },
    title: {
      text: 'Stepline Chart Example',
      align: 'center',
    },
  };

  const series = [
    {
      name: "Activity",
      data: dataValues,  // Use mapped values
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default SteplineChart;

