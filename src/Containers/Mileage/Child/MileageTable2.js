import React, { lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMileageByVoucherId,handleUpdateMileageModal,
  setEditMileage,updateMileage,deleteMileage} from "../MileageAction";
import { StyledTable } from "../../../Components/UI/Antd";
import {
  EditOutlined,
  EyeInvisibleOutlined,  
} from '@ant-design/icons';
import { Tooltip, Icon,Button,Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { CurrencySymbol } from "../../../Components/Common";
const UpdateMileageModal=lazy(()=>import("../Child/UpdateMileageModal"));

class MileageTable2 extends React.Component {
  componentDidMount() {
    const { voucherId } = this.props;
    this.props.getMileageByVoucherId(voucherId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { voucherId } = this.props;
    if (this.props.voucherId !== prevProps.voucherId) {
      this.props.getMileageByVoucherId(voucherId);
    }
  }

  render() {
    const {handleUpdateMileageModal,updateMileageModal,currentMileageId}=this.props;
    const columns = [
      {
        title: "",
        width: "2%",
      },
      {
        title: "Mileage #",
        dataIndex: "mileageId",
      },
      {
        title: "Attributed To",
        dataIndex: "clientName",
        key: "attribute",
      },
      {
        title: "Date",
        render: (name, item, i) => {
          return <span>{dayjs(item.mileageDate).format("ll")}</span>;
        },
      },
      {
        title: "From",
        dataIndex: "fromLocation",
      },
      {
        title: "To",
        dataIndex: "toLocation",
      },

      {
        title: "Distance/Km",
        dataIndex: "distances",
      },
      {
        title: "Remarks",
        dataIndex: "remark",
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
                this.props.deleteMileage(item.mileageId); 
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
      {
        title: "",
        dataIndex: "documentId",
        width:"2%",
        render: (name, item, i) => {
          return (
            <Tooltip title="Edit">
              <EditOutlined
                type="edit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                 this.props.setEditMileage(item);
                  handleUpdateMileageModal(true);
                  
                }}
              />
            </Tooltip>
          );
        },
        
      },

    ];

    return (
      <>
        <StyledTable
          columns={columns}
          // expandedRowRender={record => <p style={{ margin: 0 }}></p>}
          dataSource={this.props.mileageVoucherId}
          scroll={{ y: 460 }}
          pagination={false}
        />
        <UpdateMileageModal
        mileageId={currentMileageId}
        updateMileageModal={updateMileageModal}
        handleUpdateMileageModal={handleUpdateMileageModal}
        />
      </>
    );
  }
}
const mapStateToProps = ({ mileage }) => ({
  fetchingMileageByVoucherId: mileage.fetchingMileageByVoucherId,
  fetchingMileageByVoucherIdError: mileage.fetchingMileageByVoucherIdError,
  mileageVoucherId: mileage.mileageVoucherId,
  updateMileageModal:mileage.updateMileageModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMileageByVoucherId,
      handleUpdateMileageModal,
      setEditMileage,
      updateMileage,
      deleteMileage,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MileageTable2);
