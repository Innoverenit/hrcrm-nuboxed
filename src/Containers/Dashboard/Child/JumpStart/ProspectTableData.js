import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {getProspectTableData} from "../../../Dashboard/DashboardAction";
import { Tooltip } from "antd";
//import { BundleLoader } from "../../Components/Placeholder";

function ProspectTableData (props) {
    useEffect(()=>{
     props.getProspectTableData(props.selectedCountry)
    }, []);

    // const columns = [
    //   {
    //     title: <FormattedMessage
    //       id="app.name"
    //       defaultMessage="Name"
    //     />,
    //     width: "30%",
    //     dataIndex: "name",
    //   },
     
    //   {
    //     title: <FormattedMessage
    //       id="app.emailId"
    //       defaultMessage="Email Id"
    //     />,
    //     width: "22%",
    //     dataIndex: "email",
    //     defaultSortOrder: 'descend',
    //     // sorter: (a, b) => a.proposalAmount - b.proposalAmount,
  
    //     // render: (name, item, i) => {
    //     //   return (
    //     //     <span>
    //     //       <CurrencySymbol currencyType={this.props.currency} />{" "}
    //     //       {`${item.proposalAmount}`}
    //     //     </span>
    //     //   );
    //     // },
    //   },
    //   {
    //     // title: "Status",
    //     title: <FormattedMessage
    //       id="app.companyName"
    //       defaultMessage="Company Name"
    //     />,
    //     width: "25%",
    //     dataIndex: "companyName",
    //     // sorter: (a, b) => {
    //     //   const stageNameA = a.stageName && a.stageName.toLowerCase();
    //     //   const stageNameB = b.stageName && b.stageName.toLowerCase();
    //     //   if (stageNameA < stageNameB) {
    //     //     return -1;
    //     //   }
    //     //   if (stageNameA > stageNameB) {
    //     //     return 1;
    //     //   }
    //     //   return 0;
    //     // },
    //   },
    // ];
    // if (props.fetchingProspectTableData) return <BundleLoader/>;
  
    return (
      <>
      Hello
        {/* <StyledTable
          columns={columns}
          dataSource={props.showQualifiedLeads}
          loading={props.fetchingLeadsQualified}
        /> */}
      </>
    );
  }
  const mapStateToProps = ({dashboard,auth }) => ({
    fetchingProspectTableData:dashboard.fetchingProspectTableData,
    // userId: auth.userDetails.userId,
    // fetchingLeadsQualified:dashboard.fetchingLeadsQualified,
    // timeRangeType:dashboard.timeRangeType,
    prospectTableData: dashboard.prospectTableData,
    // endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getProspectTableData,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ProspectTableData);