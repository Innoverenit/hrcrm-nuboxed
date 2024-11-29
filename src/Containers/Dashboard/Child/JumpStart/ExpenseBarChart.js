import React,{useEffect,useState} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import { base_url} from "../../../../Config/Auth";
import ReactApexChart from 'react-apexcharts';
import { BundleLoader } from '../../../../Components/Placeholder';

const ExpenseBarChart = (props) => {
  useEffect(()=>{
    fetchDashbysectorChart();
       }, [props.timeRangeType]);

const [dashSectorChart,setdashSectorChart] = useState({});
const[loading,setLoading]=useState(true);
const[error,setError]=useState(null);

  const fetchDashbysectorChart = async () => {
    try {
      const response = await axios.get(`${base_url}/expense/dashboard/user/barchrt/${props.userId}`,{
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
  
  const getChartData = () => {
    if (!dashSectorChart || Object.keys(dashSectorChart).length === 0) {
      return {
        categories: [],
        series: [],
      };
    }

    const months = Object.keys(dashSectorChart);
    const seriesData = [];
    const allProducts = new Set();

    months.forEach((month) => {
      Object.keys(dashSectorChart[month]).forEach((product) => {
        allProducts.add(product);
      });
    });

    const productList = Array.from(allProducts);
productList.forEach((product) => {
      const productData = months.map((month) => dashSectorChart[month][product] || 0); // If no data for the product in a month, set 0
      seriesData.push({
        name: product,
        data: productData,
      });
    });

    return {
      categories: months,
      series: seriesData,
    };
  };

  const { categories, series } = getChartData();

  const options = {
    series: series,
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
      type: 'category', // X-axis is based on dates
      categories:categories,
      //  [
      //   '01/01/2011 GMT',
      //   '01/02/2011 GMT',
      //   '01/03/2011 GMT',
      //   '01/04/2011 GMT',
      //   '01/05/2011 GMT',
      //   '01/06/2011 GMT'
      // ] // Date categories for x-axis
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
      {/* {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error fetching data</div>
      ) : ( */}
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      
    </div>
  );
};

export default ExpenseBarChart;






