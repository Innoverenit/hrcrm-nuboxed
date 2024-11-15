import React,{useEffect,useState} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import { base_url2} from "../../../../Config/Auth";
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
      const response = await axios.get(`${base_url2}/dashboard/customerBySector/${props.userId}/${props.timeRangeType}`,{
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
     labels: Object.keys(dashSectorChart),  // Use keys from chartData as labels
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


  // const series = [44, 55, 41, 17, 15];  // Data for the donut chart
  if (loading){
    return <BundleLoader/>
  }

  return (
    <div className=' w-[23vw]'>
      {error ? <div class="text-red">No Data</div>:
      <ReactApexChart options={options} series={series} type="donut" width={options.chart.width} />}
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