import React, { useEffect, useMemo, useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components"; 
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { StyledTabs} from "../../../Components/UI/Antd";
import { MainWrapper, } from "../../../Components/UI/Layout";
import {
    getProcessForProduction,
    getProcessStagesForProduction,
    updateStageForProduction
} from "../../Settings/SettingsAction";
import { Spin } from "antd";
import {getAllDealsbyUserId} from "../../Deal/DealAction";
// const DealStageColumn =lazy(()=>import("./DealStageColumn"));

const TabPane = StyledTabs.TabPane;


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
  background-color: rgb(214, 144, 149);
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


function ProductionBoard(props) {
  const { udatingOpp } = props;



  const processData = useMemo(() => {
    if (!props.productionProcess) return null;
    let id = props.productionProcess[0];
    return id;
  }, [props.productionProcess]);

  useEffect(() => {
    props.getProcessForProduction(props.orgId);
     props.getAllDealsbyUserId(props.userId)
  }, []);

  useEffect(() => {
    if (!processData) return;
    props.getProcessStagesForProduction(processData.productionWorkflowDetailsId);
  }, [processData]);


  const [isDragging, setIsDragging] = useState(false);
  const [currentProcess, setCurrentProcess] = useState({});



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
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const {
        updateStageForProduction,
    } = props;
    let data={
        productionStagesId:destination.droppableId,
        manufactureId:result.draggableId,
        // invOppStagesId:destination.droppableId,
    }
    updateStageForProduction(data,
      source.droppableId,
      destination.droppableId,
      draggableId,
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
    props.getProcessStagesForProduction(item.productionWorkflowDetailsId);
  }


  return (
    <div class=" flex flex-no-wrap" >
      <MainWrapper
        style={{
          width: "100%",
          color: "#FFFAFA",
          height: "100vh",
        }}
      >
        <div class=" flex" >
          <StyledTabs
            type="card"
          >
            {props.productionProcess.map((item, i) => {
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

          
            <div class=" flex flex-no-wrap justify-center" >
              <DragDropContext
                 onDragEnd={onDragEnd}
                type="stage"
                 onDragStart={dragStart}
              >
                <Container style={{ marginTop: "0.75em" }}>
                  <>
                    {props.productionProcessStages &&props.productionProcessStages
                      
                     
                      .map((stage, index) => (
                        <Droppable
                          key={index}
                          droppableId={stage.investorOppStagesId}
                          type="stage"
                        
                        >
                          {(provided, snapshot) => (
                            <>
                            
                                <div class=" flex"
                                >
                                  <StageHeader style={{ position: "absolute" }}>
                                    <div>{stage.stageName}</div>
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
                                      {/* {props.dealsByuserId
                                        .filter(
                                          (opp, index) =>
                                            opp.invOpportunityStagesId === stage.investorOppStagesId
                                        )
                                        .map((opp, index) => {
                                          return (
                                            <DealStageColumn
                                              key={index}
                                              dealDetailsbyID={opp}
                                              index={index}
                                              history={props.history}
                                            />
                                          );
                                        })} */}
                                 Hello Pro !
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
            </div>
          
      </MainWrapper>
    </div>
  );
}

const mapStateToProps = ({
  opportunity,
  account,
  dashboard,
  auth,
  settings,
  deal
}) => ({
    productionProcess: settings.productionProcess,
    orgId: auth.userDetails && auth.userDetails.organizationId,
   userId: auth.userDetails.userId,
   dealsByuserId:deal.dealsByuserId,
productionProcessStages: settings.productionProcessStages,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getProcessForProduction,
        getProcessStagesForProduction,
        getAllDealsbyUserId,
        updateStageForProduction
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
  connect(mapStateToProps, mapDispatchToProps)(ProductionBoard)
);
