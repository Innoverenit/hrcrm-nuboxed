import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { FormattedMessage } from "react-intl";
import DeleteIcon from '@mui/icons-material/Delete';
import { bindActionCreators } from "redux";
import { Button, message, Popconfirm } from "antd";
import styled from "styled-components";
import {
  MainWrapper,
  Spacer,
  TextInput,
} from "../../../../../../Components/UI/Elements";
import {
    addProcessForOnboarding,
    updateStageForOnboarding,
    addProcessStageForOnboarding,
    getProcessStagesForOnboarding,
    getProcessForOnboarding,
    updateProcessNameForOnboarding,
    deleteOnboardingProcessData,
    LinkOnboardingStagePublish,
    LinkOnboardingProcessPublish,
} from "../../../../SettingsAction";
import { StyledTabs } from "../../../../../../Components/UI/Antd";
import {  Select } from "../../../../../../Components/UI/Elements";
import { elipsize } from "../../../../../../Helpers/Function/Functions";
 const SingleOnboardingStages = lazy(() => import("./SingleOnboardingStages"));
const { Option } = Select;

const TabPane = StyledTabs.TabPane;
class OnboardingTab extends Component {
  constructor(props) {
    super(props);
    this.formRef = null;
    this.state = {
      fields: {},
      activeKey: "0",
      // viewAll:false,
      // setIsViewAll:false,
      change: true,
      isTextOpen:false,
      isTextInputOpen: false,
      addingStage: false,
      stageName: "",
      probability: null,
      days: null,
      visible: false,
      isViewAll: false,
      currentProcess: [],
      currentStageId: "",
      currentStage: [],
      currentStageName: "",
      exist: false,
      responsible:"",
      isProcessTextInputOpen: false,
      workflowName: "",
      publish: false,
    };
  }

  componentDidMount() {
     this.props.getProcessForOnboarding(this.props.orgId);
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
     this.props.getProcessStagesForOnboarding(item.unboardingWorkflowDetailsId);
  };

  handlePublishClick = () => {
    const { currentProcess, publish } = this.state;
    console.log(currentProcess);

    const Id = currentProcess.unboardingWorkflowDetailsId;
    let data = {
      unboardingWorkflowDetailsId: Id,
      publishInd: currentProcess.publishInd ? false : true,
    };

    this.props.LinkOnboardingProcessPublish(data, this.handleCallBack1);
  };

