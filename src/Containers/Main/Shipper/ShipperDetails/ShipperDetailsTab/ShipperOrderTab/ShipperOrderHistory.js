import React, { Component } from "react";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import { getShipperOrderHistory } from "../../../../ShipperAction";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";

class ShipperOrderHistory extends Component {
  componentDidMount() {
    this.props.getShipperOrderHistory(this.props.orderId);
  }
  componentDidUpdate(prvP, prvS) {
    console.log(prvP);
    debugger;
    if (this.props.orderId !== prvP.orderId) {
      debugger;
      this.props.getShipperOrderHistory(this.props.orderId);
    }
  }
  render() {
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        title: "Order",
        dataIndex: "orderDate",
        width: "20%",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.orderDate).format("ll")}`}</span>;
        },
      },
      {
        title: "Start",
        dataIndex: "subscriptionStartDate",
        width: "20%",
        render: (name, item, i) => {
          return (
            <span>{` ${dayjs(item.subscriptionStartDate).format("ll")}`}</span>
          );
        },
      },
      {
        title: "End",
        dataIndex: "subscriptionEndDate",
        width: "20%",
        render: (name, item, i) => {
          return (
            <span>{` ${dayjs(item.subscriptionEndDate).format("ll")}`}</span>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "orderStatus",
        width: "20%",
      },

      {
        title: "Delivery",
        dataIndex: "date",
        width: "20%",
      },
    ];
    // if (this.props.fetchingOrderHistoryByIdError) {
    //     return <APIFailed />
    // }

    return (
      <>
        {true && (
          <StyledTable
            rowKey=""
            columns={columns}
            dataSource={[this.props.orderHistory]}
            loading={this.props.fetchingOrderHistoryById}
            scroll={{ y: 320 }}
            pagination={{
              defaultPageSize: 30,
              showSizeChanger: true,
              pageSizeOptions: ["30", "40", "50"],
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ shipper }) => ({
  orderHistory: shipper.orderHistory,
  fetchingOrderHistoryById: shipper.fetchingOrderHistoryById,
  fetchingOrderHistoryByIdError: shipper.fetchingOrderHistoryByIdError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipperOrderHistory,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperOrderHistory);
