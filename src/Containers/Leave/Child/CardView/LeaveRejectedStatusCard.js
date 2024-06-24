import React, { useEffect, useState, useMemo, lazy } from "react";
import { Button } from "antd";
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

function LeaveRejectedStatusCard(props) {
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

  return (
    <>
    <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        {props.leaveListRangeByUserId
          .filter((sts) => sts.status === "Rejected")
          .map((item) => {
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");

            return (
              <>
                <div>
                  <div
                    className="flex justify-between mt-2 "
                    // style={hrStyle}
                    style={{
                      borderBottom: "3px dotted #515050",
                    }}
                  >
                    <div class=" flex flex-row justify-evenly w-wk">
                      <div className=" flex font-medium flex-col w-44 mb-1">
                        <div class=" text-sm  font-medium font-poppins">
                          Start Date
                        </div>

                        <div class=" font-normal text-xs  font-poppins">
                          {` ${dayjs(item.startDate).format("DD/MM/YYYY")}`}
                        </div>
                        <div className=" flex font-medium flex-col w-40">
                        <div class=" text-sm  font-medium font-poppins">
                          Reason
                        </div>

                        <div class=" font-normal text-xs  font-poppins">
                          {item.reason}
                        </div>
                      </div>
                      </div>

                      <div className=" flex font-medium flex-col w-40">
                        <div class=" text-sm  font-medium font-poppins">
                          End Date
                        </div>

                        <div class=" font-normal text-xs  font-poppins">
                          {` ${dayjs(item.endDate).format("DD/MM/YYYY")}`}
                        </div>
                        <div className=" flex font-medium flex-col w-max ">
                        <div class=" text-xs  font-poppins">
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
                              <div className="text-[red]">{item.status}</div>
                            </div>
                          )}
                        </div>
                      </div>
                        {/* </Tooltip>   */}
                      </div>
                      <div className=" flex font-medium flex-col w-40">
                        <div class=" text-sm  font-medium font-poppins">
                          Cover
                        </div>

                        <div class=" font-normal text-xs  font-poppins">
                          {item.coverDetails}
                        </div>
                        <div class="flex flex-col w-20">
                        <div></div>
                        <div>
                          <div>
                            {item.status === "Rejected" && (
                              <Button
                                type="primary"
                                onClick={() => {
                                  // this.props.reapply();
                                }}
                              >
                                Reapply
                              </Button>
                            )}
                          </div>
                        </div>
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
)(LeaveRejectedStatusCard);
