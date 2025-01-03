import React, {useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyledTable } from "../../../Components/UI/Antd";
import {getPitchWarmList} from "../DashboardAction";

function PitchWarmTable (props) {
    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getPitchWarmList(props.userId,props.endDate,props.startDate);
      }
      else {
        props.getPitchWarmList(props.userId,props.endDate,props.startDate);
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
        title:"Company Name"
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
          dataSource={props.showWarmedPitch}
          loading={props.fetchingColdesLeads}
        />
      </>
    );
  };
const mapStateToProps = ({dashboard,auth }) => ({
        showWarmedPitch:dashboard.showWarmedPitch,
        userId: auth.userDetails.userId,
        fetchingWarmedPitch:dashboard.fetchingWarmedPitch,
        timeRangeType:dashboard.timeRangeType,
        startDate: dashboard.startDate,
        endDate: dashboard.endDate,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getPitchWarmList,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(PitchWarmTable);