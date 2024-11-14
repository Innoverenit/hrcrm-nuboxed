import React,{useEffect,useState} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import {base_url} from "../../../../Config/Auth";
import ReactApexChart from 'react-apexcharts';
import { BundleLoader } from '../../../../Components/Placeholder';
const CustomerSectorPieChart = (props) => {

  useEffect(()=>{
    fetchDashbysectorChart();
       }, [props.timeRangeType]);

const [dashSectorChart,setdashSectorChart] = useState({});
const[loading,setLoading]=useState(true);
const[error,setError]=useState(null);

  const fetchDashbysectorChart = async () => {
    try {
      const response = await axios.get(`${base_url}/dashboard/customerBySector/${props.userId}/${props.timeRangeType}`,{
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
  const series = Object.values(dashSectorChart);
  const options = {
    series: Object.keys(dashSectorChart),
    // [44, 55, 41, 17, 15],  
    // Data for the chart
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

  // const series = [44, 55, 41, 17, 15];  // Data for the donut chart
  if (loading){
    return <BundleLoader/>
  }

  return (
    <div className=' w-[23vw]'>
      <ReactApexChart options={options} series={series} type="donut" width={options.chart.width} />
    </div>
  );
};
const mapStateToProps = ({ dashboard, auth }) => ({
  orgId: auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  timeRangeType: dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(mapStateToProps,mapDispatchToProps)(CustomerSectorPieChart);