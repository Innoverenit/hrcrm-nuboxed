import React, {useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getDealAdded} from "../../../DashboardAction";

function DealAddedTable (props) {

    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getDealAdded(props.userId,props.startDate,props.endDate);
      }
      else {
        props.getDealAdded(props.userId,props.startDate,props.endDate); 
      }
    }, [props.userId,props.startDate,props.endDate]);
    const columns = [
      {
        title: <FormattedMessage
          id="app.name"
          defaultMessage="Name"
        />,
        width: "30%",
        dataIndex: "opportunityName",
      },
     
      {
        title: <FormattedMessage
          id="app.proposalvalue"
          defaultMessage="Proposal Value"
        />,
        width: "22%",
        dataIndex: "proposalAmount",
        defaultSortOrder: 'descend',    
      },
      {
        // title: "Status",
        title: <FormattedMessage
          id="app.status"
          defaultMessage="Status"
        />,
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