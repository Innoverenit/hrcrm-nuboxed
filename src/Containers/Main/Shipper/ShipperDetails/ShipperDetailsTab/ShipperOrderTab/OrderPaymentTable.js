import { Popconfirm, Switch } from "antd";
import dayjs from "dayjs";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CurrencySymbol } from "../../../../../../Components/Common";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";
import { getShipperOrderPayment } from "../../../ShipperAction";

class OrderPaymentTable extends Component {
  componentDidMount() {
    this.props.getShipperOrderPayment(this.props.orderId);
  }
  componentDidUpdate(prvP, prvS) {
    console.log(prvP);
    debugger;
    if (this.props.orderId !== prvP.orderId) {
      debugger;
      this.props.getShipperOrderPayment(this.props.orderId);
    }
  }
  render() {
    const { user } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        title: "Date",
        width: "18%",
        dataIndex: "paymentDate",
        render: (name, item, i) => {
          return <span>{` ${dayjs(item.paymentDate).format("ll")}`}</span>;
        },
      },
      {
        title: "Type",
        width: "10%",
        dataIndex: "paymentType",
      },
      {
        title: "Amount",
        dataIndex: "paymentAmount",
        render: (name, item, i) => {
          return (
            <span>
              <CurrencySymbol currencyType={"INR"} />
              {item.paymentAmount}
            </span>
          );
        },
        width: "12%",
      },
      {
        title: "Mode",
        dataIndex: "paymentMode",
        width: "12%",
      },
      {
        title: "Status",
        dataIndex: "approveByFinanceInd",
        render: (name, item, i) => {
          return (
            <span>
              {item.approveByFinanceInd
                ? `Confirmed by Finance`
                : `Pending with Finance`}
            </span>
          );
        },
        width: "20%",
      },
      {
        dataIndex: "paymentInd",
      },
      {
        dataIndex: "paidInd",
      },

      {
        title: "Approved On",
        width: "25%",
        render: (text, item) => {
          return (
            <>
              {item.approveByFinanceInd === true ? (
                <>
                  {item.approveBy} {dayjs(item.approveDate).format("ll")}
                </>
              ) : null}
            </>
          );
        },
      },
      {
        title: "",
        dataIndex: "",
        width: "10%",
        render(name, item) {
          // console.log(item, a, b, c, d)
          return (
            <>
              {user.functionName === "Finance" && (
                <Popconfirm
                  title="Undo successfull"
                  // onConfirm={() => handleToggleCollection(item.paymentId)}
                  onCancel={null}
                  okText="Ok"
                  cancelText="Cancel"
                >
                  <Switch
                    // checked={props.paymentCollection || paymentCollection}
                    isLoading={true}
                    checkedChildren="Redo"
                    unCheckedChildren="Undo"
                  />
                </Popconfirm>
              )}
            </>
          );
        },
      },
    ];

    if (this.props.fetchingPaymentHistoryError) {
      return <APIFailed />;
    }

    return (
      <>
        {true && (
          <StyledTable
            rowKey=""
            columns={columns}
            dataSource={this.props.paymentHistory}
            loading={
              this.props.fetchingPaymentHistory ||
              this.props.fetchingPaymentHistoryError
            }
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

const mapStateToProps = ({ shipper, auth }) => ({
  paymentHistory: shipper.paymentHistory,
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  fetchingPaymentHistory: shipper.fetchingPaymentHistory,
  fetchingPaymentHistoryError: shipper.fetchingPaymentHistoryError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShipperOrderPayment,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPaymentTable);
