import React, {  useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Funnel } from '@ant-design/plots';
import {getAllDashboardFunnelRecord} from "../Dashboard/DashboardAction";
import { BundleLoader } from '../../Components/Placeholder';




const FunnelChartAll = (props) => {
  useEffect(() => {
      props.getAllDashboardFunnelRecord(props.userId,props.department);
  }, []);
  if (props.fetchingallDashBoardFunnel) {
    return       <BundleLoader
  />
    
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
  
  // const data=props.alldashboardFunnel
    //   let result = Object.keys(data1).map(key => {
    //         return ({ stage: key, number: data1[key] })
    //       }
    //       )
    // console.log("result",data1)
  const config = {
    data: props.alldashboardFunnel,
    xField: 'stage',
     yField: 'number',
     color:color
    // dynamicHeight: true,
    // legend: false,
  };
  return <Funnel {...config} />;

};

const mapStateToProps = ({ dashboard, auth }) => ({

  userId: auth.userDetails.userId,
  department:auth.userDetails.department,
  alldashboardFunnel:dashboard.alldashboardFunnel,
  fetchingallDashBoardFunnel:dashboard.fetchingallDashBoardFunnel
//   fetchingDashBoardFunnel:dashboard.fetchingDashBoardFunnel,
//   fetchingDashBoardFunnelError:dashboard.fetchingDashBoardFunnelError,
//   dashboardFunnel:dashboard.dashboardFunnel
    });
    
    const mapDispatchToProps = (dispatch) =>
      bindActionCreators(
        {
          getAllDashboardFunnelRecord
        //   getDashboardFunnelRecord
        },
        dispatch
      );
    
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(FunnelChartAll);
