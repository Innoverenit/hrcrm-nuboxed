import React, {  useEffect, useState,  lazy } from "react";
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "antd";
import {  DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../../Components/Placeholder";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AssistantIcon from "@mui/icons-material/Assistant";
import {
  getLeaveListRangeByUserId,
  updateLeaves,
  setEditLeave,
  handleUpdateLeaveModal,
  handleStatusLeaveModal,
  handleLeaveNoteDrawer
} from "../../LeavesAction";
const StatusLeavesModal = lazy(()=>import("./StatusLeavesModal"));
const LeaveNoteDrawer = lazy(()=>import("./LeaveNoteDrawer"));
const UpdateLeavesModal = lazy(()=>import("../Tab/UpdateLeavesModal"));

const { Option } = Select;
function LeaveCardView(props) {
  const [page, setPage] = useState(0);

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
    handleUpdateLeaveModal,
    updateLeaveModal,
    updateStatusLeaveModal,
    handleStatusLeaveModal,
    noteLeaveDrawer,
    handleLeaveNoteDrawer
  } = props;

  if (fetchingLeaveListRangeByUserId) {
    return <BundleLoader />;
  }
  return (
    <>
      <div className=" h-h72 md:mt-4 overflow-auto overflow-x-auto max-sm:h-[28vh]">
      <div className="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">
          {leaveListRangeByUserId.map((item) => {
            return (
              <div className="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[6.5rem] 
text-[#444444] m-3 p-1 w-[19vw] flex flex-col max-sm:w-wk  ">
                <div className="w-[200] flex h-[200] max-sm:w-full max-sm:flex-col max-sm:items-center  ">
                  <div className=" flex flex-col justify-around w-full ">
                    <div>
                      <div className=" flex font-medium flex-col  ">
                        <div className=" text-sm text-cardBody font-medium font-poppins">
                          {/* Delivery Date */}
                          Start Date:{" "}
                          {item.startDate === null ? (
                            "No Transaction"
                          ) : (
                            <span class="text-xs">
                              {dayjs(item.startDate).format("DD-MM-YYYY")}
                            </span>
                          )}
                          &nbsp;
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class=" text-sm text-cardBody font-medium font-poppins">
                        {/* Delivery Date */}
                        End Date:{" "}
                        {item.endDate === null ? (
                          "No Transaction"
                        ) : (
                          <span class="text-xs">
                            {dayjs(item.endDate).format("DD-MM-YYYY")}
                          </span>
                        )}
                        &nbsp;
                      </div>
                    </div>
                    <div>
                      <div class=" text-sm text-cardBody font-medium font-poppins">
                        Cover:{" "}
                        <label class="text-xs"> {item.coverDetails}</label>
                        &nbsp;
                      </div>
                    </div>

                    {/* <div >
                        <div class=" text-xs text-cardBody font-medium font-poppins">

                        Reason:    {item.reason}
 

  &nbsp;
</div>
          </div> */}
                  </div>
                </div>
                <div className=" flex flex-row justify-end w-full items-end">
                  <span>
                    {item.status === "Approved" && (
                      <div className="w-[8rem] rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-green-500 p-[0px_0.62em]">
                        {" "}
                        <span className="text-[green]" >Approved </span>
                      </div>
                    )}
                    {item.status === "Rejected" && (
                      <div className="w-[8rem] rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-red-500 p-[0px_0.62em]">
                        <span className="text-[red]">Rejected</span>
                      </div>
                    )}
                    {item.status === "Pending" && (
                      <div className="w-[8rem] rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-[#e1d16c] p-[0px_0.62em]">
                        {" "}
                        <span className="text-[#e1d16c]">
                          Waiting For Approval
                        </span>
                      </div>
                    )}
                  </span>
                  <div class="flex justify-end items-center">
                  <Tooltip title="Notes">
                    <NoteAltIcon className="!text-xl mt-1 cursor-pointer text-[green] "
                   
                    onClick={() => {
                   
                      handleLeaveNoteDrawer(true);
                      handleSetCurrentLeaveId(item);
                    }}
                    />
                  </Tooltip>
                  <span>
                    {item.status === "Pending" ? (
                      <div className="cursor-pointer "
                        onClick={() => {
                          props.setEditLeave(item);
                          handleUpdateLeaveModal(true);
                          handleSetCurrentLeaveId(item.leaveId);
                        }}
                      >
                        <Tooltip title={item.emailId}>
                          <BorderColorIcon className="!text-xl cursor-pointer text-[tomato]"/>
                        </Tooltip>
                      </div>
                    ) : (
                      ""
                    )}
                  </span>

                  <span>
                    <div className="!text-base cursor-pointer "
                      onClick={() => {
                        handleStatusLeaveModal(true);
                        handleSetCurrentLeaveId(item.leaveId);
                      }}
                    >
                      <Tooltip title={"Status"}>
                        <AssistantIcon  className="!text-xl cursor-pointer text-[grey]"/>
                      </Tooltip>
                    </div>
                  </span>

                  <span>
                    {item.status === "Pending" ? (
                      <div class="cursor-pointer">
                        <DeleteOutlined
                          type="delete"
                          className="!text-xl cursor-pointer text-[red]" 
                        ></DeleteOutlined>
                      </div>
                    ) : (
                      ""
                    )}
                  </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <UpdateLeavesModal
        leaveId={currentLeaveId}
        updateLeaveModal={updateLeaveModal}
        handleUpdateLeaveModal={handleUpdateLeaveModal}
        handleSetCurrentLeaveId={handleSetCurrentLeaveId}
      />

      <StatusLeavesModal
        leaveId={currentLeaveId}
        updateStatusLeaveModal={updateStatusLeaveModal}
        handleStatusLeaveModal={handleStatusLeaveModal}
        handleSetCurrentLeaveId={handleSetCurrentLeaveId}
      />
      <LeaveNoteDrawer
       leavesItems={currentLeaveId}
      noteLeaveDrawer={noteLeaveDrawer}
      handleLeaveNoteDrawer={handleLeaveNoteDrawer}
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
  updateStatusLeaveModal: leave.updateStatusLeaveModal,
  noteLeaveDrawer:leave.noteLeaveDrawer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeaveListRangeByUserId,
      updateLeaves,
      setEditLeave,
      handleUpdateLeaveModal,
      handleStatusLeaveModal,
      handleLeaveNoteDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeaveCardView);


