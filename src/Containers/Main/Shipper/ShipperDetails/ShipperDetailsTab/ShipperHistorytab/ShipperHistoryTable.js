import dayjs from "dayjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledModal, StyledTable } from "../../../../../../Components/UI/Antd";
import { getShipperHistory } from "../../../ShipperAction";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";

class ShipperHistoryTable extends Component {
  componentDidMount() {
    this.props.getShipperHistory(this.props.shipperId);
  }

  render() {
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        title: "Date",
        dataIndex: "date",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.date).format("ll")}`}</span>;
        },
        width: "20%",
      },
      {
        title: "Mobile#",
        dataIndex: "phoneNo",
        width: "13%",
      },
      //   {
      //     title: "Phone#",
      //     dataIndex: "phoneNo",
      //     width: "13%",
      //   },
      //   {
      //     title: "Email",
      //     dataIndex: "emailId",
      //     width: "18%",
      //   },

      {
        title: "Address",
        dataIndex: "",
        render: (name, item, i) => {
          console.log(item);
          return `${item.address1 || ""} ${item.street || ""}`;
        },
        width: "13%",
        // address1+street
      },
      {
        title: "City",
        dataIndex: "city",
        width: "13%",
      },
      {
        title: "State",
        dataIndex: "state",
        width: "13%",
      },
      {
        title: "Pin Code",
        dataIndex: "pinCode",
        width: "10%",
      },
    ];

    // if (this.props.fetchingShipperHistoryError) {
    //     return <APIFailed />
    // }
    return (
      <>
        {true && (
          <StyledTable
            rowKey=""
            columns={columns}
            dataSource={this.props.shipperHistory}
            loading={
              this.props.fetchingShipperHistory
              //   ||
              //   this.props.fetchingShipperHistoryError
            }
            scroll={{ y: 320 }}
            pagination={{
              defaultPageSize: 15,
              showSizeChanger: true,
              pageSizeOptions: ["15", "25", "40", "50"],
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ shipper, auth }) => ({
  shipperHistory: shipper.shipperHistory,
  shipperId: shipper.shipperDetailsByShipperId.shipperId,
  fetchingShipperHistory: shipper.fetchingShipperHistory,
  fetchingShipperHistoryError: shipper.fetchingShipperHistoryError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipperHistory,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperHistoryTable);