  handleApproveIconClick = (item) => {
    this.setState({
      currentStageId: item,
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
      this.props.getProcessForOnboarding(this.props.orgId);
      this.setState({ currentProcess: data });
    } else {
      alert("error");
    }
  };
  handleEditProcessName = () => {
    const { updateProcessNameForOnboarding } = this.props;

    const {
      workflowName,

      currentProcess,
    } = this.state;
    const Id = currentProcess.unboardingWorkflowDetailsId;
    let process = { workflowName, unboardingWorkflowDetailsId: Id };
    updateProcessNameForOnboarding(process,Id,this.handleCallBack1 );
    this.setState({
      isProcessTextInputOpen: false,
    });
  };
  handleUpdateStage = (unboardingStagesId, stageName, probability, days) => {
    //debugger;
    const { onboardingProcessStages } = this.props;
    let exist =
    onboardingProcessStages &&
    onboardingProcessStages.some((element) => element.stageName == stageName);
    // if (exist) {
    //   message.error(
    //     "Stage with same name already exists as part of this workflow"
    //   );
    // } else {
      this.props.updateStageForOnboarding(unboardingStagesId, stageName, probability, days);
    // }
  };

  handleStagePublishClick = (unboardingStagesId, publishInd) => {
    const { recruitProcessStages } = this.props;
    const data = {
      unboardingStagesId,
      publishInd: publishInd ? false : true,
    };
    console.log(publishInd);
    this.props.LinkOnboardingStagePublish(data, this.handleCallBack);
  };
  handleCallBack = (status) => {
    if (status === "Success") {
      const {
        currentProcess: { unboardingWorkflowDetailsId },
      } = this.state;

      this.props.getProcessStagesForOnboarding(unboardingWorkflowDetailsId);
    } else {
      alert("error");
    }
  };
  handleCallback = (status) => {
    if (status === "success") {
      return getProcessForOnboarding(this.props.orgId);
    } else {
      return null;
    }
  };
  handleAddWorkflow = () => {
    const { addProcessForOnboarding, workflows } = this.props;
    const {
      workflowName,
      isTextInputOpen,
      orgId,
    //   categoryId,
      editInd,
    } = this.state;
    let header = {
      workflowName,
      orgId: this.props.organizationId,
    };

    let exist =
    workflows &&
    workflows.some(
        (element) => element.workflowName == workflowName
      );

    if (exist) {
      message.error(
        "Can't create as another departmentName exists with same name!"
      );
    } else {
        addProcessForOnboarding(header,  this.props.orgId, () => 
      this.handleCallback
      );
    }

    this.setState({
      categoryName: "",
      subCategoryId:"",
      isTextOpen:false,
      editInd: true,
    });
  };

  handleStageType=(value)=>
  this.setState({responsible:value});
  handleAddStage = () => {
    const { addProcessStage } = this.props;
    const {
      stageName,
      probability,
      addingStage,
      responsible,
      isTextInputOpen,

      currentProcess,
      days,
      currentStage,
    } = this.state;

    const { onboardingProcessStages } = this.props;
    let exist =
    onboardingProcessStages &&
    onboardingProcessStages.some((element) => element.stageName == stageName);

    const Id = currentProcess.unboardingWorkflowDetailsId;
    console.log(Id);
    console.log(currentProcess);
    let stage = {
      stageName,
      probability,
      days,
      responsible,
      // oppworkFlowId: Id,
      orgId: this.props.orgId,
      unboardingWorkflowDetailsId: Id,
    };
    if (exist) {
      debugger;
      message.error("Can not create as another stage exists with same name !");
    } else {
      // message.success("probability add");
      this.props.addProcessStageForOnboarding(
        stage,
        this.handleCallBack,
        this.props.orgId,
        this.props.unboardingWorkflowId
      );}
    this.setState({
      stageName: "",
      probability: "",
      days: "",
      isTextInputOpen: false,
    });
  };
  render() {
    const { addingProcessForOnboarding, addProcessForOnboarding } = this.props;
    return (
      <>
        <StageWrapper>
          <MainWrapper>
            <h1
            >
              
              <FormattedMessage id="app.workflow" defaultMessage="Workflow" />
            </h1>

            <div class=" flex">
               <StyledTabs
                style={{ width: "80%" }}
                defaultActiveKey={this.state.activeKey}
                onChange={this.handleTabChange}
                type="card"
              >
                {this.props.onboardingProcess.map((item, i) => {
                  return (
                    <TabPane
                      key={i}
                      tab={
                        <span onClick={() => this.handleProcessClick(item)}>
                          {elipsize(item.workflowName, 15)}
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
                  name="workflowName"
                //   value={categoryName}
                  onChange={this.handleChange}
                  width="40%"
                  style={{ marginRight: "0.125em" }}
                />
        
              
         
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!this.state.workflowName} 
                  // disabled={!values.taskChecklistName}
                  loading={addingProcessForOnboarding}
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
                 
                     Loading={addingProcessForOnboarding}
                    onClick={this.toggleInput1}
                  >
                    Add
                 
                  </Button>
                </div>
              </>
            )}
           
            </div>
        
            <div class=" flex mt-4 flex-col justify-center"  className="stages"
       
              style={{
                width: "100%",
                alignContent: "center",
                alignItems:"center"
              }}
            >
              {this.state.isProcessTextInputOpen ? (
                <div style={{}}>
                  <div class="flex items-center justify-center" >
                    <TextInput
                      placeholder="Process Name"
                      name="workflowName"
                      defaultValue={
                        this.state.currentProcess.workflowName
                      }
                      onChange={this.handleChange}
                      width={"100%"}
                      style={{ marginLeft: "2.81em" }}
                    />

                    <div class=" flex justify-end" >
                      <Button
                        style={{
                          border: "0.06em solid white",
                          color: "black",
                        }}
                        htmlType="submit"
                        onClick={this.handleEditProcessName}
                      >
                        <FormattedMessage id="app.save" defaultMessage="Save" />
                      </Button>
                      <Button
                           type="cancel"
                        style={{
                          border: "0.06em solid white",
                          color: "black",
                        }}
                        onClick={this.handleCancel}
                      >
                        <FormattedMessage
                          id="app.cancel"
                          defaultMessage="Cancel"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : 
              (
                <>
                   <h1 style ={{color:"white"}}>
                    {this.state.currentProcess.workflowName ||
                      `${"Select Workflow"}`}{" "}
                  
                   
                    {this.state.currentProcess.workflowName && (
                           <span
                           style={{marginLeft:"1rem"}}
                                     tooltipTitle="Edit"
                        onClick={this.handleEdit}
                        size="0.875em"
                      >
  <EditIcon1></EditIcon1>
              </span>
                    )}
                 
                    
{this.state.currentProcess.workflowName && (
  <span
  style={{ cursor: "pointer" }}>
                      <Popconfirm
                      title="Do you want to delete?"
                      okText="Yes"
                      cancelText="No"
                       onConfirm={() => this.props.deleteOnboardingProcessData(this.state.currentProcess.unboardingWorkflowDetailsId )}
                    >
                      <DeleteIcon
                      type="delete" style={{ color: "white",marginLeft:"1rem" }} />
                    </Popconfirm>

                    </span>
                    )}
                  
                  {this.state.currentProcess.workflowName && (
  <Button
    style={{ color: "white",marginLeft:"1rem" }} // Add this line to change the font color to white
    onClick={this.handlePublishClick}
  >
    {this.state.currentProcess.publishInd ? "Unpublish" : "Publish"}
  </Button>
)}
                
                  </h1> 
                </>
              )}
            </div>

           {this.props.onboardingProcessStages.map((onboardingProcessStages, i) => (
              <SingleOnboardingStages
                key={i}
                stageValue1={this.state.stageName}
                newStageName="stageName"
                newProbability="probability"
                newDays="days"
                unboardingWorkflowDetailsId={
                  this.state.currentProcess.unboardingWorkflowDetailsId
                }
                onboardingProcessStages={onboardingProcessStages}
                organization={this.props.organization}
                handleApproveIconClick={this.handleApproveIconClick}
                handleUpdateStage={this.handleUpdateStage}
                handleStageType={this.handleStageType}
                handleStagePublishClick={this.handleStagePublishClick}
                unboardingStagesId={onboardingProcessStages.unboardingStagesId}
                className="scrollbar"
                id="style-3"
              />
            ))} 

            <Spacer />
            {this.state.isTextInputOpen ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Stage name"
                  name="stageName"
                  value={this.state.stageName}
                  onChange={this.handleChange}
                  width={"20%"}
                />
                &nbsp; &nbsp;
                {/* <StageName style={{ flexBasis: "25%"}}>
                
                <Select style={{ width: "80%"}}
                onChange={this.handleStageType}
                >
                <Option value="internal">Internal</Option>
              <Option value="customer">Customer</Option>
                </Select>
               
                </StageName> */}
                <TextInput
                  type="number"
                  placeholder="Weightage"
                  name="probability"
                  value={this.state.probability}
                  onChange={this.handleChange}
                  width={"12%"}
                />
                &nbsp; &nbsp;
                <TextInput
                  type="days"
                  placeholder="Days"
                  name="days"
                  value={this.state.days}
                  onChange={this.handleChange}
                  width={"8%"}
                />
                &nbsp; &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleAddStage}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="cancel" onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            ) : this.state.currentProcess.workflowName? (
              <>
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    
                    htmlType="button"
                    onClick={this.toggleInput}
                    style={{ marginTop: "0.62em" }}
                  >
                    {/* Add Stage */}
                    <FormattedMessage
                      id="app.addstage"
                      defaultMessage="Add Stage"
                    />
                  </Button>
                </div>
              </>
            ):null}
          </MainWrapper>
        </StageWrapper>

        {/* <AddProcessModalForHiring/> */}
      
        {/* <AddApprovalModal
          recruitmentProcessId={this.state.currentProcess.recruitmentProcessId}
          stageId={this.state.currentStageId}
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => ({
  onboardingProcessStages:settings.onboardingProcessStages,
    onboardingProcess: settings.onboardingProcess,
  addingProcessForOnboarding: settings.addingProcessForOnboarding,
  addingProcessForOnboardingError: settings.addingProcessForOnboardingError,
  organization:
  auth.userDetails &&
  auth.userDetails.metaData &&
  auth.userDetails.metaData.organization,
  orgId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
   getProcessForOnboarding,
   updateStageForOnboarding,
   addProcessStageForOnboarding,
   getProcessStagesForOnboarding,
   addProcessForOnboarding,
   updateProcessNameForOnboarding,
   deleteOnboardingProcessData,
   LinkOnboardingStagePublish,
   LinkOnboardingProcessPublish,
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingTab);
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
