import React, {  useEffect, useState,  lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "antd";
import {
  getLeaveListRangeByUserId,
  updateLeaves,
  setEditLeave,
  handleUpdateLeaveModal,
} from "../../LeavesAction";
const UpdateLeavesModal = lazy(() => import("../Tab/UpdateLeavesModal"));
const LeaveStatusTypeCard = lazy(() => import("./LeaveStatusTypeCard"));
const { Option } = Select;

function LeaveStatusCard(props) {

  const [currentLeaveId, setCurrentLeaveId] = useState("");

  function handleSetCurrentLeaveId(leaveId) {
    setCurrentLeaveId(leaveId);
    console.log(leaveId);
  }

  const { handleUpdateLeaveModal, updateLeaveModal } = props;
  return (
    <>
      <div className="flex justify-arround max-sm:flex-col max-sm:overflow-x-auto h-[34rem]">
        <div className="w-[26rem] max-sm:w-wk">
          <LeaveStatusTypeCard statusType={"Pending"}/>
        </div>
        <div className="w-[26rem] max-sm:w-wk">
          <LeaveStatusTypeCard  statusType={"Approved"}/>
        </div>
        <div className="w-[26rem] max-sm:w-wk">
          <LeaveStatusTypeCard  statusType={"Rejected"}/>
        </div>
      </div>

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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeaveListRangeByUserId,
      updateLeaves,
      setEditLeave,
      handleUpdateLeaveModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeaveStatusCard);
