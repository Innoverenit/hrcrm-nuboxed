import React, {useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getDealAdded} from "../../../DashboardAction";

function DealAddedTable (props) {

    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getDealAdded(props.userId,props.endDate,props.startDate);
      }
      else {
        props.getDealAdded(props.userId,props.endDate,props.startDate); 
      }
    }, [props.userId,props.endDate,props.startDate]);
    const columns = [
      {
        title:"Name"
      ,
        width: "30%",
        dataIndex: "opportunityName",
      },
     
      {
        title:"Proposal Value"
      ,
        width: "22%",
        dataIndex: "proposalAmount",
        defaultSortOrder: 'descend',    
      },
      {
        title: "Status",
        width: "25%",
        dataIndex: "stageName",    
      },
    ];
  
    return (
      <>
        <StyledTable
          columns={columns}
          dataSource={props.showAddedDeal}
          loading={props.fetchingPitchAdded}
        />
      </>
    );
  }
  const mapStateToProps = ({dashboard,auth }) => ({
    showAddedDeal:dashboard.showAddedDeal,
    userId: auth.userDetails.userId,
    fetchingDealAdded:dashboard.fetchingDealAdded,
    timeRangeType:dashboard.timeRangeType,
    startDate: dashboard.startDate,
    endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getDealAdded,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(DealAddedTable);