import React,{useEffect,useState} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import { base_url2} from "../../../../Config/Auth";
import ReactApexChart from 'react-apexcharts';
import { BundleLoader } from '../../../../Components/Placeholder';

const DynamicBarChart = (props) => {
  useEffect(()=>{
    fetchDashbysectorChart();
       }, [props.timeRangeType]);

const [dashSectorChart,setdashSectorChart] = useState({});
const[loading,setLoading]=useState(true);
const[error,setError]=useState(null);

  const fetchDashbysectorChart = async () => {
    try {
      const response = await axios.get(`${base_url2}/distributor/BarCht/${props.userId}/${props.timeRangeType}/${props.dtype}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      });
      setdashSectorChart(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  

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
    <div className="w-wk">
      <ReactApexChart
        options={options}
        series={options.series}
        type="bar"
        height={160}
      />
    </div>
  );
};

export default DynamicBarChart;






