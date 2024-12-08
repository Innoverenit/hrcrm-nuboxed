import React, { Component, } from "react";
import { connect } from "react-redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { bindActionCreators } from "redux";
import AssignmentIcon from '@mui/icons-material/Assignment';
import {
  getProcessStagesForRecruit,
  addProcessStageForRecruit,
  updateStageForRecruit,
  getProcessForRecruit,
  LinkProcessPublish,
  LinkStagePublish,
  handleProcessModal,
  updateProcessNameForRecruit,
  deleteWorkflowData,
  handleRecruitmentDrawerModal
} from "../../../SettingsAction";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, message, Popconfirm, } from "antd";
import {
  getAllDocumentsType,
 
} from "../../../Documents/DocumentsAction";
import styled from "styled-components";
import {
  MainWrapper,
  TextInput,
} from "../../../../../Components/UI/Elements";
import SingleRecruitStages from "./SingleRecruitStages";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import {  Select } from "../../../../../Components/UI/Elements";
import { elipsize } from "../../../../../Helpers/Function/Functions";
import AddProcessModalForRecruit from "../../AddProcessModalForRecruit";
import AddApprovalModal from "./AddApprovalModal";
import AddRecruitmentDrawerModal from "../RecruitmentTab/AddRecruitmentDrawerModal";
const { Option } = Select;


