import React, { useEffect, useState ,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import {  DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip,  Menu, Dropdown, Progress } from "antd";
import { Link } from 'react-router-dom';
import { CurrencySymbol, } from "../../../Components/Common";
import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../Components/UI/Antd";
import {
  MultiAvatar,
  MultiAvatar2,
 } from "../../../Components/UI/Elements";

import {
    getIncludedTaskList,
    getTaskIncludedCount,
    emptyIncludedTask
} from "../AuthAction";
import { BundleLoader } from "../../../Components/Placeholder";
const DealSelectStages =lazy(()=>import("../../Deal/Child/DealTable/DealSelectStages"));

function IncludedTaskCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (props.role === "USER" && user.department === "Recruiter") {
    //   props.getRecruiterList(props.recruiterId);
    } else {
      props.getIncludedTaskList(props.userId, page);
      props.getTaskIncludedCount(props.userId)
      setPage(page + 1);
    }
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getIncludedTaskList(props.userId, page);
  };

  useEffect(() => {
    return () => props.emptyIncludedTask();
  }, []);

  const [currentItem, setCurrentItem] = useState("");

  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

  const {
    user,
    taskIncluded,
    handleUpdateDealModal,
    openupdateDealModal,
    deleteDealsData,
    history,
    fetchingIncludedTask,
  } = props;

  
  if (fetchingIncludedTask) {
    return <BundleLoader />;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={taskIncluded.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={
          fetchingIncludedTask ? (
            <div class="flex justify-center">Loading...</div>
          ) : null
        }
        height={"75vh"}
      >
        <div class="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center">

          {taskIncluded.map((item) => {
            // var findProbability = item.probability;
            // item.stageList.forEach((element) => {
            //   if (element.oppStage === item.oppStage) {
            //     findProbability = element.probability;
            //   }
            // });
            return (
              <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[7rem] 
              text-[#444444] m-3 p-1 w-[19vw] flex flex-col  ">
                <div class=" flex flex-no-wrap items-center h-[2.81em]"
                >
                  <div class=" mr-[0.2rem]  basis-[15%]">
                    <MultiAvatar
                      primaryTitle={item.submittedBy}
                      imageId={item.imageId}
                      // imageURL={imageURL}
                      imgWidth={"1.8rem"}
                      imgHeight={"1.8rem"}
                    />
                  </div>
                  &nbsp;
                  <div class=" flex flex-col basis-[83%] overflow-hidden"
                  >
                    <div 
                      class="font-semibold text-[#337df4] cursor-pointer text-sm ">
                                                               <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`dealDetails/${item.invOpportunityId}`} title={item.opportunityName}>
      {item.submittedBy}
    </Link>
                      {/* <Link
                        toUrl={`dealDetails/${item.invOpportunityId}`}
                        title={`${item.opportunityName}`}
                      >
                        {item.opportunityName}
                      </Link> */}
                    </div>
                  </div>
                </div>
                <div className="flex justify-around">
                  <div>
                    {item.investor && (
                      <div class="overflow-hidden text-ellipsis cursor-pointer text-sm flex items-center">
                        {item.investor || ""}
                      </div>
                    )}
                  </div>
                  <div>
                    <div class="font-medium text-sm -mb-[0.18em]"
                     
                    >
                      &nbsp;&nbsp;
                      {<CurrencySymbol currencyType={item.currency} />}
                      &nbsp;{item.proposalAmount || ""}
                    </div>
                  </div>
                </div>


                <div class="w-full pl-[0.5em] -mt-[0.18em]">
                  <div class="flex justify-between w-wk">
                    <div>
                      {item.approveInd && item.opportunityOwner ? (
                        <>
                          <Tooltip
                            title={
                              <FormattedMessage
                                id="app.Own"
                                defaultMessage="Own"
                              />
                            }
                          >
                            <CheckCircleTwoTone
                              type="check-circle"
                              theme="twoTone"
                              twoToneColor="#24D8A7"
                              style={{ fontSize: "1rem" }}
                            />
                          </Tooltip>
                        </>
                      ) : item.rejectInd && item.opportunityOwner ? (
                        <>
                          <Tooltip title={"Lost"}>
                            {" "}
                            <StopTwoTone
                              type="stop"
                              theme="twoTone"
                              twoToneColor="red"
                              style={{
                                fontSize: "1rem",
                                marginLeft: "0.875em",
                              }}
                            />
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip
                            title={
                              <FormattedMessage
                                id="app.Own"
                                defaultMessage="Won"
                              />
                            }
                          >
                            <CheckCircleTwoTone
                              type="check-circle"
                              theme="twoTone"
                              twoToneColor="#24D8A7"
                              size={140}
                              style={{ fontSize: "1rem" }}
                              onClick={() =>
                                props.sendToWon(
                                  item.invOpportunityId,

                                  {
                                    wonInd: true,
                                  }
                                )
                              }
                            />
                          </Tooltip>
                          &nbsp; &nbsp;
                          <Tooltip
                            title={
                              <FormattedMessage
                                id="app.drop"
                                defaultMessage="Lost"
                              />
                            }
                          >
                            <StopTwoTone
                              type="stop"
                              theme="twoTone"
                              twoToneColor="red"
                              size={140}
                              style={{ fontSize: "1rem" }}
                              onClick={() =>
                                props.lostStatusRecruit(item.opportunityId, {
                                  lostInd: true,
                                })
                              }
                            />
                          </Tooltip>
                        </>
                      )}
                    </div>
                    <div>
                      <Tooltip
                        placement="right"
                        title={
                          <FormattedMessage
                            id="app.notes"
                            defaultMessage="Notes"
                          />
                        }
                      >
                        <span
                          onClick={() => {
                            props.handleDealsNotesDrawerModal(true);
                            handleSetCurrentItem(item);
                          }}
                        >
                          <NoteAltIcon
                            style={{
                              color: "green",
                              cursor: "pointer",
                              fontSize: "1rem",
                            }}
                          />
                        </span>
                      </Tooltip>
                      <Tooltip
                        placement="right"
                        title={
                          <FormattedMessage
                            id="app.edit"
                            defaultMessage="Edit"
                          />
                        }
                      >
                        {user.imInd === true && user.dealUpdateInd === true && (
                          <span class="cursor-pointer text-[blue]"
                            onClick={() => {
                              handleUpdateDealModal(true);
                              handleSetCurrentItem(item);
                            }}
                          >
                            <BorderColorIcon
                              style={{ color: "grey", fontSize: "1rem" }}
                            />
                          </span>
                        )}
                      </Tooltip>
                      <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() =>
                          deleteDealsData(item.invOpportunityId)
                        }
                      >
                         <Tooltip title="Delete">
                        {user.imInd === true && user.dealDeleteInd === true && (
                          <DeleteOutlined
                            type="delete"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "1rem",
                            }}
                          />
                        )}
                        </Tooltip>
                      </StyledPopconfirm>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </InfiniteScroll>

  

    </>
  );
}

const mapStateToProps = ({ auth, deal, opportunity }) => ({
    taskIncluded: auth.taskIncluded,
  userId: auth.userDetails.userId,
  taskIncludedCount:auth.taskIncludedCount,
  fetchingIncludedTask:auth.fetchingIncludedTask,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getIncludedTaskList,
        getTaskIncludedCount,
        emptyIncludedTask,

    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(IncludedTaskCardList);
