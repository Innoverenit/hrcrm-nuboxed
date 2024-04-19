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
import { CurrencySymbol, } from "../../../../Components/Common";
import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  MultiAvatar,
  MultiAvatar2,
 } from "../../../../Components/UI/Elements";
import {
  getRecruiterList,
  setEditOpportunity,
  getOpportunityInitiativeSKillDetails,
  updateOwneroppById,

  handleOpportunityDrawerModal,
  getAllRecruitmentByOppId,
  getAllRecruitmentPositionByOppId,
  getAllRecruitmentAvgTimeByOppId,
  getAllRecruitmentPositionFilledByOppId,
  getAllRecruitmentDetailsByOppId,
  LinkClosedOpportunity,
  getOpportunitySKill,
  lostStatusRecruit,
  LinkStageOpportunity,
  getOpportunityForecast,
} from "../../../Opportunity/OpportunityAction";
import {
  getDealListbyUserId,
  handleUpdateDealModal,
  emptyDeals,
  handleDealsNotesDrawerModal,
  LinkStageDeal,
  sendToWon,
  deleteDealsData
} from "../../DealAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
const UpdateDealModal =lazy(()=>import("../UpdateDeal/UpdateDealModal"));
const AddDealsNotesDrawerModal =lazy(()=>import("../AddDealsNotesDrawerModal"));
const DealSelectStages =lazy(()=>import("./DealSelectStages"));

function DealCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (props.role === "USER" && user.department === "Recruiter") {
      props.getRecruiterList(props.recruiterId);
    } else {
      props.getDealListbyUserId(props.userId, page);
      setPage(page + 1);
    }
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getDealListbyUserId(props.userId, page);
  };

  useEffect(() => {
    return () => props.emptyDeals();
  }, []);

  const [currentItem, setCurrentItem] = useState("");

  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

  const {
    user,
    dealsByuserId,
    handleUpdateDealModal,
    openupdateDealModal,
    deleteDealsData,
    history,
    fetchingDeal,
  } = props;

  return (
    <>
      <InfiniteScroll
        dataLength={dealsByuserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={
          fetchingDeal ? (
            <div class="flex justify-center">Loading...</div>
          ) : null
        }
        height={"87vh"}
      >
        <div class="flex flex-wrap w-full max-sm:justify-between max-sm:flex-col max-sm:items-center justify-center">

        { !fetchingDeal && dealsByuserId.length === 0 ?<NodataFoundPage />:dealsByuserId.map((item,index) =>  {
            var findProbability = item.probability;
            item.stageList.forEach((element) => {
              if (element.oppStage === item.oppStage) {
                findProbability = element.probability;
              }
            });
            return (
              <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[8rem] 
              text-[#444444] m-2 p-1 w-[16vw] flex flex-col justify-center max-sm:w-wk  ">
                <div class=" flex  flex-nowrap items-center h-[2.81em]"
                >
                  <div class=" mr-[0.2rem] flex basis-[15%]">
                    <MultiAvatar
                      primaryTitle={item.opportunityName}
                      imageId={item.imageId}
                      // imageURL={imageURL}
                      imgWidth={"1.8rem"}
                      imgHeight={"1.8rem"}
                    />
                  </div>
                  &nbsp;
                  <div class=" flex flex-col basis-[100%] overflow-hidden"
                  >
                    <div 
                      class="font-semibold text-[#337df4] cursor-pointer text-sm ">
                                                               <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`dealDetails/${item.invOpportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
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
                      <div class="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center">
                        {item.investor || ""}
                      </div>
                    )}
                  </div>
                  <div>
                    <div class="font-medium text-xs ml-1 "
                     
                    >
                     
                      {<CurrencySymbol currencyType={item.currency} />}
                      &nbsp;{item.proposalAmount || ""}
                    </div>
                  </div>
                </div>
                <div className="flex ">
        
        <div>
        <div class="font-medium text-xs ">
        </div>
        </div>
        </div>
                <div className="flex justify-around mt-1">
                  <div>
                    <span>
                      <Dropdown
                        overlay={
                          <div>
                            <Menu mode="horizontal">
                              <Menu.Item
                                style={{
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  backgroundColor: "#F5F5F5",
                                }}
                              >
                                <DealSelectStages
                                  rec={item}
                                  oppStage={item.oppStage}
                                  // recruitOwner={item.recruitOwner}
                                  // candidateName={item.candidateName}
                                  // approveInd={item.approveInd}
                                  // rejectInd={item.rejectInd}
                                  stageClick={(investorOppStagesId) => {
                                    props.LinkStageDeal({
                                      invOpportunityId: item.invOpportunityId,

                                      invOpportunityStagesId:
                                        investorOppStagesId,
                                    });
                                  }}
                                />{" "}
                              </Menu.Item>
                            </Menu>
                          </div>
                        }
                        trigger={["click"]}
                      >
                        <Tooltip title={item.oppStage}>
                          {" "}
                          <Progress
                            type="circle"
                            style={{ cursor: "pointer", color: "red" }}
                            percent={findProbability}
                            //disable={true}
                            width={30}
                     
                            strokeColor={"#005075"}
                          />
                        </Tooltip>
                      </Dropdown>
                    </span>
                  </div>
                  <span>
                    <MultiAvatar2
                      primaryTitle={item.assignedTo}
                      imgWidth={"1.8em"}
                      imgHeight={"1.8em"}
                    />
                  </span>
                </div>

                <div class="w-full ">
                  <div class="flex justify-between w-wk mt-1">
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
                           className="!text-xl cursor-pointer text-[green]"
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
                             className="!text-xl cursor-pointer text-[tomato]"
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
                            className="!text-xl text-[red] cursor-pointer"
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

      <UpdateDealModal
        currentItem={currentItem}
        openupdateDealModal={openupdateDealModal}
        handleUpdateDealModal={handleUpdateDealModal}
        handleSetCurrentItem={handleSetCurrentItem}
      />
      <AddDealsNotesDrawerModal
        currentItem={currentItem}
        addDrawerDealsNotesModal={props.addDrawerDealsNotesModal}
        handleDealsNotesDrawerModal={props.handleDealsNotesDrawerModal}
        handleSetCurrentItem={handleSetCurrentItem}
      />
      {/*
<AddOpportunityDrawerModal
 opportunityData={currentItem}
opportunityForecast={props.opportunityForecast}
opportunityInitiativesSkillsDetails={props.opportunityInitiativesSkillsDetails}
 handleSetCurrentItem={handleSetCurrentItem}
 
 fetchingOpportunitySkills={props.fetchingOpportunitySkills}
 item={currentItem}
 opportunitySkills={props.opportunitySkills}
allRecruitmentDetailsByOppId={props.allRecruitmentDetailsByOppId}
             allRecruitmentByOppId={props.allRecruitmentByOppId}
             allRecruitmentPositionFilledByOppId={props.allRecruitmentPositionFilledByOppId}
             allRecruitmentAvgTimeByOppId={props.allRecruitmentAvgTimeByOppId}
             allRecruitmentPositionByOppId={props.allRecruitmentPositionByOppId}
               handleOpportunityDrawerModal={props.handleOpportunityDrawerModal}
               addDrawerOpportunityModal={props.addDrawerOpportunityModal}
      /> */}
    </>
  );
}

const mapStateToProps = ({ auth, deal, opportunity }) => ({
  dealsByuserId: deal.dealsByuserId,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills: opportunity.opportunitySkills,
  recruiterName: opportunity.recruiterName,
  recruiterList: opportunity.recruiterList,
  fetchingRecruiterList: opportunity.fetchingRecruiterList,
  fetchingRecruiterListError: opportunity.fetchingRecruiterListError,
  fetchingDeal: deal.fetchingDeal,
  fetchingDealError: deal.fetchingDealError,
  fetchingAllOpportunities: opportunity.fetchingAllOpportunities,
  opportunityId: opportunity.opportunityId,
  openupdateDealModal: deal.openupdateDealModal,
  recruiterId: auth.userDetails.userId,
  addDrawerOpportunityModal: opportunity.addDrawerOpportunityModal,
  allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
  allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
  opportunityInitiativesSkillsDetails:
    opportunity.opportunityInitiativesSkillsDetails,
  allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
  addDrawerDealsNotesModal: deal.addDrawerDealsNotesModal,
  opportunityForecast: opportunity.opportunityForecast,
  allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
  allRecruitmentDetailsByOppId: opportunity.allRecruitmentDetailsByOppId,
  fetchingOpportunitySkills: opportunity.fetchingOpportunitySkills,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDealListbyUserId,

      getOpportunityInitiativeSKillDetails,
      getRecruiterList,
      getOpportunitySKill,
      getOpportunityForecast,
      handleUpdateDealModal,
      handleOpportunityDrawerModal,
      handleDealsNotesDrawerModal,
      setEditOpportunity,
      deleteDealsData,
      updateOwneroppById,
      getAllRecruitmentByOppId,
      getAllRecruitmentPositionByOppId,
      getAllRecruitmentAvgTimeByOppId,
      getAllRecruitmentPositionFilledByOppId,
      getAllRecruitmentDetailsByOppId,
      LinkClosedOpportunity,
      sendToWon,
      lostStatusRecruit,
      LinkStageOpportunity,
      emptyDeals,
      LinkStageDeal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DealCardList);
