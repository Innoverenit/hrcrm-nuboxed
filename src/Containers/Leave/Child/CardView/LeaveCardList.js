import React, { useEffect, useState, lazy } from "react";
import { Button, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Select } from "antd";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from "@mui/icons-material/BorderColor";
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
function LeaveCardList(props) {
  const [page, setPage] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
       " Start Date",//0
          "End Date",//1
          "Cover",//2
          " Reason",//2
          " Waiting for approval",//3
          "Sector",//4
          "Category",//5
          "Share",//6
          "Value",//7
           "Owner",//8
           "Qualify"//9
        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);


  useEffect(() => {
    props.getLeaveListRangeByUserId(props.userId);

  }, []);

  const [currentLeaveId, setCurrentLeaveId] = useState("");

  function handleSetCurrentLeaveId(leaveId) {
    setCurrentLeaveId(leaveId);
    console.log(leaveId);
  }
  if (props.fetchingLeaveListRangeByUserId) {
    return <BundleLoader />

      ;
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
      <div class="rounded m-1 p-1 w-wk h-[31rem] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] max-sm:h-[13rem]">
        {/* <InfiniteScroll
                    dataLength={props.tableRequirement.length}
                next={handleLoadMore}
                hasMore={true}
                height={"20vh"}
            > */}
        {props.leaveListRangeByUserId.map((item) => {
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");

          return (
            <>
              <div>
                <div className="flex justify-between mt-2 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                  // style={hrStyle}
                  style={{
                    borderBottom: "3px dotted #515050"
                  }}
                >
                  <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                      <div class=" text-sm  font-medium font-poppins">
                        Start Date

                      </div>
                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        {` ${dayjs(item.startDate).format("ll")}`}
                      </div>

                    </div>
                    <div className=" flex font-medium flex-col md:w-40 max-sm:justify-between w-full max-sm:flex-row">
                      <div class=" text-sm  font-medium font-poppins">
                        End Date
                      </div>
                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        {` ${dayjs(item.endDate).format("ll")}`}
                      </div>
                      {/* </Tooltip>   */}
                    </div>
                    <div className=" flex font-medium flex-col md:w-40 max-sm:justify-between w-full max-sm:flex-row">

                      <div class=" text-sm  font-medium font-poppins">
                        Cover
                      </div>

                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        {item.coverDetails}
                      </div>

                    </div>
                    <div className=" flex font-medium flex-col md:w-[25rem] max-sm:justify-between w-full max-sm:flex-row">

                      <div class=" text-sm  font-medium font-poppins">
                        Reason
                      </div>

                      <div class=" font-normal text-[0.82rem]  font-poppins">
                        {item.reason}
                      </div>

                    </div>

                    <div className=" flex font-medium flex-col md:w-48 max-sm:justify-between w-full max-sm:flex-row ">
                      {/* <div class=" text-sm  font-poppins">Status</div> */}

                      <div class=" text-base  font-poppins">
                        {item.status === "Approved" && (
                          <div className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-green-500 p-[0px_0.62em]">
                            {item.status}
                          </div>
                        )}

                        {item.status === "Rejected" && (
                          <div className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-red-500 p-[0px_0.62em]">
                            {item.status}</div>
                        )}
                        {item.status === "Pending" && (
                          <div className=" rounded-[0.62em] m-[2px] items-center flex border-2 border-solid border-[#e1d16c] p-[0px_0.62em]">
                            <div className="text-[#e1d16c] text-sm"> Waiting for approval</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="flex flex-col justify-evenly w-20">
                      <div >
                        {item.status === "Pending" ?
                          <Tooltip title="Edit">
                            <BorderColorIcon
                              type="edit"
                              className="!text-icon cursor-pointer text-[tomato]"
                              onClick={() => {
                                props.setEditLeave(item);
                                handleUpdateLeaveModal(true);
                                handleSetCurrentLeaveId(item.leaveId);
                              }}
                            >
                            </BorderColorIcon>
                          </Tooltip>
                          : ""}
                      </div>
                      <div >
                        <div >
                          {item.status === "Pending" ? (
                            <Tooltip title="Delete">
                            <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                           
                            </Tooltip>
                          ) : null}
                          {item.status === "Rejected" && (
                            <Button type="primary"
                              onClick={() => {
                                // this.props.reapply();
                              }}>
                              Reapply
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })}
        {/* </InfiniteScroll> */}
      </div >

      <UpdateLeavesModal
      selectedLanguage={this.props.selectedLanguage}
      translateText={this.props.translateText}
        leaveId={currentLeaveId}
        updateLeaveModal={updateLeaveModal}
        handleUpdateLeaveModal={handleUpdateLeaveModal}
        handleSetCurrentLeaveId={handleSetCurrentLeaveId}
      />
    </>
  )
}
const mapStateToProps = ({ leave, auth }) => ({
  userId: auth.userDetails.userId,
  fetchingLeaveListRangeByUserId: leave.fetchingLeaveListRangeByUserId,
  fetchingLeaveListRangeByUserIdError:
    leave.fetchingLeaveListRangeByUserIdError,
  leaveListRangeByUserId: leave.leaveListRangeByUserId,
  // fetchingBankDetails: profile.fetchingBankDetails,
  updateLeaveModal: leave.updateLeaveModal,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeaveListRangeByUserId,
      updateLeaves,
      setEditLeave,
      handleUpdateLeaveModal,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(LeaveCardList)
