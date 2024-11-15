
import React,{useEffect,useState} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import {base_url2} from "../../../Config/Auth";
import ReactApexChart from 'react-apexcharts';
import { BundleLoader } from '../../../Components/Placeholder';

const BarChartCustomer = () => {
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
        },
         columnWidth: '25%'
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
  )(BarChartCustomer);
  