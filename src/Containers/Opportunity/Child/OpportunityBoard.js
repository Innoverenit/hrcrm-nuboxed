

import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import StageColumns1 from "./StageColumns1";
import { elipsize } from "../../../Helpers/Function/Functions";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { StyledTabs, StyledModal } from "../../../Components/UI/Antd";
import { SmileOutlined, MehOutlined } from '@ant-design/icons';
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import {
    getProcessForOpportunity,
    getProcessStagesForOpportunity,
} from "../../Settings/SettingsAction";
import {getAllOpportunityListByUserId,updateOpportunitydragstage} from "../OpportunityAction"
import { Spin, message, notification, Button } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { CurrencySymbol } from "../../../Components/Common";
import { wrap } from "lodash";
const TabPane = StyledTabs.TabPane;

const ParentContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  display: flex;
  border-bottom: 0.06em solid lightgrey;
  position: absolute;

  // overflow-x: auto;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StageColumn = styled.div`
  background-color: whitesmoke;
  color: ${(props) => props.theme.color};
  float: left;
  overflow-x: scroll;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 17.5em;
  width: 200px;
  margin-top: 3.75em;
  overflow-y: auto;
  border-right: 0.06em solid #d2cfcf;
  /* background-color: ${(props) => props.theme.applicationBackground}; */
  /* color: ${(props) => props.theme.color}; */
  /* min-height: 43.12em; */
`;

const WonColumn = styled.div`
  position: fixed;
  bottom: 0;
  display: ${(props) => (props.isDraggingOver ? "flex" : "flex")};
  /* width: 43.12em; */
  height: 5em;
  /* background-color: lightgreen; */
  color: #fff;
  /* border: 0.06em solid ${(props) => props.theme.backgroundColor}; */
  transition: 0.3s all linear;
  margin-bottom:2.5em;
`;

const LossColumn = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  display: ${(props) => (props.isDraggingOver ? "flex" : "flex")};
  /* width: 43.12em; */
  height: 5em;
  /* background-color: tomato; */
  color: #fff;
  margin-right:0.62em;
  /* border: 0.06em solid ${(props) => props.theme.backgroundColor}; */
  transition: 0.3s all linear;
  margin-bottom:2.5em;
`;

const StageHeader = styled.div`
  background-color: rgb(24, 144, 255);
  color: white;
  font-size: 0.93em;
  width: 200px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 0.06em solid ${(props) => props.theme.backgroundColor};
  padding: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  /* position:fixed; */
`;
const DragDropContextDiv = styled.div`
  background-color: whitesmoke;
  color: ${(props) => props.theme.color};
  font-size: 1.2em;
  height: 600px;
  width: 56.25em;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  /* position:fixed; */
`;

