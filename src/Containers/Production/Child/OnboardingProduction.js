import React, { useEffect,useState } from 'react';
import { Select, } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import styled from "styled-components";
import {updateProductionstage,getProductionStage} from "../ProductionAction"
import StageProductionColumns from "../Child/StageProductionColumns"
const { Option } = Select;

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  display: flex;
  border-bottom: 0.06em solid lightgrey;
  position: absolute;
height:14rem;
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
  height: 14rem;
  width: 200px;
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

const OnBoardingProduction = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  
const [selectedWork, setSelectedWork] = useState("");

  const [stage, setStage] = useState("")
  const [selectedStage, setSelectedStage] = useState("");
 
  useEffect(() => {
    props.getProductionStage(props.userId);
    // setPage(page + 1);
    // props.getRoomRackByLocId(props.locationId, props.orgId);
}, []);

  useEffect(() => {
    
    
    if (props.productionTableStage.length > 0) {
      //setSelectedWork(props.userStageList[0]?.unboardingWorkflowDetailsName)
     
    }
  }, [props.productionTableStage]);

  // useEffect(() => {
  //   if (
  //     props.userStageList !== undefined 
      
  //   ) {
  //     setSelectedWork( props.userStageList);
      
      
  //     // Perform a null check before accessing substring
      
  //   }
  // }, [props.userStageList, ]);
  

  const { onboardingProcess, ratingValue } = props;
  const handleWorkflowChange = (val) => {
    setSelectedWork(val)
    // props.getProcessStagesForOnboarding(val);
} 

const handleStages = (val) => {
  setStage(val);
  setSelectedStage(val); // Set the selected stage ID
};

  // const handleWorkflowChange = (event) => {
  //   const selectedWork = event.target.value;
  //   setSelectedWork(selectedWork);
  //   //  setSelectedUser("");
  //    props.getProcessStagesForOnboarding(selectedWork) // Assuming you want to pass the selected department and filtered roles to a parent component
  // };
 

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

    // const {
    //   updateOpportunitydragstage,

    // } = props;
    let data={
      unboardingStagesId:destination.droppableId,
      unboardingWorkflowDetailsId:result.draggableId,
      //employeeId:props.employeeName.employeeId
    } 
    props.updateProductionstage(
      draggableId,
      destination.droppableId,
      props.userId
    
      // props.employeeName.employeeId

    );
  }

  function dragStart() {
    setIsDragging(true);
  }
//   if(props.fetchingUserStageList){
//     return <BundleLoader/>
//   }
  return (
    <>
      <div className="mt-4 flex">
     
       
      </div>
    
        <div class="flex flex-no-wrap justify-center" >
              <DragDropContext
                 onDragEnd={onDragEnd}
                type="stage"
                 onDragStart={dragStart}
              >
                <Container style={{ marginTop: "0.75em",marginLeft:"2em" }}>
                 
                  
                      <>
                      {props.productionTableStage.map((stage, stageIndex) => (
                        <Droppable
                        key={stageIndex}
                        droppableId={stage.productionStagesId}
                        type="stage"
                      
                      >
                        {(provided, snapshot) => (
                          
                            <>
                             
                            <div class=" flex"
                                >
                                  <StageHeader 
                                  style={{ position: "absolute" }}
                                  >
                                    <div>{stage.stageName}</div>
                                    <div>
                                    </div>
                                  </StageHeader>
                                
                                  {/* <Spin
                                    tip="Loading..."
                                    //spinning={udatingOpp ? true : false}
                                  > */}
                                    <StageColumn
                                      ref={provided.innerRef}
                                      isDraggingOver={snapshot.isDraggingOver}
                                      {...provided.droppableProps}
                                      droppableProps={{ hello: "world" }}
                                      style={{scrollbarWidth:"thin", backgroundColor:"f5f5f5" }}
                                    >
                                      
                                        
                                            <StageProductionColumns
                                              //  key={stageIndex}
                                              key={stage.productionStagesId}
                                              employee={stage}
                                              // data={item}
                                              index={stageIndex}
                                              // history={props.history}
                                            />
                                            {/* Hello */}
                                       
                                    </StageColumn>
                                  {/* </Spin> */}
                                </div>
                               
                            </>
                          
                         )}
                          
                        </Droppable>
                         ))}
                         </>
                      
              
                </Container>
              </DragDropContext>
            </div>
    </>
  );
};

const mapStateToProps = ({ settings, employee,auth,production }) => ({
//   onboardingProcessStages:settings.onboardingProcessStages,
userId: auth.userDetails.userId,
productionTableStage:production.productionTableStage
//   onboardingProcess: settings.onboardingProcess,
//   userStageList:employee.userStageList,
//   fetchingUserStageList:employee.fetchingUserStageList,
//   setEditingEmployee:employee.setEditingEmployee,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateProductionstage,
      getProductionStage
    //   getProcessForOnboarding,
    //   getProcessStagesForOnboarding,
    //   addOnboardingEmployee,
    //   getUserStageList,
    //   addEmployeeWorkflow,
    //   updateUserdragstage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OnBoardingProduction);
