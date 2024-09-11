import React,{useEffect} from 'react';
import Chart from 'react-apexcharts';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import {getCustomerChart} from "../../DashboardAction";
import { BundleLoader } from '../../../../Components/Placeholder';

const RepairUsrPieChart = (props) => {

    // useEffect(()=> {
    //    props.getCustomerChart(props.orgId);
    //   },[props.orgId,]);
    //   if(props.gettingCustomerChart){
    //     return <BundleLoader/>
    //   }

    const repairUsrPieChart=[    {
        "count": 8,
        "type": "Added"
    },
    {
        "count": 1,
        "type": "Completed"
    },
    {
        "count": 3,
        "type": "Cancelled"
    },
    {
        "count": 2,
        "type": "Pending"
    },
]

      const labels = repairUsrPieChart.map(item => item.type);
  const counts = repairUsrPieChart.map(item => item.count);
  const series = counts;
  const options = {
    chart: {
      type: 'pie',
    },
    labels: labels,
    colors: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'], 
  };
  return (
    <div className="pie-chart">

<Chart options={options} series={series} type="pie" height={200} width={200} />
    </div>
  );
};

const mapStateToProps = ({ dashboard,auth }) => ({
    orgId:auth.userDetails.organizationId,
    timeRangeType:dashboard.timeRangeType,
    customerDashboardChart:dashboard.customerDashboardChart,
    startDate: dashboard.startDate,
    endDate: dashboard.endDate,
    gettingCustomerChart:dashboard.gettingCustomerChart,
  });
  const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        // getCustomerChart
    },
    dispatch
  );
  export default connect(mapStateToProps, mapDispatchToProps)(RepairUsrPieChart);