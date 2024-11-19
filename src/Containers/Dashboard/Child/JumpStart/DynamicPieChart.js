
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts'; 
import { BundleLoader } from '../../../../Components/Placeholder';
import { base_url2} from "../../../../Config/Auth";

const DynamicPieChart = (props) => {
  const { dtype, userId, timeRangeType } = props;

  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChartData();
  }, [dtype, userId, timeRangeType]); 

  const fetchChartData = async () => {
    try {
      const response = await axios.get(`${base_url2}/dashboard/piecht/${userId}/${timeRangeType}/${dtype}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
        },
      });
      setChartData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const series = Object.values(chartData);
  const options = {
    labels: Object.keys(chartData),
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    legend: {
      formatter: function (val, opts) {
        return `${val} - ${opts.w.globals.series[opts.seriesIndex]}`;
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 150,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  if (loading) {
    return <BundleLoader />;
  }

  if (error) {
    return <div className="text-red">No Data Available</div>;
  }

  return (
    <div className="w-[23vw]">
      <ReactApexChart options={options} series={series} type="donut" width={options.chart.width} />
    </div>
  );
};

export default DynamicPieChart;
