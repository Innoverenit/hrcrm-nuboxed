import React, { Component } from "react";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  getOrderDetailsById,
  handleUpdateProductDetailModal,
  setEditOrderDetail,
} from "../../../../ShipperAction";
import { CurrencySymbol } from "../../../../../../Components/Common";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpdateProductDetailModal from "./UpdateProductDetailModal";


class OrderDetailsTable extends Component {
  componentDidMount() {
    this.props.getOrderDetailsById(this.props.orderId);
  }
  componentDidUpdate(prvP, prvS) {
    console.log(prvP);
    debugger;
    if (this.props.orderId !== prvP.orderId) {
      debugger;
      this.props.getOrderDetailsById(this.props.orderId);
    }
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
        width: "20%",
      },
      {
        title: "Sub-category",
        dataIndex: "subCategoryName",
        width: "13%",
      },

      {
        title: "Attribute",
        dataIndex: "attributeName",
        width: "13%",
      },

      {
        title: "Sub-Attribute",
        dataIndex: "subAttributeName",
        width: "13%",
      },
      {
        title: "Name",
        dataIndex: "name",
        width: "13%",
      },
      {
        title: "Units",
        dataIndex: "quantity",
        width: "10%",
      },
      {
        title: "Price(ex. GST)",
        dataIndex: "price",
        render: (name, item, i) => {
          return (
            <span>
              <CurrencySymbol currencyType={"INR"} />
              {item.price}
            </span>
          );
        },
        width: "12%",
      },

      {
        title: "",
        dataIndex: "documentId",
        render: (name, item, i) => {
          return (
            <Tooltip title="Edit">
              <VisibilityIcon 
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.setEditOrderDetail(item);
                  this.props.handleUpdateProductDetailModal(true);
                  //   handleSetCurrentContactId(item.contactId)
                }}
              />
            </Tooltip>
          );
        },
      },
    ];

    if (this.props.fetchingOrderDetailsByIdError) {
      return <APIFailed />;
    }

    return (
      <>
        {true && (
          <StyledTable
            rowKey=""
            columns={columns}
            dataSource={this.props.orderByOrderId}
            loading={
              this.props.fetchingOrderDetailsById ||
              this.props.fetchingOrderDetailsByIdError
            }
            pagination={false}
            scroll={{ y: 320 }}
            // pagination={{
            //   defaultPageSize: 30,
            //   showSizeChanger: true,
            //   pageSizeOptions: ["30", "40", "50"],
            // }}
          />
        )}
        <UpdateProductDetailModal
          updateProductDetailModal={this.props.updateProductDetailModal}
          handleUpdateProductDetailModal={
            this.props.handleUpdateProductDetailModal
          }
        />
      </>
    );
  }
}

const mapStateToProps = ({ shipper, auth }) => ({
  orderByOrderId: shipper.orderByOrderId,
  updateProductDetailModal: shipper.updateProductDetailModal,
  fetchingOrderDetailsById: shipper.fetchingOrderDetailsById,
  fetchingOrderDetailsByIdError: shipper.fetchingOrderDetailsByIdError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOrderDetailsById,
      handleUpdateProductDetailModal,
      setEditOrderDetail,
    },

    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsTable);
