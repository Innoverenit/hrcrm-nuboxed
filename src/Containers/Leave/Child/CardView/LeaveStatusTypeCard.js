import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "antd";
import dayjs from "dayjs";
import { BundleLoader } from "../../../../Components/Placeholder";
import {
  updateLeaves,
  setEditLeave,
  handleUpdateLeaveModal,
} from "../../LeavesAction";
import { base_url } from "../../../../Config/Auth";
import axios from "axios";
const UpdateLeavesModal = lazy(() => import("../Tab/UpdateLeavesModal"));
const { Option } = Select;

function LeaveStatusTypeCard(props) {

    const [leaveList, setLeaveList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaveList = async () => {
          try {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            const config = {
              headers: {
                Authorization: `Bearer ${token || ""}`, 
              },
            };
            const response = await axios.get(`${base_url}/employee/leaves/${props.userId}`,config); 
            setLeaveList(response.data); 
          } catch (err) {
            setError("Failed to fetch leave data");
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchLeaveList();
      }, [props.userId]);


  const [currentLeaveId, setCurrentLeaveId] = useState("");

  function handleSetCurrentLeaveId(leaveId) {
    setCurrentLeaveId(leaveId);}
  if (loading) {
    return <BundleLoader />;}
  const { handleUpdateLeaveModal, updateLeaveModal } = props;

  const normalizedStatusType = props.statusType.toLowerCase();
  const filteredLeaveList = leaveList.filter(
    (item) => item.status.toLowerCase() === normalizedStatusType);

  return (
    <>
       <div class="rounded m-1 p-1 w-[98%] shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] overflow-scroll h-[29rem]">
       <div className="p-0.5 inline-flex items-center rounded-md w-max ml-1">
            <span className="pl-2 pr-4 relative">
              <span class="font-semibold text-sm -heading font-poppins"> {props.statusType} </span>
            </span>
          </div>   
      
       {filteredLeaveList.length === 0 ? (
        <p>No {props.statusType} leaves</p>
      ) : (
        filteredLeaveList.map((item) => {
            const currentdate = dayjs().format("DD/MM/YYYY");
            const date = dayjs(item.creationDate).format("DD/MM/YYYY");

            return (
              <>
                <div>
                  <div key={item.leaveId}
                    className="flex justify-between mt-2 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                    // style={hrStyle}
                    style={{
                      borderBottom: "3px dotted #515050",
                    }}
                  >
                    <div class=" flex flex-row justify-evenly w-wk">
                      <div className=" flex font-medium flex-col w-44 mb-1 ">
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

                        {/* </Tooltip>   */}
                        <div className=" flex font-medium flex-col w-max ">
                        <div class=" text-xs  font-poppins">
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
                      </div>
                      <div className=" flex font-medium flex-col w-40">
                        <div class=" text-sm  font-medium font-poppins">
                          Cover
                        </div>

                        <div class=" font-normal text-xs  font-poppins">
                          {item.coverDetails}
                        </div>
                      </div>                                    
                    </div>
                  </div>
                </div>
              </>
             );
            })
          )}
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
      updateLeaves,
      setEditLeave,
      handleUpdateLeaveModal,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveStatusTypeCard);
