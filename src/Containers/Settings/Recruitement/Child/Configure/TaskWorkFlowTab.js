import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { bindActionCreators } from "redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  addTaskForRecruiter,
  getTaskForWorkflow,
} from "../../../SettingsAction";
import {
  MainWrapper,
  
  TextInput,
} from "../../../../../Components/UI/Elements";
import {
  handleTaskDrawer,
   updateTaskStageForRecruit,
  addTaskStageForRecruit,
    getTaskStagesForRecruit,
  deleteTaskData,
  updateTaskNameForRecruit
} from "../../../SettingsAction";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { Select } from "../../../../../Components/UI/Elements";
import { elipsize } from "../../../../../Helpers/Function/Functions";
const AddTaskModal = lazy(() => import("./AddTaskModal"));
const SingleTaskStages = lazy(() => import("./SingleTaskStages"));
const { Option } = Select;

const TabPane = StyledTabs.TabPane;
class TaskWorkflowTab extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      fields: {},
      activeKey: "0",
      // viewAll:false,
      // setIsViewAll:false,
      change: true,
      isTextInputOpen: false,
      addingStage: false,
      taskChecklistStageName: "",
      probability: null,
      days: null,
      rowData: "",
      startDate:"",
      endDate:"",
      // probability: null,
      setCurrentRowData: "",
      visible: false,
      isViewAll: false,
      isTextOpen:false,
      currentProcess: [],
      currentStageId: "",
      currentStage: [],
      currentStageName: "",
      exist: false,
      responsible: null,
      isProcessTextInputOpen: false,
      taskChecklistName: "",
      publish: false,
    };
  }

  componentDidMount() {
    this.props.getTaskForWorkflow(this.props.taskTypeId);
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  onChangeDatePicker = (startDate, dateString) => {
    console.log(startDate, dateString);
    this.setState({ startDate: dayjs(dateString) });
  };
  onChangeEndDatePicker = (endDate, dateString) => {
    console.log(endDate, dateString);
    this.setState({ endDate: dayjs(dateString) });
  };


  handleEdit = () => {
    this.setState((prevState) => ({
      isProcessTextInputOpen: !prevState.isProcessTextInputOpen,
    }));
  };
  handleCancel = () => {
    this.setState({
      isProcessTextInputOpen: false,
    });
  };
  handleProcessClick = (item, i) => {
    this.setState({
      currentProcess: item,
    });
     this.props.getTaskStagesForRecruit(item.taskChecklistId);
  };

  //   handleModalClick = () => {
  //     const { currentProcess, publish } = this.state;
  //     console.log(currentProcess);

  //     const Id = currentProcess.recruitmentProcessId;
  // let data = {
  //   recruitmentProcessId: Id,
  //   publishInd: currentProcess.publishInd ? false : true,
  // };

  //     this.props.getAllDocumentsType(Id, );
  //   };

  handleApproveIconClick = (item) => {
    this.setState({
      currentStageId: item,
    });
  };
  handleRowClick = (item) => {
    this.setState({
      rowData: item,
    });
  };

  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
    toggleInput1 = () =>
    this.setState((prevState) => ({
      isTextOpen: !prevState.isTextOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleCallBack1 = (status, data) => {
    if (status === "Success") {
       this.props.getTaskForWorkflow(this.props.taskTypeId);
      this.setState({ currentProcess: data });
    } else {
      alert("error");
    }
  };
    handleEditProcessName = () => {
      const { updateTaskNameForRecruit } = this.props;

      const {
        taskChecklistName,

        currentProcess,
      } = this.state;
      const Id = currentProcess.taskChecklistId;
      let process = { taskChecklistName, taskChecklistId: Id };
      updateTaskNameForRecruit(process, this.handleCallBack1);
      this.setState({
        isProcessTextInputOpen: false,
      });
    };
    handleUpdateStage = (taskChecklistStagelinkId, taskChecklistStageName,probability,days ) => {
      //debugger;
      const { recruitTaskStages } = this.props;
      let exist =
      recruitTaskStages &&
      recruitTaskStages.some((element) => element.taskChecklistStageName == taskChecklistStageName);
      if (exist) {
        message.error(
          "Stage with same name already exists as part of this workflow"
        );
      } else {
        this.props.updateTaskStageForRecruit(taskChecklistStagelinkId, taskChecklistStageName,probability,days);
      }
    };

  //   handleStagePublishClick = (taskChecklistStagelinkId, publishInd) => {
  //     const { recruitTaskStages } = this.props;
  //     const data = {
  //       taskChecklistStagelinkId,
  //       publishInd: publishInd ? false : true,
  //     };
  //     console.log(publishInd);
  //     this.props.LinkStagePublish(data, this.handleCallBack);
  //   };
  handleCallBack = (status) => {
    if (status === "Success") {
      const {
        currentProcess: { taskChecklistId },
      } = this.state;

       this.props.getTaskStagesForRecruit(taskChecklistId);
    } else {
      alert("error");
    }
  };
  handleCallback = (status) => {
    if (status === "success") {
      return getTaskForWorkflow(this.props.taskTypeId);
    } else {
      return null;
    }
  };

  handleStageType = (value) => this.setState({ responsible: value });
  handleAddWorkflow = () => {
    const { addTaskForRecruiter, headers } = this.props;
    const {
      taskChecklistName,
      addingSubCategorys,
      isTextInputOpen,
    //   categoryId,
      editInd,
    } = this.state;
    let header = {
      taskChecklistName,
      taskTypeId:this.props.taskTypeId,
      orgId: this.props.organizationId,
    };

    let exist =
    headers &&
    headers.some(
        (element) => element.taskChecklistName == taskChecklistName
      );

    if (exist) {
      message.error(
        "Can't create as another departmentName exists with same name!"
      );
    } else {
      addTaskForRecruiter(header, this.props.taskTypeId, () => 
      this.handleCallback
      );
    }

    this.setState({
      categoryName: "",
      subCategoryId:"",
      isTextOpen: false,
      editInd: true,
    });
  };
  handleAddStage = () => {
    const { addTaskStage } = this.props;
    const {
      taskChecklistStageName,
      // probability,
      probability,
      startDate,
      endDate,
      addingStage,
      isTextInputOpen,
      responsible,
      currentProcess,
      days,
      currentStage,
    } = this.state;

    const { recruitTaskStages } = this.props;
    let exist =
      recruitTaskStages &&
      recruitTaskStages.some(
        (element) => element.taskChecklistStageName == taskChecklistStageName
      );

    const Id = currentProcess.taskChecklistId;
    console.log(Id);
    console.log(currentProcess);
    console.log(this.props.handleRecruitmentDrawerModal);
    let stage = {
      taskChecklistStageName,
      // probability,
      days,
      // startDate: dayjs(this.state.startDate).toISOString(),
      // endDate: dayjs(this.state.endDate).toISOString(),
      probability,
      responsible,
      taskChecklistId: Id,
      organizationId: this.props.organizationId,
      processId: this.props.processId,
    };
    if (exist) {
      debugger;
      message.error("Can not create as another stage exists with same name !");
    } else {
      // message.success("probability add");
      this.props.addTaskStageForRecruit(
        stage,
        this.handleCallBack,
        this.props.organizationId,
        this.props.processId
      );
    }
    this.setState({
      taskChecklistStageName: "",
      // probability: "",
      days: "",
      probability:"",
      startDate:"",
      endDate:"",
      responsible: "",
      isTextInputOpen: false,
    });
  };
  render() {
    const { addingTaskForRecruit, addTaskForRecruiter } = this.props;
    console.log("process", this.state.currentProcess.taskChecklistName);
    return (
      <>
        <StageWrapper>
          <MainWrapper>
            <h1>
              Workflow
           
            </h1>

            <div class=" flex flex-col">
              <StyledTabs
                style={{ width: "80%" }}
                defaultActiveKey={this.state.activeKey}
                onChange={this.handleTabChange}
                type="card"
              >
                {this.props.recruitWorkflowTask.map((item, i) => {
                  return (
                    <TabPane
                      key={i}
                      tab={
                        <span onClick={() => this.handleProcessClick(item)}>
                          {elipsize(item.taskChecklistName, 15)}
                        </span>
                      }
                    ></TabPane>
                  );
                })}
              </StyledTabs>

              {this.state.isTextOpen ? (
            <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            >
                <br />
                <br />
              
                <TextInput
                  placeholder="Add Workflow"
                  name="taskChecklistName"
                //   value={categoryName}
                  onChange={this.handleChange}
                  width="40%"
                  style={{ marginRight: "0.125em" }}
                />
        
              
         
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!this.state.taskChecklistName}
                  loading={addingTaskForRecruit}
                  onClick={this.handleAddWorkflow}
                >
                  
                  Save
                </Button>
                &nbsp;
                <Button type="cancel" onClick={this.toggleInput1}>
                  Cancel
               
                </Button>
              </div>
            ) : (
              <>
                <br />
                <div class=" flex justify-end" >
                  <Button
                    type="primary"

                    htmlType="button"
                     Loading={addingTaskForRecruit}
                    onClick={this.toggleInput1}
                  >
                    Add
                 
                  </Button>
                </div>
              </>
            )}
           

           <div class=" flex mt-4 flex-col justify-center"  className="stages"
       
              style={{
                width: "100%",
                alignContent: "center",
                marginTop:"0.5rem",
                alignItems:"center"
              }}
            >
                {this.state.isProcessTextInputOpen ? (
                  <div style={{}}>
                    <div class=" items-center flex justify-center"
                  
                    >
                      <TextInput
                        style={{ marginLeft: "2.81em" }}
                        placeholder="Task Name"
                        name="taskChecklistName"
                        defaultValue={
                          this.state.currentProcess.taskChecklistName
                        }
                        onChange={this.handleChange}
                        width={"100%"}
                      />

                      <div class=" flex justify-end" >
                        <Button
                         style={{
                          border: "0.06em solid white",
                          color: "black",
                        }}
                          type="primary"
                          htmlType="submit"
                          onClick={this.handleEditProcessName}
                        >
                         Save
                        </Button>
                        <Button
                             type="cancel"
                         style={{
                          border: "0.06em solid white",
                          color: "black",
                        }}
                          onClick={this.handleCancel}>
                         Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                 
                      <h1 style={{ color: "white" }}>
                        {this.state.currentProcess.taskChecklistName ||
                          `${"Select Workflow"}`}{" "}
                        {this.state.currentProcess.taskChecklistName && (
                          <span
                          style={{marginLeft:"1rem"}}
                            tooltipTitle="Edit"
                            onClick={this.handleEdit}
                            size="0.875em"
                          >
                            <BorderColorIcon style={{ fontSize: "1rem" }} />
                          </span>
                        )}
                        {this.state.currentProcess.taskChecklistName && (
                          <span style={{ cursor: "pointer" }}>
                            <Popconfirm
                              title="Do you want to delete?"
                              okText="Yes"
                              cancelText="No"
                               onConfirm={() => this.props.deleteTaskData(this.state.currentProcess.taskChecklistId )}
                            >
                              <DeleteIcon
                                type="delete"
                                style={{ color: "white" }}
                              />
                            </Popconfirm>
                          </span>
                        )}
                      </h1>
               
                  </>
                )}
              </div>
            </div>

            {this.props.recruitTaskStages.map((recruitTaskStages, i) => (
              <SingleTaskStages
                key={i}
                stageValue1={this.state.taskChecklistStageName}
                newStageName="taskChecklistStageName"
                newDays="days"
                newProbability="probability"
               newStartDate="startDate"
               newEndDate="endDate"
                //newResponsible="responsible"
                handleUpdateStage={this.handleUpdateStage}
                handleStageType={this.handleStageType}
                // taskChecklistId={this.state.currentProcess.taskChecklistId}
                recruitTaskStages={recruitTaskStages}
                organization={this.props.organization}
                taskChecklistStagelinkId={recruitTaskStages.taskChecklistStagelinkId}
                // taskChecklistStagelinkId={recruitTaskStages.taskChecklistStagelinkId}
                className="scrollbar"
                id="style-3"
              />
            ))}

            <div class=" mt-3" />
            {this.state.isTextInputOpen ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
              
                  <TextInput
                    placeholder="Stage name"
                    name="taskChecklistStageName"
                    value={this.state.taskChecklistStageName}
                    onChange={this.handleChange}
                    width={"20%"}
                  />
                <TextInput
                  type="number"
                  placeholder="Stage Progress in %"
                  name="probability"
                  value={this.state.probability}
                  onChange={this.handleChange}
                  width={"20%"}
                />
                     <TextInput
                  type="number"
                  placeholder="Days"
                  name="days"
                  value={this.state.days}
                  onChange={this.handleChange}
                  width={"20%"}
                />
               {/* <div>
                  <DatePicker 
                  placeholder="Start Date"
                  onChange={this.onChangeDatePicker} />
                  </div>
                  <div>
                  <DatePicker 
                  placeholder="End Date"
                  onChange={this.onChangeEndDatePicker} />
                  </div> */}
              
              
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleAddStage}
                  >
                    Save
                   
                  </Button>

                  <Button type="cancel"  onClick={this.toggleInput}>
                    Cancel
                  
                  </Button>
                </div>
              </div>
            ) : this.state.currentProcess.taskChecklistName ? (
              <>
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    
                    htmlType="button"
                    onClick={this.toggleInput}
                  >
                    Add Stage
                    
                  </Button>
                </div>
              </>
            ) : null}
          </MainWrapper>
        </StageWrapper>

        <AddTaskModal taskTypeId={this.props.taskTypeId} />
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth, document }) => ({
    recruitWorkflowTask: settings.recruitWorkflowTask,
  recruitTaskStages: settings.recruitTaskStages,
  addingTaskForRecruit: settings.addingTaskForRecruit,
  addingTaskForRecruitError: settings.addingTaskForRecruitError,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  organizationId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTaskDrawer,
      getTaskForWorkflow,
      addTaskForRecruiter,
       updateTaskStageForRecruit,
      addTaskStageForRecruit,
       getTaskStagesForRecruit,
      deleteTaskData,
       updateTaskNameForRecruit
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskWorkflowTab);
const StageWrapper = styled.div`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const StageName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 400;
  // margin-bottom: 0;
  margin: 0;
`;

const AppIcon1 = (props) => (
  <BorderColorIcon className={`pen-to-square ${props.className}`} />
);

const EditIcon1 = styled(AppIcon1)`
  color: white;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
