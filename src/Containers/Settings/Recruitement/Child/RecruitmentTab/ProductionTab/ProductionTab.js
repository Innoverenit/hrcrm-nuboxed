import React, { Component,lazy} from "react";
import { connect } from "react-redux";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { FormattedMessage } from "react-intl";
import DeleteIcon from '@mui/icons-material/Delete';
import { bindActionCreators } from "redux";
import { Button,  message, Popconfirm } from "antd";
import styled from "styled-components";
import {
  MainWrapper,
  
  TextInput,
} from "../../../../../../Components/UI/Elements";
import {addProcessForProductionOnboarding,
    getProcessForProduction,
    addProcessStageForProduction,
    getProcessStagesForProduction,
    LinkProductionProcessPublish,
    LinkProductionStagePublish,
    deleteProductionProcessData,
  updateProcessNameForProduction,
  updateStageForProduction
 } from "../../../../SettingsAction"
import {  StyledTabs } from "../../../../../../Components/UI/Antd";
import {  Select } from "../../../../../../Components/UI/Elements";
import { elipsize } from "../../../../../../Helpers/Function/Functions";

  const SingleProductionStages = lazy(() => import("./SingleProductionStages"));
const { Option } = Select;

const TabPane = StyledTabs.TabPane;
class ProductionTab extends Component {
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
      this.props.getProcessForProduction(this.props.orgId);
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
      this.props.getProcessStagesForProduction(item.productionWorkflowDetailsId);
  };


  handlePublishClick = () => {
    const { currentProcess, publish } = this.state;
    console.log(currentProcess);

    const Id = currentProcess.productionWorkflowDetailsId;
    let data = {
      productionWorkflowDetailsId: Id,
      publishInd: currentProcess.publishInd ? false : true,
    };

    this.props.LinkProductionProcessPublish(data, this.handleCallBack1);
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
       this.props.getProcessForProduction(this.props.orgId);
      this.setState({ currentProcess: data });
    } else {
      alert("error");
    }
  };
  handleEditProcessName = () => {
    const { updateProcessNameForProduction } = this.props;

    const {
      workflowName,

      currentProcess,
    } = this.state;
    const Id = currentProcess.productionWorkflowDetailsId;
    let process = { workflowName, productionWorkflowDetailsId: Id };
    updateProcessNameForProduction(process,Id,this.handleCallBack1 );
    this.setState({
      isProcessTextInputOpen: false,
    });
  };

  handleUpdateStage = (productionStagesId, stageName, probability, days) => {
    //debugger;
    const { productionProcessStages } = this.props;
    let exist =
    productionProcessStages &&
    productionProcessStages.some((element) => element.stageName == stageName);
    // if (exist) {
    //   message.error(
    //     "Stage with same name already exists as part of this workflow"
    //   );
    // } else {
      this.props.updateStageForProduction(productionStagesId, stageName, probability, days);
    // }
  };

