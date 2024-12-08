import React, {useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyledTable } from "../../../Components/UI/Antd";
import {getPitchHotList} from "../DashboardAction";

function PitchHotTable (props) {
    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getPitchHotList(props.userId,props.endDate,props.startDate);
      }
      else {
        props.getPitchHotList(props.userId,props.endDate,props.startDate);
      }
    }, [props.userId,props.endDate,props.startDate]);
    const columns = [
      {
        title: "Name"
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
          dataSource={props.showHottestPitch}
          loading={props.fetchingHottestLeads}
        />
      </>
    );
  };
const mapStateToProps = ({dashboard,auth }) => ({
        showHottestPitch:dashboard.showHottestPitch,
        userId: auth.userDetails.userId,
        fetchingHottestPitch:dashboard.fetchingHottestPitch,
        timeRangeType:dashboard.timeRangeType,
        startDate: dashboard.startDate,
        endDate: dashboard.endDate,
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getPitchHotList,
      },
      dispatch
    );

    export default connect(mapStateToProps, mapDispatchToProps)(PitchHotTable);