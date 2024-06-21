import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import {
  getLeaveListRangeByUserId,
  updateLeaves,
  setEditLeave,
  handleUpdateLeaveModal,
} from "../../LeavesAction";
const UpdateLeavesModal = lazy(() => import("../Tab/UpdateLeavesModal"));
const { Option } = Select;

function LeaveApprovedStatusCard(props) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    props.getLeaveListRangeByUserId(props.userId);
  }, []);

  const [currentLeaveId, setCurrentLeaveId] = useState("");

  function handleSetCurrentLeaveId(leaveId) {
    setCurrentLeaveId(leaveId);
    console.log(leaveId);
  }
  if (props.fetchingLeaveListRangeByUserId) {
    return <BundleLoader />;
  }
  const { handleUpdateLeaveModal, updateLeaveModal } = props;

  return (
    <>
       <div class="rounded m-1 p-1 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
        {props.leaveListRangeByUserId
          .filter((sts) => sts.status === "Approved")
          .map((item) => {
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");

            return (
              <>
                <div>
                  <div
                    className="flex justify-between mt-2 scale-[0.99] hover:scale-100 ease-in duration-100 shadow-2xl  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                    // style={hrStyle}
                    style={{
                      borderBottom: "3px dotted #515050",
                    }}
                  >
                    <div class=" flex flex-row justify-evenly w-wk">
                      <div className=" flex font-medium flex-col w-44 mb-1 ">
                        <div class=" text-sm text-cardBody font-medium font-poppins">
                          Start Date
                        </div>

                        <div class=" font-normal text-xs text-cardBody font-poppins">
                          {` ${dayjs(item.startDate).format("DD/MM/YYYY")}`}
                        </div>
                        <div className=" flex font-medium flex-col w-40">
                        <div class=" text-sm text-cardBody font-medium font-poppins">
                          Reason
                        </div>

                        <div class=" font-normal text-xs text-cardBody font-poppins">
                          {item.reason}
                        </div>
                      </div>
                      </div>

                      <div className=" flex font-medium flex-col w-40">
                        <div class=" text-sm text-cardBody font-medium font-poppins">
                          End Date
                        </div>

                        <div class=" font-normal text-xs text-cardBody font-poppins">
                          {` ${dayjs(item.endDate).format("DD/MM/YYYY")}`}
                        </div>

                        {/* </Tooltip>   */}
                        <div className=" flex font-medium flex-col w-max ">
                        <div class=" text-xs text-cardBody font-poppins">
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
                              <div className="text-[green]">{item.status}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      </div>
                      <div className=" flex font-medium flex-col w-40">
                        <div class=" text-sm text-cardBody font-medium font-poppins">
                          Cover
                        </div>

                        <div class=" font-normal text-xs text-cardBody font-poppins">
                          {item.coverDetails}
                        </div>
                      </div>
                    

                     
                    </div>
                  </div>
                </div>
              </>
            );
          })}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveApprovedStatusCard);
