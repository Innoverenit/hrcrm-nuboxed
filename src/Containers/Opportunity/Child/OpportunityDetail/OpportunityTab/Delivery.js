import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import dayjs from "dayjs";
import { StyledTable } from "../../../../../Components/UI/Antd";
import { getDelivery } from "../../../OpportunityAction";

class Delivery extends Component {
  componentDidMount() {
    const { getDelivery } = this.props;

    const {
      opportunity: { opportunityId }
    } = this.props;
    console.log(opportunityId);
    // getDelivery(opportunityId);
  }
  render() {
    const { deliveries, fetchingDeliveries } = this.props;
    console.log(fetchingDeliveries);
    const columns = [
      {
        //title: "Name",
        title: <FormattedMessage
          id="app.deliveryUserName"
          defaultMessage="Name"
        />,
        dataIndex: "deliveryUserName"
      },

      {
        //title: "Designation",
        title: <FormattedMessage
          id="app.designation"
          defaultMessage="Designation"
        />,
        dataIndex: "designation"
      },
      {
        //title: "Billing Rate",
        title: <FormattedMessage
          id="app.billingRate"
          defaultMessage="Billing Rate"
        />,
        dataIndex: "billingRate"
      },
      {
        //title: " Start date",
        title: <FormattedMessage
          id="app.deliveryStartDate"
          defaultMessage="Start date"
        />,
        dataIndex: "deliveryStartDate",
        render: (name, item, i) => {
          return (
            <span>{` ${dayjs(item.deliveryStartDate).format("ll")}`}</span>
          );
        }
      },
      {
        // title: " End date",
        title: <FormattedMessage
          id="app.deliveryEndDate"
          defaultMessage="End date"
        />,
        dataIndex: "deliveryEndDate",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.deliveryEndDate).format("ll")}`}</span>;
        }
      }
    ];

    if (fetchingDeliveries) {
      return <BundleLoader />;
    }
    return (
      <>
        {true && (
          <StyledTable
            // rowSelection={rowSelection}
            rowKey=""
            columns={columns}
            dataSource={deliveries}
          // onChange={console.log("contact onChangeHere...")}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ opportunity }) => ({
  opportunityId: opportunity.opportunityId,
  opportunity: opportunity.opportunity,
  deliveries: opportunity.deliveries,
  fetchingDeliveries: opportunity.fetchingDeliveries
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // getDelivery
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
