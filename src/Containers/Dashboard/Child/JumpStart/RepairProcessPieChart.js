
import React,{useEffect,useState} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import {base_url2} from "../../../../Config/Auth";
import ReactApexChart from 'react-apexcharts';
import { BundleLoader } from '../../../../Components/Placeholder';
const RepairProcessPieChart = (props) => {

useEffect(()=>{
  fetchDashProcessChart();
     }, [props.timeRangeType]);

const [dashProcessChart,setdashProcessChart] = useState({});
const[loading,setLoading]=useState(true);
const[error,setError]=useState(null);

 const fetchDashProcessChart = async () => {
    try {
      const response = await axios.get(`${base_url2}/dashboard/pieChatApprove/${props.userId}/${props.timeRangeType}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      });
      setdashProcessChart(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };



  const series = Object.values(dashProcessChart);
  const options = {
     labels: Object.keys(dashProcessChart),  // Use keys from chartData as labels
     chart: {
       // width: 300,
       type: 'donut',
     },
     plotOptions: {
       pie: {
         customScale: 0.8,
         startAngle: -90,
         endAngle: 270
       }
     },
     dataLabels: {
       enabled: false
     },
     fill: {
       type: 'gradient'
     },
     legend: {
       formatter: function (val, opts) {
         return val + " - " + opts.w.globals.series[opts.seriesIndex];
       }
     },
     responsive: [
       {
         breakpoint: 480,
         options: {
             donut: {
                 size: '65%'
               },
           chart: {
             width: 150
           },
           legend: {
             position: 'bottom'
           }
         }
       }
     ]
   };


  if (loading){
    return <BundleLoader/>
  }


  return (
    <div className=' w-[23vw]'>
      <ReactApexChart options={options} series={series} 
      type="donut" 
      width={options.chart.width} 
      height={160}
      />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepairProcessPieChart);
