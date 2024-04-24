import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
// import { CurrencySymbol } from "../../../../Components/Common";
// import AccountOwnerDetail from "./AccountOwnerDetail";
// import { getAccounts } from "../../AccountAction";
// import { accountSelector } from "../../AccountSelector";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
// import { Link } from "../../../../Components/Common";
// import CurrencyCompressor from "../../../../Components/Common/CurrencyCompressor";
// import AccountInitiative from "./AccountInitiative";
import { getOpportunityListByPartnerId } from "../../../../PartnerAction";
// import OpportunityDetailView from "./OpportunityDetailView";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function OpportunityTable(props) {
  useEffect(() => {
    props.getOpportunityListByPartnerId(props.partnerId);
  }, []);
  console.log(props.partnerId);
  const {
    fetchingPartnerOpportunity,
    opportunityByPartnerId,
    fetchingPartnerOpportunityError,
  } = props;
  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      title: "",
      dataIndex: "imageId",
      width: "5%",
      render: (name, item, i) => {
        return (
          <SubTitle>
            <MultiAvatar
              primaryTitle={item.accountName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"40px"}
              imgHeight={"40px"}
            />
          </SubTitle>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "opportunityName",
      defaultSortOrder: "ascend",
      width: "20%",
      // render: (name, item, i) => {
      //   return (
      //     <OpportunityDetailView opportunityId={item.opportunityId} opportunityName={item.opportunityName} />
      //   );
      // },
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value, record) => record.accountName.indexOf(value) === 0,
      // sorter: (a, b) => {
      //   const accountNameA = a.accountName && a.accountName.toLowerCase();
      //   const accountNameB = b.accountName && b.accountName.toLowerCase();
      //   if (accountNameA < accountNameB) {
      //     return -1;
      //   }
      //   if (accountNameA > accountNameB) {
      //     return 1;
      //   }

      //   // names must be equal
      //   return 0;
      // },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      width: "20%",
      defaultSortOrder: "descend",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      width: "20%",
    },
    {
      title: "Value",
      dataIndex: "proposalAmount",
      width: "20%",
      onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      width: "20%",
    },
  ];
  // if (fetchingPartnerOpportunityError) {
  //   return <APIFailed />;
  // }
  return (
    <>
      <StyledTable
        // rowSelection={rowSelection}
        rowKey="opportunityId"
        columns={columns}
        dataSource={
          !Array.isArray(opportunityByPartnerId) ? [] : opportunityByPartnerId
        }
        scroll={{ y: 460 }}
        // pagination={{
        //   defaultPageSize: 15,
        //   showSizeChanger: true,
        //   pageSizeOptions: ["15", "25", "40", "50"],
        // }}
        pagination={false}
         
      />
    </>
  );
}
// }
const mapStateToProps = ({ partner }) => ({
  fetchingPartnerOpportunity: partner.fetchingPartnerOpportunity,
  fetchingPartnerOpportunityError: partner.fetchingPartnerOpportunityError,
  partnerId: partner.partner.partnerId,
  opportunityByPartnerId: partner.opportunityByPartnerId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByPartnerId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityTable);
