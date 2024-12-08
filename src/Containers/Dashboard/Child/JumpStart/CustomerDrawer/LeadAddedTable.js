import React, {useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getLeadAdded} from "../../../DashboardAction";

function LeadAddedTable (props) {
    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getLeadAdded(props.userId,props.endDate,props.startDate);
      }
      else {
        props.getLeadAdded(props.userId,props.endDate,props.startDate);
      }
    }, [props.userId,props.endDate,props.startDate]);
    const columns = [
      {
        title: "Name"
       ,
        width: "30%",
        dataIndex: "name",
      },
     
      {
        title:"Email Id"
      ,
        width: "22%",
        dataIndex: "email",
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
        title: "Company Name"
     ,
        width: "25%",
        dataIndex: "companyName",
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
          dataSource={props.showAddedLeads}
          loading={props.fetchingLeadsAdded}
        />
      </>
    );
  };
const mapStateToProps = ({dashboard,auth }) => ({
        showAddedLeads:dashboard.showAddedLeads,
        userId: auth.userDetails.userId,
        fetchingLeadsAdded:dashboard.fetchingLeadsAdded,
        timeRangeType:dashboard.timeRangeType,
        startDate: dashboard.startDate,
        endDate: dashboard.endDate,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getLeadAdded,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(LeadAddedTable);