import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  getTaskWorkflowStagesForRecruit,
} from "../../Settings/SettingsAction";
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledTabs } from "../../../Components/UI/Antd";
import { Select } from "../../../Components/UI/Elements";
import { elipsize } from "../../../Helpers/Function/Functions";
const SingleTaskWorkflowList = lazy(() => import("./SingleTaskWorkflowList"));
const { Option } = Select;

const TabPane = StyledTabs.TabPane;
class TaskWorkflowList extends Component {
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
    // this.props.getTaskForWorkflow(this.props.item.taskTypeId);
    this.props.getTaskWorkflowStagesForRecruit(this.props.item.taskId)
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
       this.props.getTaskForRecruit();
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

  handleStageType = (value) => this.setState({ responsible: value });

 
  render() {
    console.log("process", this.state.currentProcess.taskChecklistName);
    return (
      <>
        <StageWrapper>
        <div class="mr-5 ml-5">           
            <FlexContainer>
              <StyledTabs
                style={{ width: "80%" }}
                defaultActiveKey={this.state.activeKey}
                onChange={this.handleTabChange}
                type="card"
              >
                {/* {this.props.recruitTaskWorkflowStages.map((item, i) => { */}
                  return (
                    <TabPane
                      // key={i}
                      tab={
                        <span 
                        // onClick={() => this.handleProcessClick()}
                        >
                          {elipsize(this.props.item.taskChecklist, 15)}
                        </span>
                      }
                    ></TabPane>
                  );
                {/* })} */}
              </StyledTabs>           
            </FlexContainer>

            {this.props.recruitTaskWorkflowStages.map((recruitTaskWorkflowStage, i) => (
              <SingleTaskWorkflowList
                key={i}
                stageValue1={this.state.taskChecklistStageName}
                newStageName="taskChecklistStageName"
                newDays="days"
                newProbability="probability"
               newStartDate="startDate"
               newEndDate="endDate"
               item={this.props.item}
                //newResponsible="responsible"
                handleUpdateStage={this.handleUpdateStage}
                handleStageType={this.handleStageType}
                // taskChecklistId={this.state.currentProcess.taskChecklistId}
                recruitTaskWorkflowStage={recruitTaskWorkflowStage}
                organization={this.props.organization}
               
                className="scrollbar"
                id="style-3"
              />
            ))}

          
          </div>
          
        </StageWrapper>


      </>
    );
  }
}

const mapStateToProps = ({ settings, auth, document }) => ({
  recruitTask: settings.recruitTask,
  recruitTaskWorkflowStages: settings.recruitTaskWorkflowStages,
  organization:
    auth.userDetails &&
    auth.userDetails.metaData &&
    auth.userDetails.metaData.organization,
    recruitWorkflowTask:settings.recruitWorkflowTask,
  organizationId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      // getTaskForWorkflow,
       getTaskWorkflowStagesForRecruit
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TaskWorkflowList);
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
