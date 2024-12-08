import React, { useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyledTable } from "../../../Components/UI/Antd";
import {getLeadWarmList} from "../DashboardAction";

function LeadWarmTable (props) {
    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getLeadWarmList(props.userId,props.endDate,props.startDate);
      }
      else {
        props.getLeadWarmList(props.userId,props.endDate,props.startDate);
      }
    }, [props.userId,props.endDate,props.startDate]);
    const columns = [
      {
        title:"Name"
       ,
        width: "30%",
        dataIndex: "name",
      },
     
      {
        title: "Email Id"
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
          dataSource={props.showWarmedLeads}
          loading={props.fetchingColdesLeads}
        />
      </>
    );
  };
const mapStateToProps = ({dashboard,auth }) => ({
        showWarmedLeads:dashboard.showWarmedLeads,
        userId: auth.userDetails.userId,
        fetchingWarmedLeads:dashboard.fetchingWarmedLeads,
        timeRangeType:dashboard.timeRangeType,
        startDate: dashboard.startDate,
        endDate: dashboard.endDate,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getLeadWarmList,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(LeadWarmTable);