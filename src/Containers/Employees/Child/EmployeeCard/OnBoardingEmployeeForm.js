import React, { useEffect,useState } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Button,Select,Steps,Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import moment from 'moment';
import styled from "styled-components";
 import { getProcessForOnboarding ,getProcessStagesForOnboarding} from '../../../Settings/SettingsAction';
import { Field } from 'formik';
import {addOnboardingEmployee,addEmployeeWorkflow,getUserStageList,updateUserdragstage} from "../../../Employees/EmployeeAction"
import { FormattedMessage } from 'react-intl';
import { SelectComponent } from '../../../../Components/Forms/Formik/SelectComponent';
import StageEmployeeColumns1 from './StageEmployeeColumns1';
import { BundleLoader } from '../../../../Components/Placeholder';
const { Option } = Select;

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  display: flex;
  border-bottom: 0.06em solid lightgrey;
  position: absolute;
height:26rem;
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

const OnBoardingEmployeeForm = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedWork, setSelectedWork] = useState(props.userStageList.unboardingWorkflowDetailsName);
  const [stage, setStage] = useState("")
  const [selectedStage, setSelectedStage] = useState("");
  useEffect(() => {
    props.getProcessForOnboarding(props.orgId);
    props.getUserStageList(props.employeeName.employeeId);
  }, []);


  // useEffect(() => {
    
  //   // Check if data is available
  //   if (props.userStageList.length > 0) {
  //     setSelectedWork(props.userStageList&&props.userStageList.unboardingWorkflowDetailsName)
  //     // Update activeTab when data is available
  //     // setActiveTab(props.organizationDetailsList[0]?.organizationId);
  //   }
  // }, [props.userStageList]);

  useEffect(() => {
    if (
      props.userStageList.unboardingWorkflowDetailsName !== undefined 
      
    ) {
      setSelectedWork( props.userStageList.unboardingWorkflowDetailsName);
      
      
      // Perform a null check before accessing substring
      
    }
  }, [props.userStageList.unboardingWorkflowDetailsName, ]);
  console.log(props.userStageList)
  console.log(props.userStageList.unboardingWorkflowDetailsName)

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
  console.log("cgdf",props.currentEmployeeId)

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

    const {
      updateOpportunitydragstage,

    } = props;
    let data={
      unboardingStagesId:destination.droppableId,
      unboardingWorkflowDetailsId:result.draggableId,
      employeeId:props.employeeName.employeeId
    } 
    props.updateUserdragstage(data,
      source.droppableId,
      destination.droppableId,
      draggableId,
      props.employeeName.employeeId

    );
  }

  function dragStart() {
    setIsDragging(true);
  }
  if(props.fetchingUserStageList){
    return <BundleLoader/>
  }
  return (
    <>
      <div className="mt-4 flex">
      <div class=" w-[35%]" >
                                                    <label class=" text-[#444] font-bold text-[0.75rem]" >Workflow</label>
                                                    <Select
                        style={{
                            width: 170,
                        }}
                        value={selectedWork}
                        onChange={(value) => handleWorkflowChange(value)}
                    >
                        {onboardingProcess.map((a) => {
                            return <Option value={a.unboardingWorkflowDetailsId}>{a.workflowName}</Option>;
                        })}
                    </Select>
                                                    {/* <select className="customize-select" onChange={handleWorkflowChange}>
            <option value="">Select Workflow</option>
            {onboardingProcess.map((item, index) => (
              <option key={index} value={item.unboardingWorkflowDetailsId}>
                {item.workflowName}
              </option>
            ))}
          </select> */}
        </div>
        {/* {selectedWork && (
          <>                                           
          <div class="bg-white">
          <Steps direction="vertical" current={1}>
                {props.onboardingProcessStages.map((user, index) => (
                  <Steps.Item
                  value={selectedStage}
                  onChange={(value) => handleStages(value)}
                   key={index}  title={user.stageName} 
                   
                   >
                    <div>
                     
                      <Button value={user.UnboardingStagesId}> {user.stageName}</Button>
                    </div>
                  </Steps.Item>
                ))}
              </Steps>
  

    </div>              
</> 
        )}  */}
       
       <Button
                    type='primary'
                    onClick={() => props.addEmployeeWorkflow({
                      
                        employeeId: props.employeeName.employeeId,
                        unboardingWorkflowDetailsId: selectedWork,
                        // stageId: selectedStage,
                    
                    },
                        // props.rowData.orderPhoneId,
                        // props.locationId
                    )}>
                    Submit
                </Button>
      
       
     
      </div>
      <div class=" flex justify-end">
        <Tooltip title="Release Registration Email to the user">
          <Button
           onClick={() => {
            props.addOnboardingEmployee(props.currentEmployeeId.employeeId);
           
          }}
          >Onboarding Completed</Button>
             </Tooltip>
            
        </div>
        <div class="flex flex-no-wrap justify-center" >
              <DragDropContext
                 onDragEnd={onDragEnd}
                type="stage"
                 onDragStart={dragStart}
              >
                <Container style={{ marginTop: "0.75em" }}>
                  <>
                    {props.userStageList.
                      
                      stageList&&props.userStageList.
                      
                      stageList.map((stage, index) => (
                        <Droppable
                        key={index}
                        droppableId={stage.unboardingStagesId}
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
                                      className="scrollbar"
                                      id="style-3"
                                    >
                                      
                                        
                                            <StageEmployeeColumns1
                                               key={index}
                                              employee={stage}
                                              index={index}
                                              // history={props.history}
                                            />
                                       
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

const mapStateToProps = ({ settings, employee,auth }) => ({
  onboardingProcessStages:settings.onboardingProcessStages,
  orgId: auth.userDetails && auth.userDetails.organizationId,
  onboardingProcess: settings.onboardingProcess,
  userStageList:employee.userStageList,
  fetchingUserStageList:employee.fetchingUserStageList,
  setEditingEmployee:employee.setEditingEmployee,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessForOnboarding,
      getProcessStagesForOnboarding,
      addOnboardingEmployee,
      getUserStageList,
      addEmployeeWorkflow,
      updateUserdragstage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OnBoardingEmployeeForm);
