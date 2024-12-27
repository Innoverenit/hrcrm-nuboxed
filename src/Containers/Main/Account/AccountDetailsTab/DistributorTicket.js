import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { MainWrapper } from "../../../../Components/UI/Layout";
import {
  getProcessForOpportunity,
  getProcessStagesForOpportunity,
} from "../../../../Containers/Settings/SettingsAction";
import { getTicket, updateTicketStage } from "../AccountAction";
import StageColumnsTicket from "./StageColumnsTicket";
import { Spin } from "antd";
const TabPane = StyledTabs.TabPane;
const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  display: flex;
  border-bottom: 0.06em solid lightgrey;
  position: absolute;
  height: 26rem;
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
  height: 26rem;
  width: 250px;
  margin-top: 3.75em;
  overflow-y: auto;
  border-right: 0.06em solid #d2cfcf;
  /* background-color: ${(props) => props.theme.applicationBackground}; */
  /* color: ${(props) => props.theme.color}; */
  /* min-height: 43.12em; */
`;

const StageHeader = styled.div`
  background-color: rgb(14, 149, 144);
  color: white;
  font-size: 0.93em;
  width: 250px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 0.06em solid ${(props) => props.theme.backgroundColor};
  padding: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  /* position:fixed; */
`;

function DistributorTicket(props) {
  const { udatingOpp } = props;
  const processData = useMemo(() => {
    if (!props.opportunityProcess) return null;

    const publishIndTrueItem = props.opportunityProcess.find(
      (item) => item.publishInd === true
    );
    console.log("publishIndTrueItem", publishIndTrueItem);
    return publishIndTrueItem ? publishIndTrueItem : null;
  }, [props.opportunityProcess]);

  let type = "Quotation";
  useEffect(() => {
    props.getProcessForOpportunity(props.orgId, type);
    props.getTicket(props.orgId);
  }, []);

  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (
        e.message === "ResizeObserver loop limit exceeded" ||
        e.message === "Script error."
      ) {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);
  useEffect(() => {
    if (!processData) return;
    console.log("processData", processData);
    props.getProcessStagesForOpportunity(
      props.orgId,
      processData.workflowDetailsId
    );
  }, [processData]);
  const [isDragging, setIsDragging] = useState(false);
  const [currentProcess, setCurrentProcess] = useState({});
  function onDragEnd(result) {
    console.log(result);
    setIsDragging(false);

    if (!navigator.onLine) {
      return;
    }

    if (!result.destination) {
      return;
    }
    const { draggableId, destination, source } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const { updateTicketStage } = props;
    let data = {
      stageId: destination.droppableId,
      tckId: result.draggableId,
      orgId: props.orgId,
      userId: props.userId,
    };
    updateTicketStage(
      data,
      source.droppableId,
      destination.droppableId,
      draggableId
    );
  }

  function dragStart() {
    setIsDragging(true);
  }
  function dragUpdate() {
    setIsDragging(false);
  }

  function handleProcessClick(item) {
    setCurrentProcess(item);
    props.getProcessStagesForOpportunity(props.orgId, item.workflowDetailsId);
  }

  return (
    <div class=" flex flex-no-wrap">
      <MainWrapper
        style={{
          width: "100%",
          color: "#FFFAFA",
          height: "100vh",
        }}
      >
        <div class="flex">
          <StyledTabs type="card">
            {props.opportunityProcess
              .filter((item) => item.publishInd === true)
              .map((item, i) => {
                return (
                  <TabPane
                    key={i}
                    tab={
                      <span onClick={() => handleProcessClick(item)}>
                        {item.workflowName}
                      </span>
                    }
                  ></TabPane>
                );
              })}
          </StyledTabs>
        </div>

        <div class="flex flex-no-wrap justify-center">
          <DragDropContext
            onDragEnd={onDragEnd}
            type="stage"
            onDragStart={dragStart}
          >
            <Container style={{ marginTop: "0.75em" }}>
              <>
                {props.opportunityProcessStages &&
                  props.opportunityProcessStages.map((stage, index) => (
                    <Droppable
                      key={index}
                      droppableId={stage.stagesId}
                      type="stage"
                    >
                      {(provided, snapshot) => (
                        <>
                          <div class=" flex">
                            <StageHeader style={{ position: "absolute" }}>
                              <div>{stage.stageName}</div>
                              <div></div>
                            </StageHeader>

                            <StageColumn
                              ref={provided.innerRef}
                              isDraggingOver={snapshot.isDraggingOver}
                              {...provided.droppableProps}
                              droppableProps={{ hello: "world" }}
                              style={{
                                scrollbarWidth: "thin",
                                backgroundColor: "f5f5f5",
                              }}
                            >
                              {props.ticketList
                                .filter(
                                  (opp, index) => opp.stageId === stage.stagesId
                                )
                                .map((opp, index) => {
                                  return (
                                    <StageColumnsTicket
                                      key={index}
                                      opportunity={opp}
                                      index={index}
                                      history={props.history}
                                    />
                                  );
                                })}
                              {props.ticketList.length === 0 && (
                                <div className="loader-container">
                                  <Spin />
                                </div>
                              )}
                            </StageColumn>
                          </div>
                        </>
                      )}
                    </Droppable>
                  ))}
              </>
            </Container>
          </DragDropContext>
        </div>
      </MainWrapper>
    </div>
  );
}
const mapStateToProps = ({ opportunity, auth, settings, distributor }) => ({
  opportunityProcess: settings.opportunityProcess,
  orgId: auth.userDetails && auth.userDetails.organizationId,
  userId: auth.userDetails.userId,
  ticketList: distributor.ticketList,
  fetchingTicketList: distributor.fetchingTicketList,
  opportunityByUserId: opportunity.opportunityByUserId,
  opportunityProcessStages: settings.opportunityProcessStages,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessForOpportunity,
      getProcessStagesForOpportunity,
      getTicket,
      updateTicketStage,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DistributorTicket)