handleStagePublishClick = (productionStagesId, publishInd) => {
  const { recruitProcessStages } = this.props;
  const data = {
    productionStagesId,
    publishInd: publishInd ? false : true,
  };
  console.log(publishInd);
  this.props.LinkProductionStagePublish(data, this.handleCallBack);
};

  handleCallBack = (status) => {
    if (status === "Success") {
      const {
        currentProcess: { productionWorkflowDetailsId },
      } = this.state;

       this.props.getProcessStagesForProduction(productionWorkflowDetailsId);
    } else {
      alert("error");
    }
  };
  handleCallback = (status) => {
    if (status === "success") {
       return getProcessForProduction(this.props.orgId);
    } else {
      return null;
    }
  };
  handleAddWorkflow = () => {
    const { addProcessForProductionOnboarding, workflows } = this.props;
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
        addProcessForProductionOnboarding(header,  this.props.orgId, () => 
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

    const { productionProcessStages } = this.props;
    let exist =
    productionProcessStages &&
    productionProcessStages.some((element) => element.stageName == stageName);

    const Id = currentProcess.productionWorkflowDetailsId;
    console.log(Id);
    console.log(currentProcess);
    let stage = {
      stageName,
      probability,
      days,
      responsible,
      // oppworkFlowId: Id,
      orgId: this.props.orgId,
      productionWorkflowDetailsId: Id,
    };
    if (exist) {
      debugger;
      message.error("Can not create as another stage exists with same name !");
    } else {
      // message.success("probability add");
      this.props.addProcessStageForProduction(
        stage,
        this.handleCallBack,
        this.props.orgId,
        this.props.productionWorkflowDetailsId
      );
      // this.props.getProcessStagesForRecruit(this.props.recruitmentProcessId);
    }
    this.setState({
      stageName: "",
      probability: "",
      days: "",
      isTextInputOpen: false,
    });
  };
  render() {
    const { addingProcessForProduction, addProcessForProductionOnboarding } = this.props;
    return (
      <>
        <StageWrapper>
          <MainWrapper>
            <h1
            >
              {/* Workflow */}
              <FormattedMessage id="app.workflow" defaultMessage="Workflow" />
            </h1>

            <div class=" flex">
               <StyledTabs
                style={{ width: "80%" }}
                defaultActiveKey={this.state.activeKey}
                onChange={this.handleTabChange}
                type="card"
              >
                {this.props.productionProcess.map((item, i) => {
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
                  //  disabled={!values.workflowName}
                  loading={addingProcessForProduction}
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
                     Loading={addingProcessForProduction}
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
                        onConfirm={() => this.props.deleteProductionProcessData(this.state.currentProcess.productionWorkflowDetailsId )}
                    >
                      <DeleteIcon
                      type="delete" style={{ color: "white",marginLeft:"1rem" }} />
                    </Popconfirm>

                    </span>
                    )}
                  
                   {this.state.currentProcess.workflowName && (
                      <Button
                      style={{ color: "white",marginLeft:"1rem"}}
                        onClick={this.handlePublishClick}
                      >
                        {/* {this.state.change?"Publish":"Unpublish"}  */}
                        {this.state.currentProcess.publishInd
                          ? "Unpublish"
                          : "Publish"}
                      </Button>
                    )}
                
                  </h1> 
                </>
              )}
            </div>
          {this.props.productionProcessStages.map((productionProcessStages, i) => (
              <SingleProductionStages
                key={i}
                stageValue1={this.state.stageName}
                newStageName="stageName"
                newProbability="probability"
                newDays="days"
                productionWorkflowDetailsId={
                  this.state.currentProcess.productionWorkflowDetailsId
                }
                productionProcessStages={productionProcessStages}
                organization={this.props.organization}
                handleApproveIconClick={this.handleApproveIconClick}
                handleUpdateStage={this.handleUpdateStage}
                handleStageType={this.handleStageType}
                handleStagePublishClick={this.handleStagePublishClick}
                productionStagesId={productionProcessStages.productionStagesId}
                className="scrollbar"
                id="style-3"
              />
            ))}   

            <div class=" mt-3" />
            {this.state.isTextInputOpen ? (
              <div class=" flex justify-center"
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
                <Button type="cancel"  onClick={this.toggleInput}>
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

        {/* <AddProcessModalForDeals/> */}
      
        {/* <AddApprovalModal
          recruitmentProcessId={this.state.currentProcess.recruitmentProcessId}
          stageId={this.state.currentStageId}
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => ({
    addingProcessForProduction:settings.addingProcessForProduction,
    addingProcessForProductionError:settings.addingProcessForProductionError,
    productionProcess: settings.productionProcess,
    fetchingProcessForProduction:settings.fetchingProcessForProduction,
  organization:
  auth.userDetails &&
  auth.userDetails.metaData &&
  auth.userDetails.metaData.organization,
  dealsStagesPublish: settings.dealsStagesPublish,
  dealsProcessPublish: settings.dealsProcessPublish,
  productionProcessStages: settings.productionProcessStages,
  orgId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addProcessForProductionOnboarding,
        getProcessForProduction,
        addProcessStageForProduction,
        getProcessStagesForProduction,
        LinkProductionProcessPublish,
        LinkProductionStagePublish,
        deleteProductionProcessData,
      updateProcessNameForProduction,
      updateStageForProduction
   
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductionTab);
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



