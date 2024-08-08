import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTable } from "../../../Components/UI/Antd";
import { Icon, Tooltip } from "antd";
import { getExpenseById,handleExpenseVoucherIdDrawer } from "../ExpenseAction";
import { BundleLoader } from "../../../Components/Placeholder";
import dayjs from "dayjs";
import { CurrencySymbol } from "../../../Components/Common";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import ExpenseVoucherIdDrawer from "./ExpenseVoucherIdDrawer";

function ExpenseTable(props) {
  const [expand, setExpand] = useState(false);
  const [voucherId, setvoucherId] = useState("");
  const [particularRowData, setParticularRowData] = useState({});

  function handleSetParticularRowData(item) {
    console.log(item);
    setParticularRowData(item);   
  }

  function handleExpand(voucherId) {
    setExpand(!expand);    
    setvoucherId(voucherId);
  }

  useEffect(() => {
    props.getExpenseById(props.userId);
  }, [props.userId]);

 
    const {
      Expenses,
      fetchingExpenseById,
      fetchingExpenseByIdError,
      expenseVoucherIdDrawer,
      handleExpenseVoucherIdDrawer,
    } = props;
    const columns = [
      {
        title: "",
        width: "2%",
      },

          {
        //title: "Voucher ID",
        title: (
          <FormattedMessage id="app.voucherId" defaultMessage="Voucher ID" />
        ),
        dataIndex: "voucherId",
        render: (name, item, i) => {
          return (
            <span
              onClick={() =>{ 
                handleExpand(item.voucherId);
                handleSetParticularRowData(item);
                props.handleExpenseVoucherIdDrawer(true);
              }}
              style={{
                cursor: "pointer",
                color: expand && item.voucherId === voucherId ? "orange" : "#1890ff",
              }}
            >
              {item.voucherId}
            </span>
          );
        },
      },
      // {
      //   // title: "Type",
      //   title: <FormattedMessage id="app.type" defaultMessage="Type" />,
      //   dataIndex: "type",
      // },
      {
        // title: "Voucher date",
        title: (
          <FormattedMessage
            id="app.voucherDate"
            defaultMessage="Voucher date"
          />
        ),
        dataIndex: "voucherDate",
        render: (name, item, i) => {
          return <span>{dayjs(item.voucherDate).format("MMM Do YY")}</span>;
        },
      },
      {
        // title: "Amount",
        title: <FormattedMessage id="app.amount" defaultMessage="Amount" />,
        dataIndex: "amount",
        render: (name, item, i) => {
          return (
            <span>
              {item.amount ? (
                <>
                  <CurrencySymbol currencyType={item.currency} />{" "}
                  {` ${item.amount || ""}`}
                </>
              ) : (
                ""
              )}
            </span>
          );
        },
      },
      {
        title: "Status",
        width:"10%",
        render: (name, item, i) => {
          return (
            <span>
              {item.status === "Approved" && (
                 <div
                 style={{
                   border: "2px solid green",
                   padding: "0px 0.62em",
                   textAlign: "center",
                   margin: "2px",
                   borderRadius: "0.62em",
                 }}
               >
                 {item.status}
               </div>
              )}
            
              {item.status === "Rejected" && (
                <div
                style={{
                  border: "2px solid red",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "2px",
                  borderRadius: "0.62em",
                }}
              >
                {item.status}</div>
              )}
              {item.status === "Pending" && (
                  <div
                  style={{
                    border: "2px solid yellow",
                    padding: "0px 0.62em",
                    textAlign: "center",
                    margin: "2px",
                    borderRadius: "0.62em",
                  }}
                >
                  wating for approval</div>
              )}
            </span>
          );
        },
      },
    ];
    if (fetchingExpenseByIdError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.77;

    return (
      <>
        <StyledTable
          columns={columns}
          // expandedRowRender={record => <p style={{ margin: 0 }}></p>}
          dataSource={Expenses}
          Loading={fetchingExpenseById || fetchingExpenseByIdError}
          scroll={{ y: tableHeight }}
          pagination={false}
        />

        <ExpenseVoucherIdDrawer
        voucherId={voucherId} 
        particularRowData={particularRowData}
        expenseVoucherIdDrawer={expenseVoucherIdDrawer}
        handleExpenseVoucherIdDrawer={handleExpenseVoucherIdDrawer}
        />
      </>
    );
  }

const mapStateToProps = ({ auth, expense }) => ({
  userId: auth.userDetails.userId,
  Expenses: expense.Expenses,
  fetchingExpenseById: expense.fetchingExpenseById,
  fetchingExpenseByIdError: expense.fetchingExpenseByIdError,
  expenseVoucherIdDrawer:expense.expenseVoucherIdDrawer
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getExpenseById,
      handleExpenseVoucherIdDrawer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
