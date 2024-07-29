
import dayjs from "dayjs";
import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Button } from "antd";
import { StyledTable } from "../../../Components/UI/Antd";
import { getMileageByUserId,deleteMileageVoucher,handleMileageVoucherIdDrwer } from "../MileageAction";
import { CurrencySymbol } from "../../../Components/Common";
import APIFailed from "../../../Helpers/ErrorBoundary/APIFailed";
import { DeleteOutlined } from "@ant-design/icons";
import MileageVoucherIdDrawer from "./MileageVoucherIdDrawer";
const MileageTable2=lazy(()=>import("./MileageTable2"));

class MileageTable extends React.Component {
  state = {
    expand: false,
    voucherId: "",
  };
  handleExpand = (vid) => {
    console.log("function called");
    this.setState({
      expand: !this.state.expand,
      voucherId: vid,
    });
  };
  componentDidMount() {
    this.props.getMileageByUserId(this.props.userId);
  }
  render() {
    const {
      MileageDat,
      fetchingMileageByUserId,
      fetchingMileageByUserIdError,
    } = this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
     
      {
        title: "Voucher ID",
        dataIndex: "voucherId",
        render: (name, item, i) => {
          return (
            <div
              onClick={() => { this.handleExpand(item.voucherId) 
                this.props.handleMileageVoucherIdDrwer(true)}}
            
              style={{
                cursor: "pointer",
                color:
                  this.state.voucherId === item.voucherId
                    ? "orange"
                    : "#1890ff",
              }}
            >
              {item.voucherId}
            </div>
          );
        },
      },
      {
        title: "Voucher Date",
        render: (name, item, i) => {
          return <span>{dayjs(item.voucherDate).format("MMM Do YY")}</span>;
        },
      },
      {
        title: "Amount",
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
        width:"13%",
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
                  Waiting for approval</div>
              )}
            </span>
          );
        },
      },
      {
        title: "",
        dataIndex: "documentId",
        width:"5%",
        render: (name, item, i) => {
          return (
            <>
            {item.status === "Pending" && (
            <Tooltip title="Delete">
              <DeleteOutlined
                type="delete"
                style={{ cursor: "pointer" }}
                onClick={() => {
                this.props.deleteMileageVoucher(item.voucherId);
                  
                }}
              />
            </Tooltip>
            )}
             {item.status==="Rejected" && (
            <Button type="primary"
            onClick={()=>{
              // this.props.reapply();
            }}>
            Reapply
            </Button>
          )}
            </>
          );
        },
        
      },
    ];

    if (fetchingMileageByUserIdError) {
      return <APIFailed />;
    }
    const tab = document.querySelector(".ant-layout-sider-children");
    const tableHeight = tab && tab.offsetHeight * 0.77;
    return (
      <>
        <StyledTable
          columns={columns}
          // expandedRowRender={record => <p style={{ margin: 0 }}></p>}
          dataSource={MileageDat}
          loading={fetchingMileageByUserId || fetchingMileageByUserIdError}
          scroll={{ y: tableHeight }}
          //  style={{height:"20%"}}
          pagination={false}
        />     
        <MileageVoucherIdDrawer 
        voucherId={this.state.voucherId}
        mileageVoucherIdDrawer={this.props.mileageVoucherIdDrawer}
        handleMileageVoucherIdDrwer={this.props.handleMileageVoucherIdDrwer}
        />
      </>
    );
  }
}
const mapStateToProps = ({ auth, mileage }) => ({
  userId: auth.userDetails.userId,
  MileageDat: mileage.MileageDat,
  fetchingMileageByUserId: mileage.fetchingMileageByUserId,
  fetchingMileageByUserIdError: mileage.fetchingMileageByUserIdError,
  mileageVoucherIdDrawer:mileage.mileageVoucherIdDrawer,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByUserId,
      deleteMileageVoucher,
      handleMileageVoucherIdDrwer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageTable);
