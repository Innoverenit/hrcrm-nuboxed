import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "../../../../../../Components/Common";
import { FormattedMessage } from "react-intl";
import { CurrencySymbol } from "../../../../../../Components/Common";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import { getOpportunityListByContactId } from "../../../../ContactAction";
import { Tooltip } from "antd";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function OpportunityTable(props) {
  useEffect(() => {
    props.getOpportunityListByContactId(props.contactId);
  }, []);
  console.log(props.contactId);
  const { fetchingContactOpportunity, opportunityByContactId } = props;

  const columns = [
    {
      title: "",
      width: "2%",
    },
    {
      title: "Job ID",
      width: "7%",
      dataIndex: "jobOrder",
    },
    {
      title: <FormattedMessage
        id="app.name"
        defaultMessage="Name"
      />,
      dataIndex: "requirementName",
      
      width: "10%",
      render(name, item, ) {
        return (
          <>
           <Link
              toUrl={`/opportunity/${item.opportunityId}`}
              title={`${item.opportunityName || ""} `}
            />
           
          </>
        );
      }
    },
    {
      title: "Opportunity",
      width: "8%",
      dataIndex: "opprtunityName",
      render: (name, item, i) => {
        return (
          <Tooltip title={item.opprtunityName}>
            <SubTitle>
              <MultiAvatar
                primaryTitle={item.opprtunityName}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
            </SubTitle>
          </Tooltip>
        );
      },
    },
    {
      title: "Close By",
      width: "7%",
      dataIndex: "closeByDate",
      render: (text, item) => {
        const closeByDate = moment(item.closeByDate).format("ll");
        return <span>{closeByDate}</span>;
      },
    },
    {
      // title: "Start Date",
      title: <FormattedMessage
        id="app.startDate"
        defaultMessage="Start Date"
      />,
      dataIndex: "creationDate",
      width: "10%",
      defaultSortOrder: "descend",
      render: (text, item) => {
        const creationDate = moment(item.creationDate).format("ll");
        return <span>{creationDate}</span>;
      },
    },
    {
      title: "Billing",
      width: "7%",
      dataIndex: "billing",
    },
    {
      title: "OnBoarded",
      width: "7%",
      dataIndex: "onBoardNo",
    },
    {
      title: "Recruit Owner",
      width: "10%",
      dataIndex: "recruitOwner",
      render: (name, item, i) => {
        return (
          <Tooltip title={item.recruitOwner}>
            <SubTitle>
              <MultiAvatar
                primaryTitle={item.recruitOwner}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
            </SubTitle>
          </Tooltip>
        );
      },
      
    },
    {
      title: "Customer",
      width: "7%",
      dataIndex: "customerName",
      render: (name, item, i) => {
        return (
          <Tooltip title={item.customerName}>
            <SubTitle>
              <MultiAvatar
                primaryTitle={item.customerName}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
            </SubTitle>
          </Tooltip>
        );
      },
    },
    // {
    //   // title: "Value",
    //   title: <FormattedMessage
    //     id="app.proposalAmount"
    //     defaultMessage="Value"
    //   />,
    //   dataIndex: "proposalAmount",
    //   width: "15%",
    //   onFilter: (value, record) => record.proposalAmount.indexOf(value) === 0,
    //   render: (name, item, i) => {        
    //     return (
    //       <>
    //         {/* {item.billing} {item.currency} */}
    //         <span>
    //         <CurrencySymbol currencyType={item.currency} />
    //         {item.proposalAmount}
    //       </span>
    //       </>
    //     );
    //   },
    // },
  
  ];
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;

  return (
    <>
      <StyledTable
        // rowSelection={rowSelection}
        rowKey="opportunityId"
        columns={columns}
        dataSource={opportunityByContactId}
        onChange={onChange}
        Loading={fetchingContactOpportunity}
        scroll={{ y: tableHeight }}
        pagination={false}
      />
    </>
  );
}
// }
const mapStateToProps = ({ auth, contact, opportunity }) => ({
  userId: auth.userDetails.userId,
  fetchingContactOpportunity: contact.fetchingContactOpportunity,
  // accounts: accountSelector(account),
  opportunityByContactId: contact.opportunityByContactId,
  contactId: contact.contact.contactId,
  // opportunityId: opportunity.opportunityId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByContactId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityTable);
