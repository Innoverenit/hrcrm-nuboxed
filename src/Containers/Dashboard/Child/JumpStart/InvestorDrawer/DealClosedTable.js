import React, {useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getDealClosed} from "../../../DashboardAction";

function DealClosedTable (props) {

    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getDealClosed(props.userId,props.endDate,props.startDate);
      }
      else {
        props.getDealClosed(props.userId,props.endDate,props.startDate); 
      }
    }, [props.userId,props.endDate,props.startDate]);

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
          dataSource={props.showClosedDeal}
          loading={props.fetchingPitchAdded}
        />
      </>
    );
  }
  const mapStateToProps = ({dashboard,auth }) => ({
    showClosedDeal:dashboard.showClosedDeal,
    userId: auth.userDetails.userId,
    fetchingDealClosed:dashboard.fetchingDealClosed,
    timeRangeType:dashboard.timeRangeType,
    startDate: dashboard.startDate,
    endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getDealClosed,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(DealClosedTable);