const TabPane = StyledTabs.TabPane;
class RecruitmentTab extends Component {
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
      stageName: "",
      probability: null,
      days: null,
      rowData:"",
      setCurrentRowData:"",
      visible: false,
      isViewAll: false,
      currentProcess: [],
      currentStageId: "",
      currentStage: [],
      currentStageName: "",
      exist: false,
      responsible:null,
      isProcessTextInputOpen: false,
      recruitmentProcessName: "",
      publish: false,
    };
  }

  componentDidMount() {
    this.props.getProcessForRecruit(this.props.organizationId);
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
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
    this.props.getProcessStagesForRecruit(item.recruitmentProcessId);
  };

  handlePublishClick = () => {
    const { currentProcess, publish } = this.state;
    console.log(currentProcess);

    const Id = currentProcess.recruitmentProcessId;
    let data = {
      recruitmentProcessId: Id,
      publishInd: currentProcess.publishInd ? false : true,
    };

    this.props.LinkProcessPublish(data, this.handleCallBack1);
  };

  handleModalClick = () => {
    const { currentProcess, publish } = this.state;
    console.log(currentProcess);

    const Id = currentProcess.recruitmentProcessId;
    // let data = {
    //   recruitmentProcessId: Id,
    //   publishInd: currentProcess.publishInd ? false : true,
    // };

    this.props.getAllDocumentsType(Id, );
  };

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
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleCallBack1 = (status, data) => {
    if (status === "Success") {
      this.props.getProcessForRecruit(this.props.organizationId);
      this.setState({ currentProcess: data });
    } else {
      alert("error");
    }
  };
  handleEditProcessName = () => {
    const { updateProcessNameForRecruit } = this.props;

    const {
      recruitmentProcessName,

      currentProcess,
    } = this.state;
    const Id = currentProcess.recruitmentProcessId;
    let process = { recruitmentProcessName, recruitmentProcessId: Id };
    updateProcessNameForRecruit(process, this.handleCallBack1);
    this.setState({
      isProcessTextInputOpen: false,
    });
  };
  handleUpdateStage = (stageId, stageName, probability, days,responsible) => {
    //debugger;
    const { recruitProcessStages } = this.props;
    let exist =
      recruitProcessStages &&
      recruitProcessStages.some((element) => element.stageName == stageName);
    if (exist) {
      message.error(
        "Stage with same name already exists as part of this workflow"
      );
    } else {
      this.props.updateStageForRecruit(stageId, stageName, probability, days,responsible);
    }
  };

  handleStagePublishClick = (stageId, publishInd) => {
    const { recruitProcessStages } = this.props;
    const data = {
      stageId,
      publishInd: publishInd ? false : true,
    };
    console.log(publishInd);
    this.props.LinkStagePublish(data, this.handleCallBack);
  };
  handleCallBack = (status) => {
    if (status === "Success") {
      const {
        currentProcess: { recruitmentProcessId },
      } = this.state;

      this.props.getProcessStagesForRecruit(recruitmentProcessId);
    } else {
      alert("error");
    }
  };

  handleStageType=(value)=>
  this.setState({responsible:value});

  handleAddStage = () => {
    const { addProcessStage } = this.props;
    const {
      stageName,
      probability,
      addingStage,
      isTextInputOpen,
      responsible,
      currentProcess,
      days,
      currentStage,
    } = this.state;

    const { recruitProcessStages } = this.props;
    let exist =
      recruitProcessStages &&
      recruitProcessStages.some((element) => element.stageName == stageName);

    const Id = currentProcess.recruitmentProcessId;
    console.log(Id);
    console.log(currentProcess);
    console.log(this.props.handleRecruitmentDrawerModal);
    let stage = {
      stageName,
      probability,
      days,
      responsible,
      recruitmentProcessId: Id,
      organizationId: this.props.organizationId,
      processId: this.props.processId,
    };
    if (exist) {
      debugger;
      message.error("Can not create as another stage exists with same name !");
    } else {
      // message.success("probability add");
      this.props.addProcessStageForRecruit(
        stage,
        this.handleCallBack,
        this.props.organizationId,
        this.props.processId
      );
    }
    this.setState({
      stageName: "",
      probability: "",
      days: "",
      responsible:"",
      isTextInputOpen: false,
    });
  };
  render() {
    console.log("process",this.state.currentProcess.recruitmentProcessName)
    return (
      <>
        <StageWrapper>
          <MainWrapper>
            <h1
            >
              Workflow
           
            </h1>
           
            <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
         
              <StyledTabs
                style={{ width: "80%" }}
                defaultActiveKey={this.state.activeKey}
                onChange={this.handleTabChange}
                type="card"
              >
                {this.props.recruitProcess.map((item, i) => {
                  return (
                    <TabPane
                      key={i}
                      tab={
                        <span onClick={() => this.handleProcessClick(item)}>
                          {elipsize(item.recruitmentProcessName, 15)}
                        </span>
                      }
                    ></TabPane>
                  );
                })}
              </StyledTabs>
              
              <Button
                style={{ margin: 10 }}
                ghost
                onClick={() => this.props.handleProcessModal(true)}
                type="primary"
              >
                Add
              </Button>
            
            <mt-3 />
            <div class=" flex flex-col flex-wrap items-center content-center w-full self-start justify-center grow shrink h-auto mr-auto ">
           
              {this.state.isProcessTextInputOpen ? (
                <div>
                 <div class=" flex flex-row flex-wrap items-center self-start justify-center grow shrink h-auto mr-auto ">
                    <TextInput
                      placeholder="Process Name"
                      name="recruitmentProcessName"
                      defaultValue={
                        this.state.currentProcess.recruitmentProcessName
                      }
                      onChange={this.handleChange}
                      width={"100%"}
                    />

<div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                      <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleEditProcessName}
                      >
                        Save
                    
                      </Button>                    
                      <Button
                        type="primary"
                        onClick={this.handleCancel}
                      >
                     Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
               <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
                  <h1 style ={{color:"white"}}>
                    {this.state.currentProcess.recruitmentProcessName ||
                      `${"Select Workflow"}`
                      }
                      {" "}
                    
                     
                      {this.state.currentProcess.recruitmentProcessName && (
                      <Button
                        onClick={this.handlePublishClick}
                      >
                        {/* {this.state.change?"Publish":"Unpublish"}  */}
                        {this.state.currentProcess.publishInd
                          ? "Unpublish"
                          : "Publish"}
                      </Button>
                    )}               
                    {this.state.currentProcess.recruitmentProcessName && (
                      // <Tooltip title="Edit">
                <span
                        tooltipTitle="Edit"
                        onClick={this.handleEdit}
                        size="0.875em"
                      >
<BorderColorIcon
  style={{fontSize:"1rem"}}
/>
              </span>
                    )}
                    
                    {this.state.currentProcess.recruitmentProcessName && (
                    <span
                        style={{ cursor: "pointer" }}
              onClick={() => {
              
                this.props.handleRecruitmentDrawerModal(true);
                this.handleModalClick()
              }}
            
              >
                    <AssignmentIcon  
                       style={{ color: "white" }} /> 
                    </span>
                      )}
                      
{this.state.currentProcess.recruitmentProcessName && (
  <span
  style={{ cursor: "pointer" }}>
                      <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => this.props.deleteWorkflowData(this.state.currentProcess.recruitmentProcessId )}
                    >
                      <DeleteIcon
                      type="delete"
                       style={{ color: "white" }} />
                    </Popconfirm>
                    </span>
                    

                      // </Tooltip>
                    )}
          
                    {/* <Button
                              type="primary"
                              ghost
                              htmlType="button"
                            // onClick={this.toggleInput}
                            >
                            Publish
                            </Button> */}
                    {/* <span
                            
                                       onClick={() => {
                                       
                                       
                                        this.props.LinkProcessPublish({
                                                opportunityId: this.props.opportunityId,
                                              //  stageId: item.stageId,
                                                recruitmentProcessId: this.props.recruitmentProcessId,
                                              //  skillName:this.state.skillSetData || item.skillName,
                                              //  recruitmentId: item.recruitmentId,
                                              //  profileId: item.profileId,
                                             });
                                       }}
                          > */}
                   
                  </h1>
                  </div>
                </>
              )}
            </div>
            </div>
                
            {this.props.recruitProcessStages.map((recruitProcessStages, i) => (
              <SingleRecruitStages
                key={i}
                stageValue1={this.state.stageName}
                newStageName="stageName"
                newProbability="probability"
                newDays="days"
                //newResponsible="responsible"
                handleStageType={this.handleStageType}
                recruitmentProcessId={
                  this.state.currentProcess.recruitmentProcessId
                }
                recruitProcessStages={recruitProcessStages}
                organization={this.props.organization}
                handleApproveIconClick={this.handleApproveIconClick}
                handleUpdateStage={this.handleUpdateStage}
                handleStagePublishClick={this.handleStagePublishClick}
                stageId={recruitProcessStages.stageId}
                style={{scrollbarWidth:"thin", backgroundColor:"f5f5f5" }}
              />
            ))}

            <mt-3 />
            {this.state.isTextInputOpen ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
           <div class=" flex flex-row flex-wrap items-start self-start justify-between grow shrink h-auto mr-auto ">
                <TextInput
                  placeholder="Stage name"
                  name="stageName"
                  value={this.state.stageName}
                  onChange={this.handleChange}
                  width={"20%"}
                />
               
                <StageName style={{ flexBasis: "25%"}}>
                {/* {this.state.currentProcess.publishInd === true && ( */}
                <Select style={{ width: "100%"}}
                onChange={this.handleStageType}
                placeholder="Select Action"
                >
                <Option value="Assessment">Assessment</Option>
                <Option value="Call">Call</Option>
                <Option value="Task">Task</Option>
              <Option value="Customer">Customer</Option>
                </Select>
                {/* )} */}
                </StageName>
          
                <TextInput
                  type="number"
                  placeholder="Weightage"
                  name="probability"
                  value={this.state.probability}
                  onChange={this.handleChange}
                  width={"12%"}
                />
              
                <TextInput
                  type="days"
                  placeholder="Days"
                  name="days"
                  value={this.state.days}
                  onChange={this.handleChange}
                  width={"8%"}
                />
                </div>
                <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleAddStage}
                >
                  Save
                
                </Button>
               
                <Button type="primary" ghost onClick={this.toggleInput}>
                  Cancel
             
                </Button>
                </div>
              </div>

              
              
            ) :this.state.currentProcess.recruitmentProcessName? (
              <>
               <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                    onClick={this.toggleInput}
                  >
                    Add Stage
                  
                  </Button>
                </div>
              </>
            ):null}
          </MainWrapper>
        </StageWrapper>

        <AddProcessModalForRecruit />
        {/* <WorkFlowTab /> */}
        <AddApprovalModal
          recruitmentProcessId={this.state.currentProcess.recruitmentProcessId}
          stageId={this.state.currentStageId}
        />
          <AddRecruitmentDrawerModal
          processName={this.state.currentProcess.recruitmentProcessName}
     handleRowClick={this.handleRowClick}
     data={this.state.rowData}
        allDocuments={this.props.allDocuments}
        addDrawerRecruitmentModal={this.props.addDrawerRecruitmentModal}
        handleRecruitmentDrawerModal={this.props.handleRecruitmentDrawerModal}
      />
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth,document }) => ({
  recruitProcessStages: settings.recruitProcessStages,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
  recruitProcess: settings.recruitProcess,
  processPublish: settings.processPublish,
  stagesPublish: settings.stagesPublish,
  allDocuments: document.allDocuments,
  addDrawerRecruitmentModal:settings.addDrawerRecruitmentModal,
  organizationId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProcessStagesForRecruit,
      getAllDocumentsType,
      addProcessStageForRecruit,
      updateStageForRecruit,
      getProcessForRecruit,
      handleProcessModal,
      LinkStagePublish,
      LinkProcessPublish,
      handleRecruitmentDrawerModal,
      updateProcessNameForRecruit,
      deleteWorkflowData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitmentTab);
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
  
  <BorderColorIcon
  className={`pen-to-square ${props.className}`}

  />



);

const EditIcon1 = styled(AppIcon1)`
  color: white;
  &:hover {
    // background: yellow;
    color: blue;
  }
`;