function OpportunityBoard(props) {
  const { userId, opportunities, process, ProcessStages, udatingOpp } = props;
  // const [processId, setProcessId] = useState("");

  function proposalAmountCalculate(stageId) {
    const { opportunities } = props;
    let value = 0;
    opportunities.forEach((item) => {
      if (item.stageId === stageId) {
        //debugger;
        value = value + item.userCurrencyAmount;
      }
    });
    return Math.round(value);
  }

  // const getArray = process[0];
  // console.log("getArray value...........", getArray);
  // setProcessId(process[0]);
  // // useEffect(() => {
  // //   console.log("getArray value...........", process[0].processId);
  // // });
  // console.log(processId);

  const processData = useMemo(() => {
    if (!props.opportunityProcess) return null;
    let id = props.opportunityProcess[0];
    return id;
  }, [props.opportunityProcess]);

  useEffect(() => {
    //debugger;
    // if (!processData) return;
    props.getProcessForOpportunity(props.orgId);
     props.getAllOpportunityListByUserId(props.userId)
  }, []);

  useEffect(() => {
    //debugger;
    if (!processData) return;
    props.getProcessStagesForOpportunity(processData.opportunityWorkflowDetailsId);
  }, [processData]);
  // var newArr = Array.from(process.length && process);
  // console.log("shifting value...........", newArr);
  // if (newArr.length) {
  //   const value = newArr.shift();
  //   console.log("shifting value...........", value);
  //   const processId = value["processId"];
  //   console.log("processId value...........", processId);
  // }
  // const processId = value["processId"];
  // console.log("processId value...........", processId);
  // useEffect(() => {
  //   if (!processId) return;
  //   props.getProcessStages(processId);
  // }, [processId]);
  // const processId = useMemo(() => {
  //   const value = props.process.shift();
  //   console.log("shifting value...........", value);
  //   return value;
  // });
  // console.log("ProcessID>>>>>>>>>>>>>>>>>>>>>>>>>>>>", processId);

  // const processId = useMemo(() => {
  //   if (!opportunities) return null;
  //   var processMapper = {};

  //   for (var i = 0; i < opportunities.length; i++) {
  //     const val = opportunities[i].processId;
  //     console.log(val);
  //     if (!processMapper[val]) {
  //       //debugger;
  //       processMapper[val] = 1;
  //     } else {
  //       processMapper[val] = processMapper[val] + 1;
  //     }
  //   }
  //   console.log(processMapper);
  //   let val = 0;
  //   let id = "";
  //   Object.entries(processMapper).forEach(([key, value]) => {
  //     if (value > val) {
  //       val = value;
  //       id = key;
  //     }
  //   });
  //   return id;
  // }, [opportunities]);

  const [isDragging, setIsDragging] = useState(false);
  const [currentProcess, setCurrentProcess] = useState({});
  const close = (key) => {
    //debugger;

    notification.close(key);
    console.log(
      "Notification was closed. Either the close button was clicked or duration time elapsed."
    );
  };
  function openNotification(opportunityId, stageId) {
    const key = `success`;
    const btn = (
      <></>
      // <Button
      //   type="primary"
      //   size="small"
      //   onClick={() => notification.close(key)}
      // >
      //   Confirm
      // </Button>
    );
    // notification.open({
    //   message: "Congratulations on this Win!",
    //   icon: <SmileOutlined style={{ color: "tomato" }} />,
    //   description: (
    //     <AddReason
    //       addReson={props.addReson}
    //       opportunityId={opportunityId}
    //       stageId={stageId}
    //       close={close}
    //     />
    //   ),
    //   duration: 0,
    //   closeIcon: null,
    //   // btn,
    //   key,
    //   onClose: close,
    //   style: {
    //     backgroundColor: "whiteSmoke",
    //   },
    // });
  }

  function openNotificationForLoss(opportunityId, stageId) {
    const key = `success`;
    const btn = (
      <></>
      // <Button
      //   type="primary"
      //   size="small"
      //   onClick={() => notification.close(key)}
      // >
      //   Confirm
      // </Button>
    );
    // notification.open({
    //   message: "Better luck next time",
    //   icon: <MehOutlined style={{ color: "#108ee9" }} />,
    //   description: (
    //     <AddReason
    //       addReson={props.addReson}
    //       opportunityId={opportunityId}
    //       stageId={stageId}
    //       close={close}
    //       forLoss
    //     />
    //   ),
    //   duration: 0,
    //   // btn,
    //   key,
    //   onClose: close,
    //   style: {
    //     backgroundColor: "whiteSmoke",
    //   },
    // });
  }
//   function handleCallback(data) {
//     //debugger;
//     const { getOpportunityRelatedData, userId, startDate, endDate } = props;
//     if (data.probability === 100) {
//       //debugger;
//       openNotification(data.opportunityId, data.stageId);

//       getOpportunityRelatedData(userId, startDate, endDate);
//     } else if (data.probability === 0) {
//       openNotificationForLoss(data.opportunityId, data.stageId);
//       getOpportunityRelatedData(userId, startDate, endDate);
//     } else {
//       getOpportunityRelatedData(userId, startDate, endDate);
//     }
//   }
  function onDragEnd(result) {
    console.log(result);
    setIsDragging(false);
    //stop navigation is offline
    if (!navigator.onLine) {
      return;
    }
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const { draggableId, destination, source } = result;
    console.log(destination);
    console.log("drag",draggableId);
    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const {
      updateOpportunitydragstage,
      getOpportunityRelatedData,
      userId,
      startDate,
      endDate,
    } = props;
    let data={
      opportunityStagesId:destination.droppableId,
      opportunityId:result.draggableId,
    }
    updateOpportunitydragstage(data,
      source.droppableId,
      destination.droppableId,
      draggableId,
      //handleCallback
    );
  }

  function dragStart() {
    setIsDragging(true);
  }
  function dragUpdate() {
    setIsDragging(false);
  }
//   useEffect(() => {
//     if (!userId) return;
//     props.getProcess();
//     props.getOpportunities(userId);
//     props.getAccounts(userId);
//   }, [userId]);

  function handleProcessClick(item) {
    setCurrentProcess(item);
    props.getProcessStagesForOpportunity(item.opportunityWorkflowDetailsId);
  }
  function handleTabChange() { }
  // if (props.fetchingProcessStages) {
  //   return <BundleLoader />;
  // }
  // useEffect(() => {
  //   openNotification();
  // });
//   if (props.fetchingOpportunities) {
//     return <BundleLoader />;
//   }
  return (
    <FlexContainer flexWrap="nowrap">
      <MainWrapper
        style={{
          width: "100%",
          color: "#FFFAFA",
          height: "100vh",
        }}
      >
        <div style={{ display: "flex" }}>
        <StyledTabs
  // defaultActiveKey={this.state.activeKey}
  onChange={handleTabChange}
  type="card"
>
  {props.opportunityProcess
    .filter(item => item.publishInd === true)
    .map((item, i) => (
      <TabPane
        key={i}
        tab={
          <span onClick={() => handleProcessClick(item)}>
          {elipsize(item.workflowName, 15)}
          </span>
        }
      ></TabPane>
    ))}
</StyledTabs>

        </div>
        {/* {!props.opportunities.length ? (
          <BundleLoader />
        ) : ( */}
          
            <FlexContainer flexWrap="no-wrap" style={{ justifyContent:"center"}}>
              <DragDropContext
                 onDragEnd={onDragEnd}
                type="stage"
                 onDragStart={dragStart}
              >
                <Container style={{ marginTop: "0.75em" }}>
                  <>
                    {props.opportunityProcessStages &&props.opportunityProcessStages
                      
                     
                      .map((stage, index) => (
                        <Droppable
                          key={index}
                          droppableId={stage.opportunityStagesId}
                          type="stage"
                        
                        >
                          {(provided, snapshot) => (
                            <>
                            
                                <div
                                  style={{
                                    display: "flex",
                                  }}
                                >
                                  <StageHeader style={{ position: "absolute" }}>
                                    <div>{stage.stageName}</div>
                                    {/* <div>
                                      {`${props.tradeCurrency} `}
                                  

                                      {proposalAmountCalculate(stage.stageId)}
                                    </div> */}
                                  </StageHeader>
                                  <Spin
                                    tip="Loading..."
                                    spinning={udatingOpp ? true : false}
                                  >
                                    <StageColumn
                                      ref={provided.innerRef}
                                      isDraggingOver={snapshot.isDraggingOver}
                                      {...provided.droppableProps}
                                      droppableProps={{ hello: "world" }}
                                      className="scrollbar"
                                      id="style-3"
                                    >
                                      {props.opportunityByUserId
                                        .filter(
                                          (opp, index) =>
                                            opp.opportunityStagesId === stage.opportunityStagesId
                                        )
                                        .map((opp, index) => {
                                          return (
                                            <StageColumns1
                                              key={index}
                                              opportunity={opp}
                                              index={index}
                                              history={props.history}
                                            />
                                          );
                                        })}
                                        {/* <h1>Hello World</h1> */}
                                    </StageColumn>
                                  </Spin>
                                </div>
                              
                            </>
                          )}
                        </Droppable>
                      ))}
                  </>
                </Container>
              </DragDropContext>
            </FlexContainer>
          
        {/* )} */}
      </MainWrapper>
    </FlexContainer>
  );
}

