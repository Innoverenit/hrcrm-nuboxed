import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Funnel } from '@ant-design/plots';
import {getDashboardFunnelRecord} from "../Dashboard/DashboardAction";
import { BundleLoader } from "../../Components/Placeholder";


const DemoFunnel = (props) => {
  useEffect(() => {
      props.getDashboardFunnelRecord(props.orgId);
  }, []);
  if (props.fetchingDashBoardFunnel) {
    return <div style={{
         margin:"10% 0 0 30%"}}
    >
    < BundleLoader
    background={"transparent"}
    // desktopSize={"60px"}
    // mobileSize={"150px"}
    size={"30px"}
    // text={"Wifi Loader"}
    backColor="#E8F2FC"
    frontColor="#4645F6"
    // style={{
    //   placeItems: "center",
    //   marginTop:"10%"
    // }}
  /></div>   
;
  }
  const data = [
    {
      stage: 'onBoarded',
      number: 200,
    },
    {
      stage: 'openRequirement',
      number: 155,
    },
    {
      stage: 'selectted',
      number: 120,
    },
    {
      stage: 'submitted',
      number: 110,
    }    
  ];
  const color= ['#d62728', '#2ca02c', '#000000']
  
  const data1=props.dashboardFunnel
    //   let result = Object.keys(data1).map(key => {
    //         return ({ stage: key, number: data1[key] })
    //       }
    //       )
    console.log("result",data1)
  const config = {
    data: props.dashboardFunnel,
    xField: 'stage',
     yField: 'number',
     color:color
    // dynamicHeight: true,
    // legend: false,
  };
  return <Funnel {...config} />;
};

const mapStateToProps = ({ dashboard, auth }) => ({
  orgId: auth.userDetails.organizationId,
  fetchingDashBoardFunnel:dashboard.fetchingDashBoardFunnel,
  fetchingDashBoardFunnelError:dashboard.fetchingDashBoardFunnelError,
  dashboardFunnel:dashboard.dashboardFunnel
    });
    
    const mapDispatchToProps = (dispatch) =>
      bindActionCreators(
        {
          getDashboardFunnelRecord
        },
        dispatch
      );
    
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(DemoFunnel);

// import React, { useState, useEffect } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {getDashboardFunnelRecord} from "../Dashboard/DashboardAction";
// import { BundleLoader } from '../../Components/Placeholder';
// import ReactDOM from 'react-dom';
// import { Funnel } from '@ant-design/plots';

// const DemoFunnel = (props) => {
//     useEffect(() => {
//       props.getDashboardFunnelRecord(props.orgId);
//   }, []);
//   if (props.fetchingDashBoardFunnel) {
//     return <BundleLoader/>;
//   }
//   const data = [
//     {
//       stage: '简历筛选',
//       number: 253,
//     },
//     {
//       stage: '初试人数',
//       number: 151,
//     },
//     {
//       stage: '复试人数',
//       number: 113,
//     },
//     {
//       stage: '录取人数',
//       number: 87,
//     },
//     {
//       stage: '入职人数',
//       number: 59,
//     },
//   ];
//   const data1=props.dashboardFunnel
//   console.log("data",data1)
//   const config = {
//     data: data1,
//     xField: 'stage',
//     yField: 'number',
//     dynamicHeight: true,
//     legend: false,
//   };
//   return <Funnel {...config} />;
// };


// const mapStateToProps = ({ dashboard, auth }) => ({
//   orgId: auth.userDetails.organizationId,
//   fetchingDashBoardFunnel:dashboard.fetchingDashBoardFunnel,
//   fetchingDashBoardFunnelError:dashboard.fetchingDashBoardFunnelError,
//   dashboardFunnel:dashboard.dashboardFunnel
//     });
    
//     const mapDispatchToProps = (dispatch) =>
//       bindActionCreators(
//         {
//           getDashboardFunnelRecord
//         },
//         dispatch
//       );
    
//     export default connect(
//       mapStateToProps,
//       mapDispatchToProps
//     )(DemoFunnel);
