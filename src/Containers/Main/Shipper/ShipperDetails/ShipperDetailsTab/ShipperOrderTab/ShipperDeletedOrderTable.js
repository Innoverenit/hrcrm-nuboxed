import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import { Tooltip } from "antd";
import { getDeletedOrderTableData } from "../../../ShipperAction";
import dayjs from "dayjs";
import { CurrencySymbol } from "../../../../../../Components/Common";
import OrderDetailsTable from "./OrderDetailsTable";
import ShipperOrderHistory from "./ShipperOrderHistory";
import ShipperOrderFeedback from "./ShipperOrderFeedback";
import OrderPaymentTable from "./OrderPaymentTable";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import ShipperDeletedOrderReason from "./ShipperDeletedOrderReason";

function ShipperDeletedOrderTable(props) {
  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
  }
  const [show, setshow] = useState(false);
  const [showHistory, setshowHistory] = useState(false);
  const [orderId, setorderId] = useState("");
  const [showFeed, setshowFeed] = useState(false);
  const [showPayment, setshowPayment] = useState(false);
  const [showRes, setshowRes] = useState(false);

  function handleOrder(orderId) {
    setshow(true);
    setshowHistory(false);
    setshowFeed(false);
    setshowPayment(false);
    setshowRes(false);
    setorderId(orderId);
  }

  function handleOrderHistory(orderId) {
    setshowHistory(true);
    setshow(false);
    setshowFeed(false);
    setshowPayment(false);
    setshowRes(false);
    setorderId(orderId);
  }

  function handleOrderFeedback(orderId) {
    setshow(false);
    setshowHistory(false);
    setshowFeed(true);
    setshowPayment(false);
    setshowRes(false);
    setorderId(orderId);
  }

  function handleOrderPayment(orderId) {
    setshow(false);
    setshowHistory(false);
    setshowFeed(false);
    setshowPayment(true);
    setshowRes(false);
    setorderId(orderId);
  }

  function handleReasonOfDelete(orderId) {
    setshow(false);
    setshowHistory(false);
    setshowFeed(false);
    setshowPayment(false);
    setshowRes(true);
    setorderId(orderId);
  }
  const { paidInd } = props;

  useEffect(() => {
    props.getDeletedOrderTableData();
  }, []);

  const { user } = props;

  const columns = [
    {
      title: "",
      width: "1%",
    },
    {
      title: "Order No",
      dataIndex: "orderId",
      width: "21%",
      render: (text, item) => {
        return (
          <span
            onClick={() => handleOrder(item.orderId)}
            style={{
              textDecoration: "underline",
              color: show && item.orderId === orderId ? "orange" : "#1890ff",
              color: item.orderStatus === "Completed" ? "#08b0b0" : "black",
              fontWeight: item.orderStatus === "Completed" ? "bold" : null,
              cursor: "pointer",
            }}
          >{`${item.orderId} `}</span>
        );
      },
    },
    {
      title: "Start",
      dataIndex: "orderDate",
      width: "11%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              color: item.orderStatus === "Completed" ? "#08b0b0" : "black",
              fontWeight: item.orderStatus === "Completed" ? "bold" : null,
            },
          },
          children: ` ${dayjs(item.orderDate).format("ll")}`,
        };
      },
    },

    {
      title: "Value(in.GST)",
      dataIndex: "orderValue",
      width: "8%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              color: item.orderStatus === "Completed" ? "#08b0b0" : "black",
              fontWeight: item.orderStatus === "Completed" ? "bold" : null,
            },
          },
          children: (
            <span>
              {" "}
              <CurrencySymbol currencyType={"INR"} />
              {item.orderValue}
            </span>
          ),
        };
      },
    },
    {
      title: "Balance Pay",
      dataIndex: "payableAmount",
      width: "8%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              color: item.orderStatus === "Completed" ? "#08b0b0" : "black",
              fontWeight: item.orderStatus === "Completed" ? "bold" : null,
            },
          },
          children: (
            <span>
              {" "}
              <CurrencySymbol currencyType={"INR"} />
              {item.payableAmount}
            </span>
          ),
        };
      },
    },
    {
      //either subscription/one time from backend
      title: "Type",
      dataIndex: "subscriptionType",
      width: "12%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              color: item.orderStatus === "Completed" ? "#08b0b0" : "black",
              fontWeight: item.orderStatus === "Completed" ? "bold" : null,
            },
          },
          children: <span> {item.subscriptionType}</span>,
        };
      },
    },

    {
      //will be kept for renewal status, indicator from backend
      title: "End",
      dataIndex: "subscriptionEndDate",
      width: "11%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              color: item.orderStatus === "Completed" ? "#08b0b0" : "black",
              fontWeight: item.orderStatus === "Completed" ? "bold" : null,
            },
          },
          children: ` ${dayjs(item.subscriptionEndDate).format("ll")}`,
        };
      },
    },
    {
      //either subscription/one time from backend
      title: "#Days",
      dataIndex: "noOfDays",
      width: "7%",
      render: (name, item, i) => {
        return {
          props: {
            style: {
              color: item.orderStatus === "Completed" ? "#08b0b0" : "black",
              fontWeight: item.orderStatus === "Completed" ? "bold" : null,
            },
          },
          children: <span> {item.noOfDays}</span>,
        };
      },
    },
    {
      title: "",
      dataIndex: "toBeRenewInd",
    },
    {
      title: "",
      width: "5%",
      render(item) {
        return (
          <>
            <Tooltip title="Delivery">
              <span
                onClick={() => handleOrderHistory(item.orderId)}
                style={{
                  color:
                    showHistory && item.orderId === orderId
                      ? "orange"
                      : "#1890ff",
                  cursor: "pointer",
                }}
              >
                <i class="fas fa-history"></i>
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "",
      width: "5%",
      render(item) {
        return (
          <>
            <Tooltip title="Feedback">
              <span
                onClick={() => handleOrderFeedback(item.orderId)}
                style={{
                  color:
                    showFeed && item.orderId === orderId ? "orange" : "teal",
                  cursor: "pointer",
                }}
              >
                <i class="far fa-comment-alt"></i>
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "",
      width: "5%",
      render(item) {
        return (
          <>
            <Tooltip title="Receivables">
              <span
                onClick={() => handleOrderPayment(item.orderId)}
                style={{
                  color:
                    showPayment && item.orderId === orderId ? "green" : "black",
                  cursor: "pointer",
                }}
              >
                <i class="fas fa-hand-holding-usd"></i>
              </span>
            </Tooltip>
          </>
        );
      },
    },

    {
      title: "",
      // width: "2%",
      render: (name, item, i) => {
        //debugger
        return (
          <Tooltip title="Reason for Delete">
            <span
              onClick={() => handleReasonOfDelete(item.orderId)}
              style={{
                color:
                  showRes && item.orderId === orderId ? "orange" : "#1890ff",
                cursor: "pointer",
              }}
            >
              <i class="fa fa-info-circle"></i>
            </span>
          </Tooltip>
        );
      },
    },
  ];
  // if (props.fetchingShipperDeletedOrderById) {
  //   return <APIFailed />
  // }

  return (
    <>
      <StyledTable
        rowKey=""
        columns={columns}
        dataSource={props.shipperDeletedOrder}
        loading={
          props.fetchingShipperDeletedOrderById ||
          props.fetchingShipperDeletedOrderByIdError
        }
        scroll={{ y: 320 }}
        pagination={{
          defaultPageSize: 30,
          showSizeChanger: true,
          pageSizeOptions: ["30", "40", "50"],
        }}
      />
      {show && <OrderDetailsTable orderId={orderId} />}
      {showHistory && <ShipperOrderHistory orderId={orderId} />}
      {showFeed && <ShipperOrderFeedback orderId={orderId} />}
      {showPayment && <OrderPaymentTable orderId={orderId} />}
      {showRes && <ShipperDeletedOrderReason orderId={orderId} />}
    </>
  );
}

const mapStateToProps = ({ auth, shipper }) => ({
  shipperDeletedOrder: shipper.shipperDeletedOrder,
  fetchingShipperDeletedOrderById: shipper.fetchingShipperDeletedOrderById,
  fetchingShipperDeletedOrderByIdError:
    shipper.fetchingshipperDeletedOrderByIdError,
  user: auth.userDetails,
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  userId: auth.userDetails.userId,
  paidInd: shipper.paymentHistory.paidInd,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeletedOrderTableData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipperDeletedOrderTable);