const mapStateToProps = ({
  opportunity,
  account,
  dashboard,
  auth,
  settings,
}) => ({
    opportunityProcess: settings.opportunityProcess,
    orgId: auth.userDetails && auth.userDetails.organizationId,
//   fetchingOpportunities: opportunity.fetchingOpportunities,
//   startDate: dashboard.startDate,
//   endDate: dashboard.endDate,
   userId: auth.userDetails.userId,
   opportunityByUserId:opportunity.opportunityByUserId,
//   process: settings.Process,
//   tradeCurrency: auth.userDetails.tradeCurrency,
//   opportunities: opportunitySelector(opportunity, account),
//   ProcessStages: settings.ProcessStages,
//   stages: opportunity.stages,
//   fetchingProcessStages: settings.fetchingProcessStages,
//   udatingOpp: opportunity.udatingOpp,
opportunityProcessStages: settings.opportunityProcessStages,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getProcessForOpportunity,
        getProcessStagesForOpportunity,
        getAllOpportunityListByUserId,
        updateOpportunitydragstage
    //   updateOpportunityStage,
    //   getOpportunityRelatedData,
    //   getOpportunities,
    //   getAccounts,
    //   getStages,
    //   getProcess,
    //   getProcessStages,
    //   addReson,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OpportunityBoard)
);
