import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactApexChart from 'react-apexcharts';
import {getOppPulseData} from "../../OpportunityAction"

const TimelineChart = (props) => {


  useEffect(() => {
    props.getOppPulseData(props.currentOpportunityId.opportunityId,props.currentOpportunityId.oppWorkflowId)
  }, []);
  const options = {
    series: [
      {
        data: [
          {
            x: 'Analysis',
            y: [
              new Date('2019-02-27').getTime(),
              new Date('2019-03-04').getTime()
            ],
            fillColor: '#008FFB'
          },
          {
            x: 'Design',
            y: [
              new Date('2019-03-04').getTime(),
              new Date('2019-03-08').getTime()
            ],
            fillColor: '#00E396'
          },
          {
            x: 'Coding',
            y: [
              new Date('2019-03-07').getTime(),
              new Date('2019-03-10').getTime()
            ],
            fillColor: '#775DD0'
          },
          {
            x: 'Testing',
            y: [
              new Date('2019-03-08').getTime(),
              new Date('2019-03-12').getTime()
            ],
            fillColor: '#FEB019'
          },
          {
            x: 'Deployment',
            y: [
              new Date('2019-03-12').getTime(),
              new Date('2019-03-17').getTime()
            ],
            fillColor: '#FF4560'
          }
        ]
      }
    ],
    chart: {
      height: 350,
      type: 'rangeBar'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        dataLabels: {
          hideOverflowingLabels: false
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const label = opts.w.globals.labels[opts.dataPointIndex];
        const startDate = new Date(val[0]);
        const endDate = new Date(val[1]);
        const diff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)); // Calculate difference in days
        return `${label}: ${diff} ${diff > 1 ? 'days' : 'day'}`;
      },
      style: {
        colors: ['#f3f4f5', '#fff']
      }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      show: false // Hides the y-axis to make it cleaner
    },
    grid: {
      row: {
        colors: ['#f3f4f5', '#fff'], // Alternating row colors for better readability
        opacity: 1
      }
    }
  };

  return (
    <div>
      <ReactApexChart options={options} series={options.series} type="rangeBar" height={350} />
    </div>
  );
};


const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
 

 

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOppPulseData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TimelineChart);


