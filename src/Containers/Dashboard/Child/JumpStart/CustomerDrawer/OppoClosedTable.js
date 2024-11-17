import React, {useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getOppocLOSED} from "../../../DashboardAction";

function OppoClosedTable (props) {
    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getOppocLOSED(props.userId,props.endDate,props.startDate);
      }
      else{
        props.getOppocLOSED(props.userId,props.endDate,props.startDate);
      }
    },[props.userId,props.endDate,props.startDate]);
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
        // title: "Status",
        title: <FormattedMessage
          id="app.status"
          defaultMessage="Status"
        />,
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
          dataSource={props.showClosedOppo}
          loading={props.fetchingOppoClosed}
        />
      </>
    );
  };
const mapStateToProps = ({dashboard,auth }) => ({
         showClosedOppo:dashboard.showClosedOppo,
        userId: auth.userDetails.userId,
        fetchingOppoClosed:dashboard.fetchingOppoClosed,
        timeRangeType:dashboard.timeRangeType,
        startDate: dashboard.startDate,
        endDate: dashboard.endDate,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getOppocLOSED,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(OppoClosedTable);