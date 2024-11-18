import React, {useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getPitchQualified} from "../../../DashboardAction";

function PitchQualifiedTable (props) {
    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getPitchQualified(props.userId,props.endDate,props.startDate);
      }
      else {
        props.getPitchQualified(props.userId,props.endDate,props.startDate);
      }
    }, [props.userId,props.endDate,props.startDate]);
    const columns = [
      {
        title:"Name"
      ,
        width: "30%",
        dataIndex: "firstName",
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
          dataSource={props.showQualifiedPitch}
          loading={props.fetchingPitchQualified}
        />
      </>
    );
  }
  const mapStateToProps = ({dashboard,auth }) => ({
    showQualifiedPitch:dashboard.showQualifiedPitch,
    userId: auth.userDetails.userId,
    fetchingPitchQualified:dashboard.fetchingPitchQualified,
    timeRangeType:dashboard.timeRangeType,
    startDate: dashboard.startDate,
    endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getPitchQualified,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(PitchQualifiedTable);