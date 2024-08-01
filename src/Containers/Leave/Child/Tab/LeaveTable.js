import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../Components/UI/Antd";
import { Button, Tooltip } from "antd";
import {
  getLeaveListRangeByUserId,
  updateLeaves,
  setEditLeave,
  handleUpdateLeaveModal,
} from "../../LeavesAction";
import UpdateLeavesModal from "../Tab/UpdateLeavesModal";
import dayjs from "dayjs";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
import { FormattedMessage } from "react-intl";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function LeaveTable(props) {
  // constructor(props) {
  //     super(props);
  //     this.state = {

  //         educationModalVisible: false
  //         // data:this.props.processTask
  //     };
  // }
  // handleEducationModalVisible = () =>
  //     this.setState({ educationModalVisible: !this.state.educationModalVisible });

  useEffect(() => {
    props.getLeaveListRangeByUserId(props.userId);

  }, []);

  const [currentLeaveId, setCurrentLeaveId] = useState("");

  function handleSetCurrentLeaveId(leaveId) {
    setCurrentLeaveId(leaveId);
    console.log(leaveId);
  }

  const {
    leaveListRangeByUserId,
    fetchingLeaveListRangeByUserId,
    fetchingLeaveListRangeByUserIdError,
    handleUpdateLeaveModal,
    updateLeaveModal,

    // fetchingBankDetails,
    // bank,
    // handleUpdateBankModal,
    // updateBankModal,
    // setEditBank,
  } = props;
  const columns = [

    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (name, item, i) => {
        return <span>{dayjs(item.startDate).format("LL")}</span>;
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (name, item, i) => {
        return <span>{dayjs(item.endDate).format("LL")}</span>;
      },
    },
    {
      title: "Cover",
      dataIndex: "coverDetails",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      ellipsis: true
    },
    {
      //title: "Status",
      // width:"20%",
      title: <FormattedMessage id="app.status" defaultMessage="Status" />,
      render: (name, item, i) => {
        return (
          <span>
            {item.status === "Approved" && (
              <div
                style={{
                  // backgroundColor: " green",
                  border: "2px solid green",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "2px",
                  width: "8rem",
                  borderRadius: "0.62em",
                }}
              > <span style={{ color: "green" }}>Approved </span></div>
            )}
            {item.status === "Rejected" && (
              <div
                style={{
                  // backgroundColor:"red",
                  border: "2px solid red",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "2px",
                  width: "8rem",
                  borderRadius: "0.62em",
                }}
              ><span style={{ color: "red" }}>Rejected</span></div>
            )}
            {item.status === "Pending" && (
              <div
                style={{
                  border: "2px solid #e1d16c",
                  // backgroundColor:"yellow",
                  padding: "0px 0.62em",
                  textAlign: "center",
                  margin: "2px",
                  width: "9rem",
                  borderRadius: "0.62em",
                }}
              > <span className="text-[#e1d16c]">Waiting For Approval</span></div>
            )}
          </span>
        );
      },
    },

    {
      title: "",
      dataIndex: "documentId",
      width: "7%",
      render: (name, item, i) => {
        return (
          <>
            {item.status === "Pending" ?
              <Tooltip title="Delete">
                <DeleteOutlined
                  type="delete"
                  style={{ cursor: "pointer" }}
                // onClick={() => {
                //  props.setEditLeave(item);
                //   handleUpdateLeaveModal(true);
                //   handleSetCurrentLeaveId(item.leaveId);

                // }}
                />
              </Tooltip>
              : ""}
            {item.status === "Rejected" && (
              <Button type="primary"
                onClick={() => {
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
      // width:"2%",
      render: (name, item, i) => {
        return (
          <>
            {item.status === "Pending" ?
              <Tooltip title="Edit">
                <EditOutlined
                  type="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    props.setEditLeave(item);
                    handleUpdateLeaveModal(true);
                    handleSetCurrentLeaveId(item.leaveId);

                  }}
                />
              </Tooltip>
              : ""}
          </>
        );
      },

    },


  ];

  if (fetchingLeaveListRangeByUserIdError) {
    return <APIFailed />;
  }
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;
  return (
    <>
      {/* {emailCredential && ( */}
      <StyledTable
        columns={columns}
        dataSource={leaveListRangeByUserId}
        loading={
          fetchingLeaveListRangeByUserId ||
          fetchingLeaveListRangeByUserIdError
        }
        // scroll={{ y: 460 }}
        scroll={{ y: tableHeight }}
        pagination={false}
        onChange={console.log("task onChangeHere...")}
      // expandedRowRender={(record) => {
      //   return (
      //     <>
      //       <p>{record.reason || ""}</p>
      //     </>
      //   );
      // }}
      />
      <UpdateLeavesModal
        leaveId={currentLeaveId}
        updateLeaveModal={updateLeaveModal}
        handleUpdateLeaveModal={handleUpdateLeaveModal}
        handleSetCurrentLeaveId={handleSetCurrentLeaveId}
      />
    </>
  );
}


const mapStateToProps = ({ leave, auth }) => ({
  userId: auth.userDetails.userId,
  fetchingLeaveListRangeByUserId: leave.fetchingLeaveListRangeByUserId,
  fetchingLeaveListRangeByUserIdError:
    leave.fetchingLeaveListRangeByUserIdError,
  leaveListRangeByUserId: leave.leaveListRangeByUserId,
  // fetchingBankDetails: profile.fetchingBankDetails,
  updateLeaveModal: leave.updateLeaveModal,
  // updateBankModal: profile.updateBankModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeaveListRangeByUserId,
      // getBankDetails,
      // handleUpdateBankModal,
      // setEditBank,
      updateLeaves,
      setEditLeave,
      handleUpdateLeaveModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeaveTable);
