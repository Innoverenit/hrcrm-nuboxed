import React, {useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getOppoAdded} from "../../../DashboardAction";

function OppoAddedTable (props) {
    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getOppoAdded(props.userId,props.endDate,props.startDate);
      }else {
        props.getOppoAdded(props.userId,props.endDate,props.startDate);
      }
    },[props.endDate,props.startDate]);
    const columns = [
      {
        title: "Name"
      ,
        width: "30%",
        dataIndex: "opportunityName",
      },
     
      {
        title: "Proposal Value"
       ,
        width: "22%",
        dataIndex: "proposalAmount",
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.proposalAmount - b.proposalAmount,
  
        // render: (name, item, i) => {
        //   return (
        //     <span>
        //       <CurrencySymbol currencyType={this.props.currency} />{" "}
        //       {`${item.proposalAmount}`}
        //     </span>
        //   );
        // },
      },
      {
        title: "Status",
      
        width: "25%",
        dataIndex: "stageName",
        // sorter: (a, b) => {
        //   const stageNameA = a.stageName && a.stageName.toLowerCase();
        //   const stageNameB = b.stageName && b.stageName.toLowerCase();
        //   if (stageNameA < stageNameB) {
        //     return -1;
        //   }
        //   if (stageNameA > stageNameB) {
        //     return 1;
        //   }
        //   return 0;
        // },
      },
    ];
  
    return (
      <>
        <StyledTable
          columns={columns}
          dataSource={props.showAddedOppo}
          loading={props.fetchingLeadsAdded}
        />
      </>
    );
  };
const mapStateToProps = ({dashboard,auth }) => ({
        showAddedOppo:dashboard.showAddedOppo,
        userId: auth.userDetails.userId,
        fetchingLeadsAdded:dashboard.fetchingLeadsAdded,
        timeRangeType:dashboard.timeRangeType,
        startDate: dashboard.startDate,
        endDate: dashboard.endDate,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getOppoAdded,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(OppoAddedTable);