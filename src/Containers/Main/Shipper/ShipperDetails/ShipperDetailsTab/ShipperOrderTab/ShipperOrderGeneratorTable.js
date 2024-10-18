import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  fetchingNewShipperOrder,
  handleUpdateOrderDetailModal,
  setEditShipperOrder,
} from "../../../../ShipperAction";
import { CurrencySymbol } from "../../../../../../Components/Common";
import UpdateOrderDetailModal from "./UpdateOrderDetailModal";
import { Tooltip } from "antd";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

class ShipperOrderGeneratorTable extends Component {
  componentDidMount() {
    // this.props.fetchingNewShipperOrder(this.props.shipperShipperId);
  }
  render() {
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        title: "Category",
        dataIndex: "categoryName",
        // width: "20%",
      },
      {
        title: "Sub-Category",
        dataIndex: "subCategoryName",
        // width: "13%",
      },

      {
        title: "Attribute",
        dataIndex: "attributeName",
        // width: "13%",
      },

      {
        title: "Sub-Attribute",
        dataIndex: "subAttributeName",
        // width: "13%",
      },
      {
        title: "Units",
        dataIndex: "quantity",
        // width: "13%",
      },
      {
        title: "Price (ex. GST)",
        dataIndex: "price",
        render: (name, item, i) => {
          return (
            <span>
              <CurrencySymbol currencyType={"INR"} />
              {item.price}
            </span>
          );
        },
        // width: "10%",
      },
      {
        title: "Margin %",
        dataIndex: "shipperAllowedMargin",
        // width: "13%",
      },
      {
        title: "",
        width: "2%",
        dataIndex: "documentId",
        render: (name, item, i) => {
          return (
            <Tooltip title="Edit">
              <FontAwesomeIcon icon={solid('pen-to-square')}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  //   this.props.setEditShipperOrder(item);
                  //   this.props.handleUpdateOrderDetailModal(true);
                }}
              />
            </Tooltip>
          );
        },
      },
    ];
    if (this.props.fetchingShipperOrderError) {
      return <APIFailed />;
    }
    return (
      <>
        {true && (
          <StyledTable
            rowKey=""
            columns={columns}
            dataSource={this.props.orderForGenerating}
            loading={
              this.props.fetchingShipperOrder ||
              this.props.fetchingShipperOrderError
            }
            scroll={{ y: 320 }}
            pagination={{
              defaultPageSize: 30,
              showSizeChanger: true,
              pageSizeOptions: ["30", "40", "50"],
            }}
          />
        )}
        <UpdateOrderDetailModal
          handleUpdateOrderDetailModal={this.props.handleUpdateOrderDetailModal}
          updateOrderDetailModal={this.props.updateOrderDetailModal}
        />
      </>
    );
  }
}

const mapStateToProps = ({ shipper }) => ({
  orderForGenerating: shipper.orderForGenerating,
  shipperShipperId: shipper.shipperDetailsByShipperId.shipperId,
  updateOrderDetailModal: shipper.updateOrderDetailModal,
  fetchingShipperOrder: shipper.fetchingShipperOrder,
  fetchingShipperOrderError: shipper.fetchingShipperOrderError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchingNewShipperOrder,
      handleUpdateOrderDetailModal,
      setEditShipperOrder,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperOrderGeneratorTable);
