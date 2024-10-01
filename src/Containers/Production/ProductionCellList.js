import React, { useEffect,useState} from 'react';
import { Card, Progress } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getProductionCellList} from "../Production/ProductionAction"
import { MultiAvatar } from '../../Components/UI/Elements';

const data = [
  {
    location: 'Head Office',
    cellname: 'Cell 1',
    itemName: 'Item X',
    userList: ['User1', 'User2', 'User3'],
    progress: 40  // Assuming progress is a percentage (e.g., 40%)
  },
  {
    location: 'Dordrecht',
    cellname: 'Cell 2',
    itemName: 'Item Y',
    userList: ['User4', 'User5'],
    progress: 70
  },
  {
    location: 'Test',
    cellname: 'Cell 2',
    itemName: 'Item Y',
    userList: ['User4', 'User5'],
    progress: 60
  },
  // Add more objects as needed
];

const ItemCards = (props) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Function to get today's date in the desired format
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}T00:00:00Z`;
  };
  useEffect(() => {
    const today = getTodayDate();
    setStartDate(today);
    setEndDate(today);
  }, []);
  console.log(startDate)

  useEffect(() => {
    props.getProductionCellList(props.orgId,startDate,endDate);
    // setPage(page + 1);
    // props.getRoomRackByLocId(props.locationId, props.orgId);
}, [startDate,endDate]);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {/* {data.map((item, index) => ( */}
         {props.productionCellList.map((item, index) => (
        <Card key={index} title={`${item.locationName} - ${item.cellChamber}`}>
          <p><strong>Item Name:</strong> {item.productName}</p>
          <Progress percent={item.percent==="Infinity"?0:item.percent} />
          {item.userList.map((itemlist, ind) => {
              return (
          // <p><strong>User List:</strong> {item.userList.join(', ')}</p>
          <MultiAvatar
          primaryTitle={itemlist.userName}
          imgWidth={"1.8rem"}
          imgHeight={"1.8rem"}
          />
              )
        })}
        </Card>
      ))}
    </div>
  );
};


const mapStateToProps = ({ production,auth }) => ({
  
  productionCellList:production.productionCellList,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      getProductionCellList,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ItemCards);


// import React from "react";
// import Chart from "react-apexcharts";

// const HeatmapChart = () => {
//   // Function to generate random data
//   const generateData = (count, yrange) => {
//     const series = [];
//     for (let i = 0; i < count; i++) {
//       const x = `W${i + 1}`;
//       const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
//       series.push({ x, y });
//     }
//     return series;
//   };

//   const options = {
//     series: [
//       {
//         name: "Jan",
//         data: generateData(20, { min: -30, max: 55 }),
//       },
//       {
//         name: "Feb",
//         data: generateData(20, { min: -30, max: 55 }),
//       },
//       {
//         name: "Mar",
//         data: generateData(20, { min: -30, max: 55 }),
//       },
//       {
//         name: "Apr",
//         data: generateData(20, { min: -30, max: 55 }),
//       },
//       {
//         name: "May",
//         data: generateData(20, { min: -30, max: 55 }),
//       },
//       {
//         name: "Jun",
//         data: generateData(20, { min: -30, max: 55 }),
//       },
//       {
//         name: "Jul",
//         data: generateData(20, { min: -30, max: 55 }),
//       },
//       {
//         name: "Aug",
//         data: generateData(20, { min: -30, max: 55 }),
//       },
//       {
//         name: "Sep",
//         data: generateData(20, { min: -30, max: 55 }),
//       },
//     ],
//     chart: {
//       height: 350,
//       type: "heatmap",
//     },
//     plotOptions: {
//       heatmap: {
//         shadeIntensity: 0.5,
//         radius: 0,
//         useFillColorAsStroke: true,
//         colorScale: {
//           ranges: [
//             {
//               from: -30,
//               to: 5,
//               name: "low",
//               color: "#00A100",
//             },
//             {
//               from: 6,
//               to: 20,
//               name: "medium",
//               color: "#128FD9",
//             },
//             {
//               from: 21,
//               to: 45,
//               name: "high",
//               color: "#FFB200",
//             },
//             {
//               from: 46,
//               to: 55,
//               name: "extreme",
//               color: "#FF0000",
//             },
//           ],
//         },
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       width: 1,
//     },
//     title: {
//       text: "HeatMap Chart with Color Range",
//     },
//   };

//   return (
//     <div>
//       <Chart options={options} series={options.series} type="heatmap" height={350} />
//     </div>
//   );
// };

// export default HeatmapChart;